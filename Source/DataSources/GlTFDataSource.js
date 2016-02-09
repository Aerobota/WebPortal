/*global define*/
define([
        '../Core/createGuid',
        '../Core/Cartographic',
        '../Core/Color',
        '../Core/defined',
        '../Core/DeveloperError',
        '../Core/getFilenameFromUri',
        '../Core/RuntimeError',
        '../Core/Ellipsoid',
        '../Core/Event',
        '../Core/loadJson',
        './ConstantProperty',
        '../ThirdParty/when',
    '../Core/Math',
    '../Core/Cartesian3',
    '../Core/Matrix3',
    '../Core/Matrix4',
    '../Core/Transforms',
    '../Scene/Model',
    '../Core/CesiumTerrainProvider',
    '../Core/sampleTerrain'
    ], function(
        createGuid,
        Cartographic,
        Color,
        defined,
        DeveloperError,
        getFilenameFromUri,
        RuntimeError,
        Ellipsoid,
        Event,
        loadJson,
        ConstantProperty,
        when,
        CesiumMath,
        Cartesian3,
        Matrix3,
        Matrix4,
        Transforms,
        Model,
        CesiumTerrainProvider,
        sampleTerrain) {
    "use strict";


    function processFeatureCollection(featureCollection) {
        var features = featureCollection.features;
        for ( var i = 0, len = features.length; i < len; i++) {
            processFeature(features[i]);
        }
    }


    // GeoJSON processing functions
    function processFeature(feature) {
        if (!defined(feature.geometry)) {
            throw new RuntimeError('feature.geometry is required.');
        }

            var geometryType = feature.geometry.type;
            var geometryHandler = geometryTypes[geometryType];
            if (!defined(geometryHandler)) {
                throw new RuntimeError('Unknown geometry type: ' + geometryType);
            }
            geometryHandler(feature);

    }

    var terrainProvider = new CesiumTerrainProvider({
        //url : 'http://cesiumjs.org/smallterrain'
        url : 'elev_world_0-9'
    });

    function processPoint(feature) {
        var coordinates = feature.geometry.coordinates;
        //var elevation = parseInt(feature.properties.ELEVATION);
        var orientation = parseFloat(feature.properties.ORIENTATIO);
        var name = feature.properties.NAME;

        var rotateX;
        if(!isNaN(orientation))
            rotateX = Matrix4.fromRotationTranslation(Matrix3.fromRotationZ(CesiumMath.toRadians(orientation)), Cartesian3.ZERO);
        else{
            rotateX = Matrix4.fromRotationTranslation(Matrix3.fromRotationZ(CesiumMath.toRadians(0.0)), Cartesian3.ZERO);
        }

        var positions = [
            Cartographic.fromDegrees(coordinates[1], coordinates[0])
        ];

        var promise = sampleTerrain(terrainProvider, 9, positions);

        when(promise, function(updatedPositions) {
            // positions[0].height and positions[1].height have been updated.
            // updatedPositions is just a reference to positions.
            //console.log(coordinates);
            //var modelMatrix = Matrix4.multiply(Transforms.eastNorthUpToFixedFrame(ellipsoid.cartographicToCartesian(Cartographic.fromDegrees(coordinates[1], coordinates[0], positions[0].height))), rotateX);
            var modelMatrix = Transforms.northEastDownToFixedFrame(Cartesian3.fromDegrees(coordinates[1], coordinates[0], 0));

            var model = scene.primitives.add(Model.fromGltf({
                id: name,
                url : modelpath,
                modelMatrix : modelMatrix,
                scale:2,
                debugWireframe : false,
                allowPicking : allowPicking
            }));
        });


    }

    var geoJsonObjectTypes = {
        Feature : processFeature,
        FeatureCollection : processFeatureCollection,
        Point : processPoint
    };

    var geometryTypes = {
        Point : processPoint
    };

    var cesiumWidget;
    var ellipsoid;
    var scene;
    var modelpath;
    var allowPicking;
    var GlTFDataSource = function(_cesiumWidget,_modelpath,_allowPicking) {
        cesiumWidget = _cesiumWidget;
        modelpath = _modelpath;
        allowPicking = _allowPicking;
        ellipsoid = cesiumWidget.ellipsoid;
        scene = cesiumWidget.scene;
    };


    GlTFDataSource.prototype.loadUrl = function(url) {
        if (!defined(url)) {
            throw new DeveloperError('url is required.');
        }

        var dataSource = this;
        return when(loadJson(url), function(geoJson) {
            return dataSource.load(geoJson, url);
        }, function(error) {
            dataSource._error.raiseEvent(dataSource, error);
            return when.reject(error);
        });
    };


    GlTFDataSource.prototype.load = function(geoJson, source) {
        if (!defined(geoJson)) {
            throw new DeveloperError('geoJson is required.');
        }

        this._name = undefined;
        if (defined(source)) {
            this._name = getFilenameFromUri(source);
        }

        var typeHandler = geoJsonObjectTypes[geoJson.type];


        if (!defined(typeHandler)) {
            throw new DeveloperError('Unsupported GeoJSON object type: ' + geoJson.type);
        }

        //Check for a Coordinate Reference System.
        var crsFunction = defaultCrsFunction;
        var crs = geoJson.crs;
        if (defined(crs)) {
            if (crs === null) {
                throw new RuntimeError('crs is null.');
            }
            if (!defined(crs.properties)) {
                throw new RuntimeError('crs.properties is undefined.');
            }

            var properties = crs.properties;
            if (crs.type === 'name') {
                crsFunction = GlTFDataSource.crsNames[properties.name];
                if (!defined(crsFunction)) {
                    throw new RuntimeError('Unknown crs name: ' + properties.name);
                }
            } else if (crs.type === 'link') {
                var handler = GlTFDataSource.crsLinkHrefs[properties.href];
                if (!defined(handler)) {
                    handler = GlTFDataSource.crsLinkTypes[properties.type];
                }

                if (!defined(handler)) {
                    throw new RuntimeError('Unable to resolve crs link: ' + JSON.stringify(properties));
                }

                crsFunction = handler(properties);
            } else if (crs.type === 'EPSG') {
                crsFunction = GlTFDataSource.crsNames['EPSG:' + properties.code];
                if (!defined(crsFunction)) {
                    throw new RuntimeError('Unknown crs EPSG code: ' + properties.code);
                }
            } else {
                throw new RuntimeError('Unknown crs type: ' + crs.type);
            }
        }



        return when(crsFunction, function(crsFunction) {
            typeHandler(geoJson);

        }, function(error) {

            return when.reject(error);
        });
    };

    function defaultCrsFunction(coordinates) {
        var cartographic = Cartographic.fromDegrees(coordinates[0], coordinates[1], coordinates[2]);
        return Ellipsoid.WGS84.cartographicToCartesian(cartographic);
    }

    /**
     * An object that maps the name of a crs to a callback function which takes a GeoJSON coordinate
     * and transforms it into a WGS84 Earth-fixed Cartesian.  Older versions of GeoJSON which
     * supported the EPSG type can be added to this list as well, by specifying the complete EPSG name,
     * for example 'EPSG:4326'.
     * @memberof GeoJsonDataSource
     * @type {Object}
     */
    GlTFDataSource.crsNames = {
        'urn:ogc:def:crs:OGC:1.3:CRS84' : defaultCrsFunction,
        'EPSG:4326' : defaultCrsFunction
    };

    /**
     * An object that maps the href property of a crs link to a callback function
     * which takes the crs properties object and returns a Promise that resolves
     * to a function that takes a GeoJSON coordinate and transforms it into a WGS84 Earth-fixed Cartesian.
     * Items in this object take precedence over those defined in <code>crsLinkHrefs</code>, assuming
     * the link has a type specified.
     * @memberof GeoJsonDataSource
     * @type {Object}
     */
    GlTFDataSource.crsLinkHrefs = {};

    /**
     * An object that maps the type property of a crs link to a callback function
     * which takes the crs properties object and returns a Promise that resolves
     * to a function that takes a GeoJSON coordinate and transforms it into a WGS84 Earth-fixed Cartesian.
     * Items in <code>crsLinkHrefs</code> take precedence over this object.
     * @memberof GeoJsonDataSource
     * @type {Object}
     */
    GlTFDataSource.crsLinkTypes = {};

    return GlTFDataSource;
});

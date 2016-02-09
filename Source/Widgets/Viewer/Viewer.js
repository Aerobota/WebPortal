/*global define*/
define([
        '../../Core/defaultValue',
        '../../Core/defined',
        '../../Core/defineProperties',
        '../../Core/destroyObject',
        '../../Core/DeveloperError',
        '../../Core/EventHelper',
        '../../DataSources/DataSourceCollection',
        '../../DataSources/DataSourceDisplay',
        '../../ThirdParty/knockout',
        '../Animation/Animation',
        '../Animation/AnimationViewModel',
        '../BaseLayerPicker/BaseLayerPicker',
        '../BaseLayerPicker/createDefaultImageryProviderViewModels',
        '../BaseLayerPicker/createDefaultTerrainProviderViewModels',
        '../CesiumWidget/CesiumWidget',
        '../ClockViewModel',
        '../FullscreenButton/FullscreenButton',
        '../Geocoder/Geocoder',
        '../getElement',
        '../HomeButton/HomeButton',
        '../InfoBox/InfoBox',
        '../NavigationHelpButton/NavigationHelpButton',
        '../SceneModePicker/SceneModePicker',
        '../SelectionIndicator/SelectionIndicator',
        '../subscribeAndEvaluate',
        '../Timeline/Timeline',
        '../../Core/Cartesian3',
        '../../DataSources/KmlDataSource',
        '../../DataSources/GlTFDataSource',
        '../../ThirdParty/when',
        '../../Core/loadJson',
    '../../Scene/WebMapServiceImageryProvider',
    '../../Scene/BillboardCollection',
    '../../Core/CesiumTerrainProvider',
    '../../Core/sampleTerrain',
    '../../Core/Cartographic',


    '../../Core/GeometryInstance',
    '../../Scene/PerInstanceColorAppearance',
    '../../Core/ColorGeometryInstanceAttribute',
    '../../Core/Color','../../Scene/Primitive',
    '../../Core/Math',
    '../../Scene/Material',
    '../../Core/SphereGeometry',
    '../../Core/Matrix4',
    '../../Core/Transforms'
    ], function(
        defaultValue,
        defined,
        defineProperties,
        destroyObject,
        DeveloperError,
        EventHelper,
        DataSourceCollection,
        DataSourceDisplay,
        knockout,
        Animation,
        AnimationViewModel,
        BaseLayerPicker,
        createDefaultImageryProviderViewModels,
        createDefaultTerrainProviderViewModels,
        CesiumWidget,
        ClockViewModel,
        FullscreenButton,
        Geocoder,
        getElement,
        HomeButton,
        InfoBox,
        NavigationHelpButton,
        SceneModePicker,
        SelectionIndicator,
        subscribeAndEvaluate,
        Timeline,
        Cartesian3,
        KmlDataSource,
        GlTFDataSource,
        when,
        loadJson,
        WebMapServiceImageryProvider,
        BillboardCollection,
        CesiumTerrainProvider,
        sampleTerrain,
        Cartographic,


        GeometryInstance,
        PerInstanceColorAppearance,
        ColorGeometryInstanceAttribute,
        Color,
        Primitive,
        Math,
        Material,
        SphereGeometry,
        Matrix4,
        Transforms
    ) {
    "use strict";

    function onTimelineScrubfunction(e) {
        var clock = e.clock;
        clock.currentTime = e.timeJulian;
        clock.shouldAnimate = false;
    }

    /**
     * A base widget for building applications.  It composites all of the standard Cesium widgets into one reusable package.
     * The widget can always be extended by using mixins, which add functionality useful for a variety of applications.
     *
     * @alias Viewer
     * @constructor
     *
     * @param {Element|String} container The DOM element or ID that will contain the widget.
     * @param {Object} [options] Object with the following properties:
     * @param {Boolean} [options.animation=true] If set to false, the Animation widget will not be created.
     * @param {Boolean} [options.baseLayerPicker=true] If set to false, the BaseLayerPicker widget will not be created.
     * @param {Boolean} [options.fullscreenButton=true] If set to false, the FullscreenButton widget will not be created.
     * @param {Boolean} [options.geocoder=true] If set to false, the Geocoder widget will not be created.
     * @param {Boolean} [options.homeButton=true] If set to false, the HomeButton widget will not be created.
     * @param {Boolean} [options.infoBox=true] If set to false, the InfoBox widget will not be created.
     * @param {Boolean} [options.sceneModePicker=true] If set to false, the SceneModePicker widget will not be created.
     * @param {Boolean} [options.selectionIndicator=true] If set to false, the SelectionIndicator widget will not be created.
     * @param {Boolean} [options.timeline=true] If set to false, the Timeline widget will not be created.
     * @param {Boolean} [options.navigationHelpButton=true] If set to the false, the navigation help button will not be created.
     * @param {Boolean} [options.navigationInstructionsInitiallyVisible=true] True if the navigation instructions should initially be visible, or false if the should not be shown until the user explicitly clicks the button.
     * @param {Boolean} [options.scene3DOnly=false] When <code>true</code>, each geometry instance will only be rendered in 3D to save GPU memory.
     * @param {ProviderViewModel} [options.selectedImageryProviderViewModel] The view model for the current base imagery layer, if not supplied the first available base layer is used.  This value is only valid if options.baseLayerPicker is set to true.
     * @param {ProviderViewModel[]} [options.imageryProviderViewModels=createDefaultImageryProviderViewModels()] The array of ProviderViewModels to be selectable from the BaseLayerPicker.  This value is only valid if options.baseLayerPicker is set to true.
     * @param {ProviderViewModel} [options.selectedTerrainProviderViewModel] The view model for the current base terrain layer, if not supplied the first available base layer is used.  This value is only valid if options.baseLayerPicker is set to true.
     * @param {ProviderViewModel[]} [options.terrainProviderViewModels=createDefaultTerrainProviderViewModels()] The array of ProviderViewModels to be selectable from the BaseLayerPicker.  This value is only valid if options.baseLayerPicker is set to true.
     * @param {ImageryProvider} [options.imageryProvider=new BingMapsImageryProvider()] The imagery provider to use.  This value is only valid if options.baseLayerPicker is set to false.
     * @param {TerrainProvider} [options.terrainProvider=new EllipsoidTerrainProvider()] The terrain provider to use
     * @param {SkyBox} [options.skyBox] The skybox used to render the stars.  When <code>undefined</code>, the default stars are used.
     * @param {Element} [options.fullscreenElement=document.body] The element to make full screen when the full screen button is pressed.
     * @param {Boolean} [options.useDefaultRenderLoop=true] True if this widget should control the render loop, false otherwise.
     * @param {Number} [options.targetFrameRate] The target frame rate when using the default render loop.
     * @param {Boolean} [options.showRenderLoopErrors=true] If true, this widget will automatically display an HTML panel to the user containing the error, if a render loop error occurs.
     * @param {Boolean} [options.automaticallyTrackDataSourceClocks=true] If true, this widget will automatically track the clock settings of newly added DataSources, updating if the DataSource's clock changes.  Set this to false if you want to configure the clock independently.
     * @param {Object} [options.contextOptions] Context and WebGL creation properties corresponding to <code>options</code> passed to {@link Scene}.
     * @param {SceneMode} [options.sceneMode=SceneMode.SCENE3D] The initial scene mode.
     * @param {MapProjection} [options.mapProjection=new GeographicProjection()] The map projection to use in 2D and Columbus View modes.
     * @param {Element|String} [options.creditContainer] The DOM element or ID that will contain the {@link CreditDisplay}.  If not specified, the credits are added to the bottom of the widget itself.
     * @param {DataSourceCollection} [options.dataSources=new DataSourceCollection()] The collection of data sources visualized by the widget.  If this parameter is provided,
                                     the instance is assumed to be owned by the caller and will not be destroyed when the viewer is destroyed.
     *
     * @exception {DeveloperError} Element with id "container" does not exist in the document.
     * @exception {DeveloperError} options.imageryProvider is not available when using the BaseLayerPicker widget, specify options.selectedImageryProviderViewModel instead.
     * @exception {DeveloperError} options.terrainProvider is not available when using the BaseLayerPicker widget, specify options.selectedTerrainProviderViewModel instead.
     * @exception {DeveloperError} options.selectedImageryProviderViewModel is not available when not using the BaseLayerPicker widget, specify options.imageryProvider instead.
     * @exception {DeveloperError} options.selectedTerrainProviderViewModel is not available when not using the BaseLayerPicker widget, specify options.terrainProvider instead.
     *
     * @see Animation
     * @see BaseLayerPicker
     * @see CesiumWidget
     * @see FullscreenButton
     * @see HomeButton
     * @see SceneModePicker
     * @see Timeline
     * @see viewerDragDropMixin
     * @see viewerEntityMixin
     *
     * @demo {@link http://cesiumjs.org/Cesium/Apps/Sandcastle/index.html?src=Hello%20World.html|Cesium Sandcastle Hello World Demo}
     *
     * @example
     * //Initialize the viewer widget with several custom options and mixins.
     * var viewer = new Cesium.Viewer('cesiumContainer', {
     *     //Start in Columbus Viewer
     *     sceneMode : Cesium.SceneMode.COLUMBUS_VIEW,
     *     //Use standard Cesium terrain
     *     terrainProvider : new Cesium.CesiumTerrainProvider({
     *         url : '//cesiumjs.org/smallterrain',
     *         credit : 'Terrain data courtesy Analytical Graphics, Inc.'
     *     }),
     *     //Hide the base layer picker
     *     baseLayerPicker : false,
     *     //Use OpenStreetMaps
     *     imageryProvider : new Cesium.OpenStreetMapImageryProvider({
     *         url : '//a.tile.openstreetmap.org/'
     *     }),
     *     // Use high-res stars downloaded from https://github.com/AnalyticalGraphicsInc/cesium-assets
     *     skyBox : new Cesium.SkyBox({
     *         sources : {
     *           positiveX : 'stars/TychoSkymapII.t3_08192x04096_80_px.jpg',
     *           negativeX : 'stars/TychoSkymapII.t3_08192x04096_80_mx.jpg',
     *           positiveY : 'stars/TychoSkymapII.t3_08192x04096_80_py.jpg',
     *           negativeY : 'stars/TychoSkymapII.t3_08192x04096_80_my.jpg',
     *           positiveZ : 'stars/TychoSkymapII.t3_08192x04096_80_pz.jpg',
     *           negativeZ : 'stars/TychoSkymapII.t3_08192x04096_80_mz.jpg'
     *         }
     *     }),
     *     // Show Columbus View map with Web Mercator projection
     *     mapProjection : new Cesium.WebMercatorProjection()
     * });
     *
     * //Add basic drag and drop functionality
     * viewer.extend(Cesium.viewerDragDropMixin);
     *
     * //Allow users to zoom and follow objects loaded from CZML by clicking on it.
     * viewer.extend(Cesium.viewerEntityMixin);
     *
     * //Show a pop-up alert if we encounter an error when processing a dropped file
     * viewer.dropError.addEventListener(function(dropHandler, name, error) {
     *     console.log(error);
     *     window.alert(error);
     * });
     */
    var Viewer = function(container, options) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(container)) {
            throw new DeveloperError('container is required.');
        }
        //>>includeEnd('debug');

        container = getElement(container);
        options = defaultValue(options, defaultValue.EMPTY_OBJECT);

        var createBaseLayerPicker = !defined(options.baseLayerPicker) || options.baseLayerPicker !== false;

        //>>includeStart('debug', pragmas.debug);
        // If using BaseLayerPicker, imageryProvider is an invalid option
        if (createBaseLayerPicker && defined(options.imageryProvider)) {
            throw new DeveloperError('options.imageryProvider is not available when using the BaseLayerPicker widget. \
Either specify options.selectedImageryProviderViewModel instead or set options.baseLayerPicker to false.');
        }

        // If not using BaseLayerPicker, selectedImageryProviderViewModel is an invalid option
        if (!createBaseLayerPicker && defined(options.selectedImageryProviderViewModel)) {
            throw new DeveloperError('options.selectedImageryProviderViewModel is not available when not using the BaseLayerPicker widget. \
Either specify options.imageryProvider instead or set options.baseLayerPicker to true.');
        }

        // If using BaseLayerPicker, terrainProvider is an invalid option
        if (createBaseLayerPicker && defined(options.terrainProvider)) {
            throw new DeveloperError('options.terrainProvider is not available when using the BaseLayerPicker widget. \
Either specify options.selectedTerrainProviderViewModel instead or set options.baseLayerPicker to false.');
        }

        // If not using BaseLayerPicker, selectedTerrainProviderViewModel is an invalid option
        if (!createBaseLayerPicker && defined(options.selectedTerrainProviderViewModel)) {
            throw new DeveloperError('options.selectedTerrainProviderViewModel is not available when not using the BaseLayerPicker widget. \
Either specify options.terrainProvider instead or set options.baseLayerPicker to true.');
        }
        //>>includeEnd('debug')

        var viewerContainer = document.createElement('div');
        viewerContainer.className = 'cesium-viewer';
        container.appendChild(viewerContainer);

        // Cesium widget container
        var cesiumWidgetContainer = document.createElement('div');
        cesiumWidgetContainer.className = 'cesium-viewer-cesiumWidgetContainer';
        viewerContainer.appendChild(cesiumWidgetContainer);

        // Bottom container
        var bottomContainer = document.createElement('div');
        bottomContainer.className = 'cesium-viewer-bottom';

        viewerContainer.appendChild(bottomContainer);

        var scene3DOnly = defaultValue(options.scene3DOnly, false);

        // Cesium widget
        var cesiumWidget = new CesiumWidget(cesiumWidgetContainer, {
            terrainProvider : options.terrainProvider,
            imageryProvider : createBaseLayerPicker ? false : options.imageryProvider,
            skyBox : options.skyBox,
            sceneMode : options.sceneMode,
            mapProjection : options.mapProjection,
            contextOptions : options.contextOptions,
            useDefaultRenderLoop : options.useDefaultRenderLoop,
            targetFrameRate : options.targetFrameRate,
            showRenderLoopErrors : options.showRenderLoopErrors,
            creditContainer : defined(options.creditContainer) ? options.creditContainer : bottomContainer,
            scene3DOnly : scene3DOnly
        });

        var energy_container = document.createElement('div');
        energy_container.id = "cesium-widget-ecomap-container";
        energy_container.className = 'cesium-widget-container';
        viewerContainer.appendChild(energy_container);

        var A = document.createElement('img');
        A.id="A";
        A.className = 'cesium-widget-ecomap-img';
        A.src = "./img/energy/A.png";
        energy_container.appendChild(A);

        var B = document.createElement('img');
        B.id="B";
        B.className = 'cesium-widget-ecomap-img';
        B.src = "./img/energy/B.png";
        energy_container.appendChild(B);

        var C = document.createElement('img');
        C.id="C";
        C.className = 'cesium-widget-ecomap-img';
        C.src = "./img/energy/C.png";
        energy_container.appendChild(C);

        var D = document.createElement('img');
        D.id="D";
        D.className = 'cesium-widget-ecomap-img';
        D.src = "./img/energy/D.png";
        energy_container.appendChild(D);

        var E = document.createElement('img');
        E.id="E";
        E.className = 'cesium-widget-ecomap-img';
        E.src = "./img/energy/E.png";
        energy_container.appendChild(E);

        var F = document.createElement('img');
        F.id="F";
        F.className = 'cesium-widget-ecomap-img';
        F.src = "./img/energy/F.png";
        energy_container.appendChild(F);

        var G = document.createElement('img');
        G.id="G";
        G.className = 'cesium-widget-ecomap-img';
        G.src = "./img/energy/G.png";
        energy_container.appendChild(G);

        var energy_container_cooling = document.createElement('div');
        energy_container_cooling.id = "cesium-widget-ecomap-cooling-container";
        energy_container_cooling.className = 'cesium-widget-container';
        viewerContainer.appendChild(energy_container_cooling);

        var Ac = document.createElement('img');
        Ac.id="Ac";
        Ac.className = 'cesium-widget-ecomap-img';
        Ac.src = "./img/energy/Ac.png";
        energy_container_cooling.appendChild(Ac);

        var Bc = document.createElement('img');
        Bc.id="Bc";
        Bc.className = 'cesium-widget-ecomap-img';
        Bc.src = "./img/energy/Bc.png";
        energy_container_cooling.appendChild(Bc);

        var Cc = document.createElement('img');
        Cc.id="Cc";
        Cc.className = 'cesium-widget-ecomap-img';
        Cc.src = "./img/energy/Cc.png";
        energy_container_cooling.appendChild(Cc);

        var Dc = document.createElement('img');
        Dc.id="Dc";
        Dc.className = 'cesium-widget-ecomap-img';
        Dc.src = "./img/energy/Dc.png";
        energy_container_cooling.appendChild(Dc);

        var Ec = document.createElement('img');
        Ec.id="Ec";
        Ec.className = 'cesium-widget-ecomap-img';
        Ec.src = "./img/energy/Ec.png";
        energy_container_cooling.appendChild(Ec);

        var Fc = document.createElement('img');
        Fc.id="Fc";
        Fc.className = 'cesium-widget-ecomap-img';
        Fc.src = "./img/energy/Fc.png";
        energy_container_cooling.appendChild(Fc);

        var Gc = document.createElement('img');
        Gc.id="Gc";
        Gc.className = 'cesium-widget-ecomap-img';
        Gc.src = "./img/energy/Gc.png";
        energy_container_cooling.appendChild(Gc);

        var building_container = document.createElement('div');
        building_container.id = "cesium-widget-building-container";
        building_container.className = 'cesium-widget-container';
        viewerContainer.appendChild(building_container);

        var building = document.createElement('img');
        building.className = 'cesium-widget-building-img';
        building.src = "./img/building/building.png";
        building_container.appendChild(building);

        var weather = document.createElement('img');
        weather.className = 'cesium-widget-building-img';
        weather.src = "./img/building/weather.png";
        building_container.appendChild(weather);

        var shelter = document.createElement('img');
        shelter.className = 'cesium-widget-building-img';
        shelter.src = "./img/building/shelter.png";
        building_container.appendChild(shelter);

        var network_container = document.createElement('div');
        network_container.id = "cesium-widget-network-container";
        network_container.className = 'cesium-widget-container';
        viewerContainer.appendChild(network_container);

        var lightline = document.createElement('img');
        lightline.className = 'cesium-widget-network-img';
        lightline.src = "./img/building/lightline.png";
        network_container.appendChild(lightline);

        var lamp = document.createElement('img');
        lamp.className = 'cesium-widget-network-img';
        lamp.src = "./img/building/lamp.png";
        network_container.appendChild(lamp);

        var status_container = document.createElement('div');
        status_container.id = "cesium-widget-status-container";
        status_container.className = 'cesium-widget-container';
        viewerContainer.appendChild(status_container);

        var status = document.createElement('span');
        status.id = 'cesium-widget-status';
        status.className = 'cesium-widget-status';
        status.textContent = "Info Bar";
        status_container.appendChild(status);

        var dataSourceCollection = options.dataSources;
        var destroyDataSourceCollection = false;
        if (!defined(dataSourceCollection)) {
            dataSourceCollection = new DataSourceCollection();
            destroyDataSourceCollection = true;
        }

        var dataSourceDisplay = new DataSourceDisplay({
            scene : cesiumWidget.scene,
            dataSourceCollection : dataSourceCollection
        });

        var clock = cesiumWidget.clock;
        var clockViewModel = new ClockViewModel(clock);
        var eventHelper = new EventHelper();
        var that = this;

        eventHelper.add(clock.onTick, function(clock) {
            var isUpdated = dataSourceDisplay.update(clock.currentTime);
            if (that._allowDataSourcesToSuspendAnimation) {
                clockViewModel.canAnimate = isUpdated;
            }
        });

        // Selection Indicator
        var selectionIndicator;
        if (!defined(options.selectionIndicator) || options.selectionIndicator !== false) {
            var selectionIndicatorContainer = document.createElement('div');
            selectionIndicatorContainer.className = 'cesium-viewer-selectionIndicatorContainer';
            viewerContainer.appendChild(selectionIndicatorContainer);
            selectionIndicator = new SelectionIndicator(selectionIndicatorContainer, cesiumWidget.scene);
        }

        // Info Box
        var infoBox;
        if (!defined(options.infoBox) || options.infoBox !== false) {
            var infoBoxContainer = document.createElement('div');
            infoBoxContainer.className = 'cesium-viewer-infoBoxContainer';
            viewerContainer.appendChild(infoBoxContainer);
            infoBox = new InfoBox(infoBoxContainer);
        }

        // Main Toolbar
        var toolbar = document.createElement('div');
        toolbar.className = 'cesium-viewer-toolbar';
        toolbar.id = 'cesium-viewer-toolbar';
        viewerContainer.appendChild(toolbar);

        // Geocoder
        var geocoder;
        if (!defined(options.geocoder) || options.geocoder !== false) {
            var geocoderContainer = document.createElement('div');
            geocoderContainer.className = 'cesium-viewer-geocoderContainer';
            toolbar.appendChild(geocoderContainer);
            geocoder = new Geocoder({
                container : geocoderContainer,
                scene : cesiumWidget.scene
            });
        }

        // HomeButton
        var homeButton;
        if (!defined(options.homeButton) || options.homeButton !== false) {
            homeButton = new HomeButton(toolbar, cesiumWidget.scene);
            if (defined(geocoder)) {
                eventHelper.add(homeButton.viewModel.command.afterExecute, function() {
                    var viewModel = geocoder.viewModel;
                    viewModel.searchText = '';
                    if (viewModel.isSearchInProgress) {
                        viewModel.search();
                    }
                });
            }
        }

        // SceneModePicker
        // By default, we silently disable the scene mode picker if scene3DOnly is true,
        // but if sceneModePicker is explicitly set to true, throw an error.
        if ((options.sceneModePicker === true) && scene3DOnly) {
            throw new DeveloperError('options.sceneModePicker is not available when options.scene3DOnly is set to true.');
        }

        var sceneModePicker;
        if (!scene3DOnly && (!defined(options.sceneModePicker) || options.sceneModePicker !== false)) {
            sceneModePicker = new SceneModePicker(toolbar, cesiumWidget.scene);
        }

        // BaseLayerPicker
        var baseLayerPicker;
        if (createBaseLayerPicker) {
            var imageryProviderViewModels = defaultValue(options.imageryProviderViewModels, createDefaultImageryProviderViewModels());
            var terrainProviderViewModels = defaultValue(options.terrainProviderViewModels, createDefaultTerrainProviderViewModels());

            baseLayerPicker = new BaseLayerPicker(toolbar, {
                globe : cesiumWidget.scene.globe,
                imageryProviderViewModels : imageryProviderViewModels,
                selectedImageryProviderViewModel : options.selectedImageryProviderViewModel,
                //terrainProviderViewModels : terrainProviderViewModels,
                selectedTerrainProviderViewModel : options.selectedTerrainProviderViewModel
            });

            //Grab the dropdown for resize code.
            var elements = toolbar.getElementsByClassName('cesium-baseLayerPicker-dropDown');
            this._baseLayerPickerDropDown = elements[0];
        }

        /*  DATI SCENARI */

        var terrainProvider = new CesiumTerrainProvider({
            //url : 'http://cesiumjs.org/smallterrain'
            //url : '//assets.agi.com/stk-terrain/world'
            url : './elev_world_0-9'
        });

        var displayed_Ecomap=false;
        var displayed_Network=false;
        var displayed_Building=false;
        var displayed_Weather=false;

        var kmldataSourcesURLs = new Array();
        kmldataSourcesURLs["amblar"] = "kml/amblar/amblar.kml";
        kmldataSourcesURLs["brez"] = "kml/brez/brez.kml";
        kmldataSourcesURLs["campodenno"] = "kml/campodenno/campodenno.kml";
        kmldataSourcesURLs["castelfondo"] = "kml/castelfondo/castelfondo.kml";
        kmldataSourcesURLs["cavareno"] = "kml/cavareno/cavareno.kml";
        kmldataSourcesURLs["cles"] = "kml/cles/cles.kml";
        kmldataSourcesURLs["cles_cooling"] = "kml/cles/cles_cooling.kml";
        kmldataSourcesURLs["cunevo"] = "kml/cunevo/cunevo.kml";
        kmldataSourcesURLs["dambel"] = "kml/dambel/dambel.kml";
        kmldataSourcesURLs["denno"] = "kml/denno/denno.kml";
        kmldataSourcesURLs["don"] = "kml/don/don.kml";
        kmldataSourcesURLs["ferrara"] = "kml/ferrara/ferrara.kml";
        kmldataSourcesURLs["flavon"] = "kml/flavon/flavon.kml";
        kmldataSourcesURLs["fondo"] = "kml/fondo/fondo.kml";
        kmldataSourcesURLs["lamia"] = "kml/lamia/lamia.kml";
        kmldataSourcesURLs["lamia_cooling"] = "kml/lamia/lamia_cooling.kml";
        kmldataSourcesURLs["malosco"] = "kml/malosco/malosco.kml";
        kmldataSourcesURLs["melzo"] = "kml/melzo/melzo.kml";
        kmldataSourcesURLs["nanno"] = "kml/nanno/nanno.kml";
        kmldataSourcesURLs["naxxar"] = "kml/naxxar/naxxar.kml";
        kmldataSourcesURLs["naxxar_cooling"] = "kml/naxxar/naxxar_cooling.kml";
        kmldataSourcesURLs["piaggine"] = "kml/piaggine/piaggine.kml";
        kmldataSourcesURLs["predaia"] = "kml/predaia/predaia.kml";
        kmldataSourcesURLs["revo"] = "kml/revo/revo.kml";
        kmldataSourcesURLs["romallo"] = "kml/romallo/romallo.kml";
        kmldataSourcesURLs["romeno"] = "kml/romeno/romeno.kml";
        kmldataSourcesURLs["ronzone"] = "kml/ronzone/ronzone.kml";
        kmldataSourcesURLs["sanzeno"] = "kml/sanzeno/sanzeno.kml";
        kmldataSourcesURLs["sarnonico"] = "kml/sarnonico/sarnonico.kml";
        kmldataSourcesURLs["sfruz"] = "kml/sfruz/sfruz.kml";
        kmldataSourcesURLs["sporminore"] = "kml/sporminore/sporminore.kml";
        kmldataSourcesURLs["tassullo"] = "kml/tassullo/tassullo.kml";
        kmldataSourcesURLs["terres"] = "kml/terres/terres.kml";
        kmldataSourcesURLs["ton"] = "kml/ton/ton.kml";
        kmldataSourcesURLs["trento"] = "kml/trento/trento.kml";
        kmldataSourcesURLs["trento_cooling"] = "kml/trento/trento_cooling.kml";

        var kmldataSourcesCoordinates = new Array();
        kmldataSourcesCoordinates["amblar"] = "11.146897699999954, 46.39513243106717";
        kmldataSourcesCoordinates["brez"] = "11.10569135000003, 46.4324015948315";
        kmldataSourcesCoordinates["campodenno"] = "11.033812399999988, 46.25756922040209";
        kmldataSourcesCoordinates["castelfondo"] = "11.11684820000005, 46.4575958969516";
        kmldataSourcesCoordinates["cavareno"] = "11.139505549999967, 46.40758663348704";
        kmldataSourcesCoordinates["cles"] = "11.03530354999998,46.3625881651762";
        kmldataSourcesCoordinates["cles_cooling"] = "11.03530354999998,46.3625881651762";
        kmldataSourcesCoordinates["cunevo"] = "11.034434799999985, 46.285673701933696";
        kmldataSourcesCoordinates["dambel"] = "11.093228100000033, 46.40430677650679";
        kmldataSourcesCoordinates["denno"] = "11.049194899999975, 46.27437357055951";
        kmldataSourcesCoordinates["don"] = "11.137914200000068, 46.38903400037407";
        kmldataSourcesCoordinates["ferrara"] = "11.619620760681073,44.83750977639994";
        kmldataSourcesCoordinates["flavon"] = "11.029814600000009, 46.29932819395642";
        kmldataSourcesCoordinates["fondo"] = "11.136000649999914, 46.43719048170447";
        kmldataSourcesCoordinates["lamia"] = "22.434086800085424,38.89574123654844";
        kmldataSourcesCoordinates["lamia_cooling"] = "22.434086800085424,38.89574123654844";
        kmldataSourcesCoordinates["malosco"] = "11.145834549999904, 46.4358128772872";
        kmldataSourcesCoordinates["melzo"] = "9.419173999999998, 45.4992473693057";
        kmldataSourcesCoordinates["nanno"] = "11.047084799999993, 46.31675556164859";
        kmldataSourcesCoordinates["naxxar"] = "14.445001799279794, 35.91652677501081";
        kmldataSourcesCoordinates["naxxar_cooling"] = "14.445001799279794, 35.91652677501081";
        kmldataSourcesCoordinates["piaggine"] = "15.378484999999955, 40.345222369514524";
        kmldataSourcesCoordinates["predaia"] = "11.08792274970699, 46.34877856011499";
        kmldataSourcesCoordinates["revo"] = "11.058322699999962, 46.39126922489628";
        kmldataSourcesCoordinates["romallo"] = "11.066246099999944, 46.39599644440782";
        kmldataSourcesCoordinates["romeno"] = "11.120105700000067, 46.39426819948054";
        kmldataSourcesCoordinates["ronzone"] = "11.152584599999955, 46.42457354888257";
        kmldataSourcesCoordinates["sanzeno"] = "11.075080599999978, 46.36644013871522";
        kmldataSourcesCoordinates["sarnonico"] = "11.1414403, 46.42175463385702";
        kmldataSourcesCoordinates["sfruz"] = "11.120686800000044, 46.33924312372335";
        kmldataSourcesCoordinates["sporminore"] = "11.029469749999976, 46.23647963304979";
        kmldataSourcesCoordinates["tassullo"] = "11.048463599999991, 46.337671161563115";
        kmldataSourcesCoordinates["terres"] = "11.02363790000004, 46.30955978037256";
        kmldataSourcesCoordinates["ton"] = "11.085501199999953, 46.2659243927059";
        kmldataSourcesCoordinates["trento"] = "11.121471448950274,46.067029440610625";
        kmldataSourcesCoordinates["trento_cooling"] = "11.121471448950274,46.067029440610625";

        var ecomapList;
        var networkList;
        var buildingList;
        var weatherList;

        var networkWFSURL = "http://sunshine.sinergis.it/geoserver/sunshine/ows?service=WFS&version=2.0&request=GetFeature&typeName=sunshine:featureofinterest&outputFormat=application/json&CQL_Filter=(codespaceid%3D__NETWORKCODESPACE__%20)and((%20identifier%20LIKE%20%27%25lamp%25%27)or(%20identifier%20LIKE%20%27%25lightline%25%27))";
        var networkWFSINIT = "http://sunshine.sinergis.it/geoserver/sunshine/ows?service=WFS&version=2.0&request=GetFeature&typeName=sunshine:featureofinterest&outputFormat=application/json&CQL_Filter=(codespaceid%3D__NETWORKCODESPACE__%20)and((%20identifier%20LIKE%20%27%25lightline%25%27))";
        var networkWFSINIT_ADMIN = "http://sunshine.sinergis.it/geoserver/sunshine/ows?service=WFS&version=2.0&request=GetFeature&typeName=sunshine:featureofinterest&outputFormat=application/json&CQL_Filter=((%20identifier%20LIKE%20%27%25lightline%25%27))";

        var pilot2codespaceid = new Array();
        pilot2codespaceid["rovereto"] = 2;
        pilot2codespaceid["ferrara"] = 4;
        pilot2codespaceid["bassano"] = 5;
        pilot2codespaceid["lamia"] = 6;
        pilot2codespaceid["naxxar"] = 7;
        pilot2codespaceid["trentino"] = 8;
        pilot2codespaceid["cles"] = 9;
        pilot2codespaceid["zagreb"] = 10;

        var buildingWFSURL = "http://sunshine.sinergis.it/geoserver/sunshine/ows?service=WFS&version=2.0&request=GetFeature&typeName=sunshine:featureofinterest&outputFormat=application/json&CQL_Filter=(codespaceid%3D__BUILDINGCODESPACE__%20)and((%20identifier%20LIKE%20%27%25building%25%27)or(%20identifier%20LIKE%20%27%25weatherstation%25%27)or(%20identifier%20LIKE%20%27%25shelter%25%27))";
        var buildingWFSINIT = "http://sunshine.sinergis.it/geoserver/sunshine/ows?service=WFS&version=2.0&request=GetFeature&typeName=sunshine:featureofinterest&outputFormat=application/json&CQL_Filter=(codespaceid%3D__BUILDINGCODESPACE__%20)and((%20identifier%20LIKE%20%27%25building%25%27)or(%20identifier%20LIKE%20%27%25weatherstation%25%27)or(%20identifier%20LIKE%20%27%25shelter%25%27))";
        var buildingWFSINIT_ADMIN = "http://sunshine.sinergis.it/geoserver/sunshine/ows?service=WFS&version=2.0&request=GetFeature&typeName=sunshine:featureofinterest&outputFormat=application/json&CQL_Filter=((%20identifier%20LIKE%20%27%25building%25%27)or(%20identifier%20LIKE%20%27%25weatherstation%25%27)or(%20identifier%20LIKE%20%27%25shelter%25%27))";


        var kmlContainer = document.createElement('button');
        kmlContainer.type = 'button';
        kmlContainer.className = 'cesium-button cesium-toolbar-button';
        kmlContainer.innerHTML = "<img src='img/ecomap.png' class='cesium-baseLayerPicker-selected'>";
        kmlContainer.onclick = function showKMLList(){
            if(!displayed_Ecomap){
                ecomapList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-dropDown-visible';
                displayed_Ecomap = true;


                if(defined(buildingList))
                    buildingList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-hidden';
                displayed_Building = false;

                if(defined(weatherList))
                    weatherList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-hidden';
                displayed_Weather = false;

                if(defined(networkList))
                    networkList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-hidden';
                displayed_Network = false;
            }
            else{
                ecomapList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-hidden';
                displayed_Ecomap = false;
            }
        };
        toolbar.appendChild(kmlContainer);

        ecomapList = document.createElement('div');
        ecomapList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-hidden';
        ecomapList.style.maxWidth = "900px";
        toolbar.appendChild(ecomapList);

        var total = 0;
        for (var key in kmldataSourcesURLs) {
            var ecomapButton = document.createElement('div');
            ecomapButton.id=key;
            ecomapButton.className = 'cesium-baseLayerPicker-item';
            ecomapButton.onclick = loadKML;
            ecomapList.appendChild(ecomapButton);

            var ecomapIcon = document.createElement('img');
            ecomapIcon.className = 'cesium-baseLayerPicker-itemIcon';
            ecomapIcon.src = 'img/pilots/' + key + '.png';
            ecomapButton.appendChild(ecomapIcon);

            var ecomapLabel = document.createElement('div');
            ecomapLabel.className = 'cesium-baseLayerPicker-itemLabel';
            ecomapLabel.textContent = key.replace("_cooling","");
            ecomapButton.appendChild(ecomapLabel);
            total++;
        }

        ecomapList.style.width = (total*75) + "px";

        /*	GRANT	*/
        /*	-1: NESSUN LOGIN -> SOLO VISUALIZZAZIONE
         *   2: SCENARIO 2 ABILITATO
         *   3: SCENARIO 3 ABLITATO
         *
         */
        var pilotCode = undefined;
        var role = undefined;
        checkLogin();

        // Navigation Help Button
        var navigationHelpButton;
        if (!defined(options.navigationHelpButton) || options.navigationHelpButton !== false) {
            var showNavHelp = true;
            if (defined(window.localStorage)) {
                var  hasSeenNavHelp = window.localStorage.getItem('cesium-hasSeenNavHelp');
                if (defined(hasSeenNavHelp) && Boolean(hasSeenNavHelp)) {
                    showNavHelp = false;
                } else {
                    window.localStorage.setItem('cesium-hasSeenNavHelp', 'true');
                }
            }
            navigationHelpButton = new NavigationHelpButton({
                container : toolbar,
                instructionsInitiallyVisible : defaultValue(options.navigationInstructionsInitiallyVisible, showNavHelp)
            });
        }

        // Animation
        var animation;
        if (!defined(options.animation) || options.animation !== false) {
            var animationContainer = document.createElement('div');
            animationContainer.className = 'cesium-viewer-animationContainer';
            viewerContainer.appendChild(animationContainer);
            animation = new Animation(animationContainer, new AnimationViewModel(clockViewModel));
        }

        // Timeline
        var timeline;
        if (!defined(options.timeline) || options.timeline !== false) {
            var timelineContainer = document.createElement('div');
            timelineContainer.className = 'cesium-viewer-timelineContainer';
            viewerContainer.appendChild(timelineContainer);
            timeline = new Timeline(timelineContainer, clock);
            timeline.addEventListener('settime', onTimelineScrubfunction, false);
            timeline.zoomTo(clock.startTime, clock.stopTime);
        }

        // Fullscreen
        var fullscreenButton;
        if (!defined(options.fullscreenButton) || options.fullscreenButton !== false) {
            var fullscreenContainer = document.createElement('div');
            fullscreenContainer.className = 'cesium-viewer-fullscreenContainer';
            viewerContainer.appendChild(fullscreenContainer);
            fullscreenButton = new FullscreenButton(fullscreenContainer, options.fullscreenElement);

            //Subscribe to fullscreenButton.viewModel.isFullscreenEnabled so
            //that we can hide/show the button as well as size the timeline.
            this._fullscreenSubscription = subscribeAndEvaluate(fullscreenButton.viewModel, 'isFullscreenEnabled', function(isFullscreenEnabled) {
                fullscreenContainer.style.display = isFullscreenEnabled ? 'block' : 'none';
                if (defined(timeline)) {
                    timeline.container.style.right = fullscreenContainer.clientWidth + 'px';
                    timeline.resize();
                }
            });
        } else if (defined(timeline)) {
            timeline.container.style.right = 0;
        }

        var scene = cesiumWidget.scene;
        var ecomapsDataSource = new Array();
        var scenario1 = new Scenario1();
        function loadKML(){

            //FLIGHT ANIMATION
            var coordinates = kmldataSourcesCoordinates[this.id].split(",");
            var destination = Cartesian3.fromDegrees(coordinates[0], coordinates[1], 5000.0);
            scene.camera.flyTo({destination : destination});

            //CARICO KML SE NON CARICATI
            if(!defined(ecomapsDataSource[this.id])){
                removeKML();

                ecomapsDataSource[this.id] = new KmlDataSource();
                ecomapsDataSource[this.id].loadUrl(kmldataSourcesURLs[this.id]);
                dataSourceCollection.add(ecomapsDataSource[this.id]);
            }
                ecomapList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-hidden';
                displayed_Ecomap = false;

            scenario1.DisplayCityStats(this.id);
        }

        function removeKML(){
            ecomapsDataSource = new Array();
            dataSourceCollection.removeAll(true);
        }

        function checkLogin(){
            pilotCode = sessionStorage.getItem("pilotCode");
            role = sessionStorage.getItem("userType");

            if(pilotCode != null && role != null){
                createLogout();
                createMenu();
            }
        }

        function createLogout(){
            var logout = document.getElementById('a-1390553216091220');
            logout.innerHTML = "<span>Logout</span>";
            logout.href = "#";
            logout.onclick = function(){
                sessionStorage.removeItem("category");
                sessionStorage.removeItem("classe");
                sessionStorage.removeItem("email");
                sessionStorage.removeItem("pilot");
                sessionStorage.removeItem("partner");
                sessionStorage.removeItem("pilotCode");
                sessionStorage.removeItem("username");
                sessionStorage.removeItem("userType");
                sessionStorage.removeItem("password");

                window.location="index.html";
            }
        }

        var buildingDataSourceMap = new Array();
        var networkDataSourceMap = new Array();

        var buildingDataSourcesCoordinates = new Array();
        var networkDataSourcesCoordinates = new Array();
        function createMenu(){
            //SCENARIO 2
            var buildingContainer_Building = document.createElement('button');
            buildingContainer_Building.type = 'button';
            buildingContainer_Building.className = 'cesium-button cesium-toolbar-button';
            buildingContainer_Building.innerHTML = "<img src='img/smartmeter-off.png' class='cesium-baseLayerPicker-selected'>";
            buildingContainer_Building.onclick = function redirect(){window.location="./login.html";}
            toolbar.appendChild(buildingContainer_Building);

            var weatherContainer_Weather = document.createElement('button');
            weatherContainer_Weather.type = 'button';
            weatherContainer_Weather.className = 'cesium-button cesium-toolbar-button';
            weatherContainer_Weather.innerHTML = "<img src='img/weather-off.png' class='cesium-baseLayerPicker-selected'>";
            weatherContainer_Weather.onclick = function redirect(){window.location="./login.html";}
            toolbar.appendChild(weatherContainer_Weather);

            if(role == "administrator" || role == "globalreader" || pilotCode == "4" || pilotCode == "6" || pilotCode == "7" || pilotCode == "8" || pilotCode == "9" || pilotCode == "10"){
                buildingContainer_Building.innerHTML = "<img src='img/smartmeter-on.png' class='cesium-baseLayerPicker-selected'>";
                buildingContainer_Building.onclick = function showBuildingList(){
                    if(!displayed_Building){
                        buildingList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-dropDown-visible';
                        displayed_Building = true;

                        if(defined(weatherList))
                            weatherList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-hidden';
                        displayed_Weather = false;

                        if(defined(networkList))
                            networkList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-hidden';
                        displayed_Network = false;

                        ecomapList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-hidden';
                        displayed_Ecomap = false;
                    }
                    else{
                        buildingList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-hidden';
                        displayed_Building = false;
                    }
                };


                buildingList = document.createElement('div');
                buildingList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-hidden';
                buildingList.style.maxWidth = "1160px";
                toolbar.appendChild(buildingList);

                weatherContainer_Weather.innerHTML = "<img src='img/weather-on.png' class='cesium-baseLayerPicker-selected'>";
                weatherContainer_Weather.onclick = function showWeatherList(){
                    if(!displayed_Weather){
                        weatherList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-dropDown-visible';
                        displayed_Weather = true;

                        if(defined(buildingList))
                            buildingList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-hidden';
                        displayed_Building = false;

                        if(defined(networkList))
                            networkList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-hidden';
                        displayed_Network = false;

                        ecomapList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-hidden';
                        displayed_Ecomap = false;
                    }
                    else{
                        weatherList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-hidden';
                        displayed_Weather = false;
                    }
                };


                weatherList = document.createElement('div');
                weatherList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-hidden';
                weatherList.style.maxWidth = "1160px";
                toolbar.appendChild(weatherList);


                var url = buildingWFSINIT.replace("__BUILDINGCODESPACE__",pilotCode);
                if(role == "administrator"  || role == "globalreader") url = buildingWFSINIT_ADMIN;

                    when(loadJson(url), function(buildingJSON) {
                        var totalB = 0;
                        var totalW = 0;
                            for(var i=0;i<buildingJSON.totalFeatures;i++){
                                var usrid = buildingJSON.features[i].properties.name;
                                var codespaceid = buildingJSON.features[i].properties.codespaceid;
                                var fid = buildingJSON.features[i].properties.identifier;
                                var identifier = buildingJSON.features[i].properties.procedureidentifier;

                                var typology = undefined;
                                if (fid.indexOf("/building/")>0) typology = "building";
                                if (fid.indexOf("/weatherstation/")>0) typology = "weather";
                                if (fid.indexOf("/shelter/")>0) typology = "shelter";

                                if(defined(usrid) && defined(codespaceid) && defined(identifier) &&typology != "weather"){
                                    var key = undefined;
                                    for (var element in pilot2codespaceid) {
                                        if(codespaceid == pilot2codespaceid[element]){
                                            key = element;
                                            break;
                                        }
                                    }

                                    if(defined(key) && !defined(buildingDataSourceMap[usrid])){
                                        totalB++;
                                        buildingDataSourceMap[usrid]=key;
                                        var buildingButton = document.createElement('div');
                                        buildingButton.id=usrid + "|" + identifier;
                                        buildingButton.className = 'cesium-baseLayerPicker-item';
                                        buildingButton.onclick = loadBuilding;
                                        buildingList.appendChild(buildingButton);

                                        var buildingIcon = document.createElement('img');
                                        buildingIcon.className = 'cesium-baseLayerPicker-itemIcon';
                                        buildingIcon.src = 'img/pilots/' + key + '.png';
                                        buildingButton.appendChild(buildingIcon);

                                        var buildingLabel = document.createElement('div');
                                        buildingLabel.className = 'cesium-baseLayerPicker-itemLabel';
                                        buildingLabel.textContent = usrid;
                                        buildingButton.appendChild(buildingLabel);
                                    }
                                }
                                else{
                                    var usrid = "W.S. " + buildingJSON.features[i].properties.name;
                                    if(defined(usrid) && defined(codespaceid) && typology == "weather"){
                                        var key = undefined;
                                        for (var element in pilot2codespaceid) {
                                            if(codespaceid == pilot2codespaceid[element]){
                                                key = element;
                                                break;
                                            }
                                        }

                                        if(defined(key) && !defined(buildingDataSourceMap[usrid])){
                                            totalW++;
                                            buildingDataSourceMap[usrid]=key;
                                            var weatherButton = document.createElement('div');
                                            weatherButton.id=usrid + "|" + identifier;
                                            weatherButton.className = 'cesium-baseLayerPicker-item';
                                            weatherButton.onclick = loadBuilding;
                                            weatherList.appendChild(weatherButton);

                                            var weatherIcon = document.createElement('img');
                                            weatherIcon.className = 'cesium-baseLayerPicker-itemIcon';
                                            weatherIcon.src = 'img/pilots/' + key + '.png';
                                            weatherButton.appendChild(weatherIcon);

                                            var weatherLabel = document.createElement('div');
                                            weatherLabel.className = 'cesium-baseLayerPicker-itemLabel';
                                            weatherLabel.textContent = usrid;
                                            weatherButton.appendChild(weatherLabel);
                                        }
                                    }
                                }
                            }

                        buildingList.style.width = (totalB*75) + "px";
                        weatherList.style.width = (totalW*75) + "px";
                    });
            }

            //SCENARIO 3
            var networkContainer_Lamp = document.createElement('button');
            networkContainer_Lamp.type = 'button';
            networkContainer_Lamp.className = 'cesium-button cesium-toolbar-button';
            networkContainer_Lamp.innerHTML = "<img src='img/bulb-off.png' class='cesium-baseLayerPicker-selected'>";
            networkContainer_Lamp.onclick = function redirect(){window.location="./login.html";}
            toolbar.appendChild(networkContainer_Lamp);

            //alert(grant == 2);
            if(role == "administrator" || role == "globalreader"  || pilotCode == "2" || pilotCode == "5" || pilotCode == "9" || pilotCode == "10"){
                networkContainer_Lamp.innerHTML = "<img src='img/bulb-on.png' class='cesium-baseLayerPicker-selected'>";
                networkContainer_Lamp.onclick = function showNetworkList(){
                    if(!displayed_Network){
                        networkList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-dropDown-visible';
                        displayed_Network = true;

                        if(defined(buildingList))
                            buildingList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-hidden';
                        displayed_Building = false;

                        if(defined(weatherList))
                            weatherList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-hidden';
                        displayed_Weather = false;

                        ecomapList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-hidden';
                        displayed_Ecomap = false;
                    }
                    else{
                        networkList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-hidden';
                        displayed_Network = false;
                    }
                };


                networkList = document.createElement('div');
                networkList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-hidden';
                networkList.style.maxWidth = "550px";
                toolbar.appendChild(networkList);

                var url = networkWFSINIT.replace("__NETWORKCODESPACE__",pilotCode);
                if(role == "administrator" || role == "globalreader") url = networkWFSINIT_ADMIN;

                when(loadJson(url), function(networkJSON) {
                    var total = 0;
                    for(var i=0;i<networkJSON.totalFeatures;i++){
                        var usrid = networkJSON.features[i].properties.name;
                        var codespaceid = networkJSON.features[i].properties.codespaceid;
                        var identifier = networkJSON.features[i].properties.procedureidentifier;

                        if(defined(usrid) && defined(codespaceid) && defined(identifier)){
                            var key = undefined;
                            for (var element in pilot2codespaceid) {
                                if(codespaceid == pilot2codespaceid[element]){
                                    key = element;
                                    break;
                                }
                            }

                            if(defined(key) && !defined(networkDataSourceMap[usrid])){
                                total++;
                                networkDataSourceMap[usrid]=key;
                                var networkButton = document.createElement('div');
                                networkButton.id=usrid + "|" + identifier;
                                networkButton.className = 'cesium-baseLayerPicker-item';
                                networkButton.onclick = loadNetwork;
                                networkList.appendChild(networkButton);

                                var networkIcon = document.createElement('img');
                                networkIcon.className = 'cesium-baseLayerPicker-itemIcon';
                                networkIcon.src = 'img/pilots/' + key + '.png';
                                networkButton.appendChild(networkIcon);

                                var networkLabel = document.createElement('div');
                                networkLabel.className = 'cesium-baseLayerPicker-itemLabel';
                                networkLabel.textContent = usrid;
                                networkButton.appendChild(networkLabel);
                            }
                        }
                    }

                    networkList.style.width = (total*75) + "px";
                });
            }
        }


        var buildingDataSource = new Array();
        var scenario2 = new Scenario2();
        var sphereGeometry = new SphereGeometry({
            vertexFormat : PerInstanceColorAppearance.VERTEX_FORMAT,
            radius : 0.00003
        });


        function loadBuilding(){

            var selectedid = this.id.split('|')[0];
            var identifier = this.id.split('|')[1];

            removeKML();

            //CARICO glTF SE NON CARICATI
            if(!defined(buildingDataSource[buildingDataSourceMap[selectedid]])){
                buildingDataSource[buildingDataSourceMap[selectedid]] = true;
                var url = buildingWFSURL.replace("__BUILDINGCODESPACE__",pilot2codespaceid[buildingDataSourceMap[selectedid]]);

                when(loadJson(url), function(buildingJSON) {
                    var globalHeights = [];
                    var tempHeights = [];

                    for(var i=0;i<buildingJSON.totalFeatures;i++){

                        var coordinates = buildingJSON.features[i].geometry.coordinates;
                        var id = buildingJSON.features[i].properties.identifier;

                        tempHeights[i] = Cartographic.fromDegrees(coordinates[1], coordinates[0]);
                        globalHeights[id] = i;
                    }

                    //var promise = sampleTerrain(terrainProvider, 14, tempHeights);
                    var promise = sampleTerrain(terrainProvider, 9, tempHeights);

                    when(promise, function() {

                        for(var key in globalHeights){
                            var i =  globalHeights[key];
                            globalHeights[key] = tempHeights[i];
                        }

                        for(var i=0;i<buildingJSON.totalFeatures;i++){

                            var coordinates = buildingJSON.features[i].geometry.coordinates;
                            var identifier = buildingJSON.features[i].properties.procedureidentifier;
                            var fid = buildingJSON.features[i].properties.identifier;
                            var usrid = buildingJSON.features[i].properties.name;
                            var foiid = buildingJSON.features[i].properties.featureofinterestid;
                            var suggestion = buildingJSON.features[i].properties.isinvolved;


                            var typology = undefined;
                            var color = undefined;
                            if (fid.indexOf("/building/")>0) {typology = "building"; color = Color.CRIMSON;};
                            if (fid.indexOf("/weatherstation/")>0) {typology = "weather"; color = Color.CORNFLOWERBLUE};
                            if (fid.indexOf("/shelter/")>0) {typology = "shelter"; color = Color.INDIGO};

                            if(typology == "weather"){
                                usrid = "W.S. " + usrid;
                                coordinates[1] += 0.00006;
                                coordinates[0] += 0.00006;
                            }

                            if(defined(typology) && !defined(buildingDataSourcesCoordinates[usrid])){

                                var sphereModelMatrix = Matrix4.multiplyByUniformScale(Matrix4.multiplyByTranslation(Transforms.eastNorthUpToFixedFrame(Cartesian3.fromDegrees(coordinates[1], coordinates[0])), new Cartesian3(0.0, 0.0, globalHeights[fid].height), new Matrix4()), 90000.0, new Matrix4());

                                scene.primitives.add(new Primitive({
                                    geometryInstances : new GeometryInstance({
                                        geometry : sphereGeometry,
                                        modelMatrix : sphereModelMatrix,
                                        id: buildingDataSourceMap[selectedid] + "|" + usrid + "|" + typology + "|" + identifier + "|" + foiid + "|" + suggestion,
                                        attributes : {
                                            color : ColorGeometryInstanceAttribute.fromColor(color)
                                        }
                                    }),
                                    appearance : new PerInstanceColorAppearance({
                                        translucent : false,
                                        closed : true
                                    })
                                }));


                                coordinates[2] = globalHeights[fid].height;
                                buildingDataSourcesCoordinates[usrid] = coordinates;

                                //FLIGHT ANIMATION
                                if(usrid == selectedid){
                                    var destination = Cartesian3.fromDegrees(coordinates[1], coordinates[0], coordinates[2]+200);
                                    scene.camera.flyTo({destination : destination});
                                }
                            }
                        }
                    });
                });
            }
            else{
                var coordinates = buildingDataSourcesCoordinates[selectedid];

                //FLIGHT ANIMATION
                var destination = Cartesian3.fromDegrees(coordinates[1], coordinates[0], coordinates[2]+200);
                scene.camera.flyTo({destination : destination});
            }


                buildingList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-hidden';
                displayed_Building = false;

                weatherList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-hidden';
                displayed_Weather = false;


            scenario2.DisplayBuildingStats(buildingDataSourceMap[selectedid], identifier);
        }

        var networkDataSource = new Array();
        var scenario3 = new Scenario3();
        function loadNetwork(){

            var selectedid = this.id.split('|')[0];
            var identifier = this.id.split('|')[1];

            removeKML();

            //CARICO glTF SE NON CARICATI
            if(!defined(networkDataSource[networkDataSourceMap[selectedid]])){
                networkDataSource[networkDataSourceMap[selectedid]] = true;
                var url = networkWFSURL.replace("__NETWORKCODESPACE__",pilot2codespaceid[networkDataSourceMap[selectedid]]);

                when(loadJson(url), function(networkJSON) {
                    var globalHeights = [];
                    var tempHeights = [];
                    for(var i=0;i<networkJSON.totalFeatures;i++){

                        var coordinates = networkJSON.features[i].geometry.coordinates;
                        var id = networkJSON.features[i].properties.identifier;

                        tempHeights[i] = Cartographic.fromDegrees(coordinates[1], coordinates[0]);
                        globalHeights[id] = i;
                    }

                    //var promise = sampleTerrain(terrainProvider, 14, tempHeights);
                    var promise = sampleTerrain(terrainProvider, 9, tempHeights);

                    when(promise, function() {

                        for(var key in globalHeights){
                            var i =  globalHeights[key];
                            globalHeights[key] = tempHeights[i];
                        }

                        for(var i=0;i<networkJSON.totalFeatures;i++){

                            var coordinates = networkJSON.features[i].geometry.coordinates;
                            var identifier = networkJSON.features[i].properties.procedureidentifier;
                            var fid = networkJSON.features[i].properties.identifier;
                            var usrid = networkJSON.features[i].properties.name;

                            var typology = undefined;
                            var color = undefined;
                            if (fid.indexOf("/lightline/")>0) {typology = "lightline"; color = Color.DARKORANGE};
                            if (fid.indexOf("/lamp/")>0) {typology = "lamp"; color = Color.GOLD};

                            if(defined(typology) && !defined(networkDataSourcesCoordinates[usrid])){
                                if(typology == "lamp"){
                                    for(var j=0;j<i;j++){
                                        var newcoord = networkJSON.features[j].geometry.coordinates;

                                        if(newcoord.toString() == coordinates.toString()){
                                            coordinates[1] += 0.00003;
                                            coordinates[0] += 0.00003;
                                        }
                                    }
                                }

                                var sphereModelMatrix = Matrix4.multiplyByUniformScale(Matrix4.multiplyByTranslation(Transforms.eastNorthUpToFixedFrame(Cartesian3.fromDegrees(coordinates[1], coordinates[0])), new Cartesian3(0.0, 0.0, globalHeights[fid].height), new Matrix4()), 90000.0, new Matrix4());

                                scene.primitives.add(new Primitive({
                                    geometryInstances : new GeometryInstance({
                                        geometry : sphereGeometry,
                                        modelMatrix : sphereModelMatrix,
                                        id: networkDataSourceMap[selectedid] + "|" + usrid + "|" + typology + "|" + identifier,
                                        attributes : {
                                            color : ColorGeometryInstanceAttribute.fromColor(color)
                                        }
                                    }),
                                    appearance : new PerInstanceColorAppearance({
                                        translucent : false,
                                        closed : true
                                    })
                                }));

                                if(typology != "lamp"){
                                    coordinates[2] = globalHeights[fid].height;
                                    networkDataSourcesCoordinates[usrid] = coordinates;

                                    //FLIGHT ANIMATION
                                    if(usrid == selectedid){
                                        var destination = Cartesian3.fromDegrees(coordinates[1], coordinates[0], coordinates[2]+500);
                                        scene.camera.flyTo({destination : destination});
                                    }
                                }
                            }
                        }
                    });
                });
            }
            else{
                var coordinates = networkDataSourcesCoordinates[selectedid];

                //FLIGHT ANIMATION
                var destination = Cartesian3.fromDegrees(coordinates[1], coordinates[0], coordinates[2]+500);
                scene.camera.flyTo({destination : destination});
            }


            networkList.className = 'cesium-baseLayerPicker-dropDown cesium-baseLayerPicker-hidden';
            displayed_Network = false;


            scenario3.DisplayNetworkStats(networkDataSourceMap[selectedid],identifier);
        }

        /**
         * Gets or sets the data source to track with the viewer's clock.
         * @type {DataSource}
         */
        this.clockTrackedDataSource = undefined;

        knockout.track(this, ['clockTrackedDataSource']);

        this._dataSourceChangedListeners = {};
        this._knockoutSubscriptions = [];
        var automaticallyTrackDataSourceClocks = defaultValue(options.automaticallyTrackDataSourceClocks, true);

        function trackDataSourceClock(dataSource) {
            if (defined(dataSource)) {
                var dataSourceClock = dataSource.clock;
                if (defined(dataSourceClock)) {
                    dataSourceClock.getValue(clock);
                    if (defined(timeline)) {
                        timeline.updateFromClock();
                        timeline.zoomTo(dataSourceClock.startTime, dataSourceClock.stopTime);
                    }
                }
            }
        }

        this._knockoutSubscriptions.push(subscribeAndEvaluate(this, 'clockTrackedDataSource', function(value) {
            trackDataSourceClock(value);
        }));

        var onDataSourceChanged = function(dataSource) {
            if (that.clockTrackedDataSource === dataSource) {
                trackDataSourceClock(dataSource);
            }
        };

        var onDataSourceAdded = function(dataSourceCollection, dataSource) {
            if (automaticallyTrackDataSourceClocks) {
                that.clockTrackedDataSource = dataSource;
            }
            var id = dataSource.entities.id;
            var removalFunc = eventHelper.add(dataSource.changedEvent, onDataSourceChanged);
            that._dataSourceChangedListeners[id] = removalFunc;
        };

        var onDataSourceRemoved = function(dataSourceCollection, dataSource) {
            var resetClock = (that.clockTrackedDataSource === dataSource);
            var id = dataSource.entities.id;
            that._dataSourceChangedListeners[id]();
            that._dataSourceChangedListeners[id] = undefined;
            if (resetClock) {
                var numDataSources = dataSourceCollection.length;
                if (automaticallyTrackDataSourceClocks && numDataSources > 0) {
                    that.clockTrackedDataSource = dataSourceCollection.get(numDataSources - 1);
                } else {
                    that.clockTrackedDataSource = undefined;
                }
            }
        };

        eventHelper.add(dataSourceCollection.dataSourceAdded, onDataSourceAdded);
        eventHelper.add(dataSourceCollection.dataSourceRemoved, onDataSourceRemoved);

        this._container = container;
        this._bottomContainer = bottomContainer;
        this._element = viewerContainer;
        this._cesiumWidget = cesiumWidget;
        this._selectionIndicator = selectionIndicator;
        this._infoBox = infoBox;
        this._dataSourceCollection = dataSourceCollection;
        this._destroyDataSourceCollection = destroyDataSourceCollection;
        this._dataSourceDisplay = dataSourceDisplay;
        this._clockViewModel = clockViewModel;
        this._toolbar = toolbar;
        this._homeButton = homeButton;
        this._sceneModePicker = sceneModePicker;
        this._baseLayerPicker = baseLayerPicker;
        this._animation = animation;
        this._timeline = timeline;
        this._fullscreenButton = fullscreenButton;
        this._geocoder = geocoder;
        this._eventHelper = eventHelper;
        this._lastWidth = 0;
        this._lastHeight = 0;
        this._allowDataSourcesToSuspendAnimation = true;

        // Prior to each render, check if anything needs to be resized.
        cesiumWidget.scene.preRender.addEventListener(function(scene, time) {
            resizeViewer(that);
        });
    };

    defineProperties(Viewer.prototype, {
        /**
         * Gets the parent container.
         * @memberof Viewer.prototype
         * @type {Element}
         */
        container : {
            get : function() {
                return this._container;
            }
        },

        /**
         * Gets the DOM element for the area at the bottom of the window containing the
         * {@link CreditDisplay} and potentially other things.
         * @memberof Viewer.prototype
         * @type {Element}
         */
        bottomContainer : {
            get : function() {
                return this._bottomContainer;
            }
        },

        /**
         * Gets the CesiumWidget.
         * @memberof Viewer.prototype
         * @type {CesiumWidget}
         */
        cesiumWidget : {
            get : function() {
                return this._cesiumWidget;
            }
        },

        /**
         * Gets the selection indicator.
         * @memberof Viewer.prototype
         * @type {SelectionIndicator}
         */
        selectionIndicator : {
            get : function() {
                return this._selectionIndicator;
            }
        },

        /**
         * Gets the info box.
         * @memberof Viewer.prototype
         * @type {InfoBox}
         */
        infoBox : {
            get : function() {
                return this._infoBox;
            }
        },

        /**
         * Gets the Geocoder.
         * @memberof Viewer.prototype
         * @type {Geocoder}
         */
        geocoder : {
            get : function() {
                return this._geocoder;
            }
        },

        /**
         * Gets the HomeButton.
         * @memberof Viewer.prototype
         * @type {HomeButton}
         */
        homeButton : {
            get : function() {
                return this._homeButton;
            }
        },

        /**
         * Gets the SceneModePicker.
         * @memberof Viewer.prototype
         * @type {SceneModePicker}
         */
        sceneModePicker : {
            get : function() {
                return this._sceneModePicker;
            }
        },

        /**
         * Gets the BaseLayerPicker.
         * @memberof Viewer.prototype
         * @type {BaseLayerPicker}
         */
        baseLayerPicker : {
            get : function() {
                return this._baseLayerPicker;
            }
        },

        /**
         * Gets the Animation widget.
         * @memberof Viewer.prototype
         * @type {Animation}
         */
        animation : {
            get : function() {
                return this._animation;
            }
        },

        /**
         * Gets the Timeline widget.
         * @memberof Viewer.prototype
         * @type {Timeline}
         */
        timeline : {
            get : function() {
                return this._timeline;
            }
        },

        /**
         * Gets the FullscreenButton.
         * @memberof Viewer.prototype
         * @type {FullscreenButton}
         */
        fullscreenButton : {
            get : function() {
                return this._fullscreenButton;
            }
        },

        /**
         * Gets the display used for {@link DataSource} visualization.
         * @memberof Viewer.prototype
         * @type {DataSourceDisplay}
         */
        dataSourceDisplay : {
            get : function() {
                return this._dataSourceDisplay;
            }
        },

        /**
         * Gets the set of {@link DataSource} instances to be visualized.
         * @memberof Viewer.prototype
         * @type {DataSourceCollection}
         */
        dataSources : {
            get : function() {
                return this._dataSourceCollection;
            }
        },

        /**
         * Gets the canvas.
         * @memberof Viewer.prototype
         * @type {Canvas}
         */
        canvas : {
            get : function() {
                return this._cesiumWidget.canvas;
            }
        },

        /**
         * Gets the Cesium logo element.
         * @memberof Viewer.prototype
         * @type {Element}
         */
        cesiumLogo : {
            get : function() {
                return this._cesiumWidget.cesiumLogo;
            }
        },

        /**
         * Gets the scene.
         * @memberof Viewer.prototype
         * @type {Scene}
         */
        scene : {
            get : function() {
                return this._cesiumWidget.scene;
            }
        },

        /**
         * Gets the clock.
         * @memberof Viewer.prototype
         * @type {Clock}
         */
        clock : {
            get : function() {
                return this._cesiumWidget.clock;
            }
        },

        /**
         * Gets the screen space event handler.
         * @memberof Viewer.prototype
         * @type {ScreenSpaceEventHandler}
         */
        screenSpaceEventHandler : {
            get : function() {
                return this._cesiumWidget.screenSpaceEventHandler;
            }
        },

        /**
         * Gets or sets the target frame rate of the widget when <code>useDefaultRenderLoop</code>
         * is true. If undefined, the browser's {@link requestAnimationFrame} implementation
         * determines the frame rate.  This value must be greater than 0 and a value higher than
         * the underlying requestAnimationFrame implementatin will have no effect.
         * @memberof Viewer.prototype
         *
         * @type {Number}
         */
        targetFrameRate : {
            get : function() {
                return this._cesiumWidget.targetFrameRate;
            },
            set : function(value) {
                this._cesiumWidget.targetFrameRate = value;
            }
        },

        /**
         * Gets or sets whether or not this widget should control the render loop.
         * If set to true the widget will use {@link requestAnimationFrame} to
         * perform rendering and resizing of the widget, as well as drive the
         * simulation clock. If set to false, you must manually call the
         * <code>resize</code>, <code>render</code> methods
         * as part of a custom render loop.  If an error occurs during rendering, {@link Scene}'s
         * <code>renderError</code> event will be raised and this property
         * will be set to false.  It must be set back to true to continue rendering
         * after the error.
         * @memberof Viewer.prototype
         *
         * @type {Boolean}
         */
        useDefaultRenderLoop : {
            get : function() {
                return this._cesiumWidget.useDefaultRenderLoop;
            },
            set : function(value) {
                this._cesiumWidget.useDefaultRenderLoop = value;
            }
        },

        /**
         * Gets or sets a scaling factor for rendering resolution.  Values less than 1.0 can improve
         * performance on less powerful devices while values greater than 1.0 will render at a higher
         * resolution and then scale down, resulting in improved visual fidelity.
         * For example, if the widget is laid out at a size of 640x480, setting this value to 0.5
         * will cause the scene to be rendered at 320x240 and then scaled up while setting
         * it to 2.0 will cause the scene to be rendered at 1280x960 and then scaled down.
         * @memberof Viewer.prototype
         *
         * @type {Number}
         * @default 1.0
         */
        resolutionScale : {
            get : function() {
                return this._cesiumWidget.resolutionScale;
            },
            set : function(value) {
                this._cesiumWidget.resolutionScale = value;
            }
        },

        /**
         * Gets or sets whether or not data sources can temporarily pause
         * animation in order to avoid showing an incomplete picture to the user.
         * For example, if asynchronous primitives are being processed in the
         * background, the clock will not advance until the geometry is ready.
         *
         * @memberof Viewer.prototype
         *
         * @type {Boolean}
         */
        allowDataSourcesToSuspendAnimation : {
            get : function() {
                return this._allowDataSourcesToSuspendAnimation;
            },
            set : function(value) {
                this._allowDataSourcesToSuspendAnimation = value;
            }
        }
    });

    /**
     * Extends the base viewer functionality with the provided mixin.
     * A mixin may add additional properties, functions, or other behavior
     * to the provided viewer instance.
     *
     * @param {Viewer~ViewerMixin} mixin The Viewer mixin to add to this instance.
     * @param {Object} options The options object to be passed to the mixin function.
     *
     * @see viewerDragDropMixin
     * @see viewerEntityMixin
     */
    Viewer.prototype.extend = function(mixin, options) {
        //>>includeStart('debug', pragmas.debug);
        if (!defined(mixin)) {
            throw new DeveloperError('mixin is required.');
        }
        //>>includeEnd('debug')

        mixin(this, options);
    };

    /**
     * Resizes the widget to match the container size.
     * This function is called automatically as needed unless
     * <code>useDefaultRenderLoop</code> is set to false.
     */
    Viewer.prototype.resize = function() {
        var cesiumWidget = this._cesiumWidget;
        cesiumWidget.resize();
        resizeViewer(this);
    };

    /**
     * This forces the widget to re-think its layout, including
     * widget sizes and credit placement.
     */
    Viewer.prototype.forceResize = function() {
        this._lastWidth = 0;
        this.resize();
    };

    /**
     * Renders the scene.  This function is called automatically
     * unless <code>useDefaultRenderLoop</code> is set to false;
     */
    Viewer.prototype.render = function() {
        this._cesiumWidget.render();
    };

    /**
     * @returns {Boolean} true if the object has been destroyed, false otherwise.
     */
    Viewer.prototype.isDestroyed = function() {
        return false;
    };

    /**
     * Destroys the widget.  Should be called if permanently
     * removing the widget from layout.
     */
    Viewer.prototype.destroy = function() {
        var i;
        var numSubscriptions = this._knockoutSubscriptions.length;
        for (i = 0; i < numSubscriptions; i++) {
            this._knockoutSubscriptions[i].dispose();
        }

        this._container.removeChild(this._element);
        this._element.removeChild(this._toolbar);

        this._eventHelper.removeAll();

        if (defined(this._geocoder)) {
            this._geocoder = this._geocoder.destroy();
        }

        if (defined(this._homeButton)) {
            this._homeButton = this._homeButton.destroy();
        }

        if (defined(this._sceneModePicker)) {
            this._sceneModePicker = this._sceneModePicker.destroy();
        }

        if (defined(this._baseLayerPicker)) {
            this._baseLayerPicker = this._baseLayerPicker.destroy();
        }

        if (defined(this._animation)) {
            this._element.removeChild(this._animation.container);
            this._animation = this._animation.destroy();
        }

        if (defined(this._timeline)) {
            this._timeline.removeEventListener('settime', onTimelineScrubfunction, false);
            this._element.removeChild(this._timeline.container);
            this._timeline = this._timeline.destroy();
        }

        if (defined(this._fullscreenButton)) {
            this._fullscreenSubscription.dispose();
            this._element.removeChild(this._fullscreenButton.container);
            this._fullscreenButton = this._fullscreenButton.destroy();
        }

        if (defined(this._infoBox)) {
            this._element.removeChild(this._infoBox.container);
            this._infoBox = this._infoBox.destroy();
        }

        if (defined(this._selectionIndicator)) {
            this._element.removeChild(this._selectionIndicator.container);
            this._selectionIndicator = this._selectionIndicator.destroy();
        }

        this._clockViewModel = this._clockViewModel.destroy();
        this._dataSourceDisplay = this._dataSourceDisplay.destroy();
        this._cesiumWidget = this._cesiumWidget.destroy();

        if (this._destroyDataSourceCollection) {
            this._dataSourceCollection = this._dataSourceCollection.destroy();
        }

        return destroyObject(this);
    };

    function resizeViewer(viewer) {
        var container = viewer._container;
        var width = container.clientWidth;
        var height = container.clientHeight;
        var animationExists = defined(viewer._animation);
        var timelineExists = defined(viewer._timeline);

        if (width === viewer._lastWidth && height === viewer._lastHeight) {
            return;
        }

        var panelMaxHeight = height - 125;
        var baseLayerPickerDropDown = viewer._baseLayerPickerDropDown;

        if (defined(baseLayerPickerDropDown)) {
            baseLayerPickerDropDown.style.maxHeight = panelMaxHeight + 'px';
        }

        if (defined(viewer._infoBox)) {
            viewer._infoBox.viewModel.maxHeight = panelMaxHeight;
        }

        var timeline = viewer._timeline;
        var animationContainer;
        var animationWidth = 0;
        var creditLeft = 0;
        var creditBottom = 0;

        if (animationExists && window.getComputedStyle(viewer._animation.container).visibility !== 'hidden') {
            var lastWidth = viewer._lastWidth;
            animationContainer = viewer._animation.container;
            if (width > 900) {
                animationWidth = 169;
                if (lastWidth <= 900) {
                    animationContainer.style.width = '169px';
                    animationContainer.style.height = '112px';
                    viewer._animation.resize();
                }
            } else if (width >= 600) {
                animationWidth = 136;
                if (lastWidth < 600 || lastWidth > 900) {
                    animationContainer.style.width = '136px';
                    animationContainer.style.height = '90px';
                    viewer._animation.resize();
                }
            } else {
                animationWidth = 106;
                if (lastWidth > 600 || lastWidth === 0) {
                    animationContainer.style.width = '106px';
                    animationContainer.style.height = '70px';
                    viewer._animation.resize();
                }
            }
            creditLeft = animationWidth + 5;
        }

        if (timelineExists && window.getComputedStyle(viewer._timeline.container).visibility !== 'hidden') {
            var fullscreenButton = viewer._fullscreenButton;
            var timelineContainer = timeline.container;
            var timelineStyle = timelineContainer.style;

            creditBottom = timelineContainer.clientHeight + 3;
            timelineStyle.left = animationWidth + 'px';

            if (defined(fullscreenButton)) {
                timelineStyle.right = fullscreenButton.container.clientWidth + 'px';
            }
            timeline.resize();
        }

        viewer._bottomContainer.style.left = creditLeft + 'px';
        viewer._bottomContainer.style.bottom = creditBottom + 'px';

        viewer._lastWidth = width;
        viewer._lastHeight = height;
    }

    /**
     * A function that augments a Viewer instance with additional functionality.
     * @callback Viewer~ViewerMixin
     * @param {Viewer} viewer The viewer instance.
     * @param {Object} options Options object to be passed to the mixin function.
     *
     * @see Viewer#extend
     */

    return Viewer;
});

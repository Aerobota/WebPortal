/*global define*/
define([
        'Core/defined',
        'Core/formatError',
        'Core/getFilenameFromUri',
        'DataSources/CzmlDataSource',
        'DataSources/GeoJsonDataSource',
        'Scene/TileMapServiceImageryProvider',
        'Widgets/Viewer/Viewer',
        'Widgets/Viewer/viewerCesiumInspectorMixin',
        'Widgets/Viewer/viewerDragDropMixin',
        'Widgets/Viewer/viewerEntityMixin',
        /////////////////////////////////////////////////////////////////
        'Core/Rectangle',
        'Core/CesiumTerrainProvider',
        'Core/ScreenSpaceEventHandler',
        'Core/ScreenSpaceEventType',
        'Core/ColorGeometryInstanceAttribute',
        'Core/Color',
        'Core/Math',
        'domReady!'
    ], function(
        defined,
        formatError,
        getFilenameFromUri,
        CzmlDataSource,
        GeoJsonDataSource,
        TileMapServiceImageryProvider,
        Viewer,
        viewerCesiumInspectorMixin,
        viewerDragDropMixin,
        viewerEntityMixin,
        //////////////////////////////////////////////////////////////////
        Rectangle,
        CesiumTerrainProvider,
        ScreenSpaceEventHandler,
        ScreenSpaceEventType,
        ColorGeometryInstanceAttribute,
        Color,
        Mathf
        ) {
    "use strict";
    /*global console*/

    /*
     * 'debug'  : true/false,   // Full WebGL error reporting at substantial performance cost.
     * 'lookAt' : CZML id,      // The CZML ID of the object to track at startup.
     * 'source' : 'file.czml',  // The relative URL of the CZML file to load at startup.
     * 'stats'  : true,         // Enable the FPS performance display.
     * 'theme'  : 'lighter',    // Use the dark-text-on-light-background theme.
     * 'scene3DOnly' : false    // Enable 3D only mode
     */
    var endUserOptions = {};
    var queryString = window.location.search.substring(1);
    if (queryString !== '') {
        var params = queryString.split('&');
        for (var i = 0, len = params.length; i < len; ++i) {
            var param = params[i];
            var keyValuePair = param.split('=');
            if (keyValuePair.length > 1) {
                endUserOptions[keyValuePair[0]] = decodeURIComponent(keyValuePair[1].replace(/\+/g, ' '));
            }
        }
    }

    var loadingIndicator = document.getElementById('loadingIndicator');

    var supported = false;

    if (navigator.userAgent.indexOf('Firefox') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Firefox') + 8)) >= 3.6){//Firefox
        supported = true;
    }else if (navigator.userAgent.indexOf('Chrome') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Chrome') + 7).split(' ')[0]) >= 15){//Chrome
        supported = true;
    }else if(navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Version') != -1 && parseFloat(navigator.userAgent.substring(navigator.userAgent.indexOf('Version') + 8).split(' ')[0]) >= 5){//Safari
        supported = false;
    }else{
        supported = true;
    }

    console.log("BROWSER SUPPORTED: " + supported);

    if(!supported){
        var browserNotSupported = document.getElementById('browserNotSupported');
        var body = document.body,html = document.documentElement;
        browserNotSupported.style.height = Math.max( body.scrollHeight, body.offsetHeight,html.clientHeight, html.scrollHeight, html.offsetHeight ) + "px";
        browserNotSupported.className="fullScreenLoader";
    }


    var imageryProvider;

    if (endUserOptions.tmsImageryUrl) {
        imageryProvider = new TileMapServiceImageryProvider({
            url : endUserOptions.tmsImageryUrl
        });
    }

    var viewer;
    try {
        viewer = new Viewer('cesiumContainer', {
            navigationHelpButton: false,
            showRenderLoopErrors : false,
            timeline : false,
            sceneModePicker: false,
            animation : false,
            infoBox : false,
            fullscreenButton : false
        });
    } catch (exception) {
        loadingIndicator.style.display = 'none';
        var message = formatError(exception);
          if (!document.querySelector('.cesium-widget-errorPanel')) {
            window.alert(message);
        }
        return;
    }

    viewer.extend(viewerDragDropMixin);
    viewer.extend(viewerEntityMixin);
    if (endUserOptions.inspector) {
        viewer.extend(viewerCesiumInspectorMixin);
    }

    var showLoadError = function(name, error) {
        var title = 'An error occurred while loading the file: ' + name;
        var message = 'An error occurred while loading the file, which may indicate that it is invalid.  A detailed error report is below:';
        viewer.cesiumWidget.showErrorPanel(title, message, error);
    };

    viewer.dropError.addEventListener(function(viewerArg, name, error) {
        showLoadError(name, error);
    });

    var scene = viewer.scene;
    var context = scene.context;
    if (endUserOptions.debug) {
        context.validateShaderProgram = true;
        context.validateFramebuffer = true;
        context.logShaderCompilation = true;
        context.throwOnWebGLError = true;
    }

    if (endUserOptions.stats) {
        scene.debugShowFramesPerSecond = true;
    }

    var theme = endUserOptions.theme;
    if (defined(theme)) {
        if (endUserOptions.theme === 'lighter') {
            document.body.classList.add('cesium-lighter');
            viewer.animation.applyThemeChanges();
        } else {
            var error = 'Unknown theme: ' + theme;
            viewer.cesiumWidget.showErrorPanel(error, '');
        }
    }

    /*
     *
     *
     *   INIZIO CUSTOMIZZAZIONE SUNSHINE
     *
     *
     */

    //SISTEMO LA CAMERA NEL PUNTO INIZIALE
    var west = 0.0;
    var south = 35.0;
    var east = 30.0;
    var north = 55.0;

    scene.camera.viewRectangle(Rectangle.fromDegrees(west, south, east, north));


    //CARICO TERRENO
    var globe = scene.globe;
    globe.depthTestAgainstTerrain = true;

    var cesiumTerrainProviderHeightmaps = new CesiumTerrainProvider({
        //url : 'http://cesiumjs.org/smallterrain'
        //url : '//assets.agi.com/stk-terrain/world'
        url : './elev_world_0-9'
    });

    scene.terrainProvider = cesiumTerrainProviderHeightmaps;

    //globe._surface.tileProvider._debug.wireframe = true;

    window.onkeydown = function (e) {
        var code = e.keyCode ? e.keyCode : e.which;
        if(code === 81){ //q
            globe._surface.tileProvider._debug.wireframe = true;
        }
        if(code === 82){ //r
            globe._surface.tileProvider._debug.wireframe = false;
        }
    }

    //PICKING SU MODELLI KML -> VIEWER.JS PER CARICARLI
     var scrollhandler = new ScreenSpaceEventHandler(scene.canvas);

    // Move the primitive that the mouse is over to the top.
    var lastUUID;
    var lastBillboardID;
    var picked = false;
    var statusbar = document.getElementById("cesium-widget-status");

    scrollhandler.setInputAction(function(movement) {
        var pickedObject = scene.pick(movement.endPosition);
        if(defined(pickedObject)){
            if(defined(pickedObject.id)){
                picked = true;

                var name;
                var typology;

                if(defined(pickedObject.id.name)){
                    lastUUID = pickedObject.id.name;
                    lastBillboardID = undefined;

                    name = lastUUID;
                    typology = "Building";
                }
                else{
                    lastUUID = undefined;
                    lastBillboardID = pickedObject.id;

                    name = lastBillboardID.split("|")[1];
                    typology = lastBillboardID.split("|")[2];
                }

                statusbar.textContent = typology.toUpperCase() + ": " + name;
                document.body.style.cursor = 'pointer';
            }
        }
        else{
            picked = false;
            document.body.style.cursor = 'default';
            statusbar.textContent = "Info Bar";
        }
    }, ScreenSpaceEventType.MOUSE_MOVE);

    var clicklhandler = new ScreenSpaceEventHandler(scene.canvas);
    var scenario1 = new Scenario1();
    var scenario2 = new Scenario2();
    var scenario3 = new Scenario3();

    clicklhandler.setInputAction(function() {
        if(defined(lastUUID) && picked){
            scenario1.DisplayBuildingDetails(lastUUID);
            lastUUID = undefined;
        }
        else if(defined(lastBillboardID) && picked){
            var typology = lastBillboardID.split("|")[2];

            switch(typology){
                case "lightline" : scenario3.DisplayNetworkDetails(lastBillboardID); break;
                case "lamp" : scenario3.DisplayNetworkDetails(lastBillboardID); break;
                case "building" : scenario2.DisplayBuildingDetails(lastBillboardID); break;
                case "weather" : scenario2.DisplayBuildingDetails(lastBillboardID); break;
                case "shelter" : scenario2.DisplayBuildingDetails(lastBillboardID); break;
                default : break;
            }
            lastBillboardID = undefined;
        }
    }, ScreenSpaceEventType.LEFT_CLICK);

    setTimeout(function(){
        var toolbar = document.getElementById('cesium-viewer-toolbar');
        toolbar.style.visibility = "visible";
        loadingIndicator.style.display = 'none';

        //COMPASS
        var compass = document.createElement('img');
        compass.id = "compass";
        compass.className = 'compass';
        compass.src = "img/compass.png";
        $("#cesiumContainer").prepend(compass);
        scene.preRender.addEventListener(setCompass);
    }, 3000);

    function setCompass() {
        $("#compass").css({
            '-webkit-transform': 'rotate(' + Mathf.toDegrees(-scene.camera.heading) + 'deg)',  //Safari 3.1+, Chrome
            '-moz-transform': 'rotate(' + Mathf.toDegrees(-scene.camera.heading) + 'deg)',     //Firefox 3.5-15
            '-ms-transform': 'rotate(' + Mathf.toDegrees(-scene.camera.heading) + 'deg)',      //IE9+
            '-o-transform': 'rotate(' + Mathf.toDegrees(-scene.camera.heading) + 'deg)',       //Opera 10.5-12.00
            'transform': 'rotate(' + Mathf.toDegrees(-scene.camera.heading) + 'deg)'
        });
    }

});



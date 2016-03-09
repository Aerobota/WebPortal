/**
 * Created by u.di.staso on 17/02/15.
 */

window.Scenario2 = function(){

    var opt = {
        graphMin :0,
        //graphMax : 1.5,
        //inGraphDataShow : true,
        annotateDisplay : true,
        scaleFontSize : 10,
        legend : true,
        legendBorders:false,
        showSingleLegend: true,
        annotateLabel : "<%=v3%>"
    }

    var optDoughnut = {
        graphMin :0,
        //graphMax : 1.5,
        //inGraphDataShow : true,
        annotateDisplay : true,
        scaleFontSize : 10,
        legend : true,
        legendBorders:false,
        showSingleLegend: true,
        annotateLabel : "<%=v2%>",
        percentageInnerCutout : 75
    }

    var optNOTFILL = {
        graphMin :0,
        datasetFill: false ,
        //inGraphDataShow : true,
        annotateDisplay : true,
        scaleFontSize : 10,
        pointDotStrokeWidth : 2,
        pointDotRadius : 5,
        pointDot : true,
        legend : true,
        legendBorders:false,
        showSingleLegend: true,
        annotateLabel : "<%=v3%>"
    }

    var optNOTFILL4Temp = {
        //graphMin :0,
        datasetFill: false ,
        //inGraphDataShow : true,
        annotateDisplay : true,
        scaleFontSize : 10,
        pointDotStrokeWidth : 2,
        pointDotRadius : 5,
        pointDot : true,
        legend : true,
        legendBorders:false,
        showSingleLegend: true,
        annotateLabel : "<%=v3%>"
    }

    var optNOTFILLDoubleY4Weather = {
        //graphMin :0,
        datasetFill: false ,
        //inGraphDataShow : true,
        annotateDisplay : true,
        scaleFontSize : 10,
        pointDotStrokeWidth : 2,
        pointDotRadius : 5,
        pointDot : true,
        legend : true,
        legendBorders:false,
        yAxisRight : true,
        showSingleLegend: true,
        annotateLabel : "<%=v3%>"
    }

    var loadingIndicator = document.getElementById('fullScreenLoader');
    var loadingIndicator4stats = document.getElementById('loadingIndicator4BUILDINGstats');

    var month=new Array();
    month[0]="Jan";
    month[1]="Feb";
    month[2]="Mar";
    month[3]="Apr";
    month[4]="May";
    month[5]="Jun";
    month[6]="Jul";
    month[7]="Aug";
    month[8]="Sep";
    month[9]="Oct";
    month[10]="Nov";
    month[11]="Dec";


    var date = new Array();
    for(var i=29;i>=0;i--){
        var time = new Date();
        time.setDate(time.getDate()-i);
        date.push(time.getUTCDate() + " " + month[time.getMonth()]);
    }

    oldidentifier = undefined;

    var buildingID;
    var buildingCode;
    var buildingUsrID;

    var buildingFoiid_SUGGESTION;
    var buildingId_SUGGESTION;
    var buildingScheduling_SUGGESTION;
    var building_HasSUGGESTION;

    var buildingSOAPCallTHE = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/THER","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var buildingSOAPCallGAS = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/GASR","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var buildingSOAPCallELE = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/ELER","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var buildingSOAPCallTEMP = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/TEMP","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var buildingSOAPCallCLDA = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/CLDA","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var buildingSOAPCallTHEA = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/THEA","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var buildingSOAPCallHEAT = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/CWRM","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var buildingSOAPCallCOOL = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/CCLD","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var buildingSOAPCallONOF = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/ONOF","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var buildingSOAPCallIRRA = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/IRRA","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var buildingSOAPCallWIND = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/WIND","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';

    var buildingHasGas;
    var buildingHasThe;
    var buildingHasEle;
    var buildingHasTem;
    var buildingHasTheA;

    var buildingConsumption_ELE_1h;
    var buildingDate_ELE_1h;
    var building_ELE_1h;
    var buildingConsumption_ELE_1d;
    var buildingDate_ELE_1d;
    var building_ELE_1d;

    var buildingConsumption_THE_1h;
    var buildingDate_THE_1h;
    var building_THE_1h;
    var buildingConsumption_THE_1d;
    var buildingDate_THE_1d;
    var building_THE_1d;

    var buildingConsumption_GAS_1h;
    var buildingDate_GAS_1h;
    var building_GAS_1h;
    var buildingConsumption_GAS_1d;
    var buildingDate_GAS_1d;
    var building_GAS_1d;

    var buildingConsumption_CLDA_1h;
    var buildingDate_CLDA_1h;
    var building_CLDA_1h;
    var buildingConsumption_CLDA_1d;
    var buildingDate_CLDA_1d;
    var building_CLDA_1d;

    var buildingConsumption_THEA_1h;
    var buildingDate_THEA_1h;
    var building_THEA_1h;
    var buildingConsumption_THEA_1d;
    var buildingDate_THEA_1d;
    var building_THEA_1d;

    var buildingConsumption_TEMPINT_15;
    var buildingDate_TEMPINT_15;
    var buildingCEL_TEMPINT_15;

    var buildingSuggestion_TEMP;
    var buildingSuggestionDate_TEMP;
    var buildingSugg_TEMP;
    var buildingSuggestion_ONOFF;
    var buildingSuggestionDate_ONOFF;
    var buildingSugg_ONOFF;

    var buildingConsumption_1y;
    var buildingDate_1y;
    var buildingKWH_1y;

    var weatherForecastConsumption_TEMP;
    var weatherForecastDate_TEMP;
    var weatherForecastCEL_TEMP;

    var weatherForecastConsumption_IRR;
    var weatherForecastDate_IRR;
    var weatherForecastWM2_IRR;

    var weatherForecastConsumption_WIND;
    var weatherForecastDate_WIND;
    var weatherForecastKMH_WIND;

    var weatherConsumption_TEMP;
    var weatherDate_TEMP;
    var weatherCEL_TEMP;

    var weatherConsumption_IRR;
    var weatherDate_IRR;
    var weatherWM2_IRR;

    var weatherConsumption_WIND;
    var weatherDate_WIND;
    var weatherKMH_WIND;

    var sensorDescription;

    var shelterConsumption_15;
    var shelterDate_15;
    var shelterKWH_15;

    var shelterConsumption_1h;
    var shelterDate_1h;
    var shelterKWH_1h;

    var shelterConsumption_1d;
    var shelterDate_1d;
    var shelterKWH_1d;

    var shelterConsumption_1y;
    var shelterDate_1y;
    var shelterKWH_1y;

    var shelterConsumption_TEMPINT_15;
    var shelterDate_TEMPINT_15;
    var shelterCEL_TEMPINT_15;

    var shelterDate_CURVE;
    var shelterKWH_CURVE;
    var shelterAVG_TEMP_CURVE;
    var shelterAVG_KWH_CURVE;

    var shelterSuggestion_TEMP;
    var shelterSuggestionDate_TEMP;
    var shelterSugg_TEMP;

    var shelterSuggestion_COOL;
    var shelterSuggestion_HEAT;

    var suggestionAPICode = new Array();
    suggestionAPICode[2] = "ROV";
    suggestionAPICode[3] = "RVB";
    suggestionAPICode[4] = "FER";
    suggestionAPICode[5] = "BAS";
    suggestionAPICode[6] = "LAM";
    suggestionAPICode[7] = "PAO";
    suggestionAPICode[8] = "TRN";
    suggestionAPICode[9] = "VDN";
    suggestionAPICode[10] = "HRV";

    var pilot2codespaceid = new Array();
    pilot2codespaceid["rovereto"] = 2;
    pilot2codespaceid["ferrara"] = 4;
    pilot2codespaceid["bassano"] = 5;
    pilot2codespaceid["lamia"] = 6;
    pilot2codespaceid["naxxar"] = 7;
    pilot2codespaceid["trentino"] = 8;
    pilot2codespaceid["cles"] = 9;
    pilot2codespaceid["zagreb"] = 10;

    var pilot2timezone = new Array();
    pilot2timezone[2] = 1;
    pilot2timezone[4] = 1;
    pilot2timezone[5] = 1;
    pilot2timezone[6] = 2;
    pilot2timezone[7] = 1;
    pilot2timezone[8] = 1;
    pilot2timezone[9] = 1;
    pilot2timezone[10] = 1;

    buildingDate = undefined;
    buildingDate_prediction = undefined;
    summertime_start = undefined;
    summertime_end = undefined;

    pilotCode = undefined;
    pilotName = undefined;
    role = undefined;
    key = undefined;

    statsWorkerScenario2 = new Worker('workers/statsWorker.js');
    sosWorkerScenario2 = new Worker('workers/sosWorker.js');

    $(document).ready(function() {
        $('#building-chart-container, #building-chart-fullscreen-temp-container, #building-chart-fullscreen_1h-container, #building-chart-fullscreen_1d-container, #additional-building-chart-fullscreen_1h-container, #additional-building-chart-fullscreen_1d-container, #building-chart-prediction-container, #shelter-chart-fullscreen_curve-container, #shelter-chart-fullscreen_10-container, #shelter-chart-fullscreen_1h-container, #shelter-chart-fullscreen_1d-container, #shelter-chart-prediction-container, #weather-chart-fullscreen-container, #weather-forecast-chart-fullscreen-container').hover(
            function() {},
            function() {
                if(defined(document.getElementById("divCursor")))document.getElementById("divCursor").style.display = "none";
            }
        );
    });

    statsWorkerScenario2.addEventListener('message', function(e) {
        var data = e.data;
        switch (data.cmd) {
            case 'Scenario2.shelterstatus':
                if(!defined(data.error)) RenderShelterSTAT_CUMULATVE(data.result);
                else {error(data.error);document.getElementById("shelter-status-table").style.display = "none";}
                break;
            default:
                break;
        };
    }, false);

    sosWorkerScenario2.addEventListener('message', function(e) {
        var data = e.data;
        switch (data.cmd) {
            case 'Scenario2.Building.1YConsumption-ELE':
                if(!defined(data.error)) RenderBuilding_1y(data.result,"ELE");
                else error(data.error);
                break;
            case 'Scenario2.Building.1YConsumption-THE':
                if(!defined(data.error)) RenderBuilding_1y(data.result,"THE");
                else error(data.error);
                break;
            case 'Scenario2.Building.1YConsumption-GAS':
                if(!defined(data.error)) RenderBuilding_1y(data.result,"GAS");
                else error(data.error);
                break;
            case 'Scenario2.Building.TEMP_1h':
                if(!defined(data.error)) RenderBuildingSUGGESTIONS_TEMP(data.result);
                else {error(data.error);loadingIndicator.className="fullScreenLoaderHidden";}
                break;
            case 'Scenario2.Building.ONOF_1h':
                if(!defined(data.error)) RenderBuildingSUGGESTIONS_ONOFF(data.result);
                else error(data.error);
                break;
            case 'Scenario2.Building.ELER_1h':
                if(!defined(data.error)) RenderBuildingELE_1h(data.result);
                else error(data.error);
                break;
            case 'Scenario2.Building.ELER_1d':
                if(!defined(data.error)) RenderBuildingELE_1d(data.result);
                else {error(data.error);loadingIndicator.className="fullScreenLoaderHidden";}
                break;
            case 'Scenario2.Building.GASR_1h':
                if(!defined(data.error)) RenderBuildingGAS_1h(data.result);
                else error(data.error);
                break;
            case 'Scenario2.Building.GASR_1d':
                if(!defined(data.error)) RenderBuildingGAS_1d(data.result);
                else {error(data.error);loadingIndicator.className="fullScreenLoaderHidden";}
                break;
            case 'Scenario2.Building.THER_1h':
                if(!defined(data.error)) RenderBuildingTHE_1h(data.result);
                else error(data.error);
                break;
            case 'Scenario2.Building.THER_1d':
                if(!defined(data.error)) RenderBuildingTHE_1d(data.result);
                else {error(data.error);if(pilotCode != 10)loadingIndicator.className="fullScreenLoaderHidden";}
                break;
            case 'Scenario2.Building.TEMP_15':
                if(!defined(data.error)) RenderBuildingTEMPINT_15(data.result);
                else error(data.error);
                break;
            case 'Scenario2.Shelter.ELER_15':
                if(!defined(data.error)) RenderShelterELE_15(data.result);
                else error(data.error);
                break;
            case 'Scenario2.Shelter.ELER_1h':
                if(!defined(data.error)) RenderShelterELE_1h(data.result);
                else error(data.error);
                break;
            case 'Scenario2.Shelter.ELER_1d':
                if(!defined(data.error)) RenderShelterELE_1d(data.result);
                else {error(data.error);loadingIndicator.className="fullScreenLoaderHidden";}
                break;
            case 'Scenario2.Shelter.1YConsumption':
                if(!defined(data.error)) RenderShelterELE_1y(data.result);
                else error(data.error);
                break;
            case 'Scenario2.Shelter.TEMP_INT_15':
                if(!defined(data.error)) RenderShelterTEMPINT_15(data.result);
                else {error(data.error);shelterCEL_TEMPINT_15 = [0];shelterDate_TEMPINT_15 = [0];
                    if((defined(shelterCEL_TEMPINT_15)) && (defined(shelterSugg_TEMP))){
                        DisplayShelterChart();
                    }
                }
                break;
            case 'Scenario2.Shelter.TEMP_15':
                if(!defined(data.error)) RenderShelterSUGGESTIONS_TEMP(data.result);
                else {error(data.error);shelterSugg_TEMP = [0];shelterSuggestionDate_TEMP = [0];
                    if((defined(shelterCEL_TEMPINT_15)) && (defined(shelterSugg_TEMP))){
                        DisplayShelterChart();
                    }
                }
                break;
            case 'Scenario2.Shelter.CCLD_1d':
                if(!defined(data.error)) RenderShelterSUGGESTIONS_COOL(data.result);
                else error(data.error);
                break;
            case 'Scenario2.Shelter.CWRM_1d':
                if(!defined(data.error)) RenderShelterSUGGESTIONS_HEAT(data.result);
                else error(data.error);
                break;
            case 'Scenario2.Weather.TEMP_1h':
                if(!defined(data.error)) RenderWeatherTEMP(data.result);
                else {error(data.error);weatherCEL_TEMP = [0];weatherDate_TEMP = [0];
                    if((defined(weatherCEL_TEMP)) && (defined(weatherWM2_IRR)) && (defined(weatherKMH_WIND))){
                        DisplayWeatherChart();
                    }
                }
                break;
            case 'Scenario2.Weather.IRRA_1h':
                if(!defined(data.error)) RenderWeatherIRRA(data.result);
                else {error(data.error);weatherWM2_IRR = [0];weatherDate_IRR = [0];
                    if((defined(weatherCEL_TEMP)) && (defined(weatherWM2_IRR)) && (defined(weatherKMH_WIND))){
                        DisplayWeatherChart();
                    }
                }
                break;
            case 'Scenario2.Weather.WIND_1h':
                if(!defined(data.error)) RenderWeatherWIND(data.result);
                else {error(data.error);weatherKMH_WIND = [0];weatherDate_WIND = [0];
                    if((defined(weatherCEL_TEMP)) && (defined(weatherWM2_IRR)) && (defined(weatherKMH_WIND))){
                        DisplayWeatherChart();
                    }
                }
                break;
            case 'Scenario2.Forecast.TEMP_1h':
                if(!defined(data.error)) RenderWeatherForecastTEMP(data.result);
                else {error(data.error);weatherForecastCEL_TEMP = [0];weatherForecastDate_TEMP = [0];
                    if((defined(weatherForecastCEL_TEMP)) && (defined(weatherForecastWM2_IRR)) && (defined(weatherForecastKMH_WIND))){
                        DisplayWeatherForecastChart();
                    }
                }
                break;
            case 'Scenario2.Forecast.IRRA_1h':
                if(!defined(data.error)) RenderWeatherForecastIRRA(data.result);
                else {error(data.error);weatherForecastWM2_IRR = [0];weatherForecastDate_IRR = [0];
                    if((defined(weatherForecastCEL_TEMP)) && (defined(weatherForecastWM2_IRR)) && (defined(weatherForecastKMH_WIND))){
                        DisplayWeatherForecastChart();
                    }
                }
                break;
            case 'Scenario2.Forecast.WIND_1h':
                if(!defined(data.error)) RenderWeatherForecastWIND(data.result);
                else {error(data.error);weatherForecastKMH_WIND = [0];weatherForecastDate_WIND = [0];
                    if((defined(weatherForecastCEL_TEMP)) && (defined(weatherForecastWM2_IRR)) && (defined(weatherForecastKMH_WIND))){
                        DisplayWeatherForecastChart();
                    }
                }
                break;
            default:
                break;
        };
    }, false);

    this.DisplayBuildingStats = function(city, identifier){
        buildingDate = new Date();
        buildingDate.setHours(23,59,59);
        buildingDate.setDate(buildingDate.getDate() - 1);

        buildingDate_prediction = new Date();
        buildingDate_prediction.setHours(23,59,59);
        buildingDate_prediction.setDate(buildingDate_prediction.getDate() + 1);

        var pilotHasChanged = false;
        if(pilotName != city) pilotHasChanged = true;

        pilotName = city;

        console.log("CLICK STAT SU: " + pilotName + ", " + identifier);

        document.getElementById("buildings-pilot-name").textContent = pilotName.toUpperCase() + " Overview";

        document.getElementById("main").style.display = "none";
        document.getElementById("kmlbuildingdetail").style.display = "none";
        document.getElementById("gltfnetworkdetail").style.display = "none";
        document.getElementById("gltfbuildingdetail").style.display = "block";

        var selectionfid= document.getElementById("building-dump-element");
        var lenght = selectionfid.options.length;
        for (i = 0; i < lenght; i++) {
            selectionfid.remove(0);
        }

        pilotCode = sessionStorage.getItem("pilotCode");
        role = sessionStorage.getItem("userType");
        key = window.btoa( sessionStorage.getItem("username") + ":" + sessionStorage.getItem("password"));

        if(pilotCode == -1) pilotCode = pilot2codespaceid[pilotName];

        if(defined(pilotCode) && defined(role) && defined(key)){
            initDumpForm("building",pilotCode);
            initDumpForm("shelter",pilotCode);
            initDumpForm("weatherstation",pilotCode);
            lastSundayOfEachMonths(new Date().getFullYear());

            $("#building-dump-start-day").val('');
            $("#building-dump-end-day").val('');

            $("#building-dump-start-day").datepicker({ dateFormat: 'yy/mm/dd' });
            $("#building-dump-end-day").datepicker({ dateFormat: 'yy/mm/dd' });

            document.getElementById("building-dump").onclick = function(){dump()};

            $("#cesium-widget-ecomap-container").animate({left: "-125"}, 500);
            $("#cesium-widget-ecomap-cooling-container").animate({left: "-125"}, 500);
            $("#cesium-widget-building-container").animate({left: "10"}, 1500);
            $("#cesium-widget-network-container").animate({left: "-125"}, 500);
            $("#cesium-widget-status-container").animate({top: "120"}, 1500);

            if(defined(identifier)){
                if(pilotHasChanged){
                    document.getElementById("shelter-status-table").style.display = "none";

                    if(pilotCode == 8){ //TNET
                        console.log("CHIEDO STATUS SHELTER IERI");

                        $("#shelter-list").empty();
                        $("#shelter-list2").empty();
                        $("#shelter-list3").empty();
                        $("#shelter-list4").empty();
                        $("#shelter-list5").empty();
                        $("#shelter-list6").empty();
                        $("#shelter-list7").empty();
                        $("#shelter-list8").empty();
                        $("#shelter-list9").empty();

                        var buildingStartDate = new Date();
                        buildingStartDate.setDate(buildingStartDate.getDate() - 1);
                        buildingStartDate.setHours(23,59,59);
                        var buildingEndDate = new Date();
                        buildingEndDate.setHours(23,59,59);

                        var shelterData = {"callback": "Scenario2.shelterstatus","what":"SHELTERS", "codespaceid":pilotCode, "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
                        statsWorkerScenario2.postMessage({'cmd': 'askShelterStatus',data: shelterData});
                    }
                }

                var newElement = identifier.replace("http://www.sunshineproject.eu/swe/procedure/","").trim();
                if(oldidentifier != newElement){
                    oldidentifier = newElement;

                    if(oldidentifier.indexOf("-F") == -1){
                        loadingIndicator4stats.style.display = "block";
                        clearChart("building-chart-container", "building-chart", 400, 300, null);

                        var buildingStartDate = new Date();
                        buildingStartDate.setFullYear(buildingStartDate.getFullYear()-1);
                        buildingStartDate.setHours(00,00,00);
                        var buildingEndDate = new Date(buildingStartDate);
                        buildingEndDate.setFullYear(buildingEndDate.getFullYear()+1);
                        buildingStartDate.setDate(1);

                        done("AGGIORNO 1Y STATS");

                        if(pilotCode == 8){
                            var sosRequest = {"callback": "Scenario2.Shelter.1YConsumption","what":buildingSOAPCallELE, "offering":oldidentifier + "_ELER_KWH_1d", "key":key, "from":(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":(buildingEndDate).yyyy_mm_ddThh_min_sec()};
                            sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});
                        }

                        else if(pilotCode == 4){
                            var sosRequest = {"callback": "Scenario2.Building.1YConsumption-ELE","what":buildingSOAPCallELE, "offering":oldidentifier + "_ELER_KWH_1d", "key":key, "from":(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":(buildingEndDate).yyyy_mm_ddThh_min_sec()};
                            sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});

                            var sosRequest = {"callback": "Scenario2.Building.1YConsumption-THE","what":buildingSOAPCallTHE, "offering":oldidentifier + "_THER_KWH_1d", "key":key, "from":(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":(buildingEndDate).yyyy_mm_ddThh_min_sec()};
                            sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});

                            var sosRequest = {"callback": "Scenario2.Building.1YConsumption-GAS","what":buildingSOAPCallGAS, "offering":oldidentifier + "_GASR_MCU_1d", "key":key, "from":(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":(buildingEndDate).yyyy_mm_ddThh_min_sec()};
                            sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});
                        }
                        else if(pilotCode == 10 || pilotCode == 6 || pilotCode == 7){
                            var sosRequest = {"callback": "Scenario2.Building.1YConsumption-ELE","what":buildingSOAPCallELE, "offering":oldidentifier + "_ELER_KWH_1d", "key":key, "from":(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":(buildingEndDate).yyyy_mm_ddThh_min_sec()};
                            sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});
                        }
                        else if(pilotCode == 9){
                            /*done("AGGIORNO 1Y STATS BUILDING");

                            var sosRequest = {"callback": "Scenario2.Building.1YConsumption-THEA","what":buildingSOAPCallELE, "offering":oldidentifier + "_THEA_KWH_15", "key":key, "from":(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":(buildingEndDate).yyyy_mm_ddThh_min_sec()};
                            sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});*/

                            loadingIndicator4stats.style.display = "none";
                        }
                    }
                }
            }
        }
    }

    this.DisplayBuildingDetails = function(buildingData){
        buildingDate = new Date();
        buildingDate.setHours(23,59,59);
        buildingDate.setDate(buildingDate.getDate() - 1);

        buildingDate_prediction = new Date();
        buildingDate_prediction.setHours(23,59,59);
        buildingDate_prediction.setDate(buildingDate_prediction.getDate() + 1);

        buildingID = buildingData.split("|")[3];
        var typology = buildingData.split("|")[2];
        buildingUsrID = buildingData.split("|")[1];
        buildingFoiid_SUGGESTION = buildingData.split("|")[4];
        building_HasSUGGESTION = (buildingData.split("|")[5] == "true");
        pilotName = buildingData.split("|")[0];

        console.log("CLICK SU " + buildingData);

        pilotCode = sessionStorage.getItem("pilotCode");
        role = sessionStorage.getItem("userType");
        key = window.btoa( sessionStorage.getItem("username") + ":" + sessionStorage.getItem("password"));

        if(pilotCode == -1) pilotCode = pilot2codespaceid[pilotName];

        if(defined(pilotCode) && defined(role) && defined(key)){
            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (isValidXMLResponse(xmlhttp)) {
                        sensorDescription = xmlhttp.responseText;

                        switch(typology){
                            case "building" : openBuildingDetails(); break;
                            case "shelter" : openShelterDetails(); break;
                            case "weather" : openWeatherDetails(); break;
                            default : break;
                        }
                    }
                }
            }

            var body = document.body,html = document.documentElement;
            loadingIndicator.style.height = Math.max( body.scrollHeight, body.offsetHeight,html.clientHeight, html.scrollHeight, html.offsetHeight ) + "px";

            var url = "./php/proxySOS.php?procedure=" + buildingID + "&key=" + key;

            // Send the POST request
            xmlhttp.open('GET', url, true);
            xmlhttp.send();
        }
    }

    function dump(){

        var dumpElement = document.getElementById("building-dump-element").value;
        var dumpStart = document.getElementById("building-dump-start-day").value;
        var dumpEnd = document.getElementById("building-dump-end-day").value;
        var dumpCode;

        console.log(dumpElement + " " + dumpStart + " " + dumpEnd);

        if(defined(dumpElement) && defined(dumpStart) && defined(dumpEnd) && (dumpEnd>=dumpStart)){
            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (isValidXMLResponse(xmlhttp)) {
                        dumpStart = dumpStart.replace(/\//g,"-").trim();
                        dumpEnd = dumpEnd.replace(/\//g,"-").trim();

                        var parser=new DOMParser();
                        var xml=parser.parseFromString(xmlhttp.responseText,"text/xml");
                        if(defined(xml)){

                            var identifierList = xml.getElementsByTagNameNS('*',"identifier");

                            for (var i=0;i<identifierList.length;i++){
                                if(defined(identifierList[i].getAttribute("name"))){
                                    var name = identifierList[i].getAttribute("name");

                                    if(name == "uniqueID"){
                                        var uniqueID = identifierList[i].getElementsByTagNameNS('*',"value")[0].childNodes[0].nodeValue;
                                        dumpCode = uniqueID.replace("http://www.sunshineproject.eu/swe/procedure/","").trim();
                                        break;
                                    }
                                }
                            }

                            var offeringList = xml.getElementsByTagNameNS('*',"capabilities");

                            var offeringArray = new Array();
                            for (var i=0;i<offeringList.length;i++){
                                var name = offeringList[i].getAttribute("name");
                                if(name == "offerings"){
                                    var offerings = offeringList[i].getElementsByTagNameNS('*',"value");

                                    var what = new Array();
                                    var codes = new Array();
                                    for (var j=0;j<offerings.length;j++){
                                        var offering = (offerings[j].childNodes[0].nodeValue).replace("http://www.sunshineproject.eu/swe/offering/","").trim();

                                        if(!defined(offeringArray[offering])){
                                            offeringArray[offering] = true;
                                            if(offering.indexOf("_GASR_MCU_1h") != -1) {if(defined(dumpCode)){what.push("GAS");codes.push(dumpCode);download(what,codes,dumpStart,dumpEnd);break;}};
                                            if(offering.indexOf("_THER_KWH_1h") != -1) {if(defined(dumpCode)){what.push("THE");codes.push(dumpCode);download(what,codes,dumpStart,dumpEnd);break;}};
                                            if(offering.indexOf("_ELER_KWH_1h") != -1) {
                                                if(defined(dumpCode)){
                                                    what.push("ELE");
                                                    codes.push(dumpCode);

                                                    if(pilotCode == 10){
                                                        var index = parseInt(dumpCode.split("-")[1])+1;
                                                        if(index<10) dumpCode = dumpCode.split("-")[0] + "-00" + index;
                                                        else dumpCode = dumpCode.split("-")[0] + "-0" + index;

                                                        what.push("THE");
                                                        codes.push(dumpCode);
                                                    }

                                                    download(what,codes,dumpStart,dumpEnd);
                                                    break;
                                                }
                                            };
                                            if(offering.indexOf("_THEA_KWH_15") != -1) {
                                                if(defined(dumpCode)){
                                                    what.push("CLDA");
                                                    codes.push("VDN-007");

                                                    what.push("CLDA");
                                                    codes.push("VDN-009");

                                                    what.push("CLDA");
                                                    codes.push("VDN-011");

                                                    what.push("CLDA");
                                                    codes.push("VDN-013");


                                                    what.push("THEA");
                                                    codes.push("VDN-006");

                                                    what.push("THEA");
                                                    codes.push("VDN-008");

                                                    what.push("THEA");
                                                    codes.push("VDN-010");

                                                    what.push("THEA");
                                                    codes.push("VDN-012");

                                                    download(what,codes,dumpStart,dumpEnd);

                                                    break;
                                                }
                                            };
                                            if(offering.indexOf("_TEMP_CEL_1h") != -1) {if(defined(dumpCode)){what.push("TEMP");codes.push(dumpCode);what.push("IRRA");codes.push(dumpCode);what.push("WIND");codes.push(dumpCode);download(what,codes,dumpStart,dumpEnd);break;}};
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            var url = "./php/proxySOS.php?procedure=" + dumpElement + "&key=" + key;

            // Send the POST request
            xmlhttp.open('GET', url, true);
            xmlhttp.send();
        }
    }

    function download(what,codes,dumpStart,dumpEnd){

        document.getElementById("building-dump-status").style.display = "block";
        document.getElementById("building-dump").style.display = "none";

        var dataAvailable = false;
        for(var i=0;i<what.length;i++){

            var __OFFERING__;
            var url;
            var unit;

            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (isValidJSONResponse(xmlhttp)) {

                        var json = JSON.parse(xmlhttp.responseText);

                        if(defined(json.resultValues)){

                            var observations = json.resultValues.split('@@');

                            if(observations.length>2){
                                    done("DUMP data available for " + __OFFERING__);

                                    dataAvailable = true;
                                    var table = document.createElement("table");
                                    var row = table.insertRow(0);
                                    var cell1 = row.insertCell(0);
                                    var cell2 = row.insertCell(1);
                                    var cell3 = row.insertCell(2);
                                    var cell4 = row.insertCell(2);

                                    cell1.innerHTML = "ID";
                                    cell2.innerHTML = "DATE";
                                    cell3.innerHTML = "VALUE";
                                    cell4.innerHTML = "UNIT";

                                    for(var i=1;i<observations.length;i++){
                                        var observation = observations[i];
                                        var time = observation.split(",")[0].split("/")[index].replace("T", " ").replace("Z", "").substring(0,16);
                                        var value = observation.split(",")[1];

                                        time = adjustToTimeZone(time);

                                        var row = table.insertRow(i);

                                        var cell1 = row.insertCell(0);
                                        var cell2 = row.insertCell(1);
                                        var cell3 = row.insertCell(2);
                                        var cell4 = row.insertCell(3);

                                        cell1.innerHTML = i;
                                        cell2.innerHTML = time;
                                        cell3.innerHTML = Math.round(parseFloat(value) * 100) / 100;
                                        cell4.innerHTML = unit;
                                    }

                                    var data_type = 'data:application/vnd.ms-excel';
                                    var table_html = table.outerHTML.replace(/ /g, '%20');//.replace(/\./g, ',');

                                    var link = document.createElement("a");
                                    link.download = __OFFERING__+"["+dumpStart+"]["+dumpEnd+"].xls";
                                    link.href = data_type + ', ' + table_html;
                                    link.click();
                            }
                            else{
                                error("No DUMP data available for " + __OFFERING__);
                            }
                        }
                    }
                    document.getElementById("building-dump-status").style.display = "none";
                    document.getElementById("building-dump").style.display = "inline";
                }
            }

            var index;
            switch(what[i]){
                case "GAS" : __OFFERING__ = codes[i] + "_GASR_MCU_1h";url = buildingSOAPCallGAS; unit = "MCU"; index=1; break;
                case "THE" : __OFFERING__ = codes[i] + "_THER_KWH_1h";url = buildingSOAPCallTHE; unit = "KWH"; index=1; break;
                case "ELE" : __OFFERING__ = codes[i] + "_ELER_KWH_1h";url = buildingSOAPCallELE; unit = "KWH"; index=1; break;
                case "CLDA" : __OFFERING__ = codes[i] + "_CLDA_KWH_15";url = buildingSOAPCallCLDA; unit = "KWH - Absolute"; index=0; break;
                case "THEA" : __OFFERING__ = codes[i] + "_THEA_KWH_15";url = buildingSOAPCallTHEA; unit = "KWH - Absolute"; index=0; break;
                case "IRRA" : __OFFERING__ = codes[i] + "_IRRA_WM2_1h";url = buildingSOAPCallIRRA; unit = "WM2"; index=0; break;
                case "TEMP" : __OFFERING__ = codes[i] + "_TEMP_CEL_1h";url = buildingSOAPCallTEMP; unit = "CEL"; index=0; break;
                case "WIND" : __OFFERING__ = codes[i] + "_WIND_KMH_1h";url = buildingSOAPCallWIND; unit = "KMH"; index=0; break;
                default : break;
            }

            var __BEGINPOSITION__ = dumpStart + "T00:00:00";
            var __ENDPOSITION__ = dumpEnd + "T23:59:59";

            url = url.replace("__OFFERING__",__OFFERING__);
            url = url.replace("__BEGINPOSITION__",__BEGINPOSITION__);
            url = url.replace("__ENDPOSITION__",__ENDPOSITION__);

            url = "body=" + url + "&key=" + key;

            // Send the POST request
            xmlhttp.open('POST', './php/proxySOS.php', false);
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send(url);
        }

        if(!dataAvailable){
            alert("NO DATA AVAILABLE FOR THE CURRENT TIME SLOT");
        }
        else{
            alert("DOWNLOAD COMPLETED");
        }
    }

    function openBuildingDetails(){
        buildingHasEle = buildingHasGas = buildingHasThe = buildingHasTem = buildingHasTheA = undefined;

        //document.body.style.cursor = 'pointer';

        if(role == "globalreader" || role == "reader"){
            document.getElementById("building-configuration").style.display = "none";
            document.getElementById("building-scheduling").style.display = "none";
        }
        else if(role == "administrator" || role == "manager"){
            document.getElementById("building-configuration").style.display = "block";
            document.getElementById("building-scheduling").style.display = "block";
        }

        if(defined(buildingUsrID))document.getElementById("building-usrid").textContent = "- " + buildingUsrID.toUpperCase();

        $("#building-close").click(hideBuildingGraph);

        $("#building-predict").click(function(e){
            e.stopImmediatePropagation();
            e.preventDefault();
            manageBuildingPrediction();
        });

        $("#building-prediction-start-day").val('');
        $("#building-prediction-end-day").val('');

        $("#building-prediction-start-day").datepicker({ dateFormat: 'yy/mm/dd' });
        $("#building-prediction-end-day").datepicker({ dateFormat: 'yy/mm/dd' });

        var now = new Date();
        now.setDate(now.getDate()-1);
        var previous = new Date();
        previous.setFullYear(previous.getFullYear()-1);

        var slide_analysis = 0;
        var last_slide_analysis;

        $('#building-timeline-container-analysis').empty();
        $('#building-timeline-container-analysis').append( '<div id="building-timeline-analysis"/>' );

        for (var d = previous; d <= now; d.setDate(d.getDate() + 1)) {
            var day = new Date(d);

            var element = $('<div/>',{
                id: "building-calendar-element-" + slide_analysis,
                class: 'not_selected_date',
                text: day.getDate() + " ",
                click: function(e){e.stopImmediatePropagation();e.preventDefault();last_slide_analysis.className = "not_selected_date"; this.className = "selected_date"; last_slide_analysis = this; buildingDate = new Date(this.textContent + (" 23:59:59"));  lastSundayOfEachMonths(buildingDate.getFullYear()); initBuildings();}
            }).appendTo('#building-timeline-analysis');

            var calendar = $('<div/>',{
                class: 'selected_month',
                text: month[day.getMonth()] + " " + day.getFullYear()
            }).appendTo(element);

            slide_analysis++;

        }

        last_slide_analysis = document.getElementById("building-calendar-element-" + (slide_analysis-1));
        last_slide_analysis.className = "selected_date";


        $('#building-timeline-analysis').bxSlider({
            minSlides: 1,
            maxSlides: 10,
            slideWidth: 70,
            slideMargin: 5,
            startSlide:parseInt(slide_analysis/10),
            infiniteLoop: false
        });
        var parser=new DOMParser();
        var xml=parser.parseFromString(sensorDescription,"text/xml");
        if(defined(xml)){

            var identifierList = xml.getElementsByTagNameNS('*',"identifier");

            for (var i=0;i<identifierList.length;i++){
                if(defined(identifierList[i].getAttribute("name"))){
                    var name = identifierList[i].getAttribute("name");

                    if(name == "uniqueID"){
                        var uniqueID = identifierList[i].getElementsByTagNameNS('*',"value")[0].childNodes[0].nodeValue;
                        buildingCode = uniqueID.replace("http://www.sunshineproject.eu/swe/procedure/","").trim();
                        break;
                    }
                }
            }

            var offeringList = xml.getElementsByTagNameNS('*',"capabilities");

            var offeringArray = new Array();
            for (var i=0;i<offeringList.length;i++){
                var name = offeringList[i].getAttribute("name");
                if(name == "offerings"){
                    var offerings = offeringList[i].getElementsByTagNameNS('*',"value");

                    for (var j=0;j<offerings.length;j++){
                        var offering = (offerings[j].childNodes[0].nodeValue).replace("http://www.sunshineproject.eu/swe/offering/","").trim();
                        if(!defined(offeringArray[offering])){
                            offeringArray[offering] = true;
                            done(offering);
                            if(offering.indexOf("_GASR_MCU_1h") != -1) buildingHasGas = true;
                            if(offering.indexOf("_THER_KWH_1h") != -1) buildingHasThe = true;
                            if(offering.indexOf("_ELER_KWH_1h") != -1) buildingHasEle = true;
                            if(offering.indexOf("_THEA_KWH_15") != -1) buildingHasTheA = true;
                        }
                    }
                }
            }

            console.log(buildingCode);
            if(defined(buildingCode)){
                var fullScreenGraph = document.getElementById("fullScreenBUILDINGGraph");
                var body = document.body,html = document.documentElement;
                fullScreenGraph.style.height = Math.max( body.scrollHeight, body.offsetHeight,html.clientHeight, html.scrollHeight, html.offsetHeight ) + "px";
                fullScreenGraph.className="fullScreenGraph";

                /* CASI PARTICOLARI */
                if(pilotCode == 10){ //HRV
                    buildingHasTem = true;
                    buildingHasThe = undefined;
                    buildingHasGas = undefined;
                    buildingHasEle = undefined;
                    buildingHasTheA = undefined;

                    document.getElementById("building-chart-fullscreen-temp-container").style.display = "block";
                    document.getElementById("additional-building-chart-fullscreen_1h-container").style.display = "block";
                    document.getElementById("additional-building-chart-fullscreen_1d-container").style.display = "block";
                }
                else {
                    document.getElementById("building-chart-fullscreen-temp-container").style.display = "none";
                    document.getElementById("additional-building-chart-fullscreen_1h-container").style.display = "none";
                    document.getElementById("additional-building-chart-fullscreen_1d-container").style.display = "none";
                }

                initBuildings();

                if(building_HasSUGGESTION){
                    done("Building enabled for suggestion service");

                    var now = new Date();
                    now.setDate(now.getDate()+1);
                    var previous = new Date();
                    previous.setMonth(previous.getMonth()-6);

                    var slide_analysis_prediction = 0;
                    var last_slide_analysis_prediction;

                    $('#building-prediction-timeline-container-analysis').empty();
                    $('#building-prediction-timeline-container-analysis').append( '<div id="building-prediction-timeline-analysis"/>' );

                    for (var d = previous; d <= now; d.setDate(d.getDate() + 1)) {
                        var day = new Date(d);

                        var element = $('<div/>',{
                            id: "building-prediction-calendar-element-" + slide_analysis_prediction,
                            class: 'not_selected_date_prediction',
                            text: day.getDate() + " ",
                            click: function(e){e.stopImmediatePropagation();e.preventDefault();last_slide_analysis_prediction.className = "not_selected_date_prediction"; this.className = "selected_date_prediction"; last_slide_analysis_prediction = this; buildingDate_prediction = new Date(this.textContent + (" 23:59:59"));  lastSundayOfEachMonths(buildingDate_prediction.getFullYear()); DisplayBuildingSETTINGS()}
                        }).appendTo('#building-prediction-timeline-analysis');

                        var calendar = $('<div/>',{
                            class: 'selected_month_prediction',
                            text: month[day.getMonth()] + " " + day.getFullYear()
                        }).appendTo(element);

                        slide_analysis_prediction++;

                    }

                    last_slide_analysis_prediction = document.getElementById("building-prediction-calendar-element-" + (slide_analysis_prediction-1));
                    last_slide_analysis_prediction.className = "selected_date_prediction";


                    $('#building-prediction-timeline-analysis').bxSlider({
                        minSlides: 1,
                        maxSlides: 10,
                        slideWidth: 70,
                        slideMargin: 5,
                        startSlide:parseInt(slide_analysis_prediction/10),
                        infiniteLoop: false
                    });

                    document.getElementById("building-prediction-container").style.display = "block";

                    clearChart("building-chart-prediction-container", "building-chart-prediction", 900, 200, "mini");

                    var scheduling = document.getElementById("building-prediction-times");
                    scheduling.style.lineHeight = "200px";
                    scheduling.textContent = "NO DATA";

                    DisplayBuildingSETTINGS();
                }
                else{
                    error("Building NOT enabled for suggestion service");

                    document.getElementById("building-prediction-container").style.display = "none";
                }
            }
        }
    }

    function initBuildingsForSuggestion(){
        loadingIndicator.className="fullScreenLoader";

        buildingSuggestion_TEMP = buildingSuggestionDate_TEMP = buildingSugg_TEMP = undefined;
        buildingSuggestion_ONOFF = buildingSuggestionDate_ONOFF = buildingSugg_ONOFF= undefined;

        clearChart("building-chart-prediction-container", "building-chart-prediction", 900, 200, "mini");

        var scheduling = document.getElementById("building-prediction-times");
        scheduling.style.lineHeight = "200px";
        scheduling.textContent = "NO DATA";

        var buildingStartDate = new Date(buildingDate_prediction);
        buildingStartDate.setDate(buildingStartDate.getDate()-1);
        var buildingEndDate = new Date(buildingStartDate);
        buildingEndDate.setDate(buildingEndDate.getDate()+1);

        var tempCode = buildingCode;
        if(pilotCode == 10){
            var index = parseInt(tempCode.split("-")[1])+1;
            if(index<10) tempCode = tempCode.split("-")[0] + "-00" + index;
            else tempCode = tempCode.split("-")[0] + "-0" + index;
        }

        var sosRequest = {"callback": "Scenario2.Building.TEMP_1h","what":buildingSOAPCallTEMP, "offering":tempCode.replace("-0","-S") + "_TEMP_CEL_1h", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
        sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});

        var sosRequest = {"callback": "Scenario2.Building.ONOF_1h","what":buildingSOAPCallONOF, "offering":tempCode.replace("-0","-S") + "_ONOF_BOO_1h", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
        sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});
    }

    function initBuildings(){
        loadingIndicator.className="fullScreenLoader";

        buildingConsumption_ELE_1h = buildingDate_ELE_1h = building_ELE_1h =  buildingConsumption_THE_1d =  buildingDate_ELE_1d = building_ELE_1d = undefined;
        buildingConsumption_GAS_1h = buildingDate_GAS_1h = building_GAS_1h = buildingConsumption_GAS_1d = buildingDate_GAS_1d = building_GAS_1d = undefined;
        buildingConsumption_THE_1h = buildingDate_THE_1h = building_THE_1h = buildingDate_THE_1d = building_THE_1d = buildingConsumption_ELE_1d = undefined;
        buildingConsumption_CLDA_1h = buildingDate_CLDA_1h = building_CLDA_1h = buildingConsumption_CLDA_1d = buildingDate_CLDA_1d = building_CLDA_1d = undefined;
        buildingConsumption_THEA_1h = buildingDate_THEA_1h = building_THEA_1h = buildingConsumption_THEA_1d = buildingDate_THEA_1d = building_THEA_1d = undefined;
        buildingConsumption_TEMPINT_15 = buildingDate_TEMPINT_15 = buildingCEL_TEMPINT_15 = undefined;
        
        clearChart("building-chart-fullscreen-temp-container", "building-chart-fullscreen-temp", 1180, 260, "1d");
        clearChart("building-chart-fullscreen_1h-container", "building-chart-fullscreen_1h", 1180, 260, "1h");
        clearChart("building-chart-fullscreen_1d-container", "building-chart-fullscreen_1d", 1180, 260, "1d");
        clearChart("additional-building-chart-fullscreen_1h-container", "additional-building-chart-fullscreen_1h", 1180, 260, "1h");
        clearChart("additional-building-chart-fullscreen_1d-container", "additional-building-chart-fullscreen_1d", 1180, 260, "1d");

        var buildingStartDate = new Date(buildingDate);
        buildingStartDate.setHours(buildingStartDate.getHours()-24);
        var buildingEndDate = new Date(buildingDate);

        if(defined(buildingHasThe)) {
            var sosRequest = {"callback": "Scenario2.Building.THER_1h","what":buildingSOAPCallTHE, "offering":buildingCode.replace("-S","-0") + "_THER_KWH_1h", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
            sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});

            var buildingStartDate = new Date(buildingDate);
            buildingStartDate.setMonth(buildingStartDate.getMonth()-1);
            var buildingEndDate = new Date(buildingDate);
            buildingEndDate.setDate(buildingEndDate.getDate()+1);

            var sosRequest = {"callback": "Scenario2.Building.THER_1d","what":buildingSOAPCallTHE, "offering":buildingCode.replace("-S","-0") + "_THER_KWH_1d", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
            sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});

        }
        else if(defined(buildingHasGas)) {
            var sosRequest = {"callback": "Scenario2.Building.GASR_1h","what":buildingSOAPCallGAS, "offering":buildingCode.replace("-S","-0") + "_GASR_MCU_1h", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
            sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});

            var buildingStartDate = new Date(buildingDate);
            buildingStartDate.setMonth(buildingStartDate.getMonth()-1);
            var buildingEndDate = new Date(buildingDate);
            buildingEndDate.setDate(buildingEndDate.getDate()+1);

            var sosRequest = {"callback": "Scenario2.Building.GASR_1d","what":buildingSOAPCallGAS, "offering":buildingCode.replace("-S","-0") + "_GASR_MCU_1d", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
            sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});

        }
        else if(defined(buildingHasEle)) {
            var sosRequest = {"callback": "Scenario2.Building.ELER_1h","what":buildingSOAPCallELE, "offering":buildingCode.replace("-S","-0") + "_ELER_KWH_1h", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
            sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});

            var buildingStartDate = new Date(buildingDate);
            buildingStartDate.setMonth(buildingStartDate.getMonth()-1);
            var buildingEndDate = new Date(buildingDate);
            buildingEndDate.setDate(buildingEndDate.getDate()+1);

            var sosRequest = {"callback": "Scenario2.Building.ELER_1d","what":buildingSOAPCallELE, "offering":buildingCode.replace("-S","-0") + "_ELER_KWH_1d", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
            sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});

        }
        else if(defined(buildingHasTem)) {

            var tempCode = buildingCode.replace("-S","-0");
            if(pilotCode == 10){
                var index = parseInt(tempCode.split("-")[1])+2;
                if(index<10) tempCode = tempCode.split("-")[0] + "-00" + index;
                else tempCode = tempCode.split("-")[0] + "-0" + index;
            }

            var sosRequest = {"callback": "Scenario2.Building.TEMP_15","what":buildingSOAPCallTEMP, "offering":tempCode + "_TEMP_CEL_15", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
            sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});

            var sosRequest = {"callback": "Scenario2.Building.ELER_1h","what":buildingSOAPCallELE, "offering":buildingCode.replace("-S","-0") + "_ELER_KWH_1h", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
            sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});

            var tempCode = buildingCode.replace("-S","-0");
            if(pilotCode == 10){
                var index = parseInt(tempCode.split("-")[1])+1;
                if(index<10) tempCode = tempCode.split("-")[0] + "-00" + index;
                else tempCode = tempCode.split("-")[0] + "-0" + index;
            }

            var sosRequest = {"callback": "Scenario2.Building.THER_1h","what":buildingSOAPCallTHE, "offering":tempCode + "_THER_KWH_1h", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
            sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});

            var buildingStartDate = new Date(buildingDate);
            buildingStartDate.setMonth(buildingStartDate.getMonth()-1);
            var buildingEndDate = new Date(buildingDate);
            buildingEndDate.setDate(buildingEndDate.getDate()+1);

            var sosRequest = {"callback": "Scenario2.Building.ELER_1d","what":buildingSOAPCallELE, "offering":buildingCode.replace("-S","-0") + "_ELER_KWH_1d", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
            sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});

            var sosRequest = {"callback": "Scenario2.Building.THER_1d","what":buildingSOAPCallTHE, "offering":tempCode + "_THER_KWH_1d", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
            sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});
        }
        else if(defined(buildingHasTheA)) {

            var buildingStartDate = new Date(buildingDate);
            buildingStartDate.setMonth(buildingStartDate.getMonth()-1);
            var buildingEndDate = new Date(buildingDate);
            buildingEndDate.setDate(buildingEndDate.getDate()+1);

            DisplayBuildingCLDA_1h(0);
            DisplayBuildingTHEA_1h(0);
        }

        console.log("---------");
    }

    function openShelterDetails(){

        //document.body.style.cursor = 'pointer';

        if(role == "globalreader" || role == "reader"){
            document.getElementById("shelter-configuration").style.display = "none";
        }
        else if(role == "administrator" || role == "manager"){
            document.getElementById("shelter-configuration").style.display = "block";
        }

        if(defined(buildingUsrID))document.getElementById("shelter-usrid").textContent = "- " + buildingUsrID.toUpperCase();

        $("#shelter-close").click(hideShelterGraph);

        $("#shelter-predict").click(function(e){
            e.stopImmediatePropagation();
            e.preventDefault();
            manageShelterPrediction();
        });

        $("#shelter-control-repeat-jan").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#shelter-control-repeat-feb").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#shelter-control-repeat-mar").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#shelter-control-repeat-apr").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#shelter-control-repeat-may").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#shelter-control-repeat-jun").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#shelter-control-repeat-jul").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#shelter-control-repeat-aug").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#shelter-control-repeat-sep").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#shelter-control-repeat-oct").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#shelter-control-repeat-nov").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#shelter-control-repeat-dec").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});

        var selectionyear = document.getElementById("shelter-control-repeat-year");

        var lenght = selectionyear.options.length;
        for (i = 0; i < lenght; i++) {
            selectionyear.remove(0);
        }

        for (var d = 0; d < 6; d++) {
            var year = parseInt(new Date().getFullYear())+d;
            var option = document.createElement("option");
            option.textContent = year;
            option.value = year;
            selectionyear.add(option);
        }

        var now = new Date();
        now.setDate(now.getDate()-1);
        var previous = new Date();
        previous.setFullYear(previous.getFullYear()-1);

        var slide_analysis = 0;
        var last_slide_analysis;

        $('#shelter-timeline-container-analysis').empty();
        $('#shelter-timeline-container-analysis').append( '<div id="shelter-timeline-analysis"/>' );

        for (var d = previous; d <= now; d.setDate(d.getDate() + 1)) {
            var day = new Date(d);

            var element = $('<div/>',{
                id: "shelter-calendar-element-" + slide_analysis,
                class: 'not_selected_date',
                text: day.getDate() + " ",
                click: function(e){e.stopImmediatePropagation();e.preventDefault();last_slide_analysis.className = "not_selected_date"; this.className = "selected_date"; last_slide_analysis = this; buildingDate = new Date(this.textContent + (" 23:59:59")); lastSundayOfEachMonths(buildingDate.getFullYear()); initShelters();}
            }).appendTo('#shelter-timeline-analysis');

            var calendar = $('<div/>',{
                class: 'selected_month',
                text: month[day.getMonth()] + " " + day.getFullYear()
            }).appendTo(element);

            slide_analysis++;

        }

        last_slide_analysis = document.getElementById("shelter-calendar-element-" + (slide_analysis-1));
        last_slide_analysis.className = "selected_date";


        $('#shelter-timeline-analysis').bxSlider({
            minSlides: 1,
            maxSlides: 10,
            slideWidth: 70,
            slideMargin: 5,
            startSlide:parseInt(slide_analysis/10),
            infiniteLoop: false
        });
        var parser=new DOMParser();
        var xml=parser.parseFromString(sensorDescription,"text/xml");
        if(defined(xml)){

            var identifierList = xml.getElementsByTagNameNS('*',"identifier");

            for (var i=0;i<identifierList.length;i++){
                if(defined(identifierList[i].getAttribute("name"))){
                    var name = identifierList[i].getAttribute("name");

                    if(name == "uniqueID"){
                        var uniqueID = identifierList[i].getElementsByTagNameNS('*',"value")[0].childNodes[0].nodeValue;
                        buildingCode = uniqueID.replace("http://www.sunshineproject.eu/swe/procedure/","").trim();
                        break;
                    }
                }
            }

            var offeringList = xml.getElementsByTagNameNS('*',"capabilities");

            var offeringArray = new Array();
            for (var i=0;i<offeringList.length;i++){
                var name = offeringList[i].getAttribute("name");
                if(name == "offerings"){
                    var offerings = offeringList[i].getElementsByTagNameNS('*',"value");

                    for (var j=0;j<offerings.length;j++){
                        var offering = (offerings[j].childNodes[0].nodeValue).replace("http://www.sunshineproject.eu/swe/offering/","").trim();
                        if(!defined(offeringArray[offering])){
                            offeringArray[offering] = true;
                            done(offering);
                        }
                    }
                }
            }

            console.log(buildingCode);
            if(defined(buildingCode)){
                var fullScreenGraph = document.getElementById("fullScreenSHELTERGraph");
                var body = document.body,html = document.documentElement;
                fullScreenGraph.style.height = Math.max( body.scrollHeight, body.offsetHeight,html.clientHeight, html.scrollHeight, html.offsetHeight ) + "px";
                fullScreenGraph.className="fullScreenGraph";

                initShelters();

                if(building_HasSUGGESTION){
                    done("Shelter enabled for suggestion service");

                    var now = new Date();
                    now.setDate(now.getDate()+1);
                    var previous = new Date();
                    previous.setMonth(previous.getMonth()-6);

                    var slide_analysis_prediction = 0;
                    var last_slide_analysis_prediction;

                    $('#shelter-prediction-timeline-container-analysis').empty();
                    $('#shelter-prediction-timeline-container-analysis').append( '<div id="shelter-prediction-timeline-analysis"/>' );

                    for (var d = previous; d <= now; d.setDate(d.getDate() + 1)) {
                        var day = new Date(d);

                        var element = $('<div/>',{
                            id: "shelter-prediction-calendar-element-" + slide_analysis_prediction,
                            class: 'not_selected_date_prediction',
                            text: day.getDate() + " ",
                            click: function(e){e.stopImmediatePropagation();e.preventDefault();last_slide_analysis_prediction.className = "not_selected_date_prediction"; this.className = "selected_date_prediction"; last_slide_analysis_prediction = this; buildingDate_prediction = new Date(this.textContent + (" 23:59:59"));  lastSundayOfEachMonths(buildingDate_prediction.getFullYear()); DisplayShelterSETTINGS()}
                        }).appendTo('#shelter-prediction-timeline-analysis');

                        var calendar = $('<div/>',{
                            class: 'selected_month_prediction',
                            text: month[day.getMonth()] + " " + day.getFullYear()
                        }).appendTo(element);

                        slide_analysis_prediction++;

                    }

                    last_slide_analysis_prediction = document.getElementById("shelter-prediction-calendar-element-" + (slide_analysis_prediction-1));
                    last_slide_analysis_prediction.className = "selected_date_prediction";


                    $('#shelter-prediction-timeline-analysis').bxSlider({
                        minSlides: 1,
                        maxSlides: 10,
                        slideWidth: 70,
                        slideMargin: 5,
                        startSlide:parseInt(slide_analysis_prediction/10),
                        infiniteLoop: false
                    });

                    document.getElementById("shelter-prediction-container").style.display = "block";

                    clearChart("shelter-chart-prediction-container", "shelter-chart-prediction", 900, 200, "mini");

                    document.getElementById("shelter-prediction-cooling").textContent = "0";
                    document.getElementById("shelter-prediction-heating").textContent = "0";

                    DisplayShelterSETTINGS();
                }
                else{
                    error("Shelter NOT enabled for suggestion service");

                    document.getElementById("shelter-prediction-container").style.display = "none";
                }
            }
        }

    }

    function initSheltersForSuggestion(){
        loadingIndicator.className="fullScreenLoader";

        shelterSuggestion_TEMP = shelterSuggestionDate_TEMP = shelterSugg_TEMP = undefined;
        shelterConsumption_TEMPINT_15 = shelterDate_TEMPINT_15 = shelterCEL_TEMPINT_15 = undefined;
        shelterSuggestion_COOL = undefined;
        shelterSuggestion_HEAT = undefined;

        clearChart("shelter-chart-prediction-container", "shelter-chart-prediction", 900, 200, "mini");

        document.getElementById("shelter-prediction-cooling").textContent = "0";
        document.getElementById("shelter-prediction-heating").textContent = "0";

        var buildingStartDate = new Date(buildingDate_prediction);
        buildingStartDate.setDate(buildingStartDate.getDate()-1);
        var buildingEndDate = new Date(buildingStartDate);
        buildingEndDate.setDate(buildingEndDate.getDate()+1);

        var sosRequest = {"callback": "Scenario2.Shelter.TEMP_15","what":buildingSOAPCallTEMP, "offering":buildingCode.replace("-T","-0").replace("-0","-S") + "_TEMP_CEL_15", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
        sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});

        var sosRequest = {"callback": "Scenario2.Shelter.TEMP_INT_15","what":buildingSOAPCallTEMP, "offering":buildingCode.replace("-0","-T") + "_TEMP_CEL_15", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
        sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});

        var sosRequest = {"callback": "Scenario2.Shelter.CCLD_1d","what":buildingSOAPCallCOOL, "offering":buildingCode.replace("-T","-0").replace("-0","-S") + "_CCLD_NUL_1d", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
        sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});

        var sosRequest = {"callback": "Scenario2.Shelter.CWRM_1d","what":buildingSOAPCallHEAT, "offering":buildingCode.replace("-T","-0").replace("-0","-S") + "_CWRM_NUL_1d", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
        sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});
    }

    function initShelters(){
        loadingIndicator.className="fullScreenLoader";

        shelterConsumption_15 = shelterDate_15 = shelterKWH_15 = undefined;
        shelterConsumption_1h = shelterDate_1h = shelterKWH_1h = undefined;
        shelterConsumption_1d = shelterDate_1d = shelterKWH_1d = undefined;

        shelterAVG_KWH_CURVE = 0;

        clearChart("shelter-chart-fullscreen_10-container", "shelter-chart-fullscreen_10", 1180, 260, "15");
        clearChart("shelter-chart-fullscreen_1h-container", "shelter-chart-fullscreen_1h", 1180, 260, "1h");
        clearChart("shelter-chart-fullscreen_1d-container", "shelter-chart-fullscreen_1d", 1180, 260, "1d");
        clearChart("shelter-chart-fullscreen_curve-container", "shelter-chart-fullscreen_curve", 1180, 260, "1d");

        var buildingStartDate = new Date(buildingDate);
        buildingStartDate.setHours(buildingStartDate.getHours()-24);
        var buildingEndDate = new Date(buildingDate);

        var sosRequest = {"callback": "Scenario2.Shelter.ELER_15","what":buildingSOAPCallELE, "offering":buildingCode.replace("-T","-0") + "_ELER_KWH_15", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
        sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});

        var sosRequest = {"callback": "Scenario2.Shelter.ELER_1h","what":buildingSOAPCallELE, "offering":buildingCode.replace("-T","-0") + "_ELER_KWH_1h", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
        sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});

        var buildingStartDate = new Date(buildingDate);
        buildingStartDate.setMonth(buildingStartDate.getMonth()-1);
        var buildingEndDate = new Date(buildingDate);
        buildingEndDate.setDate(buildingEndDate.getDate()+1);

        var sosRequest = {"callback": "Scenario2.Shelter.ELER_1d","what":buildingSOAPCallELE, "offering":buildingCode.replace("-T","-0") + "_ELER_KWH_1d", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
        sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});
    }

    function openWeatherDetails(){

        document.body.style.cursor = 'pointer';

        if(defined(buildingUsrID))document.getElementById("weather-usrid").textContent = "- " + buildingUsrID.toUpperCase();

        $("#weather-close").click(hideWeatherGraph);

        var now = new Date();
        now.setDate(now.getDate()-1);
        var previous = new Date();
        previous.setFullYear(previous.getFullYear()-1);

        var slide_analysis = 0;
        var last_slide_analysis;

        $('#weather-timeline-container-analysis').empty();
        $('#weather-timeline-container-analysis').append( '<div id="weather-timeline-analysis"/>' );

        for (var d = previous; d <= now; d.setDate(d.getDate() + 1)) {
            var day = new Date(d);

            var element = $('<div/>',{
                id: "weather-calendar-element-" + slide_analysis,
                class: 'not_selected_date',
                text: day.getDate() + " ",
                click: function(e){e.stopImmediatePropagation();e.preventDefault();last_slide_analysis.className = "not_selected_date"; this.className = "selected_date"; last_slide_analysis = this; buildingDate = new Date(this.textContent + (" 23:59:59")); lastSundayOfEachMonths(buildingDate.getFullYear()); initWeather();}
            }).appendTo('#weather-timeline-analysis');

            var calendar = $('<div/>',{
                class: 'selected_month',
                text: month[day.getMonth()] + " " + day.getFullYear()
            }).appendTo(element);

            slide_analysis++;

        }

        last_slide_analysis = document.getElementById("weather-calendar-element-" + (slide_analysis-1));
        last_slide_analysis.className = "selected_date";


        $('#weather-timeline-analysis').bxSlider({
            minSlides: 1,
            maxSlides: 10,
            slideWidth: 70,
            slideMargin: 5,
            startSlide:parseInt(slide_analysis/10),
            infiniteLoop: false
        });
        var parser=new DOMParser();
        var xml=parser.parseFromString(sensorDescription,"text/xml");

        if(defined(xml)){
            var identifierList = xml.getElementsByTagNameNS('*',"identifier");

            for (var i=0;i<identifierList.length;i++){
                if(defined(identifierList[i].getAttribute("name"))){
                    var name = identifierList[i].getAttribute("name");

                    if(name == "uniqueID"){
                        var uniqueID = identifierList[i].getElementsByTagNameNS('*',"value")[0].childNodes[0].nodeValue;
                        buildingCode = uniqueID.replace("http://www.sunshineproject.eu/swe/procedure/","").trim();
                        break;
                    }
                }
            }

            var offeringList = xml.getElementsByTagNameNS('*',"capabilities");

            var offeringArray = new Array();
            for (var i=0;i<offeringList.length;i++){
                var name = offeringList[i].getAttribute("name");
                if(name == "offerings"){
                    var offerings = offeringList[i].getElementsByTagNameNS('*',"value");

                    for (var j=0;j<offerings.length;j++){
                        var offering = (offerings[j].childNodes[0].nodeValue).replace("http://www.sunshineproject.eu/swe/offering/","").trim();
                        if(!defined(offeringArray[offering])){
                            offeringArray[offering] = true;
                            done(offering);
                        }
                    }
                }
            }

            console.log(buildingCode);
            if(defined(buildingCode)){
                var fullScreenGraph = document.getElementById("fullScreenWEATHERGraph");
                var body = document.body,html = document.documentElement;
                fullScreenGraph.style.height = Math.max( body.scrollHeight, body.offsetHeight,html.clientHeight, html.scrollHeight, html.offsetHeight ) + "px";
                fullScreenGraph.className="fullScreenGraph";

                initWeather();

                clearChart("weather-forecast-chart-fullscreen-container", "weather-forecast-chart-fullscreen", 1180, 260, "1d");

                var buildingStartDate = new Date();
                buildingStartDate.setHours(23,59,59);
                var buildingEndDate = new Date(buildingStartDate);
                buildingEndDate.setDate(buildingEndDate.getDate()+3);
                buildingEndDate.setHours(23,59,59);

                buildingStartDate = adjustToTimeZone4SOS(buildingStartDate);
                buildingEndDate = adjustToTimeZone4SOS(buildingEndDate);

                var sosRequest = {"callback": "Scenario2.Forecast.TEMP_1h","what":buildingSOAPCallTEMP, "offering":buildingCode.replace("-M","-F") + "_TEMP_CEL_1h", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
                sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});

                var sosRequest = {"callback": "Scenario2.Forecast.IRRA_1h","what":buildingSOAPCallIRRA, "offering":buildingCode.replace("-M","-F") + "_IRRA_WM2_1h", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
                sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});

                var sosRequest = {"callback": "Scenario2.Forecast.WIND_1h","what":buildingSOAPCallWIND, "offering":buildingCode.replace("-M","-F") + "_WIND_KMH_1h", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
                sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});
            }
        }

    }

    function initWeather(){
        loadingIndicator.className="fullScreenLoader";

        weatherConsumption_TEMP =  weatherDate_TEMP = weatherCEL_TEMP = undefined;
        weatherConsumption_IRR = weatherDate_IRR = weatherWM2_IRR = undefined;
        weatherConsumption_WIND = weatherDate_WIND = weatherKMH_WIND = undefined;
        weatherForecastConsumption_TEMP = weatherForecastDate_TEMP = weatherForecastCEL_TEMP = undefined;
        weatherForecastConsumption_IRR = weatherForecastDate_IRR = weatherForecastWM2_IRR = undefined;
        weatherForecastConsumption_WIND = weatherForecastDate_WIND = weatherForecastKMH_WIND = undefined;

        clearChart("weather-chart-fullscreen-container", "weather-chart-fullscreen", 1180, 260, "1h");

        var buildingStartDate = new Date(buildingDate);
        buildingStartDate.setHours(buildingStartDate.getHours()-24);
        var buildingEndDate = new Date(buildingDate);

        var sosRequest = {"callback": "Scenario2.Weather.TEMP_1h","what":buildingSOAPCallTEMP, "offering":buildingCode.replace("-F","-M") + "_TEMP_CEL_1h", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
        sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});

        var sosRequest = {"callback": "Scenario2.Weather.IRRA_1h","what":buildingSOAPCallIRRA, "offering":buildingCode.replace("-F","-M") + "_IRRA_WM2_1h", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
        sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});

        var sosRequest = {"callback": "Scenario2.Weather.WIND_1h","what":buildingSOAPCallWIND, "offering":buildingCode.replace("-F","-M") + "_WIND_KMH_1h", "key":key, "from":adjustToTimeZone4SOS(buildingStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(buildingEndDate).yyyy_mm_ddThh_min_sec()};
        sosWorkerScenario2.postMessage({'cmd': 'askForSOS',data: sosRequest});
    }

    function RenderBuildingTEMPINT_15(sos){
        done("renderizzo 15 min TEMP INT: " + (sos.length-1) + " valid observations");

        buildingConsumption_TEMPINT_15 = new Array();
        buildingDate_TEMPINT_15 = new Array();
        buildingCEL_TEMPINT_15 = new Array();

        if(sos.length>2){

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                time = adjustToTimeZone(time);

                buildingConsumption_TEMPINT_15[time] = value;
                buildingDate_TEMPINT_15[i-1] = time;
            }

            for(var i=0;i<buildingDate_TEMPINT_15.length;i++){
                buildingCEL_TEMPINT_15[i] = buildingConsumption_TEMPINT_15[buildingDate_TEMPINT_15[i]];
            }

            for(var i=0;i<buildingDate_TEMPINT_15.length;i++){
                if((i)%4 != 0) buildingDate_TEMPINT_15[i] = "";
            }


            if(max(buildingCEL_TEMPINT_15) != 0){
                var lineChartData = {
                    labels : buildingDate_TEMPINT_15,
                    datasets : [
                        {
                            fillColor : "rgba(220,0,0,0.5)",
                            strokeColor : "rgba(220,0,0,1)",
                            pointColor : "rgba(220,0,0,1)",
                            pointStrokeColor : "#fff",
                            data : buildingCEL_TEMPINT_15,
                            title : "Internal Temperature (°C) - 15 min"
                        }
                    ]

                }

                clearChart("building-chart-fullscreen-temp-container", "building-chart-fullscreen-temp", 1180, 260, null);
                var myLine = new Chart(document.getElementById("building-chart-fullscreen-temp").getContext("2d")).Line(lineChartData,optNOTFILL);
            }
            else{
                clearChart("building-chart-fullscreen-temp-container", "building-chart-fullscreen-temp", 1180, 260, "1d");
            }
        }
        else{
            clearChart("building-chart-fullscreen-temp-container", "building-chart-fullscreen-temp", 1180, 260, "1d");
        }
    }

    function RenderBuildingTHE_1h(sos){
        done("renderizzo 1 h THE: " + (sos.length-1) + " valid observations");

        buildingConsumption_THE_1h = new Array();
        buildingDate_THE_1h = new Array();
        building_THE_1h = new Array();

        if(sos.length>2){

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                time = adjustToTimeZone(time);
                time = time.substring(11,16);

                buildingConsumption_THE_1h[time] = value;
                buildingDate_THE_1h[i-1] = time;
            }

            for(var i=0;i<buildingDate_THE_1h.length;i++){
                building_THE_1h[i] = buildingConsumption_THE_1h[buildingDate_THE_1h[i]];
            }

            var lineChartData = {
                labels : buildingDate_THE_1h,
                datasets : [
                    {
                        fillColor : "rgba(0,220,0,0.5)",
                        strokeColor : "rgba(0,220,0,1)",
                        pointColor : "rgba(0,220,0,1)",
                        pointStrokeColor : "#fff",
                        data : building_THE_1h,
                        title: "Thermal Energy Consumption (KWh) - 1 h"
                    }
                ]

            }

            if(pilotCode != 10){
                clearChart("building-chart-fullscreen_1h-container", "building-chart-fullscreen_1h", 1180, 260, null);
                var myLine = new Chart(document.getElementById("building-chart-fullscreen_1h").getContext("2d")).Bar(lineChartData,opt);
            }
            else{
                clearChart("additional-building-chart-fullscreen_1h-container", "additional-building-chart-fullscreen_1h", 1180, 260, null);
                var myLine = new Chart(document.getElementById("additional-building-chart-fullscreen_1h").getContext("2d")).Bar(lineChartData,opt);
            }
        }
        else{
            if(pilotCode != 10) clearChart("building-chart-fullscreen_1h-container", "building-chart-fullscreen_1h", 1180, 260, "1h");
            else clearChart("additional-building-chart-fullscreen_1h-container", "additional-building-chart-fullscreen_1h", 1180, 260, "1h");
        }
    }

    function RenderBuildingTHE_1d(sos){
        done("renderizzo 1 d THE: " + (sos.length-1) + " valid observations");
        if(pilotCode != 10) loadingIndicator.className="fullScreenLoaderHidden";

        buildingConsumption_THE_1d = new Array();
        buildingDate_THE_1d = new Array();
        building_THE_1d = new Array();

        if(sos.length>2){

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,10);
                var value = observation.split(",")[1];

                buildingConsumption_THE_1d[time] = value;
                buildingDate_THE_1d[i-1] = time;
            }

            for(var i=0;i<buildingDate_THE_1d.length;i++){
                building_THE_1d[i] = buildingConsumption_THE_1d[buildingDate_THE_1d[i]];
            }

            var lineChartData = {
                labels : buildingDate_THE_1d,
                datasets : [
                    {
                        fillColor : "rgba(220,0,0,0.5)",
                        strokeColor : "rgba(220,0,0,1)",
                        pointColor : "rgba(220,0,0,1)",
                        pointStrokeColor : "#fff",
                        data : building_THE_1d,
                        title: "Thermal Energy Consumption (KWh) - 1 d"
                    }
                ]

            }

            if(pilotCode != 10){
                clearChart("building-chart-fullscreen_1d-container", "building-chart-fullscreen_1d", 1180, 260, null);
                var myLine = new Chart(document.getElementById("building-chart-fullscreen_1d").getContext("2d")).Bar(lineChartData,opt);
            }
            else{
                clearChart("additional-building-chart-fullscreen_1d-container", "additional-building-chart-fullscreen_1d", 1180, 260, null);
                var myLine = new Chart(document.getElementById("additional-building-chart-fullscreen_1d").getContext("2d")).Bar(lineChartData,opt);
            }
        }
        else{
            if(pilotCode != 10)clearChart("building-chart-fullscreen_1d-container", "building-chart-fullscreen_1d", 1180, 260, "1d");
            else clearChart("additional-building-chart-fullscreen_1d-container", "additional-building-chart-fullscreen_1d", 1180, 260, "1d");
        }
    }

    function RenderBuildingGAS_1h(sos){
        done("renderizzo 1 h GAS: " + (sos.length-1) + " valid observations");

        buildingConsumption_GAS_1h = new Array();
        buildingDate_GAS_1h = new Array();
        building_GAS_1h = new Array();

        if(sos.length>2){

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                time = adjustToTimeZone(time);
                time = time.substring(11,16);

                buildingConsumption_GAS_1h[time] = value;
                buildingDate_GAS_1h[i-1] = time;
            }

            for(var i=0;i<buildingDate_GAS_1h.length;i++){
                building_GAS_1h[i] = buildingConsumption_GAS_1h[buildingDate_GAS_1h[i]];
            }

            var lineChartData = {
                labels : buildingDate_GAS_1h,
                datasets : [
                    {
                        fillColor : "rgba(0,220,0,0.5)",
                        strokeColor : "rgba(0,220,0,1)",
                        pointColor : "rgba(0,220,0,1)",
                        pointStrokeColor : "#fff",
                        data : building_GAS_1h,
                        title: "Gaseous Fuel Consumption (m3) - 1 h"
                    }
                ]

            }

            clearChart("building-chart-fullscreen_1h-container", "building-chart-fullscreen_1h", 1180, 260, null);
            var myLine = new Chart(document.getElementById("building-chart-fullscreen_1h").getContext("2d")).Bar(lineChartData,opt);

        }
        else{
            clearChart("building-chart-fullscreen_1h-container", "building-chart-fullscreen_1h", 1180, 260, "1h");
        }
    }

    function RenderBuildingGAS_1d(sos){
        done("renderizzo 1 d GAS: " + (sos.length-1) + " valid observations");
        loadingIndicator.className="fullScreenLoaderHidden";

        buildingConsumption_GAS_1d = new Array();
        buildingDate_GAS_1d = new Array();
        building_GAS_1d = new Array();

        if(sos.length>2){

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,10);
                var value = observation.split(",")[1];

                buildingConsumption_GAS_1d[time] = value;
                buildingDate_GAS_1d[i-1] = time;
            }

            for(var i=0;i<buildingDate_GAS_1d.length;i++){
                building_GAS_1d[i] = buildingConsumption_GAS_1d[buildingDate_GAS_1d[i]];
            }

            var lineChartData = {
                labels : buildingDate_GAS_1d,
                datasets : [
                    {
                        fillColor : "rgba(220,0,0,0.5)",
                        strokeColor : "rgba(220,0,0,1)",
                        pointColor : "rgba(220,0,0,1)",
                        pointStrokeColor : "#fff",
                        data : building_GAS_1d,
                        title: "Gaseous Fuel Consumption (m3) - 1 d"
                    }
                ]

            }

            clearChart("building-chart-fullscreen_1d-container", "building-chart-fullscreen_1d", 1180, 260, null);
            var myLine = new Chart(document.getElementById("building-chart-fullscreen_1d").getContext("2d")).Bar(lineChartData,opt);
        }
        else{
            clearChart("building-chart-fullscreen_1d-container", "building-chart-fullscreen_1d", 1180, 260, "1d");
        }
    }

    _datasetsCLDA = new Array();
    _labelsCLDA = new Array();
    function DisplayBuildingCLDA_1h(times){
        if (times == 0) {
            _datasetsCLDA = new Array();
            _labelsCLDA = new Array();
        }

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 400) {clearChart("building-chart-fullscreen_1h-container", "building-chart-fullscreen_1h", 1180, 260, "1h");}
                if (isValidJSONResponse(xmlhttp)) {

                    var json = JSON.parse(xmlhttp.responseText);

                    if(defined(json.resultValues)){
                        buildingConsumption_CLDA_1h = new Array();
                        buildingDate_CLDA_1h = new Array();
                        building_CLDA_1h = new Array();

                        var observations = json.resultValues.split('@@');

                        if(observations.length>4){

                            done("renderizzo 1 h CLDA: " + (observations.length-1) + " valid observations");

                            var index = 0;
                            var prevValue = undefined;
                            for(var i=1;i<observations.length;i+=2){
                                var observation = observations[i];

                                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                                var value = observation.split(",")[1];

                                time = adjustToTimeZone(time);
                                time = time.substring(11,16);

                                if(!defined(prevValue)) prevValue = value;

                                if(value>0) buildingConsumption_CLDA_1h[time] = value - prevValue;
                                else buildingConsumption_CLDA_1h[time] = value;
                                buildingDate_CLDA_1h[index] = time;
                                prevValue = value;
                                index++;
                            }

                            for(var i=0;i<buildingDate_CLDA_1h.length;i++){
                                building_CLDA_1h[i] = buildingConsumption_CLDA_1h[buildingDate_CLDA_1h[i]];
                            }

                            if(times == 0) {
                                _labelsCLDA = buildingDate_CLDA_1h;
                                _datasetsCLDA.push({strokeColor : "rgba(0,220,0,1)",fillColor : "rgba(0,220,0,0.5)",data : building_CLDA_1h,title: tempCode +" Staper Cold (KWh - Absolute) - 1 h"});
                            }
                            else if(times == 1) {
                                if(buildingDate_CLDA_1h.length>_labelsCLDA.length) _labelsCLDA = buildingDate_CLDA_1h;
                                _datasetsCLDA.push({strokeColor : "rgba(220,220,0,1)",fillColor : "rgba(220,220,0,0.5)",data : building_CLDA_1h,title: tempCode +" Staper Cold (KWh - Absolute) - 1 h"});
                            }
                            else if(times == 2) {
                                if(buildingDate_CLDA_1h.length>_labelsCLDA.length) _labelsCLDA = buildingDate_CLDA_1h;
                                _datasetsCLDA.push({strokeColor : "rgba(220,0,0,1)",fillColor : "rgba(220,0,0,0.5)",data : building_CLDA_1h,title: tempCode +" Staper Cold (KWh - Absolute) - 1 h"});
                            }
                            else if(times == 3) {
                                if(buildingDate_CLDA_1h.length>_labelsCLDA.length) _labelsCLDA = buildingDate_CLDA_1h;
                                _datasetsCLDA.push({strokeColor : "rgba(0,0,220,1)",fillColor : "rgba(0,0,220,0.5)",data : building_CLDA_1h,title: tempCode +" Staper Cold (KWh - Absolute) - 1 h"});
                            }
                        }
                        else{
                            error("Empty observations for " + __OFFERING__);
                        }
                    }
                    else{
                        error("Empty observations for " + __OFFERING__);
                    }
                }
                else{
                    error("Empty observations for " + __OFFERING__);
                }

                if(times == 3){
                    if(_datasetsCLDA.length>0){
                        var ChartData = {labels : _labelsCLDA,datasets : _datasetsCLDA};

                        clearChart("building-chart-fullscreen_1h-container", "building-chart-fullscreen_1h", 1180, 260, null);
                        var myLine = new Chart(document.getElementById("building-chart-fullscreen_1h").getContext("2d")).Bar(ChartData,opt);
                    }
                    else{
                        clearChart("building-chart-fullscreen_1h-container", "building-chart-fullscreen_1h", 1180, 260, "1h");
                    }
                }
                else DisplayBuildingCLDA_1h(times+1);
            }
        }

        var buildingStartDate = new Date(buildingDate);
        buildingStartDate.setHours(buildingStartDate.getHours()-24);
        var buildingEndDate = new Date(buildingDate);

        buildingStartDate = adjustToTimeZone4SOS(buildingStartDate);
        buildingEndDate = adjustToTimeZone4SOS(buildingEndDate);

        var tempCode = buildingCode.replace("-S","-0");

        if(pilotCode == 9){
            var index = 0;
            if (times==0) index = parseInt(tempCode.split("-")[1])+1;
            if (times==1) index = parseInt(tempCode.split("-")[1])+3;
            if (times==2) index = parseInt(tempCode.split("-")[1])+5;
            if (times==3) index = parseInt(tempCode.split("-")[1])+7;
            if(index<10) tempCode = tempCode.split("-")[0] + "-00" + index;
            else tempCode = tempCode.split("-")[0] + "-0" + index;
        }

        var __OFFERING__ = tempCode + "_CLDA_KWH_15";
        var __BEGINPOSITION__ = buildingStartDate.yyyy_mm_ddThh_min_sec();
        var __ENDPOSITION__ = buildingEndDate.yyyy_mm_ddThh_min_sec()

        var url = buildingSOAPCallCLDA;

        url = url.replace("__OFFERING__",__OFFERING__);
        url = url.replace("__BEGINPOSITION__",__BEGINPOSITION__);
        url = url.replace("__ENDPOSITION__",__ENDPOSITION__);

        //call(url);

        url = "body=" + url + "&key=" + key;

        // Send the POST request
        xmlhttp.open('POST', './php/proxySOS.php', true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send(url);
    }

    _datasetsTHEA = new Array();
    _labelsTHEA = new Array();
    function DisplayBuildingTHEA_1h(times){
        if (times == 0) {
            _datasetsTHEA = new Array();
            _labelsTHEA = new Array();
        }

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 400) {clearChart("building-chart-fullscreen_1d-container", "building-chart-fullscreen_1d", 1180, 260, "1d");}
                if (isValidJSONResponse(xmlhttp)) {

                    var json = JSON.parse(xmlhttp.responseText);

                    if(defined(json.resultValues)){
                        buildingConsumption_THEA_1h = new Array();
                        buildingDate_THEA_1h = new Array();
                        building_THEA_1h = new Array();

                        var observations = json.resultValues.split('@@');

                        if(observations.length>4){

                            done("renderizzo 1 h THEA: " + (observations.length-1) + " valid observations");

                            var index = 0;
                            var prevValue = undefined;
                            for(var i=1;i<observations.length;i+=2){
                                var observation = observations[i];

                                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                                var value = observation.split(",")[1];

                                time = adjustToTimeZone(time);
                                time = time.substring(11,16);

                                if(!defined(prevValue)) prevValue = value;

                                if(value>0) buildingConsumption_THEA_1h[time] = value - prevValue;
                                else buildingConsumption_THEA_1h[time] = value;
                                buildingDate_THEA_1h[index] = time;
                                prevValue = value;
                                index++;
                            }

                            //buildingDate_THEA_1h.sort();

                            for(var i=0;i<buildingDate_THEA_1h.length;i++){
                                building_THEA_1h[i] = buildingConsumption_THEA_1h[buildingDate_THEA_1h[i]];
                            }

                            if(times == 0) {
                                _labelsTHEA = buildingDate_THEA_1h;
                                _datasetsTHEA.push({strokeColor : "rgba(0,220,0,1)",fillColor : "rgba(0,220,0,0.5)",data : building_THEA_1h,title: tempCode +" Thermal Energy Consumption (KWh - Absolute) - 1 h"});
                            }
                            else if(times == 1) {
                                if(buildingDate_THEA_1h.length>_labelsTHEA.length) _labelsTHEA = buildingDate_THEA_1h;
                                _datasetsTHEA.push({strokeColor : "rgba(220,220,0,1)",fillColor : "rgba(220,220,0,0.5)",data : building_THEA_1h,title: tempCode +" Thermal Energy Consumption (KWh - Absolute) - 1 h"});
                            }
                            else if(times == 2) {
                                if(buildingDate_THEA_1h.length>_labelsTHEA.length) _labelsTHEA = buildingDate_THEA_1h;
                                _datasetsTHEA.push({strokeColor : "rgba(220,0,0,1)",fillColor : "rgba(220,0,0,0.5)",data : building_THEA_1h,title: tempCode +" Thermal Energy Consumption (KWh - Absolute) - 1 h"});
                            }
                            else if(times == 3) {
                                if(buildingDate_THEA_1h.length>_labelsTHEA.length) _labelsTHEA = buildingDate_THEA_1h;
                                _datasetsTHEA.push({strokeColor : "rgba(0,0,220,1)",fillColor : "rgba(0,0,220,0.5)",data : building_THEA_1h,title: tempCode +" Thermal Energy Consumption (KWh - Absolute) - 1 h"});
                            }
                        }
                        else{
                            error("Empty observations for " + __OFFERING__);
                        }
                    }
                    else{
                        error("Empty observations for " + __OFFERING__);
                    }
                }
                else{
                    error("Empty observations for " + __OFFERING__);
                }

                if(times == 3){
                    loadingIndicator.className="fullScreenLoaderHidden";

                    if(_datasetsTHEA.length>0){
                        var ChartData = {labels : _labelsTHEA,datasets : _datasetsTHEA};

                        clearChart("building-chart-fullscreen_1d-container", "building-chart-fullscreen_1d", 1180, 260, null);
                        var myLine = new Chart(document.getElementById("building-chart-fullscreen_1d").getContext("2d")).Bar(ChartData,opt);
                    }
                    else{
                        error("Grafico double Y con dati tutti a 0");
                        clearChart("building-chart-fullscreen_1d-container", "building-chart-fullscreen_1d", 1180, 260, "1d");
                    }
                }
                else DisplayBuildingTHEA_1h(times+1);
            }
        }

        var buildingStartDate = new Date(buildingDate);
        buildingStartDate.setHours(buildingStartDate.getHours()-24);
        var buildingEndDate = new Date(buildingDate);

        buildingStartDate = adjustToTimeZone4SOS(buildingStartDate);
        buildingEndDate = adjustToTimeZone4SOS(buildingEndDate);

        var tempCode = buildingCode.replace("-S","-0");

        if(pilotCode == 9){
            var index = 0;
            if (times==0) index = parseInt(tempCode.split("-")[1]);
            if (times==1) index = parseInt(tempCode.split("-")[1])+2;
            if (times==2) index = parseInt(tempCode.split("-")[1])+4;
            if (times==3) index = parseInt(tempCode.split("-")[1])+6;
            if(index<10) tempCode = tempCode.split("-")[0] + "-00" + index;
            else tempCode = tempCode.split("-")[0] + "-0" + index;
        }

        var __OFFERING__ = tempCode + "_THEA_KWH_15";
        var __BEGINPOSITION__ = buildingStartDate.yyyy_mm_ddThh_min_sec();
        var __ENDPOSITION__ = buildingEndDate.yyyy_mm_ddThh_min_sec()

        var url = buildingSOAPCallTHEA;

        url = url.replace("__OFFERING__",__OFFERING__);
        url = url.replace("__BEGINPOSITION__",__BEGINPOSITION__);
        url = url.replace("__ENDPOSITION__",__ENDPOSITION__);

        //call(url);

        url = "body=" + url + "&key=" + key;

        // Send the POST request
        xmlhttp.open('POST', './php/proxySOS.php', true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send(url);
    }

    function RenderBuildingELE_1h(sos){
        done("renderizzo 1 h ELE: " + (sos.length-1) + " valid observations");

        buildingConsumption_ELE_1h = new Array();
        buildingDate_ELE_1h = new Array();
        building_ELE_1h = new Array();

        if(sos.length>2){

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                time = adjustToTimeZone(time);
                time = time.substring(11,16);

                buildingConsumption_ELE_1h[time] = value;
                buildingDate_ELE_1h[i-1] = time;
            }

            for(var i=0;i<buildingDate_ELE_1h.length;i++){
                building_ELE_1h[i] = buildingConsumption_ELE_1h[buildingDate_ELE_1h[i]];
            }

            var lineChartData = {
                labels : buildingDate_ELE_1h,
                datasets : [
                    {
                        fillColor : "rgba(0,220,0,0.5)",
                        strokeColor : "rgba(0,220,0,1)",
                        pointColor : "rgba(0,220,0,1)",
                        pointStrokeColor : "#fff",
                        data : building_ELE_1h,
                        title: "Electrical Energy Consumption (KWh) - 1 h"
                    }
                ]

            }

            clearChart("building-chart-fullscreen_1h-container", "building-chart-fullscreen_1h", 1180, 260, null);
            var myLine = new Chart(document.getElementById("building-chart-fullscreen_1h").getContext("2d")).Bar(lineChartData,opt);
        }
        else{
            clearChart("building-chart-fullscreen_1h-container", "building-chart-fullscreen_1h", 1180, 260, "1h");
        }
    }

    function RenderBuildingELE_1d(sos){
        done("renderizzo 1 d ELE: " + (sos.length-1) + " valid observations");
        loadingIndicator.className="fullScreenLoaderHidden";

        buildingConsumption_ELE_1d = new Array();
        buildingDate_ELE_1d = new Array();
        building_ELE_1d = new Array();

        if(sos.length>2){

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,10);
                var value = observation.split(",")[1];

                buildingConsumption_ELE_1d[time] = value;
                buildingDate_ELE_1d[i-1] = time;
            }

            for(var i=0;i<buildingDate_ELE_1d.length;i++){
                building_ELE_1d[i] = buildingConsumption_ELE_1d[buildingDate_ELE_1d[i]];
            }

            var lineChartData = {
                labels : buildingDate_ELE_1d,
                datasets : [
                    {
                        fillColor : "rgba(220,0,0,0.5)",
                        strokeColor : "rgba(220,0,0,1)",
                        pointColor : "rgba(220,0,0,1)",
                        pointStrokeColor : "#fff",
                        data : building_ELE_1d,
                        title : "Electrical Energy Consumption (KWh) - 1 d"
                    }
                ]

            }

            clearChart("building-chart-fullscreen_1d-container", "building-chart-fullscreen_1d", 1180, 260, null);
            var myLine = new Chart(document.getElementById("building-chart-fullscreen_1d").getContext("2d")).Bar(lineChartData,opt);
        }
        else{
            clearChart("building-chart-fullscreen_1d-container", "building-chart-fullscreen_1d", 1180, 260, "1d");
        }
    }

    function RenderBuilding_1y(sos,what){
        done("renderizzo 1 y consumption: " + (sos.length-1) + " valid observations");
        loadingIndicator4stats.style.display = "none";

        buildingConsumption_1y = new Array();
        buildingDate_1y = new Array();
        buildingKWH_1y = new Array();

        if(sos.length>2){
            var prevMonth = undefined;
            var prevTime = undefined;
            var prevConsu = 0;
            var index = 0;

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,7);
                var month = time.substring(5,7);
                var value = parseFloat(observation.split(",")[1]);

                if(i==1) {prevMonth = month; prevTime = time};

                if(month != prevMonth){
                    buildingConsumption_1y[prevTime] = prevConsu;
                    buildingDate_1y[index] = prevTime;

                    prevMonth = month;
                    prevTime = time;
                    prevConsu = 0;
                    index ++;
                }
                else{
                    prevConsu += value;
                }
            }

            buildingConsumption_1y[prevTime] = prevConsu;
            buildingDate_1y[index] = prevTime;

            for(var i=0;i<buildingDate_1y.length;i++){
                buildingKWH_1y[i] = buildingConsumption_1y[buildingDate_1y[i]];
            }

            var label;
            if(what == "ELE") label = "Electrical Energy Consumption (KWh) - 1 y";
            if(what == "THE") label = "Thermal Energy Consumption (KWh) - 1 y";
            if(what == "GAS") label = "Gaseous Fuel Consumption (m3) - 1 y";

            var lineChartData_1y = {
                labels : buildingDate_1y,
                datasets : [
                    {
                        fillColor : "rgba(0,0,220,0.5)",
                        strokeColor : "rgba(0,0,220,1)",
                        pointColor : "rgba(0,0,220,1)",
                        pointStrokeColor : "#fff",
                        data : buildingKWH_1y,
                        title : label
                    }
                ]

            }

            clearChart("building-chart-container", "building-chart", 400, 300, null);
            var myLine_1d = new Chart(document.getElementById("building-chart").getContext("2d")).Bar(lineChartData_1y,opt);
        }
        else{
            loadingIndicator4stats.style.display = "block";
        }
    }

    function RenderBuildingSUGGESTIONS_TEMP(sos){
        done("renderizzo 1 h SUGGESTION TEMP: " + (sos.length-1) + " valid observations");
        loadingIndicator.className="fullScreenLoaderHidden";

        buildingSuggestion_TEMP = new Array();
        buildingSuggestionDate_TEMP = new Array();
        buildingSugg_TEMP = new Array();
        var buildingSugg_PROFILE = new Array();

        if(sos.length>2){
            var datestring = buildingDate_prediction.getFullYear() + "-" + ('0' + (buildingDate_prediction.getMonth()+1)).slice(-2) + "-" + ('0' + (buildingDate_prediction.getDate())).slice(-2);

            if(defined(buildingScheduling_SUGGESTION[datestring])){
                var comfort = undefined;
                var configuration = buildingScheduling_SUGGESTION[datestring];

                var profile = configuration.comfortProfile;

                if(defined(configuration)){
                    profile = profile.replace("\\", "").replace("},null]", "}]").replace("{T:", "{\"T\":").replace(",INT:", "{\",INT\":");
                    profile = profile.replace("{from_hh:", "{\"from_hh\":").replace("from_mm:", "\"from_mm\":").replace("to_hh:", "\"to_hh\":");
                    profile = profile.replace("to_mm:", "\"to_mm\":").replace(",{}", "").replace("\n", "").replace("\r", "");
                    profile = profile.replace("{\",", ",\"").replace(":0", ":").replace(": 0", ":").replace(":,", ":0,").replace(":}", ":0}");
                    profile = profile.replace(/00/g, '0');
                    if(isJson(profile)){
                        comfort = JSON.parse(profile);
                    }
                }
            }

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                time = adjustToTimeZone(time);
                time = time.substring(11,16);

                buildingSuggestion_TEMP[time] = value;
                buildingSuggestionDate_TEMP[i-1] = time;
            }

            for(var i=0;i<buildingSuggestionDate_TEMP.length;i++){
                buildingSugg_TEMP[i] = buildingSuggestion_TEMP[buildingSuggestionDate_TEMP[i]];
                if(defined(comfort))buildingSugg_PROFILE.push(comfort.T);
            }

            var datasets = new Array();
            datasets.push({strokeColor : "rgba(220,0,0,1)",pointDotRadius : 0,data : buildingSugg_TEMP,title : "Internal Temperature (°C) - 1h"});
            if(defined(comfort))datasets.push({strokeColor : "rgba(0,0,220,1)",pointDotRadius : 0,data : buildingSugg_PROFILE,title: "Comfort Temperature (°C)"});

            var ChartData = {labels : buildingSuggestionDate_TEMP,datasets : datasets};

            clearChart("building-chart-prediction-container", "building-chart-prediction", 900, 200, null);
            var myLine = new Chart(document.getElementById("building-chart-prediction").getContext("2d")).Line(ChartData,optNOTFILL4Temp);
        }
        else{
            clearChart("building-chart-prediction-container", "building-chart-prediction", 900, 200, "mini");
        }
    }

    function RenderBuildingSUGGESTIONS_ONOFF(sos){
        done("renderizzo 1 h SUGGESTION ONOF: " + (sos.length-1) + " valid observations");

        var scheduling = document.getElementById("building-prediction-times");
        scheduling.style.lineHeight = "200px";

        buildingSuggestion_ONOFF = new Array();
        buildingSuggestionDate_ONOFF = new Array();
        buildingSugg_ONOFF = new Array();

        if(sos.length>2){

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                //time = adjustToTimeZone(time);
                time = time.substring(11,16);

                buildingSuggestion_ONOFF[time] = value;
                buildingSuggestionDate_ONOFF[i-1] = time;
            }

            for(var i=0;i<buildingSuggestionDate_ONOFF.length;i++){
                buildingSugg_ONOFF[i] = buildingSuggestion_ONOFF[buildingSuggestionDate_ONOFF[i]];
            }

            if(max(buildingSugg_ONOFF) != 0){
                scheduling.style.lineHeight = "inherit";
                var suggestion = "";
                var on = false;

                for(var i=0;i<buildingSugg_ONOFF.length;i++){
                    var value = buildingSugg_ONOFF[i];
                    var time = buildingSuggestionDate_ONOFF[i];

                    if(value == 1 && !on){
                        on = true;
                        suggestion += "TURN ON: " + time + "<br/>";
                    }
                    else if(value == 0 && on){
                        on = false;
                        suggestion += "SWITCH OFF: " + time + "<br/><br/>";
                    }
                }
                scheduling.innerHTML = suggestion;
            }
            else{
                scheduling.textContent = "NO NEED TO HEAT";
            }
        }
        else{
            scheduling.textContent = "NO DATA";
        }
    }

    function DisplayBuildingSETTINGS(updateonly){
        if(defined(buildingFoiid_SUGGESTION)){
            done("chiedo scheduling per domani " + buildingFoiid_SUGGESTION);
            var temperature = document.getElementById("building-prediction-comfort-temp");
            var h_start = document.getElementById("building-prediction-start");
            var h_end = document.getElementById("building-prediction-end");

            document.getElementById("building-predict").style.display = "none";
            $("#buildinganalysis-scheduling-table").empty();

            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if(xmlhttp.status == 400){error("SCHEDULING PER DOMANI ERRORE STATUS 400: " + url);}
                    //console.log(xmlhttp.responseText);
                    if (isValidJSONResponse(xmlhttp)) {

                        var json = JSON.parse(xmlhttp.responseText);

                        var building = json.buildings;

                        var selecteddate = buildingDate_prediction.getFullYear() + "-" + ('0' + (buildingDate_prediction.getMonth()+1)).slice(-2) + "-" + ('0' + (buildingDate_prediction.getDate())).slice(-2);

                        var exists = false;
                        if(defined(building)){
                            buildingScheduling_SUGGESTION = new Array();

                            if(defined(building.length)){

                                //console.log(building);

                                var table = document.getElementById("buildinganalysis-scheduling-table");
                                var row = table.insertRow(0);

                                var del = row.insertCell(0);
                                del.innerHTML = "";

                                var startdate = row.insertCell(1);
                                startdate.innerHTML = "DAY";

                                var from = row.insertCell(2);
                                from.innerHTML = "FROM";

                                var to = row.insertCell(3);
                                to.innerHTML = "TO";

                                var temp = row.insertCell(4);
                                temp.innerHTML = "TEMPERATURE";

                                var orderedConfigs = new Array();
                                for(var i=0;i<building.length;i++){
                                    orderedConfigs.push(building[i].day);
                                    buildingScheduling_SUGGESTION[building[i].day] = building[i];
                                }

                                orderedConfigs.sort();

                                var index = 1;
                                for(var i=0;i<orderedConfigs.length;i++){
                                    var day = orderedConfigs[i];
                                    var configuration = buildingScheduling_SUGGESTION[day];

                                    buildingId_SUGGESTION = configuration.buildingid;
                                    done("BUILDING ID TROVATO " + buildingId_SUGGESTION);

                                    if(selecteddate == day){

                                        var profile = configuration.comfortProfile;
                                        if(defined(profile)){
                                            profile = profile.replace("\\", "").replace("},null]", "}]").replace("{T:", "{\"T\":").replace(",INT:", "{\",INT\":");
                                            profile = profile.replace("{from_hh:", "{\"from_hh\":").replace("from_mm:", "\"from_mm\":").replace("to_hh:", "\"to_hh\":");
                                            profile = profile.replace("to_mm:", "\"to_mm\":").replace(",{}", "").replace("\n", "").replace("\r", "");
                                            profile = profile.replace("{\",", ",\"").replace(":0", ":").replace(": 0", ":").replace(":,", ":0,").replace(":}", ":0}");
                                            profile = profile.replace(/00/g, '0');
                                            if(isJson(profile)){
                                                done("SCHEDULING PER GIORNO SELEZIONATO TROVATO: " + profile);
                                                var comfort = JSON.parse(profile);
                                                var options = temperature.options;
                                                for (var j = 0; j < options.length; j++) {
                                                   var value = options[j].value;
                                                   if(value == comfort.T) {options[j].selected = true;break;}
                                                }

                                                var options = h_start.options;
                                                for (var j = 0; j < options.length; j++) {
                                                    var value = options[j].value;
                                                    if(value == comfort.INT[0].from_hh + ":" + comfort.INT[0].from_mm) {options[j].selected = true;break;}
                                                }

                                                var options = h_end.options;
                                                for (var j = 0; j < options.length; j++) {
                                                    var value = options[j].value;
                                                    if(value == comfort.INT[0].to_hh + ":" + comfort.INT[0].to_mm) {options[j].selected = true;break;}
                                                }

                                                exists = true;
                                            }
                                            else
                                               error("Comfort profile is not valid " + profile);
                                        }
                                    }

                                    if(day>=selecteddate && index<=7){

                                        var profile = configuration.comfortProfile;
                                        if(defined(profile)){
                                            profile = profile.replace("\\", "").replace("},null]", "}]").replace("{T:", "{\"T\":").replace(",INT:", "{\",INT\":");
                                            profile = profile.replace("{from_hh:", "{\"from_hh\":").replace("from_mm:", "\"from_mm\":").replace("to_hh:", "\"to_hh\":");
                                            profile = profile.replace("to_mm:", "\"to_mm\":").replace(",{}", "").replace("\n", "").replace("\r", "");
                                            profile = profile.replace("{\",", ",\"").replace(":0", ":").replace(": 0", ":").replace(":,", ":0,").replace(":}", ":0}");
                                            profile = profile.replace(/00/g, '0');
                                            if(isJson(profile)){
                                                var comfort = JSON.parse(profile);

                                                var row = table.insertRow(index);

                                                var del = row.insertCell(0);
                                                del.style.cursor = "pointer";
                                                del.style.textAlign = "right";
                                                del.id = configuration.id;
                                                del.innerHTML = "<img src='./img/delete_white.png' style='height: 20px'/>";
                                                del.onclick = function(){deleteTask(this.id);}

                                                var startdate = row.insertCell(1);
                                                startdate.innerHTML = day;

                                                var from = row.insertCell(2);
                                                from.innerHTML = comfort.INT[0].from_hh + ":" + comfort.INT[0].from_mm;

                                                var to = row.insertCell(3);
                                                to.innerHTML = comfort.INT[0].to_hh + ":" + comfort.INT[0].to_mm;

                                                var temp = row.insertCell(4);
                                                temp.innerHTML = comfort.T;

                                                index++;
                                            }
                                        }
                                        else{
                                            var row = table.insertRow(index);

                                            var del = row.insertCell(0);
                                            del.innerHTML = "";

                                            var startdate = row.insertCell(1);
                                            startdate.innerHTML = day;

                                            var from = row.insertCell(2);
                                            from.innerHTML = "";

                                            var to = row.insertCell(3);
                                            to.innerHTML = "";

                                            var temp = row.insertCell(4);
                                            temp.innerHTML = "";

                                            index++;
                                        }
                                    }
                                }

                                if(!exists){
                                    temperature.options[0].selected = true;
                                    h_start.options[0].selected = true;
                                    h_end.options[0].selected = true;
                                }
                            }
                            else{
                                buildingId_SUGGESTION = building.buildingid;
                                done("BUILDING ID TROVATO " + buildingId_SUGGESTION);

                                error("NIENTE SCHEDULING PER DOMANI");
                                var table = document.getElementById("buildinganalysis-scheduling-table");
                                var row = table.insertRow(0);
                                var cell1 = row.insertCell(0);
                                cell1.style.textAlign = "center";
                                cell1.innerHTML = "No active schedulings available for this building";
                            }
                        }
                    }
                    else{
                        error("NIENTE SCHEDULING PER DOMANI");
                        var table = document.getElementById("buildinganalysis-scheduling-table");
                        var row = table.insertRow(0);
                        var cell1 = row.insertCell(0);
                        cell1.style.textAlign = "center";
                        cell1.innerHTML = "No active schedulings available for this building";
                    }

                    document.getElementById("building-predict").style.display = "table-caption";
                    if(!defined(updateonly))initBuildingsForSuggestion();
                }
            }

            var url = "./php/proxySUGGESTION_BUILDINGS.php?url=__SCENARIOCODE__&foiid=__FOOID__&key=" + key;

            url = url.replace("__SCENARIOCODE__",suggestionAPICode[pilotCode]);
            url = url.replace("__FOOID__",buildingFoiid_SUGGESTION);

            // Send the POST request
            xmlhttp.open('GET', url, true);
            xmlhttp.send();
        }
    }

    function deleteTask(taskid){

        if(defined(taskid)){
            var url;

            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    //console.log(xmlhttp.responseText);
                    if (xmlhttp.status == 200 && defined(xmlhttp.responseText)) {
                        done("Deleted task " + taskid);
                    }
                    else{
                        error("Impossibile eliminare task " + taskid);
                    }
                    DisplayBuildingSETTINGS(true);
                }
            }

            var url = "./php/proxySUGGESTION_BUILDINGS.php?url=__SCENARIOCODE__/profiles/__TASKID__&key=" + key;

            url = url.replace("__SCENARIOCODE__",suggestionAPICode[pilotCode]);
            url = url.replace("__TASKID__",taskid);

            // Send the POST request
            xmlhttp.open('DELETE', url, true);
            //xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send();
        }
    }

    function RenderShelterELE_15(sos){
        done("renderizzo 15 min ELE: " + (sos.length-1) + " valid observations");

        shelterConsumption_15 = new Array();
        shelterDate_15 = new Array();
        shelterKWH_15 = new Array();

        if(sos.length>2){

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];
                shelterAVG_KWH_CURVE += parseFloat(value);

                time = adjustToTimeZone(time);

                shelterConsumption_15[time] = value;
                shelterDate_15[i-1] = time;
            }

            shelterAVG_KWH_CURVE /= ((sos.length-1)/4);

            for(var i=0;i<shelterDate_15.length;i++){
                shelterKWH_15[i] = shelterConsumption_15[shelterDate_15[i]];
            }

            for(var i=0;i<shelterDate_15.length;i++){
                if((i)%4 != 0) shelterDate_15[i] = "";
            }

            var lineChartData = {
                labels : shelterDate_15,
                datasets : [
                    {
                        fillColor : "rgba(220,220,0,0.5)",
                        strokeColor : "rgba(220,220,0,1)",
                        pointColor : "rgba(220,220,0,1)",
                        pointStrokeColor : "#fff",
                        data : shelterKWH_15,
                        title: "Electrical Energy Consumption (KWh) - 15 min"
                    }
                ]

            }

            clearChart("shelter-chart-fullscreen_10-container", "shelter-chart-fullscreen_10", 1180, 260, null);
            var myLine = new Chart(document.getElementById("shelter-chart-fullscreen_10").getContext("2d")).Bar(lineChartData,opt);
        }
        else{
            clearChart("shelter-chart-fullscreen_10-container", "shelter-chart-fullscreen_10", 1180, 260, "15");
        }

        if((shelterAVG_KWH_CURVE != 0)){
            DisplayShelterCURVE();

        }
        else{
            clearChart("shelter-chart-fullscreen_curve-container", "shelter-chart-fullscreen_curve", 1180, 260, "1d");
        }
    }

    function DisplayShelterCURVE(){
        shelterDate_CURVE = shelterKWH_CURVE = undefined;
        shelterAVG_TEMP_CURVE = 0;

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 400) {clearChart("shelter-chart-fullscreen_curve-container", "shelter-chart-fullscreen_curve", 1180, 260, "1d");}
                if (isValidJSONResponse(xmlhttp)) {

                    var json = JSON.parse(xmlhttp.responseText);

                    if(defined(json.resultValues)){

                        var observations = json.resultValues.split('@@');

                        if(observations.length>2){

                            for(var i=1;i<observations.length;i++){
                                var observation = observations[i];
                                var value = observation.split(",")[1];

                                shelterAVG_TEMP_CURVE += parseFloat(value);
                            }

                            shelterAVG_TEMP_CURVE /= observations.length-1;

                            var xmlhttp2 = new XMLHttpRequest();

                            xmlhttp2.onreadystatechange = function () {
                                if (xmlhttp2.readyState == 4) {
                                    if (xmlhttp2.status == 400) {clearChart("shelter-chart-fullscreen_curve-container", "shelter-chart-fullscreen_curve", 1180, 260, "1d");}
                                    if (xmlhttp2.status == 200) {

                                        var csv = xmlhttp2.responseText;

                                        if(defined(csv)){
                                            shelterDate_CURVE = new Array();
                                            shelterKWH_CURVE = new Array();
                                            var avg = new Array();

                                            var observations = csv.split(/\r\n|\n/);

                                            if(observations.length>2){

                                                for(var i=1;i<observations.length;i++){
                                                    var observation = observations[i];
                                                    var temp = observation.split(";")[0];
                                                    var value = observation.split(";")[1];

                                                    shelterKWH_CURVE[i-1] = value;
                                                    shelterDate_CURVE[i-1] = temp;

                                                    if(i<observations.length-1){
                                                        var next = observations[i+1];
                                                        if((parseFloat(temp) <= shelterAVG_TEMP_CURVE) && (shelterAVG_TEMP_CURVE < parseFloat(next.split(";")[0]))){
                                                            avg[i-1] = shelterAVG_KWH_CURVE;
                                                        }
                                                    }
                                                }

                                                for(var i=0;i<shelterDate_CURVE.length;i++){
                                                    if((i)%4 != 0) shelterDate_CURVE[i] = "";
                                                }

                                                if(max(shelterKWH_CURVE) != 0){

                                                    var datasets = new Array();
                                                    datasets.push({strokeColor : "rgba(0,0,220,1)",pointDotRadius : 0,data : shelterKWH_CURVE,title: "Shelter Behavior Curve Temp/Consumption"});
                                                    datasets.push({strokeColor : "rgba(139,0,139,1)",pointDot : true,pointDotRadius : 8,pointColor : "rgba(139,0,139,1)",pointStrokeColor : "#fff",data : avg,title: "Shelter Daily-Behavior AVG Temp Ext/AVG Consumption"});

                                                    var ChartData = {labels : shelterDate_CURVE,datasets : datasets};

                                                    clearChart("shelter-chart-fullscreen_curve-container", "shelter-chart-fullscreen_curve", 1180, 260, null);
                                                    var myLine = new Chart(document.getElementById("shelter-chart-fullscreen_curve").getContext("2d")).Line(ChartData,optNOTFILL);

                                                }
                                                else{
                                                    clearChart("shelter-chart-fullscreen_curve-container", "shelter-chart-fullscreen_curve", 1180, 260, "1d");
                                                }
                                            }
                                            else{
                                                clearChart("shelter-chart-fullscreen_curve-container", "shelter-chart-fullscreen_curve", 1180, 260, "1d");
                                            }
                                        }
                                        else{
                                            clearChart("shelter-chart-fullscreen_curve-container", "shelter-chart-fullscreen_curve", 1180, 260, "1d");
                                        }
                                    }
                                }
                            }

                            var tempCode = buildingCode.replace("-M","-0");
                            var url = "./shelter/" + tempCode + ".csv";

                            // Send the POST request
                            xmlhttp2.open('GET', url, true);
                            xmlhttp2.send();

                        }
                        else{
                            clearChart("shelter-chart-fullscreen_curve-container", "shelter-chart-fullscreen_curve", 1180, 260, "1d");
                        }
                    }
                    else{
                        clearChart("shelter-chart-fullscreen_curve-container", "shelter-chart-fullscreen_curve", 1180, 260, "1d");
                    }
                }
            }
        }

        var buildingStartDate = new Date(buildingDate);
        buildingStartDate.setHours(buildingStartDate.getHours()-24);
        var buildingEndDate = new Date(buildingDate);

        buildingStartDate = adjustToTimeZone4SOS(buildingStartDate);
        buildingEndDate = adjustToTimeZone4SOS(buildingEndDate);

        var tempCode = buildingCode.replace("-T","-0");
        tempCode = buildingCode.replace("-0","-M");

        var __OFFERING__ = tempCode + "_TEMP_CEL_1h";
        var __BEGINPOSITION__ = buildingStartDate.yyyy_mm_ddThh_min_sec();
        var __ENDPOSITION__ = buildingEndDate.yyyy_mm_ddThh_min_sec();

        var url = buildingSOAPCallTEMP;

        url = url.replace("__OFFERING__",__OFFERING__);
        url = url.replace("__BEGINPOSITION__",__BEGINPOSITION__);
        url = url.replace("__ENDPOSITION__",__ENDPOSITION__);

        url = "body=" + url + "&key=" + key;

        // Send the POST request
        xmlhttp.open('POST', './php/proxySOS.php', true);
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send(url);
    }

    function RenderShelterELE_1h(sos){
        done("renderizzo 1h ELE: " + (sos.length-1) + " valid observations");

        shelterConsumption_1h = new Array();
        shelterDate_1h = new Array();
        shelterKWH_1h = new Array();

        if(sos.length>2){

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                time = adjustToTimeZone(time);
                time = time.substring(11,16);

                shelterConsumption_1h[time] = value;
                shelterDate_1h[i-1] = time;
            }

            for(var i=0;i<shelterDate_1h.length;i++){
                shelterKWH_1h[i] = shelterConsumption_1h[shelterDate_1h[i]];
            }

            var lineChartData = {
                labels : shelterDate_1h,
                datasets : [
                    {
                        fillColor : "rgba(0,220,0,0.5)",
                        strokeColor : "rgba(0,220,0,1)",
                        pointColor : "rgba(0,220,0,1)",
                        pointStrokeColor : "#fff",
                        data : shelterKWH_1h,
                        title : "Electrical Energy Consumption (KWh) - 1 h"
                    }
                ]

            }

            clearChart("shelter-chart-fullscreen_1h-container", "shelter-chart-fullscreen_1h", 1180, 260, null);
            var myLine = new Chart(document.getElementById("shelter-chart-fullscreen_1h").getContext("2d")).Bar(lineChartData,opt);
        }
        else{
            clearChart("shelter-chart-fullscreen_1h-container", "shelter-chart-fullscreen_1h", 1180, 260, "1h");
        }
    }

    function RenderShelterELE_1d(sos){
        done("renderizzo 1d ELE: " + (sos.length-1) + " valid observations");
        loadingIndicator.className="fullScreenLoaderHidden";

        shelterConsumption_1d = new Array();
        shelterDate_1d = new Array();
        shelterKWH_1d = new Array();

        if(sos.length>2){

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,10);
                var value = observation.split(",")[1];

                shelterConsumption_1d[time] = value;
                shelterDate_1d[i-1] = time;
            }

            for(var i=0;i<shelterDate_1d.length;i++){
                shelterKWH_1d[i] = shelterConsumption_1d[shelterDate_1d[i]];
            }

            var lineChartData = {
                labels : shelterDate_1d,
                datasets : [
                    {
                        fillColor : "rgba(220,0,0,0.5)",
                        strokeColor : "rgba(220,0,0,1)",
                        pointColor : "rgba(220,0,0,1)",
                        pointStrokeColor : "#fff",
                        data : shelterKWH_1d,
                        title : "Electrical Energy Consumption (KWh) - 1 d"
                    }
                ]

            }

            clearChart("shelter-chart-fullscreen_1d-container", "shelter-chart-fullscreen_1d", 1180, 260, null);
            var myLine = new Chart(document.getElementById("shelter-chart-fullscreen_1d").getContext("2d")).Bar(lineChartData,opt);
        }
        else{
            clearChart("shelter-chart-fullscreen_1d-container", "shelter-chart-fullscreen_1d", 1180, 260, "1d");
        }
    }

    function RenderShelterELE_1y(sos){
        done("renderizzo 1 y consumption: " + (sos.length-1) + " valid observations");
        loadingIndicator4stats.style.display = "none";

        shelterConsumption_1y = new Array();
        shelterDate_1y = new Array();
        shelterKWH_1y = new Array();

        if(sos.length>2){
            var prevMonth = undefined;
            var prevTime = undefined;
            var prevConsu = 0;
            var index = 0;

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,7);
                var month = time.substring(5,7);
                var value = parseFloat(observation.split(",")[1]);

                if(i==1) {prevMonth = month; prevTime = time};

                if(month != prevMonth){
                    shelterConsumption_1y[prevTime] = prevConsu;
                    shelterDate_1y[index] = prevTime;

                    prevMonth = month;
                    prevTime = time;
                    prevConsu = 0;
                    index ++;
                }
                else{
                    prevConsu += value;
                }
            }

            shelterConsumption_1y[prevTime] = prevConsu;
            shelterDate_1y[index] = prevTime;

            for(var i=0;i<shelterDate_1y.length;i++){
                shelterKWH_1y[i] = shelterConsumption_1y[shelterDate_1y[i]];
            }

            var lineChartData_1y = {
                labels : shelterDate_1y,
                datasets : [
                    {
                        fillColor : "rgba(0,0,220,0.5)",
                        strokeColor : "rgba(0,0,220,1)",
                        pointColor : "rgba(0,0,220,1)",
                        pointStrokeColor : "#fff",
                        data : shelterKWH_1y,
                        title : "Electrical Energy Consumption (KWh) - 1 y"
                    }
                ]

            }

            clearChart("building-chart-container", "building-chart", 400, 300, null);
            var myLine_1d = new Chart(document.getElementById("building-chart").getContext("2d")).Bar(lineChartData_1y,opt);
        }
        else{
            loadingIndicator4stats.style.display = "block";
        }
    }

    function RenderShelterTEMPINT_15(sos){
        done("renderizzo 15 TEMP INT: " + (sos.length-1) + " valid observations");

        shelterConsumption_TEMPINT_15 = new Array();
        shelterDate_TEMPINT_15 = new Array();
        shelterCEL_TEMPINT_15 = new Array();

        if(sos.length>2){

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                time = adjustToTimeZone(time);

                shelterConsumption_TEMPINT_15[time] = value;
                shelterDate_TEMPINT_15[i-1] = time;
            }

            for(var i=0;i<shelterDate_TEMPINT_15.length;i++){
                shelterCEL_TEMPINT_15[i] = shelterConsumption_TEMPINT_15[shelterDate_TEMPINT_15[i]];
            }

            for(var i=0;i<shelterDate_TEMPINT_15.length;i++){
                if((i)%4 != 0) shelterDate_TEMPINT_15[i] = "";
            }
        }
        else{
            shelterCEL_TEMPINT_15 = [0];
            shelterDate_TEMPINT_15 = [0];
        }

        if((defined(shelterCEL_TEMPINT_15)) && (defined(shelterSugg_TEMP))){
            DisplayShelterChart();
        }
    }

    function RenderShelterSUGGESTIONS_TEMP(sos){
        done("renderizzo 15 SUGGESTION TEMP: " + (sos.length-1) + " valid observations");


        shelterSuggestion_TEMP = new Array();
        shelterSuggestionDate_TEMP = new Array();
        shelterSugg_TEMP = new Array();

        if(sos.length>2){

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                time = adjustToTimeZone(time);
                time = time.substring(11,16);

                shelterSuggestion_TEMP[time] = value;
                shelterSuggestionDate_TEMP[i-1] = time;
            }

            for(var i=0;i<shelterSuggestionDate_TEMP.length;i++){
                shelterSugg_TEMP[i] = shelterSuggestion_TEMP[shelterSuggestionDate_TEMP[i]];
            }

            for(var i=0;i<shelterSuggestionDate_TEMP.length;i++){
                if((i)%4 != 0) shelterSuggestionDate_TEMP[i] = "";
            }
        }
        else{
            shelterSugg_TEMP = [0];
            shelterSuggestionDate_TEMP = [0];
        }

        if((defined(shelterCEL_TEMPINT_15)) && (defined(shelterSugg_TEMP))){
            DisplayShelterChart();
        }
    }

    function RenderShelterSUGGESTIONS_COOL(sos){
        done("renderizzo 1d COOLING: " + (sos.length-1) + " valid observations");

        if(sos.length==2){
            var observation = sos[1];
            var value = observation.split(",")[1];

            shelterSuggestion_COOL = value;

            document.getElementById("shelter-prediction-cooling").textContent = shelterSuggestion_COOL;
        }
        else{
            document.getElementById("shelter-prediction-cooling").textContent = "0";
        }
    }

    function RenderShelterSUGGESTIONS_HEAT(sos){
        done("renderizzo 1d HEATING: " + (sos.length-1) + " valid observations");

        if(sos.length==2){

            var observation = sos[1];
            var value = observation.split(",")[1];

            shelterSuggestion_HEAT = value;

            document.getElementById("shelter-prediction-heating").textContent = shelterSuggestion_HEAT;
        }
        else{
            document.getElementById("shelter-prediction-heating").textContent = "0";
        }
    }

    function DisplayShelterSETTINGS(updateonly){
        if(defined(buildingUsrID)){
            document.getElementById("shelter-control-repeat-jan").className="calendarbutton";
            document.getElementById("shelter-control-repeat-feb").className="calendarbutton";
            document.getElementById("shelter-control-repeat-mar").className="calendarbutton";
            document.getElementById("shelter-control-repeat-apr").className="calendarbutton";
            document.getElementById("shelter-control-repeat-may").className="calendarbutton";
            document.getElementById("shelter-control-repeat-jun").className="calendarbutton";
            document.getElementById("shelter-control-repeat-jul").className="calendarbutton";
            document.getElementById("shelter-control-repeat-aug").className="calendarbutton";
            document.getElementById("shelter-control-repeat-sep").className="calendarbutton";
            document.getElementById("shelter-control-repeat-oct").className="calendarbutton";
            document.getElementById("shelter-control-repeat-nov").className="calendarbutton";
            document.getElementById("shelter-control-repeat-dec").className="calendarbutton";

            done("chiedo configurazione shelter " + buildingUsrID);
            var cooling = document.getElementById("shelter-prediction-cooling-times");
            var heating = document.getElementById("shelter-prediction-heating-times");
            var years = document.getElementById("shelter-control-repeat-year");

            //document.getElementById("shelter-predict").style.display = "none";
            $("#shelteranalysis-scheduling-table").empty();

            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if(xmlhttp.status == 400){error("SCHEDULING SHELTER ERRORE STATUS 400: " + url);}
                    //console.log(xmlhttp.responseText);
                    if (isValidJSONResponse(xmlhttp)) {

                        var json = JSON.parse(xmlhttp.responseText);
                        var shelter = json.thresholds;

                        var selecteddate = buildingDate_prediction.getFullYear() + "-" + ('0' + (buildingDate_prediction.getMonth()+1)).slice(-2) + "-01";

                        var exists = false;
                        if(defined(shelter)){
                            //console.log(shelter);
                            buildingScheduling_SUGGESTION = new Array();

                            if(defined(shelter.length)){

                                var table = document.getElementById("shelteranalysis-scheduling-table");
                                var row = table.insertRow(0);

                                var startdate = row.insertCell(0);
                                startdate.innerHTML = "MONTH";

                                var from = row.insertCell(1);
                                from.innerHTML = "HEATING THRESHOLD";

                                var to = row.insertCell(2);
                                to.innerHTML = "COOLING THRESHOLD";

                                var orderedConfigs = new Array();
                                for(var i=0;i<shelter.length;i++){
                                    orderedConfigs.push(shelter[i].day);
                                    buildingScheduling_SUGGESTION[shelter[i].day] = shelter[i];
                                }

                                orderedConfigs.sort();

                                var index = 1;
                                for(var i=0;i<orderedConfigs.length;i++){
                                    var day = orderedConfigs[i];
                                    var configuration = buildingScheduling_SUGGESTION[day];

                                    if(selecteddate == day){
                                        done("SCHEDULING PER QUESTO MESE TROVATO " + JSON.stringify(configuration));
                                        if(defined(configuration)){

                                            var month = parseInt(day.split('-')[1]);
                                            var year = parseInt(day.split('-')[0]);

                                            switch (month) {
                                                case 1: document.getElementById("shelter-control-repeat-jan").className="calendarbuttonselected"; break;
                                                case 2: document.getElementById("shelter-control-repeat-feb").className="calendarbuttonselected"; break;
                                                case 3: document.getElementById("shelter-control-repeat-mar").className="calendarbuttonselected"; break;
                                                case 4: document.getElementById("shelter-control-repeat-apr").className="calendarbuttonselected"; break;
                                                case 5: document.getElementById("shelter-control-repeat-may").className="calendarbuttonselected"; break;
                                                case 6: document.getElementById("shelter-control-repeat-jun").className="calendarbuttonselected"; break;
                                                case 7: document.getElementById("shelter-control-repeat-jul").className="calendarbuttonselected"; break;
                                                case 8: document.getElementById("shelter-control-repeat-aug").className="calendarbuttonselected"; break;
                                                case 9: document.getElementById("shelter-control-repeat-sep").className="calendarbuttonselected"; break;
                                                case 10: document.getElementById("shelter-control-repeat-oct").className="calendarbuttonselected"; break;
                                                case 11: document.getElementById("shelter-control-repeat-nov").className="calendarbuttonselected"; break;
                                                case 12: document.getElementById("shelter-control-repeat-dec").className="calendarbuttonselected"; break;
                                                default: break;
                                            };

                                            var options = years.options;
                                            for (var j = 0; j < options.length; j++) {
                                                var value = options[j].value;
                                                if(value == year) {options[j].selected = true;break;}
                                            }

                                            var options = cooling.options;
                                            for (var j = 0; j < options.length; j++) {
                                                var value = options[j].value;
                                                if(value == configuration.coldthreshold) {options[j].selected = true;break;}
                                            }

                                            var options = heating.options;
                                            for (var j = 0; j < options.length; j++) {
                                                var value = options[j].value;
                                                if(value == configuration.warmthreshold) {options[j].selected = true;break;}
                                            }

                                            exists = true;
                                        }
                                    }

                                    if(day>=selecteddate && index<=12){
                                        if(defined(configuration)){
                                            var row = table.insertRow(index);

                                            var startdate = row.insertCell(0);
                                            startdate.innerHTML = day.substring(0,day.length-3);

                                            var from = row.insertCell(1);
                                            from.innerHTML = configuration.warmthreshold;

                                            var to = row.insertCell(2);
                                            to.innerHTML = configuration.coldthreshold;

                                            index++;
                                        }
                                    }
                                }

                                if(!exists){
                                    heating.options[0].selected = true;
                                    cooling.options[0].selected = true;
                                }
                            }
                            else{
                                error("NIENTE SCHEDULING PER QUESTO SHELTER");
                                var table = document.getElementById("buildinganalysis-scheduling-table");
                                var row = table.insertRow(0);
                                var cell1 = row.insertCell(0);
                                cell1.style.textAlign = "center";
                                cell1.innerHTML = "No schedulings available for this shelter";
                            }
                        }
                    }
                    else{
                        error("NIENTE SCHEDULING PER QUESTO SHELTER");
                        var table = document.getElementById("buildinganalysis-scheduling-table");
                        var row = table.insertRow(0);
                        var cell1 = row.insertCell(0);
                        cell1.style.textAlign = "center";
                        cell1.innerHTML = "No schedulings available for this shelter";
                    }

                    document.getElementById("building-predict").style.display = "table-caption";
                    if(!defined(updateonly))initSheltersForSuggestion();
                }
            }

            var url = "./php/proxySUGGESTION_SHELTERS.php?url=__SCENARIOCODE__&foiuri=__FOIURI__&key=" + key;
            var foiuri = "http://www.sunshineproject.eu/swe/featureOfInterest/TRN/shelter/" + buildingUsrID;

            url = url.replace("__SCENARIOCODE__",suggestionAPICode[pilotCode]);
            url = url.replace("__FOIURI__",foiuri);

            // Send the POST request
            xmlhttp.open('GET', url, true);
            xmlhttp.send();
        }
    }

    function RenderShelterSTAT_CUMULATVE(shelters){
        done("renderizzo status shelter");
        var container1 = document.getElementById("shelter-list");
        var container2 = document.getElementById("shelter-list2");
        var container3 = document.getElementById("shelter-list3");
        var container4 = document.getElementById("shelter-list4");
        var container5 = document.getElementById("shelter-list5");
        var container6 = document.getElementById("shelter-list6");
        var container7 = document.getElementById("shelter-list7");
        var container8 = document.getElementById("shelter-list8");
        var container9 = document.getElementById("shelter-list9");

        if(shelters.length>0){
            var index = 0;
            for(var i=0;i<shelters.length;i++){
                var observation = shelters[i];

                var element = document.createElement('li');
                element.style.paddingBottom = "5px";

                var status = document.createElement('div');
                status.className = "lampptions";

                if(observation.S_CCLD<0 || observation.S_CWRM<0  || observation.warmthreshold<0  || observation.coldthreshold<0){
                    status.style.borderColor = "#565451";
                }
                else{
                    if((observation.S_CCLD>observation.coldthreshold) || (observation.S_CWRM>observation.warmthreshold)) status.style.borderColor = "#DC0000";
                }

                element.appendChild(status);

                var link = document.createElement('a');
                link.id = "shelter-status-" + observation.name;
                link.name = pilotName + "|" + observation.name + "|shelter|" + observation.id + "|" + observation.foiid + "|" + observation.isinvolved;
                link.textContent = observation.name;
                link.href = "#";
                link.className = "lampelement";
                link.onclick = function(){new Scenario2().DisplayBuildingDetails(this.name)}
                element.appendChild(link);

                if(($(link.id).length)==0){
                    if(index%9==0) container1.appendChild(element);
                    else if(index%9==1) container2.appendChild(element);
                    else if(index%9==2) container3.appendChild(element);
                    else if(index%9==3) container4.appendChild(element);
                    else if(index%9==4) container5.appendChild(element);
                    else if(index%9==5) container6.appendChild(element);
                    else if(index%9==6) container7.appendChild(element);
                    else if(index%9==7) container8.appendChild(element);
                    else if(index%9==8) container9.appendChild(element);
                    index++;
                }
            }
            document.getElementById("shelter-status-table").style.display = "block";
        }
        else{
            document.getElementById("shelter-status").style.display = "none";
            error("SHELTER STATS CUMULATIVE TIMEOUT");
        }
    }

    function RenderWeatherTEMP(sos){
        done("renderizzo 1d TEMP: " + (sos.length-1) + " valid observations");

        weatherConsumption_TEMP = new Array();
        weatherDate_TEMP = new Array();
        weatherCEL_TEMP = new Array();

        if(sos.length>2){

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                time = adjustToTimeZone(time);

                weatherConsumption_TEMP[time] = value;
                weatherDate_TEMP[i-1] = time;
            }

            for(var i=0;i<weatherDate_TEMP.length;i++){
                weatherCEL_TEMP[i] = weatherConsumption_TEMP[weatherDate_TEMP[i]];
            }
        }
        else{
            weatherCEL_TEMP = [0];
            weatherDate_TEMP = [0];
        }

        if((defined(weatherCEL_TEMP)) && (defined(weatherWM2_IRR)) && (defined(weatherKMH_WIND))){
            DisplayWeatherChart();
        }
    }

    function RenderWeatherIRRA(sos){
        done("renderizzo 1d IRRA: " + (sos.length-1) + " valid observations");

        weatherConsumption_IRR = new Array();
        weatherDate_IRR = new Array();
        weatherWM2_IRR = new Array();

        if(sos.length>2){
            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                time = adjustToTimeZone(time);

                weatherConsumption_IRR[time] = value;
                weatherDate_IRR[i-1] = time;
            }

            for(var i=0;i<weatherDate_IRR.length;i++){
                weatherWM2_IRR[i] = weatherConsumption_IRR[weatherDate_IRR[i]];
            }
        }
        else{
            weatherWM2_IRR = [0];
            weatherDate_IRR = [0];
        }

        if((defined(weatherCEL_TEMP)) && (defined(weatherWM2_IRR)) && (defined(weatherKMH_WIND))){
            DisplayWeatherChart();
        }
    }

    function RenderWeatherWIND(sos){
        done("renderizzo 1d WIND: " + (sos.length-1) + " valid observations");

        weatherConsumption_WIND = new Array();
        weatherDate_WIND = new Array();
        weatherKMH_WIND = new Array();

        if(sos.length>2){

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                time = adjustToTimeZone(time);

                weatherConsumption_WIND[time] = value;
                weatherDate_WIND[i-1] = time;
            }

            for(var i=0;i<weatherDate_WIND.length;i++){
                weatherKMH_WIND[i] = weatherConsumption_WIND[weatherDate_WIND[i]];
            }
        }
        else{
            weatherKMH_WIND = [0];
            weatherDate_WIND = [0];
        }

        if((defined(weatherCEL_TEMP)) && (defined(weatherWM2_IRR)) && (defined(weatherKMH_WIND))){
            DisplayWeatherChart();
        }
    }

    function RenderWeatherForecastTEMP(sos){
        done("renderizzo 1d FORECAST TEMP: " + (sos.length-1) + " valid observations");

        weatherForecastConsumption_TEMP = new Array();
        weatherForecastDate_TEMP = new Array();
        weatherForecastCEL_TEMP = new Array();

        if(sos.length>2){
            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                time = adjustToTimeZone(time);

                weatherForecastConsumption_TEMP[time] = value;
                weatherForecastDate_TEMP[i-1] = time;
            }

            for(var i=0;i<weatherForecastDate_TEMP.length;i++){
                weatherForecastCEL_TEMP[i] = weatherForecastConsumption_TEMP[weatherForecastDate_TEMP[i]];
            }
        }
        else{
            weatherForecastCEL_TEMP = [0];
            weatherForecastDate_TEMP = [0];
        }

        if((defined(weatherForecastCEL_TEMP)) && (defined(weatherForecastWM2_IRR)) && (defined(weatherForecastKMH_WIND))){
            DisplayWeatherForecastChart();
        }
    }

    function RenderWeatherForecastIRRA(sos){
        done("renderizzo 1d FORECAST IRRA: " + (sos.length-1) + " valid observations");

        weatherForecastConsumption_IRR = new Array();
        weatherForecastDate_IRR = new Array();
        weatherForecastWM2_IRR = new Array();

        if(sos.length>2){

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                time = adjustToTimeZone(time);

                weatherForecastConsumption_IRR[time] = value;
                weatherForecastDate_IRR[i-1] = time;
            }

            for(var i=0;i<weatherForecastDate_IRR.length;i++){
                weatherForecastWM2_IRR[i] = weatherForecastConsumption_IRR[weatherForecastDate_IRR[i]];
            }
        }
        else{
            weatherForecastWM2_IRR = [0];
            weatherForecastDate_IRR = [0];
        }

        if((defined(weatherForecastCEL_TEMP)) && (defined(weatherForecastWM2_IRR)) && (defined(weatherForecastKMH_WIND))){
            DisplayWeatherForecastChart();
        }
    }

    function RenderWeatherForecastWIND(sos){
        done("renderizzo 1d FORECAST WIND: " + (sos.length-1) + " valid observations");

        weatherForecastConsumption_WIND = new Array();
        weatherForecastDate_WIND = new Array();
        weatherForecastKMH_WIND = new Array();

        if(sos.length>2){

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                time = adjustToTimeZone(time);

                weatherForecastConsumption_WIND[time] = value;
                weatherForecastDate_WIND[i-1] = time;
            }

            for(var i=0;i<weatherForecastDate_WIND.length;i++){
                weatherForecastKMH_WIND[i] = weatherForecastConsumption_WIND[weatherForecastDate_WIND[i]];
            }
        }
        else{
            weatherForecastKMH_WIND = [0];
            weatherForecastDate_WIND = [0];
        }

        if((defined(weatherForecastCEL_TEMP)) && (defined(weatherForecastWM2_IRR)) && (defined(weatherForecastKMH_WIND))){
            DisplayWeatherForecastChart();
        }
    }

    function manageBuildingPrediction(){

        if(defined(buildingId_SUGGESTION)){
            done("SET BUILDING PREDICTION " + buildingId_SUGGESTION);
            var temperature = document.getElementById("building-prediction-comfort-temp").value;
            var h_start = document.getElementById("building-prediction-start").value.split(":")[0];
            var m_start = document.getElementById("building-prediction-start").value.split(":")[1];
            var h_end = document.getElementById("building-prediction-end").value.split(":")[0];
            var m_end = document.getElementById("building-prediction-end").value.split(":")[1];
            var daybelow = document.getElementById("building-prediction-start-day").value.replace(/\//g,"-").trim();
            var dayupper = document.getElementById("building-prediction-end-day").value.replace(/\//g,"-").trim();

            if(daybelow<=dayupper){
                for(var date= new Date(daybelow);date <= new Date(dayupper);date.setDate(date.getDate() + 1)){
                    var datestring = date.getFullYear() + "-" + ('0' + (date.getMonth()+1)).slice(-2) + "-" + ('0' + (date.getDate())).slice(-2);

                    if(!defined(buildingScheduling_SUGGESTION[datestring])){
                        var xmlhttp = new XMLHttpRequest();

                        xmlhttp.onreadystatechange = function () {
                            if (xmlhttp.readyState == 4) {
                                if (xmlhttp.status == 200 && defined(xmlhttp.responseText)) {
                                    console.log("POST--> " + xmlhttp.responseText);
                                }
                            }
                        }

                        var body = '{"T":__TEMP__,"INT":[{"from_hh":__FROM_HH__, "from_mm":__FROM_MM__, "to_hh":__TO_HH__, "to_mm":__TO_MM__},{}]}';
                        var url = "url=__SCENARIOCODE__&buildingid=__BUILDINGID__&daybelow=__DAYBELOW__&dayupper=__DAYUPPER__&body=" + body + "&key=" + key ;

                        url = url.replace("__SCENARIOCODE__",suggestionAPICode[pilotCode]);
                        url = url.replace("__BUILDINGID__",buildingId_SUGGESTION);
                        url = url.replace("__DAYBELOW__",datestring);
                        url = url.replace("__DAYUPPER__",datestring);
                        url = url.replace("__TEMP__",temperature);
                        url = url.replace("__FROM_HH__",h_start);
                        url = url.replace("__FROM_MM__",m_start);
                        url = url.replace("__TO_HH__",h_end);
                        url = url.replace("__TO_MM__",m_end);

                        //console.log(url);

                        // Send the POST request
                        xmlhttp.open('POST', './php/proxySUGGESTION_BUILDINGS.php', false);
                        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                        xmlhttp.send(url);
                    }
                    else{
                        var id = buildingScheduling_SUGGESTION[datestring].id;

                        var xmlhttp = new XMLHttpRequest();

                        xmlhttp.onreadystatechange = function () {
                            if (xmlhttp.readyState == 4) {

                                if (xmlhttp.status == 200 && defined(xmlhttp.responseText)) {
                                    console.log("PUT--> " + xmlhttp.responseText);
                                }
                            }
                        }

                        var body = '{"T":__TEMP__,"INT":[{"from_hh":__FROM_HH__, "from_mm":__FROM_MM__, "to_hh":__TO_HH__, "to_mm":__TO_MM__},{}]}';
                        var url = "url=__SCENARIOCODE__&commandid=__COMMANDID__&body=" + body + "&key=" + key ;

                        url = url.replace("__SCENARIOCODE__",suggestionAPICode[pilotCode]);
                        url = url.replace("__COMMANDID__",id);
                        url = url.replace("__TEMP__",temperature);
                        url = url.replace("__FROM_HH__",h_start);
                        url = url.replace("__FROM_MM__",m_start);
                        url = url.replace("__TO_HH__",h_end);
                        url = url.replace("__TO_MM__",m_end);

                        // Send the POST request
                        xmlhttp.open('PUT', './php/proxySUGGESTION_BUILDINGS.php', false);
                        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                        xmlhttp.send(url);
                    }
                }
            }
        }
        else
            error("BUILDING ID NOT DEFINED");

        DisplayBuildingSETTINGS(true);
    }

    function manageShelterPrediction(){

        if(defined(buildingUsrID)){
            done("SET BUILDING PREDICTION " + buildingUsrID);
            var cooling = document.getElementById("shelter-prediction-cooling-times").value;
            var heating = document.getElementById("shelter-prediction-heating-times").value;
            var year = document.getElementById("shelter-control-repeat-year").value;

            var jan = document.getElementById("shelter-control-repeat-jan").className;
            var feb = document.getElementById("shelter-control-repeat-feb").className;
            var mar = document.getElementById("shelter-control-repeat-mar").className;
            var apr = document.getElementById("shelter-control-repeat-apr").className;
            var may = document.getElementById("shelter-control-repeat-may").className;
            var jun = document.getElementById("shelter-control-repeat-jun").className;
            var jul = document.getElementById("shelter-control-repeat-jul").className;
            var aug = document.getElementById("shelter-control-repeat-aug").className;
            var sep = document.getElementById("shelter-control-repeat-sep").className;
            var oct = document.getElementById("shelter-control-repeat-oct").className;
            var nov = document.getElementById("shelter-control-repeat-nov").className;
            var dec = document.getElementById("shelter-control-repeat-dec").className;

            var months = new Array();

            if (jan == "calendarbutton") months[1] = false;else months[1] = true;
            if (feb == "calendarbutton") months[2] = false;else months[2] = true;
            if (mar == "calendarbutton") months[3] = false;else months[3] = true;
            if (apr == "calendarbutton") months[4] = false;else months[4] = true;
            if (may == "calendarbutton") months[5] = false;else months[5] = true;
            if (jun == "calendarbutton") months[6] = false;else months[6] = true;
            if (jul == "calendarbutton") months[7] = false;else months[7] = true;
            if (aug == "calendarbutton") months[8] = false;else months[8] = true;
            if (sep == "calendarbutton") months[9] = false;else months[9] = true;
            if (oct == "calendarbutton") months[10] = false;else months[10] = true;
            if (nov == "calendarbutton") months[11] = false;else months[11] = true;
            if (dec == "calendarbutton") months[12] = false;else months[12] = true;

            for(var i=1;i<months.length;i++){
                if(months[i]){
                    var month = i;
                    if(i<10) month = "0" + i;
                    var datestring = year + "-" + month + "-01";

                    if(defined(buildingScheduling_SUGGESTION[datestring])){

                        var xmlhttp = new XMLHttpRequest();

                        xmlhttp.onreadystatechange = function () {
                            if (xmlhttp.readyState == 4) {
                                console.log(xmlhttp.responseText);
                                if (xmlhttp.status == 200 && defined(xmlhttp.responseText)) {
                                    console.log("PUT--> " + xmlhttp.responseText);
                                }
                            }
                        }

                        var foiuri = "http://www.sunshineproject.eu/swe/featureOfInterest/TRN/shelter/" + buildingUsrID;
                        var url = "url=__SCENARIOCODE__&foiuri=__FOIURI__&date=__DATE__&hot=__HOT__&cold=__COLD__&key=" + key ;

                        url = url.replace("__SCENARIOCODE__",suggestionAPICode[pilotCode]);
                        url = url.replace("__FOIURI__",foiuri);
                        url = url.replace("__DATE__",datestring);
                        url = url.replace("__HOT__",heating);
                        url = url.replace("__COLD__",cooling);

                        // Send the POST request
                        xmlhttp.open('PUT', './php/proxySUGGESTION_SHELTERS.php', false);
                        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                        xmlhttp.send(url);
                    }
                }
            }
        }
        else
            error("BUILDING ID NOT DEFINED");

        DisplayShelterSETTINGS(true);
    }

    function DisplayWeatherChart(){
        loadingIndicator.className="fullScreenLoaderHidden";

        var labels;
        var maxElement = Math.max((weatherDate_TEMP.length),(weatherDate_WIND.length),(weatherDate_IRR.length));
        if(weatherDate_TEMP.length == maxElement) labels = weatherDate_TEMP;
        else if(weatherDate_WIND.length == maxElement) labels = weatherDate_WIND;
        else if(weatherDate_IRR.length == maxElement) labels = weatherDate_IRR;

        if(maxElement>1){
            var datasets = new Array();
            if(max(weatherCEL_TEMP) != 0) datasets.push({strokeColor : "rgba(220,0,0,1)",pointColor : "rgba(220,0,0,1)",pointStrokeColor : "#fff",data : weatherCEL_TEMP,title: "Temperature (°C)",axis : 1});
            if(max(weatherKMH_WIND) != 0) datasets.push({strokeColor : "rgba(0,220,0,1)",pointColor : "rgba(0,220,0,1)",pointStrokeColor : "#fff",data : weatherKMH_WIND,title: "Wind (Km/h)",axis : 1});
            if(max(weatherWM2_IRR) != 0) datasets.push({strokeColor : "rgba(209,209,224,1)",pointColor : "rgba(209,209,224,1)",pointStrokeColor : "#fff",data : weatherWM2_IRR,title: "Irradiance (W/M2)",axis : 2});

            if(datasets.length>0){
                done("renderizzo WEATHER prediction graph");
                var ChartData = {labels : labels,datasets : datasets};

                clearChart("weather-chart-fullscreen-container", "weather-chart-fullscreen", 1180, 260, null);
                var myLine = new Chart(document.getElementById("weather-chart-fullscreen").getContext("2d")).Line(ChartData,optNOTFILLDoubleY4Weather);
            }
            else {
                error("Grafico double Y WEATHER con dati tutti a 0");
                clearChart("weather-chart-fullscreen-container", "weather-chart-fullscreen", 1180, 260, "1h");
            }
        }
        else clearChart("weather-chart-fullscreen-container", "weather-chart-fullscreen", 1180, 260, "1h");
    }

    function DisplayWeatherForecastChart(){
        var labels;
        var maxElement = Math.max((weatherForecastDate_TEMP.length),(weatherForecastDate_WIND.length),(weatherForecastDate_IRR.length));
        if(maxElement>1){
            if(weatherForecastDate_TEMP.length == maxElement) labels = weatherForecastDate_TEMP;
            else if(weatherForecastDate_WIND.length == maxElement) labels = weatherForecastDate_WIND;
            else if(weatherForecastDate_IRR.length == maxElement) labels = weatherForecastDate_IRR;

            var datasets = new Array();
            if(max(weatherForecastCEL_TEMP) != 0) datasets.push({strokeColor : "rgba(139,0,139,1)",pointColor : "rgba(139,0,139,1)",pointStrokeColor : "#fff",data : weatherForecastCEL_TEMP,title: "Temperature (°C)",axis : 1});
            if(max(weatherForecastKMH_WIND) != 0) datasets.push({strokeColor : "rgba(0,0,220,1)",pointColor : "rgba(0,0,220,1)",pointStrokeColor : "#fff",data : weatherForecastKMH_WIND,title: "Wind (Km/h)",axis : 1});
            if(max(weatherForecastWM2_IRR) != 0) datasets.push({strokeColor : "rgba(220,220,0,1)",pointColor : "rgba(220,220,0,1)",pointStrokeColor : "#fff",data : weatherForecastWM2_IRR,title: "Irradiance (W/M2)",axis : 2});

            if(datasets.length>0){
                done("renderizzo WEATHER FORECAST prediction graph");
                var ChartData = {labels : labels,datasets : datasets};

                clearChart("weather-forecast-chart-fullscreen-container", "weather-forecast-chart-fullscreen", 1180, 260, null);
                var myLine = new Chart(document.getElementById("weather-forecast-chart-fullscreen").getContext("2d")).Line(ChartData,optNOTFILLDoubleY4Weather);
            }
            else {
                error("Grafico double Y FORECAST con dati tutti a 0");
                clearChart("weather-forecast-chart-fullscreen-container", "weather-forecast-chart-fullscreen", 1180, 260, "1d");
            }
        }
        else clearChart("weather-forecast-chart-fullscreen-container", "weather-forecast-chart-fullscreen", 1180, 260, "1d");
    }

    function DisplayShelterChart(){
        loadingIndicator.className="fullScreenLoaderHidden";


        var labels;
        var maxElement = Math.max((shelterDate_TEMPINT_15.length),(shelterSuggestionDate_TEMP.length));
        if(shelterDate_TEMPINT_15.length == maxElement) labels = shelterDate_TEMPINT_15;
        else if(shelterSuggestionDate_TEMP.length == maxElement) labels = shelterSuggestionDate_TEMP;

        if(maxElement>1){
            var shelterSugg_LIMITUP = new Array();
            var shelterSugg_LIMITDOWN = new Array();

            for(var i=0;i<maxElement;i++){
                shelterSugg_LIMITDOWN.push(5);
                shelterSugg_LIMITUP.push(27);
            }

            for(var i=0;i<labels.length;i++){
                labels[i] = labels[i].substring(11,16);
            }

            var datasets = new Array();
            if(max(shelterCEL_TEMPINT_15) != 0) datasets.push({strokeColor : "rgba(0,220,0,1)",pointDotRadius : 0,data : shelterCEL_TEMPINT_15,title: "Real Internal Temperature (°C) - 15 min"});
            if(max(shelterSugg_TEMP) != 0) datasets.push({strokeColor : "rgba(220,220,0,1)",pointDotRadius : 0,data : shelterSugg_TEMP,title: "Estimated Internal Temperature (°C) - 15 min"});
            datasets.push({strokeColor : "rgba(0,0,220,1)",pointDotRadius : 0,data : shelterSugg_LIMITDOWN,title: "Heating Start Limit (°C)"});
            datasets.push({strokeColor : "rgba(220,0,0,1)",pointDotRadius : 0,data : shelterSugg_LIMITUP,title: "Cooling Start Limit (°C)"});

            if(datasets.length>0){
                done("renderizzo SHELTER prediction graph");
                var ChartData = {labels : labels,datasets : datasets};

                clearChart("shelter-chart-prediction-container", "shelter-chart-prediction", 900, 200, null);
                var myLine = new Chart(document.getElementById("shelter-chart-prediction").getContext("2d")).Line(ChartData,optNOTFILL4Temp);
            }
            else {
                error("Grafico double Y SHELTER con dati tutti a 0");
                clearChart("shelter-chart-prediction-container", "shelter-chart-prediction", 900, 200, "mini");
            }
        }
        else clearChart("shelter-chart-prediction-container", "shelter-chart-prediction", 900, 200, "mini");
    }

    function defined(param){
        if(param == undefined || param == "" || param == null || param == "null") return false;
        return true;
    }

    function max(array) {
        var max = array[0];
        var len = array.length;
        for (var i = 1; i < len; i++) if (array[i] > max) max = array[i];
        return max;
    }

    function lastSundayOfEachMonths(year) {
        summertime_start = undefined;
        summertime_end = undefined;
        var lastDay = [31,28,31,30,31,30,31,31,30,31,30,31];
        var march = 3 -1;
        var october = 10 -1;

        if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) lastDay[2] = 29

        for (var date = new Date(), month=0; month<12; month+=1) {
            date.setFullYear(year, month, lastDay[month]);
            date.setDate(date.getDate()-date.getDay());
            //var sunday = date.toString().substring(0,10);

            if(month == march) summertime_start = new Date(date).toISOString().substring(0,10);
            if(month == october) summertime_end = new Date(date).toISOString().substring(0,10);

        }
    }

    function adjustToTimeZone(time){
        time = time.replace(/-/g, '/');
        var day = time.substring(0,10);
        var date = new Date(time);

        if(day > summertime_start && day < summertime_end){
            date.setHours(date.getHours() + pilot2timezone[pilotCode] + 1);
        }
        else{
            date.setHours(date.getHours() + pilot2timezone[pilotCode]);
        }
        time = date.getFullYear() + "-" + ('0' + (date.getMonth()+1)).slice(-2) + "-" + ('0' + (date.getDate())).slice(-2) + " " + ('0' + (date.getHours())).slice(-2) + ":" + ('0' + (date.getMinutes())).slice(-2);

        return time;
    }

    function adjustToTimeZone4SOS(date){
        var day = date.toISOString().substring(0,10);
        var newdate = new Date(date);

        if(day > summertime_start && day < summertime_end){
            newdate.setHours(newdate.getHours() - pilot2timezone[pilotCode] - 1);
        }
        else{
            newdate.setHours(newdate.getHours() - pilot2timezone[pilotCode]);
        }

        return newdate;
    }

    function clearChart(container, id, width, height, timeslot){
        var container = document.getElementById(container);
        var c=document.getElementById(id);

        container.removeChild(c);

        if(defined(timeslot)){
            var img = document.createElement('img');
            img.id     = id;
            img.width  = width;
            img.height = height;
            img.style.borderRadius = "inherit";

            if(timeslot == "mini")img.src = "img/network/no_mini.png";
            if(timeslot == "10")img.src = "img/network/no_15.png";
            if(timeslot == "15")img.src = "img/network/no_15.png";
            if(timeslot == "1h")img.src = "img/network/no_1h.png";
            if(timeslot == "1d")img.src = "img/network/no_1d.png";

            container.appendChild(img);
        }
        else{
            var canvas = document.createElement('canvas');
            canvas.id     = id;
            canvas.width  = width;
            canvas.height = height;
            container.appendChild(canvas);
        }
    }

    function initDumpForm(what,codespaceID){

        var xmlhttp2 = new XMLHttpRequest();

        xmlhttp2.onreadystatechange = function () {
            if (xmlhttp2.readyState == 4) {
                if (isValidJSONResponse(xmlhttp2)) {
                    var buildingJSON = JSON.parse(xmlhttp2.responseText);

                    if(defined(buildingJSON)){
                        if(buildingJSON.totalFeatures>0){
                            var selectionfid = document.getElementById("building-dump-element");

                            for(var i=0;i<buildingJSON.totalFeatures;i++){
                                var fid = buildingJSON.features[i].properties.procedureidentifier;
                                var usrid = buildingJSON.features[i].properties.name;
                                var identifier = buildingJSON.features[i].properties.identifier;

                                if (identifier.indexOf("/weatherstation/")>0) {
                                    usrid = "W.S. " + usrid;
                                    fid = fid.replace("-F","-M");
                                }
                                else{
                                    fid = fid.replace("-T","-0");
                                    fid = fid.replace("-S","-0");
                                }

                                var exists = false;
                                for(var j=0;j<selectionfid.length;j++){
                                    var value = selectionfid[j].textContent;
                                    if(value == usrid){exists = true;break;}
                                }

                                if(!exists){
                                    var option = document.createElement("option");
                                    option.textContent = usrid;
                                    option.value = fid;
                                    selectionfid.add(option);
                                }
                            }
                        }
                    }
                }
            }
        }

        var elementsDetailsURL = "http://sunshine.sinergis.it/geoserver/sunshine/ows?service=WFS&version=2.0&request=GetFeature&typeName=sunshine:featureofinterest&outputFormat=application/json&CQL_Filter=(codespaceid%3D__BUILDINGCODESPACE__%20)and(%20identifier%20LIKE%20%27%25__WHAT__%25%27)";

        elementsDetailsURL = elementsDetailsURL.replace("__WHAT__",what);
        elementsDetailsURL = elementsDetailsURL.replace("__BUILDINGCODESPACE__",codespaceID);

        // Send the POST request
        xmlhttp2.open('GET', elementsDetailsURL, true);
        xmlhttp2.setRequestHeader('Content-Type', 'application/json');
        xmlhttp2.setRequestHeader('Accept', 'application/json');
        xmlhttp2.send();
    }

    function isJson(str) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    function isValidJSONResponse(xmlhttp){
        if (xmlhttp.status == 200 && defined(xmlhttp.responseText) && isJson(xmlhttp.responseText)) return true
        return false;
    }

    function isXML(str) {
        try {
            var parser=new DOMParser();
            var xml=parser.parseFromString(str,"text/xml");
        } catch (e) {
            return false;
        }
        return true;
    }

    function isValidXMLResponse(xmlhttp){
        if (xmlhttp.status == 200 && defined(xmlhttp.responseText) && isXML(xmlhttp.responseText)) return true
        return false;
    }

    function hideBuildingGraph(){
        document.body.style.cursor = 'default';
        document.getElementById("fullScreenBUILDINGGraph").className = "fullScreenGraphHidden";

        buildingID = undefined;
        buildingCode = undefined;
        buildingUsrID = undefined;
        buildingFoiid_SUGGESTION = undefined;
        buildingId_SUGGESTION = undefined;
        buildingScheduling_SUGGESTION = undefined;
        building_HasSUGGESTION = undefined;
    }

    function hideWeatherGraph(){
        document.body.style.cursor = 'default';
        document.getElementById("fullScreenWEATHERGraph").className = "fullScreenGraphHidden";

        buildingID = undefined;
        buildingCode = undefined;
        buildingUsrID = undefined;
        buildingFoiid_SUGGESTION = undefined;
        buildingId_SUGGESTION = undefined;
        buildingScheduling_SUGGESTION = undefined;
        building_HasSUGGESTION = undefined;
    }

    function hideShelterGraph(){
        document.body.style.cursor = 'default';
        document.getElementById("fullScreenSHELTERGraph").className = "fullScreenGraphHidden";

        buildingID = undefined;
        buildingCode = undefined;
        buildingUsrID = undefined;
        buildingFoiid_SUGGESTION = undefined;
        buildingId_SUGGESTION = undefined;
        buildingScheduling_SUGGESTION = undefined;
        building_HasSUGGESTION = undefined;
    }

    function error(msg) {
        console.log("%c" + msg, "color:red;font-weight:bold;");
    }

    function done(msg) {
        console.log("%c" + msg, "color:green;font-weight:bold;");
    }

    function call(msg) {
        console.log("%c" + msg, "color:purple;font-weight:bold;font-size:10px;");
    }

    Date.prototype.yyyy_mm_ddThh_min_sec = function() {
        var yyyy = this.getFullYear().toString();
        var mm = ('0' + (this.getMonth()+1)).slice(-2);
        var dd  = ('0' + (this.getDate())).slice(-2);
        var hh  = ('0' + (this.getHours())).slice(-2);
        var min  = ('0' + (this.getMinutes())).slice(-2);
        var sec  = "59";
        return yyyy + "-" + mm + "-" + dd + "T" + hh + ":" + min + ":" + sec;
    };
}
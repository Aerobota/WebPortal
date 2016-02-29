/**
 * Created by u.di.staso on 30/01/15.
 */

window.Scenario3 = function(){

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

    var optFILL = {
        graphMin :0,
        //inGraphDataShow : true,
        annotateDisplay : true,
        scaleFontSize : 10,
        legend : true,
        legendBorders:false,
        showSingleLegend: true,
        annotateLabel : "<%=v3%>"
    }

    var optNOTFILLDoubleY = {
        graphMin :0,
        datasetFill: false ,
        inGraphDataShow : true,
        //inGraphDataFontSize : 10,
        annotateDisplay : true,
        scaleFontSize : 10,
        pointDotStrokeWidth : 2,
        pointDotRadius : 5,
        pointDot : true,
        legend : true,
        legendBorders:false,
        yAxisRight : true,
        graphMin2 : 0,
        //graphMax2 : 1,
        showSingleLegend: true,
        annotateLabel : "<%=v3%>"
    }

    var loadingIndicator = document.getElementById('fullScreenLoader');
    var loadingIndicator4stats = document.getElementById('loadingIndicator4SHELTERstats');

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

    groupID = undefined;
    groupIdentifier = undefined;
    var groupElements;
    var groupUsrID;

    var networkID;
    var networkCode;
    var networkUsrID;

    var networkSOAPCallELE = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/ELER","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var networkSOAPCallELEA = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/ELEA","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var networkSOAPCallDIMM = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/DIMM","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var networkSOAPCallIPOW = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/IPOW","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var networkSOAPCallIVOL = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/IVOL","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var networkSOAPCallICUR = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/ICUR","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var networkSOAPCallICOSF = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/COSF","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var networkSOAPCallISUNS = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/SUNS","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var networkSOAPCallISUNR = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/SUNR","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var networkSOAPCallILIFE = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/LIFE","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var networkSOAPCallINOK = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/N-OK","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var networkSOAPCallINALL = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/NALL","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var networkSOAPCallONOF = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/ONOF","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var networkSOAPCallSTAT = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/STAT","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var networkSOAPCallIRRA = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/IRRA","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var networkSOAPCallWIND = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/WIND","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';
    var networkSOAPCallTEMP = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/TEMP","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';

    var sensorDescription;

    var networkConsumption_15;
    var networkDate_15;
    var networkKWH_15;

    var networkConsumption_1h;
    var networkDate_1h;
    var networkKWH_1h;

    var networkConsumption_1d;
    var networkDate_1d;
    var networkKWH_1d;

    var networkConsumption_1y;
    var networkDate_1y;
    var networkKWH_1y;

    var networkConsumption_1yComparison;
    var networkDate_1yComparison;
    var networkKWH_1yComparison;

    var networkConsumption_IPOW;
    var networkDate_IPOW;
    var networkKWH_IPOW;

    var networkSUNS_HMS;
    var networkSUNR_HMS;
    var networkLIFE_HRS;
    var networkNOK_NUM;
    var networkNALL_NUM;
    var networkONOF_BOO;

    var lampConsumption_DIMM;
    var lampDate_DIMM;
    var lampPERC_DIMM;

    var lampConsumption_IPOW;
    var lampDate_IPOW;
    var lampWAT_IPOW;

    var lampConsumption_IVOL;
    var lampDate_IVOL;
    var lampVOL_IVOL;

    var lampConsumption_ICUR;
    var lampDate_ICUR;
    var lampAMP_ICUR;

    var lampConsumption_COSF;
    var lampDate_COSF;
    var lampNUL_COSF;

    var lampSTAT_NUL;
    var lampLIFE_HRS;

    var groupsAPICode = new Array();
    groupsAPICode[2] = "ROV";
    groupsAPICode[3] = "RVB";
    groupsAPICode[4] = "FER";
    groupsAPICode[5] = "BAS";
    groupsAPICode[6] = "LAM";
    groupsAPICode[7] = "PAO";
    groupsAPICode[8] = "TRN";
    groupsAPICode[9] = "VDN";
    groupsAPICode[10] = "HRV";

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

    networkDate = undefined;
    summertime_start = undefined;
    summertime_end = undefined;

    pilotCode = undefined;
    pilotName = undefined;
    role = undefined;
    key = undefined;

    controlIDs = new Array();

    statsWorkerScenario3 = new Worker('workers/statsWorker.js');
    sosWorkerScenario3 = new Worker('workers/sosWorker.js');
    spsWorkerScenario3 = new Worker('workers/spsWorker.js');

    var groupElementsDevicesURL = "__GROUPCODE__/devices";
    var groupElementsGroupsURL = "__GROUPCODE__/groups";
    var groupElementsTasksURL = "__GROUPCODE__/tasks";

    var groupElementsNewURL = '{"group":{"sps_id":"__SPSID__","usr_id":"__USERID__", "codespace":"__GROUPCODE__","type":"V","type_of_lamp":"led","nominalpower":0.0,"height":0.0,"connect":false,"valid":false},"deviceids":[__DEVICEIDLIST__]}';

    $(document).ready(function() {
        $('#network-chart-container, #lamp-chart-fullscreen-container, #network-chart-fullscreen_15, #network-chart-fullscreen_1h, #network-chart-fullscreen_1d').hover(
            function() {},
            function() {
                if(defined(document.getElementById("divCursor")))document.getElementById("divCursor").style.display = "none";
            }
        );
    });

    statsWorkerScenario3.addEventListener('message', function(e) {
        var data = e.data;
        switch (data.cmd) {
            case 'Scenario3.lampstatus':
                if(!defined(data.error)) RenderLampSTAT_CUMULATVE(data.result);
                else error("Scenario3.lampstatus: " + data.error);
                break;
            case 'Scenario3.summary':
                if(!defined(data.error)) RenderLightlineSTAT_SCHEDULING(data.result);
                else {error("Scenario3.summary: " + data.error); document.getElementById("network-all-configurations").style.display = "none";}
                break;
            case 'Scenario3.summary-groups':
                if(!defined(data.error)) RenderGroupsSTAT_SCHEDULING(data.result);
                else {error("Scenario3.summary-groups: " + data.error); document.getElementById("network-all-configurations-groups").style.display = "none";}
                break;
            case 'Scenario3.1YConsumption':
                if(!defined(data.error)) RenderLightlineELEA_1y(data.result);
                else error("Scenario3.1YConsumption: " + data.error);
                break;
            case 'Scenario3.1YConsumptionComparison':
                if(!defined(data.error)) RenderLightlineELEA_1yComparison(data.result);
                else error("Scenario3.1YConsumptionComparison: " + data.error);
                break;
            default:
                break;
        };
    }, false);

    spsWorkerScenario3.addEventListener('message', function(e) {
        var data = e.data;
        switch (data.cmd) {
            case 'Scenario3.sendSpsCommand':
                if(!defined(data.error)) RenderSPSCommand(data.result);
                else error("Scenario3.sendSpsCommand: " + data.error);
                break;
            default:
                break;
        };
    }, false);

    sosWorkerScenario3.addEventListener('message', function(e) {
        var data = e.data;
        switch (data.cmd) {
            case 'Scenario3.1YConsumption':
                if(!defined(data.error)) RenderLightlineELE_1y(data.result);
                else error(data.error);
                break;
            case 'Scenario3.1YConsumptionComparison':
                if(!defined(data.error)) RenderLightlineELE_1yComparison(data.result);
                else error("Scenario3.1YConsumptionComparison: " + data.error);
                break;
            case 'Scenario3.ELER_15':
                if(!defined(data.error)) RenderLightlineELE_15(data.result);
                else error("Scenario3.ELER_15: " + data.error);
                break;
            case 'Scenario3.ELER_1h':
                if(!defined(data.error)) RenderLightlineELE_1h(data.result);
                else error("Scenario3.ELER_1h: " + data.error);
                break;
            case 'Scenario3.ELER_1d':
                if(!defined(data.error)) RenderLightlineELE_1d(data.result);
                else {error("Scenario3.ELER_1d: " + data.error);loadingIndicator.className="fullScreenLoaderHidden";}
                break;
            case 'Scenario3.SUNS_1d':
                if(!defined(data.error)) RenderLightlineSUNS_1d(data.result);
                else error("Scenario3.SUNS_1d: " + data.error);
                break;
            case 'Scenario3.SUNR_1d':
                if(!defined(data.error)) RenderLightlineSUNR_1d(data.result);
                else error("Scenario3.SUNR_1d: " + data.error);
                break;
            case 'Scenario3.LIFE_1d':
                if(!defined(data.error)) RenderLightlineLIFE_1d(data.result);
                else error("Scenario3.LIFE_1d: " + data.error);
                break;
            case 'Scenario3.NALL_1d':
                if(!defined(data.error)) RenderLightlineNALL_1d(data.result);
                else error("Scenario3.NALL_1d: " + data.error);
                break;
            case 'Scenario3.NOK_1d':
                if(!defined(data.error)) RenderLightlineNOK_1d(data.result);
                else error("Scenario3.NOK_1d: " + data.error);
                break;
            case 'Scenario3.ONOF_1d':
                if(!defined(data.error)) RenderLightlineONOF_1d(data.result);
                else error("Scenario3.ONOF_1d: " + data.error);
                break;
            case 'Scenario3.ELEA_15':
                if(!defined(data.error)) RenderLightlineELEA_15(data.result);
                else {error("Scenario3.ELEA_15: " + data.error);networkKWH_15 = [0];networkDate_15 = [0];
                    if((defined(networkKWH_15)) && (defined(networkKWH_IPOW))){
                        DisplayNetworkChart();
                    }
                }
                break;
            case 'Scenario3.IPOWA_15':
                if(!defined(data.error)) RenderLightlineIPOWA_15(data.result);
                else {error("Scenario3.IPOWA_15: " + data.error);networkKWH_IPOW = [0];networkDate_IPOW = [0];
                    if((defined(networkKWH_15)) && (defined(networkKWH_IPOW))){
                        DisplayNetworkChart();
                    }
                }
                break;
            case 'Scenario3.ELEA_1h':
                if(!defined(data.error)) RenderLightlineELEA_1h(data.result);
                else error("Scenario3.ELEA_1h: " + data.error);
                break;
            case 'Scenario3.ELEA_1d':
                if(!defined(data.error)) RenderLightlineELEA_1d(data.result);
                else {error("Scenario3.ELEA_1d: " + data.error);loadingIndicator.className="fullScreenLoaderHidden";}
                break;
            case 'Scenario3.DIMM_ir':
                if(!defined(data.error)) RenderLampDIMM(data.result);
                else {error("Scenario3.DIMM_ir: " + data.error);lampPERC_DIMM = [0];lampDate_DIMM = [0];
                    if((defined(lampWAT_IPOW)) && (defined(lampVOL_IVOL)) && (defined(lampAMP_ICUR)) && (defined(lampNUL_COSF)) && (defined(lampPERC_DIMM))){
                        DisplayLampChart();
                    }
                }
                break;
            case 'Scenario3.IPOW_ir':
                if(!defined(data.error)) RenderLampIPOW(data.result);
                else {error("Scenario3.IPOW_ir: " + data.error);lampWAT_IPOW = [0];lampDate_IPOW = [0];
                    if((defined(lampWAT_IPOW)) && (defined(lampVOL_IVOL)) && (defined(lampAMP_ICUR)) && (defined(lampNUL_COSF)) && (defined(lampPERC_DIMM))){
                        DisplayLampChart();
                    }
                }
                break;
            case 'Scenario3.IVOL_ir':
                if(!defined(data.error)) RenderLampIVOL(data.result);
                else {error("Scenario3.IVOL_ir: " + data.error);lampVOL_IVOL = [0];lampDate_IVOL = [0];
                    if((defined(lampWAT_IPOW)) && (defined(lampVOL_IVOL)) && (defined(lampAMP_ICUR)) && (defined(lampNUL_COSF)) && (defined(lampPERC_DIMM))){
                        DisplayLampChart();
                    }
                }
                break;
            case 'Scenario3.ICUR_ir':
                if(!defined(data.error)) RenderLampICUR(data.result);
                else {error("Scenario3.ICUR_ir: " + data.error);lampAMP_ICUR = [0];lampDate_ICUR = [0];
                    if((defined(lampWAT_IPOW)) && (defined(lampVOL_IVOL)) && (defined(lampAMP_ICUR)) && (defined(lampNUL_COSF)) && (defined(lampPERC_DIMM))){
                        DisplayLampChart();
                    }
                }
                break;
            case 'Scenario3.COSF_ir':
                if(!defined(data.error)) RenderLampCOSF(data.result);
                else {error("Scenario3.COSF_ir: " + data.error);lampNUL_COSF = [0];lampDate_COSF = [0];
                    if((defined(lampWAT_IPOW)) && (defined(lampVOL_IVOL)) && (defined(lampAMP_ICUR)) && (defined(lampNUL_COSF)) && (defined(lampPERC_DIMM))){
                        DisplayLampChart();
                    }
                }
                break;
            case 'Scenario3.STAT_ir':
                if(!defined(data.error)) RenderLampSTAT_1d(data.result);
                else {error("Scenario3.STAT_ir: " + data.error);}
                break;
            case 'Scenario3.LIFE_1_ir':
                if(!defined(data.error)) RenderLampLIFE_1ir(data.result);
                else error("Scenario3.LIFE_1_ir: " + data.error);
                break;
            default:
                break;
        };
    }, false);


    this.DisplayNetworkStats = function(city, identifier){
        networkDate = new Date();
        networkDate.setHours(14);
        networkDate.setDate(networkDate.getDate() - 1);

        pilotName = city;

        console.log("CLICK STAT SU: " + pilotName + ", " + identifier);

        document.getElementById("network-pilot-name").textContent = pilotName.toUpperCase() + " Overview";

        document.getElementById("main").style.display = "none";
        document.getElementById("kmlbuildingdetail").style.display = "none";
        document.getElementById("gltfnetworkdetail").style.display = "block";
        document.getElementById("gltfbuildingdetail").style.display = "none";


        var container = document.getElementById("network-group-list");
        var container2 = document.getElementById("network-group-list2");
        var container3 = document.getElementById("network-group-list3");
        $("#network-group-list").empty();
        $("#network-group-list2").empty();
        $("#network-group-list3").empty();

        var selectionfid= document.getElementById("network-dump-element");
        var lenght = selectionfid.options.length;
        for (i = 0; i < lenght; i++) {
            selectionfid.remove(0);
        }

        pilotCode = sessionStorage.getItem("pilotCode");
        role = sessionStorage.getItem("userType");
        key = window.btoa( sessionStorage.getItem("username") + ":" + sessionStorage.getItem("password"));

        if(pilotCode == -1) pilotCode = pilot2codespaceid[pilotName];

        if(defined(pilotCode) && defined(role) && defined(key)){

            initDumpForm("lightline",pilotCode);
            initDumpForm("weatherstation",pilotCode);
            lastSundayOfEachMonths(new Date().getFullYear());

            $("#network-dump-start-day").val('');
            $("#network-dump-end-day").val('');

            $("#network-dump-start-day").datepicker({ dateFormat: 'yy/mm/dd' });
            $("#network-dump-end-day").datepicker({ dateFormat: 'yy/mm/dd' });

            document.getElementById("network-dump").onclick = function(){dump()};

            $("#cesium-widget-ecomap-container").animate({left: "-125"}, 500);
            $("#cesium-widget-ecomap-cooling-container").animate({left: "-125"}, 500);
            $("#cesium-widget-building-container").animate({left: "-125"}, 500);
            $("#cesium-widget-network-container").animate({left: "10"}, 1500);
            $("#cesium-widget-status-container").animate({top: "120"}, 1500);

            if(role == "globalreader" || role == "reader" || pilotCode == 9 || pilotCode == 10){
                document.getElementById("network-group-table").style.display = "none";
            }
            else if(role == "administrator" || role == "manager"){
                done("chiedo i gruppi al server");
                document.getElementById("network-group-table").style.display = "table";

                var newgroup = document.getElementById("network-new-group");
                newgroup.onclick = newGroup;

                var xmlhttp = new XMLHttpRequest();

                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4) {
                        if (isValidJSONResponse(xmlhttp)) {
                            done("gruppi scaricati!");
                            var groups = JSON.parse(xmlhttp.responseText);
                            console.log(groups);

                            if(defined(groups)){
                                if(defined(groups.length)){
                                    for(var i=0;i<groups.length;i++){
                                        var group = groups[i].group;

                                        group.usr_id = group.usr_id.replace(/_/g," ").trim();

                                        var element = document.createElement('li');

                                        var del = document.createElement('img');
                                        del.id = group.id;
                                        del.name = group.usr_id;
                                        del.src = "./img/delete.png";
                                        del.className = "groupoptions";
                                        del.style.cursor = "pointer";
                                        del.onclick = function(){groupID = this.id; deleteGroup();}
                                        element.appendChild(del);

                                        var edit = document.createElement('img');
                                        edit.id = group.id;
                                        edit.name = group.usr_id;
                                        edit.src = "./img/edit.png";
                                        edit.className = "groupoptions";
                                        edit.style.cursor = "pointer";
                                        edit.onclick = function(){groupID = this.id; groupUsrID = this.name; updateGroup();}
                                        element.appendChild(edit);

                                        var link = document.createElement('a');
                                        link.id = group.id;
                                        link.name = group.usr_id;
                                        link.textContent = group.usr_id;
                                        link.href = "#";
                                        link.className = "groupelement";
                                        link.onclick = function(){groupID = this.id; groupUsrID = this.name; updateGroup();}
                                        element.appendChild(link);

                                        if(i%3==0) container.appendChild(element);
                                        else if(i%3==1) container2.appendChild(element);
                                        else if(i%3==2) container3.appendChild(element);
                                    }
                                }
                                else{
                                    var group = groups.group;

                                    var element = document.createElement('li');

                                    var del = document.createElement('img');
                                    del.id = group.id;
                                    del.name = group.usr_id;
                                    del.src = "./img/delete.png";
                                    del.className = "groupoptions";
                                    del.style.cursor = "pointer";
                                    del.onclick = function(){groupID = this.id; deleteGroup();}
                                    element.appendChild(del);

                                    var edit = document.createElement('img');
                                    edit.id = group.id;
                                    edit.name = group.usr_id;
                                    edit.src = "./img/edit.png";
                                    edit.className = "groupoptions";
                                    edit.style.cursor = "pointer";
                                    edit.onclick = function(){groupID = this.id; groupUsrID = this.name; updateGroup();}
                                    element.appendChild(edit);

                                    var link = document.createElement('a');
                                    link.id = group.id;
                                    link.name = group.usr_id;
                                    link.textContent = group.usr_id;
                                    link.href = "#";
                                    link.className = "groupelement";
                                    link.onclick = function(){groupID = this.id; groupUsrID = this.name; updateGroup();}
                                    element.appendChild(link);

                                    container.appendChild(element);
                                }
                            }
                        }
                        else
                            error("errore nel download dei gruppi");
                    }

                }

                var url = "./php/proxyGROUPING.php?url=" + groupElementsGroupsURL.replace("__GROUPCODE__",groupsAPICode[pilotCode]) + "&key=" + key;
                //console.log(url);

                // Send the POST request
                xmlhttp.open('GET', url, true);
                xmlhttp.send();

                done("download control IDs");
                controlIDs = new Array();
                if(!defined(controlIDs)){
                    var xmlhttp2 = new XMLHttpRequest();

                    xmlhttp2.onreadystatechange = function () {
                        if (xmlhttp2.readyState == 4) {
                            if (isValidJSONResponse(xmlhttp2)) {
                                done("control IDs downloaded");
                                var networkJSON = JSON.parse(xmlhttp2.responseText);
                                if(defined(networkJSON)){
                                    for(var i=0;i<networkJSON.length;i++){
                                        var element = networkJSON[i];
                                        if(defined(element.ctrl_id))
                                            controlIDs[element.sos_id] = element.ctrl_id;
                                    }
                                }
                            }
                            else
                                error("Error retriving control IDs");
                        }
                    }

                    var url = "./php/proxyGROUPING.php?url=" + groupElementsDevicesURL.replace("__GROUPCODE__",groupsAPICode[pilotCode]) + "&key=" + key;

                    // Send the POST request
                    xmlhttp2.open('GET', url, true);
                    xmlhttp2.send();
                }
            }

            if(defined(identifier)){
                var newElement = identifier.replace("http://www.sunshineproject.eu/swe/procedure/","").trim();

                if(groupIdentifier != newElement){
                    groupIdentifier = newElement;

                    document.getElementById("network-lamps-status-table").style.display = "none";
                    document.getElementById("network-all-configurations").style.display = "none";
                    document.getElementById("network-all-configurations-groups").style.display = "none";

                    done("CHIEDO LISTA SCHEDULING ATTIVI SU ELEMENTI FISICI");
                    var schedulingData = {"callback": "Scenario3.summary","what":"NETWORK", "codespaceid":pilotCode, "lightline": groupIdentifier.substring(0,5), "key":key};
                    statsWorkerScenario3.postMessage({'cmd': 'askForScheduling',data: schedulingData});

                    done("CHIEDO LISTA SCHEDULING ATTIVI SU GRUPPI");
                    var schedulingData = {"callback": "Scenario3.summary-groups","what":"GROUP", "codespaceid":pilotCode, "groups": groupsAPICode[pilotCode], "key":key};
                    statsWorkerScenario3.postMessage({'cmd': 'askForScheduling-Groups',data: schedulingData});

                    var selectioncompare= document.getElementById("network-compare");
                    var lenght = selectioncompare.options.length;
                    for (i = 0; i < lenght; i++) {
                        selectioncompare.remove(0);
                    }

                    for(var i=2; i<5;i++){
                        var year = new Date();
                        year.setFullYear(year.getFullYear()-(i-1));
                        var option = document.createElement("option");
                        option.textContent = year.getFullYear() + " data";
                        option.value = i;
                        if(i==2) option.selected = true;
                        selectioncompare.add(option);
                    }

                    document.getElementById("network-compare-container").style.display = "none";
                    var buttoncompare = document.getElementById("network-compare-button");
                    buttoncompare.onclick = function(){
                        done("ADD Y STATISTICS");
                        var networkStartDate = new Date();
                        networkStartDate.setFullYear(networkStartDate.getFullYear()-(1*selectioncompare.value));
                        networkStartDate.setHours(00,00,00);
                        var networkEndDate = new Date(networkStartDate);
                        networkEndDate.setFullYear(networkEndDate.getFullYear()+1);
                        networkStartDate.setDate(1);

                        //console.log(adjustToTimeZone4SOS(networkStartDate).yyyy_mm_ddThh_min_sec() + " " + adjustToTimeZone4SOS(networkEndDate).yyyy_mm_ddThh_min_sec());

                        loadingIndicator4stats.style.display = "block";
                        clearChart("network-chart-container", "network-chart", 400, 300, null);

                        if(pilotCode == 5 || pilotCode == 9 ){
                            var reverberiRequest = {"callback": "Scenario3.1YConsumptionComparison","what":networkSOAPCallELEA, "offering":groupIdentifier + "_ELEA_KWH_15", "key":key, "from":(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":(networkEndDate).yyyy_mm_ddThh_min_sec()};
                            statsWorkerScenario3.postMessage({'cmd': 'askReverberi',data: reverberiRequest});
                        }
                        else{
                            var sosRequest = {"callback": "Scenario3.1YConsumptionComparison","what":networkSOAPCallELE, "offering":groupIdentifier + "_ELER_KWH_1d", "key":key, "from":(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":(networkEndDate).yyyy_mm_ddThh_min_sec()};
                            sosWorkerScenario3.postMessage({'cmd': 'askForSOS',data: sosRequest});
                        }
                    };

                    var networkStartDate = new Date();
                    networkStartDate.setFullYear(networkStartDate.getFullYear()-1);
                    networkStartDate.setHours(00,00,00);
                    var networkEndDate = new Date(networkStartDate);
                    networkEndDate.setFullYear(networkEndDate.getFullYear()+1);
                    networkStartDate.setDate(1);

                    //console.log((networkStartDate).yyyy_mm_ddThh_min_sec() + " " + (networkEndDate).yyyy_mm_ddThh_min_sec());


                    done("AGGIORNO 1Y STATS");

                    if(pilotCode == 5 || pilotCode == 9 ){ //BAS //VDN
                        loadingIndicator4stats.style.display = "block";
                        clearChart("network-chart-container", "network-chart", 400, 300, null);

                        var reverberiRequest = {"callback": "Scenario3.1YConsumption", "what":networkSOAPCallELEA, "offering":groupIdentifier + "_ELEA_KWH_15", "key":key, "from":(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":(networkEndDate).yyyy_mm_ddThh_min_sec()};
                        statsWorkerScenario3.postMessage({'cmd': 'askReverberi',data: reverberiRequest});
                    }
                    else{ //ROV && HRV
                        loadingIndicator4stats.style.display = "block";
                        clearChart("network-chart-container", "network-chart", 400, 300, null);

                        var sosRequest = {"callback": "Scenario3.1YConsumption","what":networkSOAPCallELE, "offering":groupIdentifier + "_ELER_KWH_1d", "key":key, "from":(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":(networkEndDate).yyyy_mm_ddThh_min_sec()};
                        sosWorkerScenario3.postMessage({'cmd': 'askForSOS',data: sosRequest});

                        done("CHIEDO STATUS LAMPADE IERI");

                        $("#network-lamps-list").empty();
                        $("#network-lamps-list2").empty();
                        $("#network-lamps-list3").empty();
                        $("#network-lamps-list4").empty();
                        $("#network-lamps-list5").empty();
                        $("#network-lamps-list6").empty();
                        $("#network-lamps-list7").empty();
                        $("#network-lamps-list8").empty();
                        $("#network-lamps-list9").empty();

                        if(pilotCode == 2){ //ROV

                            var networkStartDate = new Date();
                            networkStartDate.setHours(networkStartDate.getHours()-25);
                            var networkEndDate = new Date();

                            var lightlineData = {"callback": "Scenario3.lampstatus","what":"LAMPS", "codespaceid":pilotCode, "lightline": groupIdentifier.substring(0,5), "key":key, "from":adjustToTimeZone4SOS(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(networkEndDate).yyyy_mm_ddThh_min_sec()};
                            statsWorkerScenario3.postMessage({'cmd': 'askLampStatus',data: lightlineData});
                        }
                    }
                }
            }
        }
    }

    function dump(){

        var dumpElement = document.getElementById("network-dump-element").value;
        var dumpStart = document.getElementById("network-dump-start-day").value;
        var dumpEnd = document.getElementById("network-dump-end-day").value;
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
                                    for (var j=0;j<offerings.length;j++){
                                        var offering = (offerings[j].childNodes[0].nodeValue).replace("http://www.sunshineproject.eu/swe/offering/","").trim();
                                        if(!defined(offeringArray[offering])){
                                            offeringArray[offering] = true;
                                            if(offering.indexOf("_ELER_KWH_1h") != -1) {if(defined(dumpCode)){what.push("ELE");download(what,dumpCode,dumpStart,dumpEnd);break;}};
                                            if(offering.indexOf("_ELEA_KWH_15") != -1) {if(defined(dumpCode)){what.push("ELEA");what.push("IPOWA");download(what,dumpCode,dumpStart,dumpEnd);break;}};
                                            if(offering.indexOf("_TEMP_CEL_1h") != -1) {if(defined(dumpCode)){what.push("TEMP");what.push("IRRA");what.push("WIND");download(what,dumpCode,dumpStart,dumpEnd);break;}};
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

    function download(what,dumpCode,dumpStart,dumpEnd){
        document.getElementById("network-dump-status").style.display = "block";
        document.getElementById("network-dump").style.display = "none";

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
                                link.id = "network-dump-link";
                                link.click();
                            }
                        }
                    }
                    document.getElementById("network-dump-status").style.display = "none";
                    document.getElementById("network-dump").style.display = "inline";
                }
            }

            var index;
            switch(what[i]){
                case "ELE" : __OFFERING__ = dumpCode + "_ELER_KWH_1h";url = networkSOAPCallELE; unit = "KWH"; index=1; break;
                case "ELEA" : __OFFERING__ = dumpCode + "_ELEA_KWH_15";url = networkSOAPCallELEA; unit = "KWH - Absolute"; index=0; break;
                case "IPOWA" : __OFFERING__ = dumpCode + "_IPOW_KWA_15";url = networkSOAPCallIPOW; unit = "KWH"; index=0; break;
                case "IRRA" : __OFFERING__ = dumpCode + "_IRRA_WM2_1h";url = networkSOAPCallIRRA; unit = "WM2"; index=0; break;
                case "TEMP" : __OFFERING__ = dumpCode + "_TEMP_CEL_1h";url = networkSOAPCallTEMP; unit = "CEL"; index=0; break;
                case "WIND" : __OFFERING__ = dumpCode + "_WIND_KMH_1h";url = networkSOAPCallWIND; unit = "KMH"; index=0; break;
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
            error("NO DATA AVAILABLE FOR THE CURRENT TIME SLOT FOR " + __OFFERING__);
            alert("NO DATA AVAILABLE FOR THE CURRENT TIME SLOT");
        }
        else{
            done("DOWNLOAD COMPLETE FOR " + __OFFERING__);
            alert("DOWNLOAD COMPLETED");
        }
    }

    this.DisplayNetworkDetails = function(networkData){
        networkDate = new Date();
        networkDate.setHours(14);
        networkDate.setDate(networkDate.getDate() - 1);

        networkID = networkData.split("|")[3];
        var typology = networkData.split("|")[2];
        networkUsrID = networkData.split("|")[1];
        pilotName = networkData.split("|")[0];

        console.log("CLICK SU " + networkData);

        pilotCode = sessionStorage.getItem("pilotCode");
        role = sessionStorage.getItem("userType");
        key = window.btoa( sessionStorage.getItem("username") + ":" + sessionStorage.getItem("password"));

        if(pilotCode == -1) pilotCode = pilot2codespaceid[pilotName];

        if(defined(pilotCode) && defined(role) && defined(key)){

            if(pilotCode != 2 && pilotCode != 5) if(typology == "lamp") document.getElementById("lampanalysis-additionalinfo").style.display = "none";
            else if(typology == "lamp") document.getElementById("lampanalysis-additionalinfo").style.display = "block";

            if(pilotCode != 2) if(typology == "lightline") document.getElementById("networkanalysis-additionalinfo").style.display = "none";
            else if(typology == "lightline") document.getElementById("networkanalysis-additionalinfo").style.display = "block";

            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (isValidXMLResponse(xmlhttp)) {

                        sensorDescription = xmlhttp.responseText;
                        //console.log(sensorDescription);

                        switch(typology){
                            case "lightline" : openLightlineDetails(); break;
                            case "lamp" : openLampDetails(); break;
                            default : break;
                        }
                    }
                }
            }

            var body = document.body,html = document.documentElement;
            loadingIndicator.style.height = Math.max( body.scrollHeight, body.offsetHeight,html.clientHeight, html.scrollHeight, html.offsetHeight ) + "px";

            var url = "./php/proxySOS.php?procedure=" + networkID + "&key=" + key;

            // Send the POST request
            xmlhttp.open('GET', url, true);
            xmlhttp.send();
        }
    }

    function updateGroup(){
        var fullScreenGraph = document.getElementById("fullScreenGROUPGraph");

        var body = document.body,html = document.documentElement;
        fullScreenGraph.style.height = Math.max( body.scrollHeight, body.offsetHeight,html.clientHeight, html.scrollHeight, html.offsetHeight ) + "px";
        fullScreenGraph.className="fullScreenGraph";
        document.body.style.cursor = 'pointer';

        document.getElementById("groupanalysis-configuration").style.display = "block";
        document.getElementById("groupanalysis-scheduling").style.display = "block";

        if(defined(groupUsrID))document.getElementById("group-usrid").textContent = "- " + groupUsrID.toUpperCase();

        $("#groupanalysis-close").click(hideGroupGraph);
        $("#groupanalysis-repeat").click(function(e){
            e.stopImmediatePropagation();
            e.preventDefault();
            manageSPScommand("group");
        });

        var newGroupButtonSaveAs = document.getElementById("groupanalysis-new-group");
        newGroupButtonSaveAs.onclick = updateGroupExisting;

        var grouplist = document.getElementById("group-list-elements");
        var totallist = document.getElementById("group-list-total");

        $("#group-list-elements").empty();
        $("#group-list-total").empty();

        $("#groupanalysis-control-start-day").val('');
        $("#groupanalysis-control-end-day").val('');

        $("#groupanalysis-control-start-day").datepicker({ dateFormat: 'yy/mm/dd' });
        $("#groupanalysis-control-end-day").datepicker({ dateFormat: 'yy/mm/dd'});

        document.getElementById("groupanalysis-control-repeat-mon").className="calendarbutton";
        document.getElementById("groupanalysis-control-repeat-tue").className="calendarbutton";
        document.getElementById("groupanalysis-control-repeat-wed").className="calendarbutton";
        document.getElementById("groupanalysis-control-repeat-thu").className="calendarbutton";
        document.getElementById("groupanalysis-control-repeat-fri").className="calendarbutton";
        document.getElementById("groupanalysis-control-repeat-sat").className="calendarbutton";
        document.getElementById("groupanalysis-control-repeat-sun").className="calendarbutton";

        $("#groupanalysis-control-repeat-mon").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#groupanalysis-control-repeat-tue").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#groupanalysis-control-repeat-wed").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#groupanalysis-control-repeat-thu").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#groupanalysis-control-repeat-fri").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#groupanalysis-control-repeat-sat").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#groupanalysis-control-repeat-sun").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});

        var selectiondimming1 = document.getElementById("groupanalysis-control-dimming1");
        var selectiondimming2 = document.getElementById("groupanalysis-control-dimming2");
        var selectiondimming3 = document.getElementById("groupanalysis-control-dimming3");
        var selectiondimming4 = document.getElementById("groupanalysis-control-dimming4");
        var lenght = selectiondimming1.options.length;
        for (i = 0; i < lenght; i++) {
            selectiondimming1.remove(0);
            selectiondimming2.remove(0);
            selectiondimming3.remove(0);
            selectiondimming4.remove(0);
        }

        var option = document.createElement("option");
        selectiondimming1.add(option);
        selectiondimming2.add(option.cloneNode(true));
        selectiondimming3.add(option.cloneNode(true));
        selectiondimming4.add(option.cloneNode(true));

        for(var i=0;i<=100;i++){
            var option = document.createElement("option");
            if(i!=0)option.textContent = i + " %";
            else option.textContent = "OFF";
            option.value = i;
            selectiondimming1.add(option);
            selectiondimming2.add(option.cloneNode(true));
            selectiondimming3.add(option.cloneNode(true));
            selectiondimming4.add(option.cloneNode(true));
        }

        var selectionhour2 = document.getElementById("groupanalysis-control-from2");
        var selectionhour3 = document.getElementById("groupanalysis-control-from3");
        var selectionhour4 = document.getElementById("groupanalysis-control-from4");
        var lenght = selectionhour2.options.length;
        for (i = 0; i < lenght; i++) {
            selectionhour2.remove(0);
            selectionhour3.remove(0);
            selectionhour4.remove(0);
        }

        var option = document.createElement("option");
        selectionhour2.add(option);
        selectionhour3.add(option.cloneNode(true));
        selectionhour4.add(option.cloneNode(true));

        var from = new Date();
        from.setHours(00,00,00);
        var to = new Date(from);
        to.setHours(10,00,00);

        for (var d = from; d <= to; d.setMinutes(d.getMinutes() + 15)) {
            var day = new Date(d);
            var option = document.createElement("option");
            option.textContent = ('0' + (day.getHours())).slice(-2) + ":" + ('0' + (day.getMinutes())).slice(-2);
            option.value = ('0' + (day.getHours())).slice(-2) + ":" + ('0' + (day.getMinutes())).slice(-2);
            if(option.textContent == "00:00"){option.value = "24:00";}
            selectionhour2.add(option);
            selectionhour3.add(option.cloneNode(true));
            selectionhour4.add(option.cloneNode(true));
        }

        var from = new Date();
        from.setHours(15,00,00);
        var to = new Date(from);
        to.setHours(23,59,59);

        for (var d = from; d <= to; d.setMinutes(d.getMinutes() + 15)) {
            var day = new Date(d);
            var option = document.createElement("option");
            option.textContent = ('0' + (day.getHours())).slice(-2) + ":" + ('0' + (day.getMinutes())).slice(-2);
            option.value = ('0' + (day.getHours())).slice(-2) + ":" + ('0' + (day.getMinutes())).slice(-2);
            selectionhour2.add(option);
            selectionhour3.add(option.cloneNode(true));
            selectionhour4.add(option.cloneNode(true));
        }

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (isValidJSONResponse(xmlhttp)) {
                    var json = JSON.parse(xmlhttp.responseText);

                    groupElements = new Array();
                    var elements = json.devices;

                    if(defined(elements)){

                        for(var i=0;i<elements.length;i++){
                            var element = elements[i];

                            var elementname = element.usr_id;
                            var type = element.type;

                            if(!defined(elementname)) elementname = element.sps_id.replace("http://www.sunshineproject.eu/sps/procedure/","").trim();
                            else elementname = element.sps_id.replace("http://www.sunshineproject.eu/sps/procedure/","").trim().substring(0,5) + ": " + elementname;

                            if(defined(elementname) && type != "V"){
                                var component = document.createElement('li');
                                component.id = element.id;
                                component.className = "button";
                                component.style.cursor = "move";

                                var img = document.createElement('img');
                                img.style.float = "left";
                                img.style.width = "24px";

                                var text = document.createElement('span');
                                text.textContent = elementname;
                                text.style.fontSize = "11px";

                                if(element.type != "S") text.style.fontWeight = "800";

                                component.appendChild(img);
                                component.appendChild(text);

                                grouplist.appendChild(component);

                                groupElements.push(element.id);
                            }
                        }
                    }

                    var xmlhttp2 = new XMLHttpRequest();

                    xmlhttp2.onreadystatechange = function () {
                        if (xmlhttp2.readyState == 4) {
                            if (isValidJSONResponse(xmlhttp2)) {
                                var devices = JSON.parse(xmlhttp2.responseText);

                                if(defined(devices)){

                                    if(devices.length>1){

                                        for(var i=0;i<devices.length;i++){
                                            var element = devices[i];

                                            var elementname = element.usr_id;
                                            var type = element.type;

                                            if(!defined(elementname)) elementname = element.sps_id.replace("http://www.sunshineproject.eu/sps/procedure/","").trim();
                                            else elementname = element.sps_id.replace("http://www.sunshineproject.eu/sps/procedure/","").trim().substring(0,5) + ": " + elementname;

                                            if(defined(elementname) && type != "V"){
                                                if(groupElements.indexOf(element.id)==-1){
                                                    var component = document.createElement('li');
                                                    component.id = element.id;
                                                    component.className = "button";

                                                    var img = document.createElement('img');
                                                    img.style.float = "left";
                                                    img.style.width = "24px";

                                                    var text = document.createElement('span');
                                                    text.textContent = elementname;
                                                    text.style.fontSize = "11px";

                                                    if(element.type != "S") text.style.fontWeight = "800";

                                                    component.appendChild(img);
                                                    component.appendChild(text);

                                                    totallist.appendChild(component);
                                                }
                                            }
                                        }

                                    }

                                     $(function() {
                                        $( "#group-list-total, #group-list-elements" ).sortable({
                                         connectWith: ".connectedSortable"
                                        }).disableSelection();
                                     });
                                }

                                getSPSschedulings("group");
                            }
                        }
                    }

                    var url = "./php/proxyGROUPING.php?url=" + groupElementsDevicesURL.replace("__GROUPCODE__",groupsAPICode[pilotCode]) + "&key=" + key;

                    // Send the POST request
                    xmlhttp2.open('GET', url, true);
                    xmlhttp2.send();
                }
            }
        }

        var url = "./php/proxyGROUPING.php?url=" + groupElementsGroupsURL.replace("__GROUPCODE__",groupsAPICode[pilotCode]) + "/" + groupID + "&key=" + key;

        // Send the POST request
        xmlhttp.open('GET', url, true);
        xmlhttp.send();
    }

    function newGroup(){
        var fullScreenGraph = document.getElementById("fullScreenGROUPGraph");

        var body = document.body,html = document.documentElement;
        fullScreenGraph.style.height = Math.max( body.scrollHeight, body.offsetHeight,html.clientHeight, html.scrollHeight, html.offsetHeight ) + "px";
        fullScreenGraph.className="fullScreenGraph";
        document.body.style.cursor = 'pointer';

        document.getElementById("groupanalysis-configuration").style.display = "none";
        document.getElementById("groupanalysis-scheduling").style.display = "none";

        $("#groupanalysis-close").click(hideGroupGraph);
        $("#groupanalysis-repeat").click(function(e){
            e.stopImmediatePropagation();
            e.preventDefault();
            manageSPScommand("group");
        });

        var newGroupButtonSaveAs = document.getElementById("groupanalysis-new-group");
        newGroupButtonSaveAs.onclick = newGroupSaveAs;

        var totallist = document.getElementById("group-list-total");

        $("#group-list-elements").empty();
        $("#group-list-total").empty();

        $("#groupanalysis-control-start-day").val('');
        $("#groupanalysis-control-end-day").val('');

        $("#groupanalysis-control-start-day").datepicker({ dateFormat: 'yy/mm/dd' });
        $("#groupanalysis-control-end-day").datepicker({ dateFormat: 'yy/mm/dd'});

        document.getElementById("groupanalysis-control-repeat-mon").className="calendarbutton";
        document.getElementById("groupanalysis-control-repeat-tue").className="calendarbutton";
        document.getElementById("groupanalysis-control-repeat-wed").className="calendarbutton";
        document.getElementById("groupanalysis-control-repeat-thu").className="calendarbutton";
        document.getElementById("groupanalysis-control-repeat-fri").className="calendarbutton";
        document.getElementById("groupanalysis-control-repeat-sat").className="calendarbutton";
        document.getElementById("groupanalysis-control-repeat-sun").className="calendarbutton";

        $("#groupanalysis-control-repeat-mon").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#groupanalysis-control-repeat-tue").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#groupanalysis-control-repeat-wed").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#groupanalysis-control-repeat-thu").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#groupanalysis-control-repeat-fri").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#groupanalysis-control-repeat-sat").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#groupanalysis-control-repeat-sun").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});

        var selectiondimming1 = document.getElementById("groupanalysis-control-dimming1");
        var selectiondimming2 = document.getElementById("groupanalysis-control-dimming2");
        var selectiondimming3 = document.getElementById("groupanalysis-control-dimming3");
        var selectiondimming4 = document.getElementById("groupanalysis-control-dimming4");
        var lenght = selectiondimming1.options.length;
        for (i = 0; i < lenght; i++) {
            selectiondimming1.remove(0);
            selectiondimming2.remove(0);
            selectiondimming3.remove(0);
            selectiondimming4.remove(0);
        }

        var option = document.createElement("option");
        selectiondimming1.add(option);
        selectiondimming2.add(option.cloneNode(true));
        selectiondimming3.add(option.cloneNode(true));
        selectiondimming4.add(option.cloneNode(true));

        for(var i=0;i<=100;i++){
            var option = document.createElement("option");
            if(i!=0)option.textContent = i + " %";
            else option.textContent = "OFF";
            option.value = i;
            selectiondimming1.add(option);
            selectiondimming2.add(option.cloneNode(true));
            selectiondimming3.add(option.cloneNode(true));
            selectiondimming4.add(option.cloneNode(true));
        }

        var selectionhour2 = document.getElementById("groupanalysis-control-from2");
        var selectionhour3 = document.getElementById("groupanalysis-control-from3");
        var selectionhour4 = document.getElementById("groupanalysis-control-from4");
        var lenght = selectionhour2.options.length;
        for (i = 0; i < lenght; i++) {
            selectionhour2.remove(0);
            selectionhour3.remove(0);
            selectionhour4.remove(0);
        }

        var option = document.createElement("option");
        selectionhour2.add(option);
        selectionhour3.add(option.cloneNode(true));
        selectionhour4.add(option.cloneNode(true));

        var from = new Date();
        from.setHours(00,00,00);
        var to = new Date(from);
        to.setHours(10,00,00);

        for (var d = from; d <= to; d.setMinutes(d.getMinutes() + 15)) {
            var day = new Date(d);
            var option = document.createElement("option");
            option.textContent = ('0' + (day.getHours())).slice(-2) + ":" + ('0' + (day.getMinutes())).slice(-2);
            option.value = ('0' + (day.getHours())).slice(-2) + ":" + ('0' + (day.getMinutes())).slice(-2);
            if(option.textContent == "00:00"){option.value = "24:00";}
            selectionhour2.add(option);
            selectionhour3.add(option.cloneNode(true));
            selectionhour4.add(option.cloneNode(true));
        }

        var from = new Date();
        from.setHours(15,00,00);
        var to = new Date(from);
        to.setHours(23,59,59);

        for (var d = from; d <= to; d.setMinutes(d.getMinutes() + 15)) {
            var day = new Date(d);
            var option = document.createElement("option");
            option.textContent = ('0' + (day.getHours())).slice(-2) + ":" + ('0' + (day.getMinutes())).slice(-2);
            option.value = ('0' + (day.getHours())).slice(-2) + ":" + ('0' + (day.getMinutes())).slice(-2);
            selectionhour2.add(option);
            selectionhour3.add(option.cloneNode(true));
            selectionhour4.add(option.cloneNode(true));
        }

        var xmlhttp2 = new XMLHttpRequest();

        xmlhttp2.onreadystatechange = function () {

            if (xmlhttp2.readyState == 4) {
                if (isValidJSONResponse(xmlhttp2)) {
                    var json = JSON.parse(xmlhttp2.responseText);

                    if(defined(json)){

                        if(json.length>1){

                            for(var i=0;i<json.length;i++){
                                var element = json[i];

                                var elementname = element.usr_id;
                                var type = element.type;

                                if(!defined(elementname)) elementname = element.sps_id.replace("http://www.sunshineproject.eu/sps/procedure/","").trim();
                                else elementname = element.sps_id.replace("http://www.sunshineproject.eu/sps/procedure/","").trim().substring(0,5) + ": " + elementname;

                                if(defined(elementname) && type != "V"){
                                    var component = document.createElement('li');
                                    component.id = element.id;
                                    component.className = "button";
                                    component.style.cursor = "move";

                                    var img = document.createElement('img');
                                    img.style.float = "left";
                                    img.style.width = "24px";

                                    var text = document.createElement('span');
                                    text.textContent = elementname;
                                    text.style.fontSize = "11px";

                                    if(element.type != "S") text.style.fontWeight = "800";

                                    component.appendChild(img);
                                    component.appendChild(text);

                                    totallist.appendChild(component);
                                }
                            }
                        }

                        $(function() {
                            $( "#group-list-total, #group-list-elements" ).sortable({
                                connectWith: ".connectedSortable"
                            }).disableSelection();
                        });
                    }
                }
            }
        }

        var url = "./php/proxyGROUPING.php?url=" + groupElementsDevicesURL.replace("__GROUPCODE__",groupsAPICode[pilotCode]) + "&key=" + key;

        // Send the POST request
        xmlhttp2.open('GET', url, true);
        xmlhttp2.send();
    }

    function newGroupSaveAs(){
        var elements = document.getElementById("group-list-elements").getElementsByTagName("li");
        document.getElementById("groupanalysis-save-as-name").value = "";
        if(elements.length>1){

            var newGroupSaveAs = document.getElementById("fullScreenSave");

            var body = document.body,html = document.documentElement;
            newGroupSaveAs.style.height = Math.max( body.scrollHeight, body.offsetHeight,html.clientHeight, html.scrollHeight, html.offsetHeight ) + "px";
            newGroupSaveAs.className="fullScreenGraph";
            newGroupSaveAs.ondblclick = hideGroupSaveAs;
            document.body.style.cursor = 'pointer';

            var newGroupButtonSaveAs = document.getElementById("groupanalysis-save-as");
            newGroupButtonSaveAs.onclick = function(){

                var deviceidlist = "";

                for(var i=0;i<elements.length;i++){
                    var element = elements[i];
                    deviceidlist += element.id + ",";
                }

                deviceidlist = deviceidlist.substring(0, deviceidlist.length - 1);
                var groupnewname = document.getElementById("groupanalysis-save-as-name").value;
                groupnewname = groupnewname.replace(/ /g,"_").trim();

                if(defined(groupnewname) && defined(deviceidlist)){
                    var xmlhttp = new XMLHttpRequest();

                    xmlhttp.onreadystatechange = function () {
                        if (xmlhttp.readyState == 4) {
                            if (xmlhttp.status == 200 && defined(xmlhttp.responseText)) {

                                var temp = pilotName;
                                new Scenario3().DisplayNetworkStats(temp,groupIdentifier);
                                hideGroupSaveAs();
                                hideGroupGraph();
                            }
                        }
                    }

                    var today = new Date();
                    var SPS_ID = "http://www.sunshineproject.eu/sps/procedure/" + groupsAPICode[pilotCode] + "-" + today.getFullYear() + (today.getMonth()+1) + today.getDate() + "_" + today.getHours() + today.getMinutes() + today.getSeconds();

                    var url = groupElementsNewURL;

                    url = url.replace("__GROUPCODE__",groupsAPICode[pilotCode]);
                    url = url.replace("__USERID__",groupnewname);
                    url = url.replace("__DEVICEIDLIST__",deviceidlist);
                    url = url.replace("__SPSID__",SPS_ID);

                    url = "url=" + groupElementsGroupsURL.replace("__GROUPCODE__",groupsAPICode[pilotCode]) + "&body=" + url + "&key=" + key;

                    // Send the POST request
                    xmlhttp.open('POST', './php/proxyGROUPING.php', true);
                    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                    xmlhttp.send(url);
                }
            };
        }
        else
            alert("A group must contain at least two elements");
    }

    function updateGroupExisting(){
        var elements = document.getElementById("group-list-elements").getElementsByTagName("li");
        if(elements.length>1){

            if(defined(groupID)){
                var xmlhttp = new XMLHttpRequest();

                xmlhttp.onreadystatechange = function () {
                    if (xmlhttp.readyState == 4) {
                        if (isValidJSONResponse(xmlhttp)) {

                            var details = JSON.parse(xmlhttp.responseText);

                            if(defined(details)){
                                var group = details.group;

                                var deviceidlist = "";

                                for(var i=0;i<elements.length;i++){
                                    var element = elements[i];
                                    deviceidlist += element.id + ",";
                                }

                                deviceidlist = deviceidlist.substring(0, deviceidlist.length - 1);

                                if(defined(deviceidlist)){
                                    var xmlhttp2 = new XMLHttpRequest();

                                    xmlhttp2.onreadystatechange = function () {
                                        if (xmlhttp2.readyState == 4) {
                                            if (xmlhttp2.status == 200 && defined(xmlhttp2.responseText)) {
                                                var temp = pilotName;
                                                new Scenario3().DisplayNetworkStats(temp,groupIdentifier);
                                                hideGroupGraph();
                                            }
                                        }
                                    }

                                    var url = groupElementsNewURL;

                                    url = url.replace("__GROUPCODE__",groupsAPICode[pilotCode]);
                                    url = url.replace("__USERID__",group.usr_id);
                                    url = url.replace("__DEVICEIDLIST__",deviceidlist);
                                    url = url.replace("__SPSID__",group.sps_id);
                                    url = url.replace("__GROUPID__",groupID);

                                    url = "url=" + groupElementsGroupsURL.replace("__GROUPCODE__",groupsAPICode[pilotCode]) + "&body=" + url + "&key=" + key;

                                    // Send the POST request
                                    xmlhttp2.open('POST', './php/proxyGROUPING.php', true);
                                    xmlhttp2.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                                    xmlhttp2.send(url);
                                }
                            }
                        }
                    }
                }

                var url = "./php/proxyGROUPING.php?url=" + groupElementsGroupsURL.replace("__GROUPCODE__",groupsAPICode[pilotCode]) + "/" + groupID + "&key=" + key;

                // Send the POST request
                xmlhttp.open('GET', url, true);
                xmlhttp.send();
            }
        }
        else
            alert("A group must contain at least two elements");
    }


    function deleteGroup(){
        if(defined(groupID)){
            done("elimino gruppo " + groupID);
            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    done("Gruppo " + groupID + " eliminato");
                    var temp = pilotName;
                    new Scenario3().DisplayNetworkStats(temp,groupIdentifier);
                }
            }

            var url = "url=" + groupElementsGroupsURL.replace("__GROUPCODE__",groupsAPICode[pilotCode]) + "/" + groupID + "&key=" + key;

            // Send the POST request
            xmlhttp.open('DELETE', './php/proxyGROUPING.php', true);
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send(url);
        }
    }

    function deleteTask(device,info){
        var taskid = info.split("|")[0];
        var spsid = info.split("|")[1];

        if(defined(taskid) && defined(spsid)){
            var url;
            switch(device){
                case "network" : var groupcode = networkCode.split("-")[0]; url = groupElementsTasksURL.replace("__GROUPCODE__",groupcode); break;
                case "lamp" : var groupcode = networkCode.split("-")[0]; url = groupElementsTasksURL.replace("__GROUPCODE__",groupcode); break;
                case "group" : var groupcode = url = groupElementsTasksURL.replace("__GROUPCODE__",groupsAPICode[pilotCode]); break;
                default : break;
            }

            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200 && defined(xmlhttp.responseText)) {
                        done("Deleted task " + taskid + " on device " + spsid);

                        var schedulingData = {"callback": "Scenario3.summary","what":"NETWORK", "codespaceid":pilotCode, "lightline": groupIdentifier.substring(0,5), "key":key};
                        statsWorkerScenario3.postMessage({'cmd': 'askForScheduling',data: schedulingData});
                    }
                    else{
                        error("Impossibile eliminare task " + taskid + " su device " + spsid);
                    }
                    getSPSschedulings(device);
                }
            }

            url = "url=" + url + "&taskid=" + taskid + "&spsid=" + spsid + "&key=" + key;

            // Send the POST request
            xmlhttp.open('DELETE', './php/proxySPS.php', true);
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send(url);
        }
    }

    function openLightlineDetails(){
        //document.body.style.cursor = 'pointer';

        if(role == "globalreader" || role == "reader" || pilotCode == 10 || pilotCode == 5 || pilotCode == 9){
            document.getElementById("networkanalysis-configuration").style.display = "none";
        }
        else if(role == "administrator" || role == "manager"){
            document.getElementById("networkanalysis-configuration").style.display = "block";
        }

        if(defined(networkUsrID))document.getElementById("network-usrid").textContent = "- " + networkUsrID.toUpperCase();

        $("#networkanalysis-close").click(hideNetworkGraph);
        $("#networkanalysis-repeat").click(function(e){
            e.stopImmediatePropagation();
            e.preventDefault();
            manageSPScommand("network");
        });

        $("#networkanalysis-control-start-day").val('');
        $("#networkanalysis-control-end-day").val('');

        $("#networkanalysis-control-start-day").datepicker({ dateFormat: 'yy/mm/dd' });
        $("#networkanalysis-control-end-day").datepicker({ dateFormat: 'yy/mm/dd' });

        document.getElementById("networkanalysis-control-repeat-mon").className="calendarbutton";
        document.getElementById("networkanalysis-control-repeat-tue").className="calendarbutton";
        document.getElementById("networkanalysis-control-repeat-wed").className="calendarbutton";
        document.getElementById("networkanalysis-control-repeat-thu").className="calendarbutton";
        document.getElementById("networkanalysis-control-repeat-fri").className="calendarbutton";
        document.getElementById("networkanalysis-control-repeat-sat").className="calendarbutton";
        document.getElementById("networkanalysis-control-repeat-sun").className="calendarbutton";

        $("#networkanalysis-control-repeat-mon").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#networkanalysis-control-repeat-tue").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#networkanalysis-control-repeat-wed").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#networkanalysis-control-repeat-thu").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#networkanalysis-control-repeat-fri").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#networkanalysis-control-repeat-sat").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#networkanalysis-control-repeat-sun").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});

        var selectiondimming1 = document.getElementById("networkanalysis-control-dimming1");
        var selectiondimming2 = document.getElementById("networkanalysis-control-dimming2");
        var selectiondimming3 = document.getElementById("networkanalysis-control-dimming3");
        var selectiondimming4 = document.getElementById("networkanalysis-control-dimming4");
        var lenght = selectiondimming1.options.length;
        for (i = 0; i < lenght; i++) {
            selectiondimming1.remove(0);
            selectiondimming2.remove(0);
            selectiondimming3.remove(0);
            selectiondimming4.remove(0);
        }

        var option = document.createElement("option");
        selectiondimming1.add(option);
        selectiondimming2.add(option.cloneNode(true));
        selectiondimming3.add(option.cloneNode(true));
        selectiondimming4.add(option.cloneNode(true));

        for(var i=0;i<=100;i++){
            var option = document.createElement("option");
            if(i!=0)option.textContent = i + " %";
            else option.textContent = "OFF";
            option.value = i;
            selectiondimming1.add(option);
            selectiondimming2.add(option.cloneNode(true));
            selectiondimming3.add(option.cloneNode(true));
            selectiondimming4.add(option.cloneNode(true));
        }

        var selectionhour2 = document.getElementById("networkanalysis-control-from2");
        var selectionhour3 = document.getElementById("networkanalysis-control-from3");
        var selectionhour4 = document.getElementById("networkanalysis-control-from4");
        var lenght = selectionhour2.options.length;
        for (i = 0; i < lenght; i++) {
            selectionhour2.remove(0);
            selectionhour3.remove(0);
            selectionhour4.remove(0);
        }

        var option = document.createElement("option");
        selectionhour2.add(option);
        selectionhour3.add(option.cloneNode(true));
        selectionhour4.add(option.cloneNode(true));

        var from = new Date();
        from.setHours(00,00,00);
        var to = new Date(from);
        to.setHours(10,00,00);

        for (var d = from; d <= to; d.setMinutes(d.getMinutes() + 15)) {
            var day = new Date(d);
            var option = document.createElement("option");
            option.textContent = ('0' + (day.getHours())).slice(-2) + ":" + ('0' + (day.getMinutes())).slice(-2);
            option.value = ('0' + (day.getHours())).slice(-2) + ":" + ('0' + (day.getMinutes())).slice(-2);
            if(option.textContent == "00:00"){option.value = "24:00";}
            selectionhour2.add(option);
            selectionhour3.add(option.cloneNode(true));
            selectionhour4.add(option.cloneNode(true));
        }

        var from = new Date();
        from.setHours(15,00,00);
        var to = new Date(from);
        to.setHours(23,59,59);

        for (var d = from; d <= to; d.setMinutes(d.getMinutes() + 15)) {
            var day = new Date(d);
            var option = document.createElement("option");
            option.textContent = ('0' + (day.getHours())).slice(-2) + ":" + ('0' + (day.getMinutes())).slice(-2);
            option.value = ('0' + (day.getHours())).slice(-2) + ":" + ('0' + (day.getMinutes())).slice(-2);
            selectionhour2.add(option);
            selectionhour3.add(option.cloneNode(true));
            selectionhour4.add(option.cloneNode(true));
        }

        var now = new Date();
        now.setDate(now.getDate()-1);
        var previous = new Date();
        previous.setFullYear(previous.getFullYear()-1);

        var slide_analysis = 0;
        var last_slide_analysis;

        $('#network-timeline-container-analysis').empty();
        $('#network-timeline-container-analysis').append( '<div id="network-timeline-analysis"/>' );

        for (var d = previous; d <= now; d.setDate(d.getDate() + 1)) {
            var day = new Date(d);

            var element = $('<div/>',{
                id: "lightline-calendar-element-" + slide_analysis,
                class: 'not_selected_date',
                text: day.getDate() + " ",
                click: function(e){e.stopImmediatePropagation();e.preventDefault();last_slide_analysis.className = "not_selected_date"; this.className = "selected_date"; last_slide_analysis = this; networkDate = new Date(this.textContent + (" 14:00:00")); lastSundayOfEachMonths(networkDate.getFullYear()); initLightline();}
            }).appendTo('#network-timeline-analysis');

            var calendar = $('<div/>',{
                class: 'selected_month',
                text: month[day.getMonth()] + " " + day.getFullYear()
            }).appendTo(element);

            slide_analysis++;

        }

        last_slide_analysis = document.getElementById("lightline-calendar-element-" + (slide_analysis-1));
        last_slide_analysis.className = "selected_date";


        $('#network-timeline-analysis').bxSlider({
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
                            networkCode = uniqueID.replace("http://www.sunshineproject.eu/swe/procedure/","").trim();
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

                console.log("---------");

                console.log(networkCode);
                if(defined(networkCode)){
                    var fullScreenGraph = document.getElementById("fullScreenNETWORKGraph");
                    var body = document.body,html = document.documentElement;
                    fullScreenGraph.style.height = Math.max( body.scrollHeight, body.offsetHeight,html.clientHeight, html.scrollHeight, html.offsetHeight ) + "px";
                    fullScreenGraph.className="fullScreenGraph";

                    loadingIndicator.className="fullScreenLoader";

                    getSPSschedulings("network");
                    initLightline();
                }
                else
                    error("Error parsing Sensor description");
            }
    }

    function initLightline(){
        loadingIndicator.className="fullScreenLoader";

        networkConsumption_1h = networkDate_1h = networkKWH_1h = undefined;
        networkConsumption_15 = networkDate_15 = networkKWH_15 = undefined;
        networkConsumption_1d = networkDate_1d = networkKWH_1d = undefined;
        networkKWH_IPOW = undefined;
        networkSUNS_HMS = undefined;
        networkSUNR_HMS = undefined;
        networkLIFE_HRS = undefined;
        networkNALL_NUM = undefined;
        networkNOK_NUM = undefined;
        networkONOF_BOO = "";

        clearChart("network-chart-fullscreen_15-container", "network-chart-fullscreen_15", 1180, 260, "15");
        clearChart("network-chart-fullscreen_1h-container", "network-chart-fullscreen_1h", 1180, 260, "1h");
        clearChart("network-chart-fullscreen_1d-container", "network-chart-fullscreen_1d", 1180, 260, "1d");

        document.getElementById("networkanalysis-sunshine").textContent = "NO DATA";
        document.getElementById("networkanalysis-sunrise").textContent = "NO DATA";
        document.getElementById("networkanalysis-life").textContent = "NO DATA";
        document.getElementById("networkanalysis-nall").textContent = "NO DATA";
        document.getElementById("networkanalysis-nok").textContent = "NO DATA";
        document.getElementById("networkanalysis-onof").textContent = "NO DATA";

        if(pilotCode == 5 || pilotCode == 9){ //BAS //VDN
            //A CLES SONO ATTIVE DI GIORNO
            if(pilotCode == 9){
                networkDate.setHours(00,00,00);
            }

            var networkStartDate = new Date(networkDate);
            var networkEndDate = new Date(networkDate);
            networkEndDate.setHours(networkEndDate.getHours()+25);

            var sosRequest = {"callback": "Scenario3.ELEA_15","what":networkSOAPCallELEA, "offering":networkCode + "_ELEA_KWH_15", "key":key, "from":adjustToTimeZone4SOS(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(networkEndDate).yyyy_mm_ddThh_min_sec()};
            sosWorkerScenario3.postMessage({'cmd': 'askForSOS',data: sosRequest});

            var sosRequest = {"callback": "Scenario3.IPOWA_15","what":networkSOAPCallIPOW, "offering":networkCode + "_IPOW_KWA_15", "key":key, "from":adjustToTimeZone4SOS(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(networkEndDate).yyyy_mm_ddThh_min_sec()};
            sosWorkerScenario3.postMessage({'cmd': 'askForSOS',data: sosRequest});

            var sosRequest = {"callback": "Scenario3.ELEA_1h","what":networkSOAPCallELEA, "offering":networkCode + "_ELEA_KWH_15", "key":key, "from":adjustToTimeZone4SOS(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(networkEndDate).yyyy_mm_ddThh_min_sec()};
            sosWorkerScenario3.postMessage({'cmd': 'askForSOS',data: sosRequest});

            var networkStartDate = new Date(networkDate);
            networkStartDate.setMonth(networkStartDate.getMonth()-1);
            var networkEndDate = new Date(networkDate);
            networkEndDate.setDate(networkEndDate.getDate()+1);
            var sosRequest = {"callback": "Scenario3.ELEA_1d","what":networkSOAPCallELEA, "offering":networkCode + "_ELEA_KWH_15", "key":key, "from":adjustToTimeZone4SOS(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(networkEndDate).yyyy_mm_ddThh_min_sec()};
            sosWorkerScenario3.postMessage({'cmd': 'askForSOS_1dReverberi',data: sosRequest});
        }
        else{ //ROV && HRV
            var networkStartDate = new Date(networkDate);
            var networkEndDate = new Date(networkDate);
            networkEndDate.setHours(networkEndDate.getHours()+25);

            var sosRequest = {"callback": "Scenario3.ELER_15","what":networkSOAPCallELE, "offering":networkCode + "_ELER_KWH_15", "key":key, "from":adjustToTimeZone4SOS(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(networkEndDate).yyyy_mm_ddThh_min_sec()};
            sosWorkerScenario3.postMessage({'cmd': 'askForSOS',data: sosRequest});

            var sosRequest = {"callback": "Scenario3.ELER_1h","what":networkSOAPCallELE, "offering":networkCode + "_ELER_KWH_1h", "key":key, "from":adjustToTimeZone4SOS(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(networkEndDate).yyyy_mm_ddThh_min_sec()};
            sosWorkerScenario3.postMessage({'cmd': 'askForSOS',data: sosRequest});

            var networkStartDate = new Date(networkDate);
            networkStartDate.setMonth(networkStartDate.getMonth()-1);
            var networkEndDate = new Date(networkDate);
            networkEndDate.setDate(networkEndDate.getDate()+1);
            var sosRequest = {"callback": "Scenario3.ELER_1d","what":networkSOAPCallELE, "offering":networkCode + "_ELER_KWH_1d", "key":key, "from":adjustToTimeZone4SOS(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(networkEndDate).yyyy_mm_ddThh_min_sec()};
            sosWorkerScenario3.postMessage({'cmd': 'askForSOS',data: sosRequest});

            if(pilotCode == 2){
                var networkStartDate = new Date(networkDate);
                networkStartDate.setHours(00,00,00);
                var networkEndDate = new Date(networkDate);
                networkEndDate.setHours(23,59,59);
                var sosRequest = {"callback": "Scenario3.SUNS_1d","what":networkSOAPCallISUNS, "offering":networkCode + "_SUNS_HMS_ir", "key":key, "from":adjustToTimeZone4SOS(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(networkEndDate).yyyy_mm_ddThh_min_sec()};
                sosWorkerScenario3.postMessage({'cmd': 'askForSOS',data: sosRequest});

                var sosRequest = {"callback": "Scenario3.SUNR_1d","what":networkSOAPCallISUNR, "offering":networkCode + "_SUNR_HMS_ir", "key":key, "from":adjustToTimeZone4SOS(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(networkEndDate).yyyy_mm_ddThh_min_sec()};
                sosWorkerScenario3.postMessage({'cmd': 'askForSOS',data: sosRequest});

                var sosRequest = {"callback": "Scenario3.LIFE_1d","what":networkSOAPCallILIFE, "offering":networkCode + "_LIFE_HRS_ir", "key":key, "from":adjustToTimeZone4SOS(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(networkEndDate).yyyy_mm_ddThh_min_sec()};
                sosWorkerScenario3.postMessage({'cmd': 'askForSOS',data: sosRequest});

                var sosRequest = {"callback": "Scenario3.NALL_1d","what":networkSOAPCallINALL, "offering":networkCode + "_NALL_NUM_ir", "key":key, "from":adjustToTimeZone4SOS(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(networkEndDate).yyyy_mm_ddThh_min_sec()};
                sosWorkerScenario3.postMessage({'cmd': 'askForSOS',data: sosRequest});

                var sosRequest = {"callback": "Scenario3.NOK_1d","what":networkSOAPCallINOK, "offering":networkCode + "_N-OK_NUM_ir", "key":key, "from":adjustToTimeZone4SOS(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(networkEndDate).yyyy_mm_ddThh_min_sec()};
                sosWorkerScenario3.postMessage({'cmd': 'askForSOS',data: sosRequest});

                var sosRequest = {"callback": "Scenario3.ONOF_1d","what":networkSOAPCallONOF, "offering":networkCode + "_ONOF_BOO_ir", "key":key, "from":adjustToTimeZone4SOS(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(networkEndDate).yyyy_mm_ddThh_min_sec()};
                sosWorkerScenario3.postMessage({'cmd': 'askForSOS',data: sosRequest});
            }
        }

        console.log("---------");
    }

    function openLampDetails(){
        //document.body.style.cursor = 'pointer';

        if(role == "globalreader" || role == "reader" || pilotCode == 10){
            document.getElementById("lampanalysis-configuration").style.display = "none";
        }
        else if(role == "administrator" || role == "manager"){
            document.getElementById("lampanalysis-configuration").style.display = "block";
        }

        if(defined(networkUsrID))document.getElementById("lamp-usrid").textContent = "- " + networkUsrID.toUpperCase();

        $("#lampanalysis-close").click(hideLampGraph);

        $("#lampanalysis-repeat").click(function(e){
            e.stopImmediatePropagation();
            e.preventDefault();
            manageSPScommand("lamp");
        });

        $("#lampanalysis-control-start-day").val('');
        $("#lampanalysis-control-end-day").val('');

        $("#lampanalysis-control-start-day").datepicker({ dateFormat: 'yy/mm/dd' });
        $("#lampanalysis-control-end-day").datepicker({ dateFormat: 'yy/mm/dd' });

        document.getElementById("lampanalysis-control-repeat-mon").className="calendarbutton";
        document.getElementById("lampanalysis-control-repeat-tue").className="calendarbutton";
        document.getElementById("lampanalysis-control-repeat-wed").className="calendarbutton";
        document.getElementById("lampanalysis-control-repeat-thu").className="calendarbutton";
        document.getElementById("lampanalysis-control-repeat-fri").className="calendarbutton";
        document.getElementById("lampanalysis-control-repeat-sat").className="calendarbutton";
        document.getElementById("lampanalysis-control-repeat-sun").className="calendarbutton";

        $("#lampanalysis-control-repeat-mon").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#lampanalysis-control-repeat-tue").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#lampanalysis-control-repeat-wed").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#lampanalysis-control-repeat-thu").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#lampanalysis-control-repeat-fri").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#lampanalysis-control-repeat-sat").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});
        $("#lampanalysis-control-repeat-sun").click(function(e){e.stopImmediatePropagation(); e.preventDefault(); if (this.className=="calendarbutton")this.className="calendarbuttonselected";else this.className="calendarbutton"});

        var selectiondimming1 = document.getElementById("lampanalysis-control-dimming1");
        var selectiondimming2 = document.getElementById("lampanalysis-control-dimming2");
        var selectiondimming3 = document.getElementById("lampanalysis-control-dimming3");
        var selectiondimming4 = document.getElementById("lampanalysis-control-dimming4");
        var lenght = selectiondimming1.options.length;
        for (i = 0; i < lenght; i++) {
            selectiondimming1.remove(0);
            selectiondimming2.remove(0);
            selectiondimming3.remove(0);
            selectiondimming4.remove(0);
        }

        var option = document.createElement("option");
        selectiondimming1.add(option);
        selectiondimming2.add(option.cloneNode(true));
        selectiondimming3.add(option.cloneNode(true));
        selectiondimming4.add(option.cloneNode(true));

        for(var i=0;i<=100;i++){
            var option = document.createElement("option");
            if(i!=0)option.textContent = i + " %";
            else option.textContent = "OFF";
            option.value = i;
            selectiondimming1.add(option);
            selectiondimming2.add(option.cloneNode(true));
            selectiondimming3.add(option.cloneNode(true));
            selectiondimming4.add(option.cloneNode(true));
        }

        var selectionhour2 = document.getElementById("lampanalysis-control-from2");
        var selectionhour3 = document.getElementById("lampanalysis-control-from3");
        var selectionhour4 = document.getElementById("lampanalysis-control-from4");
        var lenght = selectionhour2.options.length;
        for (i = 0; i < lenght; i++) {
            selectionhour2.remove(0);
            selectionhour3.remove(0);
            selectionhour4.remove(0);
        }

        var option = document.createElement("option");
        selectionhour2.add(option);
        selectionhour3.add(option.cloneNode(true));
        selectionhour4.add(option.cloneNode(true));

        var from = new Date();
        from.setHours(00,00,00);
        var to = new Date(from);
        to.setHours(10,00,00);

        for (var d = from; d <= to; d.setMinutes(d.getMinutes() + 15)) {
            var day = new Date(d);
            var option = document.createElement("option");
            option.textContent = ('0' + (day.getHours())).slice(-2) + ":" + ('0' + (day.getMinutes())).slice(-2);
            option.value = ('0' + (day.getHours())).slice(-2) + ":" + ('0' + (day.getMinutes())).slice(-2);
            if(option.textContent == "00:00"){option.value = "24:00";}
            selectionhour2.add(option);
            selectionhour3.add(option.cloneNode(true));
            selectionhour4.add(option.cloneNode(true));
        }

        var from = new Date();
        from.setHours(15,00,00);
        var to = new Date(from);
        to.setHours(23,59,59);

        for (var d = from; d <= to; d.setMinutes(d.getMinutes() + 15)) {
            var day = new Date(d);
            var option = document.createElement("option");
            option.textContent = ('0' + (day.getHours())).slice(-2) + ":" + ('0' + (day.getMinutes())).slice(-2);
            option.value = ('0' + (day.getHours())).slice(-2) + ":" + ('0' + (day.getMinutes())).slice(-2);
            selectionhour2.add(option);
            selectionhour3.add(option.cloneNode(true));
            selectionhour4.add(option.cloneNode(true));
        }

        var now = new Date();
        now.setDate(now.getDate()-1);
        var previous = new Date();
        previous.setFullYear(previous.getFullYear()-1);

        var slide_analysis = 0;
        var last_slide_analysis;

        $('#lamp-timeline-container-analysis').empty();
        $('#lamp-timeline-container-analysis').append( '<div id="lamp-timeline-analysis"/>' );

        for (var d = previous; d <= now; d.setDate(d.getDate() + 1)) {
            var day = new Date(d);

            var element = $('<div/>',{
                id: "lamp-calendar-element-" + slide_analysis,
                class: 'not_selected_date',
                text: day.getDate() + " ",
                click: function(e){e.stopImmediatePropagation();e.preventDefault();last_slide_analysis.className = "not_selected_date"; this.className = "selected_date"; last_slide_analysis = this; networkDate = new Date(this.textContent + (" 14:00:00")); lastSundayOfEachMonths(networkDate.getFullYear()); initLamps();}
            }).appendTo('#lamp-timeline-analysis');

            var calendar = $('<div/>',{
                class: 'selected_month',
                text: month[day.getMonth()] + " " + day.getFullYear()
            }).appendTo(element);

            slide_analysis++;

        }

        last_slide_analysis = document.getElementById("lamp-calendar-element-" + (slide_analysis-1));
        last_slide_analysis.className = "selected_date";


        $('#lamp-timeline-analysis').bxSlider({
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
                        networkCode = uniqueID.replace("http://www.sunshineproject.eu/swe/procedure/","").trim();
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

            console.log("---------");

            console.log(networkCode);
            if(defined(networkCode)){
                var fullScreenGraph = document.getElementById("fullScreenLAMPGraph");
                var body = document.body,html = document.documentElement;
                fullScreenGraph.style.height = Math.max( body.scrollHeight, body.offsetHeight,html.clientHeight, html.scrollHeight, html.offsetHeight ) + "px";
                fullScreenGraph.className="fullScreenGraph";

                loadingIndicator.className="fullScreenLoader";

                var controlIDsselect = document.getElementById("lampanalysis-ctrlid");
                var lenght = controlIDsselect.options.length;
                for (var i = 0; i < lenght; i++) {
                    controlIDsselect.remove(0);
                }

                var orderedControlIDs = new Array();
                for(var key in controlIDs){
                    orderedControlIDs.push(key);
                }

                orderedControlIDs.sort();

                for(var i=0;i<orderedControlIDs.length;i++){
                    var key = orderedControlIDs[i];
                    var option = document.createElement("option");
                    option.textContent = controlIDs[key];
                    option.value = key;
                    if(key==networkID) option.selected = true;
                    controlIDsselect.add(option);
                }

                var controlIDupdate = document.getElementById("lampanalysis-swap");
                controlIDupdate.onclick = swapControlIDs;

                getSPSschedulings("lamp");
                initLamps();
            }
            else
                error("Error parsing Sensor description");
        }
    }

    function initLamps(){
        loadingIndicator.className="fullScreenLoader";

        lampConsumption_DIMM = lampDate_DIMM = lampPERC_DIMM = undefined;
        lampConsumption_IPOW = lampDate_IPOW = lampWAT_IPOW = undefined;
        lampConsumption_IVOL = lampDate_IVOL = lampVOL_IVOL = undefined;
        lampConsumption_ICUR = lampDate_ICUR = lampAMP_ICUR = undefined;
        lampConsumption_COSF = lampDate_COSF = lampNUL_COSF = undefined;
        lampLIFE_HRS = "";
        lampSTAT_NUL = "";

        clearChart("lamp-chart-fullscreen-container", "lamp-chart-fullscreen", 1180, 360, "irr");

        document.getElementById("lampanalysis-status").textContent = "NO DATA";

        var networkStartDate = new Date(networkDate);
        var networkEndDate = new Date(networkDate);
        networkEndDate.setHours(networkEndDate.getHours()+25);

        var sosRequest = {"callback": "Scenario3.DIMM_ir","what":networkSOAPCallDIMM, "offering":networkCode + "_DIMM_PRC_ir", "key":key, "from":adjustToTimeZone4SOS(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(networkEndDate).yyyy_mm_ddThh_min_sec()};
        sosWorkerScenario3.postMessage({'cmd': 'askForSOS',data: sosRequest});

        var sosRequest = {"callback": "Scenario3.IPOW_ir","what":networkSOAPCallIPOW, "offering":networkCode + "_IPOW_WAT_ir", "key":key, "from":adjustToTimeZone4SOS(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(networkEndDate).yyyy_mm_ddThh_min_sec()};
        sosWorkerScenario3.postMessage({'cmd': 'askForSOS',data: sosRequest});

        var sosRequest = {"callback": "Scenario3.IVOL_ir","what":networkSOAPCallIVOL, "offering":networkCode + "_IVOL_VOL_ir", "key":key, "from":adjustToTimeZone4SOS(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(networkEndDate).yyyy_mm_ddThh_min_sec()};
        sosWorkerScenario3.postMessage({'cmd': 'askForSOS',data: sosRequest});

        var sosRequest = {"callback": "Scenario3.ICUR_ir","what":networkSOAPCallICUR, "offering":networkCode + "_ICUR_AMP_ir", "key":key, "from":adjustToTimeZone4SOS(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(networkEndDate).yyyy_mm_ddThh_min_sec()};
        sosWorkerScenario3.postMessage({'cmd': 'askForSOS',data: sosRequest});

        var sosRequest = {"callback": "Scenario3.COSF_ir","what":networkSOAPCallICOSF, "offering":networkCode + "_COSF_NUL_ir", "key":key, "from":adjustToTimeZone4SOS(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(networkEndDate).yyyy_mm_ddThh_min_sec()};
        sosWorkerScenario3.postMessage({'cmd': 'askForSOS',data: sosRequest});

        var networkStartDate = new Date(networkDate);
        networkStartDate.setHours(00,00,00);
        var networkEndDate = new Date(networkDate);
        networkEndDate.setHours(23,59,59);
        if(pilotCode == 5 || pilotCode == 9){ //BAS //VDN
            if(pilotCode == 5){
                var sosRequest = {"callback": "Scenario3.LIFE_1_ir","what":networkSOAPCallILIFE, "offering":networkCode + "_LIFE_HRS_ir", "key":key, "from":adjustToTimeZone4SOS(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(networkEndDate).yyyy_mm_ddThh_min_sec()};
                sosWorkerScenario3.postMessage({'cmd': 'askForSOS',data: sosRequest});
            }
        }
        else{ //ROV && -> HRV NON CI ARRIVO PERCHè NON HA LAMPADE
            var networkStartDate = new Date(networkDate);
            networkStartDate.setHours(00,00,00);
            var networkEndDate = new Date(networkDate);
            networkEndDate.setHours(23,59,59);

            var sosRequest = {"callback": "Scenario3.STAT_ir","what":networkSOAPCallSTAT, "offering":networkCode + "_STAT_NUL_ir", "key":key, "from":adjustToTimeZone4SOS(networkStartDate).yyyy_mm_ddThh_min_sec(), "to":adjustToTimeZone4SOS(networkEndDate).yyyy_mm_ddThh_min_sec()};
            sosWorkerScenario3.postMessage({'cmd': 'askForSOS',data: sosRequest});
        }

        console.log("---------");
    }

    function swapControlIDs(){
        var groupcode = networkCode.split("-")[0];
        var controlIDsselect = document.getElementById("lampanalysis-ctrlid");

        var newDeviceID;
        var oldDeviceID;

        var newControlSOSID = controlIDsselect.value;
        var newControlID = controlIDs[newControlSOSID];

        var oldControlSOSID = networkID;
        var oldControlID = controlIDs[networkID];

        console.log("PRIMA " + oldControlID);
        console.log("DOPO " + newControlID);

        var oldID = undefined;
        var newID = undefined;
        if(defined(newControlID) && defined(newControlSOSID) && (oldControlID != newControlID)){

            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (isValidJSONResponse(xmlhttp)) {
                        var element = JSON.parse(xmlhttp.responseText);
                        oldID = element.id;
                    }
                }
            }

            //CHIEDO DATI LAMPADA CORRENTE
            var url = "./php/proxyGROUPING.php?url=" + groupElementsDevicesURL.replace("__GROUPCODE__",groupcode) + "/search?sosid=" + oldControlSOSID + "&key=" + key;
            xmlhttp.open('GET', url, false);
            xmlhttp.send();

            if(defined(oldID)){
                var xmlhttp2 = new XMLHttpRequest();

                xmlhttp2.onreadystatechange = function () {
                    if (xmlhttp2.readyState == 4) {
                        if (xmlhttp2.status == 200 && defined(xmlhttp2.responseText)) {

                            var xmlhttp3 = new XMLHttpRequest();

                            xmlhttp3.onreadystatechange = function () {
                                if (xmlhttp3.readyState == 4) {
                                    if (isValidJSONResponse(xmlhttp3)) {
                                        var element = JSON.parse(xmlhttp3.responseText);
                                        newID = element.id;
                                    }
                                }
                            }

                            //CHIEDO DATI ALTRA LAMPADA
                            var url = "./php/proxyGROUPING.php?url=" + groupElementsDevicesURL.replace("__GROUPCODE__",groupcode) + "/search?sosid=" + newControlSOSID + "&key=" + key;
                            xmlhttp3.open('GET', url, false);
                            xmlhttp3.send();
                        }
                    }
                }

                //AGGIORNO LA LAMPADA CORRENTE
                var url = "url=" + groupElementsDevicesURL.replace("__GROUPCODE__",groupcode) + "/" + oldID + "/" + "ctrlid?ctrlid=" + newControlID + "&key=" + key;
                xmlhttp2.open('PUT', './php/proxyGROUPING.php', false);
                xmlhttp2.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                xmlhttp2.send(url);
            }

            if(defined(newID)){
                var xmlhttp4 = new XMLHttpRequest();

                xmlhttp4.onreadystatechange = function () {
                    if (xmlhttp4.readyState == 4) {
                        if (xmlhttp4.status == 200 && defined(xmlhttp4.responseText)) {
                            done("Modifico ControlID devices");
                            modifyControlIDs(oldID,groupcode,true);
                            modifyControlIDs(newID,groupcode,false);

                            //AGGIORNO CONTROL ID
                            controlIDs = new Array();
                            if(!defined(controlIDs)){
                                var xmlhttp5 = new XMLHttpRequest();

                                xmlhttp5.onreadystatechange = function () {
                                    if (xmlhttp5.readyState == 4) {
                                        if (isValidJSONResponse(xmlhttp5)) {
                                            var networkJSON = JSON.parse(xmlhttp5.responseText);

                                            if(defined(networkJSON)){
                                                done("Aggiorno la lista dei ControlID con le nuove modifiche");
                                                for(var i=0;i<networkJSON.length;i++){
                                                    var element = networkJSON[i];
                                                    if(defined(element.ctrl_id))
                                                        controlIDs[element.sos_id] = element.ctrl_id;
                                                }
                                            }
                                        }
                                    }
                                }

                                var url = "./php/proxyGROUPING.php?url=" + groupElementsDevicesURL.replace("__GROUPCODE__",groupcode) + "&key=" + key;

                                // Send the POST request
                                xmlhttp5.open('GET', url, false);
                                xmlhttp5.send();
                            }
                        }
                    }
                }

                //AGGIORNO L'ALTRA LAMPADA
                var url = "url=" + groupElementsDevicesURL.replace("__GROUPCODE__",groupcode) + "/" + newID + "/" + "ctrlid?ctrlid=" + oldControlID + "&key=" + key;
                xmlhttp4.open('PUT', './php/proxyGROUPING.php', false);
                xmlhttp4.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                xmlhttp4.send(url);
            }
        }
        else{
            modifyControlIDs(oldControlSOSID,groupcode,true);
        }
    }

    function modifyControlIDs(id,groupcode,value){
        if(defined(id) && defined(groupcode)){

            var xmlhttp = new XMLHttpRequest();

            var url = "url=" + groupElementsDevicesURL.replace("__GROUPCODE__",groupcode) + "/" + id + "/ctrlid?" + "valid=" + value + "&key=" + key;

            // Send the POST request
            xmlhttp.open('PUT', './php/proxyGROUPING.php', true);
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send(url);
        }
    }

    function manageSPScommand(device){
        if(defined(device)){

            var spsid;
            var url;

            switch(device){
                case "network" : var groupcode = networkCode.split("-")[0]; url = groupElementsDevicesURL.replace("__GROUPCODE__",groupcode) + "/search?sosid=" + networkID; break;
                case "lamp" : var groupcode = networkCode.split("-")[0]; url = groupElementsDevicesURL.replace("__GROUPCODE__",groupcode) + "/search?sosid=" + networkID; break;
                case "group" : var groupcode = url = groupElementsGroupsURL.replace("__GROUPCODE__",groupsAPICode[pilotCode]) + "/" + groupID; break;
                default : break;
            }

            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (isValidJSONResponse(xmlhttp)) {

                        var element = JSON.parse(xmlhttp.responseText);

                        if(defined(element)){

                            var prefix;
                            switch(device){
                                case "network" : spsid = element.sps_id;prefix = "networkanalysis"; break;
                                case "lamp" : spsid = element.sps_id;prefix = "lampanalysis";  break;
                                case "group" : spsid = element.group.sps_id;prefix = "groupanalysis"; break;
                                default : break;
                            }

                            if(defined(prefix) && defined(spsid)){

                                var mon = document.getElementById(prefix + "-control-repeat-mon").className;
                                var tue = document.getElementById(prefix + "-control-repeat-tue").className;
                                var wed = document.getElementById(prefix + "-control-repeat-wed").className;
                                var thu = document.getElementById(prefix + "-control-repeat-thu").className;
                                var fri = document.getElementById(prefix + "-control-repeat-fri").className;
                                var sat = document.getElementById(prefix + "-control-repeat-sat").className;
                                var sun = document.getElementById(prefix + "-control-repeat-sun").className;

                                if (mon == "calendarbutton") mon = "0";else mon = "1";
                                if (tue == "calendarbutton") tue = "0";else tue = "1";
                                if (wed == "calendarbutton") wed = "0";else wed = "1";
                                if (thu == "calendarbutton") thu = "0";else thu = "1";
                                if (fri == "calendarbutton") fri = "0";else fri = "1";
                                if (sat == "calendarbutton") sat = "0";else sat = "1";
                                if (sun == "calendarbutton") sun = "0";else sun = "1";

                                var daysOfWeek = sun+mon+tue+wed+thu+fri+sat;

                                var dimmingStart = document.getElementById(prefix + "-control-dimming1").value;
                                var start = document.getElementById(prefix + "-control-start-day").value;
                                var end = document.getElementById(prefix + "-control-end-day").value;
                                var priority = document.getElementById(prefix + "-control-priority").value;

                                var today = new Date();
                                today =  today.getFullYear() + "/" + ('0' + (today.getMonth()+1)).slice(-2) + "/" + ('0' + (today.getDate())).slice(-2);

                                if(defined(dimmingStart) && defined(start) && defined(end) && (end>start) && (end!=start) && (start>=today)){

                                    var arrayDimming = new Array();
                                    var arrayHours = new Array();

                                    var nrCommand = 0;
                                    var frequency = "N";

                                    if(daysOfWeek == "0000000") {
                                        frequency = "Y,24";
                                        daysOfWeek = "1111111";
                                    }

                                    daysOfWeek = "Y," + daysOfWeek;

                                    for(var i=1;i<=4;i++){
                                        var dimming = document.getElementById(prefix + "-control-dimming" + i).value;
                                        var hours = document.getElementById(prefix + "-control-from" + i).value;

                                        if(defined(dimming) && defined(hours)){
                                            arrayDimming.push(dimming);
                                            arrayHours.push(hours);
                                            nrCommand++;
                                        }
                                    }

                                    console.log("Send SPS scheduling");
                                    loadingIndicator.className="fullScreenLoader";

                                    var spsRequest = {"callback": "Scenario3.sendSpsCommand","key":key, "device": device, "nrCommand":nrCommand, "spsid":spsid, "start":start,"startTimezone":getTimeZone(start), "end":end,"endTimezone":getTimeZone(end),"dimming":arrayDimming, "hours":arrayHours, "frequency":frequency, "priority":priority, "daysOfWeek":daysOfWeek};
                                    spsWorkerScenario3.postMessage({'cmd': 'askForSPS',data: spsRequest});
                                }
                                else{
                                    error("SPS date not valid");
                                    alert("Please check the configuration parameters");
                                }
                            }
                        }
                    }
                }
            }

            url = "./php/proxyGROUPING.php?url=" + url + "&key=" + key;

            // Send the POST request
            xmlhttp.open('GET', url, true);
            xmlhttp.send();
        }
    }

    function RenderSPSCommand(status){
        loadingIndicator.className="fullScreenLoaderHidden";

        if(status.accepted){
            var schedulingData = {"callback": "Scenario3.summary","what":"NETWORK", "codespaceid":pilotCode, "lightline": groupIdentifier.substring(0,5), "key":key};
            statsWorkerScenario3.postMessage({'cmd': 'askForScheduling',data: schedulingData});

            done("SCHEDULING SETTATO CORRETTAMENTE");
            alert("Scheduling status: Scheduled");
        }
        else{
            error("ERRORE NELLO SCHEDULING");
            alert("Scheduling status: ERROR");
        }
        getSPSschedulings(status.device);
    }

    function getSPSschedulings(device){
        if(defined(device)){

            done("chiedo SPSID per " + device);
            var url;
            var spsid;

            var prefix;
            switch(device){
                case "network" : prefix = "networkanalysis"; break;
                case "lamp" : prefix = "lampanalysis"; break;
                case "group" : prefix = "groupanalysis";break;
                default : break;
            }

            switch(device){
                case "network" : var groupcode = networkCode.split("-")[0]; url = groupElementsDevicesURL.replace("__GROUPCODE__",groupcode) + "/search?sosid=" + networkID; break;
                case "lamp" : var groupcode = networkCode.split("-")[0]; url = groupElementsDevicesURL.replace("__GROUPCODE__",groupcode) + "/search?sosid=" + networkID; break;
                case "group" : var groupcode = url = groupElementsGroupsURL.replace("__GROUPCODE__",groupsAPICode[pilotCode]) + "/" + groupID; break;
                default : break;
            }

            $("#"+prefix+"-scheduling-table").empty();

            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (isValidJSONResponse(xmlhttp)) {

                        var element = JSON.parse(xmlhttp.responseText);

                        if(defined(element)){
                            switch(device){
                                case "network" : spsid = element.sps_id; var groupcode = networkCode.split("-")[0];url = groupcode + "/tasks?spsid=" + spsid; break;
                                case "lamp" : spsid = element.sps_id; var groupcode = networkCode.split("-")[0];url = groupcode + "/tasks?spsid=" + spsid; break;
                                case "group" : spsid = element.group.sps_id; url = groupsAPICode[pilotCode] + "/tasks?spsid=" + spsid;break;
                                default : break;
                            }

                            done("SPSID (" + spsid + ") trovato, chiedo lista task per " + device);

                            var xmlhttp2 = new XMLHttpRequest();

                            xmlhttp2.onreadystatechange = function () {
                                if (xmlhttp2.readyState == 4) {
                                    //console.log(xmlhttp2.responseText);

                                    if (isValidJSONResponse(xmlhttp2)) {
                                        var elements = JSON.parse(xmlhttp2.responseText);
                                        displaySPSschedulings(device,elements,spsid);
                                    }
                                    else{
                                        error("nessun scheduling per questo device");
                                        var table = document.getElementById(prefix + "-scheduling-table");
                                        var row = table.insertRow(0);
                                        var cell1 = row.insertCell(0);
                                        cell1.style.textAlign = "center";
                                        cell1.innerHTML = "No active schedulings available for this device";
                                    }
                                }
                            }


                            url = "./php/proxyGROUPING.php?url=" + url + "&key=" + key;

                            // Send the POST request
                            xmlhttp2.open('GET', url, true);
                            xmlhttp2.send();
                        }
                    }
                    else{
                        error("ERROR retriving SPSID from " + device);
                        var table = document.getElementById(prefix + "-scheduling-table");
                        var row = table.insertRow(0);
                        var cell1 = row.insertCell(0);
                        cell1.style.textAlign = "center";
                        cell1.innerHTML = "Error retriving tasks, please re-open the dashboard";
                    }
                }
            }

            url = "./php/proxyGROUPING.php?url=" + url + "&key=" + key;

            // Send the POST request
            xmlhttp.open('GET', url, true);
            xmlhttp.send();
        }
    }

    function displaySPSschedulings(device,history,spsid){

        var prefix;
        switch(device){
            case "network" : prefix = "networkanalysis"; break;
            case "lamp" : prefix = "lampanalysis"; break;
            case "group" : prefix = "groupanalysis";break;
            default : break;
        }

        var table = document.getElementById(prefix + "-scheduling-table");

        var row = table.insertRow(0);

        var index = 0;

        if(defined(history.length)){
            var del = row.insertCell(0);
            del.innerHTML = "";

            var startdate = row.insertCell(1);
            startdate.innerHTML = "START";

            var enddate = row.insertCell(2);
            enddate.innerHTML = "END";

            var exectime = row.insertCell(3);
            exectime.innerHTML = "EXECUTION TIME";

            var dimming = row.insertCell(4);
            dimming.innerHTML = "POWER %";

            var priority = row.insertCell(5);
            priority.innerHTML = "PRIORITY";

            var daysOfWeek = row.insertCell(6);
            daysOfWeek.innerHTML = "REPETITION";

            done("task found: " + history.length + " configurations");
            console.log(history);

            for(var i=0;i<history.length;i++){
                var scheduling = history[i];

                if(scheduling.next_fire != "EXPIRED"){
                    var row = table.insertRow(index+1);

                    var del = row.insertCell(0);
                    var startdate = row.insertCell(1);
                    var enddate = row.insertCell(2);
                    var exectime = row.insertCell(3);
                    var dimming = row.insertCell(4);
                    var priority = row.insertCell(5);
                    var daysOfWeek = row.insertCell(6);

                    del.style.cursor = "pointer";
                    del.id = device;
                    del.name = history[i].task_id + "|" + spsid;
                    del.innerHTML = "<img src='./img/delete_white.png' style='height: 20px'/>";
                    del.onclick = function(){deleteTask(this.id, this.name);}

                    var exec = scheduling.next_fire.split(" ")[3];
                    var start = scheduling.startdate.split(" ")[0] + " " + scheduling.startdate.split(" ")[1] + " " + scheduling.startdate.split(" ")[2];
                    var end = scheduling.enddate.split(" ")[0] + " " + scheduling.enddate.split(" ")[1] + " " + scheduling.enddate.split(" ")[2];

                    /*if(pilotCode == 5 && scheduling.dimm > 0 && scheduling.dimm <= 100) scheduling.dimm = 100 - scheduling.dimm;
                    else if(pilotCode == 5 && scheduling.dimm == 0) scheduling.dimm = 110;*/

                    if(scheduling.dimm != 110 && exec != "11:00:00" && exec != "12:00:00"){
                        startdate.innerHTML = start;
                        enddate.innerHTML = end;
                        exectime.style.color = "#e0d335";
                    }
                    else if(scheduling.dimm == 110 && exec == "11:00:00"){
                        startdate.innerHTML = "---";
                        enddate.innerHTML = end;
                        exectime.style.color = "#F79C9C";
                    }
                    else if(exec == "12:00:00"){
                        enddate.innerHTML = end;
                        startdate.innerHTML = start;
                        exectime.style.color = "#A1D46E";
                    }

                    exectime.innerHTML = exec;
                    if(scheduling.dimm != 110) dimming.innerHTML = scheduling.dimm;

                    if(scheduling.priority == "1")priority.innerHTML = "Default";
                    if(scheduling.priority == "2")priority.innerHTML = "Lowest";
                    if(scheduling.priority == "3")priority.innerHTML = "Low";
                    if(scheduling.priority == "4")priority.innerHTML = "High";


                    if(!defined(scheduling.dayofweek) || scheduling.dayofweek == 1111111)
                        if(scheduling.dimm != 110) daysOfWeek.innerHTML = "Every Day";
                        else daysOfWeek.innerHTML = "Reset";
                    else {
                        var calendar = "";

                        for(var j=0;j<scheduling.dayofweek.length;j++){
                            var day = parseInt(scheduling.dayofweek.charAt(j));

                            if(day == 1){
                                switch(j){
                                    case 0 : calendar += "Sun"; break;
                                    case 1 : calendar += "Mon"; break;
                                    case 2 : calendar += "Tue"; break;
                                    case 3 : calendar += "Wed"; break;
                                    case 4 : calendar += "Thu"; break;
                                    case 5 : calendar += "Fri"; break;
                                    case 6 : calendar += "Sat"; break;
                                    default : break;
                                }
                                calendar += ", ";
                            }
                        }
                        daysOfWeek.innerHTML = calendar.substring(0,calendar.length-2);
                    }
                    index++;
                }
            }
        }
        else{
            done("task found: 1 configuration");
            var scheduling = history;
            console.log(history);

            if(scheduling.next_fire != "EXPIRED"){
                var del = row.insertCell(0);
                del.innerHTML = "";

                var startdate = row.insertCell(1);
                startdate.innerHTML = "START";

                var enddate = row.insertCell(2);
                enddate.innerHTML = "END";

                var exectime = row.insertCell(3);
                exectime.innerHTML = "EXECUTION TIME";

                var dimming = row.insertCell(4);
                dimming.innerHTML = "POWER %";

                var priority = row.insertCell(5);
                priority.innerHTML = "PRIORITY";

                var daysOfWeek = row.insertCell(6);
                daysOfWeek.innerHTML = "REPETITION";

                var row = table.insertRow(1);

                var del = row.insertCell(0);
                var startdate = row.insertCell(1);
                var enddate = row.insertCell(2);
                var exectime = row.insertCell(3);
                var dimming = row.insertCell(4);
                var priority = row.insertCell(5);
                var daysOfWeek = row.insertCell(6);

                del.style.cursor = "pointer";
                del.id = device;
                del.name = history.task_id + "|" + spsid;
                del.innerHTML = "<img src='./img/delete_white.png' style='height: 20px'/>";
                del.onclick = function(){deleteTask(this.id, this.name);}

                var exec = scheduling.next_fire.split(" ")[3];
                var start = scheduling.startdate.split(" ")[0] + " " + scheduling.startdate.split(" ")[1] + " " + scheduling.startdate.split(" ")[2];
                var end = scheduling.enddate.split(" ")[0] + " " + scheduling.enddate.split(" ")[1] + " " + scheduling.enddate.split(" ")[2];

                /*if(pilotCode == 5 && scheduling.dimm > 0 && scheduling.dimm <= 100) scheduling.dimm = 100 - scheduling.dimm;
                else if(pilotCode == 5 && scheduling.dimm == 0) scheduling.dimm = 110;*/

                if(scheduling.dimm != 110 && exec != "11:00:00" && exec != "12:00:00"){
                    startdate.innerHTML = start;
                    enddate.innerHTML = end;
                    exectime.style.color = "#e0d335";
                }
                else if(scheduling.dimm == 110 && exec == "11:00:00"){
                    startdate.innerHTML = "---";
                    enddate.innerHTML = end;
                    exectime.style.color = "#F79C9C";
                }
                else if(exec == "12:00:00"){
                    enddate.innerHTML = end;
                    startdate.innerHTML = start;
                    exectime.style.color = "#A1D46E";
                }

                exectime.innerHTML = exec;
                if(scheduling.dimm != 110) dimming.innerHTML = scheduling.dimm;

                if(scheduling.priority == "1")priority.innerHTML = "Default";
                if(scheduling.priority == "2")priority.innerHTML = "Lowest";
                if(scheduling.priority == "3")priority.innerHTML = "Low";
                if(scheduling.priority == "4")priority.innerHTML = "High";

                if(!defined(scheduling.dayofweek) || scheduling.dayofweek == 1111111)
                    if(scheduling.dimm != 110) daysOfWeek.innerHTML = "Every Day";
                    else daysOfWeek.innerHTML = "Reset";
                else {
                    var calendar = "";

                    for(var j=0;j<scheduling.dayofweek.length;j++){
                        var day = parseInt(scheduling.dayofweek.charAt(j));

                        if(day == 1){
                            switch(j){
                                case 0 : calendar += "Sun"; break;
                                case 1 : calendar += "Mon"; break;
                                case 2 : calendar += "Tue"; break;
                                case 3 : calendar += "Wed"; break;
                                case 4 : calendar += "Thu"; break;
                                case 5 : calendar += "Fri"; break;
                                case 6 : calendar += "Sat"; break;
                                default : break;
                            }
                            calendar += ", ";
                        }
                    }
                    daysOfWeek.innerHTML = calendar.substring(0,calendar.length-2);
                }
                index++;
            }
        }

        if(index==0){
            var cell1 = row.insertCell(0);
            cell1.style.textAlign = "center";
            cell1.innerHTML = "No active schedulings available for this device";
        }
    }

    function RenderLightlineELEA_15(sos){
        done("renderizzo 1 h absolute consumption: " + (sos.length-1) + " valid observations");

        networkConsumption_15 = new Array();
        networkDate_15 = new Array();
        networkKWH_15 = new Array();

        if(sos.length>2){
            var prevValue = undefined;
            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = parseFloat(observation.split(",")[1]);

                if(!defined(prevValue)) prevValue = value;

                time = adjustToTimeZone(time);
                time = time.substring(11,16);

                if(value>0) networkConsumption_15[time] =  value - prevValue;
                else networkConsumption_15[time] =  0;
                networkDate_15[i-1] = time;

                prevValue = value;
            }

            for(var i=0;i<networkDate_15.length;i++){
                networkKWH_15[i] = networkConsumption_15[networkDate_15[i]];
            }

            for(var i=0;i<networkDate_15.length;i++){
                if((i)%4 != 0) networkDate_15[i] = "";
            }
        }
        else{
            networkKWH_15 = [0];
            networkDate_15 = [0];
        }

        if((defined(networkKWH_15)) && (defined(networkKWH_IPOW))){
            DisplayNetworkChart();
        }
    }

    function RenderLightlineELEA_1h(sos){
        done("renderizzo 15 min absolute consumption: " + (sos.length-1) + " valid observations");

        networkConsumption_1h = new Array();
        networkDate_1h = new Array();
        networkKWH_1h = new Array();

        if(sos.length>8){
            var index = 0;
            var prevValue = undefined;
            for(var i=1;i<sos.length;i+=4){
                var observation = sos[i];

                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = parseFloat(observation.split(",")[1]);

                if(!defined(prevValue)) prevValue = value;

                time = adjustToTimeZone(time);
                time = time.substring(11,16);

                if(value>0) networkConsumption_1h[time] = value - prevValue;
                else networkConsumption_1h[time] = value;
                networkDate_1h[index] = time;
                index++;
                prevValue = value;
            }

            for(var i=0;i<networkDate_1h.length;i++){
                networkKWH_1h[i] = networkConsumption_1h[networkDate_1h[i]];
            }

            var lineChartData_1h = {
                labels : networkDate_1h.slice(1, networkDate_1h.length-1),
                datasets : [
                    {
                        fillColor : "rgba(0,220,0,0.5)",
                        strokeColor : "rgba(0,220,0,1)",
                        pointColor : "rgba(0,220,0,1)",
                        pointStrokeColor : "#fff",
                        data : networkKWH_1h.slice(1, networkKWH_1h.length-1),
                        title : "Electrical Energy Consumption (KWh - Absolute) - 1 h"
                    }
                ]

            }

            clearChart("network-chart-fullscreen_1h-container", "network-chart-fullscreen_1h", 1180, 260, null);
            var myLine_1h = new Chart(document.getElementById("network-chart-fullscreen_1h").getContext("2d")).Bar(lineChartData_1h,optFILL);
        }
        else{
            clearChart("network-chart-fullscreen_1h-container", "network-chart-fullscreen_1h", 1180, 260, "1h");
        }
    }

    function RenderLightlineELEA_1d(sos){
        done("renderizzo 1 d consumption: " + (sos.length-1) + " valid observations");
        loadingIndicator.className="fullScreenLoaderHidden";

        networkConsumption_1d = new Array();
        networkDate_1d = new Array();
        networkKWH_1d = new Array();

        var prevValue = undefined;
        if(sos.length>2){
            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,10);
                var value = parseFloat(observation.split(",")[1]);

                if(!defined(prevValue)) prevValue = value;

                if(value>0) networkConsumption_1d[time] = value - prevValue;
                else networkConsumption_1d[time] = value;
                networkDate_1d[i-1] = time;
                prevValue = value;
            }

            for(var i=0;i<networkDate_1d.length;i++){
                networkKWH_1d[i] = networkConsumption_1d[networkDate_1d[i]];
            }

            var lineChartData_1d = {
                labels : networkDate_1d.slice(1, networkDate_1d.length-1),
                datasets : [
                    {
                        fillColor : "rgba(220,0,0,0.5)",
                        strokeColor : "rgba(220,0,0,1)",
                        pointColor : "rgba(220,0,0,1)",
                        pointStrokeColor : "#fff",
                        data : networkKWH_1d.slice(1, networkKWH_1d.length-1),
                        title : "Electrical Energy Consumption (KWh) - 1 d"
                    }
                ]

            }

            clearChart("network-chart-fullscreen_1d-container", "network-chart-fullscreen_1d", 1180, 260, null);
            var myLine_1d = new Chart(document.getElementById("network-chart-fullscreen_1d").getContext("2d")).Bar(lineChartData_1d,optFILL);
        }
        else{
            clearChart("network-chart-fullscreen_1d-container", "network-chart-fullscreen_1d", 1180, 260, "1d");
        }
    }

    function RenderLightlineELEA_1y(sos){
        done("renderizzo 1 y consumption: " + (sos.length-1) + " valid observations");
        loadingIndicator4stats.style.display = "none";

        networkConsumption_1y = new Array();
        networkDate_1y = new Array();
        networkKWH_1y = new Array();

        if(sos.length>1){
            var prevValue = undefined;

            document.getElementById("network-compare-container").style.display = "block";
            for(var i=0;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,7);
                var value = parseFloat(observation.split(",")[1]);

                var fromBillstoSensor = undefined;
                if(observation.split(",").length == 3) fromBillstoSensor = parseFloat(observation.split(",")[2])

                if(!defined(prevValue)) prevValue = value;

                if(value>0) networkConsumption_1y[time] = value - prevValue;
                else networkConsumption_1y[time] = Math.abs(value); //I VALORI STORICI RELATIVI SONO ASSOLUTI!!
                networkDate_1y[i] = time;

                if(defined(fromBillstoSensor)) value = fromBillstoSensor;
                prevValue = Math.abs(value);
            }

            for(var i=0;i<networkDate_1y.length;i++){
                networkKWH_1y[i] = networkConsumption_1y[networkDate_1y[i]];
            }

            var lineChartData_1y = {
                labels : networkDate_1y,
                datasets : [
                    {
                        fillColor : "rgba(0,0,220,0.5)",
                        strokeColor : "rgba(0,0,220,1)",
                        pointColor : "rgba(0,0,220,1)",
                        pointStrokeColor : "#fff",
                        data : networkKWH_1y,
                        title : "Electrical Energy Consumption (KWh) - 1 y"
                    }
                ]

            }

            clearChart("network-chart-container", "network-chart", 400, 300, null);
            var myLine_1d = new Chart(document.getElementById("network-chart").getContext("2d")).Bar(lineChartData_1y,optFILL);
        }
        else{
            loadingIndicator4stats.style.display = "block";
        }
    }

    function RenderLightlineELEA_1yComparison(sos){
        done("renderizzo 1 y consumption comparison: " + (sos.length-1) + " valid observations");
        loadingIndicator4stats.style.display = "none";

        networkConsumption_1yComparison = new Array();
        networkDate_1yComparison = new Array();
        networkKWH_1yComparison = new Array();

        var prevValue = undefined;
        if(sos.length>1){
            document.getElementById("network-compare-container").style.display = "block";
            for(var i=0;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,7);
                var value = parseFloat(observation.split(",")[1]);

                var fromBillstoSensor = undefined;
                if(observation.split(",").length == 3) fromBillstoSensor = parseFloat(observation.split(",")[2])

                if(!defined(prevValue)) prevValue = value;

                if(value>0) networkConsumption_1yComparison[time] = value - prevValue;
                else networkConsumption_1yComparison[time] = Math.abs(value); //I VALORI STORICI RELATIVI SONO ASSOLUTI!!
                networkDate_1yComparison[i] = time;

                if(defined(fromBillstoSensor)) value = fromBillstoSensor;
                prevValue = Math.abs(value);
            }

            for(var i=0;i<networkDate_1yComparison.length;i++){
                networkKWH_1yComparison[i] = networkConsumption_1yComparison[networkDate_1yComparison[i]];
            }

            for(var i=0;i<networkDate_1yComparison.length;i++){
                networkDate_1yComparison[i] = month[parseInt(networkDate_1yComparison[i].substring(5,7))-1];
            }

            var datasets = new Array();
            datasets.push({strokeColor : "rgba(0,0,220,1)",fillColor : "rgba(0,0,220,0.5)",data : networkKWH_1y.slice(1, networkKWH_1y.length-1),title: "Current Trend"});
            datasets.push({strokeColor : "rgba(220,0,0,1)",fillColor : "rgba(220,0,0,0.5)",data : networkKWH_1yComparison.slice(1, networkKWH_1yComparison.length-1),title: "Compared Trend"});

            var ChartData = {labels : networkDate_1yComparison.slice(1, networkDate_1yComparison.length-1),datasets : datasets};

            clearChart("network-chart-container", "network-chart", 400, 300, null);
            var myLine_1d = new Chart(document.getElementById("network-chart").getContext("2d")).Bar(ChartData,optFILL);
        }
        else{
            loadingIndicator4stats.style.display = "block";
        }
    }

    function RenderLightlineIPOWA_15(sos){
        done("renderizzo 15 min absolute power: " + (sos.length-1) + " valid observations");

        networkConsumption_IPOW = new Array();
        networkDate_IPOW = new Array();
        networkKWH_IPOW = new Array();

        if(sos.length>2){
            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                time = adjustToTimeZone(time);
                time = time.substring(11,16);

                networkConsumption_IPOW[time] = value;
                networkDate_IPOW[i-1] = time;
            }

            for(var i=0;i<networkDate_IPOW.length;i++){
                networkKWH_IPOW[i] = networkConsumption_IPOW[networkDate_IPOW[i]];
            }

            for(var i=0;i<networkDate_IPOW.length;i++){
                if((i)%4 != 0) networkDate_IPOW[i] = "";
            }
        }
        else{
            networkKWH_IPOW = [0];
            networkDate_IPOW = [0];
        }

        if((defined(networkKWH_15)) && (defined(networkKWH_IPOW))){
            DisplayNetworkChart();
        }
    }

    function RenderLightlineELE_15(sos){
        done("renderizzo 15 min consumption: " + (sos.length-1) + " valid observations");

        networkConsumption_15 = new Array();
        networkDate_15 = new Array();
        networkKWH_15 = new Array();

        if(sos.length>2){

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[1].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                time = adjustToTimeZone(time);
                time = time.substring(11,16);

                networkConsumption_15[time] = value;
                networkDate_15[i-1] = time;
            }

            for(var i=0;i<networkDate_15.length;i++){
                networkKWH_15[i] = networkConsumption_15[networkDate_15[i]];
            }

            for(var i=0;i<networkDate_15.length;i++){
                if((i)%4 != 0) networkDate_15[i] = "";
            }

            var lineChartData = {
                labels : networkDate_15,
                datasets : [
                    {
                        fillColor : "rgba(220,220,0,0.5)",
                        strokeColor : "rgba(220,220,0,1)",
                        pointColor : "rgba(220,220,0,1)",
                        pointStrokeColor : "#fff",
                        data : networkKWH_15,
                        title : "Electrical Energy Consumption (KWh) - 15 min"
                    }
                ]

            }

            clearChart("network-chart-fullscreen_15-container", "network-chart-fullscreen_15", 1180, 260, null);
            var myLine = new Chart(document.getElementById("network-chart-fullscreen_15").getContext("2d")).Bar(lineChartData,optFILL);
        }
        else{
            clearChart("network-chart-fullscreen_15-container", "network-chart-fullscreen_15", 1180, 260, "15");
        }
    }

    function RenderLightlineELE_1h(sos){
        done("renderizzo 1 h consumption: " + (sos.length-1) + " valid observations");

        networkConsumption_1h = new Array();
        networkDate_1h = new Array();
        networkKWH_1h = new Array();

        if(sos.length>2){

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[1].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                time = adjustToTimeZone(time);
                time = time.substring(11,16);

                networkConsumption_1h[time] = value;
                networkDate_1h[i-1] = time;
            }

            for(var i=0;i<networkDate_1h.length;i++){
                networkKWH_1h[i] = networkConsumption_1h[networkDate_1h[i]];
            }

            var lineChartData_1h = {
                labels : networkDate_1h,
                datasets : [
                    {
                        fillColor : "rgba(0,220,0,0.5)",
                        strokeColor : "rgba(0,220,0,1)",
                        pointColor : "rgba(0,220,0,1)",
                        pointStrokeColor : "#fff",
                        data : networkKWH_1h,
                        title : "Electrical Energy Consumption (KWh) - 1 h"
                    }
                ]

            }
            clearChart("network-chart-fullscreen_1h-container", "network-chart-fullscreen_1h", 1180, 260, null);
            var myLine_1h = new Chart(document.getElementById("network-chart-fullscreen_1h").getContext("2d")).Bar(lineChartData_1h,optFILL);
        }
        else{
            clearChart("network-chart-fullscreen_1h-container", "network-chart-fullscreen_1h", 1180, 260, "1h");
        }
    }

    function RenderLightlineELE_1d(sos){
        done("renderizzo 1 d consumption: " + (sos.length-1) + " valid observations");
        loadingIndicator.className="fullScreenLoaderHidden";

        networkConsumption_1d = new Array();
        networkDate_1d = new Array();
        networkKWH_1d = new Array();

        if(sos.length>2){
            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,10);
                var value = observation.split(",")[1];

                networkConsumption_1d[time] = value;
                networkDate_1d[i-1] = time;
            }

            for(var i=0;i<networkDate_1d.length;i++){
                networkKWH_1d[i] = networkConsumption_1d[networkDate_1d[i]];
            }

            var lineChartData_1d = {
                labels : networkDate_1d,
                datasets : [
                    {
                        fillColor : "rgba(220,0,0,0.5)",
                        strokeColor : "rgba(220,0,0,1)",
                        pointColor : "rgba(220,0,0,1)",
                        pointStrokeColor : "#fff",
                        data : networkKWH_1d,
                        title : "Electrical Energy Consumption (KWh) - 1 d"
                    }
                ]

            }

            clearChart("network-chart-fullscreen_1d-container", "network-chart-fullscreen_1d", 1180, 260, null);
            var myLine_1d = new Chart(document.getElementById("network-chart-fullscreen_1d").getContext("2d")).Bar(lineChartData_1d,optFILL);
        }
        else{
            clearChart("network-chart-fullscreen_1d-container", "network-chart-fullscreen_1d", 1180, 260, "1d");
        }
    }

    function RenderLightlineELE_1y(sos){
        done("renderizzo 1 y consumption: " + (sos.length-1) + " valid observations");
        loadingIndicator4stats.style.display = "none";

        networkConsumption_1y = new Array();
        networkDate_1y = new Array();
        networkKWH_1y = new Array();

        if(sos.length>2){
            document.getElementById("network-compare-container").style.display = "block";
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
                    networkConsumption_1y[prevTime] = prevConsu;
                    networkDate_1y[index] = prevTime;

                    prevTime = time;
                    prevMonth = month;
                    prevConsu = 0;
                    index ++;
                }
                else{
                    prevConsu += value;
                }
            }

            networkConsumption_1y[prevTime] = prevConsu;
            networkDate_1y[index] = prevTime;

            for(var i=0;i<networkDate_1y.length;i++){
                networkKWH_1y[i] = networkConsumption_1y[networkDate_1y[i]];
            }

            //console.log(networkDate_1y);
            //console.log(networkKWH_1y);

            var lineChartData_1y = {
                labels : networkDate_1y,
                datasets : [
                    {
                        fillColor : "rgba(0,0,220,0.5)",
                        strokeColor : "rgba(0,0,220,1)",
                        pointColor : "rgba(0,0,220,1)",
                        pointStrokeColor : "#fff",
                        data : networkKWH_1y,
                        title : "Electrical Energy Consumption (KWh) - 1 y"
                    }
                ]

            }

            clearChart("network-chart-container", "network-chart", 400, 300, null);
            var myLine_1d = new Chart(document.getElementById("network-chart").getContext("2d")).Bar(lineChartData_1y,optFILL);
        }
        else{
            loadingIndicator4stats.style.display = "block";
        }
    }

    function RenderLightlineELE_1yComparison(sos){
        done("renderizzo 1 y consumption comparison: " + (sos.length-1) + " valid observations");
        loadingIndicator4stats.style.display = "none";

        networkConsumption_1yComparison = new Array();
        networkDate_1yComparison = new Array();
        networkKWH_1yComparison = new Array();

        if(sos.length>2){
            document.getElementById("network-compare-container").style.display = "block";
            var prevMonth = undefined;
            var prevTime = undefined;
            var prevConsu = 0;
            var index = 0;

            //console.log(networkDate_1y);
            //console.log(networkKWH_1y);

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,7);
                var currentMonth = time;
                var value = parseFloat(observation.split(",")[1]);

                if(i==1) {prevMonth = currentMonth; prevTime = time};

                if(currentMonth != prevMonth){
                    networkConsumption_1yComparison[prevTime] = prevConsu;
                    networkDate_1yComparison[index] = prevTime;

                    prevMonth = currentMonth;
                    prevTime = time;
                    prevConsu = 0;
                    index ++;
                }
                else{
                    prevConsu += value;
                }
            }

            networkConsumption_1yComparison[prevTime] = prevConsu;
            networkDate_1yComparison[index] = prevTime;

            for(var i=0;i<networkDate_1yComparison.length;i++){
                networkKWH_1yComparison[i] = networkConsumption_1yComparison[networkDate_1yComparison[i]];
            }

            for(var i=0;i<networkDate_1yComparison.length;i++){
                networkDate_1yComparison[i] = month[parseInt(networkDate_1yComparison[i].substring(5,7))-1];
            }

            //console.log(networkDate_1yComparison);
            //console.log(networkKWH_1yComparison);

            var datasets = new Array();
            datasets.push({strokeColor : "rgba(0,0,220,1)",fillColor : "rgba(0,0,220,0.5)",data : networkKWH_1y,title: new Date().getFullYear() + " Trend"});
            datasets.push({strokeColor : "rgba(220,0,0,1)",fillColor : "rgba(220,0,0,0.5)",data : networkKWH_1yComparison,title: "Compared Trend"});

            var ChartData = {labels : networkDate_1yComparison,datasets : datasets};

            clearChart("network-chart-container", "network-chart", 400, 300, null);
            var myLine_1d = new Chart(document.getElementById("network-chart").getContext("2d")).Bar(ChartData,optFILL);
        }
        else{
            loadingIndicator4stats.style.display = "block";
        }
    }

    function RenderLightlineSUNS_1d(sos){
        done("renderizzo 1 d sunshine");
        var sunshine = document.getElementById("networkanalysis-sunshine");

        if(sos.length>1){
            var observation = sos[sos.length-1];
            var value = observation.split(",")[1];

            networkSUNS_HMS = value.split(" ")[1];
            sunshine.textContent = networkSUNS_HMS;
        }
        else{
            sunshine.textContent = "NO DATA";
        }
    }

    function RenderLightlineSUNR_1d(sos){
        done("renderizzo 1 d sunrise");
        var sunrise = document.getElementById("networkanalysis-sunrise");

        if(sos.length>1){
            var observation = sos[sos.length-1];
            var value = observation.split(",")[1];

            networkSUNR_HMS = value.split(" ")[1];
            sunrise.textContent = networkSUNR_HMS;
        }
        else{
            sunrise.textContent = "NO DATA";
        }
    }

    function RenderLightlineLIFE_1d(sos){
        done("renderizzo 1 d life");
        var life = document.getElementById("networkanalysis-life");

        if(sos.length>1){
            var observation = sos[sos.length-1];
            var value = observation.split(",")[1];

            networkLIFE_HRS = value;
            life.textContent = networkLIFE_HRS;
        }
        else{
            life.textContent = "NO DATA";
        }
    }

    function RenderLightlineNALL_1d(sos){
        done("renderizzo 1 d nall");
        var nok = document.getElementById("networkanalysis-nall");

        if(sos.length>1){
            var observation = sos[sos.length-1];
            var value = observation.split(",")[1];

            networkNALL_NUM = value;
            nok.textContent = networkNALL_NUM;
        }
        else{
            nok.textContent = "NO DATA";
        }
    }

    function RenderLightlineNOK_1d(sos){
        done("renderizzo 1 d nok");
        var nok = document.getElementById("networkanalysis-nok");

        if(sos.length>1){
            var observation = sos[sos.length-1];
            var value = observation.split(",")[1];

            networkNOK_NUM = value;
            nok.textContent = networkNOK_NUM;
        }
        else{
            nok.textContent = "NO DATA";
        }
    }

    function RenderLightlineONOF_1d(sos){
        done("renderizzo 1 d onof");
        var onof = document.getElementById("networkanalysis-onof");

        if(sos.length>1){
            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                time = adjustToTimeZone(time);
                time = time.substring(11,16);

                if(value == "false") networkONOF_BOO += time + " ON"  + "<br/>";
                else networkONOF_BOO += time + " OFF";

                onof.innerHTML = networkONOF_BOO;
            }
        }
        else{
            onof.textContent = "NO DATA";
        }
    }

    function RenderLampDIMM (sos){
        done("renderizzo ir dimming: " + (sos.length-1) + " valid observations");

        lampConsumption_DIMM = new Array();
        lampDate_DIMM = new Array();
        lampPERC_DIMM = new Array();

        if(sos.length>2){
            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                time = adjustToTimeZone(time);
                time = time.substring(11,16);

                if(pilotCode == 5) lampConsumption_DIMM[time] = 1-(value/100);
                else lampConsumption_DIMM[time] = value/100;

                lampDate_DIMM[i-1] = time;
            }

            for(var i=0;i<lampDate_DIMM.length;i++){
                lampPERC_DIMM[i] = lampConsumption_DIMM[lampDate_DIMM[i]];
            }
        }
        else{
            lampPERC_DIMM = [0];
            lampDate_DIMM = [0];
        }

        if((defined(lampWAT_IPOW)) && (defined(lampVOL_IVOL)) && (defined(lampAMP_ICUR)) && (defined(lampNUL_COSF)) && (defined(lampPERC_DIMM))){
            DisplayLampChart();
        }
    }

    function RenderLampIPOW(sos){
        done("renderizzo ir power: " + (sos.length-1) + " valid observations");

        lampConsumption_IPOW = new Array();
        lampDate_IPOW = new Array();
        lampWAT_IPOW = new Array();

        if(sos.length>2){

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                time = adjustToTimeZone(time);
                time = time.substring(11,16);

                lampConsumption_IPOW[time] = value;
                lampDate_IPOW[i-1] = time;
            }

            for(var i=0;i<lampDate_IPOW.length;i++){
                lampWAT_IPOW[i] = lampConsumption_IPOW[lampDate_IPOW[i]];
            }
        }
        else{
            lampWAT_IPOW = [0];
            lampDate_IPOW = [0];
        }

        if((defined(lampWAT_IPOW)) && (defined(lampVOL_IVOL)) && (defined(lampAMP_ICUR)) && (defined(lampNUL_COSF)) && (defined(lampPERC_DIMM))){
            DisplayLampChart();
        }
    }

    function RenderLampICUR(sos){
        done("renderizzo ir cur: " + (sos.length-1) + " valid observations");

        lampConsumption_ICUR = new Array();
        lampDate_ICUR = new Array();
        lampAMP_ICUR = new Array();

        if(sos.length>2){

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                time = adjustToTimeZone(time);
                time = time.substring(11,16);

                lampConsumption_ICUR[time] = value;
                lampDate_ICUR[i-1] = time;
            }

            for(var i=0;i<lampDate_ICUR.length;i++){
                lampAMP_ICUR[i] = lampConsumption_ICUR[lampDate_ICUR[i]];
            }
        }
        else{
            lampAMP_ICUR = [0];
            lampDate_ICUR = [0];
        }

        if((defined(lampWAT_IPOW)) && (defined(lampVOL_IVOL)) && (defined(lampAMP_ICUR)) && (defined(lampNUL_COSF)) && (defined(lampPERC_DIMM))){
            DisplayLampChart();
        }
    }

    function RenderLampIVOL(sos){
        done("renderizzo ir volt: " + (sos.length-1) + " valid observations");

        lampConsumption_IVOL = new Array();
        lampDate_IVOL = new Array();
        lampVOL_IVOL = new Array();

        if(sos.length>2){
            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                time = adjustToTimeZone(time);
                time = time.substring(11,16);

                lampConsumption_IVOL[time] = value;
                lampDate_IVOL[i-1] = time;
            }

            for(var i=0;i<lampDate_IVOL.length;i++){
                lampVOL_IVOL[i] = lampConsumption_IVOL[lampDate_IVOL[i]];
            }
        }
        else{
            lampVOL_IVOL = [0];
            lampDate_IVOL = [0];
        }

        if(defined(lampWAT_IPOW) && defined(lampVOL_IVOL) && defined(lampAMP_ICUR) && defined(lampNUL_COSF) && defined(lampPERC_DIMM)){
            DisplayLampChart();
        }
    }

    function RenderLampCOSF(sos){
        done("renderizzo ir cosf: " + (sos.length-1) + " valid observations");

        lampConsumption_COSF = new Array();
        lampDate_COSF = new Array();
        lampNUL_COSF = new Array();

        if(sos.length>2){

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                time = adjustToTimeZone(time);
                time = time.substring(11,16);

                lampConsumption_COSF[time] = value;
                lampDate_COSF[i-1] = time;
            }

            for(var i=0;i<lampDate_COSF.length;i++){
                lampNUL_COSF[i] = lampConsumption_COSF[lampDate_COSF[i]];
            }
        }
        else{
            lampNUL_COSF = [0];
            lampDate_COSF = [0];
        }

        if(defined(lampWAT_IPOW) && defined(lampVOL_IVOL) && defined(lampAMP_ICUR) && defined(lampNUL_COSF) && defined(lampPERC_DIMM)){
            DisplayLampChart();
        }
    }

    function RenderLampSTAT_1d(sos){
        done("renderizzo 1d lamp stat: " + (sos.length-1) + " valid observations");
        var status = document.getElementById("lampanalysis-status");

        if(sos.length>2){

            for(var i=1;i<sos.length;i++){
                var observation = sos[i];
                var time = observation.split(",")[0].split("/")[0].replace("T", " ").replace("Z", "").substring(0,16);
                var value = observation.split(",")[1];

                time = adjustToTimeZone(time);
                time = time.substring(11,16);

                if(value == "0") lampSTAT_NUL += time + " OFF"  + "<br/>";
                if(value == "1") lampSTAT_NUL += time + " ON"  + "<br/>";
                if(value == "2") lampSTAT_NUL += time + " FAULT"  + "<br/>";
                if(value == "3") lampSTAT_NUL += time + " NOT CONNECTED"  + "<br/>";
                if(value == "200") lampSTAT_NUL += time + " UNKNOW ERROR"  + "<br/>";

                status.innerHTML = lampSTAT_NUL;
            }
        }
        else{
            status.textContent = "NO DATA";
        }
    }

    function RenderLampLIFE_1ir(sos){
        done("renderizzo 1 d life");
        var life = document.getElementById("lampanalysis-status");

        if(sos.length>1){
            var observation = sos[sos.length-1];
            var value = observation.split(",")[1];

            lampLIFE_HRS = value;
            life.textContent = lampLIFE_HRS + " Working hours";
        }
        else{
            life.textContent = "NO DATA";
        }
    }

    function RenderLampSTAT_CUMULATVE(lamps){
        done("renderizzo status lampade");
        var container1 = document.getElementById("network-lamps-list");
        var container2 = document.getElementById("network-lamps-list2");
        var container3 = document.getElementById("network-lamps-list3");
        var container4 = document.getElementById("network-lamps-list4");
        var container5 = document.getElementById("network-lamps-list5");
        var container6 = document.getElementById("network-lamps-list6");
        var container7 = document.getElementById("network-lamps-list7");
        var container8 = document.getElementById("network-lamps-list8");

        if(lamps.length>0){
            var index = 0;
            for(var i=0;i<lamps.length;i++){
                var observation = lamps[i];

                var element = document.createElement('li');
                element.style.paddingBottom = "5px";

                var status = document.createElement('div');
                status.className = "lampptions";

                if(!defined(observation[0])){
                    status.style.borderColor = "#565451";
                }
                else{
                    var values = observation[0];

                    for(var key in values){
                        if(values[key] == "0" || values[key] != "1"){
                            status.style.borderColor = "#DC0000";
                            break;
                        }
                    }
                }

                element.appendChild(status);

                var link = document.createElement('a');
                link.id = "network-lamps-status-" + observation.name;
                link.name = pilotName + "|" + observation.name + "|lamp|" + observation.id;
                link.textContent = observation.name;
                link.href = "#";
                link.className = "lampelement";
                link.onclick = function(){new Scenario3().DisplayNetworkDetails(this.name)}
                element.appendChild(link);


                if(($(link.id).length)==0){
                    if(index%8==0) container1.appendChild(element);
                    else if(index%8==1) container2.appendChild(element);
                    else if(index%8==2) container3.appendChild(element);
                    else if(index%8==3) container4.appendChild(element);
                    else if(index%8==4) container5.appendChild(element);
                    else if(index%8==5) container6.appendChild(element);
                    else if(index%8==6) container7.appendChild(element);
                    else if(index%8==7) container8.appendChild(element);
                    index++;
                }
            }
            document.getElementById("network-lamps-status-table").style.display = "block";
        }
        else{
            document.getElementById("network-lamps-status-table").style.display = "none";
        }
    }

    function RenderLightlineSTAT_SCHEDULING(history){
        done("renderizzo scheduling attivi su questa linea");
        $("#network-all-configurations-table").empty();

        if(history.length>0){
            console.log(history);
            var index = 0;
            var table = document.getElementById("network-all-configurations-table");

            var row = table.insertRow(0);
            row.style.fontSize = "15px";
            row.style.fontWeight = 900;

            var dev = row.insertCell(0);
            dev.innerHTML = "DEVICE";

            var startdate = row.insertCell(1);
            startdate.innerHTML = "START";

            var enddate = row.insertCell(2);
            enddate.innerHTML = "END";

            var exectime = row.insertCell(3);
            exectime.innerHTML = "EXECUTION TIME";

            var dimming = row.insertCell(4);
            dimming.innerHTML = "POWER %";

            var priority = row.insertCell(5);
            priority.innerHTML = "PRIORITY";

            var daysOfWeek = row.insertCell(6);
            daysOfWeek.innerHTML = "REPETITION";

            for(var i=0;i<history.length;i++){
                var device = history[i].scheduling;

                for(var k=0;k<device.length;k++){
                    var scheduling = device[k];

                    if(scheduling.next_fire != "EXPIRED"){
                        var row = table.insertRow(index+1);

                        var dev = row.insertCell(0);
                        var startdate = row.insertCell(1);
                        var enddate = row.insertCell(2);
                        var exectime = row.insertCell(3);
                        var dimming = row.insertCell(4);
                        var priority = row.insertCell(5);
                        var daysOfWeek = row.insertCell(6);

                        dev.style.fontWeight = 400;
                        dev.innerHTML = history[i].name;

                        var exec = scheduling.next_fire.split(" ")[3];
                        var start = scheduling.startdate.split(" ")[0] + " " + scheduling.startdate.split(" ")[1] + " " + scheduling.startdate.split(" ")[2];
                        var end = scheduling.enddate.split(" ")[0] + " " + scheduling.enddate.split(" ")[1] + " " + scheduling.enddate.split(" ")[2];

                        /*if(pilotCode == 5 && scheduling.dimm > 0 && scheduling.dimm <= 100) scheduling.dimm = 100 - scheduling.dimm;
                        else if(pilotCode == 5 && scheduling.dimm == 0) scheduling.dimm = 110;*/

                        if(scheduling.dimm != 110 && exec != "11:00:00" && exec != "12:00:00"){
                            startdate.innerHTML = start;
                            enddate.innerHTML = end;
                            exectime.style.color = "#e0d335";
                        }
                        else if(scheduling.dimm == 110 && exec == "11:00:00"){
                            startdate.innerHTML = "---";
                            enddate.innerHTML = end;
                            exectime.style.color = "#F79C9C";
                        }
                        else if(exec == "12:00:00"){
                            enddate.innerHTML = end;
                            startdate.innerHTML = start;
                            exectime.style.color = "#A1D46E";
                        }

                        exectime.innerHTML = exec;
                        if(scheduling.dimm != 110) dimming.innerHTML = scheduling.dimm;

                        if(scheduling.priority == "1")priority.innerHTML = "Default";
                        if(scheduling.priority == "2")priority.innerHTML = "Lowest";
                        if(scheduling.priority == "3")priority.innerHTML = "Low";
                        if(scheduling.priority == "4")priority.innerHTML = "High";


                        if(!defined(scheduling.dayofweek) || scheduling.dayofweek == 1111111)
                            if(scheduling.dimm != 110) daysOfWeek.innerHTML = "Every Day";
                            else daysOfWeek.innerHTML = "Reset";
                        else {
                            var calendar = "";

                            for(var j=0;j<scheduling.dayofweek.length;j++){
                                var day = parseInt(scheduling.dayofweek.charAt(j));

                                if(day == 1){
                                    switch(j){
                                        case 0 : calendar += "Sun"; break;
                                        case 1 : calendar += "Mon"; break;
                                        case 2 : calendar += "Tue"; break;
                                        case 3 : calendar += "Wed"; break;
                                        case 4 : calendar += "Thu"; break;
                                        case 5 : calendar += "Fri"; break;
                                        case 6 : calendar += "Sat"; break;
                                        default : break;
                                    }
                                    calendar += ", ";
                                }
                            }
                            daysOfWeek.innerHTML = calendar.substring(0,calendar.length-2);
                        }
                        index++;
                    }
                }
            }

            if(index == 0) document.getElementById("network-all-configurations").style.display = "none";
            else document.getElementById("network-all-configurations").style.display = "block";
        }
        else{
            document.getElementById("network-all-configurations").style.display = "none";
        }
    }

    function RenderGroupsSTAT_SCHEDULING(history){
        done("renderizzo scheduling attivi sui gruppi di questo pilot");
        $("#network-all-configurations-groups-table").empty();

        if(history.length>0){
            console.log(history);
            var index = 0;
            var table = document.getElementById("network-all-configurations-groups-table");

            var row = table.insertRow(0);
            row.style.fontSize = "15px";
            row.style.fontWeight = 900;

            var dev = row.insertCell(0);
            dev.innerHTML = "GROUP";

            var startdate = row.insertCell(1);
            startdate.innerHTML = "START";

            var enddate = row.insertCell(2);
            enddate.innerHTML = "END";

            var exectime = row.insertCell(3);
            exectime.innerHTML = "EXECUTION TIME";

            var dimming = row.insertCell(4);
            dimming.innerHTML = "POWER %";

            var priority = row.insertCell(5);
            priority.innerHTML = "PRIORITY";

            var daysOfWeek = row.insertCell(6);
            daysOfWeek.innerHTML = "REPETITION";

            for(var i=0;i<history.length;i++){
                var device = history[i].scheduling;

                for(var k=0;k<device.length;k++){
                    var scheduling = device[k];

                    if(scheduling.next_fire != "EXPIRED"){
                        var row = table.insertRow(index+1);

                        var dev = row.insertCell(0);
                        var startdate = row.insertCell(1);
                        var enddate = row.insertCell(2);
                        var exectime = row.insertCell(3);
                        var dimming = row.insertCell(4);
                        var priority = row.insertCell(5);
                        var daysOfWeek = row.insertCell(6);

                        dev.style.fontWeight = 400;
                        dev.innerHTML = history[i].name;

                        var exec = scheduling.next_fire.split(" ")[3];
                        var start = scheduling.startdate.split(" ")[0] + " " + scheduling.startdate.split(" ")[1] + " " + scheduling.startdate.split(" ")[2];
                        var end = scheduling.enddate.split(" ")[0] + " " + scheduling.enddate.split(" ")[1] + " " + scheduling.enddate.split(" ")[2];

                        /*if(pilotCode == 5 && scheduling.dimm > 0 && scheduling.dimm <= 100) scheduling.dimm = 100 - scheduling.dimm;
                        else if(pilotCode == 5 && scheduling.dimm == 0) scheduling.dimm = 110;*/

                        if(scheduling.dimm != 110 && exec != "11:00:00" && exec != "12:00:00"){
                            startdate.innerHTML = start;
                            enddate.innerHTML = end;
                            exectime.style.color = "#e0d335";
                        }
                        else if(scheduling.dimm == 110 && exec == "11:00:00"){
                            startdate.innerHTML = "---";
                            enddate.innerHTML = end;
                            exectime.style.color = "#F79C9C";
                        }
                        else if(exec == "12:00:00"){
                            enddate.innerHTML = end;
                            startdate.innerHTML = start;
                            exectime.style.color = "#A1D46E";
                        }

                        exectime.innerHTML = exec;
                        if(scheduling.dimm != 110) dimming.innerHTML = scheduling.dimm;

                        if(scheduling.priority == "1")priority.innerHTML = "Default";
                        if(scheduling.priority == "2")priority.innerHTML = "Lowest";
                        if(scheduling.priority == "3")priority.innerHTML = "Low";
                        if(scheduling.priority == "4")priority.innerHTML = "High";


                        if(!defined(scheduling.dayofweek) || scheduling.dayofweek == 1111111)
                            if(scheduling.dimm != 110) daysOfWeek.innerHTML = "Every Day";
                            else daysOfWeek.innerHTML = "Reset";
                        else {
                            var calendar = "";

                            for(var j=0;j<scheduling.dayofweek.length;j++){
                                var day = parseInt(scheduling.dayofweek.charAt(j));

                                if(day == 1){
                                    switch(j){
                                        case 0 : calendar += "Sun"; break;
                                        case 1 : calendar += "Mon"; break;
                                        case 2 : calendar += "Tue"; break;
                                        case 3 : calendar += "Wed"; break;
                                        case 4 : calendar += "Thu"; break;
                                        case 5 : calendar += "Fri"; break;
                                        case 6 : calendar += "Sat"; break;
                                        default : break;
                                    }
                                    calendar += ", ";
                                }
                            }
                            daysOfWeek.innerHTML = calendar.substring(0,calendar.length-2);
                        }
                        index++;
                    }
                }
            }

            if(index == 0) document.getElementById("network-all-configurations-groups").style.display = "none";
            else document.getElementById("network-all-configurations-groups").style.display = "block";
        }
        else{
            document.getElementById("network-all-configurations-groups").style.display = "none";
        }
    }

    function DisplayLampChart(){
        loadingIndicator.className="fullScreenLoaderHidden";

        var labels;
        var maxElement = Math.max((lampDate_IPOW.length),(lampDate_IVOL.length),(lampDate_ICUR.length),(lampDate_COSF.length),(lampDate_DIMM.length));
        if(maxElement>1){
            if(lampDate_IPOW.length == maxElement) labels = lampDate_IPOW;
            else if(lampDate_IVOL.length == maxElement) labels = lampDate_IVOL;
            else if(lampDate_ICUR.length == maxElement) labels = lampDate_ICUR;
            else if(lampDate_COSF.length == maxElement) labels = lampDate_COSF;
            else if(lampDate_DIMM.length == maxElement) labels = lampDate_DIMM;

            var datasets = new Array();
            if(max(lampWAT_IPOW) != 0) datasets.push({type: "Line",strokeColor : "rgba(220,0,0,1)",pointColor : "rgba(220,0,0,1)",pointStrokeColor : "#fff",data : lampWAT_IPOW,title: "Instant Power (Watt)",axis : 1});
            if(max(lampVOL_IVOL) != 0) datasets.push({type: "Line",strokeColor : "rgba(0,220,0,1)",pointColor : "rgba(0,220,0,1)",pointStrokeColor : "#fff",data : lampVOL_IVOL,title: "Instant Voltage (V)",axis : 1});
            if(max(lampAMP_ICUR) != 0) datasets.push({type: "Line",strokeColor : "rgba(0,183,243,1)",pointColor : "rgba(0,183,243,1)",pointStrokeColor : "#fff",data : lampAMP_ICUR,title: "Instant Current (A)",axis : 1});
            if(max(lampNUL_COSF) != 0) datasets.push({type: "Line",strokeColor : "rgba(209,209,224,1)",pointColor : "rgba(209,209,224,1)",pointStrokeColor : "#fff",data : lampNUL_COSF,title: "CosFI",axis : 2});
            if(max(lampPERC_DIMM) != 0) datasets.push({fillColor : "rgba(220,220,0,0.5)",strokeColor : "rgba(220,220,0,1)",graphMax2 : 1,data : lampPERC_DIMM,title: "Dimming (0-1)",axis : 2});

            if(datasets.length>0){
                var ChartData = {labels : labels,datasets : datasets};

                clearChart("lamp-chart-fullscreen-container", "lamp-chart-fullscreen", 1180, 360, null);
                var myLine = new Chart(document.getElementById("lamp-chart-fullscreen").getContext("2d")).Bar(ChartData,optNOTFILLDoubleY);
            }
            else{
                error("Grafico double Y LAMPADE con dati tutti a 0");
                clearChart("lamp-chart-fullscreen-container", "lamp-chart-fullscreen", 1180, 360, null);
            }
        }
        else clearChart("lamp-chart-fullscreen-container", "lamp-chart-fullscreen", 1180, 360, "irr");
    }

    function DisplayNetworkChart(){
        var labels;
        var maxElement = Math.max((networkDate_15.length),(networkDate_IPOW.length));
        if(maxElement>1){
            if(networkDate_15.length == maxElement) labels = networkDate_15;
            else if(networkDate_IPOW.length == maxElement) labels = networkDate_IPOW;

            var datasets = new Array();
            if(max(networkKWH_15) != 0) datasets.push({strokeColor : "rgba(220,220,0,1)",fillColor : "rgba(220,220,0,0.5)",pointColor : "rgba(220,220,0,1)",pointStrokeColor : "#fff",data : networkKWH_15,title: "Electrical Energy Consumption (KWh - Absolute) - 15 min",axis : 1});
            if(max(networkKWH_IPOW) != 0) datasets.push({type: "Line", strokeColor : "rgba(220,0,0,1)",pointColor : "rgba(220,0,0,1)",pointStrokeColor : "#fff",data : networkKWH_IPOW,title: "Instant Power (KWh - Absolute) - 15 min",axis : 2});
            if(datasets.length>0){
                var ChartData = {labels : labels,datasets : datasets};

                clearChart("network-chart-fullscreen_15-container", "network-chart-fullscreen_15", 1180, 260, null);
                var myLine = new Chart(document.getElementById("network-chart-fullscreen_15").getContext("2d")).Bar(ChartData,optNOTFILLDoubleY);
            }
            else{
                error("Grafico double Y NETWORK con dati tutti a 0");
                clearChart("network-chart-fullscreen_15-container", "network-chart-fullscreen_15", 1180, 260, "15");
            }
        }
        else clearChart("network-chart-fullscreen_15-container", "network-chart-fullscreen_15", 1180, 260, "15");
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

    function getTimeZone(time){

        var lastDay = [31,28,31,30,31,30,31,31,30,31,30,31];
        var march = 3 -1;
        var october = 10 -1;

        var year = new Date(time).getFullYear();

        var summer;
        var winter;

        if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) lastDay[2] = 29

        for (var date = new Date(), month=0; month<12; month+=1) {
            date.setFullYear(year, month, lastDay[month]);
            date.setDate(date.getDate()-date.getDay());
            //var sunday = date.toString().substring(0,10);

            if(month == march) summer = new Date(date).toISOString().substring(0,10);
            if(month == october) winter = new Date(date).toISOString().substring(0,10);

        }

        if(new Date(time).toISOString().substring(0,10) > summer && new Date(time).toISOString().substring(0,10) < winter){
            return (pilot2timezone[pilotCode] + 1);
        }

        return pilot2timezone[pilotCode];
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

    function initDumpForm(what, codespaceID){
        var xmlhttp2 = new XMLHttpRequest();

        xmlhttp2.onreadystatechange = function () {
            if (xmlhttp2.readyState == 4) {
                if (isValidJSONResponse(xmlhttp2)) {
                    var networkJSON = JSON.parse(xmlhttp2.responseText);

                    if(defined(networkJSON)){

                        if(networkJSON.totalFeatures>0){
                            var selectionfid = document.getElementById("network-dump-element");

                            for(var i=0;i<networkJSON.totalFeatures;i++){
                                var fid = networkJSON.features[i].properties.procedureidentifier;
                                var usrid = networkJSON.features[i].properties.name;
                                var identifier = networkJSON.features[i].properties.identifier;

                                if (identifier.indexOf("/weatherstation/")>0) {
                                    usrid = "W.S. " + usrid;
                                    fid = fid.replace("-F","-M");
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

        var elementsDetailsURL = "http://sunshine.sinergis.it/geoserver/sunshine/ows?service=WFS&version=2.0&request=GetFeature&typeName=sunshine:featureofinterest&outputFormat=application/json&CQL_Filter=(codespaceid%3D__NETWORKCODESPACE__%20)and(%20identifier%20LIKE%20%27%25__WHAT__%25%27)";

        elementsDetailsURL = elementsDetailsURL.replace("__WHAT__",what);
        elementsDetailsURL = elementsDetailsURL.replace("__NETWORKCODESPACE__",codespaceID);

        // Send the POST request
        xmlhttp2.open('GET', elementsDetailsURL, true);
        xmlhttp2.setRequestHeader('Content-Type', 'application/json');
        xmlhttp2.setRequestHeader('Accept', 'application/json');
        xmlhttp2.send();
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

            if(timeslot == "irr")img.src = "img/network/no_irr.png";
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

    function hideNetworkGraph(){
        document.body.style.cursor = 'default';
        document.getElementById("fullScreenNETWORKGraph").className = "fullScreenGraphHidden";

        networkID = undefined;
        networkCode = undefined;
        networkUsrID = undefined;
    }

    function hideGroupGraph(){
        document.body.style.cursor = 'default';
        document.getElementById("fullScreenGROUPGraph").className = "fullScreenGraphHidden";

        groupID = undefined;
        groupUsrID = undefined;
    }

    function hideGroupSaveAs(){
        document.body.style.cursor = 'default';
        document.getElementById("fullScreenSave").className = "fullScreenGraphHidden";

        groupID = undefined;
        groupUsrID = undefined;
    }

    function hideLampGraph(){
        document.body.style.cursor = 'default';
        document.getElementById("fullScreenLAMPGraph").className = "fullScreenGraphHidden";

        networkID = undefined;
        networkCode = undefined;
        networkUsrID = undefined;
    }

    function error(msg) {
        console.log("%c" + msg, "color:red;font-weight:bold;");
    }

    function done(msg) {
        console.log("%c" + msg, "color:green;font-weight:bold;");
    }

    Date.prototype.yyyy_mm_ddThh_min_sec = function() {
        var yyyy = this.getFullYear().toString();
        var mm = ('0' + (this.getMonth()+1)).slice(-2);
        var dd  = ('0' + (this.getDate())).slice(-2);
        var hh  = ('0' + (this.getHours())).slice(-2);
        var min  = ('0' + (this.getMinutes())).slice(-2);
        var sec  = "00";
        return yyyy + "-" + mm + "-" + dd + "T" + hh + ":" + min + ":" + sec;
    };
}
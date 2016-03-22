/**
 * Created by u.di.staso on 30/01/15.
 */

window.Scenario1 = function(){

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

    var data;
    var color;

    var building_uuid;
    var building_contructionyear;
    var building_epi;
    var building_epgl;
    var building_floors;
    var building_ave_floor;
    var building_volume;
    var building_area;
    var building_height_val;
    var building_perimeter;
    var building_typology;
    var building_refurbishm;
    var building_climatic_zone;
    var building_pilot;
    var building_heating_start;
    var building_heating_end;
    var building_theta;
    var building_comfort_avg;
    var building_per_diff;
    var building_per_common;
    var building_irradiation;
    var building_delta_u;

    var building_u_roof;
    var building_u_wall;
    var building_u_floor;
    var building_u_window;
    var building_p_window;

    var building_co2;

    var buildinganalysis_edit_mode;

    var building_tipologies = new Array();
    building_tipologies[1] = "SFH - Single Family House";
    building_tipologies[2] = "TH - Terraced House";
    building_tipologies[3] = "MFH - Multi Family House";
    building_tipologies[4] = "AB - Apartment Block" ;
    building_tipologies[5] = "HSB - Historical Small Building";
    building_tipologies[6] = "HSL - Historical Large Building";

    var building_refurbishms = new Array();
    building_refurbishms["norefurbishment"] = "No Refurbishment";
    building_refurbishms["standard"] = "Standard Refurbishment";
    building_refurbishms["advanced"] = "Advanced Refurbishment";

    var building_position = new Array();
    building_position[0] = "Unique Building";
    building_position[1] = "Do Not Consider";
    building_position[2] = "Ground Floor";
    building_position[3] = "Middle Floor";
    building_position[4] = "Last Floor";

    var ecomapsWFSLayerNames = new Array();
    ecomapsWFSLayerNames["amblar"] = "amblar_energy";
    ecomapsWFSLayerNames["brez"] = "brez_energy";
    ecomapsWFSLayerNames["campodenno"] = "campodenno_energy";
    ecomapsWFSLayerNames["castelfondo"] = "castelfondo_energy";
    ecomapsWFSLayerNames["cavareno"] = "cavareno_energy";
    ecomapsWFSLayerNames["cles"] = "cles_energy";
    ecomapsWFSLayerNames["cles_cooling"] = "cles_cooling";
    ecomapsWFSLayerNames["cunevo"] = "cunevo_energy";
    ecomapsWFSLayerNames["dambel"] = "dambel_energy";
    ecomapsWFSLayerNames["denno"] = "denno_energy";
    ecomapsWFSLayerNames["don"] = "don_energy";
    ecomapsWFSLayerNames["ferrara"] = "ferrara_energy";
    ecomapsWFSLayerNames["flavon"] = "flavon_energy";
    ecomapsWFSLayerNames["fondo"] = "fondo_energy";
    ecomapsWFSLayerNames["lamia"] = "lamia_energy";
    ecomapsWFSLayerNames["lamia_cooling"] = "lamia_cooling";
    ecomapsWFSLayerNames["malosco"] = "malosco_energy";
    ecomapsWFSLayerNames["melzo"] = "melzo_energy";
    ecomapsWFSLayerNames["nanno"] = "nanno_energy";
    ecomapsWFSLayerNames["naxxar"] = "naxxar_energy";
    ecomapsWFSLayerNames["naxxar_cooling"] = "naxxar_cooling";
    ecomapsWFSLayerNames["piaggine"] = "piaggine_energy";
    ecomapsWFSLayerNames["predaia"] = "predaia_energy";
    ecomapsWFSLayerNames["revo"] = "revo_energy";
    ecomapsWFSLayerNames["romallo"] = "romallo_energy";
    ecomapsWFSLayerNames["romeno"] = "romeno_energy";
    ecomapsWFSLayerNames["ronzone"] = "ronzone_energy";
    ecomapsWFSLayerNames["sanzeno"] = "sanzeno_energy";
    ecomapsWFSLayerNames["sarnonico"] = "sarnonico_energy";
    ecomapsWFSLayerNames["sfruz"] = "sfruz_energy";
    ecomapsWFSLayerNames["sporminore"] = "sporminore_energy";
    ecomapsWFSLayerNames["tassullo"] = "tassullo_energy";
    ecomapsWFSLayerNames["terres"] = "terres_energy";
    ecomapsWFSLayerNames["ton"] = "ton_energy";
    ecomapsWFSLayerNames["trento"] = "trento_energy";
    ecomapsWFSLayerNames["trento_cooling"] = "trento_cooling";

    var cityGMLEnergy = new Array();
    cityGMLEnergy["ferrara"] = "kml/ferrara/ferrara.zip";

    var total_consumption;
    var NOT_VALID;
    var NO_DATA;
    var RANGE_0;
    var RANGE_1;
    var RANGE_2;
    var RANGE_3;
    var RANGE_4;
    var RANGE_5;
    var RANGE_6;

    var AVG_0_1499;
    var AVG_1500_1899;
    var AVG_1900_1909;
    var AVG_1910_1919;
    var AVG_1920_1929;
    var AVG_1930_1939;
    var AVG_1940_1949;
    var AVG_1950_1959;
    var AVG_1960_1969;
    var AVG_1970_1979;
    var AVG_1980_1989;
    var AVG_1990_1999;
    var AVG_2000_2009;
    var AVG_2010_2019;

    HEATING_ECOMAP = undefined;

    $(document).ready(function() {
        $('#kml-chart-container, #kml-chart-isto-container').hover(
            function() {},
            function() {
                if(defined(document.getElementById("divCursor")))document.getElementById("divCursor").style.display = "none";
            }
        );
    });

    this.DisplayCityStats = function(cityName){
        total_consumption = NOT_VALID = NO_DATA = RANGE_0 = RANGE_1 = RANGE_2 = RANGE_3 = RANGE_4 = RANGE_5 = RANGE_6 = AVG_0_1499 = AVG_1500_1899 = AVG_1900_1909 = AVG_1910_1919 = AVG_1920_1929 = AVG_1930_1939 = AVG_1940_1949 = AVG_1950_1959 = AVG_1960_1969 = AVG_1970_1979 = AVG_1980_1989 = AVG_1990_1999 = AVG_2000_2009 = AVG_2010_2019 = undefined;

        if(cityName.indexOf("_cooling")==-1) {HEATING_ECOMAP = true;done("SELEZIONATA ECOMAPPA PER HEATING");}
        else {HEATING_ECOMAP = false;done("SELEZIONATA ECOMAPPA PER COOLING");}
        //HEATING_ECOMAP = false;
        var ecomapLayers = ecomapsWFSLayerNames[cityName];

        document.getElementById("kml-city-name").textContent = cityName.replace("_cooling","").toUpperCase() + " Overview";
        document.getElementById("kml-download-button").onclick = function(){downloadSHP(ecomapLayers)};
        document.getElementById("json-download-button").onclick = function(){downloadJson(ecomapLayers)};
        document.getElementById("gml-download-button").onclick = function(){downloadGML(cityName)};

        var statsFromWPS = false;

        if(!statsFromWPS){

            var xmlhttp2 = new XMLHttpRequest();

            xmlhttp2.onreadystatechange = function () {
                if (xmlhttp2.readyState == 4) {
                    if (xmlhttp2.status == 200) {
                        var ecomapJSON = JSON.parse(xmlhttp2.responseText);

                        if(defined(ecomapJSON)){
                            console.log(ecomapJSON);
                            var performance = ecomapJSON.performancGroup;

                            total_consumption = ecomapJSON.sumEAF;
                            NOT_VALID = performance[0].value;
                            NO_DATA = performance[1].value;
                            RANGE_0 = performance[2].value;
                            RANGE_1 = performance[3].value;
                            RANGE_2 = performance[4].value;
                            RANGE_3 = performance[5].value;
                            RANGE_4 = performance[6].value;
                            RANGE_5 = performance[7].value;
                            RANGE_6 = performance[8].value;

                            var age = ecomapJSON.ageGroup;
                            AVG_0_1499 = age[0].value;
                            AVG_1500_1899 = age[1].value;
                            AVG_1900_1909 = age[2].value;
                            AVG_1910_1919 = age[3].value;
                            AVG_1920_1929 = age[4].value;
                            AVG_1930_1939 = age[5].value;
                            AVG_1940_1949 = age[6].value;
                            AVG_1950_1959 = age[7].value;
                            AVG_1960_1969 = age[8].value;
                            AVG_1970_1979 = age[9].value;
                            AVG_1980_1989 = age[10].value;
                            AVG_1990_1999 = age[11].value;
                            AVG_2000_2009 = age[12].value;
                            AVG_2010_2019 = age[13].value;

                            showCityCumulativeStats();
                        }
                    }
                }
            }

            var ecomapStats = "http://sunshine.sinergis.it/restStatistics/rest/statistics/get/" + cityName;

            // Send the POST request
            xmlhttp2.open('GET', ecomapStats, true);
            xmlhttp2.setRequestHeader('Content-Type', 'application/json');
            xmlhttp2.setRequestHeader('Accept', 'application/json');
            xmlhttp2.send();
        }
        else{
            setTimeout(function(){
                askForCount(ecomapLayers,-9999,-9999);
                askForCount(ecomapLayers,0,0);
                askForCount(ecomapLayers,1,30);
                askForCount(ecomapLayers,31,60);
                askForCount(ecomapLayers,61,120);
                askForCount(ecomapLayers,121,180);
                askForCount(ecomapLayers,181,220);
                askForCount(ecomapLayers,221,270);
                askForCount(ecomapLayers,271,9999);
            }, 500);

            setTimeout(function(){
                askForAVG(ecomapLayers,0,1500);
                askForAVG(ecomapLayers,1501,1899);
                askForAVG(ecomapLayers,1900,1909);
                askForAVG(ecomapLayers,1910,1919);
                askForAVG(ecomapLayers,1920,1929);
                askForAVG(ecomapLayers,1930,1939);
                askForAVG(ecomapLayers,1940,1949);
                askForAVG(ecomapLayers,1950,1959);
                askForAVG(ecomapLayers,1960,1969);
                askForAVG(ecomapLayers,1970,1979);
                askForAVG(ecomapLayers,1980,1989);
                askForAVG(ecomapLayers,1990,1999);
                askForAVG(ecomapLayers,2000,2009);
                askForAVG(ecomapLayers,2010,2019);
            }, 2000);

            setTimeout(function(){
                askForTotalEPGL(ecomapLayers);
            }, 4000);
        }
    }

    function downloadSHP(layer){
        done("Download ecomap for " + layer);

        var ecomapcityURL = "http://sunshine.sinergis.it/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=graphitech:__LAYERLIST__&SrsName=EPSG%3A4326&outputFormat=SHAPE-ZIP";
        ecomapcityURL = ecomapcityURL.replace("__LAYERLIST__",layer);

        window.location = ecomapcityURL;
    }

    function downloadGML(cityName){
        if(defined(cityGMLEnergy[cityName])){
            done("Download cityGML for " + cityName);
            window.location = cityGMLEnergy[cityName];
        }
        else{
            error("Not available cityGML for" + cityName);
            alert("CityGML not available for this pilot");
        }
    }

    function downloadJson(layer){
        done("Download ecomap for " + layer);

        var ecomapcityURL = "http://sunshine.sinergis.it/geoserver/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=graphitech:__LAYERLIST__&outputFormat=JSON";
        ecomapcityURL = ecomapcityURL.replace("__LAYERLIST__",layer);

        window.open(ecomapcityURL);
    }

    function askForTotalEPGL(layer){

        var ecomapcityDetailsURL = "<wps:Execute version=\"1.0.0\" service=\"WPS\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns=\"http://www.opengis.net/wps/1.0.0\" xmlns:wfs=\"http://www.opengis.net/wfs\" xmlns:wps=\"http://www.opengis.net/wps/1.0.0\" xmlns:ows=\"http://www.opengis.net/ows/1.1\" xmlns:gml=\"http://www.opengis.net/gml\" xmlns:ogc=\"http://www.opengis.net/ogc\" xmlns:wcs=\"http://www.opengis.net/wcs/1.1.1\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xsi:schemaLocation=\"http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd\">  <ows:Identifier>gs:Aggregate</ows:Identifier>  <wps:DataInputs>    <wps:Input>      <ows:Identifier>features</ows:Identifier>      <wps:Reference mimeType=\"text/xml\" xlink:href=\"http://geoserver/wfs\" method=\"POST\">        <wps:Body>          <wfs:GetFeature service=\"WFS\" version=\"1.0.0\" outputFormat=\"GML2\" xmlns:graphitech=\"www.graphitech.it\">            <wfs:Query typeName=\"graphitech:__LAYERLIST__ \">                                                    <ogc:Filter>                            <ogc:PropertyIsGreaterThan>                <ogc:PropertyName>perf_value</ogc:PropertyName>                <ogc:Literal>0</ogc:Literal>                </ogc:PropertyIsGreaterThan>              </ogc:Filter>            </wfs:Query>          </wfs:GetFeature>        </wps:Body>      </wps:Reference>    </wps:Input>    <wps:Input>      <ows:Identifier>aggregationAttribute</ows:Identifier>      <wps:Data>        <wps:LiteralData>perf_value</wps:LiteralData>      </wps:Data>    </wps:Input>    <wps:Input>      <ows:Identifier>function</ows:Identifier>      <wps:Data>        <wps:LiteralData>Sum</wps:LiteralData>      </wps:Data>    </wps:Input>    <wps:Input>      <ows:Identifier>singlePass</ows:Identifier>      <wps:Data>        <wps:LiteralData>false</wps:LiteralData>      </wps:Data>    </wps:Input>  </wps:DataInputs>  <wps:ResponseForm>    <wps:RawDataOutput mimeType=\"text/xml\">      <ows:Identifier>result</ows:Identifier>    </wps:RawDataOutput>  </wps:ResponseForm></wps:Execute>";
        ecomapcityDetailsURL = ecomapcityDetailsURL.replace("__LAYERLIST__",layer);

        $.ajax({
            url: 'http://sunshine.sinergis.it/geoserver/wps',
            type: 'POST',
            contentType: "text/xml",
            data: ecomapcityDetailsURL,
            dataType: "text"
            //async:   false
        }).done(function(sum) {
                var parser=new DOMParser();
                var xmlDoc=parser.parseFromString(sum,"text/xml");

                var element=xmlDoc.getElementsByTagNameNS('*',"Sum");

                if(element.length>0){
                    sum =  element[0].textContent;
                    total_consumption = sum;
                }

                //console.log((total_consumption) +" "+ (NOT_VALID) +" "+ (NO_DATA) +" "+ (RANGE_0) +" "+ (RANGE_1) +" "+ (RANGE_2) +" "+ (RANGE_3) +" "+ (RANGE_4) +" "+ (RANGE_5) +" "+ (RANGE_6) +" "+ (AVG_0_1499) +" "+ ( AVG_1500_1899 ) +" "+ ( AVG_1900_1909 ) +" "+ ( AVG_1910_1919 ) +" "+ ( AVG_1920_1929 ) +" "+ ( AVG_1930_1939 ) +" "+ ( AVG_1940_1949 ) +" "+ ( AVG_1950_1959 ) +" "+ ( AVG_1960_1969 ) +" "+ ( AVG_1970_1979 ) +" "+ ( AVG_1980_1989 ) +" "+ ( AVG_1990_1999 ) +" "+ ( AVG_2000_2009 ) +" "+ ( AVG_2010_2019));

                if(!isNaN(total_consumption) && !isNaN(NOT_VALID) && !isNaN(NO_DATA) && !isNaN(RANGE_0) && !isNaN(RANGE_1) && !isNaN(RANGE_2) && !isNaN(RANGE_3) && !isNaN(RANGE_4) && !isNaN(RANGE_5) && !isNaN(RANGE_6) &&
                    !isNaN(AVG_0_1499) && !isNaN( AVG_1500_1899 ) && !isNaN( AVG_1900_1909 ) && !isNaN( AVG_1910_1919 ) && !isNaN( AVG_1920_1929 ) && !isNaN( AVG_1930_1939 ) && !isNaN( AVG_1940_1949 ) && !isNaN( AVG_1950_1959 ) && !isNaN( AVG_1960_1969 ) && !isNaN( AVG_1970_1979 ) && !isNaN( AVG_1980_1989 ) && !isNaN( AVG_1990_1999 ) && !isNaN( AVG_2000_2009 ) && !isNaN( AVG_2010_2019)) {
                    showCityCumulativeStats();
                }
            });
    }

    function askForCount(layer,start,end){

        var ecomapcityDetailsURL = "<wps:Execute version=\"1.0.0\" service=\"WPS\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns=\"http://www.opengis.net/wps/1.0.0\" xmlns:wfs=\"http://www.opengis.net/wfs\" xmlns:wps=\"http://www.opengis.net/wps/1.0.0\" xmlns:ows=\"http://www.opengis.net/ows/1.1\" xmlns:gml=\"http://www.opengis.net/gml\" xmlns:ogc=\"http://www.opengis.net/ogc\" xmlns:wcs=\"http://www.opengis.net/wcs/1.1.1\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xsi:schemaLocation=\"http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd\">  <ows:Identifier>gs:Aggregate</ows:Identifier>  <wps:DataInputs>    <wps:Input>      <ows:Identifier>features</ows:Identifier>      <wps:Reference mimeType=\"application/json\" xlink:href=\"http://sunshine.sinergis.it/geoserver/graphitech/ows?service=WFS&amp;version=2.0&amp;request=GetFeature&amp;typeName=graphitech:__LAYERLIST__&amp;outputFormat=json&amp;Filter=%3CFilter%3E%3CPropertyIsBetween%3E%3CPropertyName%3Eperf_value%3C/PropertyName%3E%3CLiteral%3E__START__%3C/Literal%3E%3CLiteral%3E__END__%3C/Literal%3E%3C/PropertyIsBetween%3E%3C/Filter%3E\" method=\"GET\"/>    </wps:Input>    <wps:Input>      <ows:Identifier>aggregationAttribute</ows:Identifier>      <wps:Data>        <wps:LiteralData>perf_value</wps:LiteralData>      </wps:Data>    </wps:Input>    <wps:Input>      <ows:Identifier>function</ows:Identifier>      <wps:Data>        <wps:LiteralData>Count</wps:LiteralData>      </wps:Data>    </wps:Input>    <wps:Input>      <ows:Identifier>singlePass</ows:Identifier>      <wps:Data>        <wps:LiteralData>true</wps:LiteralData>      </wps:Data>    </wps:Input>  </wps:DataInputs>  <wps:ResponseForm>    <wps:RawDataOutput mimeType=\"text/xml\">      <ows:Identifier>result</ows:Identifier>    </wps:RawDataOutput>  </wps:ResponseForm></wps:Execute>";
        ecomapcityDetailsURL = ecomapcityDetailsURL.replace("__LAYERLIST__",layer);
        ecomapcityDetailsURL = ecomapcityDetailsURL.replace("__START__",start);
        ecomapcityDetailsURL = ecomapcityDetailsURL.replace("__END__",end);

        $.ajax({
            url: 'http://sunshine.sinergis.it/geoserver/wps',
            type: 'POST',
            contentType: "text/xml",
            data: ecomapcityDetailsURL,
            dataType: "text"
            //async:   false
        }).done(function(count) {
                var parser=new DOMParser();
                var xmlDoc=parser.parseFromString(count,"text/xml");

                var element=xmlDoc.getElementsByTagNameNS('*',"Count");
                if(element.length>0){
                    count =  element[0].textContent;

                    if(start == -9999) NO_DATA = count;
                    if(start == 0) NOT_VALID = count;
                    if(start == 1 && end == 30) RANGE_0 = count;
                    if(start == 31 && end == 60) RANGE_1 = count;
                    if(start == 61 && end == 120) RANGE_2 = count;
                    if(start == 121 && end == 180) RANGE_3 = count;
                    if(start == 181 && end == 220) RANGE_4 = count;
                    if(start == 221 && end == 270) RANGE_5 = count;
                    if(start == 271 && end == 9999) RANGE_6 = count;
                }
                else{
                    if(start == -9999) NO_DATA = 0;
                    if(start == 0) NOT_VALID = 0;
                    if(start == 1 && end == 30) RANGE_0 = 0;
                    if(start == 31 && end == 60) RANGE_1 = 0;
                    if(start == 61 && end == 120) RANGE_2 = 0;
                    if(start == 121 && end == 180) RANGE_3 = 0;
                    if(start == 181 && end == 220) RANGE_4 = 0;
                    if(start == 221 && end == 270) RANGE_5 = 0;
                    if(start == 271 && end == 9999) RANGE_6 = 0;
                }

                //console.log((total_consumption) +" "+ (NOT_VALID) +" "+ (NO_DATA) +" "+ (RANGE_0) +" "+ (RANGE_1) +" "+ (RANGE_2) +" "+ (RANGE_3) +" "+ (RANGE_4) +" "+ (RANGE_5) +" "+ (RANGE_6) +" "+ (AVG_0_1499) +" "+ ( AVG_1500_1899 ) +" "+ ( AVG_1900_1909 ) +" "+ ( AVG_1910_1919 ) +" "+ ( AVG_1920_1929 ) +" "+ ( AVG_1930_1939 ) +" "+ ( AVG_1940_1949 ) +" "+ ( AVG_1950_1959 ) +" "+ ( AVG_1960_1969 ) +" "+ ( AVG_1970_1979 ) +" "+ ( AVG_1980_1989 ) +" "+ ( AVG_1990_1999 ) +" "+ ( AVG_2000_2009 ) +" "+ ( AVG_2010_2019));

                if(!isNaN(total_consumption) && !isNaN(NOT_VALID) && !isNaN(NO_DATA) && !isNaN(RANGE_0) && !isNaN(RANGE_1) && !isNaN(RANGE_2) && !isNaN(RANGE_3) && !isNaN(RANGE_4) && !isNaN(RANGE_5) && !isNaN(RANGE_6) &&
                    !isNaN(AVG_0_1499) && !isNaN( AVG_1500_1899 ) && !isNaN( AVG_1900_1909 ) && !isNaN( AVG_1910_1919 ) && !isNaN( AVG_1920_1929 ) && !isNaN( AVG_1930_1939 ) && !isNaN( AVG_1940_1949 ) && !isNaN( AVG_1950_1959 ) && !isNaN( AVG_1960_1969 ) && !isNaN( AVG_1970_1979 ) && !isNaN( AVG_1980_1989 ) && !isNaN( AVG_1990_1999 ) && !isNaN( AVG_2000_2009 ) && !isNaN( AVG_2010_2019)) {
                    showCityCumulativeStats();
                }
            });
    }

    function askForAVG(layer,start,end){

        var ecomapcityDetailsURL = "<?xml version=\"1.0\" encoding=\"UTF-8\"?><wps:Execute version=\"1.0.0\" service=\"WPS\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns=\"http://www.opengis.net/wps/1.0.0\" xmlns:wfs=\"http://www.opengis.net/wfs\" xmlns:wps=\"http://www.opengis.net/wps/1.0.0\" xmlns:ows=\"http://www.opengis.net/ows/1.1\" xmlns:gml=\"http://www.opengis.net/gml\" xmlns:ogc=\"http://www.opengis.net/ogc\" xmlns:wcs=\"http://www.opengis.net/wcs/1.1.1\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xsi:schemaLocation=\"http://www.opengis.net/wps/1.0.0 http://schemas.opengis.net/wps/1.0.0/wpsAll.xsd\">  <ows:Identifier>gs:Aggregate</ows:Identifier>  <wps:DataInputs>    <wps:Input>      <ows:Identifier>features</ows:Identifier>      <wps:Reference mimeType=\"application/json\" xlink:href=\"http://sunshine.sinergis.it/geoserver/graphitech/ows?service=WFS&amp;version=2.0&amp;request=GetFeature&amp;typeName=graphitech:__LAYERLIST__&amp;outputFormat=json&amp;CQL_Filter=(perf_value%3E0)AND(ave_floor%3C5)AND(end%3E=__START__)AND(end%3C=__END__)\" method=\"GET\"/>    </wps:Input>    <wps:Input>      <ows:Identifier>aggregationAttribute</ows:Identifier>      <wps:Data>        <wps:LiteralData>perf_value</wps:LiteralData>      </wps:Data>    </wps:Input>    <wps:Input>      <ows:Identifier>function</ows:Identifier>      <wps:Data>        <wps:LiteralData>Average</wps:LiteralData>      </wps:Data>    </wps:Input>    <wps:Input>      <ows:Identifier>singlePass</ows:Identifier>      <wps:Data>        <wps:LiteralData>true</wps:LiteralData>      </wps:Data>    </wps:Input>  </wps:DataInputs>  <wps:ResponseForm>    <wps:RawDataOutput mimeType=\"text/xml\">      <ows:Identifier>result</ows:Identifier>    </wps:RawDataOutput>  </wps:ResponseForm></wps:Execute>";
        ecomapcityDetailsURL = ecomapcityDetailsURL.replace("__LAYERLIST__",layer);
        ecomapcityDetailsURL = ecomapcityDetailsURL.replace("__START__",start);
        ecomapcityDetailsURL = ecomapcityDetailsURL.replace("__END__",end);

        $.ajax({
            url: 'http://sunshine.sinergis.it/geoserver/wps',
            type: 'POST',
            contentType: "text/xml",
            data: ecomapcityDetailsURL,
            dataType: "text"
            //async:   false
        }).done(function(avg) {
                var parser=new DOMParser();
                var xmlDoc=parser.parseFromString(avg,"text/xml");

                var element=xmlDoc.getElementsByTagNameNS('*',"Average");

                if(element.length>0){
                    avg =  element[0].textContent;

                    if(start == 0 && end == 1500) AVG_0_1499 = avg;
                    if(start == 1501 && end == 1899) AVG_1500_1899 = avg;
                    if(start == 1900 && end == 1909) AVG_1900_1909 = avg;
                    if(start == 1910 && end == 1919) AVG_1910_1919 = avg;
                    if(start == 1920 && end == 1929) AVG_1920_1929 = avg;
                    if(start == 1930 && end == 1939) AVG_1930_1939 = avg;
                    if(start == 1940 && end == 1949) AVG_1940_1949 = avg;
                    if(start == 1950 && end == 1959) AVG_1950_1959 = avg;
                    if(start == 1960 && end == 1969) AVG_1960_1969 = avg;
                    if(start == 1970 && end == 1979) AVG_1970_1979 = avg;
                    if(start == 1980 && end == 1989) AVG_1980_1989 = avg;
                    if(start == 1990 && end == 1999) AVG_1990_1999 = avg;
                    if(start == 2000 && end == 2009) AVG_2000_2009 = avg;
                    if(start == 2010 && end == 2019) AVG_2010_2019 = avg;
                }
                else{
                    if(start == 0 && end == 1500) AVG_0_1499 = 0;
                    if(start == 1501 && end == 1899) AVG_1500_1899 = 0;
                    if(start == 1900 && end == 1909) AVG_1900_1909 = 0;
                    if(start == 1910 && end == 1919) AVG_1910_1919 = 0;
                    if(start == 1920 && end == 1929) AVG_1920_1929 = 0;
                    if(start == 1930 && end == 1939) AVG_1930_1939 = 0;
                    if(start == 1940 && end == 1949) AVG_1940_1949 = 0;
                    if(start == 1950 && end == 1959) AVG_1950_1959 = 0;
                    if(start == 1960 && end == 1969) AVG_1960_1969 = 0;
                    if(start == 1970 && end == 1979) AVG_1970_1979 = 0;
                    if(start == 1980 && end == 1989) AVG_1980_1989 = 0;
                    if(start == 1990 && end == 1999) AVG_1990_1999 = 0;
                    if(start == 2000 && end == 2009) AVG_2000_2009 = 0;
                    if(start == 2010 && end == 2019) AVG_2010_2019 = 0;
                }

                //console.log((total_consumption) +" "+ (NOT_VALID) +" "+ (NO_DATA) +" "+ (RANGE_0) +" "+ (RANGE_1) +" "+ (RANGE_2) +" "+ (RANGE_3) +" "+ (RANGE_4) +" "+ (RANGE_5) +" "+ (RANGE_6) +" "+ (AVG_0_1499) +" "+ ( AVG_1500_1899 ) +" "+ ( AVG_1900_1909 ) +" "+ ( AVG_1910_1919 ) +" "+ ( AVG_1920_1929 ) +" "+ ( AVG_1930_1939 ) +" "+ ( AVG_1940_1949 ) +" "+ ( AVG_1950_1959 ) +" "+ ( AVG_1960_1969 ) +" "+ ( AVG_1970_1979 ) +" "+ ( AVG_1980_1989 ) +" "+ ( AVG_1990_1999 ) +" "+ ( AVG_2000_2009 ) +" "+ ( AVG_2010_2019));

                if(!isNaN(total_consumption) && !isNaN(NOT_VALID) && !isNaN(NO_DATA) && !isNaN(RANGE_0) && !isNaN(RANGE_1) && !isNaN(RANGE_2) && !isNaN(RANGE_3) && !isNaN(RANGE_4) && !isNaN(RANGE_5) && !isNaN(RANGE_6) &&
                    !isNaN(AVG_0_1499) && !isNaN( AVG_1500_1899 ) && !isNaN( AVG_1900_1909 ) && !isNaN( AVG_1910_1919 ) && !isNaN( AVG_1920_1929 ) && !isNaN( AVG_1930_1939 ) && !isNaN( AVG_1940_1949 ) && !isNaN( AVG_1950_1959 ) && !isNaN( AVG_1960_1969 ) && !isNaN( AVG_1970_1979 ) && !isNaN( AVG_1980_1989 ) && !isNaN( AVG_1990_1999 ) && !isNaN( AVG_2000_2009 ) && !isNaN( AVG_2010_2019)) {
                    showCityCumulativeStats();
                }
            });
    }

    function showCityCumulativeStats(){
        document.getElementById("main").style.display = "none";
        document.getElementById("kmlbuildingdetail").style.display = "block";
        document.getElementById("gltfnetworkdetail").style.display = "none";
        document.getElementById("gltfbuildingdetail").style.display = "none";

        document.getElementById("kml-total").textContent = parseInt(NOT_VALID) + parseInt(NO_DATA) + parseInt(RANGE_0) + parseInt(RANGE_1) + parseInt(RANGE_2) + parseInt(RANGE_3) + parseInt(RANGE_4) + parseInt(RANGE_5) + parseInt(RANGE_6);
        document.getElementById("kml-no-data").textContent = parseInt(NO_DATA);
        document.getElementById("kml-not-valid").textContent = parseInt(NOT_VALID);
        document.getElementById("kml-range0").textContent = parseInt(RANGE_0);
        document.getElementById("kml-range1").textContent = parseInt(RANGE_1);
        document.getElementById("kml-range2").textContent = parseInt(RANGE_2);
        document.getElementById("kml-range3").textContent = parseInt(RANGE_3);
        document.getElementById("kml-range4").textContent = parseInt(RANGE_4);
        document.getElementById("kml-range5").textContent = parseInt(RANGE_5);
        document.getElementById("kml-range6").textContent = parseInt(RANGE_6);
        document.getElementById("kml-total-consumption").textContent = Math.ceil(total_consumption*0.000001);

        $("#cesium-widget-building-container").animate({left: "-125"}, 500);
        $("#cesium-widget-network-container").animate({left: "-125"}, 500);
        $("#cesium-widget-status-container").animate({top: "120"}, 1500);

        if(HEATING_ECOMAP){
            document.getElementById("kml-total-co2").textContent = Math.ceil(total_consumption * (0.20/1000));
            document.getElementById("kml-range0-label").style.backgroundColor = "rgba(56,117,62,0.5)";
            document.getElementById("kml-range1-label").style.backgroundColor = "rgba(91,163,74,0.5)";
            document.getElementById("kml-range2-label").style.backgroundColor = "rgba(161,205,80,0.5)";
            document.getElementById("kml-range3-label").style.backgroundColor = "rgba(246,221,83,0.5)";
            document.getElementById("kml-range4-label").style.backgroundColor = "rgba(243,141,62,0.5)";
            document.getElementById("kml-range5-label").style.backgroundColor = "rgba(236,64,54,0.5)";
            document.getElementById("kml-range6-label").style.backgroundColor = "rgba(235,29,61,0.5)";

            $("#cesium-widget-ecomap-cooling-container").animate({left: "-125"}, 500);
            $("#cesium-widget-ecomap-container").animate({left: "10"}, 1500);

            $("#A").animate({left: "-50"}, 500);
            $("#B").animate({left: "-50"}, 500);
            $("#C").animate({left: "-50"}, 500);
            $("#D").animate({left: "-50"}, 500);
            $("#E").animate({left: "-50"}, 500);
            $("#F").animate({left: "-50"}, 500);
            $("#G").animate({left: "-50"}, 500);

            var data = [
                {
                    value: parseInt(RANGE_0),
                    color: "rgba(56,117,62,0.5)",
                    highlight: "rgba(0,241,255,1)",
                    title: "EPGL 1-30"
                },
                {
                    value: parseInt(RANGE_1),
                    color: "rgba(91,163,74,0.5)",
                    highlight: "rgba(91,163,74,1)",
                    title: "EPGL 31-60"
                },
                {
                    value: parseInt(RANGE_2),
                    color: "rgba(161,205,80,0.5)",
                    highlight: "rgba(161,205,80,1)",
                    title: "EPGL 61-120"
                },
                {
                    value: parseInt(RANGE_3),
                    color: "rgba(246,221,83,0.5)",
                    highlight: "rgba(246,221,83,1)",
                    title: "EPGL 121-180"
                },
                {
                    value: parseInt(RANGE_4),
                    color: "rgba(243,141,62,0.5)",
                    highlight: "rgba(243,141,62,1)",
                    title: "EPGL 181-220"
                },
                {
                    value: parseInt(RANGE_5),
                    color: "rgba(236,64,54,0.5)",
                    highlight: "rgba(236,64,54,1)",
                    title: "EPGL 221-270"
                },
                {
                    value: parseInt(RANGE_6),
                    color: "rgba(235,29,61,0.5)",
                    highlight: "rgba(235,29,61,1)",
                    title: "EPGL >270"
                }
            ];
        }
        else{
            document.getElementById("kml-total-co2").textContent = Math.ceil(total_consumption * (0.40/1000));
            document.getElementById("kml-range0-label").style.backgroundColor = "rgba(179, 214, 255,0.5)";
            document.getElementById("kml-range1-label").style.backgroundColor = "rgba(102, 172, 255,0.5)";
            document.getElementById("kml-range2-label").style.backgroundColor = "rgba(0, 117, 255,0.5)";
            document.getElementById("kml-range3-label").style.backgroundColor = "rgba(0, 82, 179,0.5)";
            document.getElementById("kml-range4-label").style.backgroundColor = "rgba(210, 77, 255,0.5)";
            document.getElementById("kml-range5-label").style.backgroundColor = "rgba(180,71,235,0.5)";
            document.getElementById("kml-range6-label").style.backgroundColor = "rgba(146,0,235,0.5)";

            $("#cesium-widget-ecomap-cooling-container").animate({left: "10"}, 500);
            $("#cesium-widget-ecomap-container").animate({left: "-125"}, 1500);

            $("#A").animate({left: "-50"}, 500);
            $("#B").animate({left: "-50"}, 500);
            $("#C").animate({left: "-50"}, 500);
            $("#D").animate({left: "-50"}, 500);
            $("#E").animate({left: "-50"}, 500);
            $("#F").animate({left: "-50"}, 500);
            $("#G").animate({left: "-50"}, 500);

            var data = [
                {
                    value: parseInt(RANGE_0),
                    color: "rgba(179, 214, 255,0.5)",
                    highlight: "rgba(179, 214, 255,1)",
                    title: "EPGL 1-30"
                },
                {
                    value: parseInt(RANGE_1),
                    color: "rgba(102, 172, 255,0.5)",
                    highlight: "rgba(102, 172, 255,1)",
                    title: "EPGL 31-60"
                },
                {
                    value: parseInt(RANGE_2),
                    color: "rgba(0, 117, 255,0.5)",
                    highlight: "rgba(0, 117, 255,1)",
                    title: "EPGL 61-120"
                },
                {
                    value: parseInt(RANGE_3),
                    color: "rgba(0, 82, 179,0.5)",
                    highlight: "rgba(0, 82, 179,1)",
                    title: "EPGL 121-180"
                },
                {
                    value: parseInt(RANGE_4),
                    color: "rgba(210, 77, 255,0.5)",
                    highlight: "rgba(210, 77, 255,1)",
                    title: "EPGL 181-220"
                },
                {
                    value: parseInt(RANGE_5),
                    color: "rgba(180,71,235,0.5)",
                    highlight: "rgba(180,71,235,1)",
                    title: "EPGL 221-270"
                },
                {
                    value: parseInt(RANGE_6),
                    color: "rgba(146,0,235,0.5)",
                    highlight: "rgba(146,0,235,1)",
                    title: "EPGL >270"
                }
            ];
        }

        clearChart("kml-chart-container", "kml-chart", 400, 300, null);

        var myRadar = new Chart(document.getElementById("kml-chart").getContext("2d")).Doughnut(data,optDoughnut);

        var AVG_0_2019 = 0;
        var total = 0;

        if(parseInt(AVG_0_1499) > 0) {AVG_0_2019 += parseInt(AVG_0_1499); total++;}
        if(parseInt(AVG_1500_1899) > 0) {AVG_0_2019 += parseInt(AVG_1500_1899); total++;}
        if(parseInt(AVG_1900_1909) > 0) {AVG_0_2019 += parseInt(AVG_1900_1909); total++;}
        if(parseInt(AVG_1910_1919) > 0) {AVG_0_2019 += parseInt(AVG_1910_1919); total++;}
        if(parseInt(AVG_1920_1929) > 0) {AVG_0_2019 += parseInt(AVG_1920_1929); total++;}
        if(parseInt(AVG_1930_1939) > 0) {AVG_0_2019 += parseInt(AVG_1930_1939); total++;}
        if(parseInt(AVG_1940_1949) > 0) {AVG_0_2019 += parseInt(AVG_1940_1949); total++;}
        if(parseInt(AVG_1950_1959) > 0) {AVG_0_2019 += parseInt(AVG_1950_1959); total++;}
        if(parseInt(AVG_1960_1969) > 0) {AVG_0_2019 += parseInt(AVG_1960_1969); total++;}
        if(parseInt(AVG_1970_1979) > 0) {AVG_0_2019 += parseInt(AVG_1970_1979); total++;}
        if(parseInt(AVG_1980_1989) > 0) {AVG_0_2019 += parseInt(AVG_1980_1989); total++;}
        if(parseInt(AVG_1990_1999) > 0) {AVG_0_2019 += parseInt(AVG_1990_1999); total++;}
        if(parseInt(AVG_2000_2009) > 0) {AVG_0_2019 += parseInt(AVG_2000_2009); total++;}
        if(parseInt(AVG_2010_2019) > 0) {AVG_0_2019 += parseInt(AVG_2010_2019); total++;}

        AVG_0_2019 = Math.ceil(AVG_0_2019/total);

        document.getElementById("kml-chart-avg").textContent = AVG_0_2019;

        data = {
            labels : ["0 - 1500","1501 - 1899","1900 - 1909","1910 - 1919","1920 - 1929","1930 - 1939","1940 - 1949", "1950 - 1959", "1960 - 1969", "1970 - 1979", "1980 - 1989", "1990 - 1999", "2000 - 2009", "2010 - 2019", "AVERAGE"],
            datasets : [
                {
                    fillColor : "rgba(220,220,220,0.5)",
                    strokeColor : "rgba(220,220,220,0.8)",
                    highlightFill: "rgba(220,220,220,0.75)",
                    highlightStroke: "rgba(220,220,220,1)",
                    data : [parseInt(AVG_0_1499),parseInt(AVG_1500_1899),parseInt(AVG_1900_1909),parseInt(AVG_1910_1919),parseInt(AVG_1920_1929),parseInt(AVG_1930_1939),parseInt(AVG_1940_1949),parseInt(AVG_1950_1959),parseInt(AVG_1960_1969),parseInt(AVG_1970_1979),parseInt(AVG_1980_1989),parseInt(AVG_1990_1999),parseInt(AVG_2000_2009),parseInt(AVG_2010_2019),parseInt(AVG_0_2019)]
                }
            ]

        }


        clearChart("kml-chart-isto-container", "kml-chart-isto", 1180, 125, null);

        var myRadar = new Chart(document.getElementById("kml-chart-isto").getContext("2d")).Bar(data,opt);
    }

    this.DisplayBuildingDetails = function(lastUUID){

        building_uuid = lastUUID.split("_")[0];
        var layername = lastUUID.split("_")[1];
        if(!HEATING_ECOMAP) layername += "_cooling";
        var ecomapLayers = ecomapsWFSLayerNames[layername];
        var fid = ecomapLayers + "." + building_uuid;

        console.log(ecomapLayers);

        //DEVO SOSTITUIRE __CLASSID__ CON IL VALORE QUINDI DEVE ESSERE TEMP ALTRIMENTI NON VIENE PIù AGGIORNATA AL 2 CLICK
        var ecomapbuildingDetailsURL = "http://sunshine.sinergis.it/geoserver/graphitech/ows?service=WFS&version=2.0&request=GetFeature&typeName=graphitech:__LAYERLIST__&outputFormat=json&&CQL_Filter=(gid%3D'__CLASSID__')";
        ecomapbuildingDetailsURL = ecomapbuildingDetailsURL.replace("__LAYERLIST__",ecomapLayers);
        ecomapbuildingDetailsURL = ecomapbuildingDetailsURL.replace("__CLASSID__",building_uuid);

        //console.log(ecomapbuildingDetailsURL);

        console.log("CLICK SU " + fid);

        var url = ecomapbuildingDetailsURL;
        buildinganalysis_edit_mode = 0;

        var xmlhttp = new XMLHttpRequest();


        xmlhttp.onreadystatechange=function()
        {
            if (xmlhttp.readyState == 4) {
                if (isValidJSONResponse(xmlhttp)) {

                    var json = JSON.parse(xmlhttp.responseText);

                    var buildingdata = json.features[0].properties;
                    console.log(buildingdata);

                    building_contructionyear = buildingdata.end;
                    building_epi= buildingdata.epi;
                    building_epgl= buildingdata.perf_value;
                    building_floors = buildingdata.floors;
                    building_ave_floor = buildingdata.ave_floor;
                    building_typology = buildingdata.typology;
                    building_area= buildingdata.area;
                    building_height_val= buildingdata.height_val;
                    building_volume= (buildingdata.area*buildingdata.ave_floor);
                    building_perimeter= buildingdata.perimeter;
                    building_refurbishm = buildingdata.refurbishm;
                    building_climatic_zone = buildingdata.zone;
                    building_pilot = buildingdata.pilot;
                    building_heating_start = buildingdata.heating_start;
                    building_heating_end = buildingdata.heating_end;
                    building_theta = buildingdata.temp_avg;
                    building_comfort_avg = buildingdata.comf_avg;
                    building_per_common = buildingdata.per_comm;
                    building_per_diff = buildingdata.perimeter - buildingdata.per_comm;
                    building_irradiation = buildingdata.irrad_hor;
                    building_delta_u = buildingdata.delta_u;

                    building_u_roof = buildingdata.u_roof;
                    building_u_wall= buildingdata.u_wall;
                    building_u_floor = buildingdata.u_floor;
                    building_u_window = buildingdata.u_win;
                    building_p_window = buildingdata.p_win;

                    if(HEATING_ECOMAP) building_co2 = (building_epgl * 0.20);
                    else building_co2 = (building_epgl * 0.40);


                    if(building_typology == "SFH")building_typology = 1;
                    if(building_typology == "TH")building_typology = 2;
                    if(building_typology == "MFH")building_typology = 3;
                    if(building_typology == "AB")building_typology = 4;
                    if(building_typology == "HSB")building_typology = 5;
                    if(building_typology == "HSL")building_typology = 6;

                    var range = -1;

                    if(building_epgl == -9999) range = -9999;
                    if(building_epgl == 0) range = -1;
                    if(building_epgl > 0 && building_epgl <= 30) range = 0;
                    if(building_epgl > 30 && building_epgl <= 60) range = 1;
                    if(building_epgl > 60 && building_epgl <= 120) range = 2;
                    if(building_epgl > 120 && building_epgl <= 180) range = 3;
                    if(building_epgl > 180 && building_epgl <= 220) range = 4;
                    if(building_epgl > 220 && building_epgl <= 270) range = 5;
                    if(building_epgl > 270 && building_epgl <= 9999) range = 6;

                    console.log("RANGE: " + range + " EPGL: " + building_epgl);

                    if(range>=0){

                        if(HEATING_ECOMAP){
                            if(range != 0 && document.getElementById("A").style.left == "-10px") $("#A").animate({left: "-=40"}, 500);
                            if(range != 1 && document.getElementById("B").style.left == "-10px") $("#B").animate({left: "-=40"}, 500);
                            if(range != 2 && document.getElementById("C").style.left == "-10px") $("#C").animate({left: "-=40"}, 500);
                            if(range != 3 && document.getElementById("D").style.left == "-10px") $("#D").animate({left: "-=40"}, 500);
                            if(range != 4 && document.getElementById("E").style.left == "-10px") $("#E").animate({left: "-=40"}, 500);
                            if(range != 5 && document.getElementById("F").style.left == "-10px") $("#F").animate({left: "-=40"}, 500);
                            if(range != 6 && document.getElementById("G").style.left == "-10px") $("#G").animate({left: "-=40"}, 500);

                            if(range == 0 && document.getElementById("A").style.left != "-10px") $("#A").animate({left: "+=40"}, 500);
                            if(range == 1 && document.getElementById("B").style.left != "-10px") $("#B").animate({left: "+=40"}, 500);
                            if(range == 2 && document.getElementById("C").style.left != "-10px") $("#C").animate({left: "+=40"}, 500);
                            if(range == 3 && document.getElementById("D").style.left != "-10px") $("#D").animate({left: "+=40"}, 500);
                            if(range == 4 && document.getElementById("E").style.left != "-10px") $("#E").animate({left: "+=40"}, 500);
                            if(range == 5 && document.getElementById("F").style.left != "-10px") $("#F").animate({left: "+=40"}, 500);
                            if(range == 6 && document.getElementById("G").style.left != "-10px") $("#G").animate({left: "+=40"}, 500);

                            var color_A = "rgba(56,117,62,0.5)";
                            var color_B = "rgba(91,163,74,0.5)";
                            var color_C = "rgba(161,205,80,0.5)";
                            var color_D = "rgba(246,221,83,0.5)";
                            var color_E = "rgba(243,141,62,0.5)";
                            var color_F = "rgba(236,64,54,0.5)";
                            var color_G = "rgba(235,29,61,0.5)";
                        }
                        else{
                            if(range != 0 && document.getElementById("Ac").style.left == "-10px") $("#Ac").animate({left: "-=40"}, 500);
                            if(range != 1 && document.getElementById("Bc").style.left == "-10px") $("#Bc").animate({left: "-=40"}, 500);
                            if(range != 2 && document.getElementById("Cc").style.left == "-10px") $("#Cc").animate({left: "-=40"}, 500);
                            if(range != 3 && document.getElementById("Dc").style.left == "-10px") $("#Dc").animate({left: "-=40"}, 500);
                            if(range != 4 && document.getElementById("Ec").style.left == "-10px") $("#Ec").animate({left: "-=40"}, 500);
                            if(range != 5 && document.getElementById("Fc").style.left == "-10px") $("#Fc").animate({left: "-=40"}, 500);
                            if(range != 6 && document.getElementById("Gc").style.left == "-10px") $("#Gc").animate({left: "-=40"}, 500);

                            if(range == 0 && document.getElementById("Ac").style.left != "-10px") $("#Ac").animate({left: "+=40"}, 500);
                            if(range == 1 && document.getElementById("Bc").style.left != "-10px") $("#Bc").animate({left: "+=40"}, 500);
                            if(range == 2 && document.getElementById("Cc").style.left != "-10px") $("#Cc").animate({left: "+=40"}, 500);
                            if(range == 3 && document.getElementById("Dc").style.left != "-10px") $("#Dc").animate({left: "+=40"}, 500);
                            if(range == 4 && document.getElementById("Ec").style.left != "-10px") $("#Ec").animate({left: "+=40"}, 500);
                            if(range == 5 && document.getElementById("Fc").style.left != "-10px") $("#Fc").animate({left: "+=40"}, 500);
                            if(range == 6 && document.getElementById("Gc").style.left != "-10px") $("#Gc").animate({left: "+=40"}, 500);

                            var color_A = "rgba(179, 214, 255,0.5)";
                            var color_B = "rgba(102, 172, 255,0.5)";
                            var color_C = "rgba(0, 117, 255,0.5)";
                            var color_D = "rgba(0, 82, 179,0.5)";
                            var color_E = "rgba(210, 77, 255,0.5)";
                            var color_F = "rgba(180,71,235,0.5)";
                            var color_G = "rgba(146,0,235,0.5)";
                        }

                        if(range == 0) color = color_A;
                        if(range == 1) color = color_B;
                        if(range == 2) color = color_C;
                        if(range == 3) color = color_D;
                        if(range == 4) color = color_E;
                        if(range == 5) color = color_F;
                        if(range == 6) color = color_G;

                    }
                    else if(range == -1){
                        var color_NOT_VALID = "rgba(192,192,192,0.5)";
                        color = color_NOT_VALID;
                    }
                    else if(range == -9999){
                        var color_NO_DATA = "grey";
                        color = color_NO_DATA;
                    }

                    openBuildingDetails();

                }
            }
        }

        xmlhttp.open("GET",url,true);
        xmlhttp.send();
    }


    function openBuildingDetails(){
        var fullScreenGraph = document.getElementById("fullScreenKMLGraph");

        var body = document.body,html = document.documentElement;
        fullScreenGraph.style.height = Math.max( body.scrollHeight, body.offsetHeight,html.clientHeight, html.scrollHeight, html.offsetHeight ) + "px";

        fullScreenGraph.className="fullScreenGraph";
        //fullScreenGraph.ondblclick = hideKMLGraph;

        $("#buildinganalysis-close").click(hideKMLGraph);

        document.body.style.cursor = 'pointer';
        document.getElementById("buildinganalysis-editdata").onclick = enableBuildingEditing;

        document.getElementById("buildingAnalysis-label").style.backgroundColor = color;
        document.getElementById("buildingAnalysis-label2").style.backgroundColor = color;
        document.getElementById("buildingAnalysis-label3").style.backgroundColor = color;

        if(building_epgl>0){
            $('#buildinganalysis-consumpion').each(function () {

                var $this = $(this);
                jQuery({ Counter: 0 }).animate({ Counter: building_epgl}, {
                    duration: 1000,
                    easing: 'swing',
                    step: function () {
                        $this.text(this.Counter.toFixed(2).toString().substring(0,5));
                    }
                });
            });

            $('#buildinganalysis-consuption2').each(function () {

                var $this = $(this);
                jQuery({ Counter: 0 }).animate({ Counter: building_epi}, {
                    duration: 1000,
                    easing: 'swing',
                    step: function () {
                        $this.text(this.Counter.toFixed(2).toString().substring(0,5));
                    }
                });
            });

            $('#buildinganalysis-emission').each(function () {

                var $this = $(this);
                jQuery({ Counter: 0 }).animate({ Counter: building_co2}, {
                    duration: 1000,
                    easing: 'swing',
                    step: function () {
                        $this.text(this.Counter.toFixed(2).toString().substring(0,5));
                    }
                });
            });
        }
        else{
            document.getElementById("buildinganalysis-consumpion").textContent = "N/A";
            document.getElementById("buildinganalysis-consuption2").textContent = "N/A";
            document.getElementById("buildinganalysis-emission").textContent = "N/A";
        }

        if(HEATING_ECOMAP){
            document.getElementById("buildinganalysis-epi-label").textContent = "EPI";
            document.getElementById("buildinganalysis-consuption2-label").textContent = "EPI kWh/m2";
            //isReadOnly(false);
        }
        else{
            document.getElementById("buildinganalysis-epi-label").textContent = "EPE";
            document.getElementById("buildinganalysis-consuption2-label").textContent = "EPE kWh/m2";
            //isReadOnly(true);
        }

        document.getElementById("buildinganalysis-id").textContent = building_uuid;
        document.getElementById("buildinganalysis-year").textContent = building_contructionyear;
        document.getElementById("buildinganalysis-epi").textContent = building_epi + " kwh/m2";
        document.getElementById("buildinganalysis-epgl").textContent = building_epgl  + " kwh/m2";
        document.getElementById("buildinganalysis-co2").textContent = "Kg " + building_co2  + " m2/Year";
        document.getElementById("buildinganalysis-floors").textContent = building_floors;
        document.getElementById("buildinganalysis-ave-floor").textContent = building_ave_floor;
        document.getElementById("buildinganalysis-perimeter").textContent = building_perimeter + " m";
        document.getElementById("buildinganalysis-height").textContent = building_height_val + " m";
        document.getElementById("buildinganalysis-area").textContent = building_area + " m2";
        document.getElementById("buildinganalysis-volume").textContent = building_volume + " m3";
        document.getElementById("buildinganalysis-typology").textContent = building_tipologies[building_typology];
        document.getElementById("buildinganalysis-refurbishment").textContent = building_refurbishms[building_refurbishm];

        restoreDefaults();
        disableBuildingEditing();

        var restoredefault = document.getElementById("buildinganalysis-restoredefaults");
        restoredefault.onclick = restoreDefaults;

        var selectionyears = document.getElementById("buildinganalysis-newyear");
        selectionyears.onchange = function(){disableBuildingEditing(); setBuildingTypologies(); setRefurbishmentLevel(); setApartmentPosition();};
        setConstructionYear();

        var selectiontypology = document.getElementById("buildinganalysis-newtypology");
        selectiontypology.onchange = setApartmentPosition;
        setBuildingTypologies();

        var selectionrefurbishment= document.getElementById("buildinganalysis-newrefurbishment");
        setRefurbishmentLevel();

        var selectionposition= document.getElementById("buildinganalysis-newposition");
        setApartmentPosition();

        $( "#buildinganalysis-simulate" ).click(function(e) {
            e.stopImmediatePropagation();
            e.preventDefault();

            var data_ok = true;

            disableUformError();

            var form = document.createElement("form");
            form.setAttribute("id", "buildinganalysis-simulation-form");
            form.setAttribute("method", "post");

            var hidden_building_climatic_zone = document.createElement("input");
            hidden_building_climatic_zone.setAttribute("type", "hidden");
            hidden_building_climatic_zone.setAttribute("name", "building_climatic_zone");
            hidden_building_climatic_zone.setAttribute("value", building_climatic_zone);

            var hidden_building_pilot = document.createElement("input");
            hidden_building_pilot.setAttribute("type", "hidden");
            hidden_building_pilot.setAttribute("name", "building_pilot");
            hidden_building_pilot.setAttribute("value", building_pilot);

            var hidden_building_refurbishm = document.createElement("input");
            hidden_building_refurbishm.setAttribute("type", "hidden");
            hidden_building_refurbishm.setAttribute("name", "building_refurbishm");
            hidden_building_refurbishm.setAttribute("value", selectionrefurbishment.options[selectionrefurbishment.selectedIndex].value);

            var hidden_building_typology = document.createElement("input");
            hidden_building_typology.setAttribute("type", "hidden");
            hidden_building_typology.setAttribute("name", "building_typology");
            hidden_building_typology.setAttribute("value", selectiontypology.options[selectiontypology.selectedIndex].value);

            var hidden_building_contructionyear = document.createElement("input");
            hidden_building_contructionyear.setAttribute("type", "hidden");
            hidden_building_contructionyear.setAttribute("name", "building_contructionyear");
            hidden_building_contructionyear.setAttribute("value", selectionyears.options[selectionyears.selectedIndex].value);

            var hidden_building_floors = document.createElement("input");
            hidden_building_floors.setAttribute("type", "hidden");
            hidden_building_floors.setAttribute("name", "building_floors");
            hidden_building_floors.setAttribute("value", building_floors);

            var hidden_building_per_diff = document.createElement("input");
            hidden_building_per_diff.setAttribute("type", "hidden");
            hidden_building_per_diff.setAttribute("name", "building_per_diff");
            hidden_building_per_diff.setAttribute("value", building_per_diff);

            var hidden_building_height_val = document.createElement("input");
            hidden_building_height_val.setAttribute("type", "hidden");
            hidden_building_height_val.setAttribute("name", "building_height_val");
            hidden_building_height_val.setAttribute("value", building_height_val);

            var hidden_building_area = document.createElement("input");
            hidden_building_area.setAttribute("type", "hidden");
            hidden_building_area.setAttribute("name", "building_area");
            hidden_building_area.setAttribute("value", building_area);

            var hidden_building_ave_floor = document.createElement("input");
            hidden_building_ave_floor.setAttribute("type", "hidden");
            hidden_building_ave_floor.setAttribute("name", "building_ave_floor");
            hidden_building_ave_floor.setAttribute("value", building_ave_floor);

            var hidden_building_irradiation = document.createElement("input");
            hidden_building_irradiation.setAttribute("type", "hidden");
            hidden_building_irradiation.setAttribute("name", "building_irradiation");
            hidden_building_irradiation.setAttribute("value", building_irradiation);

            var hidden_building_delta_u = document.createElement("input");
            hidden_building_delta_u.setAttribute("type", "hidden");
            hidden_building_delta_u.setAttribute("name", "building_delta_u");
            hidden_building_delta_u.setAttribute("value", building_delta_u);

            var hidden_building_position = document.createElement("input");
            hidden_building_position.setAttribute("type", "hidden");
            hidden_building_position.setAttribute("name", "building_position");
            hidden_building_position.setAttribute("value", selectionposition.options[selectionposition.selectedIndex].value);

            var hidden_buildinganalysis_edit_mode = document.createElement("input");
            hidden_buildinganalysis_edit_mode.setAttribute("type", "hidden");
            hidden_buildinganalysis_edit_mode.setAttribute("name", "buildinganalysis_edit_mode");
            hidden_buildinganalysis_edit_mode.setAttribute("value", buildinganalysis_edit_mode);

            if(buildinganalysis_edit_mode == 1){
                var newuroof = document.getElementById("buildinganalysis-u_roof").value;
                var newuwall = document.getElementById("buildinganalysis-u_wall").value;
                var newufloor = document.getElementById("buildinganalysis-u_floor").value;
                var newuwindow = document.getElementById("buildinganalysis-u_window").value;
                var newpwindow = document.getElementById("buildinganalysis-p_window").value;
                var newstart = document.getElementById("buildinganalysis-heating_start").value;
                var newend = document.getElementById("buildinganalysis-heating_end").value;
                var newtheta = document.getElementById("buildinganalysis-avg_temp").value;
                var newcomfort= document.getElementById("buildinganalysis-avg_comfort").value;

                if(isNaN(newuroof) || newuroof <= 0 || newuroof > 100) {enableUformError("buildinganalysis-u_roof"); data_ok = false;}
                if(isNaN(newuwall) || newuwall <= 0 || newuwall > 100) {enableUformError("buildinganalysis-u_wall"); data_ok = false;}
                if(isNaN(newufloor) || newufloor <= 0 || newufloor > 100) {enableUformError("buildinganalysis-u_floor"); data_ok = false;}
                if(isNaN(newuwindow) || newuwindow <= 0 || newuwindow > 100) {enableUformError("buildinganalysis-u_window"); data_ok = false;}
                if(isNaN(newpwindow) || newpwindow <= 0 || newpwindow > 100) {enableUformError("buildinganalysis-p_window"); data_ok = false;}
                if(isNaN(newstart) || newstart <= 0 || newstart > 365) {enableUformError("buildinganalysis-heating_start"); data_ok = false;}
                if(isNaN(newend) || newend <= 0 || newend > 365) {enableUformError("buildinganalysis-heating_end"); data_ok = false;}
                if(isNaN(newtheta) || newtheta <= 0 || newtheta > 100) {enableUformError("buildinganalysis-avg_temp"); data_ok = false;}
                if(isNaN(newcomfort) || newcomfort <= 0 || newcomfort > 100) {enableUformError("buildinganalysis-avg_comfort"); data_ok = false;}

                var hidden_building_u_roof = document.createElement("input");
                hidden_building_u_roof.setAttribute("type", "hidden");
                hidden_building_u_roof.setAttribute("name", "building_u_roof");
                hidden_building_u_roof.setAttribute("value", newuroof);

                var hidden_building_u_wall = document.createElement("input");
                hidden_building_u_wall.setAttribute("type", "hidden");
                hidden_building_u_wall.setAttribute("name", "building_u_wall");
                hidden_building_u_wall.setAttribute("value", newuwall);

                var hidden_building_u_floor = document.createElement("input");
                hidden_building_u_floor.setAttribute("type", "hidden");
                hidden_building_u_floor.setAttribute("name", "building_u_floor");
                hidden_building_u_floor.setAttribute("value", newufloor);

                var hidden_building_u_window = document.createElement("input");
                hidden_building_u_window.setAttribute("type", "hidden");
                hidden_building_u_window.setAttribute("name", "building_u_window");
                hidden_building_u_window.setAttribute("value", newuwindow);

                var hidden_building_p_window = document.createElement("input");
                hidden_building_p_window.setAttribute("type", "hidden");
                hidden_building_p_window.setAttribute("name", "building_p_window");
                hidden_building_p_window.setAttribute("value", newpwindow);

                var hidden_building_heating_start = document.createElement("input");
                hidden_building_heating_start.setAttribute("type", "hidden");
                hidden_building_heating_start.setAttribute("name", "building_heating_start");
                hidden_building_heating_start.setAttribute("value", newstart);

                var hidden_building_heating_end = document.createElement("input");
                hidden_building_heating_end.setAttribute("type", "hidden");
                hidden_building_heating_end.setAttribute("name", "building_heating_end");
                hidden_building_heating_end.setAttribute("value", newend);

                var hidden_building_theta = document.createElement("input");
                hidden_building_theta.setAttribute("type", "hidden");
                hidden_building_theta.setAttribute("name", "building_theta");
                hidden_building_theta.setAttribute("value", newtheta);

                var hidden_building_comfort_avg = document.createElement("input");
                hidden_building_comfort_avg.setAttribute("type", "hidden");
                hidden_building_comfort_avg.setAttribute("name", "building_comfort_avg");
                hidden_building_comfort_avg.setAttribute("value", newcomfort);

                form.appendChild(hidden_building_u_roof);
                form.appendChild(hidden_building_u_wall);
                form.appendChild(hidden_building_u_floor);
                form.appendChild(hidden_building_u_window);
                form.appendChild(hidden_building_p_window);
                form.appendChild(hidden_building_heating_start);
                form.appendChild(hidden_building_heating_end);
                form.appendChild(hidden_building_theta);
                form.appendChild(hidden_building_comfort_avg);
            }

            form.appendChild(hidden_building_climatic_zone);
            form.appendChild(hidden_building_pilot);
            form.appendChild(hidden_building_refurbishm);
            form.appendChild(hidden_building_typology);
            form.appendChild(hidden_building_contructionyear);
            form.appendChild(hidden_building_floors);
            form.appendChild(hidden_building_per_diff);
            form.appendChild(hidden_building_height_val);
            form.appendChild(hidden_building_area);
            form.appendChild(hidden_building_ave_floor);
            form.appendChild(hidden_building_irradiation);
            form.appendChild(hidden_building_delta_u);
            form.appendChild(hidden_building_position);
            form.appendChild(hidden_buildinganalysis_edit_mode);

            document.body.appendChild(form);

            if(data_ok){
                if(HEATING_ECOMAP) var url = 'http://sunshine.sinergis.it/client3D/Apps/php/simulate_heating.php';
                else var url = 'http://sunshine.sinergis.it/client3D/Apps/php/simulate_cooling.php';

                $.ajax({
                    url: url,
                    type: 'POST',
                    data: jQuery('#buildinganalysis-simulation-form').serialize()
                }).done(function(results) {
                        document.body.removeChild(form);

                        var newepgl = results.split('@@')[0];
                        var newepi = results.split('@@')[1];

                        if(defined(newepgl) && !isNaN(newepgl)){
                            if(HEATING_ECOMAP) var newco2 = (newepgl * 0.20);
                            else var newco2 = (newepgl * 0.40);

                            var range = -1;

                            if(newepgl <= 0) range = -2;
                            if(newepgl == -9999) range = -9999;
                            if(newepgl == 0) range = -1;
                            if(newepgl > 0 && newepgl <= 30) range = 0;
                            if(newepgl > 30 && newepgl <= 60) range = 1;
                            if(newepgl > 60 && newepgl <= 120) range = 2;
                            if(newepgl > 120 && newepgl <= 180) range = 3;
                            if(newepgl > 180 && newepgl <= 220) range = 4;
                            if(newepgl > 220 && newepgl <= 270) range = 5;
                            if(newepgl > 270 && newepgl <= 9999) range = 6;


                            if(range>=0 || range == -2){
                                if(HEATING_ECOMAP){
                                    var color_A = "rgba(56,117,62,0.5)";
                                    var color_B = "rgba(91,163,74,0.5)";
                                    var color_C = "rgba(161,205,80,0.5)";
                                    var color_D = "rgba(246,221,83,0.5)";
                                    var color_E = "rgba(243,141,62,0.5)";
                                    var color_F = "rgba(236,64,54,0.5)";
                                    var color_G = "rgba(235,29,61,0.5)";
                                }
                                else{
                                    var color_A = "rgba(179, 214, 255,0.5)";
                                    var color_B = "rgba(102, 172, 255,0.5)";
                                    var color_C = "rgba(0, 117, 255,0.5)";
                                    var color_D = "rgba(0, 82, 179,0.5)";
                                    var color_E = "rgba(210, 77, 255,0.5)";
                                    var color_F = "rgba(180,71,235,0.5)";
                                    var color_G = "rgba(146,0,235,0.5)";
                                }
                                var color_NOT_POSSIBLE = "rgba(102,204,255,0.5)";

                                var newcolor;
                                if(range == -2) newcolor = color_NOT_POSSIBLE;
                                if(range == 0) newcolor = color_A;
                                if(range == 1) newcolor = color_B;
                                if(range == 2) newcolor = color_C;
                                if(range == 3) newcolor = color_D;
                                if(range == 4) newcolor = color_E;
                                if(range == 5) newcolor = color_F;
                                if(range == 6) newcolor = color_G;
                            }
                            else if(range == -1){
                                var color_NOT_VALID = "rgba(192,192,192,0.5)";
                                newcolor = color_NOT_VALID;
                            }
                            else if(range == -9999){
                                var color_NO_DATA = "lightgray";
                                newcolor = color_NO_DATA;
                            }

                            document.getElementById("buildingAnalysis-label").style.backgroundColor = newcolor;
                            document.getElementById("buildingAnalysis-label2").style.backgroundColor = newcolor;
                            document.getElementById("buildingAnalysis-label3").style.backgroundColor = newcolor;

                            if(newepgl>0){
                                $('#buildinganalysis-consumpion').each(function () {
                                    var $this = $(this);
                                    jQuery({ Counter: 0 }).animate({ Counter: newepgl}, {
                                        duration: 1000,
                                        easing: 'swing',
                                        step: function () {
                                            $this.text(this.Counter.toFixed(2).toString().substring(0,5));
                                        }
                                    });
                                });

                                $('#buildinganalysis-consuption2').each(function () {
                                    var $this = $(this);
                                    jQuery({ Counter: 0 }).animate({ Counter: newepi}, {
                                        duration: 1000,
                                        easing: 'swing',
                                        step: function () {
                                            $this.text(this.Counter.toFixed(2).toString().substring(0,5));
                                        }
                                    });
                                });

                                $('#buildinganalysis-emission').each(function () {

                                    var $this = $(this);
                                    jQuery({ Counter: 0 }).animate({ Counter: newco2}, {
                                        duration: 1000,
                                        easing: 'swing',
                                        step: function () {
                                            $this.text(this.Counter.toFixed(2).toString().substring(0,5));
                                        }
                                    });
                                });
                            }
                            else{
                                document.getElementById("buildinganalysis-consumpion").textContent = newepgl.toString().substring(0,5);
                                document.getElementById("buildinganalysis-consuption2").textContent = newepi.toString().substring(0,5);
                                document.getElementById("buildinganalysis-emission").textContent = newco2.toString().substring(0,5);

                                if(range == -2)  setTimeout(function(){ alert("Building simulation not accurate for this climatic zone"); }, 1100);
                            }
                        }
                        else{
                            if(selectionyears.options[selectionyears.selectedIndex].value < 1900){
                                alert("No historical data for this pilot.");
                            }
                        }
                    });
            }
            else{
                document.body.removeChild(form);
            }
        });
    }

    function enableBuildingEditing(){
        buildinganalysis_edit_mode = 1;

        document.getElementById("buildinganalysis-u_roof").readOnly = false;
        document.getElementById("buildinganalysis-u_wall").readOnly = false;
        document.getElementById("buildinganalysis-u_floor").readOnly = false;
        document.getElementById("buildinganalysis-u_window").readOnly = false;
        document.getElementById("buildinganalysis-p_window").readOnly = false;
        document.getElementById("buildinganalysis-heating_start").readOnly = false;
        document.getElementById("buildinganalysis-heating_end").readOnly= false;
        document.getElementById("buildinganalysis-avg_temp").readOnly = false;
        document.getElementById("buildinganalysis-avg_comfort").readOnly = false;

        var color_enabled = "#FFFFFF";

        document.getElementById("buildinganalysis-u_roof").style.backgroundColor = color_enabled;
        document.getElementById("buildinganalysis-u_wall").style.backgroundColor = color_enabled;
        document.getElementById("buildinganalysis-u_floor").style.backgroundColor = color_enabled;
        document.getElementById("buildinganalysis-u_window").style.backgroundColor = color_enabled;
        document.getElementById("buildinganalysis-p_window").style.backgroundColor = color_enabled;
        document.getElementById("buildinganalysis-heating_start").style.backgroundColor = color_enabled;
        document.getElementById("buildinganalysis-heating_end").style.backgroundColor = color_enabled;
        document.getElementById("buildinganalysis-avg_temp").style.backgroundColor = color_enabled;
        document.getElementById("buildinganalysis-avg_comfort").style.backgroundColor = color_enabled;
    }

    function disableBuildingEditing(){
        buildinganalysis_edit_mode = 0;

        document.getElementById("buildinganalysis-u_roof").readOnly = true;
        document.getElementById("buildinganalysis-u_wall").readOnly = true;
        document.getElementById("buildinganalysis-u_floor").readOnly = true;
        document.getElementById("buildinganalysis-u_window").readOnly = true;
        document.getElementById("buildinganalysis-p_window").readOnly = true;
        document.getElementById("buildinganalysis-heating_start").readOnly = true;
        document.getElementById("buildinganalysis-heating_end").readOnly= true;
        document.getElementById("buildinganalysis-avg_temp").readOnly = true;
        document.getElementById("buildinganalysis-avg_comfort").readOnly = true;

        var color_disabled = "#d5d5d5";

        document.getElementById("buildinganalysis-u_roof").style.backgroundColor = color_disabled;
        document.getElementById("buildinganalysis-u_wall").style.backgroundColor = color_disabled;
        document.getElementById("buildinganalysis-u_floor").style.backgroundColor = color_disabled;
        document.getElementById("buildinganalysis-u_window").style.backgroundColor = color_disabled;
        document.getElementById("buildinganalysis-p_window").style.backgroundColor = color_disabled;
        document.getElementById("buildinganalysis-heating_start").style.backgroundColor = color_disabled;
        document.getElementById("buildinganalysis-heating_end").style.backgroundColor = color_disabled;
        document.getElementById("buildinganalysis-avg_temp").style.backgroundColor = color_disabled;
        document.getElementById("buildinganalysis-avg_comfort").style.backgroundColor = color_disabled;

        document.getElementById("buildinganalysis-u_roof").style.borderColor = color_disabled;
        document.getElementById("buildinganalysis-u_wall").style.borderColor = color_disabled;
        document.getElementById("buildinganalysis-u_floor").style.borderColor = color_disabled;
        document.getElementById("buildinganalysis-u_window").style.borderColor = color_disabled;
        document.getElementById("buildinganalysis-p_window").style.borderColor = color_disabled;
        document.getElementById("buildinganalysis-heating_start").style.borderColor = color_disabled;
        document.getElementById("buildinganalysis-heating_end").style.borderColor = color_disabled;
        document.getElementById("buildinganalysis-avg_temp").style.borderColor = color_disabled;
        document.getElementById("buildinganalysis-avg_comfort").style.borderColor = color_disabled;
    }

    function enableUformError(who){
        var color_error = "#ff0000";

        if(who == "buildinganalysis-u_roof") document.getElementById("buildinganalysis-u_roof").style.borderColor = color_error;
        if(who == "buildinganalysis-u_wall") document.getElementById("buildinganalysis-u_wall").style.borderColor = color_error;
        if(who == "buildinganalysis-u_floor") document.getElementById("buildinganalysis-u_floor").style.borderColor = color_error;
        if(who == "buildinganalysis-u_window") document.getElementById("buildinganalysis-u_window").style.borderColor = color_error;
        if(who == "buildinganalysis-p_window") document.getElementById("buildinganalysis-p_window").style.borderColor = color_error;
        if(who == "buildinganalysis-heating_start") document.getElementById("buildinganalysis-heating_start").style.borderColor = color_error;
        if(who == "buildinganalysis-heating_end") document.getElementById("buildinganalysis-heating_end").style.borderColor = color_error;
        if(who == "buildinganalysis-avg_temp") document.getElementById("buildinganalysis-avg_temp").style.borderColor = color_error;
        if(who == "buildinganalysis-avg_comfort") document.getElementById("buildinganalysis-avg_comfort").style.borderColor = color_error;
    }

    function disableUformError(){
        var color_error = "#FFFFFF";

        document.getElementById("buildinganalysis-u_roof").style.borderColor = color_error;
        document.getElementById("buildinganalysis-u_wall").style.borderColor = color_error;
        document.getElementById("buildinganalysis-u_floor").style.borderColor = color_error;
        document.getElementById("buildinganalysis-u_window").style.borderColor = color_error;
        document.getElementById("buildinganalysis-p_window").style.borderColor = color_error;
        document.getElementById("buildinganalysis-heating_start").style.borderColor = color_error;
        document.getElementById("buildinganalysis-heating_end").style.borderColor = color_error;
        document.getElementById("buildinganalysis-avg_temp").style.borderColor = color_error;
        document.getElementById("buildinganalysis-avg_comfort").style.borderColor = color_error;
    }

    function setConstructionYear(){
        var time = new Date();
        var selectionyears = document.getElementById("buildinganalysis-newyear");

        var lenght = selectionyears.options.length;
        for (i = 0; i < lenght; i++) {
            selectionyears.remove(0);
        }

        var option = document.createElement("option");
        option.textContent = "0 - 1500";
        option.value = 0;
        selectionyears.add(option);
        if(building_contructionyear>=0 && building_contructionyear<=1500) option.selected = true;


        option = document.createElement("option");
        option.textContent = "1501 - 1899";
        option.value = 1501;
        selectionyears.add(option);
        if(building_contructionyear>=1501 && building_contructionyear<=1899) option.selected = true;

        for(var i=1900;i<=time.getFullYear();i++){
            var option = document.createElement("option");
            option.textContent = i;
            option.value = i;
            if(i==building_contructionyear) option.selected = true;
            selectionyears.add(option);
        }
    }

    function setBuildingTypologies(){
        var selectionyears = document.getElementById("buildinganalysis-newyear");
        var value = selectionyears.options[selectionyears.selectedIndex].value;

        var selectiontypology = document.getElementById("buildinganalysis-newtypology");

        var lenght = selectiontypology.options.length;
        for (i = 0; i < lenght; i++) {
            selectiontypology.remove(0);
        }

        for(var key in building_tipologies){
            if(value>= 1900){
                if(key != 5 && key != 6){
                    var option = document.createElement("option");
                    option.textContent = building_tipologies[key];
                    option.value = key;
                    if(key==building_typology) option.selected = true;
                    selectiontypology.add(option);
                }
            }
            else{
                if(key == 5 || key == 6){
                    var option = document.createElement("option");
                    option.textContent = building_tipologies[key];
                    option.value = key;
                    if(key==building_typology) option.selected = true;
                    selectiontypology.add(option);
                }
            }
        }
    }

    function setRefurbishmentLevel(){
        var selectionyears = document.getElementById("buildinganalysis-newyear");
        var value = selectionyears.options[selectionyears.selectedIndex].value;

        var selectionrefurbishment= document.getElementById("buildinganalysis-newrefurbishment");

        lenght = selectionrefurbishment.options.length;
        for (i = 0; i < lenght; i++) {
            selectionrefurbishment.remove(0);
        }

        if(value>= 1900){
            for(var key in building_refurbishms){
                var option = document.createElement("option");
                option.textContent = building_refurbishms[key];
                option.value = key;
                if(key==building_refurbishm) option.selected = true;
                selectionrefurbishment.add(option);
            }
        }
        else{
            var option = document.createElement("option");
            option.textContent = "Not Applicable";
            option.value = "NA";
            selectionrefurbishment.add(option);
        }
    }

    function setApartmentPosition(){
        var selectiontypology = document.getElementById("buildinganalysis-newtypology");
        var value = selectiontypology.options[selectiontypology.selectedIndex].value;

        var selectionposition= document.getElementById("buildinganalysis-newposition");

        var lenght = selectionposition.options.length;
        for (i = 0; i < lenght; i++) {
            selectionposition.remove(0);
        }

        if(value < 5){
            for(var key in building_position){
                if(value == 1){
                    var option = document.createElement("option");
                    option.textContent = building_position[key];
                    option.value = key;
                    selectionposition.add(option);
                    break;
                }
                else if(key != 0){
                    var option = document.createElement("option");
                    option.textContent = building_position[key];
                    option.value = key;
                    selectionposition.add(option);
                }
            }
        }
        else{
            var option = document.createElement("option");
            option.textContent = "Not Applicable";
            option.value = "NA";
            selectionposition.add(option);
        }
    }

    function restoreDefaults(){
        disableBuildingEditing();

        document.getElementById("buildinganalysis-u_roof").value = building_u_roof;
        document.getElementById("buildinganalysis-u_wall").value = building_u_wall;
        document.getElementById("buildinganalysis-u_floor").value = building_u_floor;
        document.getElementById("buildinganalysis-u_window").value = building_u_window;
        document.getElementById("buildinganalysis-p_window").value = building_p_window;
        document.getElementById("buildinganalysis-heating_start").value = building_heating_start;
        document.getElementById("buildinganalysis-heating_end").value = building_heating_end;
        document.getElementById("buildinganalysis-avg_temp").value = building_theta;
        document.getElementById("buildinganalysis-avg_comfort").value = building_comfort_avg;

        setConstructionYear();
        setBuildingTypologies();
        setRefurbishmentLevel();
        setApartmentPosition();
    }

    function defined(param){
        if(param == undefined || param == "") return false;
        return true;
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

    function isReadOnly(value){
        document.getElementById("buildinganalysis-newyear").disabled = value;
        document.getElementById("buildinganalysis-newtypology").disabled = value;
        document.getElementById("buildinganalysis-newrefurbishment").disabled = value;
        document.getElementById("buildinganalysis-newposition").disabled = value;
        document.getElementById("buildinganalysis-simulate").disabled = value;
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

    function error(msg) {
        console.log("%c" + msg, "color:red;font-weight:bold;");
    }

    function done(msg) {
        console.log("%c" + msg, "color:green;font-weight:bold;");
    }

    function hideKMLGraph(){
        document.body.style.cursor = 'default';
        document.getElementById("fullScreenKMLGraph").className = "fullScreenGraphHidden";

        building_uuid = undefined;
    }
}
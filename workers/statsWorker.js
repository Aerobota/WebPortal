/**
 * Created by u.di.staso on 26/10/15.
 */

self.addEventListener('message', function(e) {
    var data = e.data;
    switch (data.cmd) {
        case 'askLampStatus':
            askForLamps(data.data);
            break;
        case 'askForScheduling':
            askForScheduling(data.data);
            break;
        case 'askForScheduling-Groups':
            askForScheduling_Groups(data.data);
            break;
        case 'askReverberi':
            askForReverberi(data.data);
            break;
        case 'askShelterStatus':
            askForShelters(data.data);
            break;
        default:
            break;
    };
}, false);

function askForLamps(parameters){
    var result = {"cmd": parameters.callback,"result":null, "error": null};
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 400) {result.error = "Response error";}
            if (isValidJSONResponse(xmlhttp)) {

                var lamps = JSON.parse(xmlhttp.responseText);

                if(defined(lamps)){
                    if(lamps.length>0){
                        result.result = lamps;
                    }
                    else{
                        result.error = "Empty response";
                    }
                }
                else{
                    result.error = "JSON not defined";
                }
            }
            else{
                result.error = "Not valid JSON";
            }

            self.postMessage(result);
        }
    }

    var url = "what=LAMPS&codespaceid=" + parameters.codespaceid + "&lightline=" + parameters.lightline + "&key=" + parameters.key + "&from=" + parameters.from + "&to=" + parameters.to;

    xmlhttp.open('POST', '../php/proxySTAT.php', true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(url);
}

function askForScheduling(parameters){
    var result = {"cmd": parameters.callback,"result":null, "error": null};
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 400) {result.error = "Response error";}

            if (isValidJSONResponse(xmlhttp)) {

                var config = JSON.parse(xmlhttp.responseText);

                if(defined(config)){
                    if(config.length>0){
                        result.result = config;
                    }
                    else{
                        result.error = "Empty response";
                    }
                }
                else{
                    result.error = "JSON not defined";
                }
            }
            else{
                result.error = "Not valid JSON";
            }

            self.postMessage(result);
        }
    }

    var url = "what=SCHEDULING&codespaceid=" + parameters.codespaceid + "&lightline=" + parameters.lightline + "&key=" + parameters.key;

    xmlhttp.open('POST', '../php/proxySTAT.php', true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(url);
}

function askForScheduling_Groups(parameters){

    var result = {"cmd": parameters.callback,"result":null, "error": null};
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
            if (xmlhttp.status == 400) {result.error = "Response error";}

            if (isValidJSONResponse(xmlhttp)) {
                var config = JSON.parse(xmlhttp.responseText);

                if(defined(config)){
                    if(config.length>0){
                        result.result = config;
                    }
                    else{
                        result.error = "Empty response";
                    }
                }
                else{
                    result.error = "JSON not defined";
                }
            }
            else{
                result.error = "Not valid JSON";
            }

            self.postMessage(result);
        }
    }

    var url = "what=SCHEDULING-GROUPS&codespaceid=" + parameters.codespaceid + "&groups=" + parameters.groups + "&key=" + parameters.key;

    xmlhttp.open('POST', '../php/proxySTAT.php', true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(url);
}

function askForShelters(parameters){
    var result = {"cmd": parameters.callback,"result":null, "error": null};
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {
         //   console.log(xmlhttp.responseText);
            if (xmlhttp.status == 400) {result.error = "Response error";}

            if (isValidJSONResponse(xmlhttp)) {

                var lamps = JSON.parse(xmlhttp.responseText);

                if(defined(lamps)){
                    if(lamps.length>0){
                        result.result = lamps;
                    }
                    else{
                        result.error = "Empty response";
                    }
                }
                else{
                    result.error = "JSON not defined";
                }
            }
            else{
                result.error = "Not valid JSON";
            }

            self.postMessage(result);
        }
    }

    var url = "what=SHELTERS&codespaceid=" + parameters.codespaceid + "&key=" + parameters.key + "&from=" + parameters.from + "&to=" + parameters.to;

    xmlhttp.open('POST', '../php/proxySTAT.php', true);
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(url);
}

function askForReverberi(parameters){

    var result = {"cmd": parameters.callback,"result":new Array(), "error": null};

    var to = new Date(parameters.to);
    var from = new Date(parameters.from);

    var lastDay = [31,28,31,30,31,30,31,31,30,31,30,31];

    for (var d = from; d <= to; d.setMonth(d.getMonth() + 1)) {
        var lastValue = undefined;

        var daystart = new Date(d);
        daystart.setHours(00,00,00);
        daystart.setDate(lastDay[daystart.getMonth()]);
        var dayend = new Date(daystart);
        dayend.setHours(23,59,59);

        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 400) {result.error = "Response error";}
                if (isValidJSONResponse(xmlhttp)) {

                    var json = JSON.parse(xmlhttp.responseText);

                    if(defined(json.resultValues)){
                        var observations = json.resultValues.split('@@');

                        if(observations.length>1){
                            lastValue = observations[observations.length-1];
                            //console.log("VALORE DA SENSORE--> " + lastValue);
                            //result.result.push(lastValue);
                        }
                        //else{
                        //    result.result.push(daystart.yyyy_mm_ddThh_min_sec() + "0Z,0");
                        //}
                    }

                    //error("Provo a chiedere dato su storici");
                    var daystart_historical = new Date(daystart);
                    daystart_historical.setDate(daystart_historical.getDate()-(lastDay[daystart_historical.getMonth()]+2)); //QUESTO MI EVITA I CASINI NEI PASSAGGI DA 31 A 30 O 28 GG (ES 31 FEBBRAIO DA MARZO)
                    var dayend_historical = new Date(dayend);
                    dayend_historical.setDate(dayend_historical.getDate()+5);

                    var xmlhttp_historical = new XMLHttpRequest();

                    xmlhttp_historical.onreadystatechange = function () {
                        if (xmlhttp_historical.readyState == 4) {
                            if (xmlhttp_historical.status == 400) {result.error = "Response error";}

                            if (isValidJSONResponse(xmlhttp_historical)) {

                                var json = JSON.parse(xmlhttp_historical.responseText);

                                 if(defined(json.resultValues)){
                                    var observations = json.resultValues.split('@@');

                                    if(observations.length>0){
                                        var lastValue_historical = observations[observations.length-1];

                                        if(defined(lastValue)) result.result.push(lastValue_historical.replace("000Z,","000Z,-") + "," + lastValue.split(",")[1]); //METTO IL NEGATIVO PER AVERE UNA DISCRIMINANTE IN QUANTO QUESTI SONO RELATIVI E NON ASSOLUTI!!!
                                        else result.result.push(lastValue_historical.replace("000Z,","000Z,-")); //METTO IL NEGATIVO PER AVERE UNA DISCRIMINANTE IN QUANTO QUESTI SONO RELATIVI E NON ASSOLUTI!!!
                                    }
                                    else{
                                        if(defined(lastValue))result.result.push(lastValue);
                                        else{error("nessun valore ne da sensore ne da storico, metto 0 su " + daystart.yyyy_mm_ddThh_min_sec()); result.result.push(daystart.yyyy_mm_ddThh_min_sec() + "0Z,0");}
                                    }
                                }
                                else{
                                     if(defined(lastValue))result.result.push(lastValue);
                                     else{error("nessun valore ne da sensore ne da storico, metto 0 su "  + daystart.yyyy_mm_ddThh_min_sec()); result.result.push(daystart.yyyy_mm_ddThh_min_sec() + "0Z,0");}
                                }
                            }
                            else{
                                result.error = "Not valid JSON";
                            }
                        }
                    }

                    var url_historical = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/ELER","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';

                    url_historical = url_historical.replace("__OFFERING__",parameters.offering.split("_")[0] + "_ELER_KWH_1m");
                    url_historical = url_historical.replace("__BEGINPOSITION__",daystart_historical.yyyy_mm_ddThh_min_sec());
                    url_historical = url_historical.replace("__ENDPOSITION__",dayend_historical.yyyy_mm_ddThh_min_sec());

                    call(url_historical);

                    url_historical = "body=" + url_historical + "&key=" + parameters.key;

                    xmlhttp_historical.open('POST', '../php/proxySOS.php', false); //SINCRONA
                    xmlhttp_historical.setRequestHeader("Content-type","application/x-www-form-urlencoded");
                    xmlhttp_historical.send(url_historical);
                }
                else{
                    result.error = "Not valid JSON";
                }
            }
        }

        var url = parameters.what;

        url = url.replace("__OFFERING__",parameters.offering);
        url = url.replace("__BEGINPOSITION__",daystart.yyyy_mm_ddThh_min_sec());
        url = url.replace("__ENDPOSITION__",dayend.yyyy_mm_ddThh_min_sec());

        call(url);

        url = "body=" + url + "&key=" + parameters.key;

        xmlhttp.open('POST', '../php/proxySOS.php', false); //SINCRONA
        xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xmlhttp.send(url);

    }

    self.postMessage(result);
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

function call(msg) {
    console.log("%c" + msg, "color:purple;font-weight:bold;font-size:10px;");
}

function error(msg) {
    console.log("%c" + msg, "color:red;font-weight:bold;");
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

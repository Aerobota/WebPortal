/**
 * Created by u.di.staso on 26/10/15.
 */

self.addEventListener('message', function(e) {
    var data = e.data;
    switch (data.cmd) {
        case 'askForSOS':
            makeSOSRequest(data.data,0);
            break;
        case 'askForSOS_1dReverberi':
            makeSOSRequest41D(data.data);
            break;
        default:
            break;
    };
}, false);

var LIMIT = 2;
function makeSOSRequest(parameters,times){
    var result = {"cmd": parameters.callback,"result":null, "error": null};
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4) {

            if (xmlhttp.status == 400) {result.error = "Response error";}
            if (isValidJSONResponse(xmlhttp)) {

                var json = JSON.parse(xmlhttp.responseText);

                if(defined(json.resultValues)){
                    var observations = json.resultValues.split('@@');

                    if(observations.length>1){
                        result.result = observations;
                    }
                    else{
                        result.error = "Not enough data for "  + parameters.offering + ": " + observations.length + " observations for this range of date";
                        times++;
                    }
                }
                else{
                    result.error = "Empty observations for " + parameters.offering;
                    times++;
                }
            }
            else{
                result.error = "Not valid JSON";
                times++;
            }

            if(defined(result.result))self.postMessage(result);
            else if(defined(result.error) && times<LIMIT) {error("Errore nel download dei dati di " + parameters.offering + ", RIPROVO"); setTimeout(function(){makeSOSRequest(parameters,times);}, Math.random()*100);}
            else if(defined(result.error)) self.postMessage(result);
        }
    }

    var url = parameters.what;

    url = url.replace("__OFFERING__",parameters.offering);
    url = url.replace("__BEGINPOSITION__",parameters.from);
    url = url.replace("__ENDPOSITION__",parameters.to);

    if(times==0) call(url);

    url = "body=" + url + "&key=" + parameters.key;

    xmlhttp.open('POST', '../php/proxySOS.php', true); //SINCRONA
    xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
    xmlhttp.send(url);
}

function makeSOSRequest41D(parameters){

    var result = {"cmd": parameters.callback,"result":new Array(), "error": null};

    var to = new Date(parameters.to);
    var from = new Date(parameters.from);

    for (var d = from; d < to; d.setDate(d.getDate() + 1)) {
        var daystart = new Date(d);
        daystart.setHours(00,00,00);
        var dayend = new Date(d);
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
                            var lastValue = observations[observations.length-1];

                            result.result.push(lastValue);
                        }
                        else{
                            result.result.push(daystart.yyyy_mm_ddThh_min_sec() + "0Z,0");
                        }
                    }
                    else{
                        result.result.push(daystart.yyyy_mm_ddThh_min_sec() + "0Z,0");
                    }
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
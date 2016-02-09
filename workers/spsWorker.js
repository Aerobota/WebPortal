/**
 * Created by u.di.staso on 26/10/15.
 */

self.addEventListener('message', function(e) {
    var data = e.data;
    switch (data.cmd) {
        case 'askForSPS':
            makeSPSRequest(data.data);
            break;
        default:
            break;
    };
}, false);

var networkSPSREPEATURL = '__START__,__END__,__DIMMING__,__FREQUENCY__,__WEEK__,Y,__HOUR__,N,Y,__PRIORITY__';

function makeSPSRequest(parameters){
    var result = {"cmd": parameters.callback,"result":null, "error": null};

    var startSent = false;
    var allAccepted = 0;
    for(var i=0;i<parameters.nrCommand;i++){

        if(i==0 || (i>0 && startSent)){
            var spsid = parameters.spsid;
            var daystart = new Date(parameters.start);
            var dayend = new Date(parameters.end);
            var dimming = parameters.dimming[i];
            var hours = parameters.hours[i];
            var frequency = parameters.frequency;
            var priority = parameters.priority;
            var daysOfWeek = parameters.daysOfWeek;

            var url =  networkSPSREPEATURL.replace("__START__",daystart.getFullYear() +"-"+ ('0' + (daystart.getMonth()+1)).slice(-2) +"-"+ ('0' + daystart.getDate()).slice(-2) + "T12:00:00+0" + parameters.startTimezone + "00");
            url =  url.replace("__END__","Y," + dayend.getFullYear() +"-"+ ('0' + (dayend.getMonth()+1)).slice(-2) +"-"+ ('0' + dayend.getDate()).slice(-2) + "T11:00:00+0" + parameters.endTimezone + "00");
            url =  url.replace("__DIMMING__",dimming);
            url =  url.replace("__FREQUENCY__",frequency);
            url =  url.replace("__WEEK__",daysOfWeek);
            url =  url.replace("__HOUR__",hours.replace(/:/g,"").trim());
            url =  url.replace("__PRIORITY__",priority);
            url = encodeURIComponent(url);

            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200 && defined(xmlhttp.responseText)) {
                        console.log("SPS COMMAND " + i + " --> " + xmlhttp.responseText);
                        if(i==0) startSent = true;
                        if(xmlhttp.responseText.indexOf("<ns:requestStatus>Accepted</ns:requestStatus>")>0) allAccepted += 1;
                    }
                    else
                        result.error = "XML not valid";
                }
            }

            url = "procedure=" + spsid + "&body=" + url + "&key=" + parameters.key;

            // Send the POST request
            xmlhttp.open('POST', '../php/proxySPS.php', false);
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send(url);
        }
    }

        if(startSent){
            var dimming = 110;
            var dayend = new Date(parameters.end);
            var priority = parameters.priority;

            url =  networkSPSREPEATURL.replace("__START__",dayend.getFullYear() +"-"+ ('0' + (dayend.getMonth()+1)).slice(-2) +"-"+ ('0' + dayend.getDate()).slice(-2) + "T11:00:00+0" + parameters.startTimezone + "00");
            url =  url.replace("__END__","Y," + dayend.getFullYear() +"-"+ ('0' + (dayend.getMonth()+1)).slice(-2) +"-"+ ('0' + dayend.getDate()).slice(-2) + "T11:00:00+0" + parameters.endTimezone + "00");
            url =  url.replace("__DIMMING__",dimming);
            url =  url.replace("__FREQUENCY__","Y,24");
            url =  url.replace("__WEEK__","N");
            url =  url.replace("__HOUR__","1100");
            url =  url.replace("__PRIORITY__",priority);
            url = encodeURIComponent(url);

            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == 4) {
                    if (xmlhttp.status == 200 && defined(xmlhttp.responseText)) {
                        console.log("SPS RESET --> " + xmlhttp.responseText);
                        if(xmlhttp.responseText.indexOf("<ns:requestStatus>Accepted</ns:requestStatus>")>0) allAccepted += 1;
                    }
                    else
                        result.error = "XML not valid";
                }
            }

            url = "procedure=" + spsid + "&body=" + url + "&key=" + parameters.key;

            // Send the POST request
            xmlhttp.open('POST', '../php/proxySPS.php', false);
            xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
            xmlhttp.send(url);
        }

        var accepted = false;
        if (allAccepted == parameters.nrCommand+1) accepted = true;
        var output = {"device": parameters.device,"accepted":accepted};
        result.result = output;
        self.postMessage(result);
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

Date.prototype.yyyy_mm_ddThh_min_sec = function() {
    var yyyy = this.getFullYear().toString();
    var mm = ('0' + (this.getMonth()+1)).slice(-2);
    var dd  = ('0' + (this.getDate())).slice(-2);
    var hh  = ('0' + (this.getHours())).slice(-2);
    var min  = ('0' + (this.getMinutes())).slice(-2);
    var sec  = "00";
    return yyyy + "-" + mm + "-" + dd + "T" + hh + ":" + min + ":" + sec;
};
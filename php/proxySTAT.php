<?php
/*
 * PHP custom proxy : avoid CORS policy problems
 *
 */

$method = $_SERVER['REQUEST_METHOD'];
set_time_limit(100);

switch ($method) {
  case 'PUT':
    break;
  case 'GET':
    break;
  case 'POST':
    if(isset($_POST['what']) && isset($_POST['codespaceid']) && isset($_POST['key'])){

        $WHAT=$_POST["what"];

        switch ($WHAT) {
            case 'LAMPS':
                if(isset($_POST['lightline'])){
                    $CODESPACEID=$_POST["codespaceid"];
                    $LIGHTLINE=$_POST["lightline"];
                    $FROM=$_POST["from"];
                    $TO=$_POST["to"];
                    $KEY=$_POST["key"];

                    $headers = array();
                    $headers[] = "Content-Type: application/json";
                    $headers[] = "Accept: application/json";

                    $url = str_replace("__CODESPACE__", urlencode($CODESPACEID) ,"http://sunshine.sinergis.it/geoserver/sunshine/ows?service=WFS&version=2.0&request=GetFeature&typeName=sunshine:featureofinterest&outputFormat=application/json&CQL_Filter=(codespaceid%3D__CODESPACE__%20)and(%20identifier%20LIKE%20%27%25lamp%25%27)and(%20procedureidentifier%20LIKE%20%27%25__LIGHTLINE__%25%27)");
                    $url = str_replace("__LIGHTLINE__", urlencode($LIGHTLINE) , $url);

                    $process = curl_init($url);
                    curl_setopt($process, CURLOPT_HTTPHEADER, $headers);
                    curl_setopt($process, CURLOPT_TIMEOUT, 100);
                    curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
                    $return = curl_exec($process);
                    curl_close($process);

                    $json = json_decode($return, true);

                    $count =  $json["totalFeatures"];

                    $arr = array();
                    for($i=0;$i<$count;$i++){
                        $procedure = $json["features"][$i]["properties"]["procedureidentifier"];
                        $name = $json["features"][$i]["properties"]["name"];

                        $id = trim(str_replace("http://www.sunshineproject.eu/swe/procedure/", " ", $procedure));

                        $__OFFERING__ = $id . "_STAT_NUL_ir";
                        $__BEGINPOSITION__ = $FROM;
                        $__ENDPOSITION__ = $TO;

                        $url = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/STAT","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';

                        $BODY = str_replace("__OFFERING__", $__OFFERING__, $url);
                        $BODY = str_replace("__BEGINPOSITION__", $__BEGINPOSITION__, $BODY);
                        $BODY = str_replace("__ENDPOSITION__", $__ENDPOSITION__, $BODY);

                        $headers = array();
                        $headers[] = "Content-Type: application/json";
                        $headers[] = "Accept: application/json";
                        $headers[] = "Authorization: Basic " . $KEY;

                        $process = curl_init("https://sunshine.sinergis.it/services/SOS");
                        curl_setopt($process, CURLOPT_HTTPHEADER, $headers);
                        curl_setopt($process, CURLOPT_TIMEOUT, 100);
                        curl_setopt($process, CURLOPT_POST, 1);
                        curl_setopt($process, CURLOPT_POSTFIELDS, $BODY);
                        curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
                        curl_setopt($process, CURLOPT_SSL_VERIFYPEER, FALSE);
                        $return = curl_exec($process);
                        curl_close($process);

                        $json2 = json_decode($return, true);

                        $element = array();
                        $element["id"] = $procedure;
                        $element["name"] = $name;
                        $values = array();

                        if($json2["resultValues"] != "" && $json2["resultValues"] != null){
                            $observations = explode('@@',$json2["resultValues"]);

                            for($j=1;$j<sizeof($observations);$j++){
                                $observation = $observations[$j];
                                $tmp = explode(",",$observation);
                                $time = $tmp[0];
                                $value = $tmp[1];

                                $values[$time] = $value;
                            }

                            $element[] = $values;
                        }
                        $arr[] = $element;
                    }

                    echo json_encode($arr);
                }
                break;

            case 'SCHEDULING':
                if(isset($_POST['lightline'])){

                    $CODESPACEID=$_POST["codespaceid"];
                    $LIGHTLINE=$_POST["lightline"];
                    $KEY=$_POST["key"];

                    $headers = array();
                    $headers[] = "Content-Type: application/json";
                    $headers[] = "Accept: application/json";

                    $url = str_replace("__CODESPACE__", urlencode($CODESPACEID) ,"http://sunshine.sinergis.it/geoserver/sunshine/ows?service=WFS&version=2.0&request=GetFeature&typeName=sunshine:featureofinterest&outputFormat=application/json&CQL_Filter=(codespaceid%3D__CODESPACE__%20)and(%20procedureidentifier%20LIKE%20%27%25__LIGHTLINE__%25%27)");
                    $url = str_replace("__LIGHTLINE__", urlencode($LIGHTLINE) , $url);

                    $process = curl_init($url);
                    curl_setopt($process, CURLOPT_HTTPHEADER, $headers);
                    curl_setopt($process, CURLOPT_TIMEOUT, 100);
                    curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
                    $return = curl_exec($process);
                    curl_close($process);

                    $json = json_decode($return, true);

                    $count =  $json["totalFeatures"];

                    $arr = array();
                    for($i=0;$i<$count;$i++){
                        $procedure = $json["features"][$i]["properties"]["procedureidentifier"];
                        $name = $json["features"][$i]["properties"]["name"];

                        $id = trim(str_replace("http://www.sunshineproject.eu/swe/procedure/", " ", $procedure));

                        $temp = explode("-", $id);
                        $code = trim($temp[0]);
                        $spsid = "http://www.sunshineproject.eu/sps/procedure/" . $id;

                        $URL = $code . "/tasks?spsid=" . $spsid;

                        $url = "https://sunshine.sinergis.it/services/grouping/css/" . $URL;

                        $headers = array();
                        $headers[] = "Content-Type: application/json";
                        $headers[] = "Accept: application/json";
                        $headers[] = "Authorization: Basic " . $KEY;

                        $process = curl_init($url);
                        curl_setopt($process, CURLOPT_HTTPHEADER, $headers);
                        curl_setopt($process, CURLOPT_TIMEOUT, 30);
                        curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
                        curl_setopt($process, CURLOPT_SSL_VERIFYPEER, FALSE);
                        $return = curl_exec($process);
                        curl_close($process);

                        $json2 = json_decode($return, true);
                        if($json2 != null){
                            $element = array();
                            $element["id"] = $procedure;
                            $element["name"] = $name;
                            $element["scheduling"] = array();
                            $values = array();


                            if(isset($json2["startdate"]) && isset($json2["enddate"])){
                                //echo "ELEMENTO SINGOLO \n\n";
                                //echo json_encode($json2, JSON_PRETTY_PRINT) . "\n\n\n";

                                    $values["dayofweek"] = $json2["dayofweek"];
                                    $values["dimm"] = $json2["dimm"];
                                    $values["enddate"] = $json2["enddate"];
                                    $values["next_fire"] = $json2["next_fire"];
                                    $values["priority"] = $json2["priority"];
                                    $values["startdate"] = $json2["startdate"];
                                    $values["task_id"]= $json2["task_id"];

                                    $element["scheduling"][] = $values;
                            }
                            else{
                                //echo "ELEMENTO MULTIPLO DI " . sizeof($json2) . "\n";
                                //echo json_encode($json2, JSON_PRETTY_PRINT) . "\n\n\n";

                                for($j=0;$j<sizeof($json2);$j++){
                                    if(isset($json2[$j]["startdate"]) && isset($json2[$j]["enddate"])){
                                        $values["dayofweek"] = $json2[$j]["dayofweek"];
                                        $values["dimm"] = $json2[$j]["dimm"];
                                        $values["enddate"] = $json2[$j]["enddate"];
                                        $values["next_fire"] = $json2[$j]["next_fire"];
                                        $values["priority"] = $json2[$j]["priority"];
                                        $values["startdate"] = $json2[$j]["startdate"];
                                        $values["task_id"]= $json2[$j]["task_id"];

                                        $element["scheduling"][] = $values;
                                    }
                                }
                            }

                            $arr[] = $element;
                        }
                    }

                    echo json_encode($arr);
                }
                break;
            case 'SCHEDULING-GROUPS':

                if(isset($_POST['groups'])){

                    $GROUP=$_POST["groups"];
                    $KEY=$_POST["key"];

                    $headers = array();
                    $headers[] = "Content-Type: application/json";
                    $headers[] = "Accept: application/json";
                    $headers[] = "Authorization: Basic " . $KEY;

                    $url = "https://sunshine.sinergis.it/services/grouping/css/__GROUPCODE__/groups";
                    $url = str_replace("__GROUPCODE__", urlencode($GROUP) , $url);

                    $process = curl_init($url);
                    curl_setopt($process, CURLOPT_HTTPHEADER, $headers);
                    curl_setopt($process, CURLOPT_TIMEOUT, 30);
                    curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
                    curl_setopt($process, CURLOPT_SSL_VERIFYPEER, FALSE);
                    $return = curl_exec($process);
                    curl_close($process);

                    $json = json_decode($return, true);

                    $count =  count($json);

                    $arr = array();
                    if(is_array($json)){
                        for($i=0;$i<$count;$i++){
                            $name = $json[$i]["group"]["usr_id"];
                            $spsid = $json[$i]["group"]["sps_id"];

                            $URL = $GROUP . "/tasks?spsid=" . $spsid;

                            $url = "https://sunshine.sinergis.it/services/grouping/css/" . $URL;

                            $headers = array();
                            $headers[] = "Content-Type: application/json";
                            $headers[] = "Accept: application/json";
                            $headers[] = "Authorization: Basic " . $KEY;

                            $process = curl_init($url);
                            curl_setopt($process, CURLOPT_HTTPHEADER, $headers);
                            curl_setopt($process, CURLOPT_TIMEOUT, 30);
                            curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
                            curl_setopt($process, CURLOPT_SSL_VERIFYPEER, FALSE);
                            $return = curl_exec($process);
                            curl_close($process);

                            $json2 = json_decode($return, true);
                            if($json2 != null){
                                $element = array();
                                $element["id"] = $spsid;
                                $element["name"] = $name;
                                $element["scheduling"] = array();
                                $values = array();


                                if(isset($json2["startdate"]) && isset($json2["enddate"])){
                                    //echo "ELEMENTO SINGOLO \n\n";
                                    //echo json_encode($json2, JSON_PRETTY_PRINT) . "\n\n\n";

                                        $values["dayofweek"] = $json2["dayofweek"];
                                        $values["dimm"] = $json2["dimm"];
                                        $values["enddate"] = $json2["enddate"];
                                        $values["next_fire"] = $json2["next_fire"];
                                        $values["priority"] = $json2["priority"];
                                        $values["startdate"] = $json2["startdate"];
                                        $values["task_id"]= $json2["task_id"];

                                        $element["scheduling"][] = $values;
                                }
                                else{
                                    //echo "ELEMENTO MULTIPLO DI " . sizeof($json2) . "\n";
                                    //echo json_encode($json2, JSON_PRETTY_PRINT) . "\n\n\n";

                                    for($j=0;$j<sizeof($json2);$j++){
                                        if(isset($json2[$j]["startdate"]) && isset($json2[$j]["enddate"])){
                                            $values["dayofweek"] = $json2[$j]["dayofweek"];
                                            $values["dimm"] = $json2[$j]["dimm"];
                                            $values["enddate"] = $json2[$j]["enddate"];
                                            $values["next_fire"] = $json2[$j]["next_fire"];
                                            $values["priority"] = $json2[$j]["priority"];
                                            $values["startdate"] = $json2[$j]["startdate"];
                                            $values["task_id"]= $json2[$j]["task_id"];

                                            $element["scheduling"][] = $values;
                                        }
                                    }
                                }

                                $arr[] = $element;
                            }
                        }
                    }
                    else{
                        $name = $json["group"]["usr_id"];
                        $spsid = $json["group"]["sps_id"];

                        $URL = $GROUP . "/tasks?spsid=" . $spsid;

                        $url = "https://sunshine.sinergis.it/services/grouping/css/" . $URL;

                        $headers = array();
                        $headers[] = "Content-Type: application/json";
                        $headers[] = "Accept: application/json";
                        $headers[] = "Authorization: Basic " . $KEY;

                        $process = curl_init($url);
                        curl_setopt($process, CURLOPT_HTTPHEADER, $headers);
                        curl_setopt($process, CURLOPT_TIMEOUT, 30);
                        curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
                        curl_setopt($process, CURLOPT_SSL_VERIFYPEER, FALSE);
                        $return = curl_exec($process);
                        curl_close($process);

                        $json2 = json_decode($return, true);
                        if($json2 != null){
                            $element = array();
                            $element["id"] = $spsid;
                            $element["name"] = $name;
                            $element["scheduling"] = array();
                            $values = array();


                            if(isset($json2["startdate"]) && isset($json2["enddate"])){
                                //echo "ELEMENTO SINGOLO \n\n";
                                //echo json_encode($json2, JSON_PRETTY_PRINT) . "\n\n\n";

                                    $values["dayofweek"] = $json2["dayofweek"];
                                    $values["dimm"] = $json2["dimm"];
                                    $values["enddate"] = $json2["enddate"];
                                    $values["next_fire"] = $json2["next_fire"];
                                    $values["priority"] = $json2["priority"];
                                    $values["startdate"] = $json2["startdate"];
                                    $values["task_id"]= $json2["task_id"];

                                    $element["scheduling"][] = $values;
                            }
                            else{
                                //echo "ELEMENTO MULTIPLO DI " . sizeof($json2) . "\n";
                                //echo json_encode($json2, JSON_PRETTY_PRINT) . "\n\n\n";

                                for($j=0;$j<sizeof($json2);$j++){
                                    if(isset($json2[$j]["startdate"]) && isset($json2[$j]["enddate"])){
                                        $values["dayofweek"] = $json2[$j]["dayofweek"];
                                        $values["dimm"] = $json2[$j]["dimm"];
                                        $values["enddate"] = $json2[$j]["enddate"];
                                        $values["next_fire"] = $json2[$j]["next_fire"];
                                        $values["priority"] = $json2[$j]["priority"];
                                        $values["startdate"] = $json2[$j]["startdate"];
                                        $values["task_id"]= $json2[$j]["task_id"];

                                        $element["scheduling"][] = $values;
                                    }
                                }
                            }

                            $arr[] = $element;
                        }
                    }

                    echo json_encode($arr);
                }
                break;
            case 'SHELTERS':

                    /*$CODESPACEID=$_POST["codespaceid"];
                    $FROM=$_POST["from"];
                    $TO=$_POST["to"];
                    $KEY=$_POST["key"];

                    $headers = array();
                    $headers[] = "Content-Type: application/json";
                    $headers[] = "Accept: application/json";

                    $url = str_replace("__CODESPACE__", urlencode($CODESPACEID) ,"http://sunshine.sinergis.it/geoserver/sunshine/ows?service=WFS&version=2.0&request=GetFeature&typeName=sunshine:featureofinterest&outputFormat=application/json&CQL_Filter=(codespaceid%3D__CODESPACE__%20)and(%20identifier%20LIKE%20%27%25shelter%25%27)and(%20procedureidentifier%20LIKE%20%27%25TRN-0%25%27)");

                    $process = curl_init($url);
                    curl_setopt($process, CURLOPT_HTTPHEADER, $headers);
                    curl_setopt($process, CURLOPT_TIMEOUT, 100);
                    curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
                    $return = curl_exec($process);
                    curl_close($process);

                    $json = json_decode($return, true);

                    $count =  $json["totalFeatures"];

                    $arr = array();
                    for($i=0;$i<$count;$i++){
                        $procedure = $json["features"][$i]["properties"]["procedureidentifier"];
                        $name = $json["features"][$i]["properties"]["name"];
                        $foiid = $json["features"][$i]["properties"]["featureofinterestid"];
                        $isinvolved = $json["features"][$i]["properties"]["isinvolved"];

                        $id = trim(str_replace("http://www.sunshineproject.eu/swe/procedure/", " ", $procedure));

                        $__OFFERING__ = str_replace("-0", "-T", $id) . "_TEMP_CEL_15";
                        $__BEGINPOSITION__ = $FROM;
                        $__ENDPOSITION__ = $TO;

                        $url = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/TEMP","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';

                        $BODY = str_replace("__OFFERING__", $__OFFERING__, $url);
                        $BODY = str_replace("__BEGINPOSITION__", $__BEGINPOSITION__, $BODY);
                        $BODY = str_replace("__ENDPOSITION__", $__ENDPOSITION__, $BODY);
                        $headers = array();
                        $headers[] = "Content-Type: application/json";
                        $headers[] = "Accept: application/json";
                        $headers[] = "Authorization: Basic " . $KEY;

                        $process = curl_init("https://sunshine.sinergis.it/services/SOS");
                        curl_setopt($process, CURLOPT_HTTPHEADER, $headers);
                        curl_setopt($process, CURLOPT_TIMEOUT, 100);
                        curl_setopt($process, CURLOPT_POST, 1);
                        curl_setopt($process, CURLOPT_POSTFIELDS, $BODY);
                        curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
                        curl_setopt($process, CURLOPT_SSL_VERIFYPEER, FALSE);
                        $return = curl_exec($process);
                        curl_close($process);

                        $json2 = json_decode($return, true);

                        $element = array();
                        $element["id"] = $procedure;
                        $element["name"] = $name;
                        $element["foiid"] = $foiid;
                        $element["isinvolved"] = $isinvolved;

                        if($json2["resultValues"] != "" && $json2["resultValues"] != null){
                            $observations = explode('@@',$json2["resultValues"]);

                            $total = 0;
                            for($j=1;$j<sizeof($observations);$j++){
                                $observation = $observations[$j];
                                $tmp = explode(",",$observation);
                                $value = floatval($tmp[1]);

                                $total += $value;
                            }

                            $AVG_TEMP = $total/(sizeof($observations)-1);
                            $element["AVG_TEMP"] = $AVG_TEMP;

                            $__OFFERING__ = $id . "_ELER_KWH_15";
                            $__BEGINPOSITION__ = $FROM;
                            $__ENDPOSITION__ = $TO;

                            $url = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/ELER","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';

                            $BODY = str_replace("__OFFERING__", $__OFFERING__, $url);
                            $BODY = str_replace("__BEGINPOSITION__", $__BEGINPOSITION__, $BODY);
                            $BODY = str_replace("__ENDPOSITION__", $__ENDPOSITION__, $BODY);
                            $headers = array();
                            $headers[] = "Content-Type: application/json";
                            $headers[] = "Accept: application/json";
                            $headers[] = "Authorization: Basic " . $KEY;

                            $process = curl_init("https://sunshine.sinergis.it/services/SOS");
                            curl_setopt($process, CURLOPT_HTTPHEADER, $headers);
                            curl_setopt($process, CURLOPT_TIMEOUT, 100);
                            curl_setopt($process, CURLOPT_POST, 1);
                            curl_setopt($process, CURLOPT_POSTFIELDS, $BODY);
                            curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
                            curl_setopt($process, CURLOPT_SSL_VERIFYPEER, FALSE);
                            $return = curl_exec($process);
                            curl_close($process);

                            $json3 = json_decode($return, true);

                            if($json3["resultValues"] != "" && $json3["resultValues"] != null){
                                $observations3 = explode('@@',$json3["resultValues"]);

                                $total3 = 0;
                                for($k=1;$k<sizeof($observations3);$k++){
                                    $observation = $observations3[$k];
                                    $tmp = explode(",",$observation);
                                    $value = floatval($tmp[1]);

                                    $total3 += $value;
                                }

                                $AVG_KWH = $total3/(sizeof($observations3)-1);
                                $element["AVG_KWH"] = $AVG_KWH;

                                $url = "../shelter/" . $id . ".csv";

                                if (($handle = fopen($url, "r")) !== FALSE) {
                                  while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
                                    $num = count($data);
                                    for ($c=0; $c < $num-1; $c++) {
                                        $tmp = explode(';',$data[$c]);

                                        $temp = floatval($tmp[0]);
                                        $kwh =  floatval($tmp[1]);

                                        $tmp1 = explode(';',$data[$c+1]);
                                        $next =  floatval($tmp1[0]);

                                        if($temp <= $AVG_TEMP && $AVG_TEMP < $next){
                                            $element["CURVE_KWH"] = $kwh;
                                            $element["DELTA"] = abs($kwh-$AVG_KWH);
                                        }
                                    }
                                  }
                                  fclose($handle);
                                }
                            }
                        }
                        $arr[] = $element;
                    }

                    echo json_encode($arr);*/


                    $CODESPACEID=$_POST["codespaceid"];
                    $FROM=$_POST["from"];
                    $TO=$_POST["to"];
                    $KEY=$_POST["key"];

                    $headers = array();
                    $headers[] = "Content-Type: application/json";
                    $headers[] = "Accept: application/json";

                    $url = str_replace("__CODESPACE__", urlencode($CODESPACEID) ,"http://sunshine.sinergis.it/geoserver/sunshine/ows?service=WFS&version=2.0&request=GetFeature&typeName=sunshine:featureofinterest&outputFormat=application/json&CQL_Filter=(codespaceid%3D__CODESPACE__%20)and(%20identifier%20LIKE%20%27%25shelter%25%27)and(%20procedureidentifier%20LIKE%20%27%25TRN-0%25%27)");

                    $process = curl_init($url);
                    curl_setopt($process, CURLOPT_HTTPHEADER, $headers);
                    curl_setopt($process, CURLOPT_TIMEOUT, 100);
                    curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
                    $return = curl_exec($process);
                    curl_close($process);

                    $json = json_decode($return, true);

                    $count =  $json["totalFeatures"];

                    $arr = array();
                    for($i=0;$i<$count;$i++){
                        $procedure = $json["features"][$i]["properties"]["procedureidentifier"];
                        $name = $json["features"][$i]["properties"]["name"];
                        $foiid = $json["features"][$i]["properties"]["featureofinterestid"];
                        $identifier = $json["features"][$i]["properties"]["identifier"];
                        $isinvolved = $json["features"][$i]["properties"]["isinvolved"];

                        $id = trim(str_replace("http://www.sunshineproject.eu/swe/procedure/", " ", $procedure));

                        $__OFFERING__ = str_replace("-0", "-S", $id) . "_CCLD_NUL_1d";
                        $__BEGINPOSITION__ = $FROM;
                        $__ENDPOSITION__ = $TO;

                        $url = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/CCLD","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';

                        $BODY = str_replace("__OFFERING__", $__OFFERING__, $url);
                        $BODY = str_replace("__BEGINPOSITION__", $__BEGINPOSITION__, $BODY);
                        $BODY = str_replace("__ENDPOSITION__", $__ENDPOSITION__, $BODY);
                        $headers = array();
                        $headers[] = "Content-Type: application/json";
                        $headers[] = "Accept: application/json";
                        $headers[] = "Authorization: Basic " . $KEY;

                        $process = curl_init("https://sunshine.sinergis.it/services/SOS");
                        curl_setopt($process, CURLOPT_HTTPHEADER, $headers);
                        curl_setopt($process, CURLOPT_TIMEOUT, 100);
                        curl_setopt($process, CURLOPT_POST, 1);
                        curl_setopt($process, CURLOPT_POSTFIELDS, $BODY);
                        curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
                        curl_setopt($process, CURLOPT_SSL_VERIFYPEER, FALSE);
                        $return = curl_exec($process);
                        curl_close($process);

                        $json2 = json_decode($return, true);

                        $element = array();
                        $element["id"] = $procedure;
                        $element["name"] = $name;
                        $element["foiid"] = $foiid;
                        $element["identifier"] = $identifier;
                        $element["isinvolved"] = $isinvolved;

                        $CCLD = -1;
                        if($json2["resultValues"] != "" && $json2["resultValues"] != null){
                            $observations = explode('@@',$json2["resultValues"]);

                            if(sizeof($observations)==2){
                                $observation = $observations[1];
                                $tmp = explode(",",$observation);
                                $value = floatval($tmp[1]);

                                $CCLD = $value;
                            }
                        }

                        $element["S_CCLD"] = $CCLD;

                        $__OFFERING__ = str_replace("-0", "-S", $id) . "_CWRM_NUL_1d";
                        $__BEGINPOSITION__ = $FROM;
                        $__ENDPOSITION__ = $TO;

                        $url = '{"request": "GetResult","service": "SOS","version": "2.0.0","offering": "http://www.sunshineproject.eu/swe/offering/__OFFERING__","observedProperty": "http://www.sunshineproject.eu/swe/observableProperty/CWRM","temporalFilter": [{"during": {"ref": "om:phenomenonTime","value": ["__BEGINPOSITION__Z","__ENDPOSITION__Z"]}}]}';

                        $BODY = str_replace("__OFFERING__", $__OFFERING__, $url);
                        $BODY = str_replace("__BEGINPOSITION__", $__BEGINPOSITION__, $BODY);
                        $BODY = str_replace("__ENDPOSITION__", $__ENDPOSITION__, $BODY);
                        $headers = array();
                        $headers[] = "Content-Type: application/json";
                        $headers[] = "Accept: application/json";
                        $headers[] = "Authorization: Basic " . $KEY;

                        $process = curl_init("https://sunshine.sinergis.it/services/SOS");
                        curl_setopt($process, CURLOPT_HTTPHEADER, $headers);
                        curl_setopt($process, CURLOPT_TIMEOUT, 100);
                        curl_setopt($process, CURLOPT_POST, 1);
                        curl_setopt($process, CURLOPT_POSTFIELDS, $BODY);
                        curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
                        curl_setopt($process, CURLOPT_SSL_VERIFYPEER, FALSE);
                        $return = curl_exec($process);
                        curl_close($process);

                        $json3 = json_decode($return, true);

                        $CWRM = -1;
                        if($json3["resultValues"] != "" && $json3["resultValues"] != null){
                            $observations2 = explode('@@',$json3["resultValues"]);

                            if(sizeof($observations2)==2){
                                $observation = $observations2[1];
                                $tmp = explode(",",$observation);
                                $value = floatval($tmp[1]);

                                $CWRM = $value;
                            }
                        }

                        $element["S_CWRM"] = $CWRM;

                        $headers = array();
                        $headers[] = "Content-Type: application/json";
                        $headers[] = "Accept: application/json";
                        $headers[] = "Authorization: Basic " . $KEY;

                        $url = "https://sunshine.sinergis.it/services/suggestion/css/TRN/thresholds?foiuri=" . $identifier;

                        $process = curl_init($url);
                        curl_setopt($process, CURLOPT_HTTPHEADER, $headers);
                        curl_setopt($process, CURLOPT_TIMEOUT, 30);
                        curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
                        curl_setopt($process, CURLOPT_SSL_VERIFYPEER, FALSE);
                        $return = curl_exec($process);
                        curl_close($process);


                        $json4 = json_decode($return, true);


                        if($json4["thresholds"] != "" && $json4["thresholds"] != null){
                            $thresholds = $json4["thresholds"];
                            $selectedmonth = substr($TO,0,7) . "-01";

                            $warmthreshold = -1;
                            $coldthreshold = -1;
                            for($k=1;$k<sizeof($thresholds);$k++){
                                $observation = $thresholds[$k];
                                $day = $observation["day"];

                                if($day==$selectedmonth){
                                    $warmthreshold = $observation["warmthreshold"];
                                    $coldthreshold = $observation["coldthreshold"];
                                    break;
                                }
                            }

                            $element["warmthreshold"] = $warmthreshold;
                            $element["coldthreshold"] = $coldthreshold;
                        }

                        $arr[] = $element;
                    }

                    echo json_encode($arr);


                break;
            default:
                break;
        }
        return;
    }
    break;
  case 'DELETE':
    break;
  default:
    break;

  return null;
}
?>
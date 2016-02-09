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
  case 'POST':
    if( isset($_POST['procedure']) && isset($_POST['body']) && isset($_POST['key']) ){


        $PROCEDURE=$_POST["procedure"];
        $BODY=$_POST["body"];
        $KEY=$_POST["key"];

        $headers = array();
        $headers[] = "Content-Type: text/xml";
        $headers[] = "Authorization: Basic " . $KEY;

        $url = str_replace("__BODY__", $BODY,'<?xml version="1.0" ?><sps:Submit service="SPS" version="2.0.0" xmlns:sps="http://www.opengis.net/sps/2.0" xmlns:swe="http://www.opengis.net/swe/2.0"><sps:procedure>__PROCEDURE__</sps:procedure><sps:taskingParameters><sps:ParameterData><sps:encoding><swe:TextEncoding tokenSeparator="," blockSeparator="@@"/></sps:encoding><sps:values>__BODY__</sps:values></sps:ParameterData></sps:taskingParameters></sps:Submit>');
        $url = str_replace("__PROCEDURE__", $PROCEDURE,$url);

        $process = curl_init("https://sunshine.sinergis.it/services/SPS");
        curl_setopt($process, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($process, CURLOPT_TIMEOUT, 30);
        curl_setopt($process, CURLOPT_POST, 1);
        curl_setopt($process, CURLOPT_POSTFIELDS, $url);
        curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($process, CURLOPT_SSL_VERIFYPEER, FALSE);
        $return = curl_exec($process);
        curl_close($process);

        echo $url . "\n\n";
        echo $return;
        return;
    }
    break;
  case 'GET':
    break;
  case 'DELETE':
      parse_str(file_get_contents("php://input"),$delete_vars);
      if( isset($delete_vars['url']) && isset($delete_vars['spsid']) && isset($delete_vars['taskid']) && isset($delete_vars['key']) ){

              $URL=$delete_vars['url'];
              $SPSID=$delete_vars['spsid'];
              $TASKID=$delete_vars['taskid'];
              $KEY=$delete_vars['key'];

              $headers = array();
              $headers[] = "Authorization: Basic " . $KEY;

              $url = "https://sunshine.sinergis.it/services/grouping/css/" . $URL . "?taskid=" . $TASKID . "&spsid=" . $SPSID;

              $process = curl_init($url);
              curl_setopt($process, CURLOPT_HTTPHEADER, $headers);
              curl_setopt($process, CURLOPT_TIMEOUT, 30);
              curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
              curl_setopt($process, CURLOPT_SSL_VERIFYPEER, FALSE);
              curl_setopt($process, CURLOPT_CUSTOMREQUEST, 'DELETE');
              $return = curl_exec($process);
              curl_close($process);

              echo $return;
              return;
          }
      break;
  default:
    break;

  return null;
}

?>
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
    if( isset($_POST['body']) && isset($_POST['key']) ){

        $BODY=$_POST["body"];
        $KEY=$_POST["key"];

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


        echo $return;
        return;
    }
    break;
  case 'GET':
    if( isset($_GET['procedure']) && isset($_GET['key']) ){

        $PROCEDURE=$_GET["procedure"];
        $KEY=$_GET["key"];

        $headers = array();
        $headers[] = "Authorization: Basic " . $KEY;

        //$url = str_replace("__PROCEDURE__", $PROCEDURE ,"http://sunshine.sinergis.it/SOS40/service?service=SOS&version=2.0.0&request=DescribeSensor&procedure=__PROCEDURE__&procedureDescriptionFormat=http%3A%2F%2Fwww.opengis.net%2FsensorML%2F1.0.1");
        $url = str_replace("__PROCEDURE__", urlencode($PROCEDURE) ,"https://sunshine.sinergis.it/services/SOS?service=SOS&version=2.0.0&request=DescribeSensor&procedure=__PROCEDURE__&procedureDescriptionFormat=http:%2F%2Fwww.opengis.net%2FsensorML%2F1.0.1");

        $process = curl_init($url);
        curl_setopt($process, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($process, CURLOPT_TIMEOUT, 100);
        curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($process, CURLOPT_SSL_VERIFYPEER, FALSE);
        $return = curl_exec($process);
        curl_close($process);

        echo $return;
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
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
        $headers[] = "Content-Type: application/xml";
        $headers[] = "Accept: application/json";
        $headers[] = "Authorization: Basic " . $KEY;

        $process = curl_init("https://sunshine.sinergis.it/services/manageUser/changePasword");
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
  default:
    break;

  return null;
}

?>
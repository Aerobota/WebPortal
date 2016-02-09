<?php
/*
 * PHP custom proxy : avoid CORS policy problems
 *
 */

$method = $_SERVER['REQUEST_METHOD'];
set_time_limit(100);

switch ($method) {
    case 'PUT':
        parse_str(file_get_contents("php://input"),$put_vars);
        if(isset($put_vars['url']) && isset($put_vars['foiuri']) && isset($put_vars['date']) && isset($put_vars['hot']) && isset($put_vars['cold']) && isset($put_vars['key'])){

            $URL=$put_vars["url"];
            $KEY=$put_vars["key"];
            $FOIURI=$put_vars["foiuri"];
            $DATE=$put_vars["date"];
            $HOT=$put_vars["hot"];
            $COLD=$put_vars["cold"];
            $BODY="<root></root>";

            $headers = array();
            $headers[] = "Content-Type: application/json";
            $headers[] = "Accept: application/json";
            $headers[] = "Authorization: Basic " . $KEY;

            $url = "https://sunshine.sinergis.it/services/suggestion/css/" . $URL . "/thresholds?foiuri=" . $FOIURI . "&day=" . $DATE . "&warmthreshold=" . $HOT . "&coldthreshold=" . $COLD;
            //echo $url;

            $process = curl_init($url);
            curl_setopt($process, CURLOPT_HTTPHEADER, $headers);
            curl_setopt($process, CURLOPT_TIMEOUT, 30);
            curl_setopt($process, CURLOPT_POSTFIELDS, $BODY);
            curl_setopt($process, CURLOPT_RETURNTRANSFER, TRUE);
            curl_setopt($process, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($process, CURLOPT_CUSTOMREQUEST, 'PUT');


            $return = curl_exec($process);
            curl_close($process);

            echo $return;
            return;
        }
    break;
  case 'POST':
    break;
  case 'GET':
    if( isset($_GET['url']) && isset($_GET['foiuri']) && isset($_GET['key']) ){

        $URL=$_GET["url"];
        $FOIURI=$_GET["foiuri"];
        $KEY=$_GET["key"];

        $headers = array();
        $headers[] = "Content-Type: application/json";
        $headers[] = "Accept: application/json";
        $headers[] = "Authorization: Basic " . $KEY;

        $url = "https://sunshine.sinergis.it/services/suggestion/css/" . $URL . "/thresholds?foiuri=" . $FOIURI;

        $process = curl_init($url);
        curl_setopt($process, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($process, CURLOPT_TIMEOUT, 30);
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
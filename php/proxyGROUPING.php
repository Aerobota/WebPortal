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
    if( isset($put_vars['url']) && isset($put_vars['key']) ){

            $URL=$put_vars['url'];
            $KEY=$put_vars['key'];
            $BODY="<root></root>";

            $headers = array();
            $headers[] = "Content-Type: application/xml";
            $headers[] = "Authorization: Basic " . $KEY;


            $url = "https://sunshine.sinergis.it/services/grouping/css/" . $URL;
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
    if(isset($_POST['url']) && isset($_POST['body']) && isset($_POST['key']) ){

        $BODY=$_POST["body"];
        $KEY=$_POST["key"];
        $URL=$_POST["url"];

        $headers = array();
        $headers[] = "Content-Type: application/json";
        $headers[] = "Accept: application/json";
        $headers[] = "Authorization: Basic " . $KEY;

        $url = "https://sunshine.sinergis.it/services/grouping/css/" . $URL;

        $process = curl_init($url);
        curl_setopt($process, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($process, CURLOPT_TIMEOUT, 30);
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
    if( isset($_GET['url']) && isset($_GET['key']) ){

        $URL=$_GET["url"];
        $KEY=$_GET["key"];

        $headers = array();
        $headers[] = "Content-Type: application/json";
        $headers[] = "Accept: application/json";
        $headers[] = "Authorization: Basic " . $KEY;

        $url = "https://sunshine.sinergis.it/services/grouping/css/" . $URL;

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
    parse_str(file_get_contents("php://input"),$delete_vars);
    if( isset($delete_vars['url']) && isset($delete_vars['key']) ){

            $URL=$delete_vars['url'];
            $KEY=$delete_vars['key'];

            $headers = array();
            $headers[] = "Authorization: Basic " . $KEY;

            echo $KEY . "|";

            $url = "https://sunshine.sinergis.it/services/grouping/css/" . $URL;
            echo $url;

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
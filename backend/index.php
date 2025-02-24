<?php
header('Content-Type: Application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET');
header('Access-Control-Allow-Headers: Content-type');

define('REQUESTMETHOD', $_SERVER['REQUEST_METHOD']);

include './functions.php';

if( REQUESTMETHOD === 'POST' || REQUESTMETHOD === 'GET'){
    if(REQUESTMETHOD == 'GET'){
        $user = $_GET['user'];
        $file = $_GET['filename'];
        
        $content = read($file, $user);
        echo json_encode(["content" => $content]);
    }
    else{

        $data = file_get_contents('php://input');
        $dataj = json_decode($data, true);

        // echo $data;

        $file = $dataj['filename'];
        $user = $dataj['user'];
        $content = $dataj['content'];

        $outcome = write($file, $user, $content);

        echo json_encode(["outcome" => $outcome]);

        
    }


   

}
else{

    echo json_encode(['ok' => false, 'message'=> 'Wrong request method']);
}


?>
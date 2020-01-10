<?php
/*
    jQuery Mobile IPTV
    Author: Ming Yu Zhao (mingyu.zhao@gmail.com)
*/
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if (isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["msg"])) {
    $recipent = array(
        "name" => strip_tags($_POST["contact_name"]),
        "email" => strip_tags($_POST["contact_email"])
    );

    $sender = array(
        "name" => strip_tags($_POST['name']),
        "email" => strip_tags($_POST['email']),
        "message" => strip_tags($_POST['msg'])
    );

    $subject = 'Contact message from mobile website';

    $message = '<html><head><title>'.$title.'</title></head><body>'.$sender["message"].'</body></html>';

    // To send HTML mail, the Content-type header must be set
    $headers = "From: {$sender['name']} <{$sender['email']}>" . "\r\n";
    $headers .= "Reply-To: {$sender['email']}" . "\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";

    if(mail($recipent["email"], $subject, $message, $headers)) {
        echo json_encode(true);
    } else {
        echo json_encode(false);
    }
} else {
    echo json_encode(false);
}
?>

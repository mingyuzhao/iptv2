<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// files needed to connect to database
include_once 'config/database.php';
include_once 'objects/channel.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// instantiate user object
$channel = new Channel($db);

// set product property values
$stmt = $channel->read();
$num = $stmt->rowCount();

// CHECK IF more than 0 record found
if($num>0){
    // Channel array
    $channels_arr=array();
    $channels_arr["records"]=array();

    // retrieve our TABLE contents
    // fetch() IS faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // EXTRACT ROW
        // this will make $row['name'] TO
        // just $name ONLY
        EXTRACT($row);

        $channel_item=array(
            "id" => $id,
            "title" => $title,
            "description" => html_entity_decode($description),
            "url" => $url,
            "logo" => $logo
        );

        array_push($channels_arr["records"], $channel_item);
    }

    // SET response code - 200 OK
    http_response_code(200);

    // SHOW channel DATA IN json format
    echo json_encode($channels_arr);
} else {
    // SET response code - 404 NOT found
    http_response_code(404);

    // tell the USER no channel found
    echo json_encode(
        array("message" => "No channel found.")
    );
}
?>

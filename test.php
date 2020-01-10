<html>
    <head>
        <title>Example</title>
    </head>
    <body>
        <?php
        echo "Start to connect MySQL...";

        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
        header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

        define('DB_HOST', 'localhost');
        define('DB_USER', 'admin');
        define('DB_PASS', '1qaz2wsx');
        define('DB_NAME', 'iptv');

        function connect()
        {
          $connect = mysqli_connect(DB_HOST ,DB_USER ,DB_PASS ,DB_NAME);

          if (mysqli_connect_errno($connect)) {
            die("Failed to connect:" . mysqli_connect_error());
          }
          echo "Connected successfully";
          mysqli_set_charset($connect, "utf8");

          return $connect;
        }

        $con = connect();

        ?>
    </body>
</html>

<?php
class DATABASE{
    // specify your own DATABASE credentials
    private $host = "localhost";
    private $db_name = "iptv";
    private $username = "admin";
    private $password = "1qaz2wsx";
    public $conn;

    // GET the DATABASE connection
    public FUNCTION getConnection(){
        $this->conn = NULL;
        try{
            $this->conn = NEW PDO("mysql:host=" . $this->host . ";dbname=" . $this->db_name, $this->username, $this->password);
            $this->conn->EXEC("set names utf8");
        }catch(PDOException $exception){
            echo "Connection error: " . $exception->getMessage();
        }
        RETURN $this->conn;
    }
}
?>

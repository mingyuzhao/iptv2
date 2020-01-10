<?php
// 'user' object
class Channel{
    // database connection and table name
    private $conn;
    private $table_name = "channels";

    // object properties
    public $id;
    public $title;
    public $url;
    public $logo;
    public $description;

    // constructor
    public function __construct($db){
        $this->conn = $db;
    }

    // READ products
    function read(){
        $query = "SELECT * FROM " . $this->table_name . " ORDER BY id";

        // PREPARE query statement
        $stmt = $this->conn->prepare($query);

        // EXECUTE query
        $stmt->execute();

        return $stmt;
    }

    // create new user record
    function create(){
        // insert query
        $query = "INSERT INTO " . $this->table_name . "
                SET
                    title = :title,
                    url = :url,
                    logo = :logo,
                    description = :description";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->title=htmlspecialchars(strip_tags($this->title));
        $this->url=htmlspecialchars(strip_tags($this->url));
        $this->logo=htmlspecialchars(strip_tags($this->logo));
        $this->description=htmlspecialchars(strip_tags($this->description));

        // bind the values
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':url', $this->url);
        $stmt->bindParam(':logo', $this->logo);
        $stmt->bindParam(':description', $this->description);

        // execute the query, also check if query was successful
        if($stmt->execute()){
            return true;
        }

        return false;
    }

    // check if given channel exist in the database
    function channelExists(){
        // query to check if email exists
        $query = "SELECT id, title, url, logo, description
                FROM " . $this->table_name . "
                WHERE url = ?
                LIMIT 0,1";

        // prepare the query
        $stmt = $this->conn->prepare( $query );

        // sanitize
        $this->url=htmlspecialchars(strip_tags($this->url));

        // bind given email value
        $stmt->bindParam(1, $this->url);

        // execute the query
        $stmt->execute();

        // get number of rows
        $num = $stmt->rowCount();

        // if email exists, assign values to object properties for easy access and use for php sessions
        if($num>0){
            // get record details / values
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // assign values to object properties
            $this->id = $row['id'];
            $this->title = $row['title'];
            $this->url = $row['url'];
            $this->logo = $row['logo'];
            $this->description = $row['description'];
            // return true because email exists in the database
            return true;
        }

        // return false if email does not exist in the database
        return false;
    }

    // update a user record
    public function update(){
        // if no posted password, do not update the password
        $query = "UPDATE " . $this->table_name . "
                SET
                    title = :title,
                    url = :url,
                    logo = :logo,
                    description = :description
                WHERE id = :id";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->title=htmlspecialchars(strip_tags($this->title));
        $this->url=htmlspecialchars(strip_tags($this->url));
        $this->logo=htmlspecialchars(strip_tags($this->logo));
        $this->description=htmlspecialchars(strip_tags($this->description));

        // bind the values from the form
        $stmt->bindParam(':title', $this->title);
        $stmt->bindParam(':url', $this->url);
        $stmt->bindParam(':logo', $this->logo);
        $stmt->bindParam(':description', $this->description);

        // unique ID of record to be edited
        $stmt->bindParam(':id', $this->id);

        // execute the query
        if($stmt->execute()){
            return true;
        }

        return false;
    }
}

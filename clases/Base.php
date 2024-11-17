<?php
    include "../config/config.php";
    class Base {
        private $link;
        function __construct()
        {
            try{
                $this->link = new PDO("mysql:host=".HOST.";dbname=".BASE,USUARIO,PASS,OPCIONES);
            }
            catch (PDOException $e){
                echo "Error: " . $e->getMessage();
                die();
            }
        }

        function __get($var){
            return $this->$var;
        }
    }
?>
<?php
    class Carrito {
        private $idCarrito;
        private $dniCliente;

        function __construct($idCarrito, $dniCliente ) {
            $this->idCarrito = $idCarrito;
            $this->dniCliente = $dniCliente;
        }

        function buscar($link){
            try{
                $consulta = "SELECT * FROM carrito WHERE idCarrito = '$this->idCarrito'";
                $result = $link->prepare($consulta);
                $result->execute();
                return $result;
            }
            catch(PDOException $e){
                $error = "Error: " . $e->getMessage();
                return $error;
                die();
            }
        }

        function tieneCliente($link){
            try{
                $consulta = "SELECT * FROM carrito WHERE dniCliente = '$this->dniCliente'";
                $result = $link->prepare($consulta);
                $result->execute();
                $dato=$result->fetch(PDO::FETCH_ASSOC);

                if($dato){
                    return true;
                }else{
                    return false;
                }
            }
            catch(PDOException $e){
                $error = "Error: ".$e->getMessage();
                return $error;
                die();
            }
        }

        function insertar($link){
            try{
                $link->beginTransaction();
                $consulta = "INSERT INTO carrito VALUES (:idCarrito,:dniCliente)";
                $result = $link->prepare($consulta);

                $result->bindParam(":idCarrito",$this->idCarrito);
                $result->bindParam(":dniCliente",$this->dniCliente);

                $result->execute();
                $link->commit();
                return $result;
            }
            catch(PDOException $e){
                $link->rollBack();
                $error = "Error: ".$e->getMessage();
                return $error;
                die();
            }
        }
    }
?>
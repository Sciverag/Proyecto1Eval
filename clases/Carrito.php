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

        function actualizar($link){
            try{
                $link->beginTransaction();
                $consulta = "UPDATE carrito SET dniCliente = :dniCliente WHERE idCarrito = :idCarrito";
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
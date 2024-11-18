<?php
    class LineaPedido {
        private $idPedido;
        private $nlinea;
        private $idProducto;
        private $cantidad;

        function __construct($idPedido, $nlinea, $idProducto, $cantidad){
            $this->idPedido = $idPedido;
            $this->nlinea = $nlinea;
            $this->idProducto = $idProducto;
            $this->cantidad = $cantidad;
        }

        function insertar($link){
            try{
                $consulta = "INSERT INTO lineaspedidos VALUES (:idPedido,:nlinea,:idProducto,:cantidad)";
                $result = $link->prepare($consulta);

                $result->bindParam(":idPedido",$this->idPedido);
                $result->bindParam(":nlinea",$this->nlinea);
                $result->bindParam(":idProducto",$this->idProducto);
                $result->bindParam(":cantidad",$this->cantidad);

                $result->execute();
                return $result;
            }
            catch(PDOException $e){
                $error = "Error: " . $e->getMessage();
                return $error;
                die();
            }
        }
    }
?>
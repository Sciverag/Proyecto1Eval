<?php
    class Pedido {
        private $idPedido;
        private $fecha;
        private $dniCliente;
        private $dirEntrega;

        function __construct($idPedido,$fecha,$dniCliente,$dirEntrega){
            $this->idPedido = $idPedido;
            $this->fecha = $fecha;
            $this->dniCliente = $dniCliente;
            $this->dirEntrega = $dirEntrega;
        }

        static function maxIdPedido($link){
            try {
                $consulta = "SELECT max(idPedido) as maxIdPedido FROM pedidos";
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
                $consulta = "INSERT INTO pedidos (idPedido, fecha, dirEntrega, dniCliente) VALUES (:idPedido, :fecha, :dirEntrega, :dniCliente)";
                $result = $link->prepare($consulta);

                $result->bindParam(":idPedido",$this->idPedido);
                $result->bindParam(":fecha",$this->fecha);
                $result->bindParam(":dirEntrega",$this->dirEntrega);
                $result->bindParam(":dniCliente",$this->dniCliente);

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
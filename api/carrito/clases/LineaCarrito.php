<?php 
    class LineaCarrito {
        private $idCarrito;
        private $nlinea;
        private $idProducto;
        private $cantidad;

        function __construct($idCarrito, $nlinea='', $idProducto='', $cantidad='' ) {
            $this->idCarrito = $idCarrito;
            $this->nlinea = $nlinea;
            $this->idProducto = $idProducto;
            $this->cantidad = $cantidad;
        }

        function __set($name, $value){
            $this->$name = $value;
        }

        function getAllByIdCarro($link){
            try {
                $consulta = "SELECT * FROM lineascarro WHERE idCarrito = '$this->idCarrito'";
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

        function maxNlinea($link){
            try {
                $consulta = "SELECT max(nlinea) as cantidadLineas FROM lineascarro WHERE idCarrito = '$this->idCarrito'";
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
            try {
                $link->beginTransaction();
                $consulta = "INSERT INTO lineascarro VALUES (:idCarrito,:nlinea,:idProducto,:cantidad)";
                $result = $link->prepare($consulta);

                $result->bindParam(":idCarrito",$this->idCarrito);
                $result->bindParam(":nlinea",$this->nlinea);
                $result->bindParam(":idProducto",$this->idProducto);
                $result->bindParam(":cantidad",$this->cantidad);

                $result->execute();
                $link->commit();
            }
            catch(PDOException $e){
                $link->rollBack();
                $error = "Error: " . $e->getMessage();
                return $error;
                die();
            }
        }

        function eliminar($link){
            try {
                $link->beginTransaction();
                $consulta = "DELETE FROM lineascarro WHERE idCarrito = :idCarrito AND nlinea = :nlinea";
                $result = $link->prepare($consulta);
                $result->bindParam(":idCarrito",$this->idCarrito);
                $result->bindParam(":nlinea",$this->nlinea);
                $result->execute();
                $link->commit();
            }
            catch(PDOException $e){
                $link->rollBack();
                $error = "Error: " . $e->getMessage();
                return $error;
                die();
            }
        }

        function eliminarTodas($link){
            try {
                $link->beginTransaction();
                $consulta = "DELETE FROM lineascarro WHERE idCarrito = :idCarrito";
                $result = $link->prepare($consulta);
                $result->bindParam(":idCarrito",$this->idCarrito);
                $result->execute();
                $link->commit();
            }
            catch(PDOException $e){
                $link->rollBack();
                $error = "Error: " . $e->getMessage();
                return $error;
                die();
            }
        }

        function actualizar($link){
            try {
                $link->beginTransaction();
                $consulta = "UPDATE lineascarro SET cantidad = :cantidad WHERE idCarrito = :idCarrito AND nlinea = :nlinea";
                $result = $link->prepare($consulta);
                $result->bindParam(":idCarrito",$this->idCarrito);
                $result->bindParam(":cantidad",$this->cantidad);
                $result->bindParam(":nlinea",$this->nlinea);
                $result->execute();
                $link->commit();
            }
            catch(PDOException $e){
                $link->rollBack();
                $error = "Error: " . $e->getMessage();
                return $error;
                die();
            }
        }
    }
?>
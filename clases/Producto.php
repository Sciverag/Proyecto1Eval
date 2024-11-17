<?php
    class Producto {
        private $idProducto;
        private $nombre;
        private $foto;
        private $marca;
        private $tipo;
        private $precio;
        private $etiquetas;
        private $descripcion;

        static function getAll($link){
            try{
                $consulta="SELECT * FROM productos";
                $result=$link->prepare($consulta);
                $result->execute();
                return $result;
            }
            catch(PDOException $e){
                $error = "Error: ".$e->getMessage();
                return $error;
                die();
            }
        }

        function __construct($idProducto,$nombre='',$foto='',$marca='',$tipo='',$precio='',$etiquetas='',$descripcion=''){
            $this->idProducto = $idProducto;
            $this->nombre = $nombre;
            $this->foto = $foto;
            $this->marca = $marca;
            $this->tipo = $tipo;
            $this->precio = $precio;
            $this->etiquetas = $etiquetas;
            $this->descripcion = $descripcion;
        }

        function buscar($link){
            try{
                $consulta="SELECT * FROM productos WHERE idProducto = '$this->idProducto'";
                $result=$link->prepare($consulta);
                $result->execute();
                return $result;
            }
            catch(PDOException $e){
                $error = "Error: ".$e->getMessage();
                return $error;
                die();
            }
        }
    }
?>
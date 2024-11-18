<?php
    class Cliente {
        private $dni;
        private $nombre;
        private $direccion;
        private $email;
        private $pwd;
        private $administrador;

        function __construct($dni, $nombre='', $direccion='', $email='', $pwd='', $administrador=false){
            $this->dni=$dni;
            $this->nombre=$nombre;
            $this->direccion=$direccion;
            $this->email=$email;
            $this->pwd=$pwd;
            $this->administrador=$administrador;
        }

        function validar($link){
            try{
                $consulta="SELECT * FROM clientes WHERE dniCliente = '$this->dni'";
                $result=$link->prepare($consulta);
                $result->execute();
                $dato=$result->fetch(PDO::FETCH_ASSOC);
                
                if($dato){
                    if(password_verify($this->pwd, $dato['pwd'])){
                        return true;
                    }else{
                        return false;
                    }  

                }else{
                    return false;
                }
            }
            catch(PDOException $e){
                $error = "Error: " . $e->getMessage();
                return $error;
                die();
            }
        }

        function get($link){
            try{
                $consulta="SELECT * FROM clientes WHERE dniCliente = '$this->dni'";
                $result=$link->prepare($consulta);
                $result->execute();

                return $result;
            }
            catch(PDOException $e){
                $error = "Error: " . $e->getMessage();
                return $error;
                die();
            }
        }

        function registrar ($link){
            try{
                $link->beginTransaction();
                $consulta="INSERT INTO clientes VALUES (:dniCliente,:nombre,:direccion,:email,:pwd,:administrador)";	
                $result=$link->prepare($consulta);	

                $dniCliente=$this->dni;
                $nombre=$this->nombre;
                $direccion=$this->direccion;
                $email=$this->email;
                $pwd=password_hash($this->pwd,PASSWORD_DEFAULT);
                $administrador=$this->administrador;

                $result->bindParam(':dniCliente',$dniCliente);
                $result->bindParam(':nombre',$nombre);
                $result->bindParam(':direccion',$direccion);
                $result->bindParam(':email',$email);
                $result->bindParam(':pwd',$pwd);
                $result->bindParam(':administrador',$administrador);

                $result->execute();
                $link->commit();
                return $result;
            }
            catch(PDOException $e){
                $link->rollBack();
                $error = "Error: ".$e->getMessage()."<br/>";
                return $error;
                die();
            }
        }
    }
?>
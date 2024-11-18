<?php
    session_start();
    require "../config/autocarga.php";
    include "../vistas/html/confirmar/inicio.html";

    $base = new Base();

    if($_GET['dniCliente'] != "null" && $_GET['idUnico'] != "null"){
        $_SESSION['dniCliente'] = $_GET['dniCliente'];
        $_SESSION['idUnico'] = $_GET['idUnico'];
    }

    if(isset($_SESSION['dniCliente'])){     
        if(isset($_POST['enviar'])){
            $idPedido = Pedido::maxIdPedido($base->link);
            $datosCliente = json_decode(file_get_contents("http://localhost/Proyecto1Eval/api/cliente/servicios/cliente.php?dniCliente=".$_SESSION['dniCliente']), true);
            $pedido = new Pedido($idPedido, getdate($timestamp = time()));
        }else{
            include "../vistas/html/confirmar/formulario.html";
        }
    }else{
        include "../vistas/html/confirmar/error.html";
    }
    

    include "../vistas/html/confirmar/final.html";
?>
<?php
    session_start();
    include "../vistas/html/confirmar/inicio.html";

    if($_GET['dniCliente'] != "null" && $_GET['idUnico'] != "null"){
        $_SESSION['dniCliente'] = $_GET['dniCliente'];
        $_SESSION['idUnico'] = $_GET['idUnico'];
    }

    if(isset($_SESSION['dniCliente'])){
        
        if(isset($_POST['enviar'])){
        
        }else{
            include "../vistas/html/confirmar/formulario.html";
        }
    }else{
        include "../vistas/html/confirmar/error.html";
    }
    

    include "../vistas/html/confirmar/final.html";
?>
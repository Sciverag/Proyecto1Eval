<?php
    require "../config/autocarga.php";

    $base = new Base();
    $body = file_get_contents('php://input');

    $data = json_decode($body, true);

    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        if(isset($_GET['dniCliente']) && isset($_GET['pwd'])){
            $dniCliente = $_GET['dniCliente'];
            $pwd = $_GET['pwd'];
            $cli = new Cliente($dniCliente,'','','',$pwd,false);
            $dato=$cli->validar($base->link);
            header("HTTP/1.1 200 OK");
            echo json_encode($dato);
            exit();
        }
    }

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
            $dniCliente = $data['dniCliente'];
            $pwd = $data['pwd'] ?? null;
            $nombre = $data['nombre'] ?? null;
            $direccion = $data['direccion'] ?? null;
            $email = $data['email'] ?? null;
            $cli = new Cliente($dniCliente,$nombre,$direccion,$email,$pwd,false);
            $dato=$cli->registrar($base->link);
            header("HTTP/1.1 200 OK");
            echo json_encode($dato);
            exit();
    }

    header("HTTP/1.1 400 Bad Request");
?>
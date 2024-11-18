<?php
    require "../config/autocarga.php";

    $base = new Base();
    $body = file_get_contents('php://input');

    $data = json_decode($body, true);

    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        if(isset($_GET['idCarro'])){
            $idCarro = $_GET['idCarro'];
            $carro = new Carrito($idCarro, null);

            $dato = $carro->buscar($base->link);
            $dato->setFetchMode(PDO::FETCH_ASSOC);
            header("HTTP/1.1 200 OK");
            echo json_encode($dato->fetch());
            exit();
        }else if(isset($_GET['dniCliente'])){
            $dniCliente = $_GET['dniCliente'];
            $carro = new Carrito('',$dniCliente);

            $dato = $carro->obtenerCarroCliente($base->link);
            $dato->setFetchMode(PDO::FETCH_ASSOC);
            header("HTTP/1.1 200 OK");
            echo json_encode($dato->fetch());
            exit();
        }
    }

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $idCarro = $data['idCarro'];
        $dniCliente = $data['dniCliente'] ?? null;

        $carro = new Carrito($idCarro, $dniCliente);
        $dato = $carro->insertar($base->link);
        header("HTTP/1.1 200 OK");
        echo json_encode($dato);
        exit();
    }

    if($_SERVER['REQUEST_METHOD'] == 'PUT'){
        $idCarro = $data['idCarro'];
        $dniCliente = $data['dniCliente'];

        $carro = new Carrito($idCarro, $dniCliente);
        $dato = $carro->actualizar($base->link);
        header("HTTP/1.1 200 OK");
        echo json_encode($dato);
        exit();
    }

    header("HTTP/1.1 400 Bad Request");
?>
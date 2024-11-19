<?php
    require "../config/autocarga.php";

    $base = new Base();
    $body = file_get_contents('php://input');

    $data = json_decode($body, true);

    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        if(isset($_GET['idCarro'])){
            $idCarro = $_GET['idCarro'];
            $lineaCarro = new LineaCarrito($idCarro, '', '', '');

            $dato = $lineaCarro->getAllByIdCarro($base->link);
            $dato->setFetchMode(PDO::FETCH_ASSOC);
            header("HTTP/1.1 200 OK");
            echo json_encode($dato->fetchAll());
            exit();
        }
    }

    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $idCarro = $data['idCarro'];
        $idProducto = $data['idProducto'];
        $cantidad = $data['cantidad'];
        
        $lineaCarro = new LineaCarrito($idCarro, '', $idProducto, $cantidad);
        $resultNlinea = $lineaCarro->maxNlinea($base->link);
        $fila = $resultNlinea->fetch(PDO::FETCH_ASSOC);
        $nlinea = $fila['cantidadLineas'];
        if(is_null($nlinea)){
            $nlinea = 0;
        }

        $lineaCarro->nlinea = $nlinea + 1;
        $dato = $lineaCarro->insertar($base->link);
        header("HTTP/1.1 200 OK");
        echo json_encode($dato);
        exit();
    }

    if($_SERVER['REQUEST_METHOD'] == 'DELETE'){
        if(isset($data['nlinea'])){
            $idCarro = $data['idCarro'];
            $nlinea = $data['nlinea'];
    
            $lineaCarro = new LineaCarrito($idCarro,$nlinea);
            $dato = $lineaCarro->eliminar($base->link);
            header("HTTP/1.1 200 OK");
            echo json_encode($dato);
            exit();
        }else{
            $idCarro = $data['idCarro'];
            $lineaCarro = new LineaCarrito($idCarro);
            $dato = $lineaCarro->eliminarTodas($base->link);
            header("HTTP/1.1 200 OK");
            echo json_encode($dato);
            exit();
        }
    }

    if($_SERVER['REQUEST_METHOD'] == 'PUT'){
        $idCarro = $data['idCarro'];
        $nlinea = $data['nlinea'];
        $cantidad = $data['cantidad'];

        $lineaCarro = new LineaCarrito($idCarro,$nlinea,'',$cantidad);
        $dato = $lineaCarro->actualizar($base->link);
        header("HTTP/1.1 200 OK");
        echo json_encode($dato);
        exit();
    }

    header("HTTP/1.1 400 Bad Request");
?>
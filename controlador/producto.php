<?php
    require "../config/autocarga.php";

    $base = new Base();

    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        if(isset($_GET['idProducto'])){
            $idProducto = $_GET['idProducto'];
            $producto = new Producto($idProducto);

            $dato = $producto->buscar($base->link);
            $dato->setFetchMode(PDO::FETCH_ASSOC);
            header("HTTP/1.1 200 OK");
            echo json_encode($dato->fetch());
            exit();
        }else if(isset($_GET['textoFiltro']) || isset($_GET['tipo'])){
            $textoFiltro = $_GET['textoFiltro'] ?? '';
            $tipo = $_GET['tipo'] ?? '';
            $producto = new Producto('',$textoFiltro,'','',$tipo,'',$textoFiltro,'');

            $dato = $producto->filtrar($base->link);
            $dato->setFetchMode(PDO::FETCH_ASSOC);
            header("HTTP/1.1 200 OK");
            echo json_encode($dato->fetchALL());
            exit();

        }else{
            $dato = Producto::getAll($base->link);
            $dato->setFetchMode(PDO::FETCH_ASSOC);
            header("HTTP/1.1 200 OK");
            echo json_encode($dato->fetchALL());
            exit();
        }
    }

    header("HTTP/1.1 400 Bad Request");
?>
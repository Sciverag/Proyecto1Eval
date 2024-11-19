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
            if($idPedido){
                $idPedido = $idPedido['maxIdPedido'] + 1;
            }else{
                $idPedido = 1;
            }
            
            $datosCliente = json_decode(file_get_contents("http://localhost/Proyecto1Eval/api/cliente/servicios/cliente.php?dniCliente=".$_SESSION['dniCliente']), true);
            $dniCliente = $datosCliente['dniCliente'];
            $direccion = $datosCliente['direccion'];
            $lineasCarro = json_decode(file_get_contents("http://localhost/Proyecto1Eval/api/carrito/servicios/lineascarrito.php?idCarro=".$_SESSION['idUnico']), true);

            $mensajePedido = "<main><div id='informacionPedido'><h4>Pedido Nº".$idPedido."</h4>";
            $mensajePDF = "<h3>Pedido Nº".$idPedido."</h3>";

            if(!empty($lineasCarro)) {
                $pedido = new Pedido($idPedido, date("Y/m/d"), $dniCliente, $direccion);
                $pedido->insertar($base->link);
                $nlinea = 1;

                foreach($lineasCarro as $linea) {
                    $pedidoLinea = new LineaPedido($idPedido, $nlinea, $linea['idProducto'], $linea['cantidad']);
                    $pedidoLinea->insertar($base->link);
                    $nombreProducto = json_decode(file_get_contents("http://localhost/Proyecto1Eval/api/producto/servicios/producto.php?idProducto=".$pedidoLinea->idProducto), true)['nombre'];
                    $mensajePedido .= "<p> $nlinea. $nombreProducto ( $pedidoLinea->cantidad )</p><br>";
                    $mensajePDF .= "<p> $nlinea. $nombreProducto ( $pedidoLinea->cantidad )</p><br>";
                    $nlinea += 1;
                }

                $lineaCarro = new LineaCarrito($_SESSION['idUnico']);
                $lineaCarro->eliminarTodas($base->link);

                $mensajePedido .= "<div id='contenidoPedido'><p>Fecha: $pedido->fecha</p><p>Dirección: $pedido->dirEntrega</p><p>Nombre: $datosCliente[nombre]</p>";

                $mensajePDF .= "<div><h4>Fecha: $pedido->fecha</h4><h4>Dirección: $pedido->dirEntrega</h4><h4>Nombre: $datosCliente[nombre]</h4></div>";

                $mensajePedido .= "<a href='crearpdf.php?string=".urlencode($mensajePDF)."'>Descargar PDF</a></div></div></main>";

                echo $mensajePedido;

            }else{
                include "../vistas/html/confirmar/sinproductos.html";
            }


        }else{
            include "../vistas/html/confirmar/formulario.html";
        }
    }else{
        include "../vistas/html/confirmar/error.html";
    }
    

    include "../vistas/html/confirmar/final.html";
?>
const idProducto = sacarParametrosUrl("producto");
let precio;
const imagenProducto = document.querySelector("#imagenProducto > img");
const nombreProducto = document.getElementById("nombreProducto");
const marcaProducto = document.getElementById("marcaProducto");
const precioProducto = document.getElementById("precioProducto");
const descripcionProducto = document.getElementById("descripcionProducto");
const contenedorEtiquetas = document.getElementById("etiquetasProducto");
const botonAumentar = document.getElementById("aumentar");
const botonDisminuir = document.getElementById("disminuir");
const cantidad = document.getElementById("cantidad");
const botonComprar = document.getElementById("botonComprar");

function sacarParametrosUrl(dato){
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(dato);
}

botonAumentar.addEventListener("click",() => {
    cantidad.value = parseInt(cantidad.value) + 1;

    ajustarPrecio();
})

botonDisminuir.addEventListener("click",() => {
    if (cantidad.value > 1) {
        cantidad.value = parseInt(cantidad.value) - 1;
    }

    ajustarPrecio();
})

cantidad.addEventListener("change",() => {
    if (cantidad.value == "" || parseInt(cantidad.value) <= 0){
        cantidad.value = 1;
    }

    ajustarPrecio();
})

botonComprar.addEventListener("click",() => {
    comprar();
})

obtenerInformacion();

function ajustarPrecio(){
    precioProducto.innerText = (precio * parseInt(cantidad.value)).toFixed(2) + "€";

}

function obtenerInformacion(){
    fetch('http://localhost/Proyecto1Eval/api/producto/servicios/producto.php?idProducto='+idProducto, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => colocarInformacion(data))
    .catch(error => console.error(error));
}

function colocarInformacion(producto){
    imagenProducto.setAttribute("src",producto.foto);
    nombreProducto.innerText = producto.nombre;
    marcaProducto.innerText = producto.marca;
    precio = producto.precio;
    precioProducto.innerText = producto.precio + "€";
    descripcionProducto.innerText = producto.descripcion;
    contenedorEtiquetas.innerHTML = "";
    if(producto.etiquetas.includes(',')){
        etiquetasProducto = producto.etiquetas.split(',');
        for(const etiqueta of etiquetasProducto){
            crearEtiqueta(etiqueta);
        }
    }else{
        crearEtiqueta(producto.etiquetas);
    }
}

function crearEtiqueta(etiqueta){
    const cajaEtiqueta = document.createElement("P");
    cajaEtiqueta.innerText = etiqueta;
    contenedorEtiquetas.appendChild(cajaEtiqueta);
}

function comprar(){
    if(!sessionStorage.getItem("idUnica")){
        crearCarrito();
    }else{
        yaEnCarro();
    }
}

function crearCarrito(){
    sessionStorage.setItem("idUnica",Date.now());
    
    fetch("http://localhost/Proyecto1Eval/api/carrito/servicios/carrito.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'dniCliente': sessionStorage.getItem("dniCliente"),
            'idCarro': sessionStorage.getItem("idUnica")
        })
    })
    .then(response => response.json())
    .then(data => yaEnCarro())
    .catch(error => console.log(error));
    
}

function meterEnCarro(){
    fetch("http://localhost/Proyecto1Eval/api/carrito/servicios/lineascarrito.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'idCarro': sessionStorage.getItem("idUnica"),
            'idProducto': idProducto,
            'cantidad': cantidad.value
        })
    })
    .then(response => response.json())
    .then(data => () => {
        window.location.href = "carrito.html";
    })
    .catch(error => console.log(error));
}

function yaEnCarro(){
    fetch("http://localhost/Proyecto1Eval/api/carrito/servicios/lineascarrito.php?idCarro="+sessionStorage.getItem("idUnica"), {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => comprobarEnCarro(data))
    .catch(error => console.log(error));
}

function comprobarEnCarro(lineas){
    let existe = false;
    let nLinea = null;
    let cantidadEnCaro = 0;
    for(const linea of lineas){
        if(linea.idProducto == idProducto){
            existe = true;
            nLinea = linea.nlinea;
            cantidadEnCaro = linea.cantidad;
        }
    }

    if(existe){
        let cantidadTotal = parseInt(cantidad.value) + parseInt(cantidadEnCaro);
        fetch("http://localhost/Proyecto1Eval/api/carrito/servicios/lineascarrito.php", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'idCarro': sessionStorage.getItem("idUnica"),
                'nlinea': nLinea,
                'cantidad': cantidadTotal
            })
        })
        .then(response => response.json())
        .then(data => () => {
            window.location.href = "carrito.html";
        })
        .catch(error => console.log(error));
    }else{
        meterEnCarro();
    }

    window.location.href = "carrito.html";
}
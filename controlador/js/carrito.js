const contenedorElementos = document.getElementById("contenedorElementos");
const infoSubtotal = document.querySelector("#total > p:nth-child(2)");
const precioEnvio = 2;
const infoTotal = document.querySelector("#totalIVA > p:nth-child(2)");
const botonConfirmar = document.getElementById("botonConfirmar");
botonConfirmar.setAttribute("href","../../controlador/confirmar.php?dniCliente="+sessionStorage.getItem('dniCliente')+"&idUnico="+sessionStorage.getItem('idUnica'));
let precioSubtotal = 0;
let precioTotalIVA = 0;

sacarLineas();

function sacarLineas(){
    precioSubtotal = 0;
    precioTotalIVA = 0;

    fetch("http://localhost/Proyecto1Eval/api/carrito/servicios/lineascarrito.php?idCarro="+sessionStorage.getItem("idUnica"), {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => crearElementos(data))
    .catch(error => console.log(error));
}

function crearElementos(lineas){
    contenedorElementos.innerHTML = "";
    for(const linea of lineas){
        obtenerDatosProducto(linea);
    }

    
}

function crearElemento(linea,producto){
    const elemento = document.createElement("div");
    contenedorElementos.appendChild(elemento);
    elemento.setAttribute("class", "elemento");
    const imagenYNombre = document.createElement("div");
    imagenYNombre.setAttribute("class", "imagenYNombre");
    const imagenProducto = document.createElement("img");
    imagenProducto.setAttribute("src", producto.foto);
    const nombreProducto = document.createElement("h5");
    nombreProducto.innerText = producto.nombre;
    imagenYNombre.appendChild(imagenProducto);
    imagenYNombre.appendChild(nombreProducto);
    elemento.appendChild(imagenYNombre);
    const precioIndividual = document.createElement("p");
    precioIndividual.setAttribute("class","precio");
    precioIndividual.innerText = producto.precio + "€";
    elemento.appendChild(precioIndividual);
    const cantidadProducto = document.createElement("input");
    cantidadProducto.setAttribute("type","number");
    cantidadProducto.setAttribute("min",1);
    cantidadProducto.setAttribute("class","cantidad");
    cantidadProducto.setAttribute("value",linea.cantidad);
    elemento.appendChild(cantidadProducto);
    const precioTotal = document.createElement("p");
    precioTotal.setAttribute("class","subtotal");
    precioTotal.innerText = (parseFloat(producto.precio) * parseInt(cantidadProducto.value)).toFixed(2) + "€";
    elemento.appendChild(precioTotal);
    const botonEliminar = document.createElement("button");
    botonEliminar.setAttribute("class","eliminar");
    const iconoEliminar = document.createElement("span");
    iconoEliminar.setAttribute("class","material-symbols-outlined");
    iconoEliminar.innerText = "delete";
    botonEliminar.appendChild(iconoEliminar);
    cantidadProducto.addEventListener("change", () => {
        if(cantidadProducto.value <= 0 || cantidadProducto.value == ""){
            cantidadProducto.value = 1;
        }
        actualizarCantidad(linea.nlinea, cantidadProducto.value);
    })
    botonEliminar.addEventListener("click",() => {
        eliminarLinea(linea.nlinea);
    })
    elemento.appendChild(botonEliminar);

    precioSubtotal += (parseFloat(producto.precio) * parseInt(cantidadProducto.value));
    precioTotalIVA = parseFloat(precioSubtotal) + (parseFloat(precioSubtotal) * 0.21) + parseFloat(precioEnvio);
    infoSubtotal.innerText = parseFloat(precioSubtotal).toFixed(2) + "€";
    infoTotal.innerText = parseFloat(precioTotalIVA).toFixed(2) + "€";
}

function obtenerDatosProducto(linea){
    fetch('http://localhost/Proyecto1Eval/api/producto/servicios/producto.php?idProducto='+linea.idProducto, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => crearElemento(linea,data))
    .catch(error => console.error(error));
}

function eliminarLinea(nlinea){
    fetch('http://localhost/Proyecto1Eval/api/carrito/servicios/lineascarrito.php', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'nlinea': nlinea,
            'idCarro': sessionStorage.getItem("idUnica")
        })
    })
    .then(response => response.json())
    .then(sacarLineas())
    .catch(error => console.error(error));

}

function actualizarCantidad(nlinea, cantidad){
    fetch("http://localhost/Proyecto1Eval/api/carrito/servicios/lineascarrito.php", {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'idCarro': sessionStorage.getItem("idUnica"),
            'nlinea': nlinea,
            'cantidad': cantidad
        })
    })
    .then(response => response.json())
    .then(sacarLineas())
    .catch(error => console.error(error));

}
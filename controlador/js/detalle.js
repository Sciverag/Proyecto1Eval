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

obtenerInformacion();

function ajustarPrecio(){
    precioProducto.innerText = (precio * parseInt(cantidad.value)).toFixed(2) + "€";

}

function obtenerInformacion(){
    fetch('http://localhost/Proyecto1Eval/servicios/producto.php?idProducto='+idProducto, {
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
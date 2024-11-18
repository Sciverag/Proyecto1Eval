let textoFiltroInicial = sacarParametrosUrl("textoFiltro");
const filtroAlimentos = document.getElementById("filtroAlimentos");
const filtroLimpieza = document.getElementById("filtroLimpieza");
const filtroElectronica = document.getElementById("filtroElectronica");
const listaProductos = document.getElementById("listaProductos");
const buscadorResponsive = document.getElementById("buscadorResponsive");
const buscador = document.getElementById("buscador");
let filtroInicialActivado = false;
let tiposActivados = [];

function sacarParametrosUrl(dato){
    const urlSearchParams = new URLSearchParams(window.location.search);
    return urlSearchParams.get(dato);
}

productosInicial();

buscador.addEventListener("change", () => {
    filtrar();
})

buscadorResponsive.addEventListener("change", () => {
    filtrar();
})

filtroAlimentos.addEventListener("click",() => {
    if(tiposActivados.includes("alimentos")){
        tiposActivados = tiposActivados.filter(tipo => tipo !== "alimentos");
        filtroAlimentos.removeAttribute("activado");
    }else{
        tiposActivados.push("alimentos");
        filtroAlimentos.setAttribute("activado", true);
    }

    filtrar();
})

filtroLimpieza.addEventListener("click",() => {
    if(tiposActivados.includes("limpieza")){
        tiposActivados = tiposActivados.filter(tipo => tipo !== "limpieza");
        filtroLimpieza.removeAttribute("activado");
    }else{
        tiposActivados.push("limpieza");
        filtroLimpieza.setAttribute("activado", true);
    }

    filtrar();
})

filtroElectronica.addEventListener("click",() => {
    if(tiposActivados.includes("electronica")){
        tiposActivados = tiposActivados.filter(tipo => tipo !== "electronica");
        filtroElectronica.removeAttribute("activado");
    }else{
        tiposActivados.push("electronica");
        filtroElectronica.setAttribute("activado", true);
    }

    filtrar();
})

function filtrar(){
    let textoFiltro;
    if(textoFiltroInicial == null || filtroInicialActivado){
        textoFiltro = buscadorResponsive.value.toLowerCase();
        if(textoFiltro == ""){
            textoFiltro = buscador.value.toLowerCase();
        }
    }else{
        textoFiltro = textoFiltroInicial;
    }

    listaProductos.innerHTML = "";

    if(tiposActivados.length > 0){
        if(textoFiltro != "" || textoFiltro == null){
            console.log("texto y tipo")
            for(const tipo of tiposActivados){
                fetch('http://localhost/Proyecto1Eval/api/producto/servicios/producto.php?textoFiltro='+textoFiltro+'&tipo='+tipo, {
                    method: 'GET'
                })
                .then(response => response.json())
                .then(data => colocarProductos(data))
                .catch(error => console.error(error));
            }
        }else{
            for(const tipo of tiposActivados){
                fetch('http://localhost/Proyecto1Eval/api/producto/servicios/producto.php?tipo='+tipo, {
                    method: 'GET'
                })
                .then(response => response.json())
                .then(data => colocarProductos(data))
                .catch(error => console.error(error));
            }
        }
    }else{
        if(textoFiltro != "" || textoFiltro == null){
            fetch('http://localhost/Proyecto1Eval/api/producto/servicios/producto.php?textoFiltro='+textoFiltro, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => colocarProductos(data))
            .catch(error => console.error(error));
        }else{
            fetch('http://localhost/Proyecto1Eval/api/producto/servicios/producto.php',{
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => colocarProductos(data))
            .catch(error => console.error(error));
        }
    }

    filtroInicialActivado = true;
}

function productosInicial(){
    listaProductos.innerHTML = "";
    if(textoFiltroInicial == null){
        fetch('http://localhost/Proyecto1Eval/api/producto/servicios/producto.php',{
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => colocarProductos(data))
        .catch(error => console.error(error));
    }else{
        filtrar();
    }
}

function colocarProductos(productos){

    for(const producto of productos){
        const cartaProducto = document.createElement("div");
        cartaProducto.setAttribute("class","card");
        const imgProducto = document.createElement("img");
        imgProducto.setAttribute("src", producto.foto);
        imgProducto.setAttribute("class", "card-img-top");
        cartaProducto.appendChild(imgProducto);
        listaProductos.appendChild(cartaProducto);
        const cuerpoCarta = document.createElement("div");
        cuerpoCarta.setAttribute("class","card-body");
        const enlaceDetalle = document.createElement("a");
        enlaceDetalle.setAttribute("href","detalle.html?producto=" + producto.idProducto);
        const nombreProducto = document.createElement("h4");
        nombreProducto.setAttribute("class","card-title");
        nombreProducto.innerText = producto.nombre;
        enlaceDetalle.appendChild(nombreProducto);
        cuerpoCarta.appendChild(enlaceDetalle);
        const precioProducto = document.createElement("p");
        precioProducto.setAttribute("class","card-text");
        precioProducto.innerText = producto.precio + "€";
        cuerpoCarta.appendChild(precioProducto);
        cartaProducto.appendChild(cuerpoCarta);
        const botonCarro = document.createElement("button");
        const iconoCarro = document.createElement("span");
        iconoCarro.setAttribute("class","material-symbols-outlined");
        iconoCarro.innerText = "shopping_cart";
        botonCarro.appendChild(iconoCarro);
        botonCarro.addEventListener("click", () => {
            comprar(producto.idProducto);
        })
        cartaProducto.appendChild(botonCarro);
    }
}

function comprar(idProducto){
    if(!sessionStorage.getItem("idUnica")){
        crearCarrito(idProducto);
    }else{
        yaEnCarro(idProducto);
    }
}

function crearCarrito(idProducto){
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
    .then(data => yaEnCarro(idProducto))
    .catch(error => console.log(error));
    
}

function meterEnCarro(idProducto){
    fetch("http://localhost/Proyecto1Eval/api/carrito/servicios/lineascarrito.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'idCarro': sessionStorage.getItem("idUnica"),
            'idProducto': idProducto,
            'cantidad': 1
        })
    })
    .then(response => response.json())
    .then(data => () => {
        window.location.href = "carrito.html";
    })
    .catch(error => console.log(error));
}

function yaEnCarro(idProducto){
    fetch("http://localhost/Proyecto1Eval/api/carrito/servicios/lineascarrito.php?idCarro="+sessionStorage.getItem("idUnica"), {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => comprobarEnCarro(data, idProducto))
    .catch(error => console.log(error));
}

function comprobarEnCarro(lineas, idProducto){
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
        let cantidadTotal = 1 + parseInt(cantidadEnCaro);
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
        meterEnCarro(idProducto);
    }

    window.location.href = "carrito.html";
}
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
                fetch('http://localhost/Proyecto1Eval/controlador/producto.php?textoFiltro='+textoFiltro+'&tipo='+tipo, {
                    method: 'GET'
                })
                .then(response => response.json())
                .then(data => colocarProductos(data))
                .catch(error => console.error(error));
            }
        }else{
            for(const tipo of tiposActivados){
                fetch('http://localhost/Proyecto1Eval/controlador/producto.php?tipo='+tipo, {
                    method: 'GET'
                })
                .then(response => response.json())
                .then(data => colocarProductos(data))
                .catch(error => console.error(error));
            }
        }
    }else{
        if(textoFiltro != "" || textoFiltro == null){
            fetch('http://localhost/Proyecto1Eval/controlador/producto.php?textoFiltro='+textoFiltro, {
                method: 'GET'
            })
            .then(response => response.json())
            .then(data => colocarProductos(data))
            .catch(error => console.error(error));
        }else{
            fetch('http://localhost/Proyecto1Eval/controlador/producto.php',{
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
        fetch('http://localhost/Proyecto1Eval/controlador/producto.php',{
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
        cartaProducto.appendChild(botonCarro);
    }
}
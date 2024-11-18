const iconoResponsive = document.getElementById("iconoResponsive");
const breadcrumbResponsive = document.getElementById("breadcrumbResponsive");
const iconoBuscador = document.querySelector("#iconos > a:nth-child(3)");
const barraBuscador = document.getElementById("barraBuscador");
const buscadorNormal = document.querySelector("#buscar > input:not(#buscador)");
const buscadorResponsiveNormal = document.querySelector("#barraBuscador > input:not(#buscadorResponsive)");

if(!(window.location.href).includes("productos")){
    buscadorNormal.addEventListener("change", () => {
        window.location.href = "productos.html?textoFiltro="+buscadorNormal.value;
    })

    buscadorResponsiveNormal.addEventListener("change", () => {
        window.location.href = "productos.html?textoFiltro="+buscadorResponsiveNormal.value;
    })
}


var breadcrumbActivado = false;
var buscadorActivado = false;

iconoResponsive.addEventListener("click",() => {
    if(!breadcrumbActivado){
        breadcrumbResponsive.setAttribute("activada",true);
        breadcrumbActivado = true;
    }else{
        breadcrumbResponsive.removeAttribute("activada");
        breadcrumbActivado = false;
    }
})

iconoBuscador.addEventListener("click",() => {
    if(!buscadorActivado){
        barraBuscador.setAttribute("activada",true);
        buscadorActivado = true;
    }else{
        barraBuscador.removeAttribute("activada");
        buscadorActivado = false;
    }
})
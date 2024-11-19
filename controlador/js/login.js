const botonLogin = document.getElementsByClassName("botonLogin");
const dniUsuario = document.getElementById("DNI");
const pwdUsuario = document.getElementById("pwd");

botonLogin[0].addEventListener("click",(event) => {
    event.preventDefault()
    verificar();
})

yaEstaConectado();

function verificar(){
    let dni = dniUsuario.value;
    let pwd = pwdUsuario.value;

    if(dni == "" || pwd == ""){
        alert("Debes rellenar todos los campos");
    }else{
        fetch('http://localhost/Proyecto1Eval/api/cliente/servicios/cliente.php?dniCliente='+dni+'&pwd='+pwd, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => esValido(data))
        .catch(error => console.error(error));
    }
}

function esValido(valido){
    if(valido){
        sessionStorage.setItem("dniCliente",dniUsuario.value);
        asignarCarro();
    }else{
        alert("Usuario o contraseña incorrectos");
    }
}

function asignarCarro(){
    fetch('http://localhost/Proyecto1Eval/api/carrito/servicios/carrito.php?dniCliente='+sessionStorage.getItem("dniCliente"), {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => tieneCarro(data))
    .catch(error => console.error(error));
}

function tieneCarro(carro){
    if(carro){
        sessionStorage.setItem("idUnica",carro.idCarrito);
    }else if(sessionStorage.getItem("idUnica")){
        fetch('http://localhost/Proyecto1Eval/api/carrito/servicios/carrito.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'dniCliente': sessionStorage.getItem("dniCliente"),
                'idCarro': sessionStorage.getItem("idUnica")
            })
        })
    }

    window.location.href = "index.html";
}

function yaEstaConectado(){
    if(sessionStorage.getItem("dniCliente")){
        window.location.href = "index.html";
    }
}
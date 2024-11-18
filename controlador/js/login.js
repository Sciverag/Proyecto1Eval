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

    console.log(dni);

    if(dni == "" || pwd == ""){
        alert("Debes rellenar todos los campos");
    }else{
        fetch('http://localhost/Proyecto1Eval/controlador/cliente.php?dniCliente='+dni+'&pwd='+pwd, {
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
        window.location.href = "index.html";
    }else{
        alert("Usuario o contraseña incorrectos");
    }
}

function yaEstaConectado(){
    if(sessionStorage.getItem("dniCliente")){
        window.location.href = "index.html";
    }
}
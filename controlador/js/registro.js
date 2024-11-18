const botonRegistro = document.getElementsByClassName("botonLogin");
const dniUsuario = document.getElementById("DNI");
const pwdUsuario = document.getElementById("pwd");
const nombreUsuario = document.getElementById("nombre");
const direccionUsuario = document.getElementById("direccion");
const emailUsuario = document.getElementById("email");

botonRegistro[0].addEventListener("click",(event) => {
    event.preventDefault()
    registrar();
})

function registrar(){
    dni = dniUsuario.value;
    pwd = pwdUsuario.value;
    nombre = nombreUsuario.value;
    direccion = direccionUsuario.value;
    email = emailUsuario.value;

    if(dni == "" || pwd == "" || nombre == "" || direccion == "" || email == ""){
        alert("Por favor, complete todos los campos");
    }else{
        fetch('http://localhost/Proyecto1Eval/controlador/cliente.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'dniCliente': dni,
                'pwd': pwd,
                'nombre': nombre,
                'direccion': direccion,
                'email': email
            })
        })
        .then(response => response.json())
        .then(() => {
            sessionStorage.setItem("dniCliente",dni);
            window.location.href = "index.html";
        })
        .catch(error => console.error(error));
    }
}




yaEstaConectado();

function yaEstaConectado(){
    if(sessionStorage.getItem("dniCliente")){
        window.location.href = "index.html";
    }
}
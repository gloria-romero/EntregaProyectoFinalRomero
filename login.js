document.getElementById('login-button').addEventListener('click', function() {
    const usuarioCorrecto = "gloria";
    const claveCorrecta = "glo123!";

    let usuario = document.getElementById('username').value;
    let clave = document.getElementById('password').value;

    if (usuario === usuarioCorrecto && clave === claveCorrecta) {
        document.getElementById('login-container').style.display = 'none';

        document.getElementById('header-container').style.display = 'block';
        document.getElementById('ecommerce-container').style.display = 'block';
        document.getElementById('message-container').innerText = "Hola " + usuarioCorrecto + "!. Ha iniciado sesión con éxito.";
        console.log("Hola " + usuarioCorrecto + "!. Ha iniciado sesión con éxito.");
    } else {
        console.log("Credenciales incorrectas.");
        document.getElementById('message-container').innerText = "Credenciales incorrectas. Por favor, vuelva a intentarlo.";
    }
});

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('header-container').style.display = 'none';
});

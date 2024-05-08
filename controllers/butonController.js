function mostrarOcultarContraseña() {
    var contraseñaInput = document.getElementById("contraseña_hash");
    var boton = document.getElementById("mostrarOcultar");
  
    if (contraseñaInput.type != "password") {
      contraseñaInput.type = "text";
      boton.textContent = "Ocultar Contraseña";
    } else {
      contraseñaInput.type == "password";
      boton.textContent = "Mostrar Contraseña";
    }
  }
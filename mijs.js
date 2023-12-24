  document.addEventListener("DOMContentLoaded", function () {
    function ContadorDeClicks() {
      let contador = 0;
      const cartButton = document.getElementById("votos");
      const countDisplay = document.getElementById("cuentaClick");

      cartButton.addEventListener("click", function (event) {
        event.preventDefault();
        contador++;
        countDisplay.textContent = contador; // Actualiza el contador en el DOM
      });
    }

    ContadorDeClicks();
  });

  /*mi reloj*/

  function updateClock() {
    const now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');
    let minutes = now.getMinutes().toString().padStart(2, '0');
    let seconds = now.getSeconds().toString().padStart(2, '0');

    document.getElementById('digital-clock').textContent = hours + ':' + minutes + ':' + seconds;
}

setInterval(updateClock, 1000);
updateClock(); // Inicializar el reloj inmediatamente

  /*cambia color footer*/
  document.getElementById('changeColorButton').addEventListener('click', function() {
    const footerContent = document.getElementById('footerContent');

    // Aquí puedes definir una lógica para cambiar entre varios degradados
    if (footerContent.classList.contains('degradado-1')) {
        footerContent.classList.remove('degradado-1');
        footerContent.classList.add('degradado-2');
    } else {
        footerContent.classList.remove('degradado-2');
        footerContent.classList.add('degradado-1');
    }
});

// Define la clase o función constructora ENCHASTRE
function ENCHASTRE() {
  // Aquí puedes definir propiedades específicas de ENCHASTRE si es necesario
  this.mostrar = function() {
    // Esta función será llamada para dibujar el contenido de la ventana ENCHASTRE
    fill(255, 0, 0); // Establece el color de relleno a rojo
    rect(10, 10, 100, 100); // Dibuja un rectángulo como parte del contenido de ENCHASTRE
  };

  // Aquí podrías agregar más métodos para manejar otros aspectos de ENCHASTRE
  // como interacciones del usuario, animaciones, etc.
}
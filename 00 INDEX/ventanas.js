// ventana.js

class Ventana {
  constructor(x, y, ancho, alto, contenido, nombre) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.contenido = contenido;
    this.abierta = false;
    this.nombre = nombre;
    this.barraAlto = 20; // Altura de la barra superior
    this.dragging = false; // Para controlar el arrastre de la ventana
    this.offsetX = 0; // Offset en el eje X para el arrastre
    this.offsetY = 0; // Offset en el eje Y para el arrastre
  }

  mostrar() {
    push();
    translate(this.x, this.y);
    
    // Dibujar ventana
    stroke(0); // Color del borde
    strokeWeight(2); // Grosor del borde
    fill(255); // Color del interior
    rect(0, 0, this.ancho, this.alto);
    
    // Dibujar la barra superior
    fill(0);
    rect(0, 0, this.ancho, this.barraAlto);
    
    // Mostrar el nombre de la ventana
    fill(255);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(this.nombre, this.ancho / 2, this.barraAlto / 2);
    
    // Dibujar el botón de cerrar
    fill(255, 0, 0);
    rect(this.ancho - 20, 0, 20, this.barraAlto);
    fill(255);
    textAlign(CENTER, CENTER);
    text("X", this.ancho - 10, this.barraAlto / 2);

    // Mostrar el contenido de la ventana
    translate(0, this.barraAlto);
    this.contenido.mostrar();
    
    pop();
  }

  abrir() {
    if (!this.abierta) {
      this.abierta = true;
      this.x = random(width - this.ancho);
      this.y = random(height - this.alto);
    }
  }

  cerrar() {
    this.abierta = false;
  }

  estaDentro(px, py) {
    return px > this.x && px < this.x + this.ancho && py > this.y && py < this.y + this.alto;
  }

  mousePressed(mx, my) {
    // Verificar si se hace clic en la barra superior para activar el arrastre de la ventana
    if (my < this.barraAlto) {
      this.dragging = true;
      this.offsetX = this.x - mx;
      this.offsetY = this.y - my;
      return true; // Devolver true para indicar que se está arrastrando la ventana
    }
    
    // Verificar si se hace clic en el botón de cerrar
    if (mx > this.x + this.ancho - 20 && mx < this.x + this.ancho && my < this.barraAlto) {
      this.cerrar(); // Cerrar la ventana si se hace clic en el botón de cerrar
      return true; // Devolver true para indicar que se hizo clic en el botón de cerrar
    }
    
    return false; // Devolver false si no se hizo clic en la barra superior ni en el botón de cerrar
  }

  mouseReleased() {
    // Detener el arrastre de la ventana al soltar el mouse
    this.dragging = false;
  }

  mover(mx, my) {
    if (this.dragging) {
      // Mover la ventana según la posición del mouse y los offsets
      this.x = mx + this.offsetX;
      this.y = my + this.offsetY;
    }
    
    // Limitar la posición de la ventana para que no se salga de los límites de la pantalla
    this.x = constrain(this.x, 0, width - this.ancho);
    this.y = constrain(this.y, 0, height - this.alto);
  }
}

// forma.js

class Forma {
  constructor(x, y, ancho, alto, tipo, color) {
    this.x = x;
    this.y = y;
    this.ancho = ancho;
    this.alto = alto;
    this.tipo = tipo;
    this.color = color; // Agregar el atributo color
    this.velX = random(-1, 1);
    this.velY = random(-1, 1);
  }

  mover() {
    this.x += this.velX;
    this.y += this.velY;

    // Rebotar en los bordes de la pantalla
    if (this.x <= 0 || this.x + this.ancho >= width) {
      this.velX *= -1;
    }
    if (this.y <= 0 || this.y + this.alto >= height) {
      this.velY *= -1;
    }
  }

  mostrar() {
    switch (this.tipo) {
      case 0: // Rectángulo
        fill(this.color); // Usar el color asignado
        rect(this.x, this.y, this.ancho, this.alto);
        break;
      case 1: // Elipse
        fill(this.color); // Usar el color asignado
        ellipse(this.x + this.ancho / 2, this.y + this.alto / 2, this.ancho, this.alto);
        break;
      case 2: // Triángulo
        fill(this.color); // Usar el color asignado
        triangle(this.x + this.ancho / 2, this.y, this.x, this.y + this.alto, this.x + this.ancho, this.y + this.alto);
        break;
      case 3: // Rombo
        fill(this.color); // Usar el color asignado
        beginShape();
        vertex(this.x + this.ancho / 2, this.y);
        vertex(this.x + this.ancho, this.y + this.alto / 2);
        vertex(this.x + this.ancho / 2, this.y + this.alto);
        vertex(this.x, this.y + this.alto / 2);
        endShape(CLOSE);
        break;
    }
  }

  estaDentro(px, py) {
    return px > this.x && px < this.x + this.ancho && py > this.y && py < this.y + this.alto;
  }
}

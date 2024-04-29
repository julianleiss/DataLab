// index.js

let formas = [];
let ventanas = [];
let ventanaActual;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background('#FCFC00');
  
  // Colores disponibles
  let colores = ['#0000FF', '#FA00FF', '#00FF00', '#000000'];
  
  // Crear múltiples instancias de las cuatro formas disponibles
  let numFiguras = 30; // Número total de figuras en movimiento
  for (let i = 0; i < numFiguras; i++) {
    let colorIndex = i % colores.length; // Ciclar entre los colores disponibles
    formas.push(new Forma(random(width), random(height), 320, 320, i % 4, colores[colorIndex])); // Seleccionar una de las cuatro formas originales y asignarle un color
  }

  // Crear ventanas correspondientes a las cuatro formas
  let contenidoVentanas = [new ORDEN(), new ENCHASTRE(), new COMBINETA(), new DISPARATE()];
  let nombresVentanas = ["ORDEN", "ENCHASTRE", "COMBINETA", "DISPARATE"];
  for (let i = 0; i < numFiguras; i++) {
    let x = random(width - 600);
    let y = random(height - 400);
    ventanas.push(new Ventana(x, y, 600, 400, contenidoVentanas[i % 4], nombresVentanas[i % 4])); // Seleccionar una ventana correspondiente a la forma
  }
}

function draw() {
  background('#FCFC00');

  // Mostrar y mover todas las figuras
  formas.forEach(forma => {
    forma.mover();
    forma.mostrar();
  });

  // Mostrar ventanas abiertas
  ventanas.forEach(ventana => {
    if (ventana.abierta) {
      ventana.mostrar();
    }
  });

  // Mostrar la ventana actual (si está definida) por encima de las demás
  if (ventanaActual && ventanaActual.abierta) {
    ventanaActual.mostrar();
  }
}

function mousePressed() {
  // Verificar si hay alguna ventana abierta en la posición del clic
  let ventanaAbierta = false;
  for (let i = 0; i < ventanas.length; i++) {
    if (ventanas[i].abierta && ventanas[i].estaDentro(mouseX, mouseY)) {
      ventanaAbierta = true;
      break;
    }
  }

  // Si no hay ninguna ventana abierta en la posición del clic, abrir una nueva ventana
  if (!ventanaAbierta) {
    for (let i = 0; i < ventanas.length; i++) {
      if (formas[i].estaDentro(mouseX, mouseY)) {
        ventanas[i].abrir();
        ventanaActual = ventanas[i];
        ventanas.splice(i, 1); // Mover la ventana seleccionada al final del arreglo para dibujarla sobre las otras
        ventanas.push(ventanaActual);
        return;
      }
    }
  }

  // Verificar si se hace clic en alguna ventana para seleccionarla o moverla
  for (let i = ventanas.length - 1; i >= 0; i--) {
    if (ventanas[i].estaDentro(mouseX, mouseY)) {
      // Verificar si se hace clic en la barra superior para seleccionar o mover la ventana
      if (mouseY < ventanas[i].y + ventanas[i].barraAlto && mouseY > ventanas[i].y && mouseX > ventanas[i].x && mouseX < ventanas[i].x + ventanas[i].ancho) {
        ventanas[i].seleccionar();
        ventanaActual = ventanas[i];
        ventanas.splice(i, 1); // Mover la ventana seleccionada al final del arreglo para dibujarla sobre las otras
        ventanas.push(ventanaActual);
      } else {
        ventanas[i].abrir(); // Si se hace clic dentro de la ventana pero no en la barra superior, simplemente se selecciona
        ventanaActual = ventanas[i];
      }
      return;
    }
  }

  // Verificar si se hace clic en el botón de cerrar de alguna ventana
  for (let i = ventanas.length - 1; i >= 0; i--) {
    if (mouseX > ventanas[i].x + ventanas[i].ancho - 20 && mouseX < ventanas[i].x + ventanas[i].ancho && mouseY < ventanas[i].barraAlto) {
      ventanas.splice(i, 1); // Cerrar la ventana eliminando su referencia del array
      return;
    }
  }
}

function mouseReleased() {
  if (ventanaActual) ventanaActual.soltar();
}

function mouseDragged() {
  if (ventanaActual && ventanaActual.seleccionada) ventanaActual.mover(mouseX, mouseY);
}


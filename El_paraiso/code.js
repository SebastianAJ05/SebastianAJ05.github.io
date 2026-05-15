class Recurso {
  constructor(nombre, ruta_imagen) {
    this.nombre = nombre;
    this.ruta_imagen = ruta_imagen;
    this.cantidad = 0;
  }
  sumarCantidad(beneficio) {
    this.cantidad += beneficio;
  }
  restarCantidad(precio) {
    this.cantidad -= precio;
  }
  compararCantidad(precio) {
    return this.cantidad >= precio;
  }
}

class Edificio {
  constructor(nombre, precio, recursos = "Monedas") {
    this.nombre = nombre;
    this.precio = precio;
    this.recursos = recursos;
    this.construido = false;
  }
  subirPrecio(subida) {
    for (let i = 0; i < this.precio.length; i++) {
      this.precio[i] += subida;
    }
  }
  comprarEdificio(recursillo) {
    if (Array.isArray(this.precio)) {
      for (let i = 0; i < this.precio.length; i++) {
        const precio = this.precio[i];
        const recurso = this.recursos[i];
        console.log(precio, recurso);
        if (!recursillo[recurso].compararCantidad(precio)) {
          alert(
            "No tienes recursos suficentes para comprar el edificio: " +
              this.nombre.replaceAll("_", " ")
          );
          return false;
        }
      }
    } else {
      if (!recursillo[this.recursos].compararCantidad(this.precio)) {
        alert(
          "No tienes recursos suficentes para comprar el edificio: " +
            this.nombre.replaceAll("_", " ")
        );
        return false;
      } else {
      }
    }

    alert("Edificio construido: " + this.nombre.replaceAll("_", " "));
    this.construido = true;
    if (Array.isArray(this.precio)) {
      for (let i = 0; i < this.precio.length; i++) {
        const precio = this.precio[i];
        const recurso = this.recursos[i];
        recursillo[recurso].restarCantidad(precio);
      }
    } else {
      recursillo[this.recursos].restarCantidad(this.precio);
    }

    return true;
  }
  estaConstruido() {
    return this.construido;
  }
}

class Producto {
  constructor(nombre, precio, recursos = "Monedas") {
    this.nombre = nombre;
    this.precio = precio;
    this.recursos = recursos;
  }
  comprobar_Compra(recursos) {
    if (Array.isArray(this.precio)) {
      var suficente = true;
      for (let i = 0; i < this.precio.length && suficente; i++) {
        var precio = this.precio[i];

        var recurso = this.recursos[i];

        if (!recursos[recurso].compararCantidad(precio)) {
          suficente = false;
        }
      }
      if (suficente) {
        for (let i = 0; i < this.precio.length; i++) {
          var precio = this.precio[i];

          var recurso = this.recursos[i];

          recursos[recurso].restarCantidad(precio);
        }
        return suficente;
      }
    } else {
      console.log(recursos);
      console.log(this.precio);

      if (recursos.compararCantidad(this.precio)) {
        recursos.restarCantidad(this.precio);
        return true;
      }
    }
  }
  facilitar_compra(lugar) {
    var producto_comprar = document.createElement("li");

    producto_comprar.appendChild(document.createTextNode(this.nombre));

    lugar.appendChild(producto_comprar);

    return producto_comprar;
  }
}

//Mis variables
var historial = []; //Aquí guardaré todas las acciones que realice el usuario
var panel_ed_creado = false;
//Los botones de los edificios (para usarlos en cualquier función)

var generar;
var centro;
var fabrica;
var tienda;
var panel_tienda;
var hotel;
var crianza;
var petrolera;
var centro_ocio;
var transformacion;
var cobro;

var recursos = {
  Monedas: new Recurso("Monedas", "moneda.jpg"),
  Hormigón: new Recurso("Hormigón", "hormigon.jpg"),
  Ladrillos: new Recurso("Ladrillos", "ladrillo.jpg"),
  Obreros: new Recurso("Obreros", "obrero.png"),
  Petróleo: new Recurso("Petróleo", "petroleo.jpg"),
  Carne: new Recurso("Carne", "carne_perro.jpg"),
  Perro: new Recurso("Perro", "perro.jpg"),
  Plástico: new Recurso("Plástico", "plastico.jpg"),
};

//Trampillas para las pruebas

// recursos["Monedas"].cantidad = 30;
// recursos["Hormigón"].cantidad = 30;
// recursos["Ladrillos"].cantidad = 30;
// recursos["Obreros"].cantidad = 30;
// recursos["Petróleo"].cantidad = 30;
// recursos["Carne"].cantidad = 30;
// recursos["Perro"].cantidad = 30;
// recursos["Plástico"].cantidad = 30;

//No les paso por parámetro la cantidad ya que todos empiezan en 0

//Creo los edificios

//Aquí tengo los precios que cuesta cada edificio, y luego irán cambiando (los que deban)

var edificios = {
  Centro_Urbano: new Edificio("Centro_Urbano", 2),
  Apartamento: new Edificio("Apartamento", [6, 6], ["Monedas", "Hormigón"]),
  Fábrica_de_petróleo: new Edificio(
    "Fábrica_de_petróleo",
    [8, 9, 5],
    ["Monedas", "Hormigón", "Ladrillos"]
  ),
  Supermercado: new Edificio("Supermercado", [8, 9], ["Hormigón", "Ladrillos"]),
  Hotel_para_perros: new Edificio(
    "Hotel_para_perros",
    [8, 10, 5],
    ["Monedas", "Ladrillos", "Petróleo"]
  ),
  Petrolera: new Edificio(
    "Petrolera",
    [5, 8, 3],
    ["Monedas", "Hormigón", "Perro"]
  ),
  Centro_de_ocio: new Edificio(
    "Centro_de_ocio",
    [10, 9, 7, 3, 10],
    ["Monedas", "Hormigón", "Ladrillos", "Perro", "Plástico"]
  ),
};

var nodosTexto = ["▼_Edificios", "Extraer"]; //Un array de strings para asignar a cada botón el texto correspondiente

var nodoTexto; //Texto que asignar a los botones
var panel_edificios; //La lista de edificios para añadirle más

var panel_recursos; //El marcador de recursos que posee el jugador

//Array asociativo con las posibles compras del supermercado

var productos = new Array();

productos["Carne"] = new Producto("Carne", 3);
productos["Hormigón"] = new Producto("Hormigón", 1);
productos["Ladrillos"] = new Producto("Ladrillos", 1);
productos["Perro"] = new Producto("Perro", [5, 2], ["Petróleo", "Carne"]);
productos["Plástico"] = new Producto("Plástico", 15); //Se necesitan 10 obreros, que no se restan.

const musica = new Audio("img/cafe-urbano.mp3");
musica.loop = true; // música en bucle
musica.volume = 0.3;

var botones_compra = []; //Un array con los botones para comprar recursos
//Mis funciones

//Función para generar monedas
function generar_moneda() {
  musica.play();
  cant_monedas.style.color = "red";
  generar.disabled = true;
  var generacion = setTimeout(function () {
    recursos["Monedas"].sumarCantidad(1); //Genero una moneda
    historial.push("Has conseguido una moneda");
    cant_monedas.innerText = recursos["Monedas"].cantidad;

    if (
      recursos["Monedas"].compararCantidad(edificios["Centro_Urbano"].precio) &&
      !panel_ed_creado
    ) {
      crearPanel(nodosTexto[0], contenedor);
      alert("Has desbloqueado los edificios");
      crearBoton(edificios["Centro_Urbano"].nombre, panel_edificios);
      centro = document.getElementById(edificios["Centro_Urbano"].nombre);
      centro.setAttribute("class", "sin_comprar");
      centro.addEventListener("click", crear_Centro_Urbano);
      panel_ed_creado = true;
    }
    cant_monedas.style.color = "gold";
    generar.disabled = false;
  }, 250 * recursos["Monedas"].cantidad);

  //Función para crear botones
}
function crearPanel(texto, lugar) {
  nodoTexto = document.createTextNode(texto.replaceAll("_", " "));

  panel_edificios = document.createElement("ul");

  var desplegador = document.createElement("h2");

  desplegador.appendChild(nodoTexto);

  panel_edificios.appendChild(desplegador);

  panel_edificios.setAttribute("class", "edificios");

  lugar.appendChild(panel_edificios);

  panel_edificios.firstChild.addEventListener("click", desplegar);
}

//Función para añadir más opciones al botón edificios

function crearBoton(texto, lugar) {
  nodoTexto = document.createTextNode(texto.replaceAll("_", " "));

  var boton = document.createElement("button");

  boton.style.visibility = "visible";

  boton.setAttribute("id", texto.replaceAll(" ", "_"));

  boton.appendChild(nodoTexto);

  lugar.appendChild(boton);

  mostrar_precios();

  return boton;
}

//Función para crear el Centro Urbano

function crear_Centro_Urbano() {
  if (!edificios["Centro_Urbano"].estaConstruido()) {
    if (edificios["Centro_Urbano"].comprarEdificio(recursos)) {
      mostrarRecursos(panel_recursos);
      actualizar_recursos();
    }

    centro.setAttribute("class", "comprado");

    crearBoton(nodosTexto[1], contenedor);
    crearBoton(edificios["Apartamento"].nombre, panel_edificios);
    crearBoton(edificios["Fábrica_de_petróleo"].nombre, panel_edificios);
    crearBoton(edificios["Supermercado"].nombre, panel_edificios);

    cobro = document.getElementById(nodosTexto[1]);

    cobro.addEventListener("click", extraer);

    var apartamento = document.getElementById(edificios["Apartamento"].nombre);

    apartamento.addEventListener("click", proporcionar_Obreros);

    fabrica = document.getElementById(edificios["Fábrica_de_petróleo"].nombre);

    fabrica.setAttribute("class", "sin_comprar");

    fabrica.addEventListener("click", fabricar_petroleo);

    tienda = document.getElementById(edificios["Supermercado"].nombre);

    tienda.setAttribute("class", "sin_comprar");

    tienda.addEventListener("click", construir_super);

    alert("Tus recursos");
  } else {
    avisar(edificios["Centro_Urbano"].nombre);
  }
}

//Función para mostrar recursos

function mostrarRecursos(lugar) {
  for (var clave in recursos) {
    if (clave != "Monedas") {
      let recurso = recursos[clave];
      let imagen = document.createElement("img");
      imagen.setAttribute("src", "img/" + recurso["ruta_imagen"]);

      let cantidad = document.createElement("h3");

      cantidad.setAttribute("id", recurso.nombre);

      cantidad.innerText = recurso.cantidad;

      lugar.appendChild(imagen);
      lugar.appendChild(cantidad);
    }
  }
}

//Función para cobrar recursos

function extraer() {
  var recurso_recogido1 = parseInt(
    Math.random() * recursos["Obreros"].cantidad + 2
  );
  var recurso_recogido2 = parseInt(
    Math.random() * recursos["Obreros"].cantidad + 2
  );

  recursos["Hormigón"].sumarCantidad(recurso_recogido1);

  recursos["Ladrillos"].sumarCantidad(recurso_recogido2);

  actualizar_recursos();

  cobro.setAttribute("disabled", true);
  var desabilitar = setTimeout(function () {
    cobro.disabled = false;
  }, (45 - recursos["Obreros"].cantidad) * 1000);
}

//Función para actualizar recursos

function actualizar_recursos() {
  cant_monedas.innerText = recursos["Monedas"].cantidad;

  for (const clave in recursos) {
    if (clave != "Monedas") {
      var cantidad = document.getElementById(clave);

      cantidad.innerText = recursos[clave].cantidad;
    }
  }
}
//Función para desplegar/plegar el boton Edificios

function desplegar() {
  var botones = document.querySelectorAll(".edificios button");

  if (botones[botones.length - 1].style.visibility == "visible") {
    for (const boton of botones) {
      boton.style.visibility = "hidden";
      panel_edificios.firstChild.innerText = "▲ Edificios";
    }
  } else {
    for (const boton of botones) {
      boton.style.visibility = "visible";
      panel_edificios.firstChild.innerText = "▼ Edificios";
    }
  }
}

//Función de los apartamentos para proporcionar obreros

function proporcionar_Obreros() {
  if (edificios["Apartamento"].comprarEdificio(recursos)) {
    recursos["Obreros"].sumarCantidad(5);
    edificios["Apartamento"].subirPrecio(5);

    actualizar_recursos();
  }
}

//Función de la fábrica de petróleo para generar petróleo

function fabricar_petroleo() {
  if (!edificios["Fábrica_de_petróleo"].estaConstruido()) {
    if (edificios["Fábrica_de_petróleo"].comprarEdificio(recursos)) {
      fabrica.setAttribute("class", "comprado");
      hotel = crearBoton(
        edificios["Hotel_para_perros"].nombre,
        panel_edificios
      );
      hotel.setAttribute("class", "sin_comprar");
      actualizar_recursos();
      alert("Has desbloqueado el hotel para perros");

      var fabricacion = setInterval(function () {
        recursos["Petróleo"].sumarCantidad(1);
        actualizar_recursos();
      }, 20000);
      hotel.addEventListener("click", construir_hotel);
    }
  } else {
    avisar(edificios["Fábrica_de_petróleo"].nombre);
  }
}

//Función para construir el supermercado

function construir_super() {
  if (!edificios["Supermercado"].estaConstruido()) {
    if (edificios["Supermercado"].comprarEdificio(recursos)) {
      tienda.setAttribute("class", "comprado");
      actualizar_recursos();

      panel_tienda = document.createElement("div");

      panel_tienda.setAttribute("id", "panel_mercado");

      botones_compra.push(
        crearBoton("Comprar " + recursos["Hormigón"].nombre, panel_tienda)
      );

      botones_compra[0].setAttribute("name", recursos["Hormigón"].nombre);

      botones_compra.push(
        crearBoton("Comprar " + recursos["Ladrillos"].nombre, panel_tienda)
      );

      botones_compra[1].setAttribute("name", recursos["Ladrillos"].nombre);

      botones_compra.push(
        crearBoton("Comprar " + recursos["Carne"].nombre, panel_tienda)
      );

      botones_compra[2].setAttribute("name", recursos["Carne"].nombre);

      document.body.insertBefore(panel_tienda, panel_recursos);

      console.log(botones_compra);

      comprar();

      alert("Ya puedes comprar");
    }
  } else {
    avisar(edificios["Supermercado"].nombre);
  }
}

//Función para comprar algo en el supermercado

function comprar() {
  for (const boton_compra of panel_tienda.children) {
    boton_compra.onclick = function () {
      if (boton_compra.textContent.includes("Comprar")) {
        if (
          productos[boton_compra.getAttribute("name")].comprobar_Compra(
            recursos["Monedas"]
          )
        ) {
          recursos[
            productos[boton_compra.getAttribute("name")].nombre
          ].sumarCantidad(1);
          actualizar_recursos();
        } else {
          alert("No tienes dinero suficiente");
        }
      }
    };

    boton_compra.onmouseover = function () {
      // Función para ver los precios de los productos

      let cadena_precios = "";
      var nombre_producto = boton_compra.name;

      if (nombre_producto == "Plástico2") {
        cadena_precios = "Petróleo x 2\nObreros x 10 (no se restan)";
      } else if (Array.isArray(productos[nombre_producto].precio)) {
        for (let i = 0; i < productos[nombre_producto].precio.length; i++) {
          var precios = productos[nombre_producto].precio[i];
          if (i < productos[nombre_producto].precio.length - 1) {
            cadena_precios +=
              productos[nombre_producto].recursos[i] + " x " + precios + "\n";
          } else {
            cadena_precios +=
              productos[nombre_producto].recursos[i] + " x " + precios;
          }
        }
      } else {
        cadena_precios =
          productos[nombre_producto].recursos +
          " x " +
          productos[nombre_producto].precio;
      }
      boton_compra.setAttribute("title", cadena_precios);
    };
  }
}

//Función para mostrar los precios

function mostrar_precios() {
  for (const edificio of panel_edificios.children) {
    edificio.addEventListener("mouseover", function () {
      var cadena_precios = "";
      if (Array.isArray(edificios[edificio.id].precio)) {
        for (let i = 0; i < edificios[edificio.id].precio.length; i++) {
          var precios = edificios[edificio.id].precio[i];
          if (i < edificios[edificio.id].precio.length - 1) {
            cadena_precios +=
              edificios[edificio.id].recursos[i] + " x " + precios + "\n";
          } else {
            cadena_precios +=
              edificios[edificio.id].recursos[i] + " x " + precios;
          }
        }
        edificio.setAttribute("title", cadena_precios);
        cadena_precios = "";
      } else {
        cadena_precios =
          edificios[edificio.id].recursos +
          " x " +
          edificios[edificio.id].precio;
        edificio.setAttribute("title", cadena_precios);
        cadena_precios = "";
      }
    });
  }
}

// Función para construir el hotel parra perros

function construir_hotel() {
  if (!edificios["Hotel_para_perros"].estaConstruido()) {
    if (edificios["Hotel_para_perros"].comprarEdificio(recursos)) {
      actualizar_recursos();
      hotel.setAttribute("class", "comprado");
      crianza = crearBoton("Criar Perro", panel_tienda);
      crianza.setAttribute("name", "Perro");
      crianza.addEventListener("click", criar_perro);

      alert("Has desbloqueado la petrolera");

      petrolera = crearBoton(edificios["Petrolera"].nombre, panel_edificios);

      petrolera.setAttribute("class", "sin_comprar");

      petrolera.addEventListener("click", construir_petrolera);
      comprar();
    } else {
    }
  } else {
    avisar(edificios["Hotel_para_perros"].nombre);
  }
}

// Funcionalidad del hotel para perros

function criar_perro() {
  if (
    recursos["Petróleo"].compararCantidad(productos["Perro"].precio[0]) &&
    recursos["Carne"].compararCantidad(productos["Perro"].precio[1])
  ) {
    recursos["Petróleo"].restarCantidad(productos["Perro"].precio[0]);
    recursos["Carne"].restarCantidad(productos["Perro"].precio[1]);
    recursos["Perro"].sumarCantidad(1);
    actualizar_recursos();
  } else {
    alert(
      "Necesitas " +
        productos["Perro"].precio[0] +
        " de petróleo y " +
        productos["Perro"].precio[1] +
        " filetes de carne"
    );
  }
}

//Función para construir la petrolera

function construir_petrolera() {
  if (!edificios["Petrolera"].estaConstruido()) {
    if (edificios["Petrolera"].comprarEdificio(recursos)) {
      petrolera.setAttribute("class", "comprado");

      actualizar_recursos();

      transformacion = crearBoton("Transformar en Plástico", panel_tienda);

      transformacion.setAttribute("name", "Plástico2");

      transformacion.addEventListener("click", transformar_plastico);

      botones_compra.push(
        crearBoton("Comprar " + recursos["Plástico"].nombre, panel_tienda)
      );

      botones_compra[botones_compra.length - 1].setAttribute(
        "name",
        recursos["Plástico"].nombre
      );

      alert(
        "Has desbloqueado el " +
          edificios["Centro_de_ocio"].nombre.replaceAll("_", " ")
      );

      centro_ocio = crearBoton(
        edificios["Centro_de_ocio"].nombre,
        panel_edificios
      );

      centro_ocio.setAttribute("class", "sin_comprar");

      centro_ocio.addEventListener("click", consturir_centro_de_ocio);

      comprar();
    } else {
    }
  } else {
    avisar(edificios["Petrolera"].nombre);
  }
}

//Función para transformar petróelo en Plástico

function transformar_plastico() {
  let transformacion_plastico = 2; //Las unidades de petróleo que se necesitarán para obtener plástico
  let obreros_necesarios = 10;
  if (
    recursos["Petróleo"].compararCantidad(transformacion_plastico) &&
    recursos["Obreros"].compararCantidad(obreros_necesarios)
  ) {
    recursos["Petróleo"].restarCantidad(transformacion_plastico);
    recursos["Plástico"].sumarCantidad(1);

    actualizar_recursos();
  } else {
    alert(
      "Necesitas tener " +
        transformacion_plastico +
        " de " +
        recursos["Petróleo"].nombre +
        " y " +
        obreros_necesarios +
        " " +
        recursos["Obreros"].nombre
    );
  }
}
//Función para construir el centro de ocio

function consturir_centro_de_ocio() {
  if (!edificios["Centro_de_ocio"].estaConstruido()) {
    if (edificios["Centro_de_ocio"].comprarEdificio(recursos)) {
      centro_ocio.setAttribute("class", "comprado");
      actualizar_recursos();
      centro_ocio.setAttribute("class", "comprado");
      alert("HAS GANADO EL JUEGO!!!");
    }
  } else {
    avisar(edificios["Centro_de_ocio"].nombre);
  }
}

// Función para advertir que un edificio ya está construido

function avisar(edificio) {
  alert("El edificio " + edificio.replaceAll("_", " ") + " ya está construido");
}

window.onload = function () {
  generar = document.getElementById("generador");

  var contenedor = document.getElementById("contenedor");

  panel_recursos = document.getElementById("panel_recursos");

  var cant_monedas = document.getElementById("cant_monedas");

  cant_monedas.innerText = recursos["Monedas"].cantidad;

  generar.addEventListener("click", generar_moneda);
};

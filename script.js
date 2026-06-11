// ================================
// CONSULTA DE MICROPLÁSTICOS
// ================================

// Base de datos simple de productos
var productosConMicroplasticos = [
  "exfoliante", "scrub", "glitter", "microesferas", "peeling"
];

var productosRevision = [
  "rimel", "rímel", "mascara", "sombra", "contorno", "base", "bb cream", "cc cream"
];

var productosSeguros = [
  "labial", "polvo", "mineral", "blush", "rubor", "corrector en polvo", "sombra mineral"
];

function consultarProducto() {
  var input = document.getElementById("productoInput");
  var producto = input.value.trim().toLowerCase();
  var resultado = document.getElementById("resultado");

  // Campo vacío
  if (producto === "") {
    resultado.style.display = "block";
    resultado.style.borderLeftColor = "#e08070";
    resultado.innerHTML = "⚠️ Por favor, ingresá el nombre de un producto para consultar.";
    return;
  }

  // Determinar categoría
  var contiene = productosConMicroplasticos.some(function(p) { return producto.includes(p); });
  var revision = productosRevision.some(function(p) { return producto.includes(p); });
  var seguro   = productosSeguros.some(function(p) { return producto.includes(p); });

  resultado.style.display = "block";

  if (contiene) {
    resultado.style.borderLeftColor = "#c9736a";
    resultado.innerHTML =
      "🔴 <strong>" + input.value.trim() + "</strong> frecuentemente contiene microplásticos.<br><br>" +
      "Buscá en la etiqueta: <strong>Polyethylene, Polypropylene, Nylon-12, Acrylates Copolymer</strong>. " +
      "Si los encontrás, elegí una alternativa con ingredientes naturales como azúcar, sal o avena como exfoliante.";
  } else if (seguro) {
    resultado.style.borderLeftColor = "#5fb3b3";
    resultado.innerHTML =
      "🟢 <strong>" + input.value.trim() + "</strong> generalmente es una opción más segura.<br><br>" +
      "Los productos en polvo y con fórmulas minerales suelen estar libres de microplásticos. " +
      "Igual, revisá la etiqueta y verificá el registro ANMAT en <a href='https://www.anmat.gob.ar' target='_blank'>anmat.gob.ar</a>.";
  } else if (revision) {
    resultado.style.borderLeftColor = "#d9a050";
    resultado.innerHTML =
      "🟡 <strong>" + input.value.trim() + "</strong> — revisá la etiqueta.<br><br>" +
      "Algunos productos de esta categoría contienen polímeros sintéticos como espesantes o filmadores. " +
      "Buscá en el INCI: <strong>Acrylates Copolymer, Carbomer, PVP</strong>. Si podés, elegí fórmulas sin estos ingredientes.";
  } else {
    resultado.style.borderLeftColor = "#5fb3b3";
    resultado.innerHTML =
      "🔍 Consultando sobre: <strong>" + input.value.trim() + "</strong>.<br><br>" +
      "No encontramos este producto en nuestra base. Te recomendamos revisar la etiqueta y buscar términos como " +
      "<strong>Polyethylene, Nylon-12, Polypropylene</strong>. También podés verificar su registro en " +
      "<a href='https://www.anmat.gob.ar' target='_blank'>ANMAT</a>.";
  }

  // Limpiar input
  input.value = "";
}

// También funciona con Enter
document.addEventListener("DOMContentLoaded", function() {
  var inputEl = document.getElementById("productoInput");
  if (inputEl) {
    inputEl.addEventListener("keydown", function(e) {
      if (e.key === "Enter") consultarProducto();
    });
  }
});

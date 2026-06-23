// ================================
// CONSULTA DE MICROPLÁSTICOS
// ================================


function consultarIngredientes() {
  let input = document.getElementById("productoInput");
  let producto = input.value.trim().toLowerCase();
  let ingredientesUsuario = producto.split(",").map(ingrediente => ingrediente.trim())
  let resultado = document.getElementById("resultado");
  let microplasticos = ['polietileno', 'polipropileno', 'tereftalato de polietileno', 'nylon-12', 'nylon-6', 'poliuretano', 'copolímero acrílico', 'copolimero acrilico', 'copolímero de acrilatos', 'polímero cruzado acrílico', 'polimero cruzado acrilico', 'crospolímero de acrilatos', 'poliacrilato', 'polimetacrilato de metilo', 'poliestireno', 'policuaternio', 'pe', 'pp', 'pet', 'pur', 'ac', 'acs', 'pa', 'pmma', 'ps', 'pq', 'polyethylene', 'polypropylene', 'polyethylene terephthalate', 'polyurethane', 'acrylic copolymer', 'acrylic cross polymer', 'polyacrylate', 'polymethyl methacrylate', 'polystyrene', 'polyquaternium', 'acrylates crosspolymer', 'acrylates copolymer']


  // Campo vacío
  if (producto === "") {
    resultado.style.display = "block";
    resultado.style.borderLeftColor = "#e08070";
    resultado.innerHTML = "⚠️ Por favor, ingresá los ingredientes del producto a consultar.";
    return;
}

  let esPlastico = false
    for(let i=0; i< ingredientesUsuario.length; i++){
        let componente = ingredientesUsuario[i]
        for(let j=0; j< microplasticos.length; j++){
            let componentePlastico = microplasticos[j]
            if (componentePlastico.length <= 3) { // Si el plástico es una sigla corta (pe, pp, pet, pa), el ingrediente debe ser EXACTAMENTE igual
              if (componente === componentePlastico) {
                esPlastico = true;
                break;
              }
            }else { // Si el plástico es una palabra larga (ej: "acrylates copolymer"), busca si está metida dentro del ingrediente
              if (componente.includes(componentePlastico)) {
                esPlastico = true;
                break;
              }
            }
            
        if (esPlastico) break;
    }
    resultado.style.display = "block";

    if(esPlastico == true){
        resultado.style.borderLeftColor = "#c9736a";
        resultado.innerHTML = "🔴 <strong>" + "</strong> Tu producto contiene microplásticos.<br><br>" +
                              "Podés buscar alternativas en la sección de recomendaciones";
    }else{
        resultado.style.borderLeftColor = "#5fb3b3";
        resultado.innerHTML = "🟢 <strong>" + "</strong> Tu producto pareciera ser libre de microplásticos.<br><br>" +
                              "Igualmente recomendamos revisar la etiqueta y verificar el registro ANMAT en <a href='https://www.anmat.gob.ar' target='_blank'>anmat.gob.ar</a>.";
    }

  // Limpiar input
 input.value = "";
}
}

// También funciona con Enter
document.addEventListener("DOMContentLoaded", function() {
  var inputEl = document.getElementById("productoInput");
  if (inputEl) {
    inputEl.addEventListener("keydown", function(e) {
      if (e.key === "Enter") consultarIngredientes();
    });
  }
});
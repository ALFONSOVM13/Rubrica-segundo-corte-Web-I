let todosLosDatos = [];
let generosUnicos = [];

fetchData();

async function fetchData() {
  try {
    const respuesta = await fetch('https://rickandmortyapi.com/api/character');
    const datos = await respuesta.json();
    todosLosDatos = datos.results;
    generosUnicos = [...new Set(todosLosDatos.map((personaje) => personaje.gender))];
    renderizarTarjetas(todosLosDatos); // muestra todos los elementos
    renderizarGeneros(generosUnicos);
  } catch (error) {
    console.error(error);
  }
}


function renderizarTarjetas(datos) {
  const contenedorTarjetas = document.querySelector('#cards-container');
  contenedorTarjetas.innerHTML = '';
  datos.slice(0, 12).forEach((personaje) => {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('col-lg-3', 'col-md-6', 'mb-4');
    tarjeta.innerHTML = `
      <div class="card h-100">
        <img class="card-img-top" src="${personaje.image}" alt="${personaje.name}">
        <div class="card-body">
          <h4 class="card-title">${personaje.name}</h4>
          <p class="card-text"><strong>Género:</strong> ${personaje.gender}</p>
          <p class="card-text"><strong>Estado:</strong> ${personaje.status}</p>
          <p class="card-text"><strong>Especie:</strong> ${personaje.species}</p>
        </div>
      </div>
    `;
    contenedorTarjetas.appendChild(tarjeta);
  });
}


function renderizarGeneros() {
  const selectElemento = document.querySelector('#select-gender');
  const generos = [...new Set(todosLosDatos.map((personaje) => personaje.gender))];
  if (!generos.includes('unknown')) {
    generos.unshift('unknown');
  }
  console.log(generos); // Agregado para verificar que 'unknown' se agrega correctamente
  selectElemento.innerHTML = `
    <option value="all">Todos los géneros</option>
    ${generos.map((genero) => `<option value="${genero}">${genero}</option>`).join('')}
  `;
}


function filtrar() {
  const generoSeleccionado = document.querySelector('#select-gender').value;
  const consultaBusqueda = document.querySelector('#search-input').value.toLowerCase();
  let datosFiltrados = [];

  if (generoSeleccionado === 'all') {
    datosFiltrados = todosLosDatos;
  } else {
    datosFiltrados = todosLosDatos.filter((personaje) => personaje.gender === generoSeleccionado);
  }

  if (consultaBusqueda) {
    datosFiltrados = datosFiltrados.filter((personaje) => personaje.name.toLowerCase().includes(consultaBusqueda));
  }

  renderizarTarjetas(datosFiltrados);
}


function reiniciar() {
  renderizarTarjetas(todosLosDatos);
}

document.querySelector('#search-form').addEventListener('submit', (evento) => {
  evento.preventDefault();
  filtrar();
});

document.querySelector('#search-input').addEventListener('input', filtrar);
document.querySelector('#select-gender').addEventListener('change', filtrar);

// Navbar
$(document).ready(function(){
  $('.navbar-toggler').click(function(){
    $('.navbar-collapse').toggleClass('show');
  });
});




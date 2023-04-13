let allData = [];
let uniqueGenders = [];

fetchData();

async function fetchData() {
  try {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    allData = data.results;
    uniqueGenders = [...new Set(allData.map((character) => character.gender))];
    renderCards(allData); // muestra todos los elementos
    renderGenders(uniqueGenders);
  } catch (error) {
    console.error(error);
  }
}

function renderCards(data) {
  const cardsContainer = document.querySelector('#cards-container');
  cardsContainer.innerHTML = '';
  data.slice(0, 12).forEach((character) => {
    const card = document.createElement('div');
    card.classList.add('col-lg-3', 'col-md-6', 'mb-4');
    card.innerHTML = `
      <div class="card h-100">
        <img class="card-img-top" src="${character.image}" alt="${character.name}">
        <div class="card-body">
          <h4 class="card-title">${character.name}</h4>
          <p class="card-text"><strong>Gender:</strong> ${character.gender}</p>
          <p class="card-text"><strong>Status:</strong> ${character.status}</p>
          <p class="card-text"><strong>Species:</strong> ${character.species}</p>
        </div>
      </div>
    `;
    cardsContainer.appendChild(card);
  });
}

function renderGenders() {
  const selectElement = document.querySelector('#select-gender');
  const genders = [...new Set(allData.map((character) => character.gender))];
  if (!genders.includes('unknown')) {
    genders.unshift('unknown');
  }
  console.log(genders); // Agregado para verificar que 'unknown' se agrega correctamente
  selectElement.innerHTML = `
    <option value="all">Todos los géneros</option>
    ${genders.map((gender) => `<option value="${gender}">${gender}</option>`).join('')}
  `;
}

function filter() {
  const selectedGender = document.querySelector('#select-gender').value;
  const searchQuery = document.querySelector('#search-input').value.toLowerCase();
  let filteredData = [];

  if (selectedGender === 'all') {
    filteredData = allData;
  } else {
    filteredData = allData.filter((character) => character.gender === selectedGender);
  }

  if (searchQuery) {
    filteredData = filteredData.filter((character) => character.name.toLowerCase().includes(searchQuery));
  }

  renderCards(filteredData);
}

function reset() {
  renderCards(allData);
}

document.querySelector('#search-form').addEventListener('submit', (event) => {
  event.preventDefault();
  filter();
});

document.querySelector('#search-input').addEventListener('input', filter);
document.querySelector('#select-gender').addEventListener('change', filter);

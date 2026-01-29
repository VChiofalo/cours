const input = document.getElementById('pokemonInput');
const searchBtn = document.getElementById('searchBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const typeFilter = document.getElementById('typeFilter');
const grid = document.getElementById('pokemonGrid');
const loader = document.getElementById('loader');

let currentId = 1;
const maxPokemon = 151;
const pageSize = 6;

// Affichage Pokémons
function displayPokemon(pokemons) {
}

// Récupération d'un Pokémon
function fetchPokemon(nameOrId) {
}

// Récupération multiple
function fetchMultiple(startId = 1, count = pageSize) {
}

// Filtre par type
function fetchByType(type) {
}

// Événements
searchBtn.addEventListener('click', () => {
  const value = input.value.toLowerCase().trim();
  if (value) fetchPokemon(value);
});

prevBtn.addEventListener('click', () => {
  const start = currentId - pageSize > 0 ? currentId - pageSize : 1;
  fetchMultiple(start, pageSize);
});

nextBtn.addEventListener('click', () => {
  const start = currentId + 1 <= maxPokemon ? currentId + 1 : maxPokemon - pageSize + 1;
  fetchMultiple(start, pageSize);
});

typeFilter.addEventListener('change', () => fetchByType(typeFilter.value));

// Charger les premiers Pokémon
fetchMultiple(1, pageSize);
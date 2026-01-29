// API = https://pokeapi.co/

const input = document.getElementById('pokemonInput');
const btn = document.getElementById('searchBtn');
const info = document.getElementById('pokemonInfo');

btn.addEventListener('click', () => {
  const pokemon = input.value.toLowerCase().trim();
  if (pokemon) {
    fetchPokemon(pokemon);
  }
});

// Coder la fonction afin de récupérer et stocker les informations d'un pokemon par son nom et/ou son id
function fetchPokemon(nameOrId) {
}

// Coder la fonction afin d'afficher
function displayPokemon(pokemon) {
    // 1. Le nom et l'id du pokemon
    // 2. Son image
    // 3. Son type
    // 4. Ses HP
    // 5. Son attaque
    // 6. Sa défense
}
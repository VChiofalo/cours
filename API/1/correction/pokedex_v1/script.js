const input = document.getElementById('pokemonInput');
const btn = document.getElementById('searchBtn');
const info = document.getElementById('pokemonInfo');

btn.addEventListener('click', () => {
  const pokemon = input.value.toLowerCase().trim();
  if (pokemon) {
    fetchPokemon(pokemon);
  }
});

function fetchPokemon(nameOrId) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`)
    .then(response => {
      if (!response.ok) throw new Error('Pokémon non trouvé');
      return response.json();
    })
    .then(data => displayPokemon(data))
    .catch(error => {
      info.innerHTML = `<p style="color:red;">${error.message}</p>`;
    });
}

function displayPokemon(pokemon) {
  const types = pokemon.types.map(t => `<span class="type-${t.type.name}">${t.type.name}</span>`).join(' ');
  info.innerHTML = `
    <h2>${pokemon.name} (#${pokemon.id})</h2>
    <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
    <p class="pokemon-types">${types}</p>
    <p>HP: ${pokemon.stats[0].base_stat}</p>
    <p>Attaque: ${pokemon.stats[1].base_stat}</p>
    <p>Défense: ${pokemon.stats[2].base_stat}</p>
  `;
}
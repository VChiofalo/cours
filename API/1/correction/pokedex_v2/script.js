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

// Affichage Pokémon
function displayPokemon(pokemons) {
  grid.innerHTML = '';
  pokemons.forEach(pokemon => {
    const types = pokemon.types.map(t => `<span class="type-${t.type.name}">${t.type.name}</span>`).join(' ');
    const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
    const stats = pokemon.stats.map(s => `${s.stat.name}: ${s.base_stat}`).join('<br>');

    grid.innerHTML += `
      <div class="pokemon-card">
        <h3>${pokemon.name} (#${pokemon.id})</h3>
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
        <p class="pokemon-types">${types}</p>
        <p>${stats}</p>
        <p>Capacités: ${abilities}</p>
      </div>
    `;
    currentId = pokemon.id;
  });
}

// Récupération d'un Pokémon
function fetchPokemon(nameOrId) {
  loader.style.display = 'block';
  fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`)
    .then(res => {
      if (!res.ok) throw new Error('Pokémon non trouvé');
      return res.json();
    })
    .then(data => {
      loader.style.display = 'none';
      displayPokemon([data]);
    })
    .catch(err => {
      loader.style.display = 'none';
      grid.innerHTML = `<p style="color:red;">${err.message}</p>`;
    });
}

// Récupération multiple
function fetchMultiple(startId = 1, count = pageSize) {
  loader.style.display = 'block';
  const promises = [];
  for (let i = startId; i < startId + count && i <= maxPokemon; i++) {
    promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${i}`).then(res => res.json()));
  }
  Promise.all(promises)
    .then(data => {
      loader.style.display = 'none';
      displayPokemon(data);
    })
    .catch(() => {
      loader.style.display = 'none';
      grid.innerHTML = `<p style="color:red;">Erreur lors du chargement</p>`;
    });
}

// Filtre par type
function fetchByType(type) {
  if (!type) return fetchMultiple(currentId, pageSize);
  loader.style.display = 'block';
  fetch(`https://pokeapi.co/api/v2/type/${type}`)
    .then(res => res.json())
    .then(data => {
      loader.style.display = 'none';
      const pokemons = data.pokemon.slice(0, pageSize).map(p => p.pokemon);
      Promise.all(pokemons.map(p => fetch(p.url).then(res => res.json())))
        .then(displayPokemon);
    });
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
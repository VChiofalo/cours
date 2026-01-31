const input = document.getElementById('pokemonInput');
const searchBtn = document.getElementById('searchBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const typeFilter = document.getElementById('typeFilter');
const sortAttackBtn = document.getElementById('sortAttackBtn');
const guessBtn = document.getElementById('guessBtn');
const grid = document.getElementById('pokemonGrid');
const loader = document.getElementById('loader');

let currentId = 1;
const maxPokemon = 151;
const pageSize = 6;
let lastPokemons = []; // Pour le tri et le mini-défi

// Fonctions d'affichage
function displayPokemon(pokemons) {
  grid.innerHTML = '';
  lastPokemons = pokemons; // sauvegarde pour tri ou devine
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

// Fetch simple
function fetchPokemon(nameOrId) {
  loader.style.display = 'block';
  fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`)
    .then(res => {
      if (!res.ok) throw new Error(`Pokémon "${nameOrId}" non trouvé`);
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

// Fetch multiple Pokémon
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

// Filtrer par type
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

// Tri par attaque
function sortByAttack() {
  if (!lastPokemons.length) return;
  const sorted = [...lastPokemons].sort((a,b) => b.stats[1].base_stat - a.stats[1].base_stat);
  displayPokemon(sorted);
}

// Mini-défi "Devine le Pokémon"
function guessPokemon() {
  // Tirer un ID aléatoire entre 1 et 151
  const randomId = Math.floor(Math.random() * 151) + 1;

  loader.style.display = 'block'; // afficher le loader pendant la requête
  fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
    .then(res => {
      loader.style.display = 'none';
      if (!res.ok) throw new Error('Erreur lors du chargement du Pokémon mystère');
      return res.json();
    })
    .then(random => {
      // Créer la carte du mini-défi
      const guessDiv = document.createElement('div');
      guessDiv.classList.add('pokemon-card');

      guessDiv.innerHTML = `
        <h3>Devine ce Pokémon !</h3>
        <img src="${random.sprites.front_default}" alt="Pokémon mystère">
        <input type="text" placeholder="Écris son nom..." id="guessInput">
        <button id="submitGuess">Valider</button>
        <p id="feedback"></p>
      `;

      // Supprime l'ancien défi si présent
      const old = document.getElementById('guessDiv');
      if (old) old.remove();

      guessDiv.id = 'guessDiv';
      grid.prepend(guessDiv); // Ajoute en haut de la grille

      const submitBtn = guessDiv.querySelector('#submitGuess');
      const inputField = guessDiv.querySelector('#guessInput');
      const feedback = guessDiv.querySelector('#feedback');

      submitBtn.addEventListener('click', () => {
        const answer = inputField.value.trim().toLowerCase();
        if (!answer) return;
        if (answer === random.name) {
          feedback.textContent = `🎉 Bravo ! C'était bien ${random.name} !`;
          feedback.style.color = 'green';
        } else {
          feedback.textContent = `❌ Non, c'était ${random.name}.`;
          feedback.style.color = 'red';
        }
      });
    })
    .catch(err => {
      loader.style.display = 'none';
      alert(err.message);
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
sortAttackBtn.addEventListener('click', sortByAttack);
guessBtn.addEventListener('click', guessPokemon);

// Chargement initial
fetchMultiple(1, pageSize);
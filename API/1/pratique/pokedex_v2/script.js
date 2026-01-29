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


/*
  Par rapport à la v1, ajoutez les informations suivantes :
    1. Plus d'informations :
      - Ajoutez toutes les statistiques du Pokémon (attaque spéciale, défense spéciale, vitesse…).
      - Ajoutez l’image de dos du Pokémon (sprites.back_default).
      - Ajoutez les capacités (abilities) dans la carte.

    2. Un filtrage par type :
      - Ajoutez un menu déroulant avec tous les types de Pokémon (feu, eau, etc.).
      - Affichez uniquement les Pokémon qui correspondent au type sélectionné.
      Astuce : la PokeAPI propose un endpoint pour chaque type, par ex. : https://pokeapi.co/api/v2/type/fire

    3. Une fonction de trie des Pokemons :
      - Affichez les Pokémon d’une mini-grille triés par attaque, défense, ou HP.
      - Permettre à l’utilisateur de choisir le critère de tri avec un bouton ou un select.

    4. Une navigation améliorée
      - Ajoutez un champ pour saisir le nombre de Pokémon à afficher dans la grille.
      - Modifiez les boutons “Suivant / Précédent” pour qu’ils tiennent compte de ce nombre.
      - Ajouter un scroll infini optionnel : charger automatiquement les Pokémon suivants quand l’utilisateur atteint le bas de la page.
    
    5. Une animation et du style
      - Ajoutez une animation au survol des cartes (agrandir légèrement ou changer la couleur de fond).
      - Ajoutez un loader qui s’affiche pendant que l’API répond.
      - Colorez les types avec des dégradés ou des images de fond selon le type de Pokémon.

    6. Optionnel : un mini-défi
      - Affichez un Pokémon aléatoire au chargement de la page.
      - Ajoutez un bouton “Devine le Pokémon” qui masque le nom et demande à l’utilisateur de le deviner.
      - Affichez si la réponse est correcte et révéler les informations complètes.
*/

// Fonctions d'affichage
function displayPokemon() {
}

// Fetch simple
function fetchPokemon() {
}

// Fetch multiple Pokémon
function fetchMultiple() {
}

// Filtrer par type
function fetchByType() {
}

// Tri par attaque
function sortByAttack() {
}

// Mini-défi "Devine le Pokémon"
function guessPokemon() {
  // Tirer un ID aléatoire entre 1 et 151
      // Créer la carte du mini-défi

      // Supprime l'ancien défi si présent
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
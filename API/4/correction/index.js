// index.js
const express = require('express');
const app = express();

app.use(express.json());

// ------------------------------
// Données simulées
// ------------------------------
const pokemons = [
  { id: 1, name: 'Bulbasaur' },
  { id: 2, name: 'Charmander' },
];

// ------------------------------
// Route 1 : GET Pokémon par ID
// ------------------------------
app.get('/pokemon/:id', (req, res) => {
  const pokemon = pokemons.find(p => p.id === parseInt(req.params.id));
  if (!pokemon) {
    return res.status(404).json({ error: 'Pokémon non trouvé' });
  }
  res.json(pokemon);
});

// ------------------------------
// Route 2 : POST nouveau Pokémon avec validation
// ------------------------------
app.post('/pokemon', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Le champ 'name' est obligatoire" });
  }
  const newPokemon = { id: pokemons.length + 1, name };
  pokemons.push(newPokemon);
  res.status(201).json(newPokemon);
});

// ------------------------------
// Route 3 : GET pour tester une erreur volontaire
// ------------------------------
app.get('/error', (req, res) => {
  throw new Error('Erreur volontaire pour tester le middleware');
});

// ------------------------------
// Route 4 : DELETE Pokémon avec vérification admin
// ------------------------------
function checkAdmin(req, res, next) {
  const isAdmin = req.headers['x-admin'] === 'true';
  if (!isAdmin) {
    return res.status(403).json({ error: 'Accès refusé : rôle administrateur requis' });
  }
  next();
}

app.delete('/pokemon/:id', checkAdmin, (req, res) => {
  const index = pokemons.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: 'Pokémon non trouvé' });
  }
  const removed = pokemons.splice(index, 1);
  res.json({ message: `Pokémon ${removed[0].name} supprimé` });
});

// ------------------------------
// Middleware global de gestion des erreurs
// ------------------------------
app.use((err, req, res, next) => {
  console.error('Erreur détectée :', err.stack);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

// ------------------------------
// Lancement du serveur
// ------------------------------
const PORT = 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
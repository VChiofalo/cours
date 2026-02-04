# Gestion des erreurs et exceptions dans Express

## Objectif

- Comprendre les codes HTTP et leur utilisation.
- Créer des messages d’erreur clairs et précis.
- Implémenter un middleware global pour gérer les exceptions.

## Préparation

Dans le dossier actuel (pensez à bien vous y placer dans le terminal) :
1. Initialisez un projet Node.js :
```bash
npm init
```

2. Installez express :
```bash
npm install express
```

3. Créez un fichier ```index.js``` avec le squelette Express suivant :
```js
const express = require('express');
const app = express();

app.use(express.json());

// Ici viendront les routes

// Middleware global de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur http://localhost:${PORT}`));
```

## Création de routes avec erreurs

**Route 1** : GET d’une ressource inexistante
```js
const pokemons = [
  { id: 1, name: 'Bulbasaur' },
  { id: 2, name: 'Charmander' },
];

app.get('/pokemon/:id', (req, res) => {
  const pokemon = pokemons.find(p => p.id === parseInt(req.params.id));
  if (!pokemon) {
    return res.status(404).json({ error: 'Pokémon non trouvé' });
  }
  res.json(pokemon);
});
```
Testez avec ```/pokemon/1``` et ```/pokemon/99```.

---

**Route 2** : POST avec validation
```js
app.post('/pokemon', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Le champ 'name' est obligatoire" });
  }
  const newPokemon = { id: pokemons.length + 1, name };
  pokemons.push(newPokemon);
  res.status(201).json(newPokemon);
});
```
Testez avec ```{"name": "Squirtle"}``` et ```{}``` pour voir la différence.

---

**Route 3** : Erreur volontaire pour tester le middleware
```js
app.get('/error', (req, res) => {
  throw new Error('Erreur volontaire pour tester le middleware');
});
```
Testez avec ```/error``` et observez le message dans le terminal et la réponse JSON.

---

**Bonus** : Middleware personnalisé pour les 401 / 403
```js
function checkAdmin(req, res, next) {
  const isAdmin = req.headers['x-admin'] === 'true';
  if (!isAdmin) {
    return res.status(403).json({ error: 'Accès refusé : rôle administrateur requis' });
  }
  next();
}

app.delete('/pokemon/:id', checkAdmin, (req, res) => {
  res.json({ message: `Pokémon ${req.params.id} supprimé` });
});
```
Testez avec et sans le header ```x-admin: true```.

## Réponses

**GET ```/pokemon/1```**
- Réponse : { "id": 1, "name": "Bulbasaur" }
- Code HTTP : 200

**GET ```/pokemon/99```**
- Réponse : { "error": "Pokémon non trouvé" }
- Code HTTP : 404

**POST ```/pokemon``` avec body ```{ "name": "Squirtle" }```**
- Réponse : { "id": 3, "name": "Squirtle" }
- Code HTTP : 201

**POST ```/pokemon ```avec body ```{}```**
- Réponse : { "error": "Le champ 'name' est obligatoire" }
- Code HTTP : 400

**GET ```/error```**
- Middleware global gère l’exception :
- Réponse : { "error": "Erreur interne du serveur" }
- Code HTTP : 500
- Console : affiche la stack de l’erreur

**DELETE ```/pokemon/2``` sans header x-admin**
- Réponse : { "error": "Accès refusé : rôle administrateur requis" }
- Code HTTP : 403

**DELETE ```/pokemon/2``` avec header ```x-admin: true```**
- Réponse : { "message": "Pokémon Charmander supprimé" }
- Code HTTP : 200
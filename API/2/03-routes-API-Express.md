# Créer des routes dans une API Express

Après avoir compris la structure d’un projet et lancé votre serveur Node.js avec Express, l’étape suivante est **la création des routes**. Les routes sont les points d’entrée de votre API : elles définissent **ce que le serveur doit faire lorsqu’une requête est reçue**.

## Qu’est-ce qu’une route ?

Une route correspond à une **URL spécifique** à laquelle le client peut envoyer une requête HTTP. Chaque route est associée à une **méthode HTTP** (GET, POST, PUT, DELETE…) qui indique l’action souhaitée sur la ressource.

Par exemple, dans un Pokédex :
- ```GET /pokemons``` → récupérer tous les Pokémon
- ```GET /pokemons/1``` → récupérer le Pokémon numéro 1
- ```POST /pokemons``` → ajouter un nouveau Pokémon
- ```PUT /pokemons/1``` → modifier le Pokémon numéro 1
- ```DELETE /pokemons/1``` → supprimer le Pokémon numéro 1

Chaque route est donc **un couple URL** + **méthode HTTP**.

## Créer sa première route

Pour créer une route avec Express, il faut utiliser la syntaxe :
```js
app.METHOD(PATH, HANDLER)
```
- **METHOD** est la méthode HTTP (```get```, ```post```, ```put```, ```delete```)
- **PATH** est l’URL de l’endpoint
- **HANDLER** est une fonction qui prend deux paramètres : ```req``` (requête) et ```res``` (réponse)

Exemple :
```js
app.get('/pokemons', (req, res) => {
  res.json({ message: 'Liste de tous les Pokémon' });
});
```

Dans cet exemple, lorsque le client envoie une requête ```GET``` à ```/pokemons```, le serveur renvoie une réponse JSON contenant un message.

## Routes avec paramètres

Souvent, on souhaite accéder à **une ressource spécifique**. Pour cela, Express permet d’utiliser des paramètres dans l’URL, identifiés par un ```:```.

Exemple :
```js
app.get('/pokemons/:id', (req, res) => {
  const id = req.params.id;
  res.json({ message: `Vous avez demandé le Pokémon numéro ${id}` });
});
```
- ```req.params.id``` permet de récupérer le numéro passé dans l’URL.
- Cela permet de créer des routes dynamiques pour toutes les ressources.

## Routes POST pour créer des données

Pour ajouter des données côté serveur, on utilise la méthode ```POST``` :
```js
app.post('/pokemons', (req, res) => {
  const newPokemon = req.body; // suppose que le JSON est envoyé dans le corps
  // ici, vous ajouteriez le Pokémon à votre "store"
  res.status(201).json({ message: 'Pokémon ajouté', pokemon: newPokemon });
});
```
```req.body``` contient les données envoyées par le client.

Il faut **activer le middleware** ```express.json()``` dans ```app.js``` pour pouvoir **lire le JSON** :
```js
app.use(express.json());
```

## Routes PUT et DELETE pour modifier ou supprimer

Pour **mettre à jour** une ressource :
```js
app.put('/pokemons/:id', (req, res) => {
  const id = req.params.id;
  const updatedPokemon = req.body;
  res.json({ message: `Pokémon ${id} mis à jour`, pokemon: updatedPokemon });
});
```

Pour **supprimer** une ressource :
```js
app.delete('/pokemons/:id', (req, res) => {
  const id = req.params.id;
  res.json({ message: `Pokémon ${id} supprimé` });
});
```
Ces routes permettent de manipuler vos ressources tout en respectant les principes REST.

## Utiliser ```Router``` pour organiser les routes

Quand une API devient plus grande, il est pratique de **séparer les routes par fichier** avec ```express.Router()``` :
```js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Liste des joueurs' });
});

router.post('/', (req, res) => {
  const newPlayer = req.body;
  res.status(201).json({ message: 'Joueur ajouté', player: newPlayer });
});

module.exports = router;
```

Et dans ```app.js``` :
```js
const playersRoutes = require('./routes/players.routes');
app.use('/players', playersRoutes);
```

Cela permet de **maintenir vos routes organisées** et de séparer la logique par ressource.

## Petit plus

### Qu’est-ce qu’un middleware dans Express ?

Un **middleware** est une fonction qui s’exécute **entre la réception d’une requête par le serveur et l’envoi de la réponse au client**. Son rôle est de **traiter**, **modifier** ou **filtrer les requêtes** et **réponses** avant qu’elles n’atteignent votre route finale.

Par exemple, un middleware peut :
- **parser le JSON** envoyé par le client (```express.json()```)
- **logger les requêtes** pour savoir qui appelle l’API
- **gérer les erreurs** de manière centralisée
- **protéger certaines routes** avec une authentification

On peut les utiliser **localement** sur une route ou **globalement** pour toutes les routes de l’application.

Exemple :
```js
// Middleware global : log de toutes les requêtes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // Passe au middleware suivant ou à la route
});

// Middleware pour parser le JSON
app.use(express.json());
```

Le mot clé ```next()``` **est essentiel** : il indique à Express de **continuer le traitement** vers la route ou le middleware suivant. Sans ```next()```, la requête resterait bloquée.

On peut représenter le chemin d’une requête HTTP dans Express de manière séquentielle :
```scss
Client envoie une requête
           │
           ▼
      Middleware 1
  (ex : logger la requête)
           │
           ▼
      Middleware 2
  (ex : parser le JSON)
           │
           ▼
      Middleware 3
  (ex : vérifier l’authentification)
           │
           ▼
      Route finale
  (ex : GET /pokemons)
           │
           ▼
      Réponse envoyée au client
```
Chaque **bloc intermédiaire** est un middleware : il peut analyser, transformer ou valider la requête. La requête **passe par tous les middlewares activés**, dans l’ordre où ils ont été déclarés. La fonction ```next()``` permet de **passer au middleware suivant ou à la route finale**. Cela rend la logique de traitement **modulaire** et **réutilisable**, car chaque middleware peut se concentrer sur une seule tâche

## Pour résumer

- **Endpoints clairs et prévisibles** : ```/pokemons```, ```/players/:id```.
- **Respecter les méthodes HTTP**: ```GET``` = lire, ```POST``` = créer, ```PUT```/```PATCH``` = modifier, ```DELETE``` = supprimer.
- **Réponses JSON cohérentes** : inclure un message et les données concernées.
- **Statuts HTTP corrects** : 200 pour succès, 201 pour création, 404 pour introuvable.
- **Organisation par ressource** : un fichier par type de ressource avec ```Router```.

## Pratique

**Objecif** : 
- Mettre en place des routes simples

Pour ce faire, allez dans le dossier ```rogue-btc2``` et ouvrez le fichier [API-REST-Rogue.md](../rogue-btc2/API-REST-Rogue.md) et faites la **Partie 1**.

---

© Vincent Chiofalo
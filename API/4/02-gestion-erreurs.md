# Gestion des erreurs et des exceptions : codes HTTP, messages d’erreur et stratégies

Lorsqu’une API est consommée par d’autres applications, il est crucial de **communiquer clairement ce qui se passe en cas de problème**. Une requête peut échouer pour de nombreuses raisons : ressource inexistante, données invalides, problème serveur, ou tentative d’accès non autorisée.

La **gestion des erreurs et exceptions** permet de :
- Informer le client de manière compréhensible.
- Garantir que l’API reste **prévisible et robuste**.
- Faciliter le **debugging** et la **maintenance**.

## Codes HTTP : base de la communication d’erreurs

Comme nous l'avons vu précédement, chaque réponse d’une API REST est accompagnée d’un **code HTTP** indiquant le résultat de la requête. Ces codes doivent être utilisés de **manière cohérente** :
- **200 OK** : tout s’est bien passé.
- **201 Created** : une ressource a été créée.
- **400 Bad Request** : la requête est invalide (paramètres manquants ou incorrects).
- **401 Unauthorized** : l’utilisateur n’est pas authentifié.
- **403 Forbidden** : l’utilisateur est authentifié mais n’a pas le droit d’accéder à la ressource.
- **404 Not Found** : la ressource demandée n’existe pas.
- **500 Internal Server Error** : une erreur serveur inattendue s’est produite.
```js
app.get('/pokemon/:id', (req, res) => {
  const pokemon = getPokemonById(req.params.id);
  if (!pokemon) {
    return res.status(404).json({ error: 'Pokémon non trouvé' });
  }
  res.json(pokemon);
});
```

## Messages d’erreur clairs

Un **message d’erreur explicite** aide le client à comprendre ce qui s’est passé et à corriger sa requête. Évitez donc les messages vagues comme ```"Error"``` ou ```"Something went wrong"```. Privilégiez des messages précis, par exemple : ```"Le champ 'name' est obligatoire"``` ou ```"Accès refusé : rôle insuffisant"``` :
```js
app.post('/pokemon', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "Le champ 'name' est obligatoire" });
  }
  const newPokemon = createPokemon(req.body);
  res.status(201).json(newPokemon);
});
```

## Stratégies de gestion des exceptions

Pour éviter que l’application s’**arrête brutalement**, on utilise des **middlewares d’erreur** dans Express :
```js
// Middleware global de gestion des erreurs
app.use((err, req, res, next) => {
  console.error('Erreur détectée :', err.stack); // journalisation dans le serveur
  res.status(500).json({ error: 'Erreur interne du serveur' });
});

// Exemple d'utilisation dans une route
app.get('/crash', (req, res) => {
  throw new Error('Problème inattendu !');
});
```
Si tu appelles ```/crash```, la route lance une erreur, mais **l’application ne plante pas**.

**Try/catch** : lorsqu’on utilise du code **asynchrone** (promises ou ```async/await```), il faut **attraper les exceptions avec try/catch** pour ne pas casser le serveur :
```js
app.get('/pokemon/:id', async (req, res, next) => {
  try {
    const pokemon = await getPokemonByIdAsync(req.params.id); // fonction fictive async
    if (!pokemon) {
      return res.status(404).json({ error: 'Pokémon non trouvé' });
    }
    res.json(pokemon);
  } catch (err) {
    next(err); // on transmet l'erreur au middleware global
  }
});
```
Cela permet de gérer des erreurs locales et de **passer l’erreur au middleware global** avec ```next(err)```.

*Propagation des erreurs* : **laisser les erreurs remonter jusqu’au middleware global** pour centraliser la gestion :
```js
app.get('/danger', (req, res, next) => {
  doSomethingRisky()
    .then(result => res.json(result))
    .catch(next); // on passe directement l'erreur au middleware global
});
```
Ici, ```.catch(next)``` permet de **propager automatiquement** toutes les erreurs à l’endroit centralisé, sans dupliquer la gestion des erreurs dans chaque route.

**Validation des données** : avant de traiter les données côté serveur, on **valide la requête** pour éviter des exceptions plus loin :
```js
app.post('/pokemon', (req, res, next) => {
  const { name, type } = req.body;
  if (!name || !type) {
    return res.status(400).json({ error: "Les champs 'name' et 'type' sont obligatoires" });
  }
  // ici on peut appeler la logique métier en toute sécurité
  try {
    const newPokemon = createPokemon({ name, type }); 
    res.status(201).json(newPokemon);
  } catch (err) {
    next(err);
  }
});
```
Les **erreurs de validation** sont renvoyées directement au client avec un code ```400```. Les erreurs imprévues (dans ```createPokemon```) sont transmises au middleware global.

## Bonnes pratiques

- Toujours **utiliser le code HTTP approprié**.
- Fournir des **messages d’erreur précis et compréhensibles**.
- Séparer la **gestion des erreurs métier** de la **gestion des erreurs serveur**.
- **Journaliser toutes les erreurs** pour faciliter le suivi et le debug.
- Pour les API publiques, **éviter de révéler des informations sensibles** dans les messages d’erreur.

## Pratique

Un peu de pratique, ça fera du bien ! Direction le fichier 
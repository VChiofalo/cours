# Optimisation des performances de communication : gestion du cache et compression

Lorsqu’un frontend communique avec une API, la **rapidité** et l’**efficacité des échanges** sont cruciales. Même si l’API fonctionne correctement, des requêtes fréquentes ou volumineuses peuvent ralentir l’application et surcharger le serveur. Pour résoudre ce problème, deux techniques principales sont utilisées : la **gestion du cache** et la **compression des données**.

L’objectif est simple : **réduire la quantité de données transmises et minimiser le nombre de requêtes inutiles**, tout en conservant la fraîcheur et la fiabilité des informations. Cela améliore l’expérience utilisateur et allège la charge serveur.

## Gestion du cache

Le **cache** permet de stocker temporairement des réponses de l’API côté client ou serveur afin de **réutiliser des données déjà récupérées**.
- **Cache côté client** : le navigateur peut stocker des réponses pour éviter de refaire une requête identique.
- **Cache côté serveur** : le serveur garde en mémoire certaines réponses pour ne pas recalculer ou relire la base de données à chaque requête.

Exemple d’en-têtes HTTP pour gérer le cache côté client :
```http
Cache-Control: public, max-age=3600
```
Ici : 
- ```public``` : la réponse peut être mise en cache par tout intermédiaire (proxy, navigateur).
- ```max-age=3600``` : la réponse est considérée comme fraîche pendant 3600 secondes (1 heure).

En Node.js avec Express, on peut ajouter ces en-têtes pour des routes spécifiques :
```js
app.get('/pokemon/:id', (req, res) => {
  res.set('Cache-Control', 'public, max-age=3600');
  res.json(getPokemon(req.params.id));
});
```
Cette technique réduit le nombre de requêtes répétitives et accélère la récupération des données pour les utilisateurs.

## Compression des données

Même avec un cache, certaines réponses peuvent être volumineuses, par exemple des listes de Pokémon ou des détails de jeu. La **compression** réduit la taille des données envoyées par le serveur, ce qui accélère le transfert sur le réseau.

En Node.js, Express propose le middleware ```compression``` :
```js
const compression = require('compression');
app.use(compression());
```
Les réponses JSON, HTML ou CSS sont automatiquement compressées (**gzip** ou **Brotli**). Les fichiers envoyés sont beaucoup plus petits, ce qui diminue le temps de téléchargement et la consommation de bande passante.

## Bonnes pratiques combinées

Pour maximiser les performances :
- **Mettre en cache les données statiques ou peu changeantes** pour éviter les requêtes répétitives.
- **Compresser toutes les réponses volumineuses** afin de réduire le temps de transfert.
- **Limiter le volume des réponses** avec la pagination, le filtrage et la sélection des champs nécessaires (comme nous l’avons vu pour REST et GraphQL).
- **Combiner cache et compression** pour un gain de rapidité optimal et une expérience utilisateur fluide.

Dans un Pokédex, on pourrait mettre en cache la liste des 151 premiers Pokémon pendant une heure et compresser les réponses JSON de la liste complète pour accélérer le chargement côté frontend.

---

© Vincent Chiofalo
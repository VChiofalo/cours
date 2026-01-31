# Analyse et manipulation d’une API REST

Quelques petits exercices afin d'analyser et manipuler une API REST.
Répondez en dessous des questions et appelez moi quand vous avez fini ;)

## Découverte des ressources

Accédez à l’endpoint suivant : https://pokeapi.co/api/v2/pokemon/1

1. Identifiez :
- l'**URI** : ```/api/v2/pokemon/1```
- la **ressource manipulée** : Le Pokémon ayant l’identifiant 1, c’est-à-dire Bulbasaur.
- la **méthode HTTP utilisée** : GET (récupération de données, sans modification côté serveur)

2. Observez la structure de la réponse JSON.

### Questions :
- La réponse est-elle lisible ?
**Réponse** : Oui. Le format JSON est bien structuré, hiérarchisé et indenté, ce qui facilite la lecture et l’exploitation des données.
- Les noms de champs sont-ils explicites ?
**Réponse** : Oui. Les champs comme name, types, abilities, stats ou sprites sont clairs et compréhensibles sans explication supplémentaire.

## Codes de réponse HTTP

Testez une ressource inexistante : https://pokeapi.co/api/v2/pokemon/99999
Ouvrez les **DevTools du navigateur**, onglet **Network**.

1. Repérez :
- le **code HTTP** : 404
- le **type d’erreur retournée** : Not Found (la ressource demandée n’existe pas)

### Question :
- Le code HTTP est-il cohérent avec la situation ?
**Réponse** : Oui. Le code 404 indique correctement que la ressource demandée n’existe pas, ce qui respecte les conventions HTTP et les bonnes pratiques REST.

## Liste, pagination et volume de données

Accédez à : https://pokeapi.co/api/v2/pokemon

1. Identifiez :
- le **nombre d’éléments retournés** : 20 Pokémon
- les paramètres ```limit``` et ```offset``` :
    - limit : nombre de ressources retournées
    - offset : point de départ dans la list

2. Modifiez l’URL pour obtenir :
- 10 Pokémon : https://pokeapi.co/api/v2/pokemon?limit=10
- la page suivante : https://pokeapi.co/api/v2/pokemon?limit=10&offset=10

**URL** :

### Questions :
- Pourquoi la pagination est-elle importante ?
**Réponse** : Elle permet de limiter la quantité de données transférées, d’améliorer les performances et d’éviter de surcharger le serveur ou le client.
- Que se passerait-il sans cette limitation ?
**Réponse** : Le serveur pourrait renvoyer des volumes de données très importants, entraînant des temps de chargement longs, une consommation excessive de ressources et une mauvaise expérience utilisateur.

## Relations entre ressources

Depuis un Pokémon, récupérez l’URL de son **type** ou de son **habitat**.

1. Appelez cet endpoint.
Le champ types contient une URL comme : https://pokeapi.co/api/v2/type/12/

2. Observez comment l’API relie ses ressources.

### Question :
- En quoi cette approche respecte-t-elle le principe REST des ressources liées ?
**Réponse** : Chaque ressource est accessible via une URI unique et reliée aux autres par des liens explicites. Cela favorise la navigation entre ressources et respecte le principe REST de découplage et de découverte progressive des données.

## Analyse des bonnes pratiques

À partir de vos observations, répondez aux questions suivantes :

1. Les URIs sont-elles claires et prévisibles ?
**Réponse** : Oui. Les URIs sont basées sur des noms de ressources explicites (```/pokemon```, ```/type```, ```/ability```) et suivent une structure logique et cohérente

2. Les méthodes HTTP sont-elles correctement utilisées ?
**Réponse** : Oui. Les requêtes observées utilisent ```GET``` uniquement pour la consultation des données, sans effet de bord, conformément aux bonnes pratiques REST.

3. Les erreurs sont-elles explicites ?
**Réponse** : Oui. Les codes HTTP (```200```, ```404```) sont cohérents et permettent au client de comprendre rapidement la nature du problème.

4. L’API semble-t-elle facile à comprendre sans documentation ?
**Réponse** : Oui. Grâce à la clarté des URIs, des noms de champs et à la structure des réponses, il est possible de comprendre et d’exploiter l’API sans documentation détaillée.
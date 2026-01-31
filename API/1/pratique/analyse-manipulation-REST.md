# Analyse et manipulation d’une API REST

Quelques petits exercices afin d'analyser et manipuler une API REST.
Répondez en dessous des questions et appelez moi quand vous avez fini ;)

## Découverte des ressources

Accédez à l’endpoint suivant : https://pokeapi.co/api/v2/pokemon/1

1. Identifiez :
- l'**URI** :
- la **ressource manipulée** : 
- la **méthode HTTP utilisée** :

2. Observez la structure de la réponse JSON.

### Questions :
- La réponse est-elle lisible ?
**Réponse** :
- Les noms de champs sont-ils explicites ?
**Réponse** : 

## Codes de réponse HTTP

Testez une ressource inexistante : https://pokeapi.co/api/v2/pokemon/99999
Ouvrez les **DevTools du navigateur**, onglet **Network**.

1. Repérez :
- le **code HTTP** : 
- le **type d’erreur retournée** :

### Question :
- Le code HTTP est-il cohérent avec la situation ?
**Réponse** : 

## Liste, pagination et volume de données

Accédez à : https://pokeapi.co/api/v2/pokemon

1. Identifiez :
- le **nombre d’éléments retournés** :
- les paramètres ```limit``` et ```offset``` :

2. Modifiez l’URL pour obtenir :
- 10 Pokémon
- la page suivante

**URL** :

### Questions :
- Pourquoi la pagination est-elle importante ?
**Réponse** :
- Que se passerait-il sans cette limitation ?
**Réponse** :

## Relations entre ressources

Depuis un Pokémon, récupérez l’URL de son **type** ou de son **habitat**.

1. Appelez cet endpoint.

2. Observez comment l’API relie ses ressources.

### Question :
- En quoi cette approche respecte-t-elle le principe REST des ressources liées ?
**Réponse** :

## Analyse des bonnes pratiques

À partir de vos observations, répondez aux questions suivantes :

1. Les URIs sont-elles claires et prévisibles ?
**Réponse** :

2. Les méthodes HTTP sont-elles correctement utilisées ?
**Réponse** :

3. Les erreurs sont-elles explicites ?
**Réponse** :

4. L’API semble-t-elle facile à comprendre sans documentation ?
**Réponse** :
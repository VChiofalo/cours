# Utilisation de frameworks pour le développement d’AP

Vous avez appris à reconnaitre des endpoints, gérer la recherche, le tri et la pagination. Mais **comment construire une API REST vous-même** ? Pour cela, il est pratique d’utiliser un framework adapté au langage de programmation choisi.

Les frameworks offrent des outils et des conventions qui simplifient la création, le déploiement et la maintenance des APIs, tout en respectant les bonnes pratiques REST que nous avons étudiées.

## Les frameworks les plus connus pour créer une API

Le processus de développement d’une API dépend du langage ou de l’outil de programmation utilisé. Nous avons vu les meilleures pratiques de développement pour que vous soyez préparé au mieux une fois que vous plongerez dans un langage. Voici quelques outils et frameworks populaires utilisés par les développeurs :

### Express.js (JavaScript / Node.js)

Express.js est un framework léger pour Node.js. Il est rapide et très flexible, capable de gérer à la fois des applications complètes et des API REST. Son inconvénient est qu'il n’impose pas de conventions strictes, donc la structure de votre API dépend entièrement de vous.
```js
const express = require('express');
const app = express();

app.get('/pokemons', (req, res) => {
  res.json([{ id: 1, name: 'Bulbasaur' }]);
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));
```

### Ruby on Rails (Ruby)

Ruby on Rails est un framework complet basé sur Ruby, réputé pour sa simplicité d’usage initiale grâce à sa "magie". Il permet de générer rapidement des API et applications web et a une large communauté et de nombreuses bibliothèques ("Ruby gems"). Mais la compréhension des mécanismes internes peut être complexe pour les développeurs avancés.

### Django (Python)

Django est le framework web populaire en Python, utilisé par Google, YouTube, Instagram. Django REST Framework (DRF) facilite la création d’API REST de par ses fonctionnalités intégrées : authentification, pagination, permissions, tests. Sa courbe d’apprentissage un peu plus élevée pour les débutants, mais il très performant.
```python
from rest_framework.views import APIView
from rest_framework.response import Response

class PokemonView(APIView):
    def get(self, request):
        return Response([{"id": 1, "name": "Bulbasaur"}])
```

### FastAPI (Python)

FastAPI est le framework moderne basé sur Python, conçu pour créer des API REST rapides, simples et performantes. Il utilise type hints pour valider automatiquement les données et générer une documentation interactive avec Swagger UI. Il est idéal pour les débutants et les projets professionnels grâce à sa simplicité et sa sécurité.
```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/pokemons")
def get_pokemons():
    return [{"id": 1, "name": "Bulbasaur"}]

# Lancer l'API : uvicorn main:app --reload
```

### Spring (Java)

Spring est le framework web pour Java, très populaire dans l’industrie actuellement. Il est utilisé par exemple par Wix, TicketMaster, BillGuard. Il permet de créer des APIs évolutives et performantes. Mais il a l'inconvénient d'être difficile à prendre en main pour les débutants en Java.

### AWS API Gateway

Les services AWS permettant de créer et gérer des API REST sans serveur (serverless). Cela facilite la connection entre l'API et d'autres services AWS. Malheureusement, il faut payer par requête, mais le premier million de requêtes par mois est gratuit.
```arduino
Client → API Gateway → Lambda → Base de données → API Gateway → Client
```

## En résumé

Le choix d’un framework dépend de votre **langage préféré**, de la **taille** et la **complexité de l’application**, et des **fonctionnalités souhaitées**. FastAPI et Django sont parfaits pour Python, Express pour JavaScript, Rails pour Ruby, Spring pour Java. AWS API Gateway est idéal si vous souhaitez une solution serverless et scalable.

---

## Création d'une API

Après avoir appris à consommer des APIs et à comprendre leurs bonnes pratiques, il est temps de passer à l’étape suivante : créer votre propre API REST. Pour les travaux pratiques, nous allons utiliser Node.js et Express.js, une combinaison très répandue dans le monde professionnel. Node.js permet d’exécuter du JavaScript côté serveur, tandis qu’Express.js fournit une couche simple et légère pour gérer les routes, les requêtes HTTP et les réponses. L’objectif n’est pas de tout comprendre immédiatement, mais de poser des bases solides pour construire une API claire, lisible et évolutive.

Express a l’avantage d’être volontairement minimaliste. Il ne fait pas de choix à votre place, ce qui vous oblige à appliquer consciemment les bonnes pratiques REST vues précédemment. Cela en fait un excellent outil pédagogique pour comprendre ce qu’est réellement une API, sans être masqué par trop de « magie ».

### Mise en place de l’environnement Node.js

Avant de créer une API, il est nécessaire de disposer de **Node.js**, qui permet d’exécuter du JavaScript côté serveur. Vous pouvez vérifier son bon fonctionnement en lançant la commande ```node -v``` dans un terminal.. Une fois Node installé, il devient possible d’utiliser ```npm```, le gestionnaire de paquets de Node, pour installer des bibliothèques comme Express.

Dans un nouveau dossier de projet, l’initialisation se fait en une seule commande ```npm init```. Elle permet de créer un fichier ```package.json```, qui décrira votre application, ses dépendances et ses scripts. Ce fichier est central dans tout projet Node.js et servira de point d’entrée à votre API.

### Installation d’Express et création du serveur

Une fois le projet initialisé, vous pouvez installer Express via ```npm``` (**documentation**: https://www.npmjs.com/package/express). Express sera le cœur de votre serveur HTTP. Dans votre dossier de projet, créez un fichier principal, souvent nommé ```index.js```, ```app.js``` ou ```server.js```. Ce fichier représentera le point d’entrée de votre API.

Dans ce fichier, vous commencez par importer Express, puis vous créez une instance d’application. Cette application sera responsable de recevoir les requêtes des clients et d’y répondre. Vous pouvez ensuite définir votre premier endpoint, par exemple un endpoint ```GET``` qui renvoie un simple message JSON. Cela permet de vérifier que le serveur fonctionne correctement.

Par exemple :
```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'API Express opérationnelle' });
});

app.listen(3000, () => {
  console.log('Serveur lancé sur http://localhost:3000');
});
```

Lorsque vous lancez ce fichier avec la commande ```node index.js```, votre API **démarre** et **écoute les requêtes** sur le **port 3000**. En accédant à ```http://localhost:3000``` depuis un navigateur, vous obtenez une réponse JSON. À ce stade, vous venez de créer votre **premier endpoint REST**.

### Comprendre le rôle des routes et des requêtes

Dans Express, une API est construite autour de **routes**, qui correspondent à des endpoints REST. Chaque route est associée à une méthode HTTP comme ```GET```, ```POST```, ```PUT``` ou ```DELETE```. Par exemple, une route ```GET /pokemons``` permettra de récupérer une liste de Pokémon, tandis qu’une route ```GET /pokemons/1``` servira à récupérer un Pokémon précis.

Chaque requête reçue par Express contient des informations importantes, comme les paramètres d’URL, les paramètres de requête ou le corps de la requête. La réponse envoyée par l’API est généralement au format JSON, ce qui est devenu le standard pour les APIs REST modernes.

### Structurer progressivement son API

Au départ, tout peut être écrit dans un seul fichier. Cependant, dès que l’API grandit, il devient nécessaire de structurer le code en **séparant les routes**, la logique métier et les données. Cette séparation améliore la lisibilité, la maintenance et l’évolution de l’API.

Pour les TPs, nous commencerons avec une API simple, puis nous l’enrichirons progressivement, par exemple en ajoutant des routes pour un mini Pokédex, en manipulant des ressources, en gérant des erreurs et en respectant les conventions REST vues en cours

### Tester son API dès le début

Une API ne se teste pas uniquement dans un navigateur. Dès les premières routes, il est recommandé d’utiliser des outils comme **Postman**, **Insomnia** ou même les **DevTools du navigateur** pour envoyer des requêtes HTTP et analyser les réponses. Tester tôt permet de détecter rapidement les erreurs et de mieux comprendre le comportement de l’API.

## Comprendre la structure d’un projet Express.js

Avant d’écrire la moindre ligne de code, il est essentiel de comprendre comment est organisée une API. Un projet bien structuré facilite la lecture du code, la collaboration en équipe et l’évolution de l’application dans le temps. La structure que vous allez utiliser pour ce TP est volontairement simple, mais elle reprend déjà des principes utilisés dans des projets professionnels.

L’arborescence du projet permet de séparer clairement les responsabilités : le point d’entrée de l’application, la logique métier, les routes de l’API, les données et les fichiers destinés au client. Cette séparation rend le projet plus lisible et évite de tout mélanger dans un seul fichier.

```bash
roguelite-api/
├── index.js
├── app.js
├── data/
│   └── store.js
├── routes/
│   ├── players.routes.js
│   └── games.routes.js
├── utils/
│   ├── id.js
│   └── dungeon.js
├── public/
│   ├── index.html
│   └── script.js
└── README.md
```

### Le point d’entrée de l’application

Ici, le fichier ```index.js``` est le **point d’entrée** du projet. C’est lui qui lance réellement le serveur. Il importe l’application Express configurée dans un autre fichier, puis démarre l’écoute sur un port donné. Cette séparation permet de distinguer la **configuration de l’application** du **lancement du serveur**, ce qui est une bonne pratique.

Le fichier ```app.js```, quant à lui, contient la configuration principale d’Express. C’est ici que l’on initialise l’application, que l’on active les middlewares (par exemple pour gérer le JSON ou les fichiers statiques) et que l’on branche les différentes routes de l’API. Ce fichier centralise la logique de configuration sans contenir directement la logique métier.

### Les routes : définir les endpoints de l’API

Le dossier ```routes/``` regroupe l’ensemble des **endpoints REST** de l’application. Chaque fichier correspond à une ressource métier précise. Par exemple, ```players.routes.js``` définit les routes liées aux joueurs, tandis que ```games.routes.js``` gère les routes associées aux parties ou aux sessions de jeu.

Cette organisation permet de respecter les principes REST en regroupant les endpoints par ressource. Elle rend également l’API plus facile à maintenir : lorsqu’une fonctionnalité évolue, il suffit de modifier le fichier concerné sans impacter le reste de l’application.

### Les données de l’application

Le dossier ```data/``` contient la gestion des données utilisées par l’API. Dans ce projet, le fichier ```store.js``` joue le rôle d’un **stockage en mémoire**, simulant une base de données. Cette approche est volontairement simple et adaptée à un TP, tout en permettant de manipuler des ressources, d’ajouter, de lire ou de modifier des données via des endpoints REST.

Dans un projet réel, ce dossier pourrait contenir la configuration d’une base de données ou des modèles de données, mais le principe reste le même : **isoler la gestion des données du reste de l’application**.

### Les utilitaires et la logique transverse

Le dossier ```utils/``` regroupe des fonctions utilitaires utilisées à plusieurs endroits du projet. Le fichier ```id.js``` peut par exemple servir à générer des identifiants uniques, tandis que ```dungeon.js``` peut contenir une logique spécifique liée au jeu, comme la génération de donjons ou d’événements.

Cette séparation permet d’éviter la duplication de code et de garder les routes simples et lisibles. Les routes se concentrent sur la gestion des requêtes HTTP, tandis que la logique plus complexe est déléguée à des fonctions utilitaires.

### Les fichiers publics et le client

Le dossier ```public/``` contient les fichiers accessibles directement par le navigateur. Le fichier ```index.html``` représente une interface cliente minimale, et ```script.js``` contient le code JavaScript exécuté côté client pour interagir avec l’API via des requêtes HTTP.

Cette organisation illustre le principe **client–serveur** : l’API fournit des données et des actions, tandis que le client consomme ces endpoints pour afficher ou manipuler l’information.

### La documentation du projet

Enfin, le fichier ```README.md``` sert de **documentation**. Il explique le rôle du projet, comment l’installer, comment le lancer et quels endpoints sont disponibles. Même dans un TP, documenter une API est une bonne pratique essentielle, car une API est presque toujours destinée à être utilisée par d’autres développeurs.

### Pour finir

Cette organisation n’est pas imposée par Express, mais elle répond à des besoins concrets : **clarté**, **évolutivité** et **maintenabilité**. En comprenant cette structure dès maintenant, vous serez capables de lire, comprendre et améliorer des APIs existantes, mais aussi de concevoir vos propres projets de manière professionnelle.

## Pratique

Il est temps de commencer le TP. Celui-ci ce passera en équipe.+

⚠️⚠️ Appellez moi avant de commencer ! ⚠️⚠️

**Objecif** : 
- Initialiser un projet Express
- Comprendre la structure d’une API REST
- Mettre en place des routes simples

Pour ce faire, allez dans le dossier ```rogue-btc2``` et ouvrez le fichier [API-REST-Rogue.md](../rogue-btc2/API-REST-Rogue.md) et faites la **Partie 0**.
# Documentation de l'API : Swagger et OpenAPI

Documenter une API est une étape **essentielle** dans son développement. Même si une API fonctionne parfaitement, elle n’est utile que si les développeurs ou les équipes clientes comprennent comment l’utiliser. Une documentation claire permet de :
- comprendre rapidement les endpoints disponibles,
- savoir quelles données envoyer et recevoir,
- tester l’API facilement sans avoir à lire le code,
- éviter les erreurs et les incompréhensions.

Deux outils très utilisés dans l’industrie pour créer et maintenir la documentation d’API sont **Swagger** et **OpenAPI**. Ils permettent non seulement de décrire l’API de manière standardisée, mais aussi d’offrir une interface interactive pour tester les endpoints.

## OpenAPI : un standard pour décrire les API

OpenAPI est une **spécification** qui décrit une API REST de façon lisible par les humains et par les machines. Elle permet de détailler :
- les **endpoints** disponibles,
- les **méthodes HTTP** (```GET```, ```POST```, ```PUT```, ```DELETE```, etc.),
- les **paramètres attendus** et leur type,
- les **codes de réponse** possibles,
- les **formats de données** (JSON, XML, etc.),
- la **sécurité** (authentification, tokens, etc.).

Un fichier OpenAPI est généralement écrit en **YAML** ou **JSON**. Exemple pour décrire un endpoint ```/players``` :
```yaml
openapi: 3.0.3
info:
  title: Roguelite API
  version: 1.0.0
paths:
  /players:
    get:
      summary: Récupérer la liste des joueurs
      responses:
        '200':
          description: Liste des joueurs
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    id:
                      type: string
                    name:
                      type: string
```

### Documenter une API avec OpenAPI

#### Installer les outils nécessaires

Pour commencer, vous pouvez utiliser **Swagger UI Express** pour afficher une interface interactive basée sur votre fichier OpenAPI.
Installez les packages suivants dans votre projet :
```bash
npm install swagger-ui-express
```
Vous n’avez pas besoin de ```swagger-jsdoc``` si vous écrivez directement un fichier OpenAPI (```.yaml``` ou ```.json```).

#### Créer un fichier OpenAPI

À la racine du projet, créez un fichier ```openapi.yaml```. Commencez par définir les informations générales de l’API :
```yaml
openapi: 3.0.3
info:
  title: Roguelite API
  version: 1.0.0
  description: API pour gérer les joueurs et les parties du jeu Roguelite
servers:
  - url: http://localhost:3000
    description: Serveur local
paths: {}
```
- ```openapi``` : version de la spécification.
- ```info``` : titre, version et description de l’API.
- ```servers``` : serveurs disponibles pour tester l’API.
- ```paths``` : section où vous ajouterez vos endpoints.

#### Décrire un endpoint

Par exemple, pour récupérer la liste des joueurs (```GET /players```) :
```yaml
paths:
  /players:
    get:
      summary: Récupérer tous les joueurs
      tags:
        - Players
      responses:
        '200':
          description: Liste de tous les joueurs
          content:
            application/json:
              schema:
                type: array
                items:
                  type: object
                  properties:
                    id:
                      type: string
                    name:
                      type: string
```
- ```summary``` : brève description du endpoint.
- ```tags``` : permet de regrouper les endpoints par catégorie.
- ```responses``` : codes HTTP, description et format de la réponse.

#### Décrire un endpoint avec corps de requête

Par exemple, pour créer un joueur (```POST /players```) :
```yaml
  /players:
    post:
      summary: Créer un nouveau joueur
      tags:
        - Players
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              required:
                - name
              properties:
                name:
                  type: string
      responses:
        '201':
          description: Joueur créé avec succès
          content:
            application/json:
              schema:
                type: object
                properties:
                  id:
                    type: string
                  name:
                    type: string
        '400':
          description: Requête invalide
```
- ```requestBody``` : décrit les données envoyées par le client.
- ```responses``` : codes HTTP et exemple de réponse.

#### Intégrer OpenAPI avec Swagger UI

Dans ```app.js```, ```index.js``` ou ```server.js```:
```js
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('js-yaml');

const app = express();

// Lire le fichier YAML
const openApiDocument = yaml.load(fs.readFileSync('./openapi.yaml', 'utf8'));

// Ajouter l’interface Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.listen(3000, () => console.log('Serveur démarré sur http://localhost:3000'));
```
- ```/api-docs``` devient l’interface interactive pour tester l’API.
- Vous pouvez cliquer sur chaque endpoint et envoyer des requêtes directement.

#### Bonnes pratiques

- Documenter **tous les endpoints** et maintenir le fichier OpenAPI à jour.
- Fournir **exemples de corps de requête et de réponse**.
- Utiliser des **tags** pour organiser les endpoints par catégorie.
- Indiquer clairement les **codes HTTP possibles** et leur signification.

#### Utile

https://swagger.io/specification/

## Swagger : interface interactive pour tester l’API

Swagger est un **outil basé sur OpenAPI** qui permet de :
- générer automatiquement une **interface web** interactive,
- tester les endpoints directement depuis le navigateur,
- visualiser les **paramètres** et **réponses**.

Dans un projet Node.js, il suffit souvent d’installer deux packages :
```bash
npm install swagger-ui-express swagger-jsdoc
```

Puis de connecter Swagger à l’application Express :
```js
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Roguelite API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'], // Fichiers à scanner pour la doc
};

const specs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
```
Après cela, en ouvrant http://localhost:3000/api-docs, on obtient une **interface interactive** pour tester tous les endpoints documentés.

### Documenter une API Express avec Swagger

#### Installer les packages nécessaires

Pour commencer, il faut installer **Swagger UI Express** et **Swagger JSDoc** :
```bash
npm install swagger-ui-express swagger-jsdoc
```
- ```swagger-ui-express``` : permet d’afficher une interface interactive dans le navigateur.
- ```swagger-jsdoc``` : lit vos commentaires dans le code et génère le fichier OpenAPI.

#### Créer le fichier de configuration Swagger

Créez un fichier ```swagger.js``` à la racine du projet (ou dans un dossier ```config/```), avec le contenu suivant :
```js
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Roguelite API',
      version: '1.0.0',
      description: 'Documentation de l’API Roguelite',
    },
  },
  apis: ['./routes/*.js'], // Tous les fichiers route où Swagger va chercher les annotations
};

const specs = swaggerJsdoc(options);

function setupSwagger(app) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}

module.exports = setupSwagger;
```
- L’option ```apis``` indique **où Swagger va lire vos commentaires JSDoc** pour générer la documentation.
- ```setupSwagger(app)``` ajoute un **endpoint** ```/api-docs``` qui affichera l’interface interactive.

#### Ajouter Swagger à Express

Dans votre ```app.js```, ```index.js``` ou ```server.js``` :
```js
const express = require('express');
const setupSwagger = require('./swagger');

const app = express();

// Vos middlewares et routes ici
app.use(express.json());

// Configuration Swagger
setupSwagger(app);

module.exports = app;
```
Maintenant, en lançant le serveur et en allant sur http://localhost:3000/api-docs, vous verrez une interface Swagger interactive vide pour le moment.

#### Annoter vos routes pour Swagger

Swagger lit vos **commentaires JSDoc** dans les fichiers de routes. Exemple pour ```players.routes.js``` :
```js
/**
 * @swagger
 * tags:
 *   name: Players
 *   description: Gestion des joueurs
 */

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Récupérer tous les joueurs
 *     tags: [Players]
 *     responses:
 *       200:
 *         description: Liste de tous les joueurs
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   name:
 *                     type: string
 */
router.get('/players', (req, res) => {
  res.json(players);
});
```
- ```@swagger``` : indique que le bloc suivant décrit un endpoint Swagger.
- ```tags``` : permet de regrouper les endpoints par catégorie.
- ```responses``` : décrit le format de réponse et le code HTTP.

#### Tester l’API avec Swagger UI

Lancez votre serveur Express :
```bash
node server.js
```

Ouvrez votre navigateur :
```bash
http://localhost:3000/api-docs
```

Vous verrez votre endpoint ```/players```. Cliquez sur "**Try it out**" pour envoyer une requête et voir la réponse en **temps réel**.

#### Bonnes pratiques

- Documenter **tous les endpoints** avec description, paramètres et réponses.
- Mettre à jour la documentation **à chaque modification** de l’API.
- Utiliser des **tags** pour rendre l’interface plus lisible.
- Fournir des **exemples de corps de requête et de réponse**.

#### Utile

https://swagger.io/docs/

## Pratique

Documentez votre Rogue API avec Swagger ou OpenAPI

---

© Vincent Chiofalo
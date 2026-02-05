# TP – Conception d’une API REST de jeu Rogue-Lite

Dans ce TP, vous allez concevoir et développer une **API REST** en **Node.js avec Express.js** permettant de faire fonctionner un **jeu rogue-lite au tour par tour**.

Le jeu ne nécessite pas de graphismes avancés : **tout passe par des appels HTTP**. Un **front web simple** sera développé pour tester et manipuler l’API.upplémentaire peut être utilisé hors cours pour améliorer le projet

---

## Technologies

- **Node.js** (imposé)
- **Express.js** (imposé)
- Front-end : HTML / CSS / JavaScript (vanilla)
- Stockage des données :

  - en mémoire (variables JavaScript)
  - ou fichier JSON

⚠️ Aucune base de données n’est requise (mais si vous le souhaité, vous pouvez en créer une)

---

## Description du jeu

Le jeu est un **rogue-lite simplifié** :

Le jeu est un **rogue-lite simplifié** :
- Un joueur explore un donjon composé de plusieurs salles.
- Certaines salles contiennent des monstres.
- Le joueur peut :
  - avancer dans le donjon.
  - attaquer un monstre.
- Lorsqu’un monstre est vaincu, un objet peut être récupéré.
- La partie se termine lorsque :
  - le joueur meurt.
  - le donjon est terminé.
- Les administrateurs peuvent :
  - ajouter de nouveaux monstres ou objets.
  - modifier le contenu du jeu via des endpoints sécurisés.

👉 Toutes les actions du jeu doivent passer par l’API.

---

## Ressources principales

Votre API devra au minimum gérer les ressources suivantes :
- **User** (pour authentification, avec rôle ```admin```).
- **Player** (joueur).
- **Game** (partie).
- **Room** (salle).
- **Monster** (monstre).

Vous êtes libres d’**adapter** ou **simplifier** ces ressources tant que la logique REST est respectée.

---

## Partie 0 - Mise en place

### Objectifs

- Initialiser un projet Express.
- Comprendre la structure d’une API REST.

### À réaliser

- Création du serveur Express.
- Commencer à structurer votre projet.

## Partie 1 — Mise en place & joueurs

### Objectifs

- Mettre en place des routes simples.

### À réaliser

- Gestion des joueurs (CRUD partiel).

### Endpoints minimum attendus

```bash
POST   /players
GET    /players
GET    /players/:id
DELETE /players/:id
```

---

## Partie 2 — Partie & donjon

### Objectifs

- Implémenter une logique métier.
- Gérer l’état d’une partie.

### À réaliser

- Création d’une partie pour un joueur.
- Génération d’un donjon simple (ex: 5 salles).
- Gestion de la position du joueur.

### Endpoints attendus

```bash
POST /games
GET  /games/:id
POST /games/:id/move
```

### Règles possibles

- Le joueur ne peut pas avancer s’il est mort.
- Le joueur ne peut pas avancer si un monstre est présent dans la salle.

---

## Parte 3 — Combat

### Objectifs

- Gérer des règles métier.
- Manipuler des états (vivant, mort, victoire…).

### À réaliser

- Système de combat simple.
- Gestion des points de vie.
- Détection de la fin de partie.

### Endpoint attendu

```bash
POST /games/:id/attack
```

### Cas d’erreurs à gérer

- Partie inexistante.
- Joueur déjà mort.
- Aucun monstre dans la salle.

---

## Partie 4 — Panel Admin

### Objectifs

- Comprendre le rôle d’un administrateur.
- Ajouter du contenu au jeu.

### À réaliser

- Création d’endpoints pour les admins.
- Ajout de monstres et objets globaux.


### Endpoints attendus

```bash
POST /admin/monsters
POST /admin/items
```

---

## Partie 5 — Front & finalisation

### Objectifs

- Consommer une API REST.
- Comprendre la séparation front / back.

### À réaliser

- Front-end minimal permettant de :
  - créer un joueur.
  - lancer une partie.
  - avancer.
  - attaquer.
- Utilisation de `fetch`.
- Rédaction d’un README.

---

## Partie 6 — Authentification et rôles

### Objectifs
- Comprendre les concepts de **JWT** et **middleware**.
- Implémenter un contrôle d’accès simple par rôle.

### À réaliser

- Endpoint pour **register** un utilisateur (role ```player``` ou ```admin```).
- Endpoint pour login et récupération du **JWT**.
- Middleware pour protéger certaines routes (ex: ```/admin```).

### Endpoints attendus

```bash
POST /auth/register
POST /auth/login
```

---

## Partie 7 — Documentation

## Objectifs

- Fournir des instructions claires pour l’utilisation de l’API.
- Décrire tous les endpoints disponibles.
- Donner des exemples de requêtes.

## À réaliser

- Fichier ```README.md``` contenant :
  - Présentation du projet.
  - Instructions d’installation et de lancement.
  - Liste des endpoints disponibles.
  - Exemples de requêtes.
  - Explications sur les rôles et endpoints sécurisés.
  - Description de la logique métier.

---

## Bonus

- Classes de personnages.
- Objets avec effets.
- Difficulté variable.
- Sauvegarde en fichier JSON.
- Swagger / OpenAPI.
- Tests automatisés.
- Middleware de validation.

---

## Important

Ce TP **n’est pas un projet de jeu graphique**, mais un **projet de conception d’API REST**.

La priorité est donnée à :

- la conception.
- la cohérence des routes.
- la logique métier.
- la compréhension de REST.
- la sécurisation via JWT et rôles.

## Exercice bonus – Déploiement Docker avec Nginx

```txt
project-root/
├── server.js
├── package.json
├── .env
├── Dockerfile.api
├── Dockerfile.front
├── docker-compose.yml
│
├── nginx/
│   └── default.conf
│
├── public/
│   ├── index.html
│   └── script.js
│
├── routes/
├── controllers/
├── services/
├── repositories/
├── utils/
├── data/
```

### Objectif

Dans ce bonus, vous allez :
- Conteneuriser votre **API Express** et votre **front** avec Docker.
- Utiliser Nginx pour servir le front et faire le reverse proxy vers votre API.

### Prérequis

- Docker et Docker Compose installés.
- Votre projet API/rogue-lite fonctionnel en local.

### Aide

- https://medium.com/@muhammadnaqeeb/dockerizing-a-node-js-and-express-js-app-9cb31cf9139e
- https://nginx.org/en/docs/beginners_guide.html

### Étape 1 — Créer le fichier ```.env```

À la racine du projet, créez un fichier ```.env```. Définissez vos variables d’environnement pour le port API et éventuellement d’autres secrets :
```ini
PORT=3000
JWT_SECRET=supersecret
```

Ces variables seront **utilisées dans votre Dockerfile et dans l’API**.

### Étape 2 — Créer le fichier ```Dockerfile``` pour l’**API**

Nom : ```Dockerfile.api```
Contenu minimal :
```dockerfile
# Dockerfile.api
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

### Étape 3 — Créer le fichier ```Dockerfile``` pour le **front**

Nom : Dockerfile.front
Contenu minimal :
```dockerfile
# Dockerfile.front
FROM nginx:alpine

COPY ./public /usr/share/nginx/html
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
```

### Étape 4 — Créer le fichier **Nginx** ```nginx/default.conf```

Complétez le fichier (les "...") pour servir le front depuis ```/usr/share/nginx/html``` et rediriger toutes les requêtes ```/api``` vers le backend ```api:3000``` (réseau Docker)
```nginx
server {
    listen ...;

    # Front (HTML / JS)
    root ...;
    index ...;

    location / {
        try_files $uri $uri/ ...;
    }

    # API Express
    location /api {
        proxy_pass ...;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

**Explication ligne par ligne**

- ```listen ...;``` : Nginx écoute sur le port HTTP (standard 80)
- ```root ...;``` : **Dossier interne au container Nginx**. C’est là que Docker copie votre ```public/```
- ```location /``` : Important pour votre JS front. Cela permet le refresh **sans erreur 404**.
- ```location /api``` : L'adresse de votre API

### Étape 5 — Créer le docker-compose.yml

Votre compose doit définir :
```yaml
version: "3.9"

services:
  api:
    build:
      context: .
      dockerfile: Dockerfile.api
    container_name: api
    ports:
      - "3000:3000"
    env_file:
      - .env

  front:
    build:
      context: .
      dockerfile: Dockerfile.front
    container_name: front
    ports:
      - "8080:80"
    depends_on:
      - api
```
L’API sera accessible à l’intérieur de Docker par le nom ```api``` sur le port 3000.

### Étape 6 — Lancer le projet

```bash
docker-compose up --build
```
Accédez au front : ```http://localhost:8080```. L’API doit être accessible via **/api**

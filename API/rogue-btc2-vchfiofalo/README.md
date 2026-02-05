# Rogue-API

API REST pour un mini-jeu de type roguelike développé en Node.js.
Elle permet de gérer des joueurs, des parties, un donjon composé de rooms et de monstres, ainsi qu’un accès administrateur.

---

## Fonctionnalités

### Joueurs

- Création d’un joueur
- Récupération des joueurs
- Chaque joueur possède :
    - un nom
    - des points de vie (HP)
    - un identifiant unique

### Parties

- Création d’une partie liée à un joueur
- Génération automatique d’un donjon (rooms + monstres)
- Déplacement entre les rooms
- Combat contre les monstres
- Gestion de la fin de partie :
    - playing
    - win
    - lost

### Admin

- Register admin
- Login admin
- Accès aux routes d’administration
- Un admin n’a pas besoin d’être connecté pour jouer

---

## Architecture du projet

```pgsql
project-root/
├── server.js
├── routes/
│   ├── auth.routes.js
│   ├── players.routes.js
│   ├── games.routes.js
│   └── admin.routes.js
├── controllers/
│   ├── auth.controller.js
│   ├── players.controller.js
│   ├── games.controller.js
│   └── admin.controller.js
├── services/
│   ├── auth.service.js
│   ├── players.service.js
│   └── games.service.js
├── repositories/
│   ├── player.repo.js
│   ├── game.repo.js
│   └── monster.repo.js
├── utils/
│   ├── generateId.js
│   ├── dungeon.js
│   └── jwt.js
├── data/
│   └── store.js
└── public/
    ├── index.html
    └── script.js
```

---

## Installation

### Prérequis

- Node.js
- npm

### Installation des dépendances

```bash
npm install
```

### Variables d’environnement

Créer un fichier ```.env``` à la racine à partir du ```.env.example```.

## Lancer le serveur

```bash
npm start
```

Le serveur démarre sur : http://localhost:3000

---

## Authentification

### Admin – Register

```bash
POST /admin/register
```

```json
{
  "username": "admin",
  "password": "password"
}
```

### Admin – Login

```bash
POST /admin/login
```
Retourne un token JWT.

---

## Joueurs

### Créer un joueur

```bash
POST /players
```

```json
{
  "name": "Hero"
}
```

### Liste des joueurs

```bash
GET /players
```

---

## Parties

### Créer une partie

```bash
POST /games
```

```json
{
  "playerId": "player_id"
}
```

### Déplacer le joueur

```bash
POST /games/:gameId/move
```

```json
{
  "direction": "next"
}
```

⚠️ Impossible de se déplacer s’il reste des monstres dans la room actuelle. ⚠️

### Attaquer un monstre

```bash
POST /games/:gameId/attack
```

### Récupérer l’état d’une partie

```bash
GET /games/:gameId
```

```json
{
  "status": "playing",
  "player": {
    "name": "Hero",
    "hp": 80
  },
  "currentRoom": 2
}
```

---

## Fin de partie

Lorsque :
- le joueur n’a plus de HP → ```lost```
- toutes les rooms sont nettoyées → ```win```

Le **front doit afficher une alerte**, puis **recharger la page** pour recommencer une partie.
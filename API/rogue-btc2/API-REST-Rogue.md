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

- Un joueur explore un donjon composé de plusieurs salles
- Certaines salles contiennent des monstres
- Le joueur peut :

  - avancer dans le donjon
  - attaquer un monstre
- Lorsqu’un monstre est vaincu, un objet peut être récupéré
- La partie se termine lorsque :

  - le joueur meurt
  - ou le donjon est terminé

👉 Toutes les actions du jeu doivent passer par l’API.

---

## Ressources principales

Votre API devra au minimum gérer les ressources suivantes :

- **Player** (joueur)
- **Game** (partie)
- **Room** (salle)
- **Monster** (monstre)
- **Item** (objet)

Vous êtes libres d’adapter ou simplifier ces ressources tant que la logique REST est respectée.

---

## Partie 0 - Mise en place

### Objectifs
- Initialiser un projet Express
- Comprendre la structure d’une API REST

### À réaliser

- Création du serveur Express

## Partie 1 — Mise en place & joueurs

### Objectifs
- Mettre en place des routes simples

### À réaliser

- Gestion des joueurs (CRUD partiel)

### Endpoints minimum attendus

```
POST   /players
GET    /players
GET    /players/:id
DELETE /players/:id
```

---

## Partie 2 — Partie & donjon

### Objectifs

- Implémenter une logique métier
- Gérer l’état d’une partie

### À réaliser

- Création d’une partie pour un joueur
- Génération d’un donjon simple (ex: 5 salles)
- Gestion de la position du joueur

### Endpoints attendus

```
POST /games
GET  /games/:id
POST /games/:id/move
```

### Règles possibles

- Le joueur ne peut pas avancer s’il est mort
- Le joueur ne peut pas avancer si un monstre est présent dans la salle

---

## Parte 3 — Combat

### Objectifs

- Gérer des règles métier
- Manipuler des états (vivant, mort, victoire…)

### À réaliser

- Système de combat simple
- Gestion des points de vie
- Détection de la fin de partie

### Endpoint attendu

```
POST /games/:id/attack
```

### ⚠️ Cas d’erreurs à gérer

- Partie inexistante
- Joueur déjà mort
- Aucun monstre dans la salle

---

## Partie 4 — Front & finalisation

### Objectifs

- Consommer une API REST
- Comprendre la séparation front / back

### À réaliser

- Front-end minimal permettant de :

  - créer un joueur
  - lancer une partie
  - avancer
  - attaquer
- Utilisation de `fetch`
- Rédaction d’un README

---

## Documentation attendue

Un fichier `README.md` devra contenir :

- Présentation du projet
- Instructions d’installation et de lancement
- Liste des endpoints disponibles
- Exemples de requêtes

---

## Bonus

- Classes de personnages
- Objets avec effets
- Difficulté variable
- Sauvegarde en fichier JSON
- Swagger / OpenAPI
- Tests automatisés
- Middleware de validation

---

## Important

Ce TP **n’est pas un projet de jeu graphique**, mais un **projet de conception d’API REST**.

La priorité est donnée à :

- la conception
- la cohérence des routes
- la logique métier
- la compréhension de REST

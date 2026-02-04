# Sécurisation des communications frontend-backend

Dans une application web moderne, **le frontend et le backend échangent constamment des données sensibles**, qu’il s’agisse d’informations personnelles, de scores, de paiements ou de configurations. Il est donc essentiel de **protéger ces échanges contre les interceptions et les manipulations**, et de s’assurer que seuls les clients autorisés peuvent accéder aux ressources de l’API.

La sécurisation ne concerne pas uniquement le chiffrement (HTTPS), mais aussi l’**authentification**, **la gestion des sessions et des tokens**, **ainsi que la limitation d’accès aux endpoints**. Comprendre ces principes permet de construire des applications fiables et dignes de confiance pour les utilisateurs.

## HTTPS et chiffrement des données

Pour sécuriser les communications, il est indispensable d’utiliser **HTTPS** (HyperText Transfer Protocol Secure) plutôt que HTTP. HTTPS chiffre les données transmises entre le client et le serveur, empêchant ainsi les attaques de type interception (man-in-the-middle).

En Node.js avec Express, il est possible d’activer HTTPS en utilisant un certificat SSL/TLS :
```js
const fs = require('fs');
const https = require('https');
const app = require('./app');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, app).listen(443, () => {
  console.log('Serveur HTTPS en écoute sur le port 443');
});
```
Cette pratique garantit que les données sensibles, comme les mots de passe ou les tokens, ne peuvent pas être interceptées facilement.

## Authentification et autorisation

L’**authentification** permet de vérifier l’identité d’un utilisateur, tandis que l’autorisation définit ce qu’il est autorisé à faire. Une technique très répandue consiste à utiliser des **JSON Web Tokens** (**JWT**) :
```js
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Token manquant' });

  jwt.verify(token, 'secretKey', (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token invalide' });
    req.user = decoded;
    next();
  });
}
```
Grâce à ce middleware Express.js, chaque requête vers un endpoint protégé peut vérifier l’identité du client avant de renvoyer des données.

## Gestion des sessions et cookies sécurisés

Certaines applications utilisent des **sessions** pour suivre les utilisateurs côté serveur. Les cookies peuvent stocker l’identifiant de session, mais ils doivent être protégés :
- `**HttpOnly**` : empêche l’accès au cookie via JavaScript.
- **Secure** : le cookie n’est envoyé qu’en HTTPS.
- **SameSite** : limite l’envoi du cookie aux requêtes provenant du même site, réduisant le risque CSRF.

Exemple Express avec ```express-session``` :
```js
const session = require('express-session');

app.use(session({
  secret: 'monSecret',
  resave: false,
  saveUninitialized: true,
  cookie: { httpOnly: true, secure: true, sameSite: 'strict' }
}));
```
Cela permet de sécuriser les sessions tout en gardant une expérience utilisateur fluide.

## CORS (Cross-Origin Resource Sharing)

Le CORS contrôle quels domaines peuvent accéder à votre API depuis un navigateur. Sans configuration, les navigateurs bloquent par défaut les requêtes cross-origin.
```js
const cors = require('cors');

app.use(cors({
  origin: 'https://monfrontend.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
```
Avec Express, cette configuration autorise uniquement votre frontend à communiquer avec l’API, limitant les risques d’utilisation malveillante.

## Limiter les accès et protéger les endpoints

Pour sécuriser les endpoints, on peut utiliser plusieurs techniques :
- **Rôles et permissions** : par exemple, seuls les administrateurs peuvent supprimer un joueur.
- **Rate limiting** : limiter le nombre de requêtes pour prévenir les attaques par force brute.
- **Validation côté serveur** : vérifier les données reçues pour éviter les injections SQL ou XSS.

Par exemple :
```js
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // 100 requêtes par IP
});

app.use(limiter);
```
Ici, avec Express, on limite, par IP, à 100 requêtes toutes les 15 minutes.

## Pratique

**Objecif** : 
- Mettre en place des routes simples

Pour ce faire, allez dans le dossier ```rogue-btc2``` et ouvrez le fichier [API-REST-Rogue.md](../rogue-btc2/API-REST-Rogue.md) et faites les **Partie 4** à **5**.

---

© Vincent Chiofalo
# Sécurisation des endpoints : authentification, autorisation et gestion des rôles

Dans une API, certaines routes doivent être **protégées** pour éviter que des utilisateurs non autorisés accèdent à des données sensibles ou effectuent des actions critiques. La **sécurisation des endpoints** repose principalement sur deux concepts :
- **Authentification** : vérifier l’identité d’un utilisateur ou d’une application.
- **Autorisation** : contrôler ce que l’utilisateur authentifié est autorisé à faire.

La gestion des rôles complète ces mécanismes en définissant différents niveaux d’accès pour différents types d’utilisateurs.

## Authentification

L’authentification consiste à **identifier un utilisateur** ou une application avant de lui permettre d’accéder à certaines routes.

### Méthodes courantes :
- **Login / mot de passe** : classique pour les applications web et mobiles.
- **Token JWT (JSON Web Token)** : un jeton signé qui contient les informations de l’utilisateur. Il est envoyé avec chaque requête pour prouver l’identité.
- **OAuth2** : utilisé pour autoriser l’accès à des ressources entre applications, sans partager le mot de passe.

Par exemple :
```js
const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Ici, on vérifie le mot de passe dans la base
  if (username === 'admin' && password === 'secret') {
    const token = jwt.sign({ username, role: 'admin' }, 'SECRET_KEY', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Identifiants invalides' });
  }
});
```

## Autorisation

L’autorisation détermine **ce que l’utilisateur peut faire** après s’être authentifié. Même si un utilisateur est connecté, **il ne doit pas pouvoir accéder à toutes les ressources**. On utilise souvent des **middlewares** pour vérifier le rôle ou les permissions avant de traiter la requête :
```js
function authorizeRole(role) {
  return (req, res, next) => {
    const user = req.user; // récupéré depuis le JWT
    if (user.role !== role) {
      return res.status(403).json({ message: 'Accès refusé' });
    }
    next();
  };
}

// Usage sur une route
app.delete('/users/:id', authenticateJWT, authorizeRole('admin'), (req, res) => {
  // Suppression d’un utilisateur
  res.json({ message: 'Utilisateur supprimé' });
});
```

## Gestion des rôles

La gestion des rôles permet de définir différents **niveaux d’accès** selon le type d’utilisateur :
- **Admin** : accès complet à toutes les routes et données.
- **Utilisateur** : accès limité à ses propres données.
- **Invité / public** : accès uniquement aux informations publiques.

Cette approche est complémentaire au JWT : le token contient souvent le rôle de l’utilisateur, ce qui permet au middleware d’autorisation de décider si la requête est acceptée.

## Bonnes pratiques

- **Séparer authentification et autorisation** pour plus de clarté.
- **Ne jamais stocker de mots de passe en clair**, toujours hachés (avec Express, on utilisera **bcryptjs**).
- **Limiter la durée de vie des tokens** pour réduire le risque en cas de fuite.
- **Utiliser HTTPS** pour sécuriser la transmission des tokens et données sensibles.
- **Journaliser les accès** pour détecter les tentatives d’intrusion (https://www.twilio.com/fr-fr/blog/guide-journalisation-node-js).

---

© Vincent Chiofalo
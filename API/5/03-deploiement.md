# Déploiement sur une plateforme cloud simple (exemple : Render / Railway)

Des plateformes comme **Render**, **Railway** ou **Fly.io** sont idéales dans le cadre du cours, car elles ne nécessitent presque aucune configuration serveur.

Le déroulé est généralement le suivant :
- Vous commencez par pousser votre projet sur un repository Git (GitHub par exemple).
- La plateforme cloud se connecte ensuite à ce repository.

Lors de la création du service, vous indiquez simplement que :
- le projet utilise Docker,
- la branche à déployer (souvent ```main```),
- le port exposé par l’application.

La plateforme détecte automatiquement le ```Dockerfile```, construit l’image, puis lance le conteneur.

En quelques minutes, une URL publique est générée, par exemple : https://roguelite-api.onrender.com

Votre API est alors accessible depuis n’importe quel navigateur ou frontend.

## Gestion des variables d’environnement sur le cloud

Sur le cloud, on **ne fournit jamais de fichier ```.env``` directement.**
À la place, les plateformes proposent une interface pour définir les variables d’environnement.
Par exemple :
- ```PORT```
- ```JWT_SECRET```
- ```NODE_ENV=production```

Ces variables sont injectées automatiquement dans le conteneur et accessibles via ```process.env```, exactement comme en local.

Cela renforce la sécurité et permet de modifier la configuration **sans redéployer le code**.

## Tester l’API déployée

Une fois l’API en ligne, les tests se font exactement comme en local :
- depuis le navigateur pour un ```GET```,
- depuis Postman,
- ou depuis un frontend web.
Exemple :
```bash
GET https://roguelite-api.onrender.com/api/players
```

Si cela fonctionne, cela signifie que :
- le build Docker est correct,
- les routes Express sont bien exposées,
- la communication frontend ↔ API est opérationnelle.

## Ce qu’il faut retenir

Déployer une API aujourd’hui ne signifie plus "configurer un serveur à la main".
Avec Docker et une plateforme cloud moderne, le déploiement devient :
- reproductible,
- sécurisé,
- très proche des pratiques professionnelles.

L’important n’est pas de connaître un cloud précis, mais de comprendre le **cycle complet** :
code → Docker → variables d’environnement → API accessible publiquement.

## Pratique

Déployez votre Rogue API sur un cloud (gratuit) de votre choix

---

© Vincent Chiofalo
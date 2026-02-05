# Déploiement et gestion de l’API en environnement de production

Lorsque l’on développe une API, la faire fonctionner en local n’est qu’une première étape. En production, les enjeux sont différents : il faut pouvoir **déployer facilement, reproduire le même environnement partout, mettre à jour sans tout casser et assurer la stabilité du service**.
C’est précisément pour répondre à ces besoins que les outils de conteneurisation comme **Docker** sont devenus des standards, et que des solutions d’orchestration comme Kubernetes ont émergé pour gérer des applications à grande échelle.

Dans cette partie, nous allons d’abord nous concentrer sur **Docker**, que nous utiliserons concrètement, puis introduire **Kubernetes** comme une notion clé du monde professionnel, sans entrer dans une mise en œuvre complexe.

## Pourquoi conteneuriser une API ?

Une API Express dépend de nombreux éléments : Node.js, des librairies npm, des variables d’environnement, parfois une base de données. Installer et configurer tout cela manuellement sur un serveur est source d’erreurs et de différences entre les environnements.

La conteneurisation permet d’**emballer l’API et tout ce dont elle a besoin dans un conteneur isolé**. Une fois construite, l’API fonctionne exactement de la même manière sur la machine du développeur, sur un serveur de test ou en production.
Cela simplifie le déploiement, réduit les problèmes liés à l’environnement et facilite le travail en équipe.

## Docker : la base du déploiement moderne

Docker permet de créer une image de notre API, qui servira de modèle pour lancer autant de conteneurs que nécessaire. Cette image décrit précisément comment l’application doit être exécutée.

Dans le cas d’une API Express, le principe est simple : on définit une image basée sur Node.js, on y copie le code, on installe les dépendances et on démarre le serveur.

Exemple simple de ```Dockerfile``` pour une API Express :
```dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
```
Ce fichier décrit toutes les étapes nécessaires pour lancer l’API. Une fois l’image construite, l’API peut être démarrée sur n’importe quelle machine disposant de Docker, sans autre configuration.

## Lancer une API avec Docker

Une fois l’image construite, le déploiement devient très simple. Une seule commande suffit pour lancer l’API dans un conteneur.
```bash
docker build -t roguelite-api .
docker run -p 3000:3000 roguelite-api
```
L’API est alors accessible exactement comme en local, mais elle tourne dans un environnement isolé et maîtrisé.
C’est une première approche très concrète du **déploiement en production**, largement utilisée dans les petites et moyennes applications.

## Gestion de la configuration en production

En production, certaines informations ne doivent jamais être écrites en dur dans le code : port, clés secrètes, accès base de données. Docker permet de gérer cela proprement via des **variables d’environnement**.

Dans Express, on les utilise simplement :
```js
const PORT = process.env.PORT || 3000;
```
Et côté Docker :
```bash
docker run -p 3000:3000 -e PORT=3000 roguelite-api
```
Cette approche respecte les bonnes pratiques et permet d’adapter l’API à différents environnements sans modifier le code.

## Gestion de la configuration avec les fichiers ```.env```

Dans une application API, certaines informations **ne doivent jamais être écrites directement dans le code** : clés secrètes, tokens JWT, mots de passe, ports, URL de base de données, etc. Ces valeurs dépendent souvent de l’environnement (développement, test, production) et doivent rester confidentielles.

Pour répondre à ce besoin, on utilise couramment un fichier ```.env```, qui permet de stocker des **variables d’environnement** en dehors du code source.

## Le fichier ```.env```

Le fichier ```.env``` contient des paires clé-valeur représentant la configuration de l’application. Il n’est **pas destiné à être versionné** (il doit être ajouté au ```.gitignore```), car il peut contenir des informations sensibles.

Exemple de fichier ```.env``` pour une API Express :
```env
PORT=3000
JWT_SECRET=super-secret-key
NODE_ENV=development
```

Dans l’application, ces variables sont accessibles via ```process.env``` :
```js
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
```

En pratique, on utilise souvent la librairie ```dotenv``` pour charger automatiquement ces variables au démarrage de l’application :
```js
require('dotenv').config();
```

Cette ligne est généralement placée tout en haut du fichier principal (```index.js``` ou ```app.js```).

## Pourquoi ne pas partager le ```.env``` ?

Partager un fichier ```.env``` revient à **divulguer des secrets**. C’est une erreur fréquente chez les débutants et une très mauvaise pratique en entreprise.

Chaque développeur, chaque serveur et chaque environnement peut avoir son propre fichier ```.env```, avec des valeurs différentes, sans jamais modifier le code de l’API.

## Le fichier ```.env.example```

Pour éviter les erreurs de configuration tout en **ne partageant pas les secrets**, on utilise un fichier ```.env.example``` (ou ```.env.template```).

Ce fichier sert de **modèle** et indique quelles variables sont nécessaires au bon fonctionnement de l’API, sans fournir leurs vraies valeurs.

Exemple de ```.env.example``` :
```env
PORT=
JWT_SECRET=
NODE_ENV=
```

Lorsqu’un développeur clone le projet, il lui suffit de :
1. Copier le fichier ```.env.example```
2. Le renommer en ```.env```
3. Renseigner les valeurs nécessaires

Cette approche améliore énormément la **lisibilité du projet**, la **collaboration en équipe** et la **qualité de la documentation**.

## Lien avec Docker et la production

Les fichiers ```.env``` s’intègrent très bien avec Docker. En production, on peut soit :
- fournir les variables directement via Docker (```-e```),
- soit utiliser un fichier ```.env``` chargé au lancement du conteneur.

Exemple :
```bash
docker run --env-file .env -p 3000:3000 roguelite-api
```
Cela permet de conserver **le même code**, tout en adaptant la configuration à l’environnement d’exécution.

## Limites de Docker seul

Docker est parfaitement adapté pour **déployer une API unique** ou un petit ensemble de services. En revanche, lorsque l’on commence à gérer **plusieurs conteneurs**, à vouloir **redémarrer automatiquement une API en cas de crash**, ou à **scaler** l’application pour gérer beaucoup de trafic, la gestion devient plus complexe.

C’est à ce niveau qu’interviennent des outils d’orchestration.

## Kubernetes : à quoi ça sert ?

Kubernetes n’est pas un remplaçant de Docker, mais un **outil qui pilote Docker à grande échelle**. Il permet notamment de :
- lancer automatiquement plusieurs instances d’une API,
- redémarrer un conteneur qui tombe en erreur,
- répartir le trafic entre plusieurs instances,
- gérer les mises à jour sans interruption de service.

On peut voir Kubernetes comme un **chef d’orchestre** : Docker exécute les conteneurs, Kubernetes décide **quand**, **où** et **combien** en lancer.

Dans le cadre de ce cours, l’objectif n’est pas de savoir configurer Kubernetes, mais de **comprendre son rôle** et de savoir pourquoi il est omniprésent dans les architectures professionnelles modernes.\

## Docker aujourd’hui, Kubernetes demain

Dans un contexte pédagogique et pour vos TP, **Docker est largement suffisant** et correspond parfaitement aux besoins. Il vous permet déjà d’adopter des pratiques professionnelles solides : reproductibilité, isolation, déploiement simplifié.

Kubernetes devient pertinent lorsque l’on travaille sur des applications plus complexes, à forte charge ou déployées sur le cloud. Le fait de comprendre son principe général est un vrai plus, même sans le pratiquer immédiatement.

## Conclusion

Le déploiement d’une API ne se limite pas à “mettre le code en ligne”. Grâce à Docker, il est possible de transformer une API Express en un service **portable**, **fiable** et **facile à déployer**.
Kubernetes, quant à lui, s’inscrit dans la continuité de cette logique et répond à des problématiques de **scalabilité et de résilience** à grande échelle.

En maîtrisant Docker dès maintenant, vous posez des bases solides qui vous permettront, plus tard, d’aborder l’orchestration et le cloud avec beaucoup plus de sérénité.

## Pratique Bonus

Faites la partie bonus de Rogue API.

---

© Vincent Chiofalo
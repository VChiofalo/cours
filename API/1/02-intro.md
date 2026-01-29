# Introduction aux API
![JavaScript](img/api.png){ style="display: block; margin: 0 auto" }

## Qu'est ce qu'une API

Une **API** (*Application Programming Interface*) est un **ensemble de règles et d’outils** qui permet à un logiciel de **communiquer avec un autre logiciel**.

Elle agit comme une **interface** : au lieu d’accéder directement au fonctionnement interne d’un programme, on utilise les fonctions, méthodes ou services qu’il met à disposition.

Une API est généralement fournie par une **bibliothèque logicielle** ou un **service web**, et elle est accompagnée d’une **documentation** qui explique comment l’utiliser.

Grâce aux API, des applications peuvent échanger des données et des fonctionnalités de **manière standardisée et sécurisée**, sans connaître les détails internes des autres applications.

On peut comparer une API à un **serveur dans un restaurant** :
- Le client (l’application consommatrice) ne va pas dans la cuisine.
- Il consulte le menu (la documentation de l’API).
- Il passe sa commande (une requête).
- Le serveur (l’API) transmet la demande à la cuisine (le système interne).
- Le plat est ensuite servi au client (la réponse).

Le client **n’a pas besoin de savoir comment le plat est préparé**, seulement **ce qu’il peut commander et comment le demander**.
C’est exactement le rôle d’une API entre deux logiciels.

```scss
┌──────────────┐        Requête         ┌──────────────┐
│              │ ───────────────────▶  │              │
│  Application │                        │      API     │
│   cliente    │ ◀───────────────────  │ (Interface)  │
│              │        Réponse         │              │
└──────────────┘                        └───────┬──────┘
                                                       
                                                        │
                                                        │ Appel interne
                                                        ▼
                                               ┌──────────────────┐
                                               │                  │
                                               │  Système interne │
                                               │ (base de données)│
                                               │                  │
                                               └──────────────────┘
```
Lecture du schéma
- L’**application cliente** envoie une requête à l’API
- L’**API** reçoit la demande et sert d’**intermédiaire**
- **Le système interne** traite la demande (calculs, base de données…)
- L’API renvoie une **réponse** à l’application cliente

⚠️ L’application cliente ne **communique jamais directement** avec le système interne :
elle passe **obligatoirement** par l’**API**.

On parle d’API lorsqu’un **logiciel cherche à interagir avec un autre système** et que cette interaction se fait de **manière standardisée**, en respectant des **règles d’accès définies** par ce système.
Dans ce cas, on dit que le système tiers **expose une API**.

## Pourquoi les API sont-elles essentielles ?

Dans le développement logiciel moderne, les applications sont rarement construites seules.
Elles sont le plus souvent composées de **briques de fonctionnalités** fournies par d’autres logiciels.

Pour pouvoir utiliser ces fonctionnalités, le développeur doit savoir **comment communiquer avec ces logiciels tiers**.
Cette communication se fait exclusivement via leur **API**.

Le développeur :
- **n’a pas besoin de connaître** le fonctionnement interne du logiciel tiers,
- **n’a accès qu’à ce qui est autorisé** par l’API,
- s’appuie uniquement sur la **documentation de l’API** pour l’utiliser.

L’API est donc **le seul point de contact nécessaire** pour exploiter un système tiers.

De nombreux logiciels fournissent une ou plusieurs API, notamment :
- les systèmes d’exploitation,
- les systèmes de gestion de bases de données,
- les langages de programmation,
- les serveurs d’applications.

**Exemple : API météo**

Imaginons que l'on développe une application mobile qui affiche la météo.
On pourrait **essayer de collecter nous-même toutes les données météorologiques**, mais ce serait long et compliqué. À la place, on peut utiliser une **API météo**, comme celle de OpenWeatherMap ou WeatherAPI.
Voici comment ça fonctionne :
1. Notre application envoie une **requête** à l’API (par exemple : « Quelle est la météo à Paris aujourd’hui ? »).
2. L’API reçoit la demande et va chercher les informations dans son **système interne** (capteurs, bases de données météo, calculs de prévisions).
3. L’API renvoie une **réponse standardisée**, par exemple en JSON :
```JSON
{
  "ville": "Paris",
  "temperature": 12,
  "condition": "Nuageux"
}
```
4. Notre application affiche ces informations **sans jamais toucher directement au système interne de l’API**.

Pour le développeur, l’**API présente plusieurs avantages** : elle **fournit exactement les informations ou services** dont il a besoin, s**ans qu’il ait à connaître la logique interne du système**, et elle permet de **respecter facilement les règles d’accès définies par le fournisseur**.

#### Petit exercice : API ou pas API ?

Pour chaque situation, indiquez si elle implique l’utilisation d’une API ou non (répondez en dessous de chaque lignes).

1. Votre application mobile envoie une requête à OpenWeatherMap pour récupérer la météo.
2. Vous ouvrez un fichier Excel sur ton ordinateur et tapes des formules pour calculer la moyenne d’une colonne.
3. Votre site web récupère des images depuis Unsplash via leur API.
4. Vous appellez un ami pour lui demander son score à un jeu.
5. Votre programme lit directement les données dans une base de données externe via une connexion définie par le fournisseur.

Les API sont donc **essentielles** car elles permettent d’**automatiser des tâches**, d’**intégrer facilement différents systèmes**, d’**accéder à des données et services distants**, d’**améliorer la scalabilité et la sécurité**, et de **favoriser l’innovation**. Elles **réduisent** également **le temps** et **le coût de développement** en permettant aux développeurs de **réutiliser des fonctionnalités existantes** plutôt que de tout créer depuis zéro.

### Automatisation des tâches et processus répétitifs

![Automatisation](img/automatisation.jpg){ style="display: block; margin: 0 auto" }

Les API sont particulièrement utiles pour **automatiser des tâches répétitives** sans intervention humaine. Elles permettent aux systèmes de **communiquer et d’agir automatiquement** selon des conditions définies.

Par exemple, une plateforme d’automatisation marketing peut utiliser des API pour **extraire des données d’analyse depuis plusieurs sources, générer des rapports et envoyer des notifications à l’équipe**, le tout automatiquement. De la même manière, dans le traitement des paiements, les API permettent de **traiter les transactions de façon automatique**, réduisant la charge opérationnelle.

Grâce à cette automatisation, les organisations peuvent **libérer leurs employés de tâches routinières**, améliorer la productivité et réduire les coûts opérationnels.

### Intégration transparente entre systèmes disparates

Les API sont essentielles pour **connecter des systèmes qui fonctionnent autrement de manière isolée**, éliminant ainsi les silos d’information qui freinent de nombreuses organisations. Par exemple, une entreprise peut utiliser plusieurs plateformes cloud qui ne communiquent pas naturellement entre elles. Les API servent de **ponts**, permettant à ces systèmes de **échanger des données de façon fluide et automatique**.

Un exemple concret : un site immobilier peut intégrer des API de plusieurs sources — l’une pour les annonces, une autre pour les taux d’intérêt et une troisième pour les simulateurs de prêt — afin de fournir à l’utilisateur **toutes les informations nécessaires sur une seule interface**, sans qu’il ait à visiter plusieurs sites.

Cette capacité d’intégration est particulièrement importante dans les entreprises où différents services utilisent des systèmes distincts. En facilitant la communication entre ces systèmes via des API, les organisations peuvent **unifier leurs flux de travail, améliorer la collaboration et réduire les erreurs liées à la saisie manuelle**.

### Accès aux données et services distants

![Donnéees](img/data.png){ style="display: block; margin: 0 auto" }

Les API permettent d’**accéder de manière standardisée à des données et services hébergés sur des serveurs distants**, sans avoir à gérer directement ces ressources. Grâce à elles, les entreprises peuvent exploiter des services spécialisés fournis par d’autres sociétés au lieu de tout développer en interne.

Par exemple :
- Les applications météo récupèrent des données en temps réel via des API de services météorologiques.
- Les applications de covoiturage utilisent des API de cartographie pour la navigation.
- Les plateformes e-commerce se connectent à des passerelles de paiement comme Stripe ou PayPal.

Cet accès à des services distants permet aux organisations de se concentrer sur leur **cœur de métier**, tout en s’appuyant sur des prestataires spécialisés pour des fonctionnalités complémentaires. La possibilité d’obtenir des informations en **temps réel** — prix des actions, statuts de vols, actualités ou informations routières — permet également de fournir aux utilisateurs des données **pertinentes et toujours à jour**.

### Scalabilité et architecture modulaire

Les API permettent de construire des systèmes évolutifs et modulaires en divisant les applications complexes en **services plus petits et indépendants**. Chaque service peut être d**éveloppé, déployé et mis à l’échelle séparément**, sans impacter le reste du système.

Par exemple, sur une plateforme e-commerce, si le trafic augmente fortement pendant les soldes, le **service de paiement** peut être mis à l’échelle indépendamment, sans affecter la gestion des stocks ou l’authentification des utilisateurs.

Cette approche **Scalabilité et architecture modulaire

Les API permettent de construire des systèmes évolutifs et modulaires en divisant les applications complexes en services plus petits et indépendants. Chaque service peut être développé, déployé et mis à l’échelle séparément, sans impacter le reste du système.

Par exemple, sur une plateforme e-commerce, si le trafic augmente fortement pendant les soldes, le service de paiement peut être mis à l’échelle indépendamment, sans affecter la gestion des stocks ou l’authentification des utilisateurs.

Cette approche modulaire facilite également la mise à jour ou le remplacement des composants et permet d’ajouter de nouvelles fonctionnalités ou services simplement en intégrant de nouvelles API, plutôt qu’en reconstruisant l’ensemble du système.** facilite également la mise à jour ou le remplacement des composants et permet d’ajouter de nouvelles fonctionnalités ou services simplement en intégrant de nouvelles API, plutôt qu’en reconstruisant l’ensemble du système.

### Sécurité renforcée et contrôle des accès

Les API jouent un rôle central dans la **sécurisation des systèmes** en permettant de contrôler précisément **quelles données et fonctionnalités** sont accessibles aux applications externes.
Plutôt que d’exposer directement un système ou une base de données entière, une API ne rend accessibles que les **éléments strictement nécessaires** à un usage donné. Ce principe, appelé **principe du moindre privilège**, permet de réduire significativement les risques de sécurité.

Les API peuvent intégrer plusieurs **mécanismes de protection**, comme l’authentification (OAuth), l’utilisation de clés API ou de jetons, afin de garantir que **seules les applications autorisées** accèdent aux données ou services. Lors des échanges, des éléments comme les **en-têtes HTTP, les cookies ou les paramètres de requête** contribuent également à renforcer la sécurité.

Enfin, les passerelles d’API, qui agissent comme un **point d’entrée central pour toutes les requêtes**, ajoutent une couche supplémentaire de protection. Elles permettent de **filtrer les requêtes**, de **limiter le nombre d’appels** et de **détecter des comportements suspects** avant même que les données ne soient accessibles.
Ce niveau de contrôle est particulièrement important pour les **données sensibles**, telles que les informations financières, médicales ou les données clients.

## Efficacité des coûts et réduction du temps de développement

Les API permettent de **réduire les coûts de développement** et d’**accélérer la mise sur le marché** en donnant accès à des fonctionnalités déjà existantes, sans avoir à les développer intégralement.
Par exemple, au lieu de créer un système de paiement complet, une application peut simplement intégrer une API comme PayPal ou Stripe. De la même manière, des services d’envoi d’e-mails tels que SendGrid ou Mailgun peuvent être utilisés via leurs API, sans mettre en place une infrastructure dédiée.

Cette approche permet de **gagner du temps**, tout en limitant les risques de bugs et de failles de sécurité, puisque les services utilisés sont **maintenus et sécurisés par des prestataires spécialisés**. Les organisations peuvent ainsi lancer de nouveaux produits ou services plus rapidement.

Les économies ne se limitent pas à la phase de développement : en s’appuyant sur des API tierces, les entreprises évitent également les **coûts de maintenance et de support** liés à la gestion interne de ces fonctionnalités.

### Stimuler l’innovation et créer de nouvelles opportunités

Les API jouent un rôle clé dans l’**innovation numérique** en permettant aux entreprises d’exposer leurs fonctionnalités à des développeurs externes. Ces derniers peuvent alors créer de **nouvelles applications et de nouveaux services** en s’appuyant sur des plateformes existantes. Cela favorise l’émergence de **véritables écosystèmes**, dans lesquels des solutions complémentaires viennent enrichir l’offre initiale.

Un exemple emblématique est celui de **Stripe**, qui a débuté comme une simple API de paiement avant de devenir une entreprise majeure fournissant des services à des milliers d’organisations. De nombreuses grandes entreprises, comme Amazon, Google ou Facebook, ont également bâti des écosystèmes prospères autour de leurs API, permettant à des développeurs tiers d’étendre les usages et les fonctionnalités de leurs plateformes.

Les API ouvertes offrent ainsi un terrain d’expérimentation accessible, sans investissement initial lourd. Ce modèle d’innovation, piloté par les API, permet aux entreprises d’**explorer de nouveaux marchés**, de **développer de nouvelles sources de revenus** et de renforcer durablement leur position dans l’économie numérique.

## Les principales catégories d’API : SOAP, GraphQL et REST

### API SOAP

![API SOAP](img/API-SOAP.png){ style="display: block; margin: 0 auto" }

SOAP (Simple Object Access Protocol) est un **protocole de communication** utilisé pour l’échange d’informations structurées entre applications, notamment dans le cadre des services web. Il est conçu pour faciliter la communication entre systèmes sur un réseau, le plus souvent via des protocoles comme **HTTP** ou **SMTP**.

Les API SOAP permettent à des systèmes hétérogènes de **communiquer de manière standardisée**, en s’appuyant sur un format de données strict, généralement **XML**. Une caractéristique clé de SOAP est l’utilisation de **règles et de conventions précises**, garantissant que les messages échangés sont correctement formatés et interprétés par l’expéditeur comme par le destinataire.

Grâce à sa **robustesse** et à ses mécanismes de **sécurité intégrés**, SOAP est largement utilisé dans les environnements professionnels et les applications d’entreprise, où la **fiabilité**, la **cohérence** et l’**intégrité des données** sont essentielles. Il permet ainsi d’accéder à des services, de récupérer des informations ou d’invoquer des fonctionnalités sur différentes plateformes de manière fiable.

#### Caractéristiques principales des API SOAP

Les API SOAP reposent sur une **forte normalisation**. Le protocole définit des spécifications strictes qui encadrent les échanges, notamment à travers le **WSDL** (**Web Services Description Language**), utilisé pour décrire précisément les services disponibles, leurs points d’accès et les messages échangés.

SOAP accorde également une place importante à la **sécurité**. Il prend en charge des standards comme **WS-Security**, qui permettent d’assurer la confidentialité des données, leur intégrité et l’authentification des applications qui communiquent entre elles.

Une autre caractéristique majeure de SOAP est son extensibilité. Le protocole peut être enrichi par des spécifications complémentaires, telles que **WS-Reliable Messaging**, qui garantit la livraison des messages même en cas de panne logicielle ou matérielle.

Enfin, SOAP est indépendant du protocole de transport. Il peut fonctionner au-dessus de différents mécanismes de communication, comme **HTTP**, **SMTP**, **TCP** ou **JMS**, ce qui le rend adaptable à de nombreux environnements et architectures réseau.

#### Avantages de l’utilisation des API SOAP

Les API SOAP offrent un **haut niveau de sécurité**, ce qui les rend particulièrement adaptées aux **applications d’entreprise** où la protection des données est une priorité. Elles s’appuient notamment sur des protocoles sécurisés comme **SSL**, ainsi que sur des mécanismes de sécurité intégrés au standard SOAP.

SOAP repose également sur des **normes éprouvées et bien définies**, largement utilisées et testées dans de nombreux environnements professionnels. Cette maturité en fait une solution fiable pour des systèmes nécessitant une forte stabilité.

Enfin, les API SOAP utilisent des **contrats formels**, décrits à l’aide du **WSDL**, qui définissent précisément les fonctionnalités disponibles et la manière de les utiliser. Cette approche garantit une **adhésion stricte au contrat de service**, réduisant les risques d’erreurs ou d’incompréhensions entre les systèmes qui communiquent.

#### Inconvénients de l’utilisation des API SOAP

Les API SOAP sont souvent perçues comme **complexes à mettre en œuvre et à maintenir**. Leur forte normalisation implique des messages volumineux, généralement en **XML**, ce qui peut alourdir les échanges et réduire les performances, notamment dans des applications à fort trafic.

SOAP impose également une **rigidité dans la conception des services**. Les contrats formels définis via le **WSDL** rendent les évolutions plus délicates, car toute modification peut nécessiter une mise à jour des clients consommateurs de l’API.

Par ailleurs, la **courbe d’apprentissage** de SOAP est plus élevée que celle d’API plus modernes comme REST. La multiplicité des standards associés (WS-Security, WS-Reliable Messaging, etc.) peut complexifier la prise en main pour les développeurs.

Enfin, SOAP est **moins adapté aux applications web et mobiles modernes**, où la légèreté, la rapidité de développement et les formats simples comme JSON sont privilégiés.

#### Cas pratiques d’utilisation des API SOAP

Les API SOAP sont largement utilisées dans des secteurs où **la sécurité**, **la fiabilité et la précision des échanges** sont essentielles.
- **Services financiers** : Les banques et institutions financières s’appuient sur SOAP pour gérer les transactions, garantissant la sécurité et l’exactitude des opérations.
- **Télécommunications** : SOAP est utilisé pour la gestion de transactions complexes et pour assurer une **messagerie fiable** entre différents composants du réseau.
- **Soins de santé** : Le protocole permet l’échange sécurisé d’informations sensibles sur les patients entre systèmes, où la **confidentialité et la non-répudiation** sont cruciales.
- **API publiques** : De nombreuses interfaces de données publiques ou gouvernementales utilisent SOAP pour fournir des services accessibles sur **diverses plateformes et systèmes d’exploitation**, assurant une compatibilité large et standardisée.

### API GraphQL

![API GraphQL](img/API-GraphQL.png){ style="display: block; margin: 0 auto" }

GraphQL (Graph Query Language) est un **langage de requête** et un **environnement d’exécution côté serveur** destiné aux API. Son objectif principal est de permettre aux clients de **récupérer uniquement les données dont ils ont besoin**, ni plus ni moins.

Conçu pour offrir des API **rapides**, **flexibles** et **simples à utiliser**, GraphQL met à disposition des développeurs des outils facilitant leur travail, comme **GraphiQL**, un environnement interactif permettant de tester et d’explorer les requêtes. En alternative aux API REST, GraphQL permet d’interroger **plusieurs sources de données en une seule requête**, réduisant ainsi le nombre d’appels nécessaires.

GraphQL apporte également une grande **souplesse d’évolution**. Les équipes responsables des API peuvent ajouter ou supprimer des champs sans impacter les requêtes existantes, tandis que les développeurs conservent la liberté de structurer leurs requêtes selon leurs besoins. La **spécification GraphQL** garantit un comportement cohérent et prévisible pour les clients qui consomment l’API.

#### Caractéristiques principales des API GraphQL

Les API GraphQL reposent sur un **langage de requête flexible**, permettant aux clients de spécifier précisément les données dont ils ont besoin. Cela évite la récupération d’informations inutiles et améliore l’efficacité des échanges.

GraphQL s’appuie sur un **schéma fortement typé** qui décrit l’ensemble des données accessibles et leurs relations. Ce schéma sert de contrat clair entre le client et le serveur, facilitant la compréhension, la validation des requêtes et l’évolution de l’API.

Une autre caractéristique clé est la **centralisation des requêtes**. Une seule requête GraphQL peut interroger **plusieurs sources de données** et remplacer plusieurs appels API distincts, ce qui réduit la complexité côté client.

GraphQL offre également une **évolutivité maîtrisée**. Les champs peuvent être ajoutés ou supprimés sans casser les requêtes existantes, ce qui facilite la maintenance et les mises à jour.

Enfin, GraphQL propose un **environnement d’exploration et de test intégré**, comme GraphiQL, permettant aux développeurs de découvrir l’API, tester des requêtes et comprendre rapidement les données disponibles.

#### Avantages de GraphQL

GraphQL repose sur un **schéma centralisé** qui définit une **source unique de vérité** pour l’ensemble des données accessibles. Ce schéma permet aux organisations de **fédérer leurs API** et d’avoir une vision claire et cohérente des données exposées.

Les requêtes GraphQL sont traitées en **un seul aller-retour** entre le client et le serveur. Les applications clientes reçoivent **exactement les données demandées**, sans surcharge inutile, ce qui améliore l’efficacité des échanges.

GraphQL s’appuie sur des **types de données strictement définis**, réduisant les erreurs de communication entre le client et le serveur et renforçant la fiabilité des échanges.

Une autre force de GraphQL est son caractère **introspectif** : les clients peuvent interroger l’API pour découvrir les types de données disponibles. Cette fonctionnalité facilite notamment la **génération automatique de documentation** et l’exploration de l’API.

GraphQL permet également de **faire évoluer une API sans impacter les requêtes existantes**, ce qui simplifie la maintenance et les mises à jour. De plus, il bénéficie d’un **écosystème open source riche**, proposant de nombreuses extensions et fonctionnalités non disponibles dans les API REST traditionnelles.

Enfin, GraphQL n’impose **aucune architecture applicative spécifique**. Il peut être intégré à une API REST existante et fonctionner avec les outils de gestion d’API déjà en place, facilitant ainsi son adoption progressive.

#### Inconvénients de GraphQL

L’adoption de GraphQL nécessite une **courbe d’apprentissage** pour les développeurs habitués aux API REST. Les concepts, la syntaxe des requêtes et la manière de concevoir les API diffèrent de celles des approches traditionnelles.

GraphQL déplace une grande partie du **traitement des requêtes côté serveur**, ce qui peut complexifier le travail des équipes backend. Le serveur doit être capable d’interpréter des requêtes variées et potentiellement complexes, ce qui demande une conception et une optimisation plus poussées.

Selon la manière dont GraphQL est implémenté, les **stratégies de gestion des API** peuvent également différer de celles utilisées avec REST. Des aspects comme la **limitation du nombre de requêtes**, la facturation ou le contrôle de l’usage peuvent être plus difficiles à mettre en œuvre.

La **mise en cache** des réponses est aussi plus complexe qu’avec des API REST classiques, car les requêtes GraphQL sont souvent dynamiques et ne reposent pas sur des URL fixes.

Enfin, la maintenance d’une API GraphQL implique la **gestion d’un schéma supplémentaire**, qui doit être maintenu à jour et cohérent avec les évolutions de l’application, ce qui représente une charge de travail additionnelle pour les équipes.

#### Cas pratiques d’utilisation de GraphQL

Les API GraphQL sont particulièrement adaptées aux contextes où la **flexibilité**, **la performance des échanges** et **l’agrégation de données provenant de sources multiples** sont primordiales.

- **Applications web et mobiles modernes** : GraphQL permet aux clients d’obtenir exactement les données nécessaires en un seul appel, ce qui est idéal pour les interfaces riches et dynamiques, notamment sur mobile où la performance réseau est critique.
- **Plateformes à données distribuées** : Dans les systèmes où les données sont réparties sur plusieurs services ou bases, GraphQL facilite leur agrégation via une requête unique, sans multiplier les appels à différentes API.
- **Produits numériques en évolution rapide** : Les équipes peuvent faire évoluer l’API sans casser les requêtes existantes, ce qui est particulièrement adapté aux environnements agiles et aux cycles de développement courts.
- **Écosystèmes et API publiques orientées développeurs** : GraphQL offre une excellente expérience développeur grâce à l’introspection du schéma et à la documentation auto-générée, favorisant l’adoption et l’innovation autour des plateformes exposées.

### API REST

![API REST](img/API-REST.jpg){ style="display: block; margin: 0 auto" }

Une **API REST** est une interface de programmation qui respecte les principes de l’architecture **REST** (**Representational State Transfer**). On parle également d’**API RESTful** ou d’**API Web RESTful**.
De manière générale, une API permet à **deux applications distinctes de communiquer entre elles**, en échangeant des données de façon structurée et standardisée. Les API sont aujourd’hui indispensables pour assurer l’interopérabilité entre les systèmes informatiques.

Avant les années 2000, les services web reposaient majoritairement sur le protocole **SOAP**, basé sur XML et relativement complexe à mettre en œuvre. Bien que toujours utilisé dans certains contextes, SOAP a progressivement été supplanté par REST, plus **léger**, **flexible** et mieux adapté aux usages du Web moderne.

L’architecture REST a été formalisée en 2000 par **Roy Fielding**, dans le cadre de sa thèse de doctorat. Depuis, elle est devenue le **modèle dominant de conception des API**, notamment pour les applications web, mobiles et les services interactifs. Aujourd’hui, la grande majorité des API exposées sur Internet reposent sur REST.

#### Fonctionnement d’une API REST

Une API REST fonctionne selon un **modèle client–serveur**.

Le **client** (navigateur web, application mobile, logiciel métier…) envoie une requête à l’API, qui la transmet au **serveur**. Ce dernier traite la demande — souvent en interrogeant une base de données — puis renvoie une réponse au client.

Les données échangées via une API REST sont appelées des **ressources**. Chaque ressource est identifiée de manière unique par une **URI** (**Uniform Resource Identifier**).
Par exemple, lors d’une recherche de produits sur un site e-commerce, le client envoie une requête à l’API, le serveur traite cette requête et renvoie la liste des produits correspondants.

Les échanges entre le client et le serveur s’effectuent principalement via le **protocole HTTP**, qui définit plusieurs méthodes standardisées.

#### Principales méthodes HTTP utilisées par les API REST

Les API REST s’appuient sur les méthodes HTTP pour indiquer l’action à effectuer sur une ressource :
- **GET** : récupérer des données depuis le serveur.
- **POST** : envoyer de nouvelles données au serveur (création d’une ressource).
- **PUT** : mettre à jour entièrement une ressource existante.
- **PATCH** : modifier partiellement une ressource.
- **DELETE** : supprimer une ressource.

Ces méthodes permettent de manipuler les ressources de manière claire, cohérente et standardisée.

#### Formats de données utilisés par les API REST

Les API REST peuvent échanger des données sous différents formats.
Le plus courant est le **JSON** (**JavaScript Object Notation**), apprécié pour sa légèreté, sa lisibilité et sa compatibilité avec de nombreux langages de programmation.

D’autres formats peuvent également être utilisés :
- **XML**, adapté aux structures de données complexes et compatible avec certains standards existants ;
- **YAML**, souvent employé pour la configuration ;
- **HTML**, notamment dans des contextes spécifiques.

#### Principes architecturaux des API REST

Une API REST respecte un ensemble de **principes architecturaux** qui garantissent sa simplicité, sa scalabilité et son efficacité. On distingue six principes fondamentaux :
- **Découplage client–serveur** : le client et le serveur évoluent indépendamment. Le client connaît uniquement l’URI des ressources, tandis que le serveur se charge du traitement des données.
- **Interface uniforme** : les ressources sont accessibles et manipulées de manière cohérente, facilitant la compréhension et l’utilisation de l’API.
- **Absence d’état (stateless)** : chaque requête est indépendante et contient toutes les informations nécessaires à son traitement.
- **Mise en cache** : les réponses du serveur peuvent être mises en cache afin d’améliorer les performances et de réduire la charge réseau.
- **Système en couches** : l’architecture peut reposer sur plusieurs niveaux de serveurs (sécurité, répartition de charge, etc.) sans que le client en ait conscience.
- **Code à la demande (optionnel)** : le serveur peut transmettre du code exécutable au client pour étendre ses fonctionnalités.

#### Avantages de l’utilisation des API REST

Les API REST se distinguent avant tout par leur **simplicité de conception et d’utilisation**. Basées sur des standards du Web largement répandus comme HTTP, elles sont faciles à comprendre et à manipuler, aussi bien pour les développeurs débutants que confirmés. Cette simplicité réduit le temps d’apprentissage et accélère la mise en œuvre des projets.

REST offre également une **excellente performance**, notamment grâce à son caractère stateless et à la possibilité de **mettre en cache les réponses**. Les échanges sont légers, en particulier lorsqu’ils utilisent le format JSON, ce qui rend les API REST très adaptées aux applications web et mobiles.

Un autre avantage majeur réside dans la **large compatibilité technologique**. Les API REST peuvent être consommées par pratiquement tous les langages de programmation et tous les types de clients (navigateurs, applications mobiles, objets connectés). Cette universalité en fait un choix privilégié pour exposer des services accessibles à grande échelle.

Enfin, REST favorise la **scalabilité** des systèmes. Le découplage entre le client et le serveur permet de faire évoluer chaque partie indépendamment, ce qui est particulièrement important pour les applications à fort trafic ou en croissance rapide.

#### Désavantages des API REST

Malgré leurs nombreux atouts, les API REST présentent certaines **limitations**.
Tout d’abord, REST peut entraîner des problèmes de **sur- ou sous-récupération des données**. Le client reçoit parfois plus d’informations que nécessaire, ou au contraire doit effectuer plusieurs appels pour obtenir l’ensemble des données souhaitées.

**La gestion des relations complexes entre ressources** peut également devenir difficile. Dans des systèmes riches en données interconnectées, la multiplication des endpoints REST peut complexifier la conception et l’utilisation de l’API.

REST montre aussi ses limites lorsqu’il s’agit de **cas d’usage très dynamiques ou fortement personnalisés**, où les besoins en données varient beaucoup selon les clients. Dans ce type de contexte, des solutions comme GraphQL peuvent s’avérer plus adaptées.

Enfin, bien que REST repose sur HTTP, **il ne définit pas de standard** strict de contrat comparable au WSDL de SOAP. Cela peut conduire à des ambiguïtés si la documentation n’est pas rigoureuse ou correctement maintenue.

#### Cas pratiques d’utilisation des API REST

Les API REST sont aujourd’hui **le choix par défaut** pour de nombreux usages, en particulier dans les environnements Web modernes.
- **Applications web et mobiles** : REST est massivement utilisé pour alimenter les interfaces utilisateur avec des données issues d’un backend (réseaux sociaux, plateformes e-commerce, services de streaming).
- **Services web publics** : de nombreuses plateformes (Google, Twitter, GitHub, OpenWeather, etc.) exposent leurs fonctionnalités via des API REST accessibles à des développeurs tiers.
- **Microservices** : REST est fréquemment utilisé pour permettre la communication entre services indépendants au sein d’une architecture distribuée.
- **Objets connectés (IoT)** : les API REST facilitent l’échange de données entre capteurs, dispositifs connectés et systèmes centraux grâce à leur légèreté et leur compatibilité réseau.
- **Systèmes d’information d’entreprise** : REST est employé pour exposer des services internes ou interfacer des applications hétérogènes de manière simple et standardisée.

## Résumé

| Critère                      | SOAP                                                                 | REST                                            | GraphQL                                                                             |
| ---------------------------- | -------------------------------------------------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------- |
| **Format des messages**      | XML uniquement                                                       | JSON, XML, YAML, HTML                           | JSON principalement                                                                 |
| **Protocole**                | HTTP, SMTP, TCP, JMS                                                 | HTTP                                            | HTTP (peut coexister avec REST)                                                     |
| **Sécurité**                 | Très élevée (WS-Security, SSL)                                       | Bonne, dépend des mécanismes HTTP (OAuth, SSL)  | Bonne, dépend des mécanismes HTTP et de l’implémentation                            |
| **Contrats**                 | WSDL formel                                                          | Pas de contrat strict                           | Schéma fortement typé                                                               |
| **Flexibilité des requêtes** | Faible                                                               | Moyenne                                         | Très élevée : le client choisit les champs                                          |
| **Évolutivité**              | Limitée, évolutions complexes                                        | Moyenne, dépend de la conception                | Très bonne : ajout de champs sans casser les requêtes existantes                    |
| **Courbe d’apprentissage**   | Élevée                                                               | Faible à moyenne                                | Moyenne à élevée pour les développeurs REST                                         |
| **Performance / légèreté**   | Moins performant (messages lourds en XML)                            | Léger et performant                             | Léger, mais requêtes plus complexes côté serveur                                    |
| **Cas d’usage typique**      | Services financiers, télécommunications, santé, API gouvernementales | Applications web et mobiles, microservices, IoT | Applications web modernes, données réparties, API publiques avec requêtes flexibles |

## Pour finir

Les API sont aujourd’hui au **cœur du développement logiciel**, permettant aux applications de communiquer, de réutiliser des fonctionnalités et de fournir des services performants et sécurisés.
- **SOAP** reste le choix privilégié pour les environnements où **la sécurité**, **la fiabilité** et **les contrats formels** sont cruciaux.
- **REST** est largement adopté pour **sa simplicité**, **sa légèreté** et sa compatibilité universelle, particulièrement pour les applications web, mobiles et les microservices.

GraphQL répond aux besoins modernes de flexibilité, d’optimisation des requêtes et de centralisation des données provenant de sources multiples.

Le choix de l’API dépend donc des besoins métiers, des contraintes techniques et du type de données manipulées. Dans tous les cas, comprendre les forces et limites de chaque approche permet de concevoir des systèmes plus efficaces, évolutifs et sécurisés.

---

© Vincent Chiofalo
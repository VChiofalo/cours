# Stratégies de versionnement et de déploiement pour les mises à jour de l’API

Une API n’est jamais figée dans le temps. Elle évolue avec les besoins métiers, l’ajout de nouvelles fonctionnalités, les corrections de bugs ou les améliorations de performance. Le défi principal est de **faire évoluer l’API sans casser les applications clientes existantes**.
Le versionnement et les stratégies de déploiement permettent d’introduire des changements de manière contrôlée, prévisible et professionnelle, tout en garantissant la continuité de service.

## Pourquoi versionner une API ?

Lorsqu’une API est utilisée par plusieurs clients (frontend web, application mobile, services tiers), une modification non maîtrisée peut entraîner des dysfonctionnements immédiats.
Le versionnement permet de :
- conserver la compatibilité avec les anciens clients ;
- introduire des changements majeurs sans risque ;
- gérer plusieurs évolutions en parallèle.

Par exemple, si un endpoint ```/players``` change de structure ou de comportement, les clients existants peuvent continuer à utiliser l’ancienne version pendant que les nouveaux migrent progressivement.

## Versionnement par l’URI

La méthode la plus simple et la plus courante consiste à inclure la version directement dans l’URL :
```bash
/api/v1/players
/api/v2/players
```

Cette approche est très lisible et facile à comprendre pour les développeurs. Chaque version de l’API est clairement identifiée et peut évoluer indépendamment.
Dans un projet Express, cela se traduit souvent par des dossiers ou des routes séparées par version :
```js
app.use('/api/v1/players', playersV1Routes);
app.use('/api/v2/players', playersV2Routes);
```
C’est la stratégie la plus adaptée pour ues APIs publiques.

## Versionnement via les headers HTTP

Une autre approche consiste à transmettre la version via les headers HTTP :
```bash
Accept: application/vnd.roguelite.v1+json
```
Cette méthode est plus discrète et plus “REST pur”, mais elle est aussi moins intuitive pour les débutants. Elle est généralement utilisée dans des APIs d’entreprise ou internes, où les clients sont bien maîtrisés.

Cette stratégie permet de garder des URLs stables, mais nécessite une gestion plus fine côté serveur.

## Gestion des changements : breaking vs non-breaking changes

Tous les changements n’imposent pas un nouveau versionnement.

Un **changement non cassant** (**non-breaking**) inclut par exemple :
- l’ajout d’un nouveau champ dans une réponse JSON ;
- l’ajout d’un nouvel endpoint.

Un **changement cassant** (**breaking change**) inclut :
- la suppression ou le renommage d’un champ existant ;
- un changement de type de donnée ;
- une modification du comportement d’un endpoint.

Seuls les changements cassants doivent entraîner une **nouvelle version majeure** de l’API.

## Déploiement progressif des nouvelles versions

Lorsqu’une nouvelle version de l’API est prête, il est recommandé de la déployer en **parallèle de l’ancienne**.
Cela permet aux clients de migrer à leur rythme, sans interruption de service.

Un scénario classique est :
- maintenir ```v1``` active ;
- déployer ```v2``` ;
- informer les utilisateurs de la dépréciation de ```v1``` ;
- retirer ```v1``` après une période définie.

Cette stratégie est essentielle pour éviter les ruptures brutales.

## Dépréciation et communication

Versionner une API ne suffit pas : il faut aussi **communiquer**.
Les bonnes pratiques incluent :
- indiquer qu’une version est obsolète dans la documentation ;
- ajouter des messages de dépréciation dans les réponses HTTP ;
- définir une date de fin de support claire.

Par exemple :
```yaml
Deprecation: true
Sunset: 2025-06-01
```
Cela aide les développeurs clients à anticiper les changements.

## Déploiement continu et automatisation

Dans un environnement moderne, le déploiement des APIs est souvent automatisé via des pipelines CI/CD.
Les tests automatisés, la validation OpenAPI et les environnements de staging permettent de :
- détecter les régressions avant la mise en production ;
- sécuriser les mises à jour ;
- déployer plus fréquemment et plus sereinement.

Même sans entrer dans le détail des outils, l’idée clé est que le **versionnement** et le **déploiement vont toujours de pair**.

## Pour conclure

Le **versionnement** et le **déploiement** sont des **éléments essentiels du cycle de vie d’une API**. Ils permettent de concilier **évolution technique** et **stabilité fonctionnelle**.
Une API bien versionnée est plus **robuste**, plus **professionnelle** et plus **agréable à utiliser**, tant pour les développeurs backend que pour les consommateurs de l’API.

Avec cette dernière partie, vous avez désormais une vision complète du développement d’API REST : de la conception à la documentation, des tests à la mise en production.

---

© Vincent Chiofalo
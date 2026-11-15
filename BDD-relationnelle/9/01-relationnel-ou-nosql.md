# Ouverture : relationnel ou NoSQL ?

## Avantages et inconvénients des bases de données relationnelles

Vous savez maintenant interroger, concevoir, créer et faire vivre une base relationnelle. Le modèle relationnel est le plus utilisé au monde, mais ce n'est pas le seul. Pour savoir **quand** l'utiliser, il faut connaître ses points forts, ses limites, et les alternatives qui existent : les bases **NoSQL**.

---

### 1. Les avantages

#### 1.1 Des données structurées et cohérentes

Dans une base relationnelle, la structure est définie **avant** d'insérer les données : chaque table a ses colonnes, chaque colonne a son type. Le SGBD **refuse** ce qui ne respecte pas cette structure.

```sql
-- birth_date est de type DATE : MySQL refuse (en mode strict) une date invalide
INSERT INTO student (first_name, last_name, birth_date, city)
VALUES ('Alice', 'Martin', '2003-02-31', 'Paris');
-- Erreur : Incorrect date value: '2003-02-31' for column 'birth_date'
```

On sait donc toujours à quoi s'attendre quand on lit les données.

#### 1.2 L'intégrité des données garantie par le SGBD

Au-delà des types, on peut définir des **contraintes** que le SGBD fera respecter en permanence :

- une colonne obligatoire (`NOT NULL`) ;
- une valeur qui doit être unique (`UNIQUE`), par exemple un email ;
- une clé étrangère qui doit pointer vers une ligne existante.

Exemple avec `scholar` : impossible d'ajouter une note pour un élève qui n'existe pas.

```sql
INSERT INTO note (student_id, subject_id, grade, note_date)
VALUES (999, 1, 15.00, '2026-01-15');
-- Erreur : Cannot add or update a child row: a foreign key constraint fails
```

Ces règles sont vérifiées **par la base elle-même**, quelle que soit l'application qui écrit dedans (site web, phpMyAdmin, script…). Une erreur de programmation ne peut pas casser la cohérence des données.

#### 1.3 Pas de redondance

Comme on l'a vu dès la partie 1, chaque information n'est stockée **qu'à un seul endroit** et les tables sont reliées par des clés. Le nom du département « Informatique » n'existe qu'une fois : le modifier se fait en une seule requête, sans risque d'oubli.

#### 1.4 Des transactions fiables (ACID)

Une **transaction** regroupe plusieurs opérations qui doivent réussir **toutes ensemble** ou **pas du tout**. L'exemple classique est le virement bancaire : on retire 100 € d'un compte et on les ajoute sur un autre. Si une panne survient entre les deux, l'argent ne doit pas disparaître.

Les bases relationnelles garantissent les propriétés **ACID** :

| Propriété | Signification |
|---|---|
| **A**tomicité | Tout ou rien : soit toutes les opérations sont faites, soit aucune |
| **C**ohérence | La base passe d'un état valide à un autre état valide, contraintes respectées |
| **I**solation | Deux transactions simultanées ne se perturbent pas |
| **D**urabilité | Une fois validée, une transaction est conservée, même en cas de panne |

Nous l'avons mis en pratique en partie 7.

#### 1.5 Un langage standard et puissant : SQL

- **Standardisé** : ce que vous apprenez sur MySQL est réutilisable à 90 % sur PostgreSQL, SQL Server ou Oracle.
- **Expressif** : une seule requête peut croiser plusieurs tables, filtrer, regrouper, calculer des moyennes, trier…
- **Flexible** : on peut poser à la base des questions qui n'avaient pas été prévues au moment de sa conception.

```sql
-- Moyenne des notes par département : une question jamais prévue,
-- mais la structure permet d'y répondre
SELECT department.department_name, AVG(note.grade) AS moyenne
FROM note
INNER JOIN subject ON note.subject_id = subject.subject_id
INNER JOIN department ON subject.department_id = department.department_id
GROUP BY department.department_name;
```

#### 1.6 Une technologie mature

Plus de cinquante ans d'existence, cela signifie :

- des SGBD très stables et optimisés ;
- une documentation, des tutoriels et une communauté énormes ;
- des outils partout : phpMyAdmin, MySQL Workbench, DBeaver, extensions VS Code… ;
- une intégration native dans tous les langages (PHP avec PDO, Node avec `mysql2`, Python, Java…) ;
- de nombreux développeurs formés sur le marché du travail.

#### 1.7 Une sécurité fine

Le SGBD permet de créer des utilisateurs et de leur donner des droits précis : lecture seule sur une table, écriture sur une autre, aucun accès à une troisième…

```sql
-- Un compte qui ne peut que lire les élèves
GRANT SELECT ON scholar.student TO 'lecteur'@'localhost';
```

---

### 2. Les inconvénients

#### 2.1 Un schéma rigide

La structure doit être définie **avant** d'insérer des données. Si le besoin évolue (ajouter un réseau social à chaque élève, gérer plusieurs adresses…), il faut **modifier le schéma** (`ALTER TABLE`), parfois créer de nouvelles tables et adapter les requêtes de l'application.

Sur une table de plusieurs millions de lignes, une modification de structure peut être longue et doit être préparée.

#### 2.2 Une conception qui demande de la rigueur

Une base relationnelle bien faite se **conçoit** : il faut analyser les besoins, identifier les entités, les relations, les cardinalités (c'est ce que nous avons fait en partie 4). Une mauvaise conception de départ est coûteuse à corriger ensuite.

#### 2.3 La montée en charge horizontale est difficile

Quand une base reçoit de plus en plus de données et de requêtes, il y a deux façons d'augmenter sa capacité :

- **verticalement** (*scale up*) : on achète un serveur plus puissant (plus de RAM, de CPU, de disque) ;
- **horizontalement** (*scale out*) : on répartit les données sur plusieurs serveurs.

![Montée en charge verticale et horizontale](img/scalabilite.png "Scalabilité verticale et horizontale"){ style="display: block; margin: 0 auto" }

Les bases relationnelles sont naturellement conçues pour fonctionner sur **un seul serveur**. Le passage à plusieurs serveurs (réplication, découpage des données ou *sharding*) existe, mais il est **complexe** : les jointures et les transactions deviennent difficiles quand les données liées se trouvent sur des machines différentes. Or la montée en charge verticale finit toujours par atteindre une limite (et un coût élevé).

Pour la très grande majorité des projets (sites web, applications d'entreprise…), cette limite n'est jamais atteinte. Elle concerne surtout les géants du web et les applications à très fort trafic.

#### 2.4 Peu adapté aux données peu structurées ou très variables

Certaines données n'ont pas une forme fixe :

- des fiches produit dont les caractéristiques changent selon le type (un t-shirt a une taille et une couleur, un ordinateur a un processeur et une RAM) ;
- des logs, des messages, des données issues de capteurs ;
- des contenus imbriqués (un article avec ses commentaires, eux-mêmes avec leurs réponses).

Les faire entrer dans des tables à colonnes fixes est possible, mais souvent laborieux : beaucoup de colonnes vides (`NULL`), ou beaucoup de tables et de jointures.

#### 2.5 Le décalage avec la programmation objet

Dans le code (PHP, JavaScript…), on manipule des **objets** imbriqués :

```js
const student = {
  firstName: 'Alice',
  lastName: 'Dupont',
  departments: ['Informatique'],
  notes: [
    { subject: 'Programmation', grade: 15.5 },
    { subject: 'Réseaux', grade: 14 }
  ]
};
```

En base relationnelle, ce même élève est **éclaté** dans quatre tables (`student`, `student_department`, `note`, `subject`). Il faut donc constamment traduire l'un vers l'autre : des requêtes avec jointures pour reconstruire l'objet, plusieurs `INSERT` pour l'enregistrer. Des outils appelés **ORM** (Doctrine, Eloquent, Sequelize, Prisma…) automatisent cette traduction, mais ils ajoutent une couche de complexité.

#### 2.6 Des jointures coûteuses sur de très gros volumes

Les jointures sont la grande force du relationnel, mais sur des tables de plusieurs centaines de millions de lignes, une requête qui joint de nombreuses tables peut devenir lente. Une bonne conception et une bonne **indexation** (partie 8) règlent la plupart des cas.

---

### 3. L'alternative : les bases NoSQL

#### 3.1 Qu'est-ce que le NoSQL ?

Les bases **NoSQL** (pour *Not only SQL*) regroupent toutes les bases de données **non relationnelles**. Elles sont nées dans les années 2000, principalement pour répondre aux besoins des géants du web : des volumes de données énormes, des millions d'utilisateurs simultanés, des données peu structurées.

Leurs caractéristiques générales :

- **schéma flexible** : deux enregistrements d'une même collection peuvent avoir des champs différents ;
- **conçues pour la montée en charge horizontale** : on ajoute des serveurs facilement ;
- **pas de langage standard** : chaque SGBD a sa propre façon d'être interrogé ;
- **garanties de cohérence souvent assouplies** au profit de la performance et de la disponibilité (même si beaucoup proposent désormais des transactions).

Il en existe quatre grandes familles.

#### 3.2 Bases orientées documents

Les données sont stockées sous forme de **documents**, le plus souvent au format **JSON** (ou une variante binaire). Un document peut contenir des objets et des tableaux imbriqués. Les documents sont rangés dans des **collections** (l'équivalent approximatif des tables).

*Exemple : MongoDB, CouchDB*

*Exemple de collections dans une base orientée documents :*
![Exemple de base de donnée orientée documents](img/bdd-mongodb.png "Base de donnée orientée documents"){ style="display: block; margin: 0 auto" }

*Exemple de document :*
![Exemple de document structuré](img/document-structure.png "Document structuré"){ style="display: block; margin: 0 auto" }

Notre élève Alice tiendrait dans **un seul document**, notes comprises :

```json
{
  "_id": "65e8b015d45b7cc80993ee04",
  "first_name": "Alice",
  "last_name": "Dupont",
  "city": "Paris",
  "departments": ["Informatique"],
  "notes": [
    { "subject": "Programmation", "grade": 15.5 },
    { "subject": "Réseaux", "grade": 14 }
  ]
}
```

Pratique pour lire un élève d'un coup. Mais si la matière « Réseaux » est renommée, il faut modifier **tous les documents** d'élèves qui la contiennent : c'est le retour de la redondance.

**Usages** : catalogues produits, gestion de contenus (CMS), profils utilisateurs, applications web et mobiles.

#### 3.3 Bases clé-valeur

Le modèle le plus simple : chaque élément est une **clé unique** associée à une **valeur** (un texte, un nombre, un objet…). On ne peut rechercher que par la clé, mais c'est extrêmement rapide, d'autant que ces bases stockent généralement les données **en mémoire vive**.

*Exemple : Redis, Memcached*

*Structure clé-valeur :*
![Exemple de structure de base de donnée clé-valeur](img/bdd-cle-valeur.png "Structure base de donné clé-valeur"){ style="display: block; margin: 0 auto" }

*Exemple de donnée clé-valeur :*
![Exemple de donnée clé-valeur](img/donnee-cle-valeur.png "Donnée clé-valeur"){ style="display: block; margin: 0 auto" }

**Usages** : cache (garder en mémoire le résultat d'une requête coûteuse), sessions utilisateurs, paniers d'achat, compteurs en temps réel.

#### 3.4 Bases orientées colonnes

Aussi appelées bases **à colonnes larges** (*wide-column*). Chaque ligne est identifiée par une clé et contient un ensemble de colonnes qui **peut varier d'une ligne à l'autre** : une ligne peut avoir trois colonnes, la suivante cinquante. Les colonnes sont regroupées en **familles**, stockées ensemble sur le disque.

*Exemple : Apache Cassandra, HBase*

*Structure orientée colonnes :*
![Exemple de structure de base de donnée orientée colonne](img/bdd-orientee-colonne.png "Structure base de donné orientée colonne"){ style="display: block; margin: 0 auto" }

*Exemple de données : les colonnes vides ne sont tout simplement pas stockées.*
![Exemple de donnée orientée colonne](img/donnee-orientee-colonne.png "Donnée orientée-colonne"){ style="display: block; margin: 0 auto" }

**Usages** : très gros volumes d'écriture répartis sur de nombreux serveurs (données de capteurs, historiques, messageries, analyse de logs).

#### 3.5 Bases orientées graphes

Les données sont stockées sous forme de **nœuds** (les éléments : personnes, lieux, objets) et d'**arêtes** (les relations entre eux, qui peuvent elles-mêmes porter des informations). Parcourir des relations en chaîne y est très rapide, là où une base relationnelle multiplierait les jointures.

*Exemple : Neo4j*

*Exemple de graphe :*
![Exemple de base de donnée graphique](img/bdd-graphique.png "Base de donnée graphique"){ style="display: block; margin: 0 auto" }

**Usages** : réseaux sociaux (« amis de mes amis »), moteurs de recommandation (« les clients qui ont aimé ceci ont aussi aimé… »), détection de fraude, cartographie.

---

### 4. Relationnel ou NoSQL : comment choisir ?

#### 4.1 Comparaison

| Critère | Relationnel (SQL) | NoSQL |
|---|---|---|
| Structure | Tables, schéma fixe défini à l'avance | Documents, clés-valeurs, colonnes, graphes ; schéma flexible |
| Langage | SQL, standardisé | Propre à chaque SGBD |
| Relations entre données | Point fort (clés, jointures) | Variable : faible (clé-valeur) à excellent (graphe) |
| Intégrité et cohérence | Fortes, garanties par le SGBD (ACID) | Souvent assouplies, gérées en partie par l'application |
| Montée en charge | Surtout verticale | Surtout horizontale |
| Redondance | Évitée par conception | Souvent acceptée pour gagner en vitesse de lecture |
| Maturité | Très grande | Plus récente, écosystèmes plus fragmentés |

#### 4.2 Quelques repères

On choisit plutôt une base **relationnelle** quand :

- les données sont **structurées** et leur forme est connue ;
- les données sont **fortement liées** entre elles (élèves, notes, matières…) ;
- la **fiabilité** est essentielle (commandes, paiements, stocks, comptabilité) ;
- on veut pouvoir poser des **questions variées** aux données.

On envisage plutôt une base **NoSQL** quand :

- la forme des données **varie beaucoup** ou évolue très vite ;
- les volumes et le trafic sont **énormes** et nécessitent de nombreux serveurs ;
- le besoin est très ciblé : cache (clé-valeur), relations en réseau (graphe)…

#### 4.3 Les deux à la fois

Dans la réalité, beaucoup d'applications combinent plusieurs types de bases, chacune pour ce qu'elle fait le mieux. Par exemple, un site e-commerce peut utiliser :

- **MySQL** pour les clients, les commandes et les paiements ;
- **Redis** pour les sessions et le cache ;
- **MongoDB** pour le catalogue de produits aux caractéristiques variables.

Le relationnel reste aujourd'hui **le choix par défaut** de la plupart des projets : c'est par lui qu'on commence, et les compétences acquises dans ce cours restent la base de tout travail sur les données.

---

### 5. En résumé

- **Avantages du relationnel** : structure claire, intégrité garantie par le SGBD, pas de redondance, transactions ACID, SQL standard et puissant, technologie mature, sécurité fine.
- **Inconvénients** : schéma rigide, conception exigeante, montée en charge horizontale complexe, peu adapté aux données très variables, décalage avec les objets du code.
- **NoSQL** regroupe quatre grandes familles (documents, clé-valeur, colonnes, graphes), plus souples et plus faciles à répartir sur plusieurs serveurs, au prix de garanties souvent moins fortes.
- Le choix dépend du **besoin**, et les deux approches cohabitent souvent dans une même application.

---

*Sources :*
*- Julien POIRIER*
*- Wikipédia*
*- mongodb*
*- sql.sh*

---

© Vincent Chiofalo

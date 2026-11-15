# Optimiser les requêtes SQL

## Techniques pour améliorer les performances des requêtes

En partie 8.A, nous avons vu comment un **index** permet à MySQL de trouver rapidement les lignes. Mais un index ne sert à rien si la requête l'empêche de travailler, et aucune base ne reste rapide si l'application lui envoie des centaines de requêtes inutiles. Cette partie présente les **bonnes habitudes d'écriture** qui rendent les requêtes rapides.

Tous les exemples utilisent la table `connexion` de la partie 8.A (500 000 lignes), avec l'index `idx_connexion_connected_at` sur `connected_at`.

> **Une règle avant toutes les autres : mesurer.** On n'optimise pas une requête « au feeling ». On mesure (durée affichée par phpMyAdmin, `EXPLAIN ANALYZE`), on regarde le plan d'exécution (`EXPLAIN`), on modifie **une seule chose**, puis on mesure à nouveau.

---

### 1. Ne demander que ce dont on a besoin

#### 1.1 Les colonnes

`SELECT *` récupère **toutes** les colonnes, même celles qu'on n'affiche pas. Sur des centaines de milliers de lignes, ou avec des colonnes volumineuses (`TEXT`), cela représente beaucoup de données lues, transmises à l'application, puis ignorées.

```sql
-- À éviter dans une application
SELECT * FROM connexion WHERE student_id = 7;

-- Mieux : seulement les colonnes utiles
SELECT connected_at, page FROM connexion WHERE student_id = 7;
```

`SELECT *` reste très pratique pour **explorer** une table dans phpMyAdmin. C'est dans le code d'une application qu'on liste les colonnes.

#### 1.2 L'index couvrant

Quand **toutes** les colonnes utilisées par la requête se trouvent dans un index, MySQL n'a même pas besoin de lire la table : l'index lui suffit. On parle d'**index couvrant**.

```sql
EXPLAIN
SELECT COUNT(*)
FROM connexion
WHERE connected_at >= '2026-01-01' AND connected_at < '2026-02-01';
```

La colonne `Extra` affiche **`Using index`** : la requête n'utilise que `connected_at`, déjà présente dans `idx_connexion_connected_at`. C'est le cas le plus rapide.

#### 1.3 Les lignes

Si l'application n'affiche que les 20 dernières connexions, il est inutile d'en récupérer 500 000 :

```sql
SELECT connected_at, page
FROM connexion
WHERE student_id = 7
ORDER BY connected_at DESC
LIMIT 20;
```

---

### 2. Laisser l'index travailler

Un index ne sert que si MySQL peut l'utiliser **directement** sur la valeur de la colonne. Certaines écritures l'en empêchent, et la requête retombe sur une lecture complète de la table (`type = ALL`), alors même que l'index existe.

#### 2.1 Pas de fonction sur la colonne filtrée

```sql
-- L'index sur connected_at est inutilisable
SELECT COUNT(*)
FROM connexion
WHERE YEAR(connected_at) = 2026;
```

L'index contient les **dates triées**, pas leurs années. Pour appliquer `YEAR()`, MySQL doit calculer l'année de **chacune** des 500 000 lignes : lecture complète. `EXPLAIN` le confirme (`type` à `ALL` ou `index`, `rows` proche de 500 000).

La solution : écrire la condition comme un **intervalle** sur la colonne elle-même.

```sql
-- L'index est utilisé (type = range)
SELECT COUNT(*)
FROM connexion
WHERE connected_at >= '2026-01-01' AND connected_at < '2027-01-01';
```

Le résultat est identique, mais MySQL parcourt directement la bonne portion de l'index. Même principe pour un jour précis :

```sql
-- À éviter
WHERE DATE(connected_at) = '2026-01-10'

-- Mieux
WHERE connected_at >= '2026-01-10' AND connected_at < '2026-01-11'
```

> **Pourquoi `< '2026-01-11'` plutôt que `<= '2026-01-10 23:59:59'` ?** Les deux fonctionnent ici, mais la première écriture (un intervalle « semi-ouvert ») est plus sûre : elle n'oublie aucune seconde, même si la colonne stockait des fractions de seconde, et elle s'écrit de la même façon pour un jour, un mois ou une année.

> On peut aussi créer un **index sur une expression** (MySQL 8.0.13 et plus), par exemple `CREATE INDEX idx_annee ON connexion ((YEAR(connected_at)));`. C'est utile quand on ne peut pas réécrire la requête, mais réécrire la condition reste la solution la plus simple.

#### 2.2 Pas de calcul sur la colonne filtrée

C'est la même règle : le calcul doit porter sur la **valeur cherchée**, pas sur la colonne.

```sql
-- Calcul sur la colonne : un index sur duration_s serait inutilisable
WHERE duration_s / 60 > 10

-- Calcul sur la valeur : l'index est utilisable
WHERE duration_s > 600
```

#### 2.3 LIKE : le joker au début empêche l'index

Un index trie les valeurs **à partir du début** : comme dans un dictionnaire, on trouve facilement les mots qui **commencent** par « jo », pas ceux qui **finissent** par « ure ».

| Condition | Index utilisable ? |
|---|---|
| `WHERE last_name LIKE 'Du%'` | Oui (`type = range`) |
| `WHERE last_name LIKE '%ont'` | Non |
| `WHERE last_name LIKE '%up%'` | Non |

Pour rechercher un mot n'importe où dans un texte long (un moteur de recherche dans des articles, par exemple), MySQL propose des index spécialisés, les index **`FULLTEXT`**, qui dépassent le cadre de ce cours.

#### 2.4 Comparer avec le bon type

```sql
-- phone_number est un VARCHAR : la valeur doit être un texte
WHERE phone_number = '0601020304'

-- Comparée à un nombre, MySQL convertit la colonne pour chaque ligne :
-- l'index est inutilisable, et le résultat peut être faux (le 0 initial disparaît)
WHERE phone_number = 0601020304
```

C'est une raison de plus de choisir les bons types (partie 5.B) : un identifiant stocké en `VARCHAR` et comparé à un nombre, ou l'inverse, ralentit toutes les requêtes.

---

### 3. Filtrer le plus tôt possible

#### 3.1 WHERE plutôt que HAVING

`WHERE` filtre les lignes **avant** le regroupement, `HAVING` **après** (partie 2.C). Une condition qui porte sur une colonne, et non sur un agrégat, doit être dans le `WHERE` : MySQL écarte les lignes inutiles avant de les regrouper, et peut utiliser un index.

```sql
-- À éviter : on regroupe les 500 000 lignes, puis on jette 4 groupes sur 5
SELECT page, COUNT(*)
FROM connexion
GROUP BY page
HAVING page = 'notes';

-- Mieux : on ne garde que les lignes utiles, puis on regroupe
SELECT page, COUNT(*)
FROM connexion
WHERE page = 'notes'
GROUP BY page;
```

#### 3.2 Réduire avant de joindre

Dans une jointure, un filtre sur l'une des tables réduit le nombre de lignes à assembler. MySQL réorganise souvent lui-même l'ordre des opérations, mais un `WHERE` précis et des index sur les colonnes filtrées l'y aident.

---

### 4. Jointures et sous-requêtes

#### 4.1 Indexer les colonnes de jointure

Une jointure cherche, pour chaque ligne d'une table, les lignes correspondantes de l'autre. Sans index sur la colonne de jointure, chaque recherche est une lecture complète. Avec les clés étrangères, c'est automatique (partie 8.A) : la colonne `connexion.student_id` est indexée, et `student.student_id` est la clé primaire.

```sql
EXPLAIN
SELECT s.first_name, s.last_name, c.connected_at
FROM student s
INNER JOIN connexion c ON c.student_id = s.student_id
WHERE s.city = 'Rennes';
```

Pour la table `connexion`, `EXPLAIN` affiche `type = ref` et l'index de la clé étrangère dans `key` : MySQL retrouve directement les connexions de chaque élève de Rennes.

> Une colonne de jointure qui **n'est pas** une clé étrangère déclarée (par exemple une jointure sur un email, comme en partie 6) n'a pas d'index automatique. Sur de grosses tables, il faut en créer un.

#### 4.2 Ne pas masquer une jointure fausse avec DISTINCT

Quand une requête renvoie des doublons inattendus, le réflexe d'ajouter `DISTINCT` cache souvent une jointure mal écrite, qui produit beaucoup trop de lignes avant que `DISTINCT` ne les élimine. Avant d'ajouter `DISTINCT`, vérifiez les conditions de jointure (partie 2.D) : `DISTINCT` doit répondre à un vrai besoin, pas corriger une erreur.

#### 4.3 Les sous-requêtes corrélées

Une sous-requête **corrélée** utilise une colonne de la requête principale (ici `s.student_id`). Elle est donc, en principe, exécutée **une fois par ligne** de la requête principale :

```sql
-- Le nombre de connexions de chaque élève, par une sous-requête corrélée
SELECT s.first_name, s.last_name,
       (SELECT COUNT(*) FROM connexion c WHERE c.student_id = s.student_id) AS nb_connexions
FROM student s;
```

Avec l'index sur `connexion.student_id`, chaque exécution est rapide, et ce n'est pas un problème sur 42 élèves. Sur des dizaines de milliers de lignes, une jointure avec `GROUP BY` est souvent plus efficace :

```sql
SELECT s.first_name, s.last_name, COUNT(c.connexion_id) AS nb_connexions
FROM student s
LEFT JOIN connexion c ON c.student_id = s.student_id
GROUP BY s.student_id, s.first_name, s.last_name;
```

L'optimiseur de MySQL réécrit parfois lui-même les sous-requêtes en jointures. La seule façon de savoir laquelle des deux écritures est la plus rapide dans un cas donné, c'est de **mesurer**.

---

### 5. Le problème N+1

C'est l'erreur de performance la plus fréquente dans les applications web, et elle ne se voit **pas** dans phpMyAdmin : elle vient du **code** de l'application.

Pour afficher la liste des élèves avec leur nombre de notes, un développeur écrit en PHP :

```php
$eleves = $pdo->query('SELECT student_id, first_name, last_name FROM student')->fetchAll();

foreach ($eleves as $eleve) {
    $stmt = $pdo->prepare('SELECT COUNT(*) FROM note WHERE student_id = ?');
    $stmt->execute([$eleve['student_id']]);
    $nbNotes = $stmt->fetchColumn();
    echo $eleve['first_name'] . ' ' . $eleve['last_name'] . ' : ' . $nbNotes . ' notes<br>';
}
```

Ce code fonctionne, mais il envoie **1 requête** pour la liste des élèves, puis **1 requête par élève** : 43 requêtes au total. Avec 10 000 élèves, ce serait 10 001 requêtes pour afficher une seule page. On l'appelle le **problème N+1**.

![Le problème N+1](img/n-plus-1.png "Le problème N+1"){ style="display: block; margin: 0 auto" }

Chaque requête, même très rapide, a un coût fixe : l'envoi à MySQL, l'analyse, le retour du résultat. Une seule requête bien écrite fait le même travail :

```php
$sql = 'SELECT s.first_name, s.last_name, COUNT(n.note_id) AS nb_notes
        FROM student s
        LEFT JOIN note n ON n.student_id = s.student_id
        GROUP BY s.student_id, s.first_name, s.last_name';

foreach ($pdo->query($sql) as $eleve) {
    echo $eleve['first_name'] . ' ' . $eleve['last_name'] . ' : ' . $eleve['nb_notes'] . ' notes<br>';
}
```

> **Règle** : une requête SQL dans une boucle doit toujours éveiller les soupçons. Presque toujours, une jointure, un `GROUP BY` ou un `IN (…)` permet de tout récupérer en une seule requête.

Les **ORM** (Doctrine, Eloquent, Sequelize, Prisma…, partie 9) génèrent facilement ce problème sans qu'on s'en rende compte. Ils proposent tous une option de **chargement anticipé** (*eager loading*) pour l'éviter.

---

### 6. La pagination

Pour afficher les connexions page par page, on utilise `LIMIT` et `OFFSET` (partie 2.A) :

```sql
-- Page 1
SELECT connexion_id, connected_at, page FROM connexion ORDER BY connexion_id LIMIT 20 OFFSET 0;

-- Page 20 000
SELECT connexion_id, connected_at, page FROM connexion ORDER BY connexion_id LIMIT 20 OFFSET 399980;
```

La première page est instantanée. La page 20 000 est nettement plus lente : pour sauter 399 980 lignes, MySQL doit quand même les **parcourir une à une**, avant de garder les 20 suivantes.

Sur de très grosses tables, on remplace l'`OFFSET` par une **pagination par clé** : on retient le dernier numéro affiché, et on demande les lignes **suivantes** :

```sql
-- La page précédente s'est terminée sur la connexion n°399980
SELECT connexion_id, connected_at, page
FROM connexion
WHERE connexion_id > 399980
ORDER BY connexion_id
LIMIT 20;
```

Grâce à l'index de la clé primaire, MySQL va **directement** à la connexion n°399 981 : la page 20 000 est aussi rapide que la première. En contrepartie, on ne peut plus sauter directement à une page numérotée : c'est le principe des listes « charger plus » ou du défilement infini.

---

### 7. Stocker un résultat calculé : la dénormalisation

Certaines requêtes sont **coûteuses par nature** : compter les connexions de chaque élève sur toute l'année demande de parcourir les 500 000 lignes. Si ce résultat est affiché sur chaque page du site, le recalculer à chaque fois est un gaspillage.

On peut alors **stocker** le résultat, par exemple dans une colonne `nb_connexions` de la table `student`, mise à jour régulièrement. C'est une **dénormalisation** : on accepte une donnée calculée, donc redondante, en échange de la rapidité.

C'est exactement le cas de la colonne `average_grade` de `scholar`, présente depuis le début du cours. Vous en connaissez maintenant les deux faces :

| | |
|---|---|
| **Avantage** | Afficher la moyenne d'un élève ne demande aucun calcul : la valeur est déjà là |
| **Inconvénient** | Elle doit être **recalculée** à chaque ajout, modification ou suppression de note, sinon elle devient fausse (parties 3 et 6) |

La dénormalisation est un **choix conscient**, fait **après** avoir mesuré qu'un calcul est réellement trop lent. Par défaut, on conçoit une base normalisée (partie 4.B), et on calcule les données à la demande.

---

### 8. Trouver les requêtes à optimiser

Dans une vraie application, on ne relit pas toutes les requêtes une à une. MySQL peut enregistrer automatiquement les requêtes lentes dans un **journal des requêtes lentes** (*slow query log*) : toutes celles qui dépassent une durée choisie (variable `long_query_time`, 10 secondes par défaut, souvent réglée à 1 seconde ou moins).

La méthode d'optimisation est alors toujours la même :

1. **Repérer** les requêtes lentes, et surtout les requêtes **fréquentes** : une requête de 50 ms exécutée 10 000 fois par heure pèse plus lourd qu'une requête de 2 secondes exécutée une fois par jour.
2. **Analyser** avec `EXPLAIN` : `type = ALL` sur une grosse table ? un `rows` énorme ? `Using filesort` ?
3. **Corriger** : réécrire la requête (paragraphes 1 à 6), ajouter un index (partie 8.A), ou, en dernier recours, dénormaliser (paragraphe 7).
4. **Mesurer à nouveau**, pour vérifier que la correction a vraiment amélioré les choses.

**Pratiquons !!**

Rdv au fichier `8-exercices.md`, niveaux 2 et 3.

---

### 9. En résumé

- **Mesurer** avant d'optimiser, et après : durée d'exécution, `EXPLAIN`, `EXPLAIN ANALYZE`.
- Ne demander que les **colonnes** et les **lignes** utiles (`SELECT` précis, `LIMIT`). Un **index couvrant** évite même de lire la table.
- Pour qu'un index serve, la colonne filtrée doit rester **telle quelle** : pas de fonction (`YEAR(…)`), pas de calcul, pas de joker `%` au début d'un `LIKE`, et une valeur du **bon type**.
- Écrire les intervalles de dates sous la forme `>= début AND < fin`.
- Filtrer **tôt** : `WHERE` plutôt que `HAVING` pour les conditions sur les colonnes.
- Indexer les colonnes de **jointure**, et ne pas masquer une jointure fausse avec `DISTINCT`.
- Éviter le **problème N+1** : pas de requête dans une boucle, mais une jointure.
- Sur de grosses tables, préférer la **pagination par clé** à un grand `OFFSET`.
- La **dénormalisation** (stocker un résultat calculé) est un compromis, à réserver aux cas mesurés.

---

*Sources :*
*- Julien POIRIER*
*- sql.sh*
*- dev.mysql.com*

---

© Vincent Chiofalo

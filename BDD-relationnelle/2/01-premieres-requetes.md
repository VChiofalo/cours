# Interroger les données

## Premières requêtes : filtrer, trier, limiter

En partie 1, nous avons affiché des tables entières avec `SELECT … FROM …`. C'est rarement ce qu'on veut : on cherche plutôt **certaines** lignes (les élèves de Lyon), dans un **certain ordre** (du meilleur au moins bon), et parfois seulement **les premières** (le top 5). C'est l'objet de cette partie.

Tous les exemples s'exécutent sur la base `scholar`, dans l'onglet **SQL** de phpMyAdmin.

---

### 1. Rappel : la structure d'une requête SELECT

Une requête de sélection se construit avec des **clauses**, toujours écrites **dans cet ordre** :

```sql
SELECT colonnes        -- quelles colonnes afficher
FROM table             -- dans quelle table
WHERE condition        -- quelles lignes garder
ORDER BY colonne       -- dans quel ordre les afficher
LIMIT nombre;          -- combien en afficher
```

Seules `SELECT` et `FROM` sont obligatoires. Les autres s'ajoutent selon le besoin, mais **toujours dans cet ordre** : un `ORDER BY` placé avant un `WHERE` provoque une erreur de syntaxe (`#1064`).

#### Les commentaires

Comme dans tout langage, on peut commenter une requête :

```sql
-- Commentaire sur une ligne (attention à l'espace après les deux tirets)

/* Commentaire
   sur plusieurs lignes */
```

Les commentaires sont ignorés par MySQL. Ils sont très utiles pour garder une trace de ce que fait une requête, notamment dans vos fichiers d'exercices.

---

### 2. Filtrer les lignes avec WHERE

#### 2.1 Principe

La clause `WHERE` ne garde que les lignes qui **respectent une condition**. Les autres sont simplement ignorées.

```sql
SELECT first_name, last_name, average_grade
FROM student
WHERE city = 'Lyon';
```

| first_name | last_name | average_grade |
|---|---|---|
| Claire | Lemoine | 17.10 |
| François | Petit | 15.25 |
| Jules | Gautier | 11.10 |
| … | … | … |

11 élèves sur 42 habitent à Lyon. On remarque que la colonne `city` sert à filtrer **sans être affichée** : la condition peut porter sur n'importe quelle colonne de la table.

#### 2.2 Les opérateurs de comparaison

| Opérateur | Signification | Exemple |
|---|---|---|
| `=` | Égal à | `city = 'Lyon'` |
| `<>` ou `!=` | Différent de | `city <> 'Paris'` |
| `<` | Strictement inférieur à | `average_grade < 10` |
| `>` | Strictement supérieur à | `average_grade > 15` |
| `<=` | Inférieur ou égal à | `average_grade <= 12` |
| `>=` | Supérieur ou égal à | `average_grade >= 17` |

`<>` est la forme standard du SQL, `!=` est acceptée par MySQL. Les deux font exactement la même chose.

```sql
-- Les élèves qui ont au moins 17 de moyenne
SELECT first_name, last_name, average_grade
FROM student
WHERE average_grade >= 17;
```

| first_name | last_name | average_grade |
|---|---|---|
| Claire | Lemoine | 17.10 |
| Isabelle | Marchand | 17.37 |
| Noah | Brunet | 18.40 |
| Sophie | Jacques | 17.00 |
| Charlotte | Dupuis | 17.50 |
| Frédéric | Vallet | 17.10 |

Attention à la différence entre `>` et `>=` : avec `average_grade > 17`, Sophie Jacques (17.00 pile) disparaît du résultat. Lisez toujours attentivement une consigne : « plus de 17 » et « au moins 17 » ne donnent pas la même requête.

#### 2.3 Comparer des nombres, du texte, des dates

La façon d'écrire la valeur dépend du **type** de la colonne :

| Type | Écriture | Exemple |
|---|---|---|
| Nombre (`INT`, `DECIMAL`) | Tel quel, avec un **point** pour les décimales | `average_grade >= 12.5` |
| Texte (`VARCHAR`) | Entre **apostrophes** | `city = 'Rennes'` |
| Date (`DATE`) | Entre **apostrophes**, au format **`'AAAA-MM-JJ'`** | `birth_date >= '2005-01-01'` |

```sql
-- Les élèves nés en 2005 ou après
SELECT first_name, last_name, birth_date
FROM student
WHERE birth_date >= '2005-01-01';
```

| first_name | last_name | birth_date |
|---|---|---|
| Eva | Dufresne | 2006-12-04 |
| Giselle | Roche | 2005-09-03 |
| Mia | Bouvier | 2005-10-01 |
| Rachelle | Petit | 2007-08-19 |
| … | … | … |

Pour une date, « plus grand » signifie « plus récent » : `birth_date >= '2005-01-01'` donne les élèves nés **le 1er janvier 2005 ou après**, donc les plus **jeunes**.

> **Pièges fréquents**
> - Une date s'écrit toujours **année-mois-jour** : `'2005-01-01'`, jamais `'01/01/2005'`.
> - Le séparateur décimal est le **point** : `12.5`, jamais `12,5`. La virgule sépare les colonnes !

#### 2.4 Majuscules et accents

Avec la base `scholar`, la comparaison de texte **ne tient compte ni des majuscules, ni des accents** :

```sql
SELECT first_name, last_name
FROM student
WHERE first_name = 'leo';
```

Cette requête trouve bien **Léo** Benoit. C'est un réglage de la table (la *collation* `utf8mb4_0900_ai_ci`, où `ai` signifie *accent insensitive* et `ci` *case insensitive*). Pratique, mais à garder en tête : d'autres bases, réglées autrement, feraient la différence.

#### 2.5 Une apostrophe dans une valeur

Que se passe-t-il si la valeur cherchée contient elle-même une apostrophe ?

```sql
SELECT first_name, last_name
FROM student
WHERE last_name = 'N'Diaye';
-- #1064 - You have an error in your SQL syntax […] near 'Diaye''
```

MySQL lit `'N'` comme une valeur complète, puis ne comprend pas `Diaye'`. Il faut **échapper** l'apostrophe, c'est-à-dire indiquer qu'elle fait partie de la valeur. Deux façons de faire :

```sql
-- En doublant l'apostrophe (standard SQL, fonctionne partout)
WHERE last_name = 'N''Diaye';

-- Avec un antislash (propre à MySQL)
WHERE last_name = 'N\'Diaye';
```

Les deux trouvent bien Ibrahima N'Diaye.

#### 2.6 Et les valeurs NULL ?

Une condition comme `email = NULL` **ne fonctionne pas** : elle ne renvoie jamais aucune ligne, même s'il y a des emails non renseignés. `NULL` n'est pas une valeur qu'on peut comparer, c'est une absence de valeur. La bonne syntaxe (`IS NULL`) sera vue en partie 2.B.

**Pratiquons !!**

Rdv au fichier `2-exercices.md`, niveau 1.

---

### 3. Trier les résultats avec ORDER BY

#### 3.1 Principe

Sans indication, MySQL renvoie les lignes **dans l'ordre qui l'arrange** : souvent l'ordre d'insertion, mais **rien ne le garantit**. Pour obtenir un ordre précis, on utilise `ORDER BY` :

```sql
SELECT first_name, last_name, average_grade
FROM student
ORDER BY average_grade DESC;
```

| Mot-clé | Ordre | Pour un nombre | Pour un texte | Pour une date |
|---|---|---|---|---|
| `ASC` | Croissant (par défaut) | Du plus petit au plus grand | De A à Z | Du plus ancien au plus récent |
| `DESC` | Décroissant | Du plus grand au plus petit | De Z à A | Du plus récent au plus ancien |

`ASC` est la valeur **par défaut** : `ORDER BY last_name` et `ORDER BY last_name ASC` sont identiques. On l'écrit souvent quand même, pour la lisibilité.

#### 3.2 Trier sur plusieurs colonnes

On peut indiquer plusieurs colonnes, séparées par des virgules. La deuxième ne sert **qu'à départager** les lignes égales sur la première :

```sql
-- Par nom de famille, puis par prénom pour les homonymes
SELECT last_name, first_name, city
FROM student
WHERE last_name = 'Lemoine'
ORDER BY last_name ASC, first_name ASC;
```

| last_name | first_name | city |
|---|---|---|
| Lemoine | Alice | Paris |
| Lemoine | Claire | Lyon |
| Lemoine | Océane | Toulouse |
| Lemoine | Paul | Lyon |
| Lemoine | Yasmine | Toulouse |

Chaque colonne a son propre sens de tri :

```sql
-- Par ville de A à Z, et dans chaque ville, de la meilleure à la moins bonne moyenne
SELECT city, first_name, last_name, average_grade
FROM student
ORDER BY city ASC, average_grade DESC;
```

#### 3.3 Les NULL dans un tri

Dans MySQL, les valeurs `NULL` sont considérées comme **plus petites que tout** : elles apparaissent **en premier** dans un tri croissant, et en dernier dans un tri décroissant.

```sql
SELECT first_name, last_name, average_grade
FROM student
ORDER BY average_grade ASC;
```

| first_name | last_name | average_grade |
|---|---|---|
| Sébastien | Vidal | *NULL* |
| Théodore | Chavanne | *NULL* |
| Yasmine | Lemoine | *NULL* |
| Lucas | Moreira | *NULL* |
| David | Berger | 9.75 |
| Théo | Lefevre | 10.67 |
| … | … | … |

Les 4 élèves qui n'ont encore aucune note arrivent en tête, avant la plus faible moyenne réelle. Pour les écarter, il faudra les filtrer avec `IS NOT NULL` (partie 2.B).

---

### 4. Limiter le nombre de résultats avec LIMIT

#### 4.1 Les premières lignes

`LIMIT` indique le **nombre maximum** de lignes à renvoyer. Combiné avec `ORDER BY`, il permet d'obtenir un « top » :

```sql
-- Les 5 meilleures moyennes
SELECT first_name, last_name, average_grade
FROM student
ORDER BY average_grade DESC
LIMIT 5;
```

| first_name | last_name | average_grade |
|---|---|---|
| Noah | Brunet | 18.40 |
| Charlotte | Dupuis | 17.50 |
| Isabelle | Marchand | 17.37 |
| Claire | Lemoine | 17.10 |
| Frédéric | Vallet | 17.10 |

> **`LIMIT` sans `ORDER BY`** renvoie les premières lignes « au hasard », dans l'ordre où MySQL les trouve. Pour un « top », un « dernier », un « plus récent », le tri est indispensable.

> **Ex aequo** : Claire Lemoine et Frédéric Vallet ont tous deux 17.10. Leur ordre entre eux n'est pas garanti, et avec un `LIMIT 4`, on ne peut pas savoir lequel des deux serait affiché. Ajouter une seconde colonne de tri (`ORDER BY average_grade DESC, last_name ASC`) rend le résultat prévisible.

#### 4.2 Sauter des lignes avec OFFSET

`OFFSET` indique combien de lignes **sauter** avant de commencer :

```sql
-- Les élèves n°6 à 10 (on saute les 5 premiers, on en garde 5)
SELECT student_id, first_name, last_name
FROM student
ORDER BY student_id ASC
LIMIT 5 OFFSET 5;
```

| student_id | first_name | last_name |
|---|---|---|
| 6 | François | Petit |
| 7 | Giselle | Roche |
| 8 | Hugo | Renard |
| 9 | Isabelle | Marchand |
| 10 | Jules | Gautier |

C'est le principe de la **pagination** sur un site web : page 1 = `LIMIT 10 OFFSET 0`, page 2 = `LIMIT 10 OFFSET 10`, page 3 = `LIMIT 10 OFFSET 20`… C'est d'ailleurs ce que fait phpMyAdmin quand il affiche les lignes 25 par 25.

MySQL accepte aussi une écriture courte, à manier avec prudence car l'ordre est inversé : `LIMIT 5, 10` signifie « saute **5** lignes, puis en prend **10** ».

**Pratiquons !!**

Rdv au fichier `2-exercices.md`, niveau 2.

---

### 5. Supprimer les doublons avec DISTINCT

`DISTINCT`, placé juste après `SELECT`, supprime les lignes **identiques** du résultat.

```sql
-- Toutes les villes, une ligne par élève (42 lignes, avec répétitions)
SELECT city
FROM student;

-- Chaque ville une seule fois (4 lignes)
SELECT DISTINCT city
FROM student;
```

| city |
|---|
| Paris |
| Toulouse |
| Lyon |
| Rennes |

`DISTINCT` porte sur **l'ensemble des colonnes** sélectionnées, pas seulement sur la première : c'est la **combinaison** qui doit être unique.

```sql
-- Dans quelles villes habitent des élèves nommés Lemoine ?
SELECT DISTINCT last_name, city
FROM student
WHERE last_name = 'Lemoine';
```

| last_name | city |
|---|---|
| Lemoine | Lyon |
| Lemoine | Paris |
| Lemoine | Toulouse |

Il y a 5 Lemoine, mais seulement 3 combinaisons nom / ville différentes : les deux Lemoine de Lyon et les deux de Toulouse ne donnent chacun qu'une ligne.

---

### 6. Renommer et calculer avec AS

#### 6.1 Renommer une colonne

`AS` donne un **alias**, c'est-à-dire un autre nom, à une colonne **dans le résultat**. La table, elle, n'est pas modifiée.

```sql
SELECT first_name AS prenom, last_name AS nom, average_grade AS moyenne
FROM student;
```

| prenom | nom | moyenne |
|---|---|---|
| Alice | Dupont | 14.83 |
| Bob | Martin | 12.35 |
| … | … | … |

Si l'alias contient des espaces ou des accents, on l'entoure de **backticks** :

```sql
SELECT birth_date AS `date de naissance`
FROM student;
```

Le mot `AS` est facultatif : `SELECT first_name prenom` fonctionne aussi. C'est exactement ce qui se passe quand on **oublie une virgule** entre deux colonnes (le piège vu en partie 1.B). Écrivez toujours `AS`, la requête est plus lisible et l'intention est claire.

#### 6.2 Des colonnes calculées

Dans le `SELECT`, on peut aussi faire des **calculs** avec les opérateurs `+`, `-`, `*` et `/`. Un alias est alors indispensable pour donner un nom lisible au résultat :

```sql
-- La moyenne de chaque élève, ramenée sur 100
SELECT first_name, last_name, average_grade * 5 AS moyenne_sur_100
FROM student;
```

| first_name | last_name | moyenne_sur_100 |
|---|---|---|
| Alice | Dupont | 74.15 |
| Bob | Martin | 61.75 |
| … | … | … |

Sans `AS`, la colonne s'appellerait `average_grade * 5`. Les fonctions de calcul plus avancées (arrondi, calcul d'âge à partir de la date de naissance…) seront vues en partie 2.B.

#### 6.3 Où utiliser un alias ?

MySQL ne traite pas les clauses dans l'ordre où on les écrit, mais dans celui-ci :

1. `FROM` : il prend la table ;
2. `WHERE` : il garde les lignes qui respectent la condition ;
3. `SELECT` : il calcule les colonnes et leur donne leurs alias ;
4. `ORDER BY` : il trie ;
5. `LIMIT` : il garde les premières lignes.

Conséquence : un alias **n'existe pas encore** au moment du `WHERE`, mais il existe au moment du `ORDER BY`.

```sql
-- Fonctionne : l'alias est utilisable dans ORDER BY
SELECT first_name, average_grade * 5 AS moyenne_sur_100
FROM student
ORDER BY moyenne_sur_100 DESC;

-- Erreur : l'alias n'existe pas encore dans WHERE
SELECT first_name, average_grade * 5 AS moyenne_sur_100
FROM student
WHERE moyenne_sur_100 > 80;
-- #1054 - Unknown column 'moyenne_sur_100' in 'where clause'

-- Solution : répéter le calcul dans WHERE
SELECT first_name, average_grade * 5 AS moyenne_sur_100
FROM student
WHERE average_grade * 5 > 80;
```

**Pratiquons !!**

Rdv au fichier `2-exercices.md`, niveau 3.

---

### 7. Bien écrire ses requêtes

Quelques habitudes qui évitent beaucoup d'erreurs :

- **Une clause par ligne**, mots-clés en **MAJUSCULES** : la requête se relit d'un coup d'œil.
- **Ne sélectionner que les colonnes utiles** plutôt que `*` : le résultat est plus lisible, et la requête plus rapide sur de grosses tables.
- **Lire la consigne mot à mot** : « plus de » (`>`) ou « au moins » (`>=`) ? « les 5 meilleurs » (`ORDER BY … DESC LIMIT 5`) ou « les 5 premiers inscrits » ?
- **Vérifier le résultat** : le nombre de lignes est-il plausible ? Les valeurs respectent-elles bien la condition ?
- **Construire par étapes** : d'abord `SELECT … FROM`, puis on ajoute le `WHERE`, on exécute, puis le `ORDER BY`, on exécute… Une erreur est bien plus facile à trouver dans une requête qui vient de changer d'une seule ligne.

---

### 8. En résumé

| Clause | Rôle | Exemple |
|---|---|---|
| `SELECT … FROM …` | Choisir les colonnes et la table | `SELECT first_name, city FROM student` |
| `WHERE` | Garder les lignes qui respectent une condition | `WHERE average_grade >= 15` |
| `ORDER BY` | Trier (`ASC` croissant par défaut, `DESC` décroissant) | `ORDER BY last_name ASC, first_name ASC` |
| `LIMIT` / `OFFSET` | Limiter le nombre de lignes, en sauter | `LIMIT 10 OFFSET 20` |
| `DISTINCT` | Supprimer les lignes en double | `SELECT DISTINCT city` |
| `AS` | Renommer une colonne, nommer un calcul | `average_grade * 5 AS moyenne_sur_100` |

- Les clauses s'écrivent toujours dans l'ordre `SELECT`, `FROM`, `WHERE`, `ORDER BY`, `LIMIT`.
- Le texte et les dates s'écrivent entre **apostrophes**, les dates au format `'AAAA-MM-JJ'`, les décimales avec un **point**.
- Une apostrophe dans une valeur se **double** : `'N''Diaye'`.
- Dans un tri croissant, les `NULL` arrivent **en premier**.
- Un alias est utilisable dans `ORDER BY`, mais **pas** dans `WHERE`.

---

*Sources :*
*- Julien POIRIER*
*- sql.sh*
*- dev.mysql.com*

---

© Vincent Chiofalo

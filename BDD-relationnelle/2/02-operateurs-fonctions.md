# Interroger les données

## Opérateurs logiques et fonctions de manipulation des données

En partie 2.A, chaque requête n'avait qu'**une seule** condition. On a souvent besoin d'en combiner plusieurs (« les élèves de Lyon **et** qui ont plus de 15 »), de chercher un **motif** plutôt qu'une valeur exacte (« les noms qui commencent par Du »), ou de **transformer** les données à l'affichage (mettre un nom en majuscules, calculer un âge à partir d'une date de naissance). C'est l'objet de cette partie.

---

### 1. Combiner des conditions : AND, OR, NOT

#### 1.1 AND : toutes les conditions doivent être vraies

```sql
-- Les élèves de Lyon qui ont au moins 15 de moyenne
SELECT first_name, last_name, city, average_grade
FROM student
WHERE city = 'Lyon' AND average_grade >= 15;
```

| first_name | last_name | city | average_grade |
|---|---|---|---|
| Claire | Lemoine | Lyon | 17.10 |
| François | Petit | Lyon | 15.25 |
| Sophie | Jacques | Lyon | 17.00 |
| Frédéric | Vallet | Lyon | 17.10 |
| Clara | Garcia | Lyon | 15.00 |

Une ligne n'est gardée que si elle respecte **les deux** conditions. Plus on ajoute de `AND`, moins il y a de résultats.

#### 1.2 OR : au moins une condition doit être vraie

```sql
-- Les élèves qui habitent à Lyon ou à Paris
SELECT first_name, last_name, city
FROM student
WHERE city = 'Lyon' OR city = 'Paris';
```

22 élèves : les 11 de Lyon et les 11 de Paris. Plus on ajoute de `OR`, plus il y a de résultats.

> **Piège de traduction** : en français, on dit « les élèves de Lyon **et** de Paris ». Mais un élève ne peut pas habiter les deux villes à la fois : `city = 'Lyon' AND city = 'Paris'` ne renvoie **aucune** ligne. Il faut un `OR`.

#### 1.3 NOT : inverser une condition

```sql
-- Les élèves qui n'habitent pas à Paris
SELECT first_name, last_name, city
FROM student
WHERE NOT city = 'Paris';
```

Ici, `NOT city = 'Paris'` revient à `city <> 'Paris'`. `NOT` est surtout utile devant les opérateurs vus plus loin : `NOT IN`, `NOT BETWEEN`, `NOT LIKE`, `IS NOT NULL`.

#### 1.4 Priorité et parenthèses

Quand on mélange `AND` et `OR`, MySQL évalue **d'abord les `AND`**, comme une multiplication passe avant une addition. Cela peut donner un résultat très différent de ce qu'on voulait :

```sql
-- On veut : les élèves de Lyon ou de Paris qui ont plus de 16
SELECT first_name, last_name, city, average_grade
FROM student
WHERE city = 'Lyon' OR city = 'Paris' AND average_grade > 16;
```

Cette requête renvoie **15 lignes**, dont Jules Gautier (Lyon, 11.10) et Sébastien Vidal (Lyon, aucune note). MySQL l'a comprise ainsi :

```
city = 'Lyon'   OR   (city = 'Paris' AND average_grade > 16)
```

C'est-à-dire « **tous** les élèves de Lyon, plus ceux de Paris qui ont plus de 16 ». Pour obtenir ce qu'on voulait, il faut des **parenthèses** :

```sql
SELECT first_name, last_name, city, average_grade
FROM student
WHERE (city = 'Lyon' OR city = 'Paris') AND average_grade > 16;
```

| first_name | last_name | city | average_grade |
|---|---|---|---|
| Claire | Lemoine | Lyon | 17.10 |
| Isabelle | Marchand | Paris | 17.37 |
| Noah | Brunet | Paris | 18.40 |
| Sophie | Jacques | Lyon | 17.00 |
| Frédéric | Vallet | Lyon | 17.10 |
| Marion | Besson | Paris | 16.50 |
| Raphaël | Germain | Paris | 16.17 |

> **Règle simple** : dès qu'une condition mélange `AND` et `OR`, mettez des parenthèses, même si vous pensez qu'elles ne sont pas nécessaires. La requête devient plus lisible, et vous évitez l'erreur.

---

### 2. IN : une valeur parmi une liste

Quand on compare une même colonne à plusieurs valeurs, les `OR` s'accumulent vite :

```sql
WHERE last_name = 'Petit' OR last_name = 'Dufresne' OR last_name = 'Bouvier'
```

`IN` permet d'écrire la même chose de façon bien plus lisible :

```sql
SELECT first_name, last_name, city
FROM student
WHERE last_name IN ('Petit', 'Dufresne', 'Bouvier');
```

| first_name | last_name | city |
|---|---|---|
| Eva | Dufresne | Paris |
| François | Petit | Lyon |
| Mia | Bouvier | Rennes |
| Rachelle | Petit | Paris |
| Kélian | Dufresne | Rennes |

Et son contraire, `NOT IN`, garde les lignes dont la valeur n'est **dans aucun** élément de la liste :

```sql
-- Les élèves qui n'habitent ni à Paris ni à Lyon (20 élèves)
SELECT first_name, last_name, city
FROM student
WHERE city NOT IN ('Paris', 'Lyon');
```

> **Piège de traduction** : « dont la ville n'est pas Paris **ou** Lyon » se traduit par `NOT IN ('Paris', 'Lyon')`, c'est-à-dire « ni Paris, ni Lyon ». Écrire `city <> 'Paris' OR city <> 'Lyon'` serait une erreur : cette condition est **toujours vraie** (un élève de Paris n'habite pas à Lyon, donc la deuxième partie est vraie, et inversement).

---

### 3. BETWEEN : une valeur dans un intervalle

```sql
-- Les élèves qui ont entre 12 et 13 de moyenne
SELECT first_name, last_name, average_grade
FROM student
WHERE average_grade BETWEEN 12 AND 13;
```

| first_name | last_name | average_grade |
|---|---|---|
| Bob | Martin | 12.35 |
| Eva | Dufresne | 13.00 |
| Léo | Benoit | 13.00 |
| Alice | Lemoine | 12.17 |
| Inès | Gallet | 12.50 |
| Léa | Leblanc | 12.17 |
| Maxime | Dumas | 12.00 |

Les deux **bornes sont incluses** : Maxime Dumas (12.00 pile) et Eva Dufresne (13.00 pile) font partie du résultat. `BETWEEN 12 AND 13` équivaut donc à `average_grade >= 12 AND average_grade <= 13`.

> La plus petite valeur s'écrit **toujours en premier** : `BETWEEN 13 AND 12` ne renvoie aucune ligne.

`BETWEEN` fonctionne aussi très bien avec les **dates** :

```sql
-- Les élèves nés en 2004
SELECT first_name, last_name, birth_date
FROM student
WHERE birth_date BETWEEN '2004-01-01' AND '2004-12-31';
```

| first_name | last_name | birth_date |
|---|---|---|
| Alice | Dupont | 2004-11-04 |
| Alice | Lemoine | 2004-03-23 |
| Léa | Leblanc | 2004-02-13 |
| Yasmine | Lemoine | 2004-05-03 |

Et `NOT BETWEEN` garde les valeurs **en dehors** de l'intervalle (bornes exclues).

**Pratiquons !!**

Rdv au fichier `2-exercices.md`, niveau 4.

---

### 4. LIKE : rechercher un motif

#### 4.1 Les caractères jokers

`=` cherche une valeur **exacte**. `LIKE` cherche un **motif**, grâce à deux caractères spéciaux (les *jokers*) :

| Joker | Signification | Exemple | Trouve |
|---|---|---|---|
| `%` | N'importe quelle suite de caractères (0, 1 ou plusieurs) | `'Du%'` | Dupont, Dufresne, Durand… |
| `_` | Exactement **un** caractère, n'importe lequel | `'___'` | Bob, Eva, Léo… |

On place les jokers selon ce qu'on cherche :

| Motif | Signification |
|---|---|
| `'Du%'` | Commence par « Du » |
| `'%e'` | Se termine par « e » |
| `'%mar%'` | Contient « mar » (n'importe où) |
| `'_a%'` | Deuxième lettre = « a » |
| `'___'` | Exactement 3 caractères |

```sql
-- Les élèves dont le nom commence par « Du »
SELECT first_name, last_name
FROM student
WHERE last_name LIKE 'Du%';
```

| first_name | last_name |
|---|---|
| Alice | Dupont |
| Eva | Dufresne |
| Olivia | Durand |
| Charlotte | Dupuis |
| Kélian | Dufresne |
| Maxime | Dumas |

```sql
-- Les prénoms de exactement 3 lettres
SELECT first_name, last_name
FROM student
WHERE first_name LIKE '___';
```

Résultat : Bob, Eva (deux fois), Léo, Mia, Léa. Comme pour `=`, la comparaison ne tient compte **ni des majuscules ni des accents** dans `scholar` : `LIKE 'du%'` donne le même résultat que `LIKE 'Du%'`.

#### 4.2 NOT LIKE

```sql
-- Les élèves dont le nom ne contient pas la lettre « e »
SELECT first_name, last_name
FROM student
WHERE last_name NOT LIKE '%e%';
```

Résultat : 11 élèves, dont Alice Dupont, Bob Martin, Isabelle Marchand ou Clara Garcia.

> **`LIKE` sans joker** se comporte comme `=` : `last_name LIKE 'Petit'` ne trouve que « Petit ». Si vous voulez « contient », n'oubliez pas les `%` de chaque côté.

#### 4.3 Chercher un vrai % ou un vrai _

Si le texte cherché contient lui-même `%` ou `_`, on les **échappe** avec un antislash : `LIKE '%\_%'` cherche les valeurs qui contiennent un vrai tiret bas. Le cas est rare, mais il arrive avec des noms de fichiers ou des identifiants.

---

### 5. IS NULL : tester l'absence de valeur

#### 5.1 IS NULL et IS NOT NULL

Comme on l'a vu en 2.A, `email = NULL` ne fonctionne pas. Pour tester l'absence de valeur, on utilise `IS NULL`, et son contraire `IS NOT NULL` :

```sql
-- Les élèves qui n'ont pas renseigné de téléphone
SELECT first_name, last_name
FROM student
WHERE phone_number IS NULL;
```

Résultat : Lucas Moreira.

```sql
-- Les élèves qui ont une moyenne (donc au moins une note)
SELECT first_name, last_name, average_grade
FROM student
WHERE average_grade IS NOT NULL;
```

Résultat : 38 élèves sur 42.

#### 5.2 NULL dans une condition

Une comparaison avec `NULL` n'est ni vraie, ni fausse : elle est **inconnue**, et la ligne est écartée. Conséquence importante :

```sql
SELECT first_name, last_name, average_grade
FROM student
WHERE average_grade < 12;
```

Cette requête ne renvoie que **3 élèves** (David Berger, Jules Gautier, Théo Lefevre). Les 4 élèves qui n'ont **aucune** moyenne n'y sont pas : on ne peut pas dire que `NULL < 12`. Et ils ne sont pas non plus dans `average_grade >= 12` ! Une ligne avec `NULL` échappe aux **deux** conditions.

Si on veut les inclure, il faut le demander explicitement :

```sql
WHERE average_grade < 12 OR average_grade IS NULL
```

> **À retenir** : `NULL` ne s'utilise jamais avec `=`, `<>`, `<`, `>`… mais uniquement avec `IS NULL` et `IS NOT NULL`.

**Pratiquons !!**

Rdv au fichier `2-exercices.md`, niveau 5.

---

### 6. Les fonctions

Une **fonction** prend une ou plusieurs valeurs **en entrée** (entre parenthèses) et renvoie un résultat. On peut l'utiliser dans le `SELECT` (pour transformer l'affichage), dans le `WHERE` (pour filtrer) et dans le `ORDER BY` (pour trier).

Les fonctions **ne modifient jamais les données** de la table : elles transforment seulement le résultat affiché.

Les noms de fonctions présentés ici sont ceux de **MySQL**. Les autres SGBD proposent des fonctions équivalentes, mais leur nom ou leur syntaxe peuvent changer.

#### 6.1 Fonctions sur le texte

| Fonction | Rôle | Exemple | Résultat |
|---|---|---|---|
| `CONCAT(a, b, …)` | Coller plusieurs textes | `CONCAT(first_name, ' ', last_name)` | `Alice Dupont` |
| `UPPER(texte)` | Mettre en majuscules | `UPPER(last_name)` | `DUPONT` |
| `LOWER(texte)` | Mettre en minuscules | `LOWER(city)` | `paris` |
| `CHAR_LENGTH(texte)` | Nombre de caractères | `CHAR_LENGTH('Léo')` | `3` |
| `LEFT(texte, n)` | Les `n` premiers caractères | `LEFT(first_name, 1)` | `A` |
| `RIGHT(texte, n)` | Les `n` derniers caractères | `RIGHT(phone_number, 2)` | `04` |
| `SUBSTRING(texte, début, n)` | `n` caractères à partir de la position `début` (la première est 1) | `SUBSTRING(phone_number, 3, 2)` | `01` |
| `REPLACE(texte, a, b)` | Remplacer `a` par `b` | `REPLACE(email, '@mail.com', '@ecole.fr')` | `alice.dupont@ecole.fr` |
| `TRIM(texte)` | Retirer les espaces au début et à la fin | `TRIM('  Lyon ')` | `Lyon` |

On peut **imbriquer** les fonctions : le résultat de l'une sert d'entrée à l'autre.

```sql
-- Nom d'affichage : initiale du prénom, puis nom en majuscules
SELECT CONCAT(LEFT(first_name, 1), '. ', UPPER(last_name)) AS nom_affiche, city
FROM student;
```

| nom_affiche | city |
|---|---|
| A. DUPONT | Paris |
| B. MARTIN | Toulouse |
| C. LEMOINE | Lyon |
| … | … |

> **`LENGTH` ou `CHAR_LENGTH` ?** MySQL propose aussi `LENGTH`, qui compte les **octets** et non les caractères. Les lettres accentuées occupent 2 octets : `LENGTH('Léo')` vaut **4**, et `LENGTH('Frédéric')` vaut **10**. Pour compter des lettres, utilisez toujours `CHAR_LENGTH`.

> **`CONCAT` et `NULL`** : si une seule des valeurs vaut `NULL`, tout le résultat vaut `NULL`. `CONCAT(first_name, ' : ', email)` donne `NULL` pour Léo Benoit, qui n'a pas d'email.

#### 6.2 Fonctions sur les nombres

| Fonction | Rôle | Exemple | Résultat |
|---|---|---|---|
| `ROUND(n, d)` | Arrondir à `d` décimales (0 par défaut) | `ROUND(14.83, 1)` | `14.8` |
| `FLOOR(n)` | Arrondir à l'entier inférieur | `FLOOR(14.83)` | `14` |
| `CEIL(n)` | Arrondir à l'entier supérieur | `CEIL(14.83)` | `15` |
| `TRUNCATE(n, d)` | Couper à `d` décimales, sans arrondir | `TRUNCATE(14.89, 1)` | `14.8` |
| `ABS(n)` | Valeur absolue | `ABS(-3)` | `3` |

```sql
SELECT first_name, last_name, average_grade, ROUND(average_grade, 1) AS moyenne_arrondie
FROM student;
```

| first_name | last_name | average_grade | moyenne_arrondie |
|---|---|---|---|
| Alice | Dupont | 14.83 | 14.8 |
| Bob | Martin | 12.35 | 12.4 |
| Claire | Lemoine | 17.10 | 17.1 |
| David | Berger | 9.75 | 9.8 |
| … | … | … | … |

#### 6.3 Remplacer un NULL : IFNULL et COALESCE

`IFNULL(valeur, remplacement)` renvoie la valeur si elle existe, et le remplacement si elle vaut `NULL` :

```sql
SELECT first_name, last_name, IFNULL(email, 'non renseigné') AS email
FROM student;
```

| first_name | last_name | email |
|---|---|---|
| … | … | … |
| Léo | Benoit | non renseigné |
| Mia | Bouvier | mia.bouvier@mail.com |
| … | … | … |

`COALESCE(a, b, c, …)` fait la même chose avec autant de valeurs qu'on veut : elle renvoie **la première qui n'est pas `NULL`**. Par exemple, `COALESCE(email, phone_number, 'aucun contact')` affiche l'email, ou à défaut le téléphone, ou à défaut le texte. `COALESCE` est la version standard du SQL, `IFNULL` est propre à MySQL.

#### 6.4 Fonctions sur les dates

| Fonction | Rôle | Exemple | Résultat |
|---|---|---|---|
| `CURDATE()` | La date du jour | `CURDATE()` | `2026-11-11` |
| `NOW()` | La date et l'heure actuelles | `NOW()` | `2026-11-11 15:30:00` |
| `YEAR(d)`, `MONTH(d)`, `DAY(d)` | L'année, le mois, le jour | `YEAR('2004-11-04')` | `2004` |
| `DATE_FORMAT(d, format)` | Afficher une date au format voulu | `DATE_FORMAT(birth_date, '%d/%m/%Y')` | `04/11/2004` |
| `DATEDIFF(d1, d2)` | Nombre de **jours** entre deux dates | `DATEDIFF('2026-11-11', '2026-11-01')` | `10` |
| `TIMESTAMPDIFF(unité, d1, d2)` | Écart entre deux dates, dans l'unité voulue (`DAY`, `MONTH`, `YEAR`…) | `TIMESTAMPDIFF(YEAR, '2004-11-04', '2026-11-11')` | `22` |
| `DATE_ADD(d, INTERVAL n unité)` | Ajouter une durée à une date | `DATE_ADD('2025-09-01', INTERVAL 3 YEAR)` | `2028-09-01` |
| `DATE_SUB(d, INTERVAL n unité)` | Retirer une durée à une date | `DATE_SUB(CURDATE(), INTERVAL 30 DAY)` | il y a 30 jours |

Les principaux codes de `DATE_FORMAT` : `%d` jour, `%m` mois, `%Y` année sur 4 chiffres, `%y` sur 2 chiffres, `%H:%i` heure et minutes.

**Calculer un âge.** C'est l'exemple type de la donnée qu'on ne stocke pas (partie 4.A) : elle change chaque année. On stocke la date de naissance, et on calcule l'âge au moment de la requête :

```sql
SELECT first_name, last_name, birth_date,
       TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) AS age
FROM student;
```

Résultat le 11 novembre 2026 :

| first_name | last_name | birth_date | age |
|---|---|---|---|
| Alice | Dupont | 2004-11-04 | 22 |
| Bob | Martin | 2003-01-24 | 23 |
| Claire | Lemoine | 2002-05-08 | 24 |
| … | … | … | … |

Le résultat **dépend du jour** où la requête est exécutée : c'est justement ce qui garantit qu'il est toujours juste. `TIMESTAMPDIFF` tient compte du jour et du mois : Alice Dupont, née le 4 novembre, a eu 22 ans une semaine plus tôt.

> **Pourquoi pas `YEAR(CURDATE()) - YEAR(birth_date)` ?** Ce calcul ne regarde que les années : il vieillit d'un an, dès le 1er janvier, tous ceux dont l'anniversaire n'est pas encore passé.

> **Noms des jours et des mois** : `DATE_FORMAT` avec `%W` (jour) ou `%M` (mois) les affiche en anglais par défaut. Exécuter d'abord `SET lc_time_names = 'fr_FR';` les fait passer en français pour la session.

#### 6.5 Des fonctions dans WHERE et ORDER BY

Les fonctions ne servent pas qu'à l'affichage :

```sql
-- Les élèves nés en novembre, du plus jeune au plus âgé
SELECT first_name, last_name, birth_date
FROM student
WHERE MONTH(birth_date) = 11
ORDER BY birth_date DESC;
```

| first_name | last_name | birth_date |
|---|---|---|
| Alice | Dupont | 2004-11-04 |
| Océane | Lemoine | 2001-11-20 |
| François | Petit | 1995-11-24 |
| Théodore | Chavanne | 1995-11-08 |

```sql
-- Les notes obtenues en 2025 (49 notes)
SELECT student_id, subject_id, grade, note_date
FROM note
WHERE YEAR(note_date) = 2025;
```

```sql
-- Les élèves d'au moins 30 ans
SELECT first_name, last_name, TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) AS age
FROM student
WHERE TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) >= 30;
```

On retrouve ici la règle vue en 2.A : l'alias `age` n'existe pas encore au moment du `WHERE`, il faut donc **répéter le calcul**.

---

### 7. Des conditions dans le résultat : CASE

#### 7.1 Principe

`CASE` permet d'afficher une valeur **différente selon une condition**, comme un `if … else if … else` en programmation :

```sql
CASE
    WHEN condition_1 THEN valeur_1
    WHEN condition_2 THEN valeur_2
    ELSE valeur_par_défaut
END
```

Les conditions sont testées **dans l'ordre** : dès qu'une est vraie, MySQL prend sa valeur et ignore les suivantes. Si aucune n'est vraie, il prend la valeur du `ELSE` (ou `NULL` s'il n'y a pas de `ELSE`).

```sql
-- La mention de chaque élève
SELECT first_name, last_name, average_grade,
       CASE
           WHEN average_grade IS NULL THEN 'Pas de note'
           WHEN average_grade >= 16 THEN 'Très bien'
           WHEN average_grade >= 14 THEN 'Bien'
           WHEN average_grade >= 12 THEN 'Assez bien'
           WHEN average_grade >= 10 THEN 'Passable'
           ELSE 'Insuffisant'
       END AS mention
FROM student;
```

| first_name | last_name | average_grade | mention |
|---|---|---|---|
| Alice | Dupont | 14.83 | Bien |
| Bob | Martin | 12.35 | Assez bien |
| David | Berger | 9.75 | Insuffisant |
| Noah | Brunet | 18.40 | Très bien |
| Sébastien | Vidal | *NULL* | Pas de note |
| … | … | … | … |

Deux remarques sur cet exemple :

- **L'ordre des `WHEN` compte.** Noah Brunet (18.40) vérifie aussi `>= 14` et `>= 12`, mais c'est la **première** condition vraie (`>= 16`) qui l'emporte. Si on écrivait `>= 10` en premier, tout le monde aurait « Passable ».
- **Le test `IS NULL` est placé en premier.** Sans lui, les élèves sans note tomberaient dans le `ELSE` et recevraient « Insuffisant », ce qui serait faux.

#### 7.2 CASE sur une valeur

Quand on compare une **même colonne** à plusieurs valeurs, une forme plus courte existe :

```sql
SELECT first_name, last_name,
       CASE city
           WHEN 'Paris' THEN 'Île-de-France'
           WHEN 'Lyon' THEN 'Auvergne-Rhône-Alpes'
           WHEN 'Toulouse' THEN 'Occitanie'
           WHEN 'Rennes' THEN 'Bretagne'
       END AS region
FROM student;
```

#### 7.3 IF : le cas à deux branches

Pour un simple choix entre deux valeurs, MySQL propose la fonction `IF(condition, si_vrai, si_faux)` :

```sql
SELECT first_name, last_name, IF(average_grade >= 10, 'Admis', 'Non admis') AS resultat
FROM student;
```

`IF` est propre à MySQL. `CASE` est standard et fonctionne dans tous les SGBD.

**Pratiquons !!**

Rdv au fichier `2-exercices.md`, niveau 6.

---

### 8. En résumé

| Besoin | Syntaxe |
|---|---|
| Toutes les conditions | `condition1 AND condition2` |
| Au moins une condition | `condition1 OR condition2` |
| Inverser une condition | `NOT condition` |
| Une valeur parmi une liste | `colonne IN (v1, v2, v3)` / `NOT IN` |
| Une valeur dans un intervalle (bornes incluses) | `colonne BETWEEN min AND max` / `NOT BETWEEN` |
| Un motif | `colonne LIKE 'Du%'` / `NOT LIKE` (`%` = plusieurs caractères, `_` = un caractère) |
| Absence de valeur | `colonne IS NULL` / `IS NOT NULL` |
| Remplacer un NULL | `IFNULL(colonne, remplacement)`, `COALESCE(a, b, …)` |
| Une valeur selon une condition | `CASE WHEN … THEN … ELSE … END`, `IF(condition, a, b)` |

- `AND` est évalué **avant** `OR` : dès qu'on les mélange, on met des **parenthèses**.
- Une condition sur une valeur `NULL` n'est jamais vraie : seuls `IS NULL` et `IS NOT NULL` permettent de la tester.
- Les **fonctions** transforment l'affichage sans modifier les données, et s'utilisent aussi dans `WHERE` et `ORDER BY`.
- Une donnée calculable (comme l'âge) ne se stocke pas : on la **calcule** dans la requête.

---

*Sources :*
*- Julien POIRIER*
*- sql.sh*
*- dev.mysql.com*

---

© Vincent Chiofalo

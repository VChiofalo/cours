# Corrections – Partie 2 : Interroger les données

Les résultats indiqués ont été obtenus avec la base `scholar` fournie. Quand une requête dépend de la date du jour (`CURDATE()`), le résultat est donné au 11 novembre 2026.

L'ordre des lignes n'est garanti que lorsque la requête contient un `ORDER BY`, et seulement entre lignes de valeurs différentes : MySQL peut afficher les autres dans un ordre différent de celui indiqué ici.

---

## Niveau 1 : Filtrer avec WHERE

- Afficher le nom et le prénom de tous les élèves.
```sql
SELECT last_name, first_name
FROM student;
```

Résultat : **42 lignes**.

- Afficher toutes les données des élèves dont le prénom est « Alice ».
```sql
SELECT *
FROM student
WHERE first_name = 'Alice';
```

Résultat : **2 lignes**.

| student_id | first_name | last_name | birth_date | average_grade | email | phone_number | city |
|---|---|---|---|---|---|---|---|
| 1 | Alice | Dupont | 2004-11-04 | 14.83 | alice.dupont@mail.com | 0601020304 | Paris |
| 20 | Alice | Lemoine | 2004-03-23 | 12.17 | alice.lemoine@mail.com | 0612345678 | Paris |

> Le texte s'écrit entre **apostrophes**, jamais entre backticks : `` `Alice` `` désignerait une colonne.

- Afficher le nom, le prénom et la moyenne des élèves dont le nom de famille est « Lemoine ».
```sql
SELECT last_name, first_name, average_grade
FROM student
WHERE last_name = 'Lemoine';
```

Résultat : **5 lignes**.

| last_name | first_name | average_grade |
|---|---|---|
| Lemoine | Claire | 17.10 |
| Lemoine | Paul | 14.67 |
| Lemoine | Alice | 12.17 |
| Lemoine | Océane | 15.50 |
| Lemoine | Yasmine | *NULL* |

> Yasmine Lemoine n'a pas encore de note : sa moyenne vaut `NULL`.

- Afficher le prénom, le nom et la ville des élèves qui habitent à Rennes.
```sql
SELECT first_name, last_name, city
FROM student
WHERE city = 'Rennes';
```

Résultat : **10 lignes**.

- Afficher le prénom, le nom et la moyenne des élèves qui ont au moins 16 de moyenne.
```sql
SELECT first_name, last_name, average_grade
FROM student
WHERE average_grade >= 16;
```

Résultat : **8 lignes**.

> « Au moins 16 » se traduit par `>=`. Avec `>`, les élèves qui ont 16.00 pile disparaîtraient.

- Afficher le prénom, le nom et la ville des élèves qui n'habitent pas à Paris.
```sql
SELECT first_name, last_name, city
FROM student
WHERE city <> 'Paris';
```

Résultat : **31 lignes**.

> `!=` est aussi accepté par MySQL.

- Afficher le prénom, le nom et la date de naissance des élèves nés avant le 1er janvier 2000.
```sql
SELECT first_name, last_name, birth_date
FROM student
WHERE birth_date < '2000-01-01';
```

Résultat : **14 lignes**.

> Une date s'écrit entre apostrophes, au format `'AAAA-MM-JJ'`. « Avant » une date signifie « plus petite » : ce sont les élèves les plus âgés.

- Afficher toutes les données de l'élève dont le nom de famille est « N'Diaye ».
```sql
SELECT *
FROM student
WHERE last_name = 'N''Diaye';
```

Résultat : **1 ligne**.

| student_id | first_name | last_name | birth_date | average_grade | email | phone_number | city |
|---|---|---|---|---|---|---|---|
| 41 | Ibrahima | N'Diaye | 2002-02-13 | 13.75 | ibrahima.ndiaye@mail.com | 0612345699 | Paris |

> L'apostrophe du nom doit être **doublée** (`'N''Diaye'`) ou échappée avec un antislash (`'N\'Diaye'`). Sans cela : erreur `#1064`.

- Afficher toutes les notes strictement inférieures à 10.
```sql
SELECT *
FROM note
WHERE grade < 10;
```

Résultat : **2 lignes**.

| note_id | student_id | subject_id | grade | note_date |
|---|---|---|---|---|
| 12 | 4 | 5 | 9 | 2025-06-30 |
| 47 | 19 | 2 | 9 | 2024-10-22 |

- Afficher le nom des matières du département n°1.
```sql
SELECT subject_name
FROM subject
WHERE department_id = 1;
```

Résultat : **2 lignes**.

| subject_name |
|---|
| Programmation |
| Réseaux |

## Niveau 2 : Trier et limiter avec ORDER BY et LIMIT

- Afficher le nom, le prénom et la moyenne des élèves, triés par ordre alphabétique du nom de famille.
```sql
SELECT last_name, first_name, average_grade
FROM student
ORDER BY last_name ASC;
```

Résultat : **42 lignes**.

> Pour départager les homonymes (les 5 Lemoine), on peut ajouter un second critère : `ORDER BY last_name ASC, first_name ASC`.

- Afficher le nom, le prénom et la moyenne des 10 élèves ayant la moyenne la plus haute, triés par moyenne décroissante.
```sql
SELECT last_name, first_name, average_grade
FROM student
ORDER BY average_grade DESC
LIMIT 10;
```

Résultat : **10 lignes**.

> Les `NULL` arrivent en dernier dans un tri décroissant : ils ne gênent pas ici.

- Afficher le nom, le prénom et la moyenne des 10 élèves ayant la moyenne la plus basse, triés par moyenne croissante.
```sql
SELECT last_name, first_name, average_grade
FROM student
ORDER BY average_grade ASC
LIMIT 10;
```

Résultat : **10 lignes**.

> **Piège** : les 4 élèves sans moyenne (`NULL`) arrivent **en premier** dans un tri croissant, et occupent 4 des 10 places. Pour les écarter, il faut `WHERE average_grade IS NOT NULL` (vu en partie 2.B : voir niveau 5).

- Afficher le nom, le prénom et la moyenne de l'élève ayant la moyenne la plus haute.
```sql
SELECT last_name, first_name, average_grade
FROM student
ORDER BY average_grade DESC
LIMIT 1;
```

Résultat : **1 ligne**.

| last_name | first_name | average_grade |
|---|---|---|
| Brunet | Noah | 18.40 |

> `SELECT last_name, first_name, MAX(average_grade) FROM student` est **faux** : selon la configuration, MySQL refuse la requête (`#1140`) ou affiche un nom quelconque à côté de la note maximale. Une autre solution, avec une sous-requête, est au niveau 10.

- Afficher le prénom, le nom et la date de naissance des 5 élèves les plus jeunes.
```sql
SELECT first_name, last_name, birth_date
FROM student
ORDER BY birth_date DESC
LIMIT 5;
```

Résultat : **5 lignes**.

| first_name | last_name | birth_date |
|---|---|---|
| Rachelle | Petit | 2007-08-19 |
| Eva | Dufresne | 2006-12-04 |
| Clara | Garcia | 2006-04-28 |
| Mia | Bouvier | 2005-10-01 |
| Giselle | Roche | 2005-09-03 |

> Les plus jeunes sont nés le plus **récemment** : tri décroissant sur la date de naissance.

- Afficher les 3 notes les plus récentes (toutes les colonnes de la table `note`).
```sql
SELECT *
FROM note
ORDER BY note_date DESC
LIMIT 3;
```

Résultat : **3 lignes**.

| note_id | student_id | subject_id | grade | note_date |
|---|---|---|---|---|
| 42 | 16 | 3 | 17 | 2026-06-30 |
| 37 | 14 | 7 | 16.50 | 2026-06-29 |
| 44 | 17 | 5 | 12.50 | 2026-06-28 |

- Afficher le prénom, le nom et la ville des élèves, triés par ville, puis par nom de famille, puis par prénom.
```sql
SELECT first_name, last_name, city
FROM student
ORDER BY city ASC, last_name ASC, first_name ASC;
```

Résultat : **42 lignes**.

- Afficher le prénom et le nom des élèves, triés par nom de famille, en ne montrant que les élèves n°11 à 20 de cette liste.
```sql
SELECT first_name, last_name
FROM student
ORDER BY last_name ASC, first_name ASC
LIMIT 10 OFFSET 10;
```

Résultat : **10 lignes**.

> On saute les 10 premiers (`OFFSET 10`) et on en garde 10 (`LIMIT 10`). C'est le principe de la pagination. Le second critère de tri (`first_name`) rend l'ordre des homonymes prévisible.

## Niveau 3 : Supprimer les doublons et renommer avec DISTINCT et AS

- Afficher la liste des villes des élèves, sans doublon.
```sql
SELECT DISTINCT city
FROM student;
```

Résultat : **4 lignes**.

| city |
|---|
| Paris |
| Toulouse |
| Lyon |
| Rennes |

- Afficher la liste des noms de famille des élèves, sans doublon, par ordre alphabétique.
```sql
SELECT DISTINCT last_name
FROM student
ORDER BY last_name ASC;
```

Résultat : **36 lignes**.

- Afficher les numéros des matières dans lesquelles au moins une note a été attribuée, sans doublon.
```sql
SELECT DISTINCT subject_id
FROM note
ORDER BY subject_id;
```

Résultat : **8 lignes**.

- Afficher toutes les données des élèves, en renommant les colonnes en français (sans accents).
```sql
SELECT student_id AS id,
       first_name AS prenom,
       last_name AS nom,
       birth_date AS date_naissance,
       average_grade AS moyenne,
       email AS mail,
       phone_number AS telephone,
       city AS ville
FROM student;
```

Résultat : **42 lignes**.

- Afficher le prénom, le nom et la moyenne de chaque élève ramenée sur 100, dans une colonne nommée `moyenne_sur_100`.
```sql
SELECT first_name, last_name, average_grade * 5 AS moyenne_sur_100
FROM student;
```

Résultat : **42 lignes**.

- Afficher le prénom, le nom et la date de naissance des élèves, avec une colonne nommée « date de naissance » (avec les espaces).
```sql
SELECT first_name AS prenom, last_name AS nom, birth_date AS `date de naissance`
FROM student;
```

Résultat : **42 lignes**.

> Un alias qui contient des espaces doit être entouré de **backticks**.

- Afficher le prénom, le nom et la moyenne sur 100 des élèves, triés de la meilleure à la moins bonne moyenne sur 100, en utilisant l'alias dans le tri.
```sql
SELECT first_name, last_name, average_grade * 5 AS moyenne_sur_100
FROM student
ORDER BY moyenne_sur_100 DESC;
```

Résultat : **42 lignes**.

> Un alias est utilisable dans `ORDER BY`, mais **pas** dans `WHERE`.

---

## Niveau 4 : Combiner des conditions : AND, OR, NOT, IN, BETWEEN

- Afficher le prénom, le nom et la moyenne des élèves de Lyon qui ont au moins 15 de moyenne.
```sql
SELECT first_name, last_name, average_grade
FROM student
WHERE city = 'Lyon' AND average_grade >= 15;
```

Résultat : **5 lignes**.

| first_name | last_name | average_grade |
|---|---|---|
| Claire | Lemoine | 17.10 |
| François | Petit | 15.25 |
| Sophie | Jacques | 17 |
| Frédéric | Vallet | 17.10 |
| Clara | Garcia | 15 |

- Afficher le prénom, le nom, la ville et la moyenne des élèves qui habitent à Lyon ou à Paris et qui ont plus de 16 de moyenne.
```sql
SELECT first_name, last_name, city, average_grade
FROM student
WHERE (city = 'Lyon' OR city = 'Paris') AND average_grade > 16;
```

Résultat : **7 lignes**.

> **Les parenthèses sont indispensables.** Sans elles, `AND` est évalué avant `OR` : la requête renverrait **tous** les élèves de Lyon, plus ceux de Paris qui ont plus de 16 (15 lignes au lieu de 7).

- Afficher le nom, le prénom et la moyenne des élèves dont la moyenne est comprise entre 8 et 11.
```sql
SELECT last_name, first_name, average_grade
FROM student
WHERE average_grade BETWEEN 8 AND 11;
```

Résultat : **2 lignes**.

| last_name | first_name | average_grade |
|---|---|---|
| Berger | David | 9.75 |
| Lefevre | Théo | 10.67 |

> Les bornes de `BETWEEN` sont **incluses**. Équivalent : `WHERE average_grade >= 8 AND average_grade <= 11`.

- Afficher le nom, le prénom et le numéro de téléphone des élèves dont le nom est Bouvier, Lemoine ou Dupuis.
```sql
SELECT last_name, first_name, phone_number
FROM student
WHERE last_name IN ('Bouvier', 'Lemoine', 'Dupuis');
```

Résultat : **7 lignes**.

- Afficher le nom, le prénom et le numéro de téléphone des élèves dont le numéro de téléphone n'est ni 0605060708, ni 0605566778.
```sql
SELECT last_name, first_name, phone_number
FROM student
WHERE phone_number NOT IN ('0605060708', '0605566778');
```

Résultat : **39 lignes**.

> Les numéros de téléphone sont stockés comme du **texte** (`VARCHAR`) : apostrophes obligatoires, sinon le 0 initial serait perdu. Lucas Moreira, qui n'a pas de téléphone (`NULL`), n'apparaît pas : une comparaison avec `NULL` n'est jamais vraie.

- Afficher le prénom, le nom et la date de naissance des élèves nés en 2004.
```sql
SELECT first_name, last_name, birth_date
FROM student
WHERE birth_date BETWEEN '2004-01-01' AND '2004-12-31';
```

Résultat : **4 lignes**.

| first_name | last_name | birth_date |
|---|---|---|
| Alice | Dupont | 2004-11-04 |
| Alice | Lemoine | 2004-03-23 |
| Léa | Leblanc | 2004-02-13 |
| Yasmine | Lemoine | 2004-05-03 |

- Afficher toutes les notes attribuées au premier trimestre 2026 (de janvier à mars inclus).
```sql
SELECT *
FROM note
WHERE note_date BETWEEN '2026-01-01' AND '2026-03-31'
ORDER BY note_date;
```

Résultat : **17 lignes**.

- Afficher le prénom, le nom, la ville et la moyenne des élèves qui n'habitent ni à Paris ni à Toulouse, et qui ont plus de 14 de moyenne.
```sql
SELECT first_name, last_name, city, average_grade
FROM student
WHERE city NOT IN ('Paris', 'Toulouse') AND average_grade > 14;
```

Résultat : **13 lignes**.

- Afficher le prénom, le nom et la moyenne des élèves dont la moyenne n'est pas comprise entre 10 et 16.
```sql
SELECT first_name, last_name, average_grade
FROM student
WHERE average_grade NOT BETWEEN 10 AND 16;
```

Résultat : **9 lignes**.

> Les élèves sans moyenne (`NULL`) ne sont pas dans le résultat : ni `BETWEEN`, ni `NOT BETWEEN` ne sont vrais pour eux.

## Niveau 5 : Rechercher un motif et tester l'absence de valeur : LIKE, IS NULL

- Afficher le nom et le prénom de tous les élèves dont le nom de famille commence par la lettre « C ».
```sql
SELECT last_name, first_name
FROM student
WHERE last_name LIKE 'C%';
```

Résultat : **2 lignes**.

| last_name | first_name |
|---|---|
| Chauvet | Dylan |
| Chavanne | Théodore |

- Afficher le nom et le prénom de tous les élèves dont le nom de famille se termine par la lettre « a ».
```sql
SELECT last_name, first_name
FROM student
WHERE last_name LIKE '%a';
```

Résultat : **2 lignes**.

| last_name | first_name |
|---|---|
| Garcia | Clara |
| Moreira | Lucas |

- Afficher le nom et le prénom de tous les élèves dont le nom de famille contient la lettre « e ».
```sql
SELECT last_name, first_name
FROM student
WHERE last_name LIKE '%e%';
```

Résultat : **31 lignes**.

- Afficher le nom, le prénom et la moyenne de tous les élèves dont le nom de famille contient la lettre « e » et qui ont plus de 15 de moyenne.
```sql
SELECT last_name, first_name, average_grade
FROM student
WHERE last_name LIKE '%e%' AND average_grade > 15;
```

Résultat : **11 lignes**.

- Afficher le nom et le prénom de tous les élèves dont le prénom commence par la lettre « C » et se termine par la lettre « a ».
```sql
SELECT last_name, first_name
FROM student
WHERE first_name LIKE 'C%a';
```

Résultat : **1 ligne**.

| last_name | first_name |
|---|---|
| Garcia | Clara |

> Un seul motif suffit : `'C%a'`. Équivalent : `first_name LIKE 'C%' AND first_name LIKE '%a'`. Attention à bien filtrer sur `first_name` et non `last_name`.

- Afficher le prénom et le nom des élèves dont le prénom compte exactement 4 lettres.
```sql
SELECT first_name, last_name
FROM student
WHERE first_name LIKE '____';
```

Résultat : **6 lignes**.

| first_name | last_name |
|---|---|
| Hugo | Renard |
| Noah | Brunet |
| Paul | Lemoine |
| Théo | Lefevre |
| Hugo | Tissot |
| Inès | Gallet |

> Quatre `_`, un par caractère. Une autre solution, avec une fonction, est au niveau 6 : `CHAR_LENGTH(first_name) = 4`.

- Afficher le nom et le prénom des élèves qui n'ont pas renseigné leur adresse email.
```sql
SELECT last_name, first_name
FROM student
WHERE email IS NULL;
```

Résultat : **5 lignes**.

| last_name | first_name |
|---|---|
| Benoit | Léo |
| Lemoine | Paul |
| Dupuis | Charlotte |
| Leblanc | Léa |
| Dumas | Maxime |

> `WHERE email = NULL` ne renvoie **aucune** ligne : il faut `IS NULL`.

- Afficher le nom, le prénom et l'email des élèves qui ont bien renseigné leur adresse email.
```sql
SELECT last_name, first_name, email
FROM student
WHERE email IS NOT NULL;
```

Résultat : **37 lignes**.

- Afficher le prénom et le nom des élèves à qui il manque un moyen de contact (pas d'email, ou pas de téléphone).
```sql
SELECT first_name, last_name, email, phone_number
FROM student
WHERE email IS NULL OR phone_number IS NULL;
```

Résultat : **6 lignes**.

| first_name | last_name | email | phone_number |
|---|---|---|---|
| Léo | Benoit | *NULL* | 0601121314 |
| Paul | Lemoine | *NULL* | 0605566778 |
| Charlotte | Dupuis | *NULL* | 0612345680 |
| Léa | Leblanc | *NULL* | 0612345689 |
| Maxime | Dumas | *NULL* | 0612345693 |
| Lucas | Moreira | lucas.moreira@mail.com | *NULL* |

- Reprendre l'exercice du niveau 2 : afficher le nom, le prénom et la moyenne des 10 élèves ayant la moyenne la plus basse, en écartant cette fois les élèves qui n'ont pas de moyenne.
```sql
SELECT last_name, first_name, average_grade
FROM student
WHERE average_grade IS NOT NULL
ORDER BY average_grade ASC
LIMIT 10;
```

Résultat : **10 lignes**.

## Niveau 6 : Utiliser des fonctions et CASE

- Afficher le nom complet de chaque élève (prénom et nom séparés par un espace) dans une colonne nommée `nom_complet`, ainsi que sa ville.
```sql
SELECT CONCAT(first_name, ' ', last_name) AS nom_complet, city
FROM student;
```

Résultat : **42 lignes**.

- Afficher le nom de famille des élèves en majuscules, suivi de leur prénom, triés par nom.
```sql
SELECT UPPER(last_name) AS nom, first_name AS prenom
FROM student
ORDER BY last_name;
```

Résultat : **42 lignes**.

- Afficher pour chaque élève ses initiales (par exemple « A.D. » pour Alice Dupont), dans une colonne nommée `initiales`.
```sql
SELECT first_name, last_name,
       CONCAT(LEFT(first_name, 1), '.', LEFT(last_name, 1), '.') AS initiales
FROM student;
```

Résultat : **42 lignes**.

- Afficher le prénom, le nom et la longueur du nom de famille (en nombre de lettres) des élèves, du nom le plus long au plus court.
```sql
SELECT first_name, last_name, CHAR_LENGTH(last_name) AS longueur
FROM student
ORDER BY longueur DESC;
```

Résultat : **42 lignes**.

> `LENGTH` compterait les **octets** : une lettre accentuée en occupe 2. Pour compter des lettres, on utilise `CHAR_LENGTH`.

- Afficher le prénom, le nom et la date de naissance des élèves, la date étant au format JJ/MM/AAAA.
```sql
SELECT first_name, last_name, DATE_FORMAT(birth_date, '%d/%m/%Y') AS date_naissance
FROM student;
```

Résultat : **42 lignes**.

- Afficher le prénom, le nom et l'âge de chaque élève, du plus âgé au plus jeune.
```sql
SELECT first_name, last_name, TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) AS age
FROM student
ORDER BY birth_date ASC;
```

Résultat : **42 lignes**.

> Le résultat dépend du jour d'exécution. Trier sur `birth_date ASC` ou sur `age DESC` donne le même ordre (à l'ordre des ex aequo près). `YEAR(CURDATE()) - YEAR(birth_date)` est faux : il ne tient pas compte des anniversaires pas encore passés dans l'année.

- Afficher le nom, le prénom et l'âge des élèves dont l'âge n'est pas compris entre 23 et 30 ans.
```sql
SELECT last_name, first_name, TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) AS age
FROM student
WHERE TIMESTAMPDIFF(YEAR, birth_date, CURDATE()) NOT BETWEEN 23 AND 30;
```

Résultat : **17 lignes**.

> L'alias `age` n'existe pas encore dans le `WHERE` : il faut **répéter le calcul**. Le nombre de lignes dépend du jour d'exécution (résultat ci-dessous au 11 novembre 2026).

- Afficher le prénom, le nom et la date de naissance des élèves nés en novembre.
```sql
SELECT first_name, last_name, birth_date
FROM student
WHERE MONTH(birth_date) = 11;
```

Résultat : **4 lignes**.

| first_name | last_name | birth_date |
|---|---|---|
| Alice | Dupont | 2004-11-04 |
| François | Petit | 1995-11-24 |
| Océane | Lemoine | 2001-11-20 |
| Théodore | Chavanne | 1995-11-08 |

> Pour les élèves nés le mois en cours, quel qu'il soit : `WHERE MONTH(birth_date) = MONTH(CURDATE())`.

- Afficher le prénom, le nom et la moyenne arrondie à l'entier le plus proche de chaque élève.
```sql
SELECT first_name, last_name, ROUND(average_grade) AS moyenne_arrondie
FROM student;
```

Résultat : **42 lignes**.

- Afficher le prénom, le nom et l'email des élèves, en affichant « non renseigné » à la place des emails manquants.
```sql
SELECT first_name, last_name, IFNULL(email, 'non renseigné') AS email
FROM student;
```

Résultat : **42 lignes**.

> `COALESCE(email, 'non renseigné')` donne le même résultat.

- Afficher le prénom, le nom, la moyenne et la mention de chaque élève : « Très bien » à partir de 16, « Bien » à partir de 14, « Assez bien » à partir de 12, « Passable » à partir de 10, « Insuffisant » en dessous, et « Pas de note » pour les élèves sans moyenne.
```sql
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

Résultat : **42 lignes**.

> L'ordre des `WHEN` compte : du seuil le plus haut au plus bas. Le test `IS NULL` doit venir en premier, sinon les élèves sans note tomberaient dans le `ELSE` (« Insuffisant »).

- Afficher le prénom, le nom et la mention « Admis » ou « Non admis » de chaque élève ayant une moyenne, selon que sa moyenne atteint 10 ou non.
```sql
SELECT first_name, last_name, IF(average_grade >= 10, 'Admis', 'Non admis') AS resultat
FROM student
WHERE average_grade IS NOT NULL;
```

Résultat : **38 lignes**.

> Avec `CASE` : `CASE WHEN average_grade >= 10 THEN 'Admis' ELSE 'Non admis' END`.

---

## Niveau 7 : Calculer avec les fonctions d'agrégation

- Afficher le nombre d'élèves.
```sql
SELECT COUNT(*) AS nb_eleves
FROM student;
```

Résultat : **1 ligne**.

| nb_eleves |
|---|
| 42 |

- Afficher le nombre d'élèves dont la moyenne est supérieure à 14.
```sql
SELECT COUNT(*) AS nb_eleves
FROM student
WHERE average_grade > 14;
```

Résultat : **1 ligne**.

| nb_eleves |
|---|
| 21 |

- Afficher le nombre d'élèves dont la moyenne est comprise entre 8 et 11.
```sql
SELECT COUNT(*) AS nb_eleves
FROM student
WHERE average_grade BETWEEN 8 AND 11;
```

Résultat : **1 ligne**.

| nb_eleves |
|---|
| 2 |

- Afficher le nombre d'élèves qui ont renseigné leur email.
```sql
SELECT COUNT(email) AS nb_avec_email
FROM student;
```

Résultat : **1 ligne**.

| nb_avec_email |
|---|
| 37 |

> `COUNT(colonne)` ne compte que les valeurs non `NULL`. Équivalent : `SELECT COUNT(*) FROM student WHERE email IS NOT NULL`.

- Afficher le nombre de villes différentes dans lesquelles habitent les élèves.
```sql
SELECT COUNT(DISTINCT city) AS nb_villes
FROM student;
```

Résultat : **1 ligne**.

| nb_villes |
|---|
| 4 |

- Afficher la moyenne (arrondie à 2 décimales) des moyennes des élèves dont la moyenne est inférieure à 16.
```sql
SELECT ROUND(AVG(average_grade), 2) AS moyenne
FROM student
WHERE average_grade < 16;
```

Résultat : **1 ligne**.

| moyenne |
|---|
| 13.58 |

> Sans `ROUND`, MySQL affiche davantage de décimales.

- Afficher la note la plus haute et la note la plus basse jamais attribuées.
```sql
SELECT MAX(grade) AS note_max, MIN(grade) AS note_min
FROM note;
```

Résultat : **1 ligne**.

| note_max | note_min |
|---|---|
| 20 | 9 |

- Afficher la date de naissance de l'élève le plus âgé et celle de l'élève le plus jeune.
```sql
SELECT MIN(birth_date) AS plus_age, MAX(birth_date) AS plus_jeune
FROM student;
```

Résultat : **1 ligne**.

| plus_age | plus_jeune |
|---|---|
| 1994-01-01 | 2007-08-19 |

> Le plus âgé est né le plus tôt : c'est la date la plus **petite** (`MIN`).

- Afficher le nombre de notes attribuées en 2025.
```sql
SELECT COUNT(*) AS nb_notes
FROM note
WHERE YEAR(note_date) = 2025;
```

Résultat : **1 ligne**.

| nb_notes |
|---|
| 49 |

> Équivalent : `WHERE note_date BETWEEN '2025-01-01' AND '2025-12-31'`.

- Afficher le nombre de notes et la moyenne des notes (arrondie à 2 décimales) de la matière n°3.
```sql
SELECT COUNT(*) AS nb_notes, ROUND(AVG(grade), 2) AS moyenne
FROM note
WHERE subject_id = 3;
```

Résultat : **1 ligne**.

| nb_notes | moyenne |
|---|---|
| 14 | 15.34 |

- Afficher le nombre total de notes, et le nombre de notes supérieures ou égales à 15.
```sql
SELECT COUNT(*) AS nb_notes,
       SUM(CASE WHEN grade >= 15 THEN 1 ELSE 0 END) AS nb_notes_15_et_plus
FROM note;
```

Résultat : **1 ligne**.

| nb_notes | nb_notes_15_et_plus |
|---|---|
| 104 | 48 |

> Chaque note vaut 1 si elle respecte la condition, 0 sinon : la somme donne le nombre de notes qui la respectent.

## Niveau 8 : Regrouper avec GROUP BY et filtrer avec HAVING

- Afficher le nombre d'élèves par ville.
```sql
SELECT city, COUNT(*) AS nb_eleves
FROM student
GROUP BY city;
```

Résultat : **4 lignes**.

| city | nb_eleves |
|---|---|
| Lyon | 11 |
| Paris | 11 |
| Rennes | 10 |
| Toulouse | 10 |

- Afficher la moyenne (arrondie à 2 décimales) des élèves de chaque ville, de la meilleure ville à la moins bonne.
```sql
SELECT city, ROUND(AVG(average_grade), 2) AS moyenne
FROM student
GROUP BY city
ORDER BY moyenne DESC;
```

Résultat : **4 lignes**.

| city | moyenne |
|---|---|
| Lyon | 14.89 |
| Paris | 14.69 |
| Rennes | 14.24 |
| Toulouse | 13.35 |

- Afficher, pour chaque élève (numéro), son nombre de notes et sa note la plus haute.
```sql
SELECT student_id, COUNT(*) AS nb_notes, MAX(grade) AS meilleure_note
FROM note
GROUP BY student_id;
```

Résultat : **38 lignes**.

- Afficher le nombre d'élèves nés chaque année, de l'année la plus ancienne à la plus récente.
```sql
SELECT YEAR(birth_date) AS annee, COUNT(*) AS nb_eleves
FROM student
GROUP BY YEAR(birth_date)
ORDER BY annee;
```

Résultat : **14 lignes**.

- Afficher le nombre de notes attribuées chaque mois de l'année 2026.
```sql
SELECT MONTH(note_date) AS mois, COUNT(*) AS nb_notes
FROM note
WHERE YEAR(note_date) = 2026
GROUP BY MONTH(note_date)
ORDER BY mois;
```

Résultat : **6 lignes**.

- Afficher les villes qui comptent au moins 11 élèves.
```sql
SELECT city, COUNT(*) AS nb_eleves
FROM student
GROUP BY city
HAVING COUNT(*) >= 11;
```

Résultat : **2 lignes**.

| city | nb_eleves |
|---|---|
| Lyon | 11 |
| Paris | 11 |

> La condition porte sur un résultat de `COUNT` : c'est un `HAVING`, pas un `WHERE`.

- Afficher le numéro des élèves qui ont au moins 4 notes, avec leur nombre de notes.
```sql
SELECT student_id, COUNT(*) AS nb_notes
FROM note
GROUP BY student_id
HAVING COUNT(*) >= 4;
```

Résultat : **4 lignes**.

| student_id | nb_notes |
|---|---|
| 3 | 5 |
| 13 | 5 |
| 25 | 5 |
| 41 | 4 |

- Afficher le numéro des matières dont la moyenne des notes dépasse 15, avec cette moyenne arrondie à 2 décimales.
```sql
SELECT subject_id, ROUND(AVG(grade), 2) AS moyenne
FROM note
GROUP BY subject_id
HAVING AVG(grade) > 15;
```

Résultat : **2 lignes**.

| subject_id | moyenne |
|---|---|
| 3 | 15.34 |
| 7 | 15.22 |

- Afficher, pour chaque élève (numéro), le nombre de matières différentes dans lesquelles il a au moins une note.
```sql
SELECT student_id, COUNT(DISTINCT subject_id) AS nb_matieres
FROM note
GROUP BY student_id;
```

Résultat : **38 lignes**.

- Afficher les couples élève / matière (numéros) pour lesquels l'élève a plusieurs notes dans la matière, avec le nombre de notes.
```sql
SELECT student_id, subject_id, COUNT(*) AS nb_notes
FROM note
GROUP BY student_id, subject_id
HAVING COUNT(*) > 1;
```

Résultat : **22 lignes**.

- Parmi les élèves nés en 2003 ou après, afficher les villes qui en comptent au moins 4, avec leur nombre.
```sql
SELECT city, COUNT(*) AS nb_eleves
FROM student
WHERE birth_date >= '2003-01-01'
GROUP BY city
HAVING COUNT(*) >= 4;
```

Résultat : **2 lignes**.

| city | nb_eleves |
|---|---|
| Paris | 6 |
| Toulouse | 7 |

> `WHERE` filtre les **élèves** avant le regroupement, `HAVING` filtre les **villes** après.

---

## Niveau 9 : Interroger plusieurs tables avec les jointures

- Afficher le prénom, le nom et les spécialisations (départements) de tous les élèves inscrits.
```sql
SELECT s.first_name, s.last_name, d.department_name
FROM student s
INNER JOIN student_department sd ON s.student_id = sd.student_id
INNER JOIN department d ON sd.department_id = d.department_id;
```

Résultat : **41 lignes**.

> Le lien entre élève et département passe par la table d'association `student_department` : deux jointures sont nécessaires. Les élèves inscrits dans deux départements apparaissent deux fois, les 4 élèves sans inscription n'apparaissent pas.

- Afficher le prénom, le nom et les notes de **tous** les élèves, y compris ceux qui n'ont aucune note, en utilisant `LEFT JOIN`.
```sql
SELECT s.first_name, s.last_name, n.grade
FROM student s
LEFT JOIN note n ON s.student_id = n.student_id;
```

Résultat : **108 lignes**.

> 108 lignes : les 104 notes, plus une ligne avec `grade` à `NULL` pour chacun des 4 élèves sans note.

- Afficher tous les départements avec leurs matières, y compris les départements qui n'ont aucune matière, en utilisant `RIGHT JOIN`.
```sql
SELECT d.department_name, su.subject_name
FROM subject su
RIGHT JOIN department d ON su.department_id = d.department_id;
```

Résultat : **9 lignes**.

> La table à conserver entièrement (`department`) doit être à **droite** du `RIGHT JOIN`. Le département Physique apparaît avec `NULL` comme matière. Avec `LEFT JOIN`, on inverse simplement les tables : `FROM department d LEFT JOIN subject su ON …`.

- Afficher le prénom et le nom des élèves qui ne sont inscrits dans aucun département.
```sql
SELECT s.first_name, s.last_name
FROM student s
LEFT JOIN student_department sd ON s.student_id = sd.student_id
WHERE sd.student_id IS NULL;
```

Résultat : **4 lignes**.

| first_name | last_name |
|---|---|
| Sébastien | Vidal |
| Théodore | Chavanne |
| Yasmine | Lemoine |
| Lucas | Moreira |

- Afficher le nom des matières, la note et la date de chaque note d'Alice Dupont, de la plus ancienne à la plus récente.
```sql
SELECT su.subject_name, n.grade, n.note_date
FROM note n
INNER JOIN student s ON n.student_id = s.student_id
INNER JOIN subject su ON n.subject_id = su.subject_id
WHERE s.first_name = 'Alice' AND s.last_name = 'Dupont'
ORDER BY n.note_date;
```

Résultat : **3 lignes**.

| subject_name | grade | note_date |
|---|---|---|
| Programmation | 15 | 2025-12-15 |
| Réseaux | 14 | 2026-01-17 |
| Programmation | 15.50 | 2026-03-11 |

> Il y a deux Alice dans la base : filtrer sur le prénom seul ne suffit pas.

- Afficher le prénom, le nom, le nom de la matière et la note de chaque note attribuée, triés par note décroissante.
```sql
SELECT s.first_name, s.last_name, su.subject_name, n.grade
FROM note n
INNER JOIN student s ON n.student_id = s.student_id
INNER JOIN subject su ON n.subject_id = su.subject_id
ORDER BY n.grade DESC;
```

Résultat : **104 lignes**.

- Afficher le prénom, le nom et la moyenne des notes (arrondie à 2 décimales) de chaque élève, calculée à partir de la table `note`.
```sql
SELECT s.first_name, s.last_name, ROUND(AVG(n.grade), 2) AS moyenne
FROM student s
INNER JOIN note n ON s.student_id = n.student_id
GROUP BY s.student_id, s.first_name, s.last_name;
```

Résultat : **38 lignes**.

> On regroupe par `student_id` (deux élèves peuvent avoir le même nom) **et** par les colonnes affichées. On retrouve exactement la colonne `average_grade` de la table `student`.

- Afficher le nom de chaque département et le nombre d'élèves qui y sont inscrits, y compris les départements sans élève.
```sql
SELECT d.department_name, COUNT(sd.student_id) AS nb_eleves
FROM department d
LEFT JOIN student_department sd ON d.department_id = sd.department_id
GROUP BY d.department_id, d.department_name;
```

Résultat : **5 lignes**.

| department_name | nb_eleves |
|---|---|
| Informatique | 12 |
| Mathématiques | 11 |
| Biologie | 10 |
| Chimie | 8 |
| Physique | 0 |

> `LEFT JOIN` pour garder Physique, et `COUNT(sd.student_id)` pour qu'il affiche 0. Avec `COUNT(*)`, Physique afficherait 1.

- Afficher le nom de chaque matière et la moyenne de ses notes (arrondie à 2 décimales), de la meilleure à la moins bonne.
```sql
SELECT su.subject_name, ROUND(AVG(n.grade), 2) AS moyenne
FROM note n
INNER JOIN subject su ON n.subject_id = su.subject_id
GROUP BY su.subject_id, su.subject_name
ORDER BY moyenne DESC;
```

Résultat : **8 lignes**.

- Afficher le nom de chaque département et la moyenne (arrondie à 2 décimales) des notes obtenues dans ses matières.
```sql
SELECT d.department_name, ROUND(AVG(n.grade), 2) AS moyenne
FROM note n
INNER JOIN subject su ON n.subject_id = su.subject_id
INNER JOIN department d ON su.department_id = d.department_id
GROUP BY d.department_id, d.department_name;
```

Résultat : **4 lignes**.

| department_name | moyenne |
|---|---|
| Informatique | 14.09 |
| Mathématiques | 14.88 |
| Biologie | 14.52 |
| Chimie | 15.04 |

- Afficher le prénom et le nom des élèves inscrits dans plusieurs départements, avec leur nombre de départements.
```sql
SELECT s.first_name, s.last_name, COUNT(*) AS nb_departements
FROM student s
INNER JOIN student_department sd ON s.student_id = sd.student_id
GROUP BY s.student_id, s.first_name, s.last_name
HAVING COUNT(*) > 1;
```

Résultat : **3 lignes**.

| first_name | last_name | nb_departements |
|---|---|---|
| Claire | Lemoine | 2 |
| Noah | Brunet | 2 |
| Frédéric | Vallet | 2 |

- **Facultatif** : afficher toutes les combinaisons possibles de départements et de villes des élèves, avec `CROSS JOIN`.
```sql
SELECT d.department_name, v.city
FROM department d
CROSS JOIN (SELECT DISTINCT city FROM student) AS v;
```

Résultat : **20 lignes**.

> 5 départements × 4 villes = 20 lignes. La liste des villes sans doublon est obtenue par une sous-requête dans le `FROM` (niveau 10).

## Niveau 10 : Utiliser des sous-requêtes

- Afficher le prénom, le nom et la moyenne des élèves dont la moyenne est supérieure à la moyenne générale.
```sql
SELECT first_name, last_name, average_grade
FROM student
WHERE average_grade > (SELECT AVG(average_grade) FROM student);
```

Résultat : **18 lignes**.

> La sous-requête calcule la moyenne générale (14.33), puis la requête principale compare chaque élève à cette valeur.

- Afficher le prénom, le nom et la moyenne du ou des élèves ayant la moyenne la plus haute, à l'aide d'une sous-requête.
```sql
SELECT first_name, last_name, average_grade
FROM student
WHERE average_grade = (SELECT MAX(average_grade) FROM student);
```

Résultat : **1 ligne**.

| first_name | last_name | average_grade |
|---|---|---|
| Noah | Brunet | 18.40 |

> Contrairement à `ORDER BY … LIMIT 1` (niveau 2), cette requête renvoie tous les ex aequo.

- Afficher le prénom et le nom des élèves qui n'ont aucune note.
```sql
SELECT first_name, last_name
FROM student
WHERE student_id NOT IN (SELECT student_id FROM note);
```

Résultat : **4 lignes**.

| first_name | last_name |
|---|---|
| Sébastien | Vidal |
| Théodore | Chavanne |
| Yasmine | Lemoine |
| Lucas | Moreira |

> Même résultat avec un `LEFT JOIN … WHERE n.note_id IS NULL`.

- Afficher le prénom et le nom des élèves qui ont au moins une note en Algèbre, chaque élève n'apparaissant qu'une fois.
```sql
SELECT first_name, last_name
FROM student
WHERE student_id IN (
    SELECT n.student_id
    FROM note n
    INNER JOIN subject su ON n.subject_id = su.subject_id
    WHERE su.subject_name = 'Algèbre'
);
```

Résultat : **11 lignes**.

> Avec une simple jointure, un élève qui a deux notes en Algèbre apparaîtrait deux fois (sauf avec `DISTINCT`). La sous-requête peut elle-même contenir une jointure.

- Afficher toutes les notes supérieures à la moyenne de toutes les notes, avec le prénom et le nom de l'élève.
```sql
SELECT s.first_name, s.last_name, n.grade
FROM note n
INNER JOIN student s ON n.student_id = s.student_id
WHERE n.grade > (SELECT AVG(grade) FROM note)
ORDER BY n.grade DESC;
```

Résultat : **49 lignes**.

- Afficher le prénom, le nom et la date de naissance des élèves plus âgés que tous les élèves de Toulouse.
```sql
SELECT first_name, last_name, birth_date
FROM student
WHERE birth_date < (SELECT MIN(birth_date) FROM student WHERE city = 'Toulouse');
```

Résultat : **17 lignes**.

> « Plus âgé que tous les Toulousains » = né avant le plus âgé d'entre eux, c'est-à-dire avant la plus petite date de naissance de Toulouse.

- Afficher le nombre moyen de notes par élève (arrondi à 2 décimales), parmi les élèves qui ont au moins une note.
```sql
SELECT ROUND(AVG(nb_notes), 2) AS moyenne_notes_par_eleve
FROM (
    SELECT student_id, COUNT(*) AS nb_notes
    FROM note
    GROUP BY student_id
) AS notes_par_eleve;
```

Résultat : **1 ligne**.

| moyenne_notes_par_eleve |
|---|
| 2.74 |

> Une sous-requête dans le `FROM` doit obligatoirement avoir un alias. `AVG(COUNT(*))` provoquerait une erreur.

- Afficher le nom du ou des départements qui comptent le plus d'élèves inscrits.
```sql
SELECT d.department_name, COUNT(*) AS nb_eleves
FROM department d
INNER JOIN student_department sd ON d.department_id = sd.department_id
GROUP BY d.department_id, d.department_name
HAVING COUNT(*) = (
    SELECT MAX(nb)
    FROM (
        SELECT COUNT(*) AS nb
        FROM student_department
        GROUP BY department_id
    ) AS effectifs
);
```

Résultat : **1 ligne**.

| department_name | nb_eleves |
|---|---|
| Informatique | 12 |

> Exercice difficile : on compare le nombre d'élèves de chaque département au **maximum** de ces nombres, calculé par une sous-requête… qui contient elle-même une sous-requête. Une solution plus simple, mais qui ne gère pas les ex aequo : `ORDER BY nb_eleves DESC LIMIT 1`.

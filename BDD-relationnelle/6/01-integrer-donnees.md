# Intégrer des données

Une base de données démarre rarement vide. Les données existent souvent déjà ailleurs : dans un fichier Excel tenu par le secrétariat, dans l'export d'un ancien logiciel, dans un fichier fourni par un partenaire… **Intégrer** ces données, c'est les faire entrer dans la base **proprement** : au bon format, sans doublons, et en respectant toutes les règles de la base.

C'est un travail en deux temps :

1. **importer** les données depuis le fichier ;
2. **les manipuler** (nettoyer, convertir, contrôler) pour qu'elles puissent rejoindre les tables définitives.

Dans cette partie, le secrétariat de l'école nous transmet la liste des nouveaux élèves à ajouter dans `scholar`, sous la forme d'un fichier `nouveaux_eleves.csv` (fourni dans le dossier `donnees/`).

> Partez d'une base `scholar` **fraîchement importée** (partie 1.B) pour retrouver exactement les résultats de ce support.

---

### 1. Les formats de fichiers

#### 1.1 Le script SQL

Vous le connaissez depuis la partie 1.B : `scholar.sql` est un fichier qui contient des instructions SQL (`CREATE TABLE`, `INSERT INTO`…). L'importer, c'est simplement exécuter ces instructions. C'est le format idéal entre deux bases MySQL (sauvegarde, copie d'une base sur un autre poste), mais on le rencontre rarement en dehors.

#### 1.2 Le CSV

Le **CSV** (*Comma-Separated Values*) est le format d'échange le plus répandu. C'est un simple fichier texte, qui représente un tableau :

- **une ligne** du fichier = **une ligne** du tableau ;
- les **colonnes** sont séparées par un caractère, le **séparateur** ;
- la **première ligne** contient souvent le nom des colonnes (l'**en-tête**).

Voici le début du fichier `nouveaux_eleves.csv`, ouvert dans un éditeur de texte :

```
prenom;nom;date_naissance;email;telephone;ville;departement
  emma ;ROUX;02/01/2005;Emma.Roux@Mail.com;06 12 34 56 01;Lyon;Informatique
Nathan;blanc;12/07/2004;nathan.blanc@mail.com;06.12.34.56.02;toulouse;Mathématiques
Inès;Faure;30/10/2003;;0612345603;Rennes;Biologie
```

Tous les tableurs (Excel, LibreOffice Calc, Google Sheets) savent lire et enregistrer du CSV, tout comme phpMyAdmin. Mais le format n'est pas strictement normalisé, et plusieurs détails varient d'un fichier à l'autre :

| Paramètre | Variantes courantes | Dans `nouveaux_eleves.csv` |
|---|---|---|
| **Séparateur** | `,` (anglo-saxon) ou `;` (français, car la virgule sert aux décimales) | `;` |
| **Délimiteur de texte** | Les valeurs peuvent être entourées de `"…"`, indispensable si elles contiennent le séparateur | aucun |
| **En-tête** | Présent ou absent | présent |
| **Encodage** | UTF-8, ou Windows-1252 (ANSI) pour les vieux fichiers Excel | UTF-8 |
| **Fin de ligne** | `\r\n` (Windows) ou `\n` (Linux, macOS) | `\r\n` |

> **Toujours ouvrir un CSV dans un éditeur de texte** (VS Code, Notepad++) avant de l'importer, pour repérer son séparateur, son en-tête et ses éventuels problèmes. Excel, lui, transforme ce qu'il affiche : il peut supprimer les zéros initiaux d'un téléphone ou réinterpréter les dates.

> **Les accents mal affichés** (`MathÃ©matiques` au lieu de `Mathématiques`) sont le signe d'un problème d'**encodage** : le fichier n'est pas dans l'encodage indiqué à l'import. Avec Excel, enregistrez au format **« CSV UTF-8 »** plutôt que « CSV (séparateur : point-virgule) », qui utilise l'ancien encodage Windows.

#### 1.3 Les autres formats

- **Excel (`.xlsx`)** : on l'enregistre d'abord en CSV depuis le tableur.
- **JSON** : le format des API web (partie 9). MySQL sait le lire, mais on passe en général par un petit programme (PHP, Node…) qui lit le JSON et exécute les `INSERT`.
- **Export d'un autre SGBD** : le plus souvent un script SQL, avec parfois quelques différences de syntaxe à corriger.

---

### 2. La méthode : passer par une table de transit

Le fichier du secrétariat n'est pas directement exploitable. En le lisant attentivement, on repère :

- des **espaces** en trop (`  emma `, `perrin  `) ;
- des **majuscules** incohérentes (`ROUX`, `blanc`, `toulouse`, `Emma.Roux@Mail.com`) ;
- des **dates** au format français `JJ/MM/AAAA`, que MySQL n'accepte pas tel quel ;
- des **téléphones** écrits de trois façons (`06 12 34 56 01`, `06.12.34.56.02`, `0612345603`) ;
- des **valeurs vides** (l'email d'Inès Faure, le téléphone d'Hugo Perrin) ;
- et, en regardant de plus près, une **date impossible**, un **département inconnu**, une **ligne en double** et une **élève déjà présente** dans la base.

Importer ce fichier directement dans `student` serait une mauvaise idée : MySQL refuserait les dates, et toutes les autres erreurs entreraient dans la base. La bonne méthode passe par une **table de transit** (en anglais, *staging table*) :

![Intégrer des données](img/integration-donnees.png "Intégrer des données"){ style="display: block; margin: 0 auto" }

1. On crée une table de transit, dont toutes les colonnes sont en **texte** (`VARCHAR`) : elle accepte **tout**, sans rien refuser.
2. On y **importe** le fichier tel quel.
3. On **nettoie** les données et on **contrôle** les lignes, avec des `UPDATE` et des `SELECT`, sans risque pour les tables définitives.
4. On **intègre** les lignes valides dans les tables définitives, avec un `INSERT INTO … SELECT`.

On parle aussi de démarche **ETL** : *Extract* (extraire), *Transform* (transformer), *Load* (charger).

---

### 3. Importer un fichier CSV

#### 3.1 Créer la table de transit

Une colonne par colonne du fichier, dans le **même ordre**, toutes en `VARCHAR` :

```sql
USE scholar;

CREATE TABLE import_eleve (
    prenom VARCHAR(255),
    nom VARCHAR(255),
    date_naissance VARCHAR(255),
    email VARCHAR(255),
    telephone VARCHAR(255),
    ville VARCHAR(255),
    departement VARCHAR(255)
);
```

Pas de clé primaire, pas de `NOT NULL`, pas de contrainte : la table de transit ne doit rien refuser. C'est une table **temporaire** de travail, que l'on supprimera à la fin.

#### 3.2 Importer avec phpMyAdmin

1. Sélectionnez la table `import_eleve` dans le panneau de gauche.
2. Ouvrez l'onglet **Importer**.
3. Choisissez le fichier `nouveaux_eleves.csv`, et vérifiez que le **jeu de caractères** du fichier est `utf-8`.
4. Indiquez de **sauter 1 ligne** au début du fichier (l'en-tête), avec l'option qui permet d'ignorer un certain nombre de lignes (ou de requêtes) en partant du début.
5. Format : **CSV**. Dans les options du format :
   - **Colonnes séparées par** : `;`
   - **Colonnes entourées par** : laissez `"` (sans effet ici)
   - **Lignes terminées par** : `auto`
6. Cliquez sur **Importer** (ou **Exécuter**).

```sql
SELECT * FROM import_eleve;
```

La table contient **9 lignes**, avec toutes leurs imperfections. Les valeurs vides du fichier sont devenues des chaînes vides (`''`), et non des `NULL`.

> Les libellés exacts de l'onglet **Importer** varient selon la version de phpMyAdmin. En cas de doute, l'aperçu de la table après l'import permet de vérifier que chaque valeur est dans la bonne colonne.

> **Importer au niveau de la base** (sans sélectionner de table) fait créer une **nouvelle** table par phpMyAdmin, avec des noms (`TABLE 6`, `COL 1`…) et des types qu'il devine lui-même. C'est pratique pour un import rapide, mais on maîtrise moins le résultat.

#### 3.3 Importer avec LOAD DATA

MySQL propose aussi une instruction SQL pour charger un fichier, très rapide sur de gros volumes :

```sql
LOAD DATA LOCAL INFILE 'C:/chemin/vers/nouveaux_eleves.csv'
INTO TABLE import_eleve
CHARACTER SET utf8mb4
FIELDS TERMINATED BY ';'
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\r\n'
IGNORE 1 LINES;
```

Chaque option correspond à un paramètre du fichier : séparateur, délimiteur, fin de ligne, nombre de lignes d'en-tête à ignorer.

Pour des raisons de sécurité, la lecture de fichiers par MySQL est **désactivée ou limitée** par défaut (variables `local_infile` et `secure_file_priv`). Dans ce cours, nous utiliserons l'import de phpMyAdmin. `LOAD DATA` est à connaître pour les scripts d'import automatisés, en entreprise.

---

### 4. Nettoyer les données

Toutes les transformations se font sur la table de transit, avec des `UPDATE` et les fonctions de la partie 2.B. Les colonnes étant en texte, aucune modification ne peut être refusée, et une erreur se rattrape en réimportant le fichier.

#### 4.1 Supprimer les espaces en trop : TRIM

```sql
UPDATE import_eleve
SET prenom = TRIM(prenom),
    nom = TRIM(nom),
    email = TRIM(email),
    telephone = TRIM(telephone),
    ville = TRIM(ville),
    departement = TRIM(departement);
```

`TRIM` retire les espaces **au début et à la fin**, pas au milieu : un prénom composé comme « Anne Marie » reste intact.

#### 4.2 Harmoniser les majuscules

Les emails passent en minuscules :

```sql
UPDATE import_eleve
SET email = LOWER(email);
```

Pour les prénoms, les noms et les villes, on met la **première lettre en majuscule** et le reste en minuscules, en assemblant trois fonctions :

```sql
UPDATE import_eleve
SET prenom = CONCAT(UPPER(LEFT(prenom, 1)), LOWER(SUBSTRING(prenom, 2))),
    nom = CONCAT(UPPER(LEFT(nom, 1)), LOWER(SUBSTRING(nom, 2))),
    ville = CONCAT(UPPER(LEFT(ville, 1)), LOWER(SUBSTRING(ville, 2)));
```

`emma` devient `Emma`, `ROUX` devient `Roux`, `toulouse` devient `Toulouse`.

> Cette méthode a ses limites : `jean-pierre` deviendrait `Jean-pierre`, et `N'DIAYE` deviendrait `N'diaye`. Sur un vrai fichier, on vérifie toujours le résultat, et on corrige les cas particuliers à la main.

#### 4.3 Uniformiser un format : REPLACE

Les téléphones doivent tous avoir la forme `0612345601` :

```sql
UPDATE import_eleve
SET telephone = REPLACE(REPLACE(telephone, ' ', ''), '.', '');
```

Le `REPLACE` intérieur retire les espaces, le `REPLACE` extérieur retire les points. C'est aussi avec `REPLACE` qu'on transforme une virgule décimale française (`12,5`) en point (`12.5`).

#### 4.4 Transformer les valeurs vides en NULL : NULLIF

Dans la table de transit, l'email vide d'Inès Faure vaut `''` (une chaîne vide), et non `NULL`. Ce n'est pas la même chose (partie 1.A) : avec la contrainte `UNIQUE` de la partie 5.B, deux chaînes vides seraient même considérées comme un **doublon**.

`NULLIF(a, b)` renvoie `NULL` si `a` est égal à `b`, et `a` sinon :

```sql
UPDATE import_eleve
SET email = NULLIF(email, ''),
    telephone = NULLIF(telephone, '');
```

#### 4.5 Convertir une date : STR_TO_DATE

Les dates du fichier sont au format `JJ/MM/AAAA`. `STR_TO_DATE` lit un texte selon un **format** qu'on lui décrit, et le convertit en vraie date :

```sql
SELECT prenom, nom, date_naissance,
       STR_TO_DATE(date_naissance, '%d/%m/%Y') AS date_convertie
FROM import_eleve;
```

| prenom | nom | date_naissance | date_convertie |
|---|---|---|---|
| Emma | Roux | 02/01/2005 | 2005-01-02 |
| Nathan | Blanc | 12/07/2004 | 2004-07-12 |
| … | … | … | … |
| Sarah | Benali | 31/02/2004 | *NULL* |

Les codes du format sont ceux de `DATE_FORMAT` (partie 2.B) : `%d` jour, `%m` mois, `%Y` année sur 4 chiffres. Quand le texte ne correspond pas à une date valide, comme le 31 février, `STR_TO_DATE` renvoie `NULL` (avec un avertissement).

On ne convertit pas la colonne de la table de transit : elle est en `VARCHAR`. La conversion se fera **au moment de l'intégration**, dans le `INSERT INTO … SELECT` (paragraphe 6).

---

### 5. Contrôler les données

Une fois les données nettoyées, on **repère** les lignes qui ne peuvent pas être intégrées. Chaque contrôle est un simple `SELECT`.

#### 5.1 Les valeurs invalides

```sql
-- Les dates impossibles
SELECT *
FROM import_eleve
WHERE STR_TO_DATE(date_naissance, '%d/%m/%Y') IS NULL;
```

Résultat : Sarah Benali, née le « 31/02/2004 ».

```sql
-- Les emails sans @
SELECT *
FROM import_eleve
WHERE email IS NOT NULL AND email NOT LIKE '%_@_%';
```

Résultat : aucune ligne.

#### 5.2 Les valeurs qui ne correspondent à rien dans la base

Les départements du fichier sont donnés par leur **nom**. Pour inscrire les élèves, il faudra retrouver leur **numéro** dans la table `department`. Un `LEFT JOIN` (partie 2.D) repère les noms qui n'existent pas :

```sql
SELECT i.prenom, i.nom, i.departement
FROM import_eleve i
LEFT JOIN department d ON i.departement = d.department_name
WHERE d.department_id IS NULL;
```

Résultat : Sarah Benali, inscrite en « Économie », un département qui n'existe pas dans `scholar`.

> Grâce à la collation `utf8mb4_0900_ai_ci`, `'mathematiques'` serait bien reconnu comme `'Mathématiques'` : la comparaison ignore les accents et les majuscules (partie 2.A).

#### 5.3 Les doublons dans le fichier

```sql
SELECT email, COUNT(*) AS nb
FROM import_eleve
GROUP BY email
HAVING COUNT(*) > 1;
```

Résultat : `tom.lambert@mail.com`, 2 fois. La ligne de Tom Lambert a été copiée deux fois dans le fichier.

#### 5.4 Les lignes déjà présentes dans la base

```sql
SELECT i.prenom, i.nom, i.email
FROM import_eleve i
INNER JOIN student s ON i.email = s.email;
```

Résultat : Alice Dupont, qui est déjà l'élève n°1 de `scholar`.

#### 5.5 Traiter les lignes problématiques

Pour chaque problème, il faut **décider** :

| Ligne | Problème | Décision |
|---|---|---|
| Sarah Benali | Date impossible, département inconnu | **Rejetée** : on la renvoie au secrétariat pour correction |
| Alice Dupont | Déjà présente dans la base | **Écartée** : rien à ajouter |
| Tom Lambert (2e ligne) | Doublon dans le fichier | **Fusionnée** : il ne sera intégré qu'une fois (`DISTINCT`, paragraphe 6) |

Avant de supprimer les lignes rejetées, on en garde une **trace**, pour pouvoir les renvoyer au secrétariat. `CREATE TABLE … AS SELECT` crée une table directement à partir du résultat d'une requête :

```sql
CREATE TABLE rejet_eleve AS
SELECT *
FROM import_eleve
WHERE nom = 'Benali';
```

Puis on retire les lignes écartées de la table de transit :

```sql
DELETE FROM import_eleve
WHERE nom = 'Benali';

DELETE FROM import_eleve
WHERE email IN (SELECT email FROM student WHERE email IS NOT NULL);
```

> **Pourquoi `WHERE nom = 'Benali'` et pas `WHERE STR_TO_DATE(…) IS NULL` ?** Avec le **mode strict** de MySQL (partie 3), une conversion impossible dans un `UPDATE` ou un `DELETE` peut provoquer une **erreur** (`#1411 - Incorrect datetime value`) au lieu d'un simple avertissement, et bloquer toute la requête. On repère donc les lignes invalides avec un `SELECT`, puis on les supprime en les désignant autrement.

> La sous-requête `SELECT email FROM student WHERE email IS NOT NULL` écarte les `NULL` : sans cela, un `NOT IN` deviendrait inutilisable (partie 2.D), et c'est une bonne habitude à garder aussi avec `IN`.

---

### 6. Intégrer les données : INSERT INTO … SELECT

#### 6.1 Le principe

Jusqu'ici, un `INSERT` contenait des valeurs écrites à la main (`VALUES (…)`, partie 3). On peut aussi insérer **le résultat d'une requête** : chaque ligne renvoyée par le `SELECT` devient une ligne insérée.

```sql
INSERT INTO table_destination (colonne1, colonne2, …)
SELECT valeur1, valeur2, …
FROM table_source
WHERE …;
```

Les colonnes du `SELECT` doivent correspondre, **dans l'ordre**, aux colonnes indiquées après `INSERT INTO`.

#### 6.2 Intégrer les élèves

```sql
INSERT INTO student (first_name, last_name, birth_date, email, phone_number, city)
SELECT DISTINCT prenom, nom, STR_TO_DATE(date_naissance, '%d/%m/%Y'), email, telephone, ville
FROM import_eleve;
```
```
6 lignes insérées.
```

- La date est **convertie** au passage avec `STR_TO_DATE` : toutes les dates restantes sont valides.
- `DISTINCT` fusionne les deux lignes identiques de Tom Lambert.
- Les colonnes `student_id` (`AUTO_INCREMENT`) et `average_grade` (aucune note pour l'instant) ne sont pas remplies.
- Toutes les contraintes de `student` s'appliquent : si une ligne ne les respectait pas (une ville vide, par exemple), MySQL refuserait **toute** l'insertion.

Les 6 nouveaux élèves reçoivent les numéros 43 à 48.

#### 6.3 Intégrer les inscriptions

Il reste à inscrire chaque nouvel élève dans son département. Il faut pour cela retrouver deux **numéros** à partir du fichier :

- le `student_id` de l'élève, qu'on vient de créer ;
- le `department_id`, à partir du nom du département.

Ce sont deux jointures (partie 2.D) :

```sql
INSERT INTO student_department (student_id, department_id, enrollment_date)
SELECT DISTINCT s.student_id, d.department_id, CURDATE()
FROM import_eleve i
INNER JOIN student s
    ON s.first_name = i.prenom
   AND s.last_name = i.nom
   AND s.birth_date = STR_TO_DATE(i.date_naissance, '%d/%m/%Y')
INNER JOIN department d ON d.department_name = i.departement;
```
```
6 lignes insérées.
```

> **Pourquoi ne pas retrouver l'élève par son email ?** Parce qu'Inès Faure n'en a pas : la jointure sur `email` l'aurait oubliée. Le trio prénom, nom et date de naissance identifie chaque nouvel élève. Sur de gros volumes, on ajouterait plutôt une colonne de correspondance dans la table de transit.

Léna Morel est la toute première élève inscrite en Physique, le département resté vide jusqu'ici.

#### 6.4 Vérifier

Une intégration se termine toujours par une vérification :

```sql
-- 48 élèves au lieu de 42
SELECT COUNT(*) FROM student;

-- Les nouveaux élèves et leur département
SELECT s.student_id, s.first_name, s.last_name, s.birth_date, s.phone_number, d.department_name
FROM student s
INNER JOIN student_department sd ON s.student_id = sd.student_id
INNER JOIN department d ON sd.department_id = d.department_id
WHERE s.student_id > 42;
```

| student_id | first_name | last_name | birth_date | phone_number | department_name |
|---|---|---|---|---|---|
| 43 | Emma | Roux | 2005-01-02 | 0612345601 | Informatique |
| 44 | Nathan | Blanc | 2004-07-12 | 0612345602 | Mathématiques |
| 45 | Inès | Faure | 2003-10-30 | 0612345603 | Biologie |
| 46 | Hugo | Perrin | 2005-03-08 | *NULL* | Informatique |
| 47 | Léna | Morel | 2004-02-10 | 0612345605 | Physique |
| 48 | Tom | Lambert | 2004-09-15 | 0612345606 | Chimie |

Bilan de l'import : 9 lignes dans le fichier, 6 élèves intégrés, 1 doublon fusionné, 1 élève déjà présente, 1 ligne rejetée.

#### 6.5 Nettoyer derrière soi

La table de transit a rempli son rôle :

```sql
DROP TABLE import_eleve;
```

On garde en revanche la table `rejet_eleve` le temps que le secrétariat corrige la ligne de Sarah Benali. On peut l'**exporter** en CSV pour la lui envoyer : table `rejet_eleve`, onglet **Exporter**, format **CSV**.

#### 6.6 Quand la ligne existe déjà

MySQL propose deux raccourcis pour les lignes qui provoqueraient un doublon de clé primaire ou de colonne `UNIQUE` (erreur `#1062`) :

- `INSERT IGNORE INTO …` **ignore** les lignes en erreur et insère les autres. Pratique, mais dangereux : les lignes ignorées disparaissent sans bruit (un simple avertissement), et on ne sait plus ce qui a été intégré.
- `INSERT INTO … ON DUPLICATE KEY UPDATE …` **met à jour** la ligne existante au lieu d'en créer une nouvelle (on parle d'*upsert*). C'est utile pour synchroniser régulièrement une base avec un fichier.

Dans les deux cas, la méthode de la table de transit reste préférable pour un import ponctuel : on **voit** et on **décide** ce qui arrive à chaque ligne.

---

### 7. Bonnes pratiques

- **Lire le fichier** dans un éditeur de texte avant tout import : séparateur, en-tête, encodage, format des dates et des nombres.
- **Sauvegarder la base** avant d'intégrer des données (onglet **Exporter**, partie 1.B).
- **Passer par une table de transit** en texte, sans contrainte.
- **Nettoyer** avec `UPDATE` et les fonctions de texte, puis **contrôler** avec des `SELECT`.
- **Garder une trace** des lignes rejetées, et les faire corriger à la source.
- **Intégrer** avec `INSERT INTO … SELECT`, en respectant l'ordre des tables (partie 3).
- **Vérifier** le résultat : nombre de lignes, échantillon de données.
- **Supprimer** la table de transit.

En partie 7, nous verrons comment regrouper toutes ces étapes dans une **transaction**, pour pouvoir tout annuler si quelque chose se passe mal en cours de route.

**Pratiquons !!**

Rdv au fichier `6-exercices.md`.

---

### 8. En résumé

- Le **CSV** est le format d'échange le plus courant : un tableau en texte, avec un séparateur, un éventuel en-tête et un encodage à connaître.
- On importe d'abord dans une **table de transit** en `VARCHAR`, avec l'onglet **Importer** de phpMyAdmin (ou `LOAD DATA`).
- On **nettoie** avec `TRIM`, `LOWER`, `UPPER`, `REPLACE`, `NULLIF`, et on convertit les dates avec `STR_TO_DATE`.
- On **contrôle** avec des `SELECT` : valeurs invalides, correspondances manquantes (`LEFT JOIN`), doublons (`GROUP BY … HAVING`), lignes déjà présentes.
- On **intègre** avec `INSERT INTO … SELECT`, en retrouvant les clés étrangères par des jointures.
- On garde une trace des **rejets** (`CREATE TABLE … AS SELECT`), et on **vérifie** le résultat.

---

*Sources :*
*- Julien POIRIER*
*- sql.sh*
*- dev.mysql.com*

---

© Vincent Chiofalo

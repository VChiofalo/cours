# Modifier les données

Jusqu'ici, nous n'avons fait que **lire** la base : un `SELECT` ne change jamais rien aux données. Dans cette partie, nous allons **écrire** dedans : ajouter des lignes (`INSERT`), les modifier (`UPDATE`) et les supprimer (`DELETE`). Ce sont les trois dernières opérations du **CRUD** vu en partie 1.A.

| Opération | CRUD | Instruction SQL |
|---|---|---|
| Ajouter | **C**reate | `INSERT INTO` |
| Lire | **R**ead | `SELECT` (partie 2) |
| Modifier | **U**pdate | `UPDATE` |
| Supprimer | **D**elete | `DELETE FROM` |

---

### 1. Avant de commencer

> **Les modifications sont immédiates et définitives.** MySQL ne demande aucune confirmation et il n'existe pas de bouton « Annuler » : une ligne supprimée est perdue. (Les **transactions**, vues en partie 7, permettront d'annuler un ensemble d'opérations. Pour l'instant, chaque requête est validée dès son exécution.)

Pendant les exercices, vous allez forcément abîmer des données. Ce n'est pas grave, à condition de savoir **repartir de zéro** (partie 1.B) :

- **sauvegarder** la base avant les manipulations risquées : onglet **Exporter** ;
- ou **réimporter** `scholar.sql` après avoir supprimé la base : onglet **Opérations**, **Supprimer la base de données (DROP)**, puis **Importer**.

Pour suivre l'effet de chaque modification, gardez l'habitude d'exécuter un `SELECT` **avant** et **après**.

---

### 2. Ajouter des lignes avec INSERT INTO

#### 2.1 La syntaxe

```sql
INSERT INTO table (colonne1, colonne2, colonne3)
VALUES (valeur1, valeur2, valeur3);
```

On indique la **liste des colonnes** à remplir, puis les **valeurs**, dans **le même ordre**.

```sql
INSERT INTO student (first_name, last_name, birth_date, email, phone_number, city)
VALUES ('Jean', 'Dupuis', '2003-05-14', 'jean.dupuis@mail.com', '0612345600', 'Paris');
```

phpMyAdmin confirme :

```
1 ligne insérée.
L'identifiant de la ligne insérée est : 43
```

On retrouve les règles d'écriture de la partie 2.A : texte et dates entre **apostrophes**, dates au format `'AAAA-MM-JJ'`, nombres tels quels avec un **point** pour les décimales.

#### 2.2 Les colonnes qu'on ne remplit pas

Plusieurs colonnes de `student` n'apparaissent pas dans l'exemple :

- **`student_id`** : c'est la clé primaire, en `AUTO_INCREMENT`. MySQL lui attribue automatiquement le numéro suivant (ici 43). **On ne la remplit jamais soi-même.**
- **`average_grade`** : elle accepte `NULL`. Comme on ne la donne pas, elle vaut `NULL`, ce qui est logique : Jean Dupuis n'a pas encore de note.

En revanche, une colonne **`NOT NULL` sans valeur par défaut** doit obligatoirement être remplie (voir les erreurs au paragraphe 3).

Pour une colonne facultative, on peut aussi écrire `NULL` explicitement :

```sql
INSERT INTO student (first_name, last_name, birth_date, email, phone_number, city)
VALUES ('Emma', 'Roux', '2005-02-01', NULL, NULL, 'Lyon');
```

#### 2.3 Plusieurs lignes en une requête

On peut insérer plusieurs lignes d'un coup, en séparant les groupes de valeurs par des **virgules** :

```sql
INSERT INTO department (department_name)
VALUES ('Économie'), ('Langues'), ('Histoire');
```

```
3 lignes insérées.
```

C'est exactement ce que fait le fichier `scholar.sql` pour remplir la base.

#### 2.4 Sans liste de colonnes

MySQL accepte aussi un `INSERT` **sans** liste de colonnes. Il faut alors donner une valeur pour **toutes** les colonnes, dans l'ordre exact de la table :

```sql
INSERT INTO department
VALUES (NULL, 'Philosophie');
```

Le `NULL` sur la clé primaire laisse l'`AUTO_INCREMENT` choisir le numéro. Cette écriture est **déconseillée** : elle dépend de l'ordre des colonnes, et casse dès que la structure de la table change. Indiquez toujours la liste des colonnes.

#### 2.5 Insérer dans une table liée

Pour ajouter une note à Jean Dupuis, il faut connaître **son numéro** (43) et celui de la matière. La valeur d'une clé étrangère doit correspondre à une ligne **qui existe** dans la table référencée :

```sql
-- Inscrire Jean Dupuis (n°43) en Informatique (n°1)
INSERT INTO student_department (student_id, department_id, enrollment_date)
VALUES (43, 1, '2026-09-01');

-- Lui ajouter une note en Programmation (matière n°1)
INSERT INTO note (student_id, subject_id, grade, note_date)
VALUES (43, 1, 15.50, '2026-11-10');
```

> **Retrouver le numéro qu'on vient de créer** : il est affiché par phpMyAdmin juste après l'`INSERT`. On peut aussi le retrouver avec un `SELECT` (`WHERE last_name = 'Dupuis' AND first_name = 'Jean'`), ou avec `SELECT LAST_INSERT_ID();`, qui renvoie le dernier numéro `AUTO_INCREMENT` créé pendant la session.

**L'ordre d'insertion compte** : on crée d'abord l'élève, puis ses inscriptions et ses notes. Dans l'autre sens, la clé étrangère pointerait vers un élève qui n'existe pas encore.

**Pratiquons !!**

Rdv au fichier `3-exercices.md`, niveau 1.

---

### 3. Quand la base refuse : les erreurs d'écriture

C'est ici que la base relationnelle montre sa force (partie 9) : elle **refuse** les données qui ne respectent pas sa structure. Savoir lire ces messages est indispensable.

#### 3.1 Une colonne obligatoire manquante

```sql
INSERT INTO student (first_name, last_name, birth_date)
VALUES ('Paul', 'Simon', '2004-06-10');
```
```
#1364 - Field 'city' doesn't have a default value
```

`city` est `NOT NULL` et n'a pas de valeur par défaut : on ne peut pas l'omettre. Et si on écrit explicitement `NULL` :

```
#1048 - Column 'city' cannot be null
```

#### 3.2 Une clé étrangère qui ne pointe vers rien

```sql
INSERT INTO note (student_id, subject_id, grade, note_date)
VALUES (999, 1, 12.00, '2026-11-10');
```
```
#1452 - Cannot add or update a child row: a foreign key constraint fails
(`scholar`.`note`, CONSTRAINT `note_ibfk_1` FOREIGN KEY (`student_id`)
REFERENCES `student` (`student_id`) ON DELETE CASCADE)
```

Il n'existe pas d'élève n°999 : MySQL refuse de créer une note **orpheline**. Le message indique la table (`note`), la colonne (`student_id`) et la table référencée (`student`).

#### 3.3 Un doublon sur une clé primaire

```sql
-- Alice Dupont (n°1) est déjà inscrite en Informatique (n°1)
INSERT INTO student_department (student_id, department_id, enrollment_date)
VALUES (1, 1, '2026-11-10');
```
```
#1062 - Duplicate entry '1-1' for key 'student_department.PRIMARY'
```

La clé primaire de `student_department` est **composée** de `student_id` et `department_id` (partie 1.B) : le couple (1, 1) existe déjà.

#### 3.4 Une valeur incompatible avec le type

```sql
INSERT INTO student (first_name, last_name, birth_date, city)
VALUES ('Léna', 'Morel', '2004-02-31', 'Rennes');
```
```
#1292 - Incorrect date value: '2004-02-31' for column 'birth_date' at row 1
```

Le 31 février n'existe pas. De la même façon, un texte trop long pour sa colonne provoque `#1406 - Data too long for column…` (par exemple un prénom de plus de 50 caractères dans `first_name VARCHAR(50)`).

> Ces refus dépendent du **mode strict** de MySQL, activé par défaut. Sans lui, MySQL insérerait une valeur approchée (`0000-00-00`, texte tronqué…) et se contenterait d'un **avertissement** : c'est bien pire, car l'erreur passe inaperçue.

#### 3.5 Récapitulatif

| Code | Message (début) | Cause |
|---|---|---|
| `#1364` | Field '…' doesn't have a default value | Colonne `NOT NULL` oubliée |
| `#1048` | Column '…' cannot be null | `NULL` dans une colonne `NOT NULL` |
| `#1452` | Cannot add or update a child row | Clé étrangère vers une ligne inexistante |
| `#1062` | Duplicate entry '…' for key | Valeur déjà existante pour une clé primaire (ou une colonne unique) |
| `#1292` | Incorrect date value | Date invalide ou mal écrite |
| `#1406` | Data too long for column | Texte trop long pour la colonne |

**Pratiquons !!**

Rdv au fichier `3-exercices.md`, niveau 2.

---

### 4. Modifier des lignes avec UPDATE

#### 4.1 La syntaxe

```sql
UPDATE table
SET colonne1 = valeur1, colonne2 = valeur2
WHERE condition;
```

- `SET` indique les colonnes à modifier et leurs nouvelles valeurs, séparées par des virgules.
- `WHERE` indique **quelles lignes** modifier, exactement comme dans un `SELECT`.

```sql
-- Jean Dupuis déménage à Lyon et change d'adresse email
UPDATE student
SET city = 'Lyon', email = 'jean.dupuis@ecole.fr'
WHERE student_id = 43;
```
```
1 ligne affectée.
```

> **Le `WHERE` sur la clé primaire** est le moyen le plus sûr de modifier **une** ligne précise. Un `WHERE last_name = 'Dupuis'` modifierait aussi Charlotte Dupuis !

#### 4.2 Le danger : UPDATE sans WHERE

```sql
UPDATE student
SET city = 'Lyon';
```
Sans `WHERE`, la modification s'applique à **toutes les lignes** de la table. Tous les élèves habitent désormais à Lyon, et l'information d'origine est perdue. (phpMyAdmin n'annonce que les lignes réellement changées : celles des élèves qui n'habitaient pas déjà à Lyon, voir 4.6.) C'est l'erreur la plus classique (et la plus redoutée) en SQL.

**La méthode sûre** : écrire d'abord un `SELECT` avec le même `WHERE`, vérifier qu'il renvoie exactement les lignes voulues, puis le transformer en `UPDATE`.

```sql
-- 1. Je vérifie les lignes concernées
SELECT * FROM student WHERE student_id = 43;

-- 2. Je modifie, avec exactement le même WHERE
UPDATE student SET city = 'Lyon' WHERE student_id = 43;
```

#### 4.3 Calculer la nouvelle valeur

La nouvelle valeur peut être **calculée**, y compris à partir de l'ancienne :

```sql
-- Un point de bonus sur toutes les notes de Réseaux (matière n°2)
UPDATE note
SET grade = grade + 1
WHERE subject_id = 2;
```

Toutes les fonctions de la partie 2.B sont utilisables :

```sql
-- Toutes les adresses passent du domaine @mail.com au domaine @ecole.fr
UPDATE student
SET email = REPLACE(email, '@mail.com', '@ecole.fr');
```

Ici, l'absence de `WHERE` est **voulue** : on veut bien modifier toutes les lignes. Les élèves sans email ne changent pas, car `REPLACE(NULL, …)` vaut `NULL`.

#### 4.4 Des valeurs différentes selon les lignes : CASE

Pour donner une valeur différente à chaque ligne en une seule requête, on combine `UPDATE` et `CASE` :

```sql
-- Compléter les emails manquants
UPDATE student
SET email = CASE student_id
    WHEN 11 THEN 'leo.benoit@mail.com'
    WHEN 15 THEN 'paul.lemoine@mail.com'
    WHEN 22 THEN 'charlotte.dupuis@mail.com'
    WHEN 31 THEN 'lea.leblanc@mail.com'
    WHEN 35 THEN 'maxime.dumas@mail.com'
END
WHERE email IS NULL;
```

Le `WHERE` est important : sans lui, le `CASE` renverrait `NULL` pour tous les autres élèves (aucun `WHEN` ne leur correspond, et il n'y a pas de `ELSE`), et **effacerait** leur email.

Cinq `UPDATE` séparés, un par élève, donnent le même résultat et sont plus simples à relire : les deux méthodes sont correctes.

#### 4.5 Une valeur venant d'une autre table

Jean Dupuis a maintenant une note, mais sa colonne `average_grade` vaut toujours `NULL` : elle ne se met **pas à jour toute seule**. C'est le défaut des données calculées stockées en base (partie 4.A). Pour la recalculer, on utilise une sous-requête (partie 2.D) :

```sql
UPDATE student
SET average_grade = (
    SELECT ROUND(AVG(grade), 2)
    FROM note
    WHERE note.student_id = 43
)
WHERE student_id = 43;
```

#### 4.6 Lignes trouvées, lignes modifiées

Si la nouvelle valeur est identique à l'ancienne, MySQL ne modifie rien. phpMyAdmin affiche alors `0 ligne affectée`, même si le `WHERE` a bien trouvé la ligne. Un `0 ligne affectée` inattendu signifie donc : soit le `WHERE` ne trouve aucune ligne (faute de frappe, mauvais numéro…), soit la valeur était déjà la bonne.

**Pratiquons !!**

Rdv au fichier `3-exercices.md`, niveau 3.

---

### 5. Supprimer des lignes avec DELETE

#### 5.1 La syntaxe

```sql
DELETE FROM table
WHERE condition;
```

```sql
-- Supprimer la note n°1
DELETE FROM note
WHERE note_id = 1;
```
```
1 ligne affectée.
```

`DELETE` supprime des **lignes entières** : on ne précise pas de colonnes. Pour vider une seule cellule, on fait un `UPDATE … SET colonne = NULL`.

Comme pour `UPDATE` :

- **sans `WHERE`, toutes les lignes sont supprimées** : `DELETE FROM note;` efface les 104 notes ;
- **la méthode sûre** est la même : un `SELECT` d'abord, avec le même `WHERE`.

#### 5.2 Les suppressions en cascade

Supprimons un élève qui a des notes et une inscription :

```sql
-- Bob Martin a 2 notes et 1 inscription
DELETE FROM student
WHERE student_id = 2;
```

Bob a disparu de `student`… mais aussi ses **2 notes** de la table `note`, et son **inscription** de `student_department`. Pourquoi ? Dans `scholar.sql`, les clés étrangères ont été déclarées avec l'option `ON DELETE CASCADE` :

```sql
FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE
```

Quand une ligne est supprimée, MySQL supprime **automatiquement** toutes les lignes qui pointent vers elle. Sans cette option, MySQL aurait **refusé** la suppression, pour ne pas laisser de notes orphelines :

```
#1451 - Cannot delete or update a parent row: a foreign key constraint fails
```

La cascade est pratique, mais elle peut aller loin : supprimer le département Chimie supprime aussi ses 2 matières, les **19 notes** de ces matières et ses **8 inscriptions**. Les différentes options (`CASCADE`, refus, `SET NULL`) et leur choix seront étudiés en partie 7.

#### 5.3 Supprimer selon une autre table

```sql
-- Supprimer les élèves qui n'ont ni inscription ni note
DELETE FROM student
WHERE student_id NOT IN (SELECT student_id FROM student_department)
  AND student_id NOT IN (SELECT student_id FROM note);
```

Une limite de MySQL : la sous-requête ne peut pas porter sur **la table qu'on est en train de modifier**.

```sql
-- Refusé par MySQL
DELETE FROM student
WHERE student_id = (SELECT student_id FROM student WHERE last_name = 'Tissot');
```
```
#1093 - You can't specify target table 'student' for update in FROM clause
```

Ici, la sous-requête est d'ailleurs inutile : `WHERE last_name = 'Tissot'` suffit.

#### 5.4 Les numéros ne sont pas réutilisés

Après la suppression de Bob Martin, le numéro 2 reste **libre** : le prochain élève ajouté recevra le numéro qui suit le plus grand jamais attribué, jamais le 2. C'est voulu : un numéro qui a désigné Bob ne doit jamais désigner quelqu'un d'autre, au cas où il serait encore mentionné quelque part (un ancien bulletin, un fichier exporté…).

#### 5.5 Vider une table : TRUNCATE

```sql
TRUNCATE TABLE note;
```

`TRUNCATE` vide une table entière, plus rapidement qu'un `DELETE` sans `WHERE`, et **remet l'`AUTO_INCREMENT` à 1**. MySQL refuse en revanche de vider une table référencée par une clé étrangère (comme `student`). C'est une instruction d'administration, à manier avec précaution.

**Pratiquons !!**

Rdv au fichier `3-exercices.md`, niveau 4.

---

### 6. Bonnes pratiques

- **Sauvegarder** avant toute manipulation importante.
- **Toujours un `WHERE`** sur un `UPDATE` ou un `DELETE`, sauf si on veut vraiment toucher toutes les lignes. Et dans ce cas, se poser la question deux fois.
- **Tester le `WHERE` avec un `SELECT`** avant de modifier ou de supprimer.
- **Cibler par la clé primaire** pour modifier ou supprimer une ligne précise.
- **Vérifier le nombre de lignes affectées** : s'il ne correspond pas à ce qu'on attendait, il faut comprendre pourquoi.
- **Toujours indiquer la liste des colonnes** dans un `INSERT`.
- **Respecter l'ordre des tables** : insérer d'abord les lignes « parentes » (élève, département), puis celles qui pointent vers elles (inscriptions, notes).

---

### 7. En résumé

| Instruction | Syntaxe | Attention |
|---|---|---|
| Ajouter | `INSERT INTO table (col1, col2) VALUES (v1, v2), (v3, v4);` | Pas de valeur pour l'`AUTO_INCREMENT`. Colonnes `NOT NULL` obligatoires. Clés étrangères existantes. |
| Modifier | `UPDATE table SET col1 = v1, col2 = v2 WHERE condition;` | Sans `WHERE`, **toutes** les lignes sont modifiées. |
| Supprimer | `DELETE FROM table WHERE condition;` | Sans `WHERE`, **toutes** les lignes sont supprimées. Attention aux cascades. |

- Les modifications sont **immédiates** et **définitives**.
- La base **refuse** les données qui ne respectent pas sa structure : colonne obligatoire, type, clé primaire, clé étrangère.
- Avec `ON DELETE CASCADE`, supprimer une ligne supprime aussi toutes celles qui pointent vers elle.

---

*Sources :*
*- Julien POIRIER*
*- sql.sh*
*- dev.mysql.com*

---

© Vincent Chiofalo

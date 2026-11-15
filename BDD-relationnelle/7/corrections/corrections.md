# Corrections – Partie 7 : Intégrité et transactions

Comme pour les parties 5 et 6, les scripts sont écrits pour MySQL 8. Les numéros de lignes supposent des bases dans l'état de la fin des exercices de la partie 5 (restaurant avec ses 2 commandes) et une base `scholar` fraîchement réimportée.

---

## Niveau 1 : Les actions référentielles

- Choix des actions.

| Clé étrangère | Action | Justification |
|---|---|---|
| `plat.id_categorie` | `RESTRICT` | Un plat a toujours une catégorie (cardinalité 1,1) : on ne supprime pas une catégorie qui contient encore des plats |
| `commande.id_client` | `RESTRICT` | Les commandes sont un **historique** comptable : supprimer un client ne doit pas effacer ses commandes |
| `detail_commande.id_commande` | `CASCADE` | Une ligne de commande n'a aucun sens sans sa commande : supprimer la commande supprime ses lignes |
| `detail_commande.id_plat` | `RESTRICT` | Supprimer un plat ne doit pas modifier les commandes passées |

`SET NULL` ne convient à aucune de ces clés : elles sont toutes obligatoires (`NOT NULL`), et une ligne de commande sans plat n'aurait pas de sens.

- Modifier les clés étrangères.

On retrouve les noms avec `SHOW CREATE TABLE` (partie 7.A) :
```sql
USE restaurant;
SHOW CREATE TABLE plat;
SHOW CREATE TABLE commande;
SHOW CREATE TABLE detail_commande;
```
Les clés ont été créées sans nom en partie 5 : leurs noms automatiques sont `plat_ibfk_1`, `commande_ibfk_1`, et, pour la table renommée, `detail_commande_ibfk_1` (vers `commande`) et `detail_commande_ibfk_2` (vers `plat`). Selon la version de MySQL, les noms automatiques ne suivent pas toujours un `RENAME TABLE` : ils peuvent encore commencer par `ligne_commande_ibfk_`. D'où l'intérêt de **vérifier** avec `SHOW CREATE TABLE` avant d'écrire les `DROP FOREIGN KEY`.

```sql
-- plat → categorie : RESTRICT
ALTER TABLE plat DROP FOREIGN KEY plat_ibfk_1;
ALTER TABLE plat
    ADD CONSTRAINT fk_plat_categorie
    FOREIGN KEY (id_categorie) REFERENCES categorie(id_categorie)
    ON DELETE RESTRICT ON UPDATE CASCADE;

-- commande → client : RESTRICT
ALTER TABLE commande DROP FOREIGN KEY commande_ibfk_1;
ALTER TABLE commande
    ADD CONSTRAINT fk_commande_client
    FOREIGN KEY (id_client) REFERENCES client(id_client)
    ON DELETE RESTRICT ON UPDATE CASCADE;

-- detail_commande → commande : CASCADE
ALTER TABLE detail_commande DROP FOREIGN KEY detail_commande_ibfk_1;
ALTER TABLE detail_commande
    ADD CONSTRAINT fk_detail_commande
    FOREIGN KEY (id_commande) REFERENCES commande(id_commande)
    ON DELETE CASCADE ON UPDATE CASCADE;

-- detail_commande → plat : RESTRICT
ALTER TABLE detail_commande DROP FOREIGN KEY detail_commande_ibfk_2;
ALTER TABLE detail_commande
    ADD CONSTRAINT fk_detail_plat
    FOREIGN KEY (id_plat) REFERENCES plat(id_plat)
    ON DELETE RESTRICT ON UPDATE CASCADE;
```
Pour `plat`, `commande` et `detail_commande → plat`, le comportement ne change pas (`RESTRICT` était déjà l'action par défaut). Recréer ces clés reste utile pour les **nommer**, et pour rendre le choix **explicite** dans le script.

- Vérifications.

```sql
DELETE FROM commande WHERE id_commande = 2;
SELECT * FROM detail_commande WHERE id_commande = 2;
```
La commande est supprimée, et ses 3 lignes avec elle (`CASCADE`) : le `SELECT` ne renvoie rien.

```sql
DELETE FROM plat WHERE nom = 'Tarte Tatin';
```
Refusé (`#1451`) : la Tarte Tatin figure encore dans la commande n°1 (`RESTRICT`).

```sql
DELETE FROM client WHERE nom = 'Morel' AND prenom = 'Lucie';
```
Refusé (`#1451`) : Lucie Morel a passé la commande n°1 (`RESTRICT`).

- Médiathèque : un livre sans catégorie.

La clé étrangère doit d'abord **accepter `NULL`**, sinon `SET NULL` est impossible :
```sql
USE mediatheque;

ALTER TABLE livre DROP FOREIGN KEY fk_livre_categorie;

ALTER TABLE livre
    MODIFY id_categorie INT UNSIGNED NULL;

ALTER TABLE livre
    ADD CONSTRAINT fk_livre_categorie
    FOREIGN KEY (id_categorie) REFERENCES categorie(id_categorie)
    ON DELETE SET NULL ON UPDATE CASCADE;
```
On supprime la contrainte **avant** de modifier la colonne : MySQL peut refuser de modifier une colonne utilisée par une clé étrangère.

Ce changement modifie aussi le **modèle** : la cardinalité de CLASSER côté LIVRE passe de 1,1 à **0,1** (partie 4.B).

Vérification :
```sql
INSERT INTO categorie (libelle) VALUES ('Essai');
INSERT INTO livre (titre, annee_parution, id_categorie)
VALUES ('Sapiens', 2011, LAST_INSERT_ID());

DELETE FROM categorie WHERE libelle = 'Essai';

SELECT titre, id_categorie FROM livre WHERE titre = 'Sapiens';
```
Résultat : `Sapiens`, avec `id_categorie` à `NULL`. Le livre est toujours là, sans catégorie.

- Suppression logique des plats.
```sql
USE restaurant;

ALTER TABLE plat
ADD actif BOOLEAN NOT NULL DEFAULT TRUE;

UPDATE plat
SET actif = FALSE
WHERE nom = 'Bœuf bourguignon';

SELECT p.nom, p.prix, c.libelle AS categorie
FROM plat p
INNER JOIN categorie c ON p.id_categorie = c.id_categorie
WHERE p.actif = TRUE
ORDER BY c.id_categorie, p.nom;
```
Grâce au `DEFAULT TRUE`, tous les plats existants sont actifs dès l'ajout de la colonne. Le Bœuf bourguignon n'apparaît plus sur la carte, mais il reste dans la base : les commandes qui le contiennent restent complètes, et leur montant reste juste.

Avec les plats ajoutés en partie 6 (`plats.csv`), la carte compte 8 plats. Sans l'import de la partie 6, elle en compte 4.

---

## Niveau 2 : Les transactions

- Connexion : icône WampServer, **MySQL**, **Console MySQL**, utilisateur `root`, mot de passe vide, puis :
```sql
USE scholar;
```

- Supprimer toutes les notes, puis annuler.
```sql
START TRANSACTION;
DELETE FROM note;
SELECT COUNT(*) FROM note;   -- 0
ROLLBACK;
SELECT COUNT(*) FROM note;   -- 104
```
Le `DELETE` sans `WHERE` a bien vidé la table **dans la transaction**, mais le `ROLLBACK` a tout restauré.

- Lina Garnier dans le département n°99.
```sql
START TRANSACTION;

INSERT INTO student (first_name, last_name, birth_date, email, city)
VALUES ('Lina', 'Garnier', '2005-04-18', 'lina.garnier@mail.com', 'Lyon');

INSERT INTO student_department (student_id, department_id, enrollment_date)
VALUES (LAST_INSERT_ID(), 99, CURDATE());
-- ERROR 1452 (23000): Cannot add or update a child row: a foreign key constraint fails …

ROLLBACK;

SELECT * FROM student WHERE last_name = 'Garnier';   -- Empty set
```
La première insertion avait réussi, mais le `ROLLBACK` l'a annulée.

- Lina Garnier en Biologie.
```sql
START TRANSACTION;

INSERT INTO student (first_name, last_name, birth_date, email, city)
VALUES ('Lina', 'Garnier', '2005-04-18', 'lina.garnier@mail.com', 'Lyon');

INSERT INTO student_department (student_id, department_id, enrollment_date)
VALUES (LAST_INSERT_ID(), 3, CURDATE());

COMMIT;

SELECT student_id FROM student WHERE last_name = 'Garnier';   -- 44
```
Son numéro est **44**, et non 43 : le numéro 43 a été attribué à la première tentative, annulée par le `ROLLBACK`, et l'`AUTO_INCREMENT` ne revient jamais en arrière.

- Un point en Génétique.
```sql
START TRANSACTION;

UPDATE note
SET grade = grade + 1
WHERE subject_id = 6;

SELECT MAX(grade) FROM note WHERE subject_id = 6;
```
Deux cas selon l'état de la base :

  - **sans** la contrainte `chk_note_grade` de la partie 5 (base fraîchement réimportée) : l'`UPDATE` réussit (`12 rows affected`), mais le maximum vaut **20.50**. On annule :
```sql
ROLLBACK;
```
  - **avec** la contrainte : l'`UPDATE` est refusé dès l'exécution (`ERROR 3819: Check constraint 'chk_note_grade' is violated.`), et **aucune** note n'a été modifiée. Une requête est toujours atomique à elle seule : si une seule ligne viole une contrainte, toute la requête est annulée. On termine la transaction par un `ROLLBACK`.

  Version correcte :
```sql
START TRANSACTION;

UPDATE note
SET grade = LEAST(grade + 1, 20)
WHERE subject_id = 6;

SELECT MAX(grade) FROM note WHERE subject_id = 6;   -- 20.00

COMMIT;
```
  `LEAST` renvoie la plus petite de ses valeurs : la note de 19.5 passe à 20, et non à 20.5. Un `CASE WHEN grade >= 19 THEN 20 ELSE grade + 1 END` donne le même résultat.

- Le `ROLLBACK` après un `ALTER`.
```sql
SELECT * FROM note WHERE note_id = 1;   -- Empty set
```
La note n°1 a **disparu**, et la colonne `commentaire` existe bel et bien. L'`ALTER TABLE` a provoqué une **validation automatique** de la transaction en cours, `DELETE` compris : le `ROLLBACK` n'avait plus rien à annuler (partie 7.B, paragraphe 3.4).

  Remise en état :
```sql
ALTER TABLE note DROP COLUMN commentaire;
```
  La note n°1 ne peut pas être récupérée autrement qu'en réimportant `scholar.sql`, ou en la réinsérant à la main (élève n°1, matière n°1, 15.00, le 2025-12-15). Morale : une sauvegarde avant toute modification de structure.

- Nouvelle commande de Karim Faure.
```sql
USE restaurant;

START TRANSACTION;

INSERT INTO commande (cree_le, id_client)
VALUES (CURDATE(), 2);

SET @id_commande = LAST_INSERT_ID();

INSERT INTO detail_commande (id_commande, id_plat, quantite)
VALUES (@id_commande, 1, 2),
       (@id_commande, 4, 1);

COMMIT;
```
Points d'attention :
  - la colonne de date s'appelle `cree_le` depuis la partie 5 (niveau 2) ;
  - Karim Faure est le client n°2, la Salade César le plat n°1, le Risotto le plat n°4 (à vérifier avec un `SELECT` si la base a été modifiée) ;
  - `SET @id_commande = LAST_INSERT_ID();` range le numéro de la commande dans une **variable de session** (`@…`), réutilisable dans les requêtes suivantes. Ici, `LAST_INSERT_ID()` utilisé directement fonctionnerait aussi, puisque `detail_commande` n'a pas d'`AUTO_INCREMENT`, mais la variable rend le script plus lisible et plus sûr.

---

## Niveau 3 : Les accès simultanés

- Isolation.

| Étape | Console A | Console B |
|---|---|---|
| 1 | `START TRANSACTION;` | |
| 2 | `UPDATE student SET city = 'Nice' WHERE student_id = 1;` | |
| 3 | `SELECT city …` → `Nice` | `SELECT city …` → `Paris` |
| 4 | | `UPDATE student SET city = 'Lille' WHERE student_id = 1;` → la console reste **bloquée** |
| 5 | `COMMIT;` | L'`UPDATE` s'exécute : `Query OK, 1 row affected` |
| 6 | `SELECT city …` → `Lille` | `SELECT city …` → `Lille` |

La modification de A est invisible de B tant qu'elle n'est pas validée, et la ligne est verrouillée : B attend. Au final, c'est la dernière modification validée qui l'emporte (`Lille`).

- Attente d'un verrou.

Console A :
```sql
START TRANSACTION;
UPDATE student SET average_grade = 15 WHERE student_id = 2;
```
Console B :
```sql
UPDATE student SET city = 'Nice' WHERE student_id = 2;
```
Au bout de 50 secondes (valeur par défaut de `innodb_lock_wait_timeout`) :
```
ERROR 1205 (HY000): Lock wait timeout exceeded; try restarting transaction
```
Le verrou porte sur **toute la ligne**, et non sur une colonne : modifier la ville bloque, même si A a modifié la moyenne. Puis, dans A :
```sql
ROLLBACK;
```

- Interblocage.

| Étape | Console A | Console B |
|---|---|---|
| 2 | Verrouille l'élève n°1 | |
| 3 | | Verrouille l'élève n°2 |
| 4 | Demande l'élève n°2 → **attend** B | |
| 5 | | Demande l'élève n°1 → attendrait A, qui attend B… |

À l'étape 5, MySQL détecte que les deux transactions s'attendent mutuellement, et en annule une, ici normalement **B** (celle qui vient de compléter le cycle) :
```
ERROR 1213 (40001): Deadlock found when trying to get lock; try restarting transaction
```
La transaction de B est **entièrement annulée** (son `UPDATE` de l'étape 3 aussi), ce qui libère l'élève n°2 : l'`UPDATE` de A à l'étape 4 se débloque et s'exécute. Dans A :
```sql
ROLLBACK;
```
MySQL choisit en principe d'annuler la transaction qui a le moins de modifications à défaire. Selon les cas, il peut donc annuler A plutôt que B : l'important est de constater qu'**une seule** des deux est annulée, et que l'autre peut continuer.

Pour éviter les interblocages dans une application : des transactions courtes, qui modifient les lignes toujours **dans le même ordre** (ici, si A et B modifiaient toutes deux l'élève n°1 avant l'élève n°2, la seconde attendrait simplement la première).

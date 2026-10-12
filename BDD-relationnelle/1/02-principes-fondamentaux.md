# Introduction aux bases de données relationnelles

## Principes fondamentaux des bases de données relationnelles

Pour approfondir chaque notion de ce cours, le site [sql.sh](https://sql.sh/) est une mine d'or : n'hésitez pas à le garder ouvert à côté de vous.

---

### 1. Qu'est-ce qu'une base de données ?

Une **base de données** (BDD) est un ensemble **organisé** d'informations, stocké de manière à pouvoir facilement :

- **créer** de nouvelles données ;
- **lire** (rechercher, récupérer) des données existantes ;
- **modifier** des données ;
- **supprimer** des données.

On résume souvent ces quatre opérations par l'acronyme **CRUD** (*Create, Read, Update, Delete*).

Le mot important est **organisé**. Une liste d'élèves griffonnée dans un fichier texte contient bien des données, mais elle ne permet pas de répondre simplement à des questions comme :

- *Quels élèves de Lyon ont plus de 14 de moyenne ?*
- *Combien d'élèves sont inscrits en Informatique ?*
- *Quelles notes a obtenu Alice Dupont, et dans quelles matières ?*

Une base de données est conçue précisément pour répondre à ce genre de questions, rapidement, même avec des millions de lignes, et pour plusieurs utilisateurs en même temps.

#### Pourquoi pas un simple tableur ?

Un tableur (Excel, LibreOffice Calc, Google Sheets) ressemble beaucoup à une table de base de données : des lignes, des colonnes. Mais il atteint vite ses limites :

| Besoin | Tableur | Base de données |
|---|---|---|
| Plusieurs utilisateurs qui écrivent en même temps | Difficile, risque de conflits | Prévu et géré |
| Volume de données | Quelques dizaines de milliers de lignes confortables | Millions de lignes |
| Empêcher les erreurs de saisie (texte dans une colonne « âge »…) | Peu ou pas de contrôle | Types et contraintes imposés |
| Relier proprement plusieurs tableaux entre eux | Copier-coller, `RECHERCHEV`… | Clés et relations |
| Utilisation par une application (site web, appli mobile) | Inadapté | Fait pour ça |

---

### 2. Le vocabulaire de base

#### 2.1 SGBD

Un **SGBD** (*Système de Gestion de Base de Données*, en anglais **DBMS**) est le **logiciel** qui gère la base de données. C'est lui qui :

- stocke physiquement les données sur le disque ;
- exécute les demandes (requêtes) qu'on lui envoie ;
- vérifie que les données respectent les règles définies ;
- gère les utilisateurs et leurs droits ;
- permet les sauvegardes et la restauration.

Quand le SGBD gère des bases **relationnelles**, on parle de **SGBDR** (*RDBMS* en anglais).

Exemples de SGBDR courants :

| SGBDR | Particularité |
|---|---|
| **MySQL** | Libre, très répandu dans le web, appartient à Oracle |
| **MariaDB** | Version communautaire issue de MySQL, quasiment compatible |
| **PostgreSQL** | Libre, très complet, apprécié pour sa rigueur |
| **SQLite** | Une base tient dans un seul fichier, très utilisé dans les applis mobiles |
| **Oracle Database** | Commercial, très présent dans les grandes entreprises |
| **Microsoft SQL Server** | Commercial, écosystème Microsoft |

> Dans ce cours, nous utilisons **MySQL**, installé via **WampServer** (qui installe d'un coup Apache, MySQL et PHP) et manipulé avec **phpMyAdmin**.

La distinction est importante : **la base de données**, ce sont les données ; **le SGBD**, c'est le logiciel qui s'en occupe. On ne parle jamais directement aux fichiers de la base : on passe toujours par le SGBD.

![Les applications et les utilisateurs passent toujours par le SGBD](img/sgbd.png "Rôle du SGBD"){ style="display: block; margin: 0 auto" }

#### 2.2 SQL

Pour communiquer avec un SGBDR, on utilise un langage : **SQL** (*Structured Query Language*). C'est un langage **standardisé** (norme ANSI / ISO) : les bases sont les mêmes d'un SGBDR à l'autre, seuls quelques détails changent.

SQL est un langage **déclaratif** : on décrit **ce que l'on veut obtenir**, et non **comment** le SGBD doit faire pour l'obtenir.

```sql
SELECT first_name, last_name
FROM student
WHERE city = 'Lyon';
```

Ici, on demande « les prénoms et noms des élèves qui habitent à Lyon ». On ne dit pas au SGBD comment parcourir la table : c'est son travail.

Les instructions SQL se rangent en quatre familles :

| Famille | Rôle | Instructions principales |
|---|---|---|
| **LDD** – Langage de Définition de Données (*DDL*) | Définir la **structure** : bases, tables, colonnes | `CREATE`, `ALTER`, `DROP` |
| **LMD** – Langage de Manipulation de Données (*DML*) | Travailler sur le **contenu** | `SELECT`, `INSERT`, `UPDATE`, `DELETE` |
| **LCD** – Langage de Contrôle de Données (*DCL*) | Gérer les **droits** des utilisateurs | `GRANT`, `REVOKE` |
| **LCT** – Langage de Contrôle des Transactions (*TCL*) | Valider ou annuler un ensemble d'opérations | `START TRANSACTION`, `COMMIT`, `ROLLBACK` |

Nous verrons chacune de ces familles au fil du cours.

**Conventions d'écriture** :

- les mots-clés SQL s'écrivent en **MAJUSCULES** (`SELECT`, `FROM`…), ce n'est pas obligatoire mais beaucoup plus lisible ;
- on revient à la ligne à chaque clause ;
- chaque instruction se termine par un **point-virgule** `;`.

#### 2.3 Requête

Une **requête** est une instruction SQL envoyée au SGBD. On peut la voir comme **une question posée à la base** (« quels élèves ont plus de 14 ? ») ou **un ordre donné à la base** (« ajoute cet élève », « supprime cette note »).

---

### 3. Le modèle relationnel

#### 3.1 Un peu d'histoire

Le modèle relationnel a été proposé en **1970** par **Edgar F. Codd**, chercheur chez IBM. Son idée : représenter toutes les données sous forme de **tableaux à deux dimensions**, appelés **relations**, et les relier entre elles par des **valeurs communes** plutôt que par des liens physiques (pointeurs) comme dans les modèles plus anciens.

Plus de cinquante ans plus tard, c'est toujours le modèle le plus utilisé au monde.

#### 3.2 Table, ligne, colonne

Dans une base relationnelle, les données sont rangées dans des **tables**. Chaque table représente **un type de chose** (une *entité*) : des élèves, des matières, des commandes, des produits…

Voici un extrait de la table `student` de la base `scholar` que nous utiliserons tout au long du cours :

| student_id | first_name | last_name | age | average_grade | email | city |
|---|---|---|---|---|---|---|
| 1 | Alice | Dupont | 22 | 14.75 | alice.dupont@mail.com | Paris |
| 2 | Bob | Martin | 23 | 12.60 | bob.martin@mail.com | Toulouse |
| 3 | Claire | Lemoine | 24 | 16.20 | claire.lemoine@mail.com | Lyon |
| 11 | Léo | Benoit | 25 | 12.30 | *NULL* | Toulouse |

- **Une table** (ou *relation*) : ici `student`, l'ensemble des élèves.
- **Une colonne** (ou *attribut*, *champ*) : une caractéristique commune à toutes les lignes. Ici `first_name`, `age`, `city`…
- **Une ligne** (ou *enregistrement*, *tuple*) : un élément précis de la table. Ici, un élève.
- **Une cellule** : la valeur d'une colonne pour une ligne donnée. Ici, l'âge de Bob vaut `23`.

Vous rencontrerez plusieurs mots pour la même chose selon les sources :

| Vocabulaire courant | Vocabulaire théorique | En anglais |
|---|---|---|
| Table | Relation | Table |
| Ligne / enregistrement | Tuple / n-uplet | Row / record |
| Colonne / champ | Attribut | Column / field |

#### 3.3 Type de données

Chaque colonne a un **type** qui définit ce qu'elle peut contenir : un nombre entier, un nombre décimal, du texte, une date…

Dans `student` :

- `age` est un **entier** (`INT`) : impossible d'y mettre « vingt-deux » ;
- `average_grade` est un **décimal** (`DECIMAL(4,2)`) : jusqu'à 4 chiffres dont 2 après la virgule ;
- `first_name` est un **texte** de 50 caractères maximum (`VARCHAR(50)`).

Le type est une première garantie que les données restent cohérentes. Nous détaillerons les types en partie III.

#### 3.4 La valeur NULL

`NULL` signifie **« absence de valeur »** : la donnée est inconnue ou non renseignée. Dans l'exemple ci-dessus, Léo Benoit n'a pas d'email.

Attention : `NULL` n'est **ni** `0`, **ni** une chaîne vide `''`. C'est l'absence de valeur, et elle se traite de façon particulière en SQL.

#### 3.5 Clé primaire

Chaque ligne d'une table doit pouvoir être **identifiée de façon unique**. C'est le rôle de la **clé primaire** (*primary key*, souvent abrégée **PK**).

Dans `student`, deux élèves s'appellent Alice, et plusieurs portent le nom Lemoine : ni le prénom ni le nom ne suffisent à désigner un élève précis. On utilise donc une colonne dédiée, `student_id`, qui :

- est **unique** : deux lignes ne peuvent pas avoir la même valeur ;
- n'est **jamais vide** (jamais `NULL`) ;
- ne change pas dans le temps.

Le plus souvent, c'est un entier **auto-incrémenté** : le SGBD attribue automatiquement 1, 2, 3… à chaque nouvelle ligne.

#### 3.6 Clé étrangère et relations entre tables

La force du modèle relationnel, c'est de **relier les tables entre elles**. On le fait avec une **clé étrangère** (*foreign key*, **FK**) : une colonne d'une table qui contient la valeur de la clé primaire d'une autre table.

Prenons les tables `subject` (matières) et `department` (spécialisations) :

**Table `department`**

| department_id | department_name |
|---|---|
| 1 | Informatique |
| 2 | Mathématiques |
| 3 | Biologie |

**Table `subject`**

| subject_id | subject_name | department_id |
|---|---|---|
| 1 | Programmation | 1 |
| 2 | Réseaux | 1 |
| 3 | Algèbre | 2 |
| 5 | Biologie Cellulaire | 3 |

La colonne `department_id` de `subject` est une **clé étrangère** : elle **fait référence** à `department_id` de la table `department`. On lit ainsi que la matière « Réseaux » appartient au département n°1, c'est-à-dire « Informatique ».

Pourquoi ne pas simplement écrire « Informatique » dans `subject` ?

- le nom du département n'est stocké **qu'une seule fois** : si on le renomme, on ne le modifie qu'à un endroit ;
- on évite les fautes de frappe qui créeraient de faux départements (« Informatique », « informatique », « Infomatique »…) ;
- le SGBD peut **vérifier** qu'on ne rattache pas une matière à un département qui n'existe pas.

Ce principe, **ne stocker chaque information qu'à un seul endroit et la relier par des clés**, est au cœur de toute la conception relationnelle. Nous l'approfondirons en partie II.

#### 3.7 Schéma de base de données

Le **schéma** d'une base décrit sa **structure** : la liste des tables, leurs colonnes, leurs types, leurs clés et les relations entre elles. Le schéma, c'est le plan ; les lignes, c'est le contenu.

Voici le schéma de la base `scholar` :

![Schéma de la base scholar](img/schema-scholar.png "Schéma de la base scholar"){ style="display: block; margin: 0 auto" }

```
student (student_id, first_name, last_name, age, average_grade, email, phone_number, city)
department (department_id, department_name)
subject (subject_id, subject_name, #department_id)
student_department (#student_id, #department_id)
note (note_id, #student_id, #subject_id, grade)
```

Dans cette notation, la clé primaire est **soulignée** (ici, la première colonne de chaque table) et les clés étrangères sont précédées d'un **#**.

On remarque la table `student_department` : elle ne contient que deux clés étrangères. Elle sert à indiquer **quel élève est inscrit dans quel département**, sachant qu'un élève peut avoir plusieurs spécialisations et qu'un département accueille plusieurs élèves. Ce type de table, appelé **table d'association**, sera étudié en partie II.

---

### 4. En résumé

- Une **base de données** stocke des informations de façon organisée pour pouvoir les créer, lire, modifier et supprimer (CRUD).
- Le **SGBD** est le logiciel qui gère la base ; on lui parle en **SQL**.
- Dans le **modèle relationnel**, les données sont rangées dans des **tables** composées de **lignes** et de **colonnes** typées.
- La **clé primaire** identifie chaque ligne de façon unique.
- La **clé étrangère** relie une table à une autre en reprenant la valeur d'une clé primaire.
- Le **schéma** décrit l'ensemble de la structure de la base.

---

*Sources :*
*- Julien POIRIER*
*- Wikipédia*
*- sql.sh*
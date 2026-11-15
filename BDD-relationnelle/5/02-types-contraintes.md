# Créer et gérer les tables

## Gestion des contraintes d'intégrité et des types de données

En partie 5.A, nous avons créé des tables avec quatre types simples et une seule contrainte (`NOT NULL`). Une base bien conçue va plus loin : chaque colonne reçoit le type **le plus adapté** à ce qu'elle contient, et la base **refuse elle-même** les valeurs incohérentes, grâce aux **contraintes d'intégrité**.

L'objectif : qu'aucune donnée fausse ne puisse entrer dans la base, quelle que soit l'application qui écrit dedans.

---

### 1. Pourquoi bien choisir les types ?

Le type d'une colonne n'est pas un détail. Il détermine :

- **ce qu'on peut y mettre** : une colonne `DATE` refuse « hier » ou un 31 février (partie 3) ;
- **comment les valeurs sont comparées et triées** : en texte, `'10'` est plus petit que `'9'` (le caractère `1` vient avant `9`), alors qu'en nombre, 10 est plus grand que 9 ;
- **les calculs possibles** : on ne fait pas la moyenne d'un texte, ni l'écart entre deux dates stockées en `VARCHAR` ;
- **la place occupée** sur le disque et en mémoire, donc la rapidité des requêtes sur de gros volumes.

La règle : choisir le type **le plus précis** qui convient à la donnée, avec une marge raisonnable pour l'avenir.

---

### 2. Les types numériques

#### 2.1 Les nombres entiers

| Type | Place | Valeurs possibles | Valeurs possibles en `UNSIGNED` |
|---|---|---|---|
| `TINYINT` | 1 octet | de -128 à 127 | de 0 à 255 |
| `SMALLINT` | 2 octets | de -32 768 à 32 767 | de 0 à 65 535 |
| `MEDIUMINT` | 3 octets | environ ± 8 millions | de 0 à environ 16 millions |
| `INT` | 4 octets | environ ± 2,1 milliards | de 0 à environ 4,3 milliards |
| `BIGINT` | 8 octets | environ ± 9,2 × 10¹⁸ | de 0 à environ 1,8 × 10¹⁹ |

**`UNSIGNED`** (« non signé ») interdit les nombres négatifs, et double en échange la valeur maximale. C'est utile pour une quantité, une capacité, ou un identifiant :

```sql
capacite SMALLINT UNSIGNED NOT NULL
```

Pour une clé primaire en `AUTO_INCREMENT`, `INT` (ou `INT UNSIGNED`) suffit dans la quasi-totalité des cas. On choisit `BIGINT` pour des tables qui peuvent dépasser les 2 milliards de lignes (des logs, des clics…).

> Une clé étrangère doit avoir **exactement** le même type que la clé primaire qu'elle référence, `UNSIGNED` compris : `INT` et `INT UNSIGNED` sont incompatibles (erreur `#3780`, partie 5.A).

> On rencontre parfois `INT(11)` dans les anciens scripts ou les exports. Le nombre entre parenthèses n'a **jamais** limité la valeur stockée : c'était une simple indication d'affichage, abandonnée depuis MySQL 8.

#### 2.2 Les nombres décimaux

| Type | Précision | Usage |
|---|---|---|
| `DECIMAL(p, d)` | **Exacte** | Prix, montants, notes, tout ce qui doit être juste au centime près |
| `FLOAT`, `DOUBLE` | **Approchée** | Mesures scientifiques, coordonnées GPS, calculs où une infime erreur est acceptable |

`DECIMAL(p, d)` stocke `p` chiffres au total, dont `d` après la virgule :

| Déclaration | Valeur maximale | Exemple d'usage |
|---|---|---|
| `DECIMAL(4,2)` | 99.99 | Une note sur 20 (`grade` dans `scholar`) |
| `DECIMAL(6,2)` | 9 999.99 | Un tarif mensuel |
| `DECIMAL(10,2)` | 99 999 999.99 | Un chiffre d'affaires |

Pourquoi ne pas utiliser `FLOAT` pour un prix ? Parce qu'un `FLOAT` est stocké en binaire, et que beaucoup de nombres décimaux n'y ont **pas de représentation exacte**, comme 1/3 n'a pas d'écriture décimale exacte. Les petites erreurs s'accumulent :

```sql
-- Nombres à virgule flottante (écriture scientifique : 0.1e0 = 0,1)
SELECT 0.1e0 + 0.2e0;    -- 0.30000000000000004

-- Nombres décimaux exacts
SELECT 0.1 + 0.2;        -- 0.3
```

Sur une facture, une erreur d'un centime est une vraie erreur : les montants sont **toujours** en `DECIMAL`.

#### 2.3 Les booléens

MySQL n'a pas de vrai type booléen. `BOOLEAN` (ou `BOOL`) est un simple synonyme de `TINYINT(1)` : `TRUE` vaut 1, `FALSE` vaut 0.

```sql
en_ligne BOOLEAN NOT NULL DEFAULT FALSE
```

C'est ce que vous voyez dans le MLD de l'agence immobilière (partie 4.B) : les colonnes `sold` et `online` sont en `tinyint(1)`.

---

### 3. Les types texte

#### 3.1 CHAR et VARCHAR

| Type | Principe | Usage |
|---|---|---|
| `CHAR(n)` | Longueur **fixe** : toujours `n` caractères (complétés par des espaces) | Valeurs de longueur constante : code pays (`FR`), code postal… |
| `VARCHAR(n)` | Longueur **variable** : de 0 à `n` caractères, n'occupe que la place nécessaire | Noms, emails, adresses… la grande majorité des textes |

Le `n` est un nombre de **caractères** (et non d'octets) : `VARCHAR(50)` accepte 50 lettres, accentuées ou non. Un texte plus long est refusé (erreur `#1406`, partie 3).

Quelques repères de longueur :

| Donnée | Type conseillé |
|---|---|
| Prénom, nom | `VARCHAR(50)` à `VARCHAR(100)` |
| Email | `VARCHAR(255)` (la norme autorise jusqu'à 254 caractères) |
| Téléphone | `VARCHAR(20)` |
| Code postal français | `CHAR(5)` |
| Chemin ou nom de fichier | `VARCHAR(255)` |

> **Un numéro de téléphone ou un code postal ne se stocke pas dans un `INT`**, même s'il ne contient que des chiffres. Un `INT` supprime le zéro initial (`0601020304` deviendrait `601020304`, et le code postal de Bourg-en-Bresse `01000` deviendrait `1000`), et on ne fait jamais de calcul dessus. La règle : si on ne calcule pas avec, c'est du **texte**.

#### 3.2 Les textes longs

Pour un texte qui peut dépasser quelques centaines de caractères (une description, un commentaire, un article), on utilise la famille `TEXT` :

| Type | Taille maximale |
|---|---|
| `TEXT` | 65 535 octets (environ 16 000 à 65 000 caractères selon les caractères utilisés) |
| `MEDIUMTEXT` | 16 Mo |
| `LONGTEXT` | 4 Go |

Une colonne `TEXT` est moins pratique qu'un `VARCHAR` : elle s'indexe mal (partie 8) et se manipule moins facilement. On la réserve donc aux textes vraiment longs.

#### 3.3 ENUM : une liste de valeurs autorisées

`ENUM` n'accepte qu'une valeur parmi une **liste fixe** :

```sql
niveau ENUM('débutant', 'intermédiaire', 'confirmé') NOT NULL
```

Toute autre valeur est refusée. C'est pratique pour une liste courte qui ne changera jamais, mais **ajouter une valeur** à la liste oblige à modifier la structure de la table (`ALTER TABLE`). Dès que la liste peut évoluer, on préfère une **table à part** reliée par une clé étrangère, comme les départements de `scholar` ou les catégories de plats du restaurant (partie 4).

---

### 4. Les types date et heure

| Type | Contenu | Format | Exemple |
|---|---|---|---|
| `DATE` | Une date | `AAAA-MM-JJ` | `2026-11-12` |
| `TIME` | Une heure (ou une durée) | `HH:MM:SS` | `18:30:00` |
| `DATETIME` | Une date et une heure | `AAAA-MM-JJ HH:MM:SS` | `2026-11-12 18:30:00` |
| `TIMESTAMP` | Une date et une heure, avec gestion des fuseaux horaires | `AAAA-MM-JJ HH:MM:SS` | `2026-11-12 18:30:00` |
| `YEAR` | Une année | `AAAA` | `2026` |

**`DATETIME` ou `TIMESTAMP` ?**

- `DATETIME` stocke la date **telle qu'on la donne**, de l'an 1000 à l'an 9999. C'est le bon choix pour une date « métier » : un rendez-vous, une date de séance.
- `TIMESTAMP` est converti en heure universelle (UTC) à l'enregistrement, puis dans le fuseau horaire du serveur à la lecture. Il ne couvre que la période de 1970 à **2038**. On l'utilise surtout pour les dates **techniques** : création ou modification d'une ligne.

Une date de naissance ne mérite qu'un `DATE` : l'heure n'a pas d'intérêt. Et, comme pour le téléphone, une date ne se stocke **jamais** en `VARCHAR` : on perdrait le contrôle de validité, le tri chronologique et toutes les fonctions de dates (partie 2.B).

---

### 5. Choisir le type : récapitulatif

| Donnée | Type conseillé |
|---|---|
| Identifiant (clé primaire) | `INT AUTO_INCREMENT` (ou `INT UNSIGNED`) |
| Quantité, capacité, nombre de places | `SMALLINT UNSIGNED` ou `INT UNSIGNED` |
| Prix, montant, note | `DECIMAL(p, d)` |
| Oui / non | `BOOLEAN` |
| Nom, prénom, ville | `VARCHAR(50)` à `VARCHAR(100)` |
| Email, URL, chemin de fichier | `VARCHAR(255)` |
| Téléphone, code postal, numéro de sécurité sociale | `VARCHAR` ou `CHAR` (jamais `INT`) |
| Description, commentaire | `TEXT` |
| Petite liste figée | `ENUM(…)`, ou une table à part si elle peut évoluer |
| Date | `DATE` |
| Date et heure d'un événement | `DATETIME` |
| Date de création d'une ligne | `TIMESTAMP` ou `DATETIME` |

> **Et les images ?** On ne stocke pas les fichiers eux-mêmes dans la base (c'est possible avec le type `BLOB`, mais lourd et peu pratique). On stocke le fichier sur le serveur, et seulement son **chemin** dans un `VARCHAR(255)`. C'est le cas de la colonne `img` de l'agence immobilière (partie 4.B).

**Pratiquons !!**

Rdv au fichier `5-exercices.md`, niveau 3.

---

### 6. Les contraintes d'intégrité

Une **contrainte** est une règle que la base vérifie **à chaque écriture** (`INSERT` et `UPDATE`). Si la règle n'est pas respectée, l'écriture est refusée. Vous en connaissez déjà plusieurs : `NOT NULL`, `PRIMARY KEY` et `FOREIGN KEY`.

| Contrainte | Règle garantie |
|---|---|
| `NOT NULL` | La colonne doit avoir une valeur |
| `DEFAULT` | Valeur utilisée quand on n'en donne pas |
| `UNIQUE` | Deux lignes ne peuvent pas avoir la même valeur |
| `CHECK` | La valeur doit respecter une condition |
| `PRIMARY KEY` | Identifiant unique et obligatoire de chaque ligne |
| `FOREIGN KEY` | La valeur doit exister dans la table référencée |

#### 6.1 NOT NULL

Une colonne `NOT NULL` doit **toujours** avoir une valeur. On la déduit des règles de gestion (« on connaît son nom… ») et des cardinalités minimales (1,1 → clé étrangère `NOT NULL`, partie 4.B). Erreurs associées : `#1364` et `#1048` (partie 3).

> En cas de doute, préférez `NOT NULL` : il est facile d'assouplir une contrainte plus tard, beaucoup plus difficile de la durcir quand la table contient déjà des lignes vides.

#### 6.2 DEFAULT

`DEFAULT` définit la valeur utilisée **quand on n'en donne pas** dans l'`INSERT` :

```sql
CREATE TABLE salle (
    id_salle INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    capacite SMALLINT UNSIGNED NOT NULL DEFAULT 20,
    climatisee BOOLEAN NOT NULL DEFAULT FALSE
);

INSERT INTO salle (nom) VALUES ('Dojo');
-- capacite vaut 20, climatisee vaut 0
```

Pour une date, la valeur par défaut peut être la date du jour. Les expressions s'écrivent alors **entre parenthèses** :

```sql
date_inscription DATE NOT NULL DEFAULT (CURRENT_DATE)
```

Pour une date et heure de création, on utilise souvent :

```sql
cree_le DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
modifie_le DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
```

`ON UPDATE CURRENT_TIMESTAMP` met automatiquement la colonne à jour à chaque `UPDATE` de la ligne : on sait ainsi quand elle a été modifiée pour la dernière fois.

> `DEFAULT` ne s'applique que si la colonne est **absente** de l'`INSERT`. Si on écrit explicitement `NULL`, c'est `NULL` qui est inséré (ou refusé si la colonne est `NOT NULL`).

#### 6.3 UNIQUE

`UNIQUE` interdit que deux lignes aient la même valeur dans la colonne :

```sql
email VARCHAR(255) UNIQUE
```

```sql
INSERT INTO adherent (nom, prenom, date_naissance, email)
VALUES ('Roux', 'Emma', '2005-01-02', 'emma.roux@mail.com');
-- une deuxième fois :
```
```
#1062 - Duplicate entry 'emma.roux@mail.com' for key 'adherent.email'
```

C'est le même code d'erreur que pour un doublon de clé primaire (partie 3). Quelques précisions :

- une colonne `UNIQUE` **peut** accepter `NULL`, et même **plusieurs** `NULL` : deux adhérents sans email ne sont pas en doublon ;
- une table peut avoir **plusieurs** colonnes `UNIQUE`, mais une seule clé primaire ;
- `UNIQUE` peut porter sur **plusieurs colonnes**, comme une clé primaire composée : c'est alors la combinaison qui doit être unique.

```sql
-- Deux salles ne peuvent pas avoir le même nom dans le même bâtiment
CONSTRAINT uq_salle_nom_batiment UNIQUE (nom, batiment)
```

C'est aussi `UNIQUE` qui transforme une clé étrangère en association 1:1 (partie 4.B) : un adhérent ne peut avoir qu'une seule carte si `carte.id_adherent` est `UNIQUE`.

#### 6.4 CHECK

`CHECK` impose une **condition** que chaque valeur doit respecter. On y écrit une condition comme dans un `WHERE` (partie 2) :

```sql
CREATE TABLE activite (
    id_activite INT AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    tarif DECIMAL(6,2) NOT NULL CHECK (tarif >= 0),
    niveau ENUM('débutant', 'intermédiaire', 'confirmé') NOT NULL,
    places_max SMALLINT UNSIGNED NOT NULL,
    CONSTRAINT chk_places_max CHECK (places_max BETWEEN 1 AND 50)
);
```

```sql
INSERT INTO activite (nom, tarif, niveau, places_max)
VALUES ('Yoga', -10, 'débutant', 15);
```
```
#3819 - Check constraint 'activite_chk_1' is violated.
```

Une contrainte `CHECK` peut porter sur **plusieurs colonnes** de la même ligne. Elle s'écrit alors à la fin de la table :

```sql
-- Dans une table d'emprunts : le retour ne peut pas précéder l'emprunt
CONSTRAINT chk_dates CHECK (date_retour IS NULL OR date_retour >= date_emprunt)
```

Notez le `date_retour IS NULL OR …` : un livre pas encore rendu n'a pas de date de retour, et il ne doit pas être refusé.

> **Attention aux versions** : `CHECK` n'est réellement appliqué qu'à partir de **MySQL 8.0.16**. Les versions plus anciennes (et certaines versions de MariaDB) acceptaient la syntaxe… et l'ignoraient silencieusement. Vérifiez la version de votre serveur, affichée sur la page d'accueil de phpMyAdmin.

> `CHECK` ne vérifie que des valeurs de **la même ligne**. Une règle qui dépend d'autres lignes ou d'autres tables (« pas plus de 15 inscrits par activité », « une note seulement dans une matière du département de l'élève ») ne peut pas s'écrire avec `CHECK` : elle doit être vérifiée par l'application.

#### 6.5 Nommer ses contraintes

Comme pour les clés étrangères (partie 5.A), toute contrainte peut recevoir un nom avec `CONSTRAINT`. Sans nom, MySQL en génère un (`activite_chk_1`), peu parlant dans un message d'erreur. Une convention courante :

| Contrainte | Préfixe | Exemple |
|---|---|---|
| Clé primaire | `pk_` | `pk_inscription` |
| Clé étrangère | `fk_` | `fk_activite_coach` |
| Unique | `uq_` | `uq_adherent_email` |
| Check | `chk_` | `chk_activite_tarif` |

#### 6.6 Ajouter ou supprimer une contrainte sur une table existante

```sql
-- Ajouter
ALTER TABLE adherent ADD CONSTRAINT uq_adherent_email UNIQUE (email);
ALTER TABLE activite ADD CONSTRAINT chk_activite_tarif CHECK (tarif >= 0);
ALTER TABLE salle ALTER capacite SET DEFAULT 20;

-- Supprimer
ALTER TABLE adherent DROP INDEX uq_adherent_email;
ALTER TABLE activite DROP CHECK chk_activite_tarif;
ALTER TABLE salle ALTER capacite DROP DEFAULT;
```

Une contrainte `UNIQUE` se supprime avec `DROP INDEX` : MySQL la met en œuvre sous la forme d'un **index**, notion que nous verrons en partie 8.

Si les données déjà présentes ne respectent pas la nouvelle contrainte (deux adhérents avec le même email, un tarif négatif…), MySQL **refuse** de l'ajouter. Il faut d'abord corriger les données.

---

### 7. Application

#### 7.1 Le club de sport, version complète

```sql
CREATE TABLE coach (
    id_coach INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    specialite VARCHAR(50)
);

CREATE TABLE salle (
    id_salle INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL UNIQUE,
    capacite SMALLINT UNSIGNED NOT NULL,
    CONSTRAINT chk_salle_capacite CHECK (capacite > 0)
);

CREATE TABLE adherent (
    id_adherent INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    prenom VARCHAR(50) NOT NULL,
    date_naissance DATE NOT NULL,
    email VARCHAR(255) UNIQUE,
    cree_le DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE activite (
    id_activite INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(50) NOT NULL,
    tarif DECIMAL(6,2) NOT NULL,
    id_coach INT UNSIGNED NOT NULL,
    id_salle INT UNSIGNED NOT NULL,
    CONSTRAINT chk_activite_tarif CHECK (tarif >= 0),
    CONSTRAINT fk_activite_coach FOREIGN KEY (id_coach) REFERENCES coach(id_coach),
    CONSTRAINT fk_activite_salle FOREIGN KEY (id_salle) REFERENCES salle(id_salle)
);

CREATE TABLE inscription (
    id_adherent INT UNSIGNED,
    id_activite INT UNSIGNED,
    date_inscription DATE NOT NULL DEFAULT (CURRENT_DATE),
    CONSTRAINT pk_inscription PRIMARY KEY (id_adherent, id_activite),
    CONSTRAINT fk_inscription_adherent FOREIGN KEY (id_adherent) REFERENCES adherent(id_adherent),
    CONSTRAINT fk_inscription_activite FOREIGN KEY (id_activite) REFERENCES activite(id_activite)
);
```

Les choix faits par rapport à la version de la partie 5.A :

| Choix | Raison |
|---|---|
| Identifiants en `INT UNSIGNED` | Un numéro n'est jamais négatif. Les clés étrangères suivent : même type exactement. |
| `salle.nom` `UNIQUE` | Deux salles du club ne portent pas le même nom. |
| `capacite` en `SMALLINT UNSIGNED` avec `CHECK (capacite > 0)` | Une capacité est un entier positif, et nulle ne suffit pas : une salle accueille au moins une personne. |
| `email` en `VARCHAR(255) UNIQUE` | Longueur maximale d'un email ; deux adhérents ne partagent pas la même adresse, mais l'email reste facultatif. |
| `cree_le` avec `DEFAULT CURRENT_TIMESTAMP` | Date d'inscription au club, remplie automatiquement. |
| `CHECK (tarif >= 0)` | Une activité peut être gratuite, jamais négative. |
| `date_inscription` avec `DEFAULT (CURRENT_DATE)` | Le plus souvent, on inscrit l'adhérent le jour même. |
| Contraintes nommées | Messages d'erreur lisibles, suppression facile. |

#### 7.2 Renforcer la base scholar

Les données de `scholar` respectent déjà ces règles : on peut ajouter les contraintes sans rien corriger.

```sql
USE scholar;

-- Une note est toujours comprise entre 0 et 20
ALTER TABLE note
ADD CONSTRAINT chk_note_grade CHECK (grade BETWEEN 0 AND 20);

-- Deux élèves ne partagent pas la même adresse email
ALTER TABLE student
ADD CONSTRAINT uq_student_email UNIQUE (email);

-- Par défaut, une note est datée du jour
ALTER TABLE note
MODIFY note_date DATE NOT NULL DEFAULT (CURRENT_DATE);
```

Désormais, une note de 25 ou un deuxième élève avec l'adresse `alice.dupont@mail.com` sont refusés, quelle que soit l'application qui tente de les enregistrer.

---

### 8. La base ou l'application ?

Une application web vérifie déjà les données saisies dans ses formulaires : pourquoi les vérifier aussi dans la base ?

- **Plusieurs portes d'entrée** : un site web, une application mobile, un script d'import, phpMyAdmin… La contrainte en base est la seule vérification qui s'applique à **tous**.
- **Les bugs** : une erreur de programmation peut laisser passer une valeur invalide. La base, elle, ne laisse rien passer.
- **Le dernier rempart** : une donnée fausse qui entre dans la base est difficile à repérer et à corriger ensuite.

Les deux vérifications sont donc **complémentaires** :

- **l'application** vérifie pour **aider l'utilisateur** (message clair, champ en rouge) ;
- **la base** vérifie pour **garantir la cohérence** des données, quoi qu'il arrive.

**Pratiquons !!**

Rdv au fichier `5-exercices.md`, niveau 4.

---

### 9. En résumé

- Le **type** d'une colonne détermine ce qu'elle accepte, comment elle se trie et se calcule, et la place qu'elle occupe.
- **Entiers** : `TINYINT` à `BIGINT`, `UNSIGNED` pour interdire les négatifs. **Montants et notes** : `DECIMAL`, jamais `FLOAT`.
- **Textes** : `VARCHAR(n)` le plus souvent, `CHAR(n)` pour une longueur fixe, `TEXT` pour un texte long. Téléphones et codes postaux sont du **texte**.
- **Dates** : `DATE`, `DATETIME`, `TIMESTAMP`, jamais en `VARCHAR`.
- **Contraintes** : `NOT NULL`, `DEFAULT`, `UNIQUE`, `CHECK`, `PRIMARY KEY`, `FOREIGN KEY`. Elles sont vérifiées à chaque `INSERT` et `UPDATE`.
- On **nomme** ses contraintes (`fk_`, `uq_`, `chk_`…) pour des erreurs lisibles et une gestion facile.
- La base garantit la cohérence des données, quelle que soit l'application qui écrit dedans.

---

*Sources :*
*- Julien POIRIER*
*- sql.sh*
*- dev.mysql.com*

---

© Vincent Chiofalo

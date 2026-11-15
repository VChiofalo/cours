# Concevoir sa propre base de données

## Tables, clés primaires et étrangères, relations : du MCD au MLD

En partie 4.A, nous avons dessiné le **MCD** : des entités, des associations et des cardinalités, sans aucune notion technique. Il faut maintenant le traduire en **tables** : c'est le **MLD** (Modèle Logique de Données). Cette traduction suit quelques règles simples et systématiques, qui expliquent enfin **pourquoi** la base `scholar` a exactement la forme que vous connaissez.

---

### 1. Du conceptuel au logique : le vocabulaire

| MCD (conceptuel) | MLD (logique) | Dans MySQL |
|---|---|---|
| Entité | Table (ou relation) | `TABLE` |
| Attribut | Colonne | Colonne |
| Identifiant | Clé primaire | `PRIMARY KEY` |
| Association | Clé étrangère, ou nouvelle table | `FOREIGN KEY` |
| Occurrence | Ligne (ou tuple) | Ligne |

Le grand changement entre les deux niveaux concerne les **associations** : dans le MLD, elles disparaissent en tant que telles et deviennent des **clés étrangères**.

#### 1.1 La notation du MLD

Le MLD s'écrit le plus souvent sous forme **textuelle**, une ligne par table :

```
nom_table (cle_primaire, colonne1, colonne2, #cle_etrangere)
```

- la **clé primaire** est **soulignée** (et placée en premier, par habitude) ;
- les **clés étrangères** sont précédées d'un **#** ;
- une colonne peut être les deux à la fois : elle est alors soulignée **et** précédée d'un #.

Exemple : subject (<u>subject_id</u>, subject_name, #department_id).

Dans les blocs de code de ce support, où le soulignement est impossible, la clé primaire est simplement la **première colonne**. Pour `student_department`, dont la clé primaire est composée, ce sont les **deux premières**.

Le MLD peut aussi être **dessiné**, comme dans le concepteur de phpMyAdmin (partie 1.B) : chaque table est un rectangle, et chaque clé étrangère est reliée par un trait à la clé primaire qu'elle référence.

*Exemple de MLD dessiné dans phpMyAdmin (une application d'agence immobilière) :*
![Exemple de MLD dans phpMyAdmin](img/bdd-sql.png "MLD dans phpMyAdmin"){ style="display: block; margin: 0 auto" }

On y lit que chaque bien immobilier (`realties`) est rattaché à un utilisateur (`user_id`) et à un contact (`contact_id`).

---

### 2. Les clés

#### 2.1 La clé primaire

Comme vu en partie 1.A, la **clé primaire** identifie chaque ligne de façon unique. Elle doit être :

- **unique** : deux lignes ne peuvent pas avoir la même valeur ;
- **obligatoire** : jamais `NULL` ;
- **stable** : elle ne doit pas changer dans le temps, puisque d'autres tables y font référence.

On distingue deux sortes de clés primaires :

| | Clé **naturelle** | Clé **artificielle** (ou technique) |
|---|---|---|
| Principe | Une donnée réelle, déjà unique | Un numéro sans signification, créé pour l'occasion |
| Exemples | Numéro de sécurité sociale, ISBN d'un livre, code IATA d'un aéroport (`CDG`) | `student_id`, `note_id` en `AUTO_INCREMENT` |
| Avantage | Pas de colonne en plus | Toujours unique, jamais modifiée, simple et rapide |
| Inconvénient | Peut changer, peut manquer, peut être une donnée sensible | Aucune signification pour l'utilisateur |

Dans la pratique, on utilise **presque toujours une clé artificielle** : un entier en `AUTO_INCREMENT`. Une adresse email, par exemple, semble unique, mais un élève peut en changer, ou ne pas en avoir (comme Léo Benoit).

#### 2.2 La clé primaire composée

Une clé primaire peut être formée de **plusieurs colonnes**. C'est alors la **combinaison** des valeurs qui doit être unique. Vous l'avez rencontrée dans `student_department` (partie 1.B) : le couple (`student_id`, `department_id`) est unique, car un élève ne s'inscrit pas deux fois dans le même département. On la retrouve dans toutes les tables issues d'une association N:N (paragraphe 3.3).

#### 2.3 La clé étrangère

Une **clé étrangère** est une colonne qui contient la valeur de la **clé primaire d'une autre table**. Elle matérialise le lien entre les deux tables.

*Exemple : une table de commandes, liée aux clients et aux livraisons :*
![Exemple de clés primaires et étrangères](img/keys.png "Clés primaires et étrangères"){ style="display: block; margin: 0 auto" }

Ici, la colonne « Id client » de la table `Commande` est une clé étrangère : elle contient le numéro d'un client de la table `Client`. On lit ainsi que la commande n°101 (une souris) a été passée par le client n°2, Ambre Cerna.

Ses règles :

- elle doit avoir le **même type** que la clé primaire qu'elle référence (un `INT` pour un `INT`) ;
- sa valeur doit **exister** dans la table référencée, sinon la base refuse l'écriture (erreur `#1452`, partie 3) ;
- elle **n'est pas unique** : plusieurs commandes peuvent avoir le même client (les commandes 101, 102 et 103 sont toutes à Ambre Cerna) ;
- elle **peut accepter `NULL`**, quand le lien est facultatif (paragraphe 3.2).

| | Clé primaire | Clé étrangère |
|---|---|---|
| Rôle | Identifier chaque ligne de **sa** table | Faire référence à une ligne d'une **autre** table |
| Unique | Oui | Non (en général) |
| `NULL` autorisé | Jamais | Oui, si le lien est facultatif |
| Nombre par table | Une seule (éventuellement sur plusieurs colonnes) | Autant que de liens |

> Les noms des colonnes ne suffisent pas à créer un lien : appeler une colonne `department_id` ne la rend pas clé étrangère. Il faut la **déclarer** comme telle dans la base (partie 5). C'est ce qui permet au SGBD de vérifier les valeurs et d'appliquer les suppressions en cascade.

#### 2.4 Les autres colonnes uniques

Une table n'a qu'**une** clé primaire, mais d'autres colonnes peuvent devoir être uniques : un email, un numéro de téléphone, un code produit… On les déclare comme **uniques** (contrainte `UNIQUE`, partie 5), sans en faire des clés primaires. Ces colonnes candidates à l'identification sont appelées **clés candidates** (ou clés alternatives).

---

### 3. Les règles de passage du MCD au MLD

![Du MCD au MLD](img/mcd-mld.png "Du MCD au MLD"){ style="display: block; margin: 0 auto" }

#### 3.1 Règle 1 : chaque entité devient une table

- L'entité devient une **table**.
- Ses attributs deviennent des **colonnes**.
- Son identifiant devient la **clé primaire**.

```
ÉLÈVE (id_eleve, prenom, nom, date_naissance, email, telephone, ville)
    devient
student (student_id, first_name, last_name, birth_date, email, phone_number, city)
```

#### 3.2 Règle 2 : une association 1:N devient une clé étrangère

Une association **1:N** a une cardinalité maximale **1** d'un côté et **n** de l'autre. Elle ne devient **pas** une table : on ajoute une **clé étrangère** dans la table du côté où la cardinalité maximale vaut **1**, qui pointe vers l'autre table.

```
DÉPARTEMENT ──0,n── ( PROPOSER ) ──1,1── MATIÈRE
```

Une matière est proposée par **un seul** département (1,1) : c'est donc la table `subject` qui reçoit la clé étrangère `#department_id`.

```
department (department_id, department_name)
subject (subject_id, subject_name, #department_id)
```

**Pourquoi de ce côté ?** Chaque matière a **un** département : une seule colonne suffit pour l'indiquer. Dans l'autre sens, un département a **plusieurs** matières : il faudrait une colonne `subject_id_1`, `subject_id_2`, `subject_id_3`… et on ne sait pas combien. Ou bien plusieurs valeurs dans une même cellule, ce qui est interdit dans une base relationnelle (paragraphe 5).

> **Moyen mnémotechnique** : la clé étrangère va **du côté du 1,1**. « Le petit pointe vers le grand » : chaque matière pointe vers son département.

**La cardinalité minimale** indique si la clé étrangère peut être vide :

| Cardinalité du côté de la clé étrangère | Signification | Clé étrangère |
|---|---|---|
| **1,1** | Le lien est obligatoire | `NOT NULL` |
| **0,1** | Le lien est facultatif | `NULL` autorisé |

Une matière a **toujours** un département (1,1) : `subject.department_id` devrait donc être déclarée `NOT NULL`.

> **Dans `scholar.sql`**, `subject.department_id`, `note.student_id` et `note.subject_id` ont été déclarées **sans** `NOT NULL`. C'est un oubli de conception : la base accepterait une matière sans département, ou une note sans élève. Nous corrigerons ce défaut en partie 5, en créant les tables nous-mêmes.

**Les attributs d'une association 1:N** (cas rare) migrent avec la clé étrangère, dans la même table.

#### 3.3 Règle 3 : une association N:N devient une table

Une association **N:N** a une cardinalité maximale **n** des deux côtés. Impossible de placer une clé étrangère d'un côté ou de l'autre : chaque élève a plusieurs départements, **et** chaque département a plusieurs élèves. L'association devient donc une **nouvelle table**, appelée **table d'association** (ou table de liaison, table de jointure) :

- elle contient une **clé étrangère vers chacune** des tables reliées ;
- sa **clé primaire est composée** de ces clés étrangères ;
- les **attributs de l'association** deviennent ses colonnes.

```
ÉLÈVE ──0,n── ( INSCRIRE ) ──0,n── DÉPARTEMENT
              date_inscription
```
devient :
```
student (student_id, first_name, last_name, …)
department (department_id, department_name)
student_department (#student_id, #department_id, enrollment_date)
```

Dans `student_department`, `student_id` et `department_id` sont **à la fois** clés étrangères et parties de la clé primaire (<u>#student_id</u>, <u>#department_id</u>).

Le nom de la table d'association est souvent formé des deux tables reliées (`student_department`), ou du nom de l'association (`inscription`, `enrollment`). Les deux conventions existent : l'important est d'en choisir une et de s'y tenir.

> **Et si un élève pouvait s'inscrire plusieurs fois dans le même département** (par exemple une fois par année scolaire) ? La clé primaire composée l'interdirait. On ajouterait alors l'année à la clé primaire, ou on donnerait à la table sa propre clé artificielle (`enrollment_id`). C'est le même raisonnement que pour `NOTE` en partie 4.A.

#### 3.4 Règle 4 : une association 1:1 devient une clé étrangère unique

Une association **1:1** a une cardinalité maximale **1** des deux côtés. On la traite comme une association 1:N : une clé étrangère d'un côté, en général du côté **0,1** (là où le lien est facultatif), à laquelle on ajoute une contrainte **`UNIQUE`**. Sans elle, deux lignes pourraient pointer vers la même ligne, et l'association deviendrait 1:N.

```
UTILISATEUR ──1,1── ( POSSÉDER ) ──0,1── PROFIL
```
devient :
```
user (user_id, email, password)
profile (profile_id, biography, avatar, #user_id)    -- user_id : NOT NULL et UNIQUE
```

Comme on l'a vu en partie 4.A, une association 1:1 doit toujours faire se poser la question : ces deux entités ne devraient-elles pas n'en faire qu'une ? Dans l'exemple, si chaque utilisateur avait forcément un profil, on placerait simplement la biographie et l'avatar dans la table `user`. On garde deux tables quand une partie des informations est facultative, rarement utilisée, ou sensible (un mot de passe, des données bancaires…).

#### 3.5 Récapitulatif des règles

| Élément du MCD | Cardinalités maximales | Dans le MLD |
|---|---|---|
| Entité | | Une table, l'identifiant devient la clé primaire |
| Association 1:N | 1 d'un côté, n de l'autre | Une clé étrangère dans la table du côté **1,1** ou **0,1** |
| Association N:N | n des deux côtés | Une **nouvelle table**, clé primaire composée des deux clés étrangères |
| Association 1:1 | 1 des deux côtés | Une clé étrangère **unique** (ou fusion des deux tables) |

Pour les cardinalités minimales : **1** côté clé étrangère → `NOT NULL` ; **0** → `NULL` autorisé.

---

### 4. Application : le MLD de la base scholar

Reprenons le MCD de `scholar` (partie 4.A) et appliquons les règles une à une.

**Étape 1 : les entités deviennent des tables.**

```
student (student_id, first_name, last_name, birth_date, email, phone_number, city)
department (department_id, department_name)
subject (subject_id, subject_name)
note (note_id, grade, note_date)
```

**Étape 2 : les associations 1:N deviennent des clés étrangères.**

| Association | Cardinalités | Clé étrangère ajoutée |
|---|---|---|
| `PROPOSER` | DÉPARTEMENT 0,n – 1,1 MATIÈRE | `subject.#department_id` (`NOT NULL`) |
| `OBTENIR` | ÉLÈVE 0,n – 1,1 NOTE | `note.#student_id` (`NOT NULL`) |
| `CONCERNER` | NOTE 1,1 – 0,n MATIÈRE | `note.#subject_id` (`NOT NULL`) |

**Étape 3 : l'association N:N devient une table.**

| Association | Cardinalités | Nouvelle table |
|---|---|---|
| `INSCRIRE` | ÉLÈVE 0,n – 0,n DÉPARTEMENT | `student_department (#student_id, #department_id, enrollment_date)` |

**Résultat : le MLD complet.**

```
student (student_id, first_name, last_name, birth_date, email, phone_number, city)
department (department_id, department_name)
subject (subject_id, subject_name, #department_id)
note (note_id, #student_id, #subject_id, grade, note_date)
student_department (#student_id, #department_id, enrollment_date)
```

On retrouve **exactement** les 5 tables de `scholar` et leurs colonnes (à l'exception de `average_grade`, la donnée calculée ajoutée volontairement pour les premiers exercices). Le schéma que vous explorez depuis la partie 1 n'est donc pas arbitraire : il découle mécaniquement du MCD.

**Pratiquons !!**

Rdv au fichier `4-exercices.md`, niveau 3.

---

### 5. Vérifier son modèle : les formes normales

Pour vérifier qu'un MLD ne contient ni redondance ni anomalie (partie 4.A), on s'appuie sur les **formes normales** : une série de règles, de plus en plus exigeantes. Un modèle construit avec la démarche MCD → MLD les respecte presque toujours. Elles servent surtout à **repérer les erreurs** dans une table existante, comme un fichier Excel qu'on voudrait transformer en base. Les trois premières suffisent dans la grande majorité des cas.

#### 5.1 Première forme normale (1FN) : des valeurs atomiques

> Chaque cellule contient **une seule valeur**, et la table a une clé primaire.

| student_id | first_name | departments |
|---|---|---|
| 3 | Claire | Mathématiques, Informatique |

Cette table n'est **pas** en 1FN : la cellule `departments` contient deux valeurs. Impossible de chercher proprement les élèves d'Informatique (un `LIKE '%Informatique%'` serait fragile), ou de compter les élèves par département. La solution : une table d'association, avec **une ligne par inscription**.

Même chose pour des colonnes répétées (`phone_1`, `phone_2`, `phone_3`) : c'est le signe qu'il manque une table.

#### 5.2 Deuxième forme normale (2FN) : toute la clé

> La table est en 1FN, et chaque colonne qui ne fait pas partie de la clé primaire dépend de **toute** la clé primaire, pas seulement d'une partie.

Cette règle ne concerne que les tables à **clé primaire composée**.

| <u>student_id</u> | <u>department_id</u> | enrollment_date | department_name |
|---|---|---|---|
| 3 | 1 | 2026-01-12 | Informatique |
| 3 | 2 | 2023-09-04 | Mathématiques |
| 1 | 1 | 2025-09-01 | Informatique |

`enrollment_date` dépend bien du **couple** élève / département : c'est la date de **cette** inscription. Mais `department_name` ne dépend que de `department_id`, c'est-à-dire d'une **partie** de la clé : il est répété à chaque inscription. Cette table n'est pas en 2FN : `department_name` doit rester dans la table `department`.

#### 5.3 Troisième forme normale (3FN) : rien que la clé

> La table est en 2FN, et chaque colonne qui ne fait pas partie de la clé dépend **directement** de la clé, et pas d'une autre colonne.

| <u>subject_id</u> | subject_name | department_id | department_name |
|---|---|---|---|
| 1 | Programmation | 1 | Informatique |
| 2 | Réseaux | 1 | Informatique |

`department_name` ne dépend pas de la matière, mais de `department_id`, qui n'est pas la clé de la table. On retrouve l'anomalie de mise à jour de la partie 4.A : renommer le département oblige à modifier toutes ses matières. La table n'est pas en 3FN : `department_name` doit être déplacée dans une table `department`.

> **À retenir** : une colonne doit dépendre de **la clé**, de **toute la clé**, et de **rien que la clé**.

Les données **calculées**, comme `average_grade`, posent le même type de problème : elles dépendent d'autres données (les notes), qu'il faudrait modifier en même temps. C'est pour cela qu'on ne les stocke pas.

**Pratiquons !!**

Rdv au fichier `4-exercices.md`, niveau 4.

---

### 6. Les erreurs fréquentes

- **Mettre la clé étrangère du mauvais côté** d'une association 1:N : elle va du côté du **1,1** (ou **0,1**), jamais du côté du **n**.
- **Oublier la table d'association** d'une association N:N, et tenter de mettre plusieurs valeurs dans une même cellule.
- **Oublier les attributs de l'association** : `date_inscription` doit apparaître dans la table d'association.
- **Donner un type différent** à une clé étrangère et à la clé primaire qu'elle référence.
- **Ignorer la cardinalité minimale** : un lien obligatoire (1,1) doit se traduire par une clé étrangère `NOT NULL`.
- **Choisir une clé primaire instable** (email, nom…) au lieu d'un identifiant artificiel.

---

### 7. En résumé

- Le **MLD** traduit le MCD en **tables**, **colonnes**, **clés primaires** et **clés étrangères**.
- Notation : la clé primaire est **soulignée**, les clés étrangères sont précédées d'un **#**.
- On privilégie les **clés primaires artificielles** (entier en `AUTO_INCREMENT`).
- **Entité** → table. **Association 1:N** → clé étrangère du côté du 1,1. **Association N:N** → table d'association à clé primaire composée. **Association 1:1** → clé étrangère unique.
- La cardinalité **minimale** décide si la clé étrangère est `NOT NULL` (1) ou non (0).
- Les **formes normales** permettent de vérifier un modèle : chaque colonne dépend de la clé, de toute la clé, et de rien que la clé.

---

*Sources :*
*- Julien POIRIER*
*- Wikipédia*
*- sql.sh*

---

© Vincent Chiofalo
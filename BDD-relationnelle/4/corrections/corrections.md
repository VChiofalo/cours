# Corrections – Partie 4 : Concevoir sa propre base de données

En modélisation, plusieurs réponses peuvent être correctes : noms des entités, des associations ou des colonnes, découpage de certaines informations… Ce qui compte, c'est que le modèle respecte les **règles de gestion** et les **règles de passage**. Les solutions ci-dessous sont des solutions de référence.

---

## Niveau 1 : Lire un MCD

- **Identifiants.**

| Entité | Identifiant |
|---|---|
| AUTEUR | id_auteur |
| LIVRE | id_livre |
| CATÉGORIE | id_categorie |
| ADHÉRENT | id_adherent |
| CARTE | id_carte |

L'`isbn` est unique pour chaque livre et pourrait servir d'identifiant naturel. On lui préfère un identifiant artificiel (partie 4.B), car tous les ouvrages n'ont pas d'ISBN (livres anciens, documents internes).

- **Lecture des associations.**

| Association | Sens 1 | Sens 2 |
|---|---|---|
| ÉCRIRE | Un auteur écrit au minimum **un** et au maximum **plusieurs** livres (1,n). | Un livre est écrit par au minimum **un** et au maximum **plusieurs** auteurs (1,n). |
| CLASSER | Un livre est classé dans **exactement une** catégorie (1,1). | Une catégorie classe **zéro ou plusieurs** livres (0,n). |
| EMPRUNTER | Un livre est emprunté par **zéro ou plusieurs** adhérents (0,n). | Un adhérent emprunte **zéro ou plusieurs** livres (0,n). |
| POSSÉDER | Un adhérent possède **zéro ou une** carte (0,1). | Une carte appartient à **exactement un** adhérent (1,1). |

Le minimum de 1 côté AUTEUR signifie qu'on n'enregistre un auteur que s'il a au moins un livre dans la médiathèque.

- **Types d'associations.**

| Association | Maximums | Type |
|---|---|---|
| ÉCRIRE | n et n | **N:N** |
| CLASSER | 1 et n | **1:N** |
| EMPRUNTER | n et n | **N:N** (porteuse de `date_emprunt` et `date_retour`) |
| POSSÉDER | 1 et 1 | **1:1** |

- **Règles de gestion** (une rédaction possible).

  1. Un auteur est identifié par un numéro. On connaît son nom, son prénom et sa nationalité.
  2. Un livre est identifié par un numéro. On connaît son titre, son ISBN et son année de parution.
  3. Un livre est écrit par un ou plusieurs auteurs. On n'enregistre que les auteurs qui ont écrit au moins un livre de la médiathèque.
  4. Chaque livre est classé dans une seule catégorie. Une catégorie, identifiée par un numéro, a un libellé et peut regrouper zéro, un ou plusieurs livres.
  5. Un adhérent est identifié par un numéro. On connaît son nom, son prénom, son email et sa date d'adhésion.
  6. Un adhérent peut emprunter des livres. On enregistre la date d'emprunt et la date de retour.
  7. Un adhérent possède au plus une carte. Une carte, identifiée par un numéro, a un numéro de carte et une date d'expiration, et appartient à un seul adhérent.

- **Emprunter plusieurs fois le même livre.** Une association N:N n'existe qu'une seule fois par couple livre / adhérent. Comme pour la note dans `scholar` (partie 4.A), on transforme l'association en **entité** `EMPRUNT`, qui a son propre identifiant :

```
LIVRE ──0,n── ( CONCERNER ) ──1,1── EMPRUNT ──1,1── ( EFFECTUER ) ──0,n── ADHÉRENT

EMPRUNT (id_emprunt, date_emprunt, date_retour)
```

Chaque emprunt concerne exactement un livre et est effectué par exactement un adhérent ; un livre et un adhérent peuvent avoir zéro ou plusieurs emprunts.

- **Contrats : cardinalités corrigées.**

```
CONTRAT ──0,1── ( STRUCTURE ) ──0,n── TYPE_CONTRAT
CLIENT ──1,1── ( APPARTIENT ) ──0,n── SEG_CLIENT
```

Les deux associations deviennent des **1:N**. Côté `SEG_CLIENT`, `1,n` est aussi acceptable si un segment n'existe que s'il contient au moins un client.

---

## Niveau 2 : Construire un MCD

- **Le club de sport.**

Dictionnaire de données :

| Code | Signification | Type | Remarque |
|---|---|---|---|
| id_adherent | Numéro de l'adhérent | Numérique | Identifiant |
| nom | Nom de l'adhérent | Texte (50) | Obligatoire |
| prenom | Prénom de l'adhérent | Texte (50) | Obligatoire |
| date_naissance | Date de naissance de l'adhérent | Date | Obligatoire |
| email | Email de l'adhérent | Texte (100) | |
| id_activite | Numéro de l'activité | Numérique | Identifiant |
| nom_activite | Nom de l'activité | Texte (50) | Obligatoire |
| tarif | Tarif mensuel de l'activité | Décimal (6,2) | Obligatoire |
| date_inscription | Date d'inscription d'un adhérent à une activité | Date | Obligatoire |
| id_coach | Numéro du coach | Numérique | Identifiant |
| nom_coach | Nom du coach | Texte (50) | Obligatoire |
| prenom_coach | Prénom du coach | Texte (50) | Obligatoire |
| specialite | Spécialité du coach | Texte (50) | |
| id_salle | Numéro de la salle | Numérique | Identifiant |
| nom_salle | Nom de la salle | Texte (50) | Obligatoire |
| capacite | Capacité de la salle | Numérique | Obligatoire |

Dans le dictionnaire, chaque information a un **nom unique** : `nom_activite`, `nom_coach`, `nom_salle`. Dans le MCD, on peut ensuite simplement écrire `nom` dans chaque entité.

![MCD du club de sport](img/mcd-club-sport.png "MCD du club de sport"){ style="display: block; margin: 0 auto" }

Points d'attention :
  - `date_inscription` ne décrit ni l'adhérent ni l'activité : elle est portée par l'association `S'INSCRIRE` ;
  - « une **ou** plusieurs activités » donne **1,n** côté ADHÉRENT, « zéro, un ou plusieurs adhérents » donne **0,n** côté ACTIVITÉ ;
  - le coach et la salle sont des **entités**, pas des attributs de l'activité : ils ont leurs propres informations, et un même coach ou une même salle sert à plusieurs activités.

- **Le restaurant.**

![MCD du restaurant](img/mcd-restaurant.png "MCD du restaurant"){ style="display: block; margin: 0 auto" }

Points d'attention :
  - la `quantite` dépend à la fois de la commande **et** du plat : elle est portée par l'association `CONTENIR` ;
  - le **montant** d'une commande ne figure pas dans le MCD : c'est une donnée calculée (somme des prix × quantités) ;
  - en toute rigueur, le prix d'un plat peut changer : pour conserver le prix payé, on ajouterait un attribut `prix_unitaire` à l'association `CONTENIR`. C'est une bonne piste à discuter avec les élèves les plus avancés.

- **Le MCD à corriger.** Erreurs à relever :

| Erreur | Correction |
|---|---|
| `CLIENTS` est au pluriel | `CLIENT` |
| `CLIENTS` n'a pas d'identifiant (le nom ne convient pas) | Ajouter `id_client` |
| `age` est une donnée calculée | La remplacer par `date_naissance` |
| `nombre_de_commandes` et `montant_total` sont des données calculées | Les supprimer |
| `id_client` dans `COMMANDE` : il n'y a pas de clé étrangère dans un MCD | La supprimer : le lien est assuré par l'association |
| L'association `COMMANDE` porte le même nom qu'une entité, et ce n'est pas un verbe | La renommer `PASSER` |
| L'association relie `COMMANDE` à elle-même, et ses cardinalités sont inversées | Elle relie `CLIENT` (0,n) et `COMMANDE` (1,1) |
| `nom_categorie` dans `PRODUIT` : la catégorie est une entité à part | Créer `CATÉGORIE` et une association `APPARTENIR` |
| `CONTIENT` n'est pas à l'infinitif, et la quantité manque | `CONTENIR`, porteuse de `quantite` |

MCD corrigé :

```
CLIENT (id_client, nom, prenom, email, date_naissance)
COMMANDE (id_commande, date_commande)
PRODUIT (id_produit, nom, prix)
CATÉGORIE (id_categorie, libelle)

CLIENT ──0,n── ( PASSER ) ──1,1── COMMANDE
COMMANDE ──1,n── ( CONTENIR ) ──0,n── PRODUIT
                    quantite
PRODUIT ──1,1── ( APPARTENIR ) ──0,n── CATÉGORIE
```

---

## Niveau 3 : Passer du MCD au MLD

- **La médiathèque.**

```
auteur (id_auteur, nom, prenom, nationalite)
categorie (id_categorie, libelle)
livre (id_livre, titre, isbn, annee_parution, #id_categorie)
ecrire (#id_auteur, #id_livre)
adherent (id_adherent, nom, prenom, email, date_adhesion)
emprunter (#id_livre, #id_adherent, date_emprunt, date_retour)
carte (id_carte, numero, date_expiration, #id_adherent)
```

| Clé étrangère | `NULL` ? | Raison |
|---|---|---|
| `livre.id_categorie` | Non | CLASSER : un livre a exactement une catégorie (1,1) |
| `carte.id_adherent` | Non, et **unique** | POSSÉDER est une 1:1 : la clé étrangère va du côté de CARTE (1,1), avec une contrainte `UNIQUE` pour qu'un adhérent n'ait qu'une carte |
| Clés des tables `ecrire` et `emprunter` | Non | Elles font partie de la clé primaire |

Remarques :
  - `ecrire` et `emprunter` sont les tables d'association des deux N:N ;
  - le minimum **1** côté LIVRE dans ÉCRIRE (un livre a au moins un auteur) ne peut pas être imposé par la structure des tables : il faudra le vérifier dans l'application ;
  - `isbn` peut être déclaré `UNIQUE` (clé candidate) ;
  - avec la version **modifiée** du MCD (entité `EMPRUNT`), la table devient `emprunt (id_emprunt, #id_livre, #id_adherent, date_emprunt, date_retour)`, avec ses deux clés étrangères `NOT NULL`. Autre solution acceptable : garder la table d'association en ajoutant `date_emprunt` à sa clé primaire.

- **Le club de sport.**

```
adherent (id_adherent, nom, prenom, date_naissance, email)
coach (id_coach, nom, prenom, specialite)
salle (id_salle, nom, capacite)
activite (id_activite, nom, tarif, #id_coach, #id_salle)
inscription (#id_adherent, #id_activite, date_inscription)
```

`activite.id_coach` et `activite.id_salle` sont `NOT NULL` (1,1 côté ACTIVITÉ). Comme pour la médiathèque, le minimum 1 côté ADHÉRENT (« au moins une activité ») ne se traduit pas dans les tables.

- **Le restaurant.**

```
client (id_client, nom, prenom, telephone)
commande (id_commande, date_commande, #id_client)
categorie (id_categorie, libelle)
plat (id_plat, nom, prix, #id_categorie)
ligne_commande (#id_commande, #id_plat, quantite)
```

`commande.id_client` et `plat.id_categorie` sont `NOT NULL`. La table d'association de `CONTENIR` est souvent appelée `ligne_commande` : chaque ligne correspond à une ligne du ticket de caisse.

- **Les contrats** (cardinalités corrigées).

```
seg_client (id, nom)
client (id, nom, prenom, email, #id_seg_client)
employe (matricule, nom, prenom)
type_contrat (id, titre, statut, date_debut, date_fin)
contrat (id, titre, date_debut, #id_client, #matricule_employe, #id_type_contrat)
```

| Clé étrangère | `NULL` ? | Raison |
|---|---|---|
| `client.id_seg_client` | Non | APPARTIENT : 1,1 côté CLIENT |
| `contrat.id_client` | Non | SIGNE : 1,1 côté CONTRAT |
| `contrat.matricule_employe` | Non | PREND EN CHARGE : 1,1 côté CONTRAT |
| `contrat.id_type_contrat` | **Oui** | STRUCTURE : 0,1 côté CONTRAT |

La clé primaire d'`employe` est `matricule` : c'est une clé naturelle, que l'entreprise attribue déjà à chaque employé. La clé étrangère qui la référence (`matricule_employe`) doit avoir le même type.

- **L'agence immobilière.**

MLD en notation texte :

```
users (id, email, password, gender, first_name, last_name, phone_number)
contacts (id, civility, first_name, last_name, email, phone_number, mobile_number, info_contact)
realties (id, img, #user_id, #contact_id, address_1, address_2, city, zipcode,
          info_address, type, area, room, price, sold, online, created_date)
```

MCD dont il est issu :

```
UTILISATEUR (id, email, password, gender, first_name, last_name, phone_number)
CONTACT (id, civility, first_name, last_name, email, phone_number, mobile_number, info_contact)
BIEN (id, img, address_1, address_2, city, zipcode, info_address, type, area, room,
      price, sold, online, created_date)

UTILISATEUR ──0,n── ( GÉRER ) ──1,1── BIEN
CONTACT ──0,n── ( PROPOSER ) ──1,1── BIEN
```

Chaque clé étrangère de `realties` vient d'une association 1:N, avec le 1,1 du côté du bien. Le schéma ne montre pas si les clés étrangères acceptent `NULL` : si c'était le cas, la cardinalité côté BIEN serait 0,1. Les noms des associations (`GÉRER`, `PROPOSER`) ne figurent pas dans le MLD : toute formulation cohérente est acceptable.

---

## Niveau 4 : Les formes normales

- **`commande` : la 1FN n'est pas respectée.** La colonne `produits` contient plusieurs valeurs. De plus, `client` mélange prénom et nom, et devrait être une table à part.

```
client (id_client, prenom, nom)
produit (id_produit, nom)
commande (id_commande, date_commande, #id_client)
ligne_commande (#id_commande, #id_produit, quantite)
```

- **`livre` : la 1FN n'est pas respectée.** Les colonnes `auteur_1`, `auteur_2`, `auteur_3` sont des colonnes répétées : on ne sait pas combien d'auteurs prévoir, et chercher les livres d'un auteur oblige à regarder trois colonnes.

```
livre (id_livre, titre)
auteur (id_auteur, nom, prenom)
ecrire (#id_livre, #id_auteur)
```

- **`inscription` : la 2FN n'est pas respectée.** `nom_activite` et `tarif` ne dépendent que d'`id_activite`, c'est-à-dire d'une partie de la clé primaire : ils sont répétés à chaque inscription au yoga.

```
activite (id_activite, nom_activite, tarif)
inscription (#id_adherent, #id_activite, date_inscription)
```

- **`employe` : la 3FN n'est pas respectée.** `nom_service` et `etage_service` dépendent d'`id_service`, qui n'est pas la clé de la table : ils sont répétés pour chaque employé du service.

```
service (id_service, nom_service, etage_service)
employe (id_employe, nom, prenom, #id_service)
```

- **Le tableur des notes.** Les informations et ce dont elles dépendent :
  - le nom de l'élève et sa classe dépendent de l'élève ;
  - le professeur principal dépend de la classe ;
  - le coefficient dépend de la matière ;
  - la note dépend de l'élève **et** de la matière.

MLD normalisé :

```
professeur (id_professeur, civilite, nom)
classe (id_classe, nom, #id_professeur_principal)
eleve (id_eleve, prenom, nom, #id_classe)
matiere (id_matiere, nom, coefficient)
note (id_note, #id_eleve, #id_matiere, valeur)
```

Points d'attention :
  - « Alice Dupont » est découpé en `prenom` et `nom` (1FN : données atomiques) ;
  - le professeur principal devient une table à part : un professeur peut avoir d'autres rôles dans l'établissement, et son nom ne doit être écrit qu'une fois ;
  - `note` reçoit son propre identifiant, pour permettre plusieurs notes par élève et par matière, comme dans `scholar`. Une table `note (#id_eleve, #id_matiere, valeur)` à clé composée est acceptable si l'énoncé impose une seule note par matière ;
  - la moyenne de chaque élève n'est pas stockée : elle se calcule à partir des notes et des coefficients.

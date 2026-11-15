# Exercices – Partie 4 : Concevoir sa propre base de données

Les exercices de cette partie se font **sur papier**, ou dans un outil de dessin (Mocodo, Looping ou draw.io, voir partie 4.A, paragraphe 8) : on ne touche pas encore à MySQL. Les tables conçues ici seront créées en partie 5.

Si vous utilisez Mocodo ou Looping, écrivez d'abord votre MLD vous-même, **avant** de le faire générer par l'outil, puis comparez les deux.

Pour écrire un MCD sans outil de dessin, on peut utiliser la notation texte vue en cours :

```
ENTITÉ_A ──0,n── ( ASSOCIATION ) ──1,1── ENTITÉ_B
                   attribut_eventuel
```

| Niveaux | Notions | Support |
|---|---|---|
| 1 et 2 | Lire et construire un MCD | 4.A |
| 3 et 4 | Passer du MCD au MLD, formes normales | 4.B |

---

## Niveau 1 : Lire un MCD

Les exercices de ce niveau portent sur le MCD suivant :

![MCD d'une médiathèque](img/mcd-mediatheque.png "MCD d'une médiathèque"){ style="display: block; margin: 0 auto" }

- Pour chaque entité, indiquer son identifiant.

- Pour chacune des 4 associations, écrire les deux phrases qui la décrivent (une dans chaque sens), en suivant le modèle : « Un auteur écrit au minimum … et au maximum … livre(s). »

- Indiquer le type de chacune des 4 associations (1:1, 1:N ou N:N).

- Rédiger les règles de gestion qui ont permis de construire ce MCD.

- Avec ce MCD, un adhérent ne peut emprunter un même livre qu'une seule fois. Modifier le MCD pour qu'un adhérent puisse emprunter plusieurs fois le même livre, à des dates différentes.

- Reprendre le MCD des contrats de la partie 4.A (paragraphe 5.4). Corriger les cardinalités des associations `STRUCTURE` et `APPARTIENT` pour qu'elles respectent les règles suivantes : un type de contrat peut structurer plusieurs contrats ; un segment de clientèle regroupe plusieurs clients.

---

## Niveau 2 : Construire un MCD

- **Le club de sport.** À partir des règles de gestion suivantes, établir le dictionnaire de données, puis le MCD.

  1. Un adhérent est identifié par un numéro. On connaît son nom, son prénom, sa date de naissance et son email.
  2. Le club propose des activités, identifiées par un numéro, avec un nom et un tarif mensuel.
  3. Un adhérent s'inscrit à une ou plusieurs activités. Une activité peut compter zéro, un ou plusieurs adhérents. On enregistre la date de chaque inscription.
  4. Un coach est identifié par un numéro. On connaît son nom, son prénom et sa spécialité.
  5. Chaque activité est animée par un seul coach. Un coach peut animer zéro, une ou plusieurs activités.
  6. Chaque activité se déroule toujours dans la même salle. Une salle, identifiée par un numéro, a un nom et une capacité. Elle peut accueillir zéro, une ou plusieurs activités.

- **Le restaurant.** À partir des règles de gestion suivantes, établir le MCD.

  1. Un client est identifié par un numéro. On connaît son nom, son prénom et son téléphone.
  2. Un client peut passer zéro, une ou plusieurs commandes. Chaque commande, identifiée par un numéro, est passée par un seul client, à une date donnée.
  3. Une commande contient un ou plusieurs plats, chacun en une certaine quantité. Un plat peut figurer dans zéro, une ou plusieurs commandes.
  4. Un plat est identifié par un numéro. Il a un nom et un prix.
  5. Chaque plat appartient à une seule catégorie (entrée, plat, dessert…). Une catégorie, identifiée par un numéro, a un libellé et regroupe zéro, un ou plusieurs plats.

- **Un MCD à corriger.** Le MCD suivant, prévu pour une boutique en ligne, contient de nombreuses erreurs. Le réécrire correctement.

```
CLIENTS (nom, prenom, email, age, nombre_de_commandes)
COMMANDE (id_commande, date_commande, montant_total, id_client)
PRODUIT (id_produit, nom, prix, nom_categorie)

CLIENTS ──1,1── ( COMMANDE ) ──1,n── COMMANDE
COMMANDE ──1,n── ( CONTIENT ) ──0,n── PRODUIT
```

Les règles de gestion de la boutique : un client passe zéro, une ou plusieurs commandes ; une commande est passée par un seul client et contient un ou plusieurs produits, en une certaine quantité ; chaque produit appartient à une seule catégorie.

---

## Niveau 3 : Passer du MCD au MLD

Pour chaque MLD, utiliser la notation du cours : clé primaire en premier (ou soulignée), clés étrangères précédées d'un `#`. Préciser, pour chaque clé étrangère, si elle peut être `NULL` ou non.

- Écrire le MLD de la médiathèque (MCD du niveau 1, dans sa version d'origine).

- Écrire le MLD du club de sport (MCD du niveau 2).

- Écrire le MLD du restaurant (MCD du niveau 2).

- Écrire le MLD des contrats (MCD de la partie 4.A, avec les cardinalités corrigées au niveau 1).

- Le schéma suivant, déjà vu en partie 4.B, est le MLD d'une application d'agence immobilière, dessiné dans phpMyAdmin. L'écrire en notation texte, puis retrouver le MCD dont il est issu.

![MLD d'une agence immobilière](img/bdd-sql.png "MLD dans phpMyAdmin"){ style="display: block; margin: 0 auto" }

---

## Niveau 4 : Les formes normales

Pour chacune des tables suivantes, indiquer quelle forme normale (1FN, 2FN ou 3FN) n'est pas respectée, puis décomposer la table en plusieurs tables correctes (en notation MLD).

- Table `commande` :

| <u>id_commande</u> | date_commande | client | produits |
|---|---|---|---|
| 1 | 2026-10-02 | Ambre Cerna | Clavier, Souris |
| 2 | 2026-10-05 | Jean Bonneau | Écran |

- Table `livre` :

| <u>id_livre</u> | titre | auteur_1 | auteur_2 | auteur_3 |
|---|---|---|---|---|
| 1 | Le Petit Prince | Antoine de Saint-Exupéry | | |
| 2 | Good Omens | Terry Pratchett | Neil Gaiman | |

- Table `inscription` :

| <u>id_adherent</u> | <u>id_activite</u> | date_inscription | nom_activite | tarif |
|---|---|---|---|---|
| 1 | 3 | 2026-09-05 | Yoga | 35.00 |
| 2 | 3 | 2026-09-12 | Yoga | 35.00 |
| 2 | 5 | 2026-09-12 | Natation | 40.00 |

- Table `employe` :

| <u>id_employe</u> | nom | prenom | id_service | nom_service | etage_service |
|---|---|---|---|---|---|
| 1 | Morel | Lucie | 2 | Comptabilité | 3 |
| 2 | Faure | Karim | 2 | Comptabilité | 3 |
| 3 | Roux | Sarah | 4 | Informatique | 1 |

- Un établissement suit les notes de ses élèves dans un tableur. Transformer ce tableau en un MLD complet et normalisé (3FN), en ajoutant les identifiants nécessaires.

| Élève | Classe | Professeur principal | Matière | Coefficient | Note |
|---|---|---|---|---|---|
| Alice Dupont | B1-A | M. Garnier | Programmation | 3 | 15.5 |
| Alice Dupont | B1-A | M. Garnier | Réseaux | 2 | 14 |
| Bob Martin | B1-B | Mme Laval | Programmation | 3 | 11.5 |
| Bob Martin | B1-B | Mme Laval | Réseaux | 2 | 13 |
| Claire Lemoine | B1-A | M. Garnier | Programmation | 3 | 18 |

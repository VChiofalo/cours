# Concevoir un formulaire

La bibliothèque du campus souhaite un formulaire pour **réserver une salle de travail**. L'utilisateur doit renseigner :

| Information | Contrainte |
|---|---|
| Son prénom | obligatoire |
| Son adresse e-mail | obligatoire |
| La date de réservation | obligatoire |
| Le nombre de personnes | obligatoire, entre 1 et 8 |
| Le créneau : matin, après-midi ou soir | obligatoire, un seul choix |
| Les équipements souhaités : projecteur, tableau blanc, prises électriques | facultatif, plusieurs choix possibles |
| Un commentaire | facultatif, texte long |
| L'acceptation du règlement | obligatoire |

## Consignes

- Page HTML5 complète (structure minimale, `lang="fr"`, UTF-8, `<title>` pertinent) avec un `<h1>` et un `<main>`.
- Formulaire en `method="get"`, **sans `action`**, pour pouvoir le tester sans serveur.
- Un `<label>` correctement associé à **chaque** champ.
- Les créneaux et les équipements sont regroupés dans des `<fieldset>` légendés.
- Les contraintes de votre tableau sont toutes présentes.
- Le code est indenté et commenté par zone.
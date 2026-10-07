# Chasse aux erreurs

Le formulaire suivant contient **8 erreurs** (syntaxe, accessibilité, bonnes pratiques). Repérez-les, expliquez-les, puis écrivez une version corrigée.

```html
<form action="connexion.php" method="get">

    <h2>Connexion</h2>

    <label for="login">Identifiant</label>
    <input type="text" id="identifiant" name="login">

    <input type="password" id="mdp" placeholder="Mot de passe">

    <p>Vous êtes :</p>
    <input type="radio" id="etudiant" name="statut1" value="etudiant">
    <label for="etudiant">Étudiant</label>
    <input type="radio" id="enseignant" name="statut2" value="enseignant">
    <label for="enseignant">Enseignant</label>

    <input type="checkbox" id="souvenir" name="souvenir" value="oui">
    <label for="souvenir">Se souvenir de moi</label>

    <textarea name="commentaire" />

    <button>Se connecter</button>

</form>
```
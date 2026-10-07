# Chasse aux erreurs CSS

La feuille de style suivante est enregistrée dans le dossier `css/` d'un site. Les images sont dans le dossier `images/`. Elle contient **10 erreurs** (syntaxe, valeurs, bonnes pratiques). Repérez-les et écrivez la version corrigée.

```css
body {
    font-family: Segoe UI, Arial;
    font-size: 16;
    line-height: 1,5;
    text-color: #222222;
    background-color: #f7f7f7
    margin: 0;
}

h1 {
    color: #33669;
    font-size: 2.5 rem;
    text-align: centre;
}

/* Motif de fond pour l'en-tête */
header {
    background-image: url("images/motif.png");
}

/* Carte au fond blanc légèrement translucide, texte bien lisible */
.carte {
    background-color: #ffffff;
    opacity: 0.8;
}
```
# Structurer avec le HTML sémantique

La page suivante n'utilise que des titres, paragraphes et liens. Les commentaires indiquent les zones de la page.

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Le blog du club</title>
</head>
<body>

    <!-- EN-TÊTE DU SITE -->
    <h1>Le blog du club</h1>

    <!-- MENU -->
    <a href="index.html">Accueil</a>
    <a href="blog.html">Blog</a>
    <a href="contact.html">Contact</a>

    <!-- CONTENU PRINCIPAL -->
    <!-- Section : les actualités -->
    <h2>Les actualités</h2>

    <!-- Article 1 -->
    <h3>Reprise des ateliers</h3>
    <p>Les ateliers reprennent dès ce mercredi.</p>

    <!-- Article 2 -->
    <h3>Nouveau salon de jeux</h3>
    <p>Un espace dédié aux jeux vidéo ouvre ses portes au club.</p>

    <!-- Contenu complémentaire -->
    <h2>Le saviez-vous ?</h2>
    <p>Le tout premier site web a été mis en ligne en 1991.</p>

    <!-- PIED DE PAGE -->
    <p>© 2026 Club informatique</p>

</body>
</html>
```

Recopiez cette page dans `structure.html`, puis remplacez la structure « à plat » par les balises sémantiques adaptées (`header`, `nav`, `main`, `section`, `article`, `aside`, `footer`).

1. Pourquoi les deux actualités sont-elles des <article> plutôt que des <section> ?
2. Pourquoi « Le saviez-vous ? » est-il un <aside> ?
3. Dessinez l'arbre de la page obtenue.
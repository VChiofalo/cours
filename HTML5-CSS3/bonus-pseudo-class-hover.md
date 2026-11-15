# La pseudo-classe `:hover`

Nous avons déjà croisé `:hover` dans le chapitre sur les sélecteurs, parmi les autres pseudo-classes. Ce court chapitre y revient en détail, car c'est l'une des pseudo-classes les plus utilisées : elle donne vie aux liens, aux boutons et aux cartes.

Dans ce chapitre, nous verrons :
- ce que fait `:hover` et comment l'écrire ;
- ce que l'on peut survoler : liens, boutons, lignes de tableau, cartes, images ;
- comment rendre le changement **progressif** avec `transition` ;
- pourquoi il faut toujours penser au **clavier** (`:focus-visible`) et au **tactile** ;
- les erreurs courantes.

## Le principe

`:hover` s'applique à un élément **tant que le pointeur de la souris est au-dessus**. Dès que le pointeur sort, la règle cesse de s'appliquer et l'élément reprend son apparence normale.

```css
a {
    color: #1f3d2e;
}
a:hover {
    color: #e0a82e;
}
```

Elle s'écrit avec **un seul deux-points**, collée au sélecteur, sans espace : `a:hover`. Avec un espace (`a :hover`), le sens change : on cible alors n'importe quel élément survolé **à l'intérieur** d'un lien.

Comme toutes les pseudo-classes, `:hover` ajoute `(0, 1, 0)` à la **spécificité** : `a:hover` pèse `(0, 1, 1)`. C'est pourquoi elle l'emporte sur `a` seul, mais pas sur un sélecteur plus précis écrit ailleurs.

## Ce que l'on peut survoler

Tous les éléments acceptent `:hover`, pas seulement les liens.

### Les liens et les boutons

```css
.bouton {
    background-color: #2f5d46;
    color: #ffffff;
}
.bouton:hover {
    background-color: #1f3d2e;
}
```

Le survol indique à l'utilisateur que l'élément est **cliquable**.

### Les lignes d'un tableau

```css
tbody tr:hover {
    background-color: #eef2ec;
}
```

Utile pour suivre une ligne des yeux dans un tableau long.

### Une carte entière

Quand on survole un bloc, on peut modifier le bloc **et** ses enfants :
```css
.carte:hover {
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}
.carte:hover h3 {
    color: #2f5d46;
}
```
La seconde règle se lit : « le `h3` d'une `.carte` **quand cette carte** est survolée ».

### Une image

```css
.galerie img {
    transform: scale(1);
}
.galerie img:hover {
    transform: scale(1.05);
}
```

## Rendre le changement progressif : `transition`

Sans précaution, le changement est **instantané**. La propriété `transition` l'étale dans le temps. On la place sur l'**état normal** (et non sur `:hover`), pour que l'animation s'applique à l'aller comme au retour.

```css
.bouton {
    background-color: #2f5d46;
    transition: background-color 0.2s ease;
}
.bouton:hover {
    background-color: #1f3d2e;
}
```

| Partie | Rôle |
|---|---|
| `background-color` | La propriété qui change progressivement (`all` pour toutes, à éviter) |
| `0.2s` | La durée : entre `0.15s` et `0.3s` suffit pour un survol |
| `ease` | La courbe de vitesse (démarrage et fin plus doux) |

On peut animer plusieurs propriétés en les séparant par des virgules :
```css
.carte {
    transition: box-shadow 0.2s ease, transform 0.2s ease;
}
```

Si l'on place la `transition` seulement dans `:hover`, l'animation joue à l'entrée, mais le retour à l'état normal est brusque.

## Ne pas oublier le clavier : `:focus-visible`

Un survol n'existe que pour qui utilise une souris. Une personne qui navigue au clavier (touche `Tab`) ne le déclenche jamais. Il faut donc **donner le même retour visuel au focus**.

```css
.bouton:hover,
.bouton:focus-visible {
    background-color: #1f3d2e;
}
```

`:focus-visible` s'active quand l'élément reçoit le focus d'une façon qui rend l'indicateur utile, typiquement au clavier. Évitez de supprimer le contour du focus (`outline: none`) sans le remplacer par autre chose.

## Penser au tactile

Sur un téléphone ou une tablette, il n'y a pas de pointeur qui « survole ». Selon les navigateurs, `:hover` peut ne jamais s'appliquer, ou rester bloqué après un toucher. Deux règles :

- **Ne jamais mettre une information essentielle derrière un survol** (un menu qui n'apparaît qu'au survol, une explication cachée...). Un utilisateur sur mobile ou au clavier ne pourrait pas y accéder.
- Le survol est un **plus**, un confort visuel, jamais une condition pour comprendre ou utiliser la page.

On peut réserver les effets de survol aux appareils qui en sont capables avec la media query `hover` :

```css
@media (hover: hover) {
    .carte:hover {
        transform: translateY(-0.25rem);
    }
}
```

Elle se lit : « si l'appareil principal permet de survoler ». Sur un écran tactile, la règle est ignorée.

## Un exemple complet

```html
<ul class="menu">
    <li><a href="index.html">Accueil</a></li>
    <li><a href="carte.html">La carte</a></li>
    <li><a href="contact.html">Contact</a></li>
</ul>
```
```css
.menu {
    display: flex;
    gap: 0.5rem;
    list-style: none;
    padding: 0;
}
.menu a {
    display: block;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    color: #1f3d2e;
    text-decoration: none;
    transition: background-color 0.2s ease, color 0.2s ease;
}
.menu a:hover,
.menu a:focus-visible {
    background-color: #1f3d2e;
    color: #ffffff;
}
```

Au survol **et** au focus clavier, le lien prend un fond foncé et un texte blanc, avec un changement progressif. Le texte blanc sur fond `#1f3d2e` reste lisible : pensez à vérifier le **contraste** de l'état survolé, comme pour l'état normal.

## Les erreurs courantes à éviter

| Erreur | Conséquence | Correction |
|---|---|---|
| `a :hover` (avec espace) | Cible un élément survolé **dans** le lien, pas le lien | `a:hover` |
| Ne changer que la couleur | Pas assez visible pour certaines personnes | Ajouter un fond, un soulignement ou une ombre |
| `transition` écrite dans `:hover` seulement | Retour brusque | La placer sur l'état normal |
| `transition: all` | Anime des propriétés non voulues, coûteux | Lister les propriétés concernées |
| Effet uniquement au survol | Rien pour le clavier | Ajouter `:focus-visible` |
| Contenu ou menu **uniquement** accessible au survol | Inutilisable sur mobile et au clavier | Prévoir une alternative (clic, bouton) |
| Mauvais ordre `:hover` / `:active` pour les liens | Certains états ne s'affichent pas | Respecter `:link`, `:visited`, `:hover`, `:active` |
| Survol qui déplace les voisins (changement de `padding`, `border`) | La page « saute » | Utiliser `transform`, `box-shadow` ou une bordure transparente au départ |
| Oublier de vérifier le contraste de l'état survolé | Texte illisible | Mesurer aussi l'état `:hover` |

## À retenir

- `:hover` s'applique à un élément tant que **le pointeur est dessus** ; on l'écrit `a:hover`, sans espace.
- Il fonctionne sur **tous** les éléments : liens, boutons, lignes de tableau, cartes, images.
- Pour un changement progressif, on ajoute `transition` sur l'**état normal** (`0.15s` à `0.3s`).
- Le survol est inutile au clavier : associer `:hover` et **`:focus-visible`**.
- Sur écran tactile, le survol est peu fiable : il ne doit jamais porter d'**information essentielle**. La media query `@media (hover: hover)` permet de réserver certains effets aux appareils à pointeur.
- Vérifier aussi le **contraste** de l'état survolé.

---

© Vincent Chiofalo
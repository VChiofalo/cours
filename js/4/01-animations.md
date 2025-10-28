# Les animations avec JavaScript

## Avant propos

Les **animations** jouent un rôle essentiel dans l’expérience utilisateur des sites web modernes.
Elles permettent :
- de **rendre les interactions plus fluides**.
- de **fournir un retour visuel** à l’utilisateur.
- de **rendre un site plus vivant et attractif**.

JavaScript offre plusieurs façons de créer et de contrôler ces animations.
Dans cette partie, nous allons découvrir des méthodes pour animer des éléments d’une page web.

## Animer avec ```setInterval()``` et ```clearInterval()```

La méthode ```setInterval()``` permet d’exécuter une fonction à **intervalles réguliers**.
En modifiant petit à petit les propriétés CSS d’un élément, on peut ainsi créer une animation "manuelle".
```html
<div id="carre" style="width: 50px; height: 50px; background-color: red;"></div>

<script>
  const carre = document.querySelector("#carre");
  let taille = 50; // Taille initiale en pixels

  // Exécute la fonction toutes les 100 millisecondes
  const animation = setInterval(() => {
    taille += 5; // Augmente la taille
    carre.style.width = taille + "px";
    carre.style.height = taille + "px";

    // Quand la taille atteint 200px, on arrête l’animation
    if (taille >= 200) {
      clearInterval(animation);
    }
  }, 100);
</script>
```
Ici, le carré grandit de **5 pixels toutes les 0,1 seconde**, jusqu’à atteindre **200 pixels**.

Astuce : Pour des animations plus fluides, tu peux utiliser ```setTimeout()``` ou ```requestAnimationFrame()``` (plus précis et optimisé).

## Combiner CSS et JavaScript

Une autre approche très efficace consiste à **utiliser le CSS pour l’animation** et **JavaScript pour déclencher** celle-ci.
En pratique, cela consiste à ajouter ou retirer une **classe CSS** qui contient les effets de transition.
```html
<style>
  #carre {
    width: 50px;
    height: 50px;
    background-color: red;
    transition: width 2s, height 2s, background-color 2s;
  }

  /* Classe qui modifie la taille et la couleur */
  #carre.grossit {
    width: 200px;
    height: 200px;
    background-color: royalblue;
  }
</style>

<div id="carre"></div>
<button id="bouton">Animer le carré</button>

<script>
  const carre = document.querySelector("#carre");
  const bouton = document.querySelector("#bouton");

  bouton.addEventListener("click", () => {
    carre.classList.toggle("grossit");
  });
</script>
```
Dans cet exemple, le CSS contient la transition (```transition```) sur 2 secondes. Au clic, JavaScript ajoute ou retire la classe ```.grossit``` puis le navigateur anime automatiquement les changements (taille et couleur).

## Créer des animations avec l’API Web Animations

**L’API Web Animations** est une méthode plus moderne et puissante qui permet de **créer des animations complexes** entièrement en JavaScript, sans CSS.
```html
<div id="carre" style="width: 50px; height: 50px; background-color: red;"></div>

<script>
  const carre = document.querySelector("#carre");

  carre.animate(
    [
      // Étapes clés (keyframes)
      { transform: "translateX(0px)", backgroundColor: "red" },
      { transform: "translateX(200px)", backgroundColor: "orange" },
      { transform: "translateX(0px)", backgroundColor: "red" }
    ],
    {
      // Options d’animation
      duration: 3000,   // durée totale : 3 secondes
      iterations: Infinity // l’animation boucle à l’infini
    }
  );
</script>
```
Dans cet exemple, on définit une **liste d’étapes** (**keyframes**) indiquant les changements successifs, puis on configure la **durée**, le **nombre de répétitions**, etc. L’animation est exécutée **directement par le navigateur**, sans besoin de CSS.

Cette API est **puissante** et **fluide**, mais certaines options avancées ne sont pas encore disponibles sur tous les navigateurs plus anciens

Pour en savoir plus : 
https://developer.mozilla.org/fr/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API

## Pour aller plus loin !!

### Les temporisations et animations précises en JavaScript

JavaScript offre plusieurs façons de **contrôler le temps** dans une page web.
Nous avons déjà vu ```setInterval()```, qui permet d’exécuter une action à **intervalles réguliers**.
Mais il existe deux autres outils très utiles : ```setTimeout()``` et ```requestAnimationFrame()```, qui permettent des animations plus **maîtrisées et performantes**.

#### ```setTimeout()``` : exécuter une action après un délai

La fonction ```setTimeout()``` permet d’exécuter une fonction **une seule fois**, après un délai déterminé (en millisecondes).
```js
setTimeout(fonction, délai);
```
- ```fonction``` : le code à exécuter (ou une fonction nommée).
- ```délai``` : le temps d’attente avant l’exécution, en millisecondes.

Par exemple :
```html
<button id="btn">Cliquez-moi</button>

<script>
  const bouton = document.querySelector('#btn');

  bouton.addEventListener('click', () => {
    console.log('Attendez 2 secondes...');
    setTimeout(() => {
      console.log('2 secondes écoulées !');
    }, 2000);
  });
</script>
```
Quand on clique sur le bouton, le message “2 secondes écoulées !” **s’affiche après 2 secondes**.
La fonction ne s’exécute **qu’une seule fois**.

##### Annuler un ```setTimeout()```

Tout comme avec ```setInterval()```, il est possible d’annuler un délai en utilisant ```clearTimeout()```.
```js
const timer = setTimeout(() => {
  console.log("Ce message ne s’affichera pas !");
}, 3000);

clearTimeout(timer); // annule le timer avant qu’il ne s’exécute
```

#### ```requestAnimationFrame()``` : des animations fluides et performantes

```requestAnimationFrame()``` est une méthode plus **moderne et optimisée** que ```setInterval()``` pour créer des animations.
Elle demande au navigateur d’exécuter une fonction **avant le prochain rafraîchissement de l’écran** (environ 60 fois par seconde).

Cela garantit une **animation fluide** et **synchronisée** avec le rendu graphique du navigateur.
```js
function animer() {
  // code d’animation ici
  requestAnimationFrame(animer);
}

requestAnimationFrame(animer);
```
Ici, la fonction ```animer()``` s’appelle **elle-même** à chaque image, créant une boucle d’animation fluide.

Par exemple :
```html
<div id="carre" style="width:50px; height:50px; background:red; position:absolute; left:0;"></div>

<script>
  const carre = document.querySelector('#carre');
  let position = 0;

  function deplacer() {
    position += 2; // déplace le carré de 2px à chaque frame
    carre.style.left = position + 'px';

    if (position < 300) {
      requestAnimationFrame(deplacer); // continue tant qu’on n’a pas atteint 300px
    }
  }

  requestAnimationFrame(deplacer);
</script>
```
Ici le carré se déplace vers la droite. ```requestAnimationFrame()``` relance la fonction à chaque image, **tant que la condition est vraie**. Le mouvement est **plus fluide** qu’avec ```setInterval()``` car le navigateur ajuste la fréquence selon les performances de l’appareil.

##### Annuler une animation ```requestAnimationFrame()```

On peut aussi **arrêter une animation** avec cancelAnimationFrame().
```js
let animId;

function deplacer() {
  position += 2;
  carre.style.left = position + 'px';

  if (position < 300) {
    animId = requestAnimationFrame(deplacer);
  }
}

// Démarrage
animId = requestAnimationFrame(deplacer);

// Pour l’arrêter plus tard :
cancelAnimationFrame(animId);
```

Pour aller plus loin :
https://developer.mozilla.org/fr/docs/Web/API/Window/requestAnimationFrame

## En résumé

| Méthode                   | Fonctionnement                        | Fréquence          | Avantage                                            | Usage typique                                     |
| ------------------------- | ------------------------------------- | ------------------ | --------------------------------------------------- | ------------------------------------------------- |
| `setTimeout()`            | Exécute une fois après un délai       | Unique             | Simple, pratique pour un délai ou une action unique | Afficher un message temporaire                    |
| `setInterval()`           | Répète à intervalles réguliers        | Fixe (en ms)       | Facile à utiliser                                   | Animation simple ou compteur                      |
| `requestAnimationFrame()` | Rafraîchit selon la fréquence d’écran | Variable (≈60 FPS) | Animation fluide et économe en ressources           | Mouvement fluide d’éléments, jeux, effets visuels |


## Pratique

Dans le dossier ```manip-animations```, regardez les différents fichier et dans le fichier ```script.js``` faites les exercices en **suivant les consignes**.
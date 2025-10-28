# Les événements

## Avant propos

JavaScript est un **langage événementiel** :
cela signifie que le déroulement du programme dépend **des interactions avec l’environnement** (l’utilisateur, le navigateur ou le document lui-même).

Le développeur ne contrôle donc pas directement le **flux d’exécution** du code. Celui-ci réagit aux événements comme :
- un clic sur un bouton.
- un mouvement de souris.
- la saisie d’une touche.
- ou encore le chargement d’une page.

En résumé, **JavaScript attend qu’un événement se produise**… puis **exécute du code en réponse.**

## Les gestionnaires d'événement

Pour pouvoir **réagir à un événement** lorsqu’il se produit dans la page, on utilise ce qu’on appelle un **gestionnaire d’événement**.
```js
addEventListener();
```
C’est tout simplement une **fonction JavaScript** qui est exécutée automatiquement lorsqu’un **événement précis** se déclenche sur un **élément du DOM**.

Lorsqu’on associe un gestionnaire à un élément, on doit indiquer :
- le **type d’événement** à écouter (par exemple : ```click```, ```mouseover```, ```keydown```, …).
- et la **phase d’écoute** (capture ou bouillonnement), selon le **flux de propagation** de l’événement dans le DOM. Par défaut, la plupart des gestionnaires écoutent les événements pendant la phase de bouillonnement — c’est-à-dire quand l’événement “remonte” dans l’arbre DOM.
```js
bouton.addEventListener("click", () => {
    faireQuelqueChose(); 
  });
```

Le gestionnaire est donc **appelé automatiquement** dès que l’événement correspondant atteint le nœud sur lequel il a été attaché, si le type et la phase correspondent à ceux indiqués.

Il existe d'autres façon pour a**ttacher un gestonnaire d'événement** à un **élément** :
1. **L’attribut HTML ```on...```**
C’est la méthode **historique** (et la moins recommandée aujourd’hui).
Elle consiste à écrire le gestionnaire **directement dans le code HTML**.
```html
<button onclick="alert('Bouton cliqué !')">Clique-moi</button>
```
Quand l’utilisateur clique sur le bouton, le code contenu dans l’attribut ```onclick``` est exécuté.
Les incovénients :
- Mélange le **HTML** et le **JavaScript** (pas propre ni maintenable).
- Difficile à modifier ou à déboguer quand le projet devient plus grand.

2. **La propriété JavaScript ```on...```**
Cette méthode est un peu plus moderne.
Elle consiste à **sélectionner un élément** dans le DOM, puis à lui affecter une **fonction** à sa propriété d’événement (```onclick```, ```onmouseover```, etc.).
```js
const bouton = document.getElementById("btn");

bouton.onclick = function() {
  alert("Bouton cliqué !");
};
```
Par rapport à la méthode précédente, celle-ci a l'avantage d'avoir un code JavaScript **séparée** du HTML.
Mais on ne peut associer **qu'une seule fonction** par type d'événement. Si on réécrit ```bouton.onclick = autreFonction;```, **l’ancien gestionnaire est remplacé**.

### Précision flux d’événements

Quand un événement se produit sur une page web (par exemple, un clic sur un bouton), il ne touche pas uniquement l’élément cliqué : il se **propage** à travers tout l’arbre du DOM.
Ce déplacement suit un *flux d’événements* composé de plusieurs étapes successives.
On distingue **trois phases principales** :
1. **Phase de capture (ou “capturing”)**
L’événement descend depuis la racine du document (```window``` → ```document``` → ```<html>``` → …) jusqu’à l’élément cible.
Cette phase permet d’intercepter un événement avant qu’il atteigne réellement l’élément cliqué.
On parle aussi de **phase descendante**.

2. **Phase de la cible (ou “target”)**
L’événement **atteint l’élément précis** sur lequel il a été déclenché (le bouton, le lien, etc.).
C’est ici que le **gestionnaire d’événement direct** de la cible est exécuté.

3. **Phase de bouillonnement (ou “bubbling”)**
Après avoir atteint la cible, l’événement **remonte** dans l’arbre du DOM, en suivant le chemin inverse.
Il passe donc par les parents de la cible, jusqu’à revenir à la racine du document.
On parle aussi de **phase ascendante**.

Schéma simplifié de propagation :
```
window → document → html → body → div → bouton (capture)
bouton (cible)
bouton → div → body → html → document → window (bouillonnement)
```
Exemple en code :
```js
const zone = document.querySelector("#zone");
const bouton = document.querySelector("#btn");

document.addEventListener("click", () => {
  console.log("Document (capture)");
}, true); // true = phase de capture

zone.addEventListener("click", () => {
  console.log("Zone (bubbling)");
}); // par défaut = bouillonnement

bouton.addEventListener("click", () => {
  console.log("Bouton (cible)");
});
```

Résultat dans la console (ordre d’exécution lors d’un clic sur le bouton) :
```
Document (capture)
Bouton (cible)
Zone (bubbling)
```

#### À retenir

Le **flux d’événement** suit toujours ce parcours : **capture** → **cible** → **bouillonnement**.

Par défaut, ```addEventListener()``` écoute les événements **pendant la phase de bouillonnement**.

Pour écouter un événement **pendant la phase de capture**, on ajoute ```true``` en troisième paramètre :
```js
element.addEventListener("click", fonction, true);
```

On peut **empêcher la remontée** de l’événement avec ```event.stopPropagation()```.

## La suppression d’un gestionnaire d’événement

Il est parfois utile de **désactiver une interaction** après qu’elle s’est produite, ou de **retirer un écouteur** devenu inutile pour **optimiser les performances** de la page.
Pour cela, JavaScript met à disposition la méthode ```removeEventListener()```.
```js
element.removeEventListener(type, fonction);
```
- ```type``` : le type d’événement à retirer (ex. ```"click"```, ```"keydown"```, …).
- ```fonction``` : la fonction qui avait été attachée avec ```addEventListener()```.
⚠️ Attention : pour que la suppression fonctionne, **la fonction doit être nommée** (et non une fonction anonyme).

Exemple :
```js
const bouton = document.getElementById("btn");

function afficherMessage() {
  console.log("Bouton cliqué !");
}

// On attache la fonction au clic
bouton.addEventListener("click", afficherMessage);

// Et on la retire
  bouton.removeEventListener("click", afficherMessage);
  console.log("Le gestionnaire d’événement a été supprimé !");
```

Exemple d’erreur :
```js
bouton.addEventListener("click", () => {
  console.log("Bouton cliqué !");
});

bouton.removeEventListener("click", () => {
  console.log("Bouton cliqué !");
});
```
Cette version **ne fonctionne pas**. Il s’agit de **deux fonctions différentes**, même si leur code est identique. Le navigateur ne peut pas supprimer une fonction qu’il ne connaît pas par son **nom exact.**

## Les événements les plus courants en JavaScript

Les événements sont au cœur de l’interactivité d’une page web.
Ils permettent de **réagir aux actions de l’utilisateur** (clics, frappes clavier, mouvements de souris, etc.), ou à **des changements dans le document** (chargement, soumission d’un formulaire, etc.).
On distingue plusieurs grandes familles d’événements.

1. **Les événements de souris**
Ces événements se déclenchent lorsqu’un utilisateur interagit avec la souris ou un pavé tactile.

| Événement                   | Description                                   | Exemple                   |
| --------------------------- | --------------------------------------------- | ------------------------- |
| `click`                     | L’utilisateur clique sur un élément           | Un clic sur un bouton     |
| `dblclick`                  | Double clic sur un élément                    | Double clic sur une image |
| `mousedown`                 | Appui sur le bouton de la souris              | Avant le relâchement      |
| `mouseup`                   | Relâchement du bouton                         | Fin du clic               |
| `mousemove`                 | Mouvement de la souris au-dessus d’un élément | Déplacer un curseur       |
| `mouseenter` / `mouseleave` | Entrée ou sortie du pointeur sur un élément   | Effet de survol           |

Exemple :
```js
const bouton = document.querySelector("#btn");

bouton.addEventListener("mouseenter", () => {
  bouton.style.backgroundColor = "lightblue";
});

bouton.addEventListener("mouseleave", () => {
  bouton.style.backgroundColor = "";
});

bouton.addEventListener("click", () => {
  alert("Bouton cliqué !");
});
```

2. **Les événements de clavier**
Ces événements réagissent aux interactions de l’utilisateur avec le clavier.

| Événement  | Description                                               | Exemple            |
| ---------- | --------------------------------------------------------- | ------------------ |
| `keydown`  | Une touche est enfoncée                                   | Début de la frappe |
| `keypress` | Une touche est pressée (déprécié, remplacé par `keydown`) | Ancien usage       |
| `keyup`    | Une touche est relâchée                                   | Fin de la frappe   |

Exemple :
```js
document.addEventListener("keydown", (event) => {
  console.log(`Touche enfoncée : ${event.key}`);
});

document.addEventListener("keyup", (event) => {
  console.log(`Touche relâchée : ${event.key}`);
});
```

3. **Les événements de formulaire**
Ces événements permettent de contrôler les champs de formulaire et les actions de validation.

| Événement        | Description                            | Exemple                             |
| ---------------- | -------------------------------------- | ----------------------------------- |
| `input`          | Détecte une saisie dans un champ       | Lorsqu’un utilisateur tape du texte |
| `change`         | Détecte un changement de valeur validé | Lorsqu’on quitte le champ           |
| `submit`         | Envoi d’un formulaire                  | Cliquer sur “Envoyer”               |
| `focus` / `blur` | Entrée ou sortie du focus              | Clic dans un champ ou sortie        |

Exemple :
```js
const form = document.querySelector("form");
const input = document.querySelector("input");

input.addEventListener("focus", () => {
  input.style.backgroundColor = "#e0f7fa";
});

input.addEventListener("blur", () => {
  input.style.backgroundColor = "";
});

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Empêche le rechargement de la page
  alert(`Formulaire envoyé avec : ${input.value}`);
});
```

4. **Les événements de chargement et de fenêtre**
Ces événements concernent le **cycle de vie** de la page web et la **fenêtre du navigateur**.

| Événement | Description                                          |
| --------- | ---------------------------------------------------- |
| `load`    | Le document ou une ressource est complètement chargé |
| `resize`  | La taille de la fenêtre du navigateur change         |
| `scroll`  | L’utilisateur fait défiler la page                   |

Exemple :
```js
window.addEventListener("load", () => {
  console.log("La page est entièrement chargée !");
});

window.addEventListener("resize", () => {
  console.log(`Nouvelle taille : ${window.innerWidth} x ${window.innerHeight}`);
});

window.addEventListener("scroll", () => {
  console.log("Vous faites défiler la page !");
});
```

5. **Les événements personnalisés (avancé)**
Il est aussi possible de **créer ses propres événements** à l’aide du constructeur ```CustomEvent```.

Exemple :
```js
const bouton = document.querySelector("#btn");

bouton.addEventListener("salutation", (event) => {
  alert(event.detail.message);
});

const monEvent = new CustomEvent("salutation", {
  detail: { message: "Bonjour depuis un événement personnalisé !" },
});

bouton.dispatchEvent(monEvent);
```

## L'objet ```Event```

Un **événement** correspond à un **changement d’état dans l’environnement**.
Ce changement peut être provoqué :
- par l’utilisateur (ex. : clic, touche pressée, saisie dans un champ).
- par le navigateur ou le document (ex. : chargement d’une image ou d’une page).
- ou même par le code lui-même (événement déclenché manuellement).

Lorsqu’un événement se produit, le navigateur crée automatiquement un **objet** ```Event```, mis à disposition dans le code.
Cet objet contient **toutes les informations** relatives à l’événement (type, cible, comportement, etc.).
Exemple :
```html
<button id="btn">Clique-moi</button>

<script>
  const bouton = document.getElementById("btn");

  bouton.addEventListener("click", (event) => {
    console.log(event); // Affiche l'objet Event complet
  });
</script>
```
Quand on clique sur le bouton, l’objet ```event``` est transmis à la fonction et contient de nombreuses **propriétés** et **méthodes** utiles.

### Les principales propriétés et méthodes de l’objet ```Event```

1. ```target```
La propriété ```target``` désigne la **cible de l’événement**, c’est-à-dire **l’élément HTML sur lequel l’événement s’est produit**.
Exemple :
```html
<button id="btn">Clique-moi</button>

<script>
  document.getElementById("btn").addEventListener("click", (event) => {
    console.log(event.target); // <button id="btn">Clique-moi</button>
  });
</script>
```

2. ```type```
La propriété ```type``` indique le **type d’événement** déclenché (ex. : ```"click"```, ```"focus"```, ```"keydown"```, ```"load"```, etc.).
Exemple :
```html
<input id="champ" placeholder="Tape quelque chose">

<script>
  document.getElementById("champ").addEventListener("keydown", (event) => {
    console.log(event.type); // Affiche "keydown"
  });
</script>
```

3. ```stopPropagation()```
Cette méthode permet **d’arrêter la propagation** de l’événement dans l’arbre DOM.
Autrement dit, l’événement **ne se transmettra pas aux éléments parents**.
Exemple :
```html
<div id="parent">
  <button id="enfant">Clique ici</button>
</div>

<script>
  document.getElementById("parent").addEventListener("click", () => {
    console.log("Clic sur le parent !");
  });

  document.getElementById("enfant").addEventListener("click", (event) => {
    event.stopPropagation(); // Empêche le clic de remonter
    console.log("Clic sur le bouton !");
  });
</script>
```
Ici, seul ```"Clic sur le bouton !"``` s’affiche.

4. ```preventDefault()```
Cette méthode permet **d’annuler le comportement par défaut** associé à un événement.
Elle est souvent utilisée avec :
- les liens (```<a>```) pour empêcher la navigation.
- les formulaires (```<form>```) pour empêcher l’envoi automatique.
Exemple :
```html
<a href="https://www.example.com" id="lien">Aller sur le site</a>

<script>
  document.getElementById("lien").addEventListener("click", (event) => {
    event.preventDefault(); // Annule la redirection
    console.log("Navigation annulée !");
  });
</script>
```

5. ```currentTarget```

La propriété ```currentTarget``` fait référence à **l’élément sur lequel l’écouteur d’événement est attaché**, et **non à celui qui a déclenché l’événement**.
Exemple :
```html
<div id="zone">
  <button id="btn">Clique ici</button>
</div>

<script>
  document.getElementById("zone").addEventListener("click", (event) => {
    console.log("Cible :", event.target.id);        // L’élément cliqué
    console.log("Écouteur sur :", event.currentTarget.id); // L’élément qui écoute
  });
</script>
```
Quand on clique sur le bouton :
```yaml
Cible : btn
Écouteur sur : zone
```

#### Pour résumé

| Propriété / Méthode   | Description                                            | Exemple typique                       |
| --------------------- | ------------------------------------------------------ | ------------------------------------- |
| **target**            | Élément qui a déclenché l’événement                    | Clic sur un bouton                    |
| **type**              | Type d’événement survenu                               | "click", "keydown", "submit"...       |
| **stopPropagation()** | Empêche la propagation de l’événement vers les parents | Clic dans un élément imbriqué         |
| **preventDefault()**  | Annule l’action par défaut associée à l’événement      | Empêcher l’envoi d’un formulaire      |
| **currentTarget**     | Élément sur lequel l’écouteur est attaché              | Utile avec la délégation d’événements |

## Pratique

Dans le dossier ```manip-events```, regardez les différents fichier et dans le fichier ```script.js``` faites les exercices en **suivant les consignes**.
Question 1 :
En JavaScript, laquelle de ces déclarations crée correctement une variable ?

A) var age = 20;
B) variable age = 20;
C) let = age 20;

Réponse correcte : A) var age = 20;

Question 2 :
Lequel de ces exemples est une chaîne de caractères valide en JavaScript ?

A) let nom = "Alice";
B) let nom = Alice;
C) let nom = 'Alice;

Réponse correcte : A) let nom = "Alice";

Question 3 :
Lequel de ces énoncés crée correctement un nombre en JavaScript ?

A) let score = 100;
B) let score = "100";
C) let score = Number("cent");
D) let score = true;

Réponse correcte : A) let score = 100;

Question 4 :
Lequel de ces codes crée correctement un tableau en JavaScript ?

A) let fruits = ["pomme", "banane", "orange"];
B) let fruits = "pomme", "banane", "orange";
C) let fruits = (pomme, banane, orange);

Réponse correcte : A) let fruits = ["pomme", "banane", "orange"];

Question 5 :
Étant donné le tableau suivant :
```js
let couleurs = ["rouge", "vert", "bleu"];
```
Comment accéder au deuxième élément du tableau ("vert") ?

A) couleurs[1]
B) couleurs[2]
C) couleurs[0]
D) couleurs.get(1)

Réponse correcte : A) couleurs[1]

Question 6 :
Étant donné le tableau suivant :
```js
let nombres = [1, 2, 3];`
```
Laquelle de ces instructions ajoute correctement le nombre 4 à la fin du tableau ?

A) nombres.push(4);
B) nombres.add(4);
C) nombres[nombres.length] = 5;
D) nombres.pop(4);

Réponse correcte : A) nombres.push(4);

Quelle expression renvoie true ?

A) 5 == "5"
B) 5 === "5"
C) 5 != 5
D) 5 > 10

Réponse correcte : A) 5 == "5"

Question 8 :
Quel sera le résultat de l’expression suivante :
```js
let x = 10;
let y = 3;
console.log(x % y);
```
A) 3
B) 1
C) 0
D) 13

Réponse correcte : B) 1

Question 9 :
Quelle expression renverra true ?

A) (5 > 3) && (2 < 1)
B) (5 > 3) || (2 > 10)
C) !(3 === 3)
D) (4 < 2) || (1 > 3)

Réponse correcte : B) (5 > 3) || (2 > 10)

Question 10 :
Quel code affichera les nombres de 1 à 5 dans la console ?

A)
```js
for(let i = 1; i <= 5; i++){
    console.log(i);
}
```
B)
```js
for(let i = 1; i < 5; i++){
    console.log(i);
}`
```
C)
```js
let i = 1;
while(i < 5){
    console.log(i);
    i++;
}
```

Réponse correcte : A)

Question 11 :
Que fait le code suivant ?
```js
let compteur = 0;

while (compteur < 3) {
  console.log("Bonjour !");
  compteur++;
}
```

A) Affiche "Bonjour !" une seule fois.
B) Affiche "Bonjour !" trois fois.
C) Affiche "Bonjour !" à l’infini.
D) Ne s’exécute pas du tout.

Réponse correcte : B) Affiche "Bonjour !" trois fois.

Question 12 :
Quelle instruction permet de sélectionner un élément HTML possédant l’identifiant titre ?

A) document.querySelectorAll('#titre');
B) document.getElementById('titre');
C) document.getElementsByClassName('titre');
D) document.querySelector('.titre');

Réponse correcte : B) document.getElementById('titre');

Question 13 :
Quelle instruction permet de modifier le texte d’un paragraphe sélectionné avec document.querySelector('p') ?

A) document.querySelector('p').text = "Nouveau texte";
B) document.querySelector('p').textContent = "Nouveau texte";
C) document.querySelector('p').value = "Nouveau texte";
D) document.querySelector('p').innerValue = "Nouveau texte";

Réponse correcte : B) document.querySelector('p').textContent = "Nouveau texte";

Question 14 :
Quelle instruction permet de changer la source d’une image ayant l’ID photo en "img/chat.jpg" ?

A) photo.src = "img/chat.jpg";
B) document.querySelector("photo").src = "img/chat.jpg";
C) document.getElementById("photo").src = "img/chat.jpg";
D) document.getElementById("photo").setAttribute = "img/chat.jpg";

Réponse correcte : ✅ C) document.getElementById("photo").src = "img/chat.jpg";

Question 15 :
Quelle instruction permet d’exécuter une fonction lorsqu’un utilisateur clique sur un bouton avec l’ID btnTest ?

A) document.querySelector('btnTest').onClick(myFunction);
B) btnTest.addEventListener('click', myFunction);
C) document.getElementById('btnTest').addEventListener('click', myFunction);
D) document.addEventListener('click', btnTest);

Réponse correcte : ✅ C) document.getElementById('btnTest').addEventListener('click', myFunction);

Question 16 :
Laquelle de ces instructions permet d’exécuter la fonction afficherMessage() lorsqu’on clique sur un bouton ayant l’ID btn ?

A) document.getElementById("btn").click(afficherMessage);
B) document.getElementById("btn").onClick = afficherMessage;
C) document.getElementById("btn").addEventListener("click", afficherMessage);
D) afficherMessage().addEventListener("click", "btn");

✅ Réponse correcte : C) document.getElementById("btn").addEventListener("click", afficherMessage);

Question 17 :
Laquelle de ces instructions permet d’animer un élément en JavaScript en actualisant régulièrement sa position à l’écran ?

A) setInterval(deplacerElement, 1000);
B) setTimeout(deplacerElement, 1000);
C) requestAnimationFrame(deplacerElement);
D) animateElement(deplacerElement, 1000);

✅ Réponse correcte : C) requestAnimationFrame(deplacerElement);

Question 18 :
Quel événement JavaScript se déclenche lorsqu’une touche du clavier est pressée ?

A) onkeypress
B) onkeydown
C) onkeyup
D) oninput

✅ Réponse correcte : B) onkeydown

Question 19 :
À quoi sert la fonction setInterval() en JavaScript ?

A) À exécuter une fonction une seule fois après un délai donné.
B) À exécuter une fonction à intervalles réguliers.
C) À arrêter une fonction en cours d’exécution.
D) À créer une pause temporaire dans le code.

✅ Réponse correcte : B) À exécuter une fonction à intervalles réguliers.

Question 20 :
Que retourne la fonction Math.random() en JavaScript ?

A) Un nombre entier compris entre 0 et 10.
B) Un nombre décimal aléatoire compris entre 0 et 1.
C) Un nombre aléatoire compris entre 1 et 100.
D) Un entier aléatoire compris entre 0 et 1.

✅ Réponse correcte : B) Un nombre décimal aléatoire compris entre 0 et 1.
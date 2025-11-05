npm install 'prompt-sync'# Introduction à JavaScript
![JavaScript](img/javascript.jpg)

## Qu'est ce que JavaScript ?

**JavaScript**, c’est le langage qui donne vie aux pages web : il permet d’afficher du contenu qui se met à jour dynamiquement, de gérer le multimédia, d’animer des images… et bien plus encore ! Avec quelques lignes de code, on peut déjà en faire énormément !

Il a été créé en 1995 par Brendan Eich et intégré au navigateur web *Netscape Navigator 2.0*. Après que Netscape ai transmis JavaScript à l'**ECMA**, la fondation **Mozilla** a continué à développer JavaScript pour le navigateur Firefox.

Les programmes dans ce langage sont appelés **scripts**. Ils peuvent être écrits directement dans une page HTML et exécutés automatiquement au chargement des pages.

Les scripts sont **fournis** et **exécutés** en texte brut. **Ils n’ont pas besoin d’une préparation spéciale ou d’une compilation pour fonctionner**.

De par cet aspect, JavaScript est très différent d’un autre langage appelé **Java**.

![JavaScript différent de Java](img/java-vs-js.jpg){ style="display: block; margin: 0 auto" }

---

> Alors pourquoi est-il appelé <u>**Java**</u>Script

À sa création, JavaScript portait initialement le nom de **LiveScript**. Cependant, comme le langage Java était très populaire à cette époque, il a été jugé stratégique de présenter ce nouveau langage comme son *petit frère* afin de profiter de sa notoriété.

Au fil du temps, JavaScript a toutefois évolué pour devenir un langage totalement indépendant, défini par ses propres spécifications, appelées **ECMAScript**. Aujourd’hui, il n’a plus aucun lien avec Java.

---

Aujourd’hui, JavaScript peut s’exécuter non seulement dans le **navigateur**, mais également sur un **serveur**, ou encore sur **n’importe quel appareil** dans lequel existe un programme appelé le **moteur JavaScript**.

Les navigateurs ont un moteur intégré - par exemple **V8** pour Chrome, **SpiderMonkey** pour Firefox - qui peut également être appelé *machine virtuelle JavaScript*. Ce sont donc des programmes qui lisent, comprennent et exécute le code Javascript.
Leurs fonctionnement peut être résumé en quelques grandes étapes :
- **Analyse (Parsing)** : Le moteur lit le code JavaScript et le transforme en une représentation interne qu'il peut comprendre (un peu comme traduire une phrase).
- **Compilation (Just-in-Time)** : Au lieu d'exécuter directement le code ligne par ligne, le moteur le *compile à la volée* (juste avant son exécution) en **code machine**, c'est à dire un langage que l'ordinateur comprend.
- **Exécution et optimisation** : **Le moteur exécute ce code compilé et optimise automatiquement** les parties qui s'exécutent souvent pour aller plus vite (grâce à un optimiseur intégré).

## Que peut faire JavaScript dans le navigateur ?

Dans un navigateur web, JavaScript joue un rôle essentiel : c’est lui qui permet de rendre les pages **vivantes**, **interactives** et **dynamiques**. Grâce à lui, une page peut réagir aux actions de l’utilisateur, comme un **clic sur un bouton**, le **remplissage d’un formulaire** ou le **défilement de la page**. JavaScript peut aussi **modifier le contenu** et **l’apparence d’une page** SANS qu’il soit nécessaire de la recharger entièrement, ce qui rend la navigation plus fluide.

Il peut également **gérer des animations**, **contrôler des vidéos** ou **des sons**, et **communiquer avec des serveurs** pour **envoyer** ou **recevoir** des données en arrière-plan (par exemple, lorsqu’un site affiche de nouveaux messages sans actualiser la page). Enfin, JavaScript permet de **créer des applications web complètes** directement dans le navigateur, comme des **jeux**, des **cartes interactives** ou des **éditeurs en ligne**.

En résumé, JavaScript est le langage qui transforme une simple page web statique en une véritable application interactive.

## Qu’est-ce qui rend JavaScript unique ?

Ce qui rend JavaScript unique, c’est la combinaison de plusieurs qualités que l’on ne retrouve dans aucun autre langage côté navigateur.
Tout d’abord, il **s’intègre parfaitement avec le HTML et le CSS**, ce qui lui permet de modifier le contenu, la structure et le style d’une page web en temps réel. Ensuite, il offre une **grande simplicité pour les tâches de base** : beaucoup de choses peuvent être réalisées avec seulement quelques lignes de code. Enfin, t**ous les navigateurs modernes le prennent en charge par défaut**, sans qu’il soit nécessaire d’installer quoi que ce soit.

C’est cette union entre **accessibilité**, **simplicité** et **compatibilité universelle** qui fait de JavaScript le langage le plus utilisé pour créer des **interfaces web interactives**.
Et au-delà du navigateur, JavaScript peut aussi être utilisé pour développer des **serveurs**, des **applications mobiles** ou même des **programmes de bureau**, ce qui en fait un langage extrêmement polyvalent.

## En résumé 

- JavaScript a été initialement créé en tant que langage de navigateur uniquement, mais il est désormais également utilisé dans de nombreux autres environnements.

- Actuellement, JavaScript occupe une position unique en tant que langage de navigateur le plus largement adopté avec une intégration complète avec HTML/CSS.

![JavaScript est partout](img/javascript-everywhere.jpg){ style="display: block; margin: 0 auto" }

---

© Vincent Chiofalo
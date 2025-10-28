//********************************
// La conjecture de syracuse
//********************************


// I/ Explication
// **************

// La conjecture de syracuse est une suite de nombres particulière dans laquelle
// comme dans la plupart des suites on calcul un terme (nombre) en se basant sur le terme précédent (n).

// La particularité vient du calcul du nouveau terme :
// - si n est paire : n / 2
// - si n est impaire : 3 * n + 1

// Ainsi :
// Si n est égal à 4, le nouveau terme est 2
// Si n est égal à 5, le nouveau terme est 16

// Exemple avec 14 comme premier terme :

// 14, 7, 22, 11, 34, 17, 52, ...

// Note : le premier nombre doit forcément être un entier positif


// II/ Une feuille morte
// *********************

// La suite est en apparence chaotique.

// Sa forme particulière, nombres qui montent puis redescendent avant de remonter et ainsi de suite,
// ressemblant aux mouvements d'une feuille qui tombe dans le vent, on utilise un jargon aéronautique pour la qualifier :

// - la durée de vol : est le nombre total de termes (il y a une fin à la suite)
// - l'altitude : est le nombre le plus grand atteint lors du vol


// III/ Fin de la suite (conjecture)
// *********************************

// Au bout d'un certain temps, la suite de syracuse, finira toujour spas produire le même résultat
// on atteint forcément 1 puis, on entre dans un cycle dit 'trivial' qui se répète sans fin : 1 4 2 1 4 2 1 ...


// IV/ Exercice
// ************

// Créez un programme  qui :

// - Demande un nombre n de départ à l'utilisateur

// - Calcul le nombre suivant dans la suite de syracuse :
// si paire : n / 2
// si impaire : n * 3 + 1

// - Ajoute le nouveau nombre à la suite sous forme d'une chaine de caractère

// - Répète l'opération jusqu'à atteindre 1

// Affiche la chaîne de caractère final


// V/ Exercice bonus
// *****************

// Modifiez votre code de façon à afficher, après la suite :
// - La durée de Vol (nombre total de termes de la suite)
// - l'altitude (le terme le plus élevé de toute la suite)

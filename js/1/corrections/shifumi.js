let prompt = require('prompt-sync')();
let board = ['pierre', 'feuille', 'ciseaux'];
let play = true;
let botPoints = 0;
let humPoints = 0;

// Tant que play est vraie, rejoue !
while (play) {

    let shifumi =  prompt('Choisis entre pierre, feuille et ciseaux : ');
    let humNum = board.indexOf(shifumi);
    let bot = Math.floor(Math.random()*board.length);
    let error = board.includes(shifumi) == false;
    
    // Vérifie l'erreur et redemande au joueur de choisir entre pierre, feuille et ciseaux
    while (error) {
        shifumi =  prompt('Tu dois choisir entre pierre, feuille et ciseaux : ');
        if (board.includes(shifumi) == true) {
            error = false;
        }
    }

    // Compare le choix de l'humain et du programme
    if (humNum == bot) {
        console.log('Égalitée');
    } else if ((humNum == 0 && bot == 1)||(humNum == 1 && bot == 2)||(humNum == 2 && bot == 0)) {
        console.log(`Tu as perdu Humain, j'ai joué ${board[bot]}`); 
        botPoints++;
    } else {
        console.log(`Tu as gagné Humain, j'ai joué ${board[bot]}`);
        humPoints++;
    }

    // Affiche les points
    console.log(`Bot : ${botPoints} - Humain : ${humPoints}`);
    
    // Demande au joueur si il souhaite rejouer. Sinon, donne le résultat de la partie !
    let replay = prompt('Veux-tu rejouer ? o/n : ');
    if (replay == 'o') {
        play = true;
    } else {
        if (botPoints == humPoints) {
            console.log(`Égalité humain : ${botPoints} - ${humPoints}`);
        } else if (botPoints > humPoints) {
            console.log(`J'ai gagné humain, mouhahaha : ${botPoints} - ${humPoints}`);
        } else {
            console.log(`Tu as gagné humain, bravo : ${humPoints} - ${botPoints}`);
        }
        play = false;
    }
}
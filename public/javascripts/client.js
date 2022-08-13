//initialisation des variable de jeu
//variable qui permet de 
var tableau = [];

//element html du tableau de jeu
var elementhtmltableau = document.querySelector("tbody");

//element html de l'affichage de victoire ou de l'affichage de l'egalité
var elementHTMLaffichageVictoire = document.querySelector("div#affichageissue");

//variable du joueur permet de savoir quel joueur joue 
var joueur = 0;

//compteur des coups 
var compteur = 0;

//liste de casse que le bot peux jouer
var listeChoixRobot = [0,1,2,3,4,5,6,7,8];

//mode de jeu "jeujce" contre un ordinateur ou "jeujcj" contre un joueur.
var typeMatch = "jeujce"


/**
 * Methode de Array il permet de échanger les elements dans le tableau en prennant en parametre deux index. 
 * @param {Number} x 
 * @param {Number} y 
 * @returns
 */
Array.prototype.swap = function (x,y) {
    var b = this[x];
    this[x] = this[y];
    this[y] = b;
    return this;
  }


/**
 * Permet de changer de mode jeu jouer avec un ami ou contre l'ordinateur.
 * @param {String} typejeu 
 */
function selectjeu(typejeu) {
    typeMatch = typejeu;
    reset();
}

/**
 * Fonction qui donne les cordonnées d'une case sachent que la case 0 a pour cordonnee [0,0], 
 * et la derniere case 8 a pour cordonnée [2,2].  
 * @param { Number } casse
 * @return { Array }
 */
 function coordonnee(casse) {
    x = Math.floor(casse/3);
    y = casse % 3;
    return [x,y];
}

/**
 * Permet de d'avoir la valeur de ligne passer en argument du tableau de jeu.
 * @param { Number } x
 * @return { Array }
 */
 function getligne(x) {
    return tableau[x];

}

/**
 *  Permet de d'avoir la valeur de colonne passer en argument du tableau de jeu.
 * @param { Number } y
 * @return { Array }
 */
function getcolonne(y) {
    return [tableau[0][y], tableau[1][y], tableau[2][y]];
}

/**
 * Fonction qui parcour une liste elle verifie si tous les doonées de la liste sont sont les memes
 * si c'est le meme renvoi true et si non il renvoi false.
 * @param { Array } liste
 * @return { bool }
 */
function verifierliste(liste) {
    let dooneecase = liste[0]
    for (let index = 0; index < liste.length; index++) {
        if(dooneecase !== liste[index]) {
            return false;
        }    
    }
    return true;
}

/**
 * Fonction qui donne la case a partir du cordonné sachent que la case 0 a pour cordonnee [0,0], 
 * et la derniere case 8 a pour cordonnée [2,2].
 * @param { Number } x
 * @param { Number } y
 * @return { Number }
 */
function cases(x,y) {
    return x + y * 3;
}




/**
 * Fonction qui verifie une ligne
 * @param { Number } ligne
 * @return { Boolean }
 */
function verifLigne(ligne) {
    var listligne = getligne(ligne);
    return verifierliste(listligne);
    
}

/**
 * Fonction qui verifie une colonne
 * @param { Number } colonne
 * @return { Boolean }
 */
function verifColonne(colonne) {
    var listcolonne = getcolonne(colonne);
    return verifierliste(listcolonne);
}

/**
 * Fonction qui verifie les diagonnales
 * @param { Number } colonne
 * @return { Boolean }
 */
function verifDiagonal(casse) {
    if(casse === 0  || casse === 4 || casse === 8){
        if(verifierliste([tableau[0][0], tableau[1][1], tableau[2][2]])){
            //console.log("1");
            return true;
        }
    }
    if(casse === 4 || casse === 6|| casse === 2){
        if(verifierliste([tableau[2][0], tableau[1][1], tableau[0][2]])){
            //console.log("2",[tableau[2][0], tableau[1][1], tableau[0][2]]);
            return true;
        };
    }
    return false
}

/** 
 * Fonctionn qui regarde si le joueur qui joue à gagner.
 * si il a gagner renvoi true si non elle renvoi false
 * @param { Number } casse
 * @return {Boolean}
 */
function conditionDeVictoire(casse) {
    let coord = coordonnee(casse);
    //console.log( "ligne",verifLigne(coord[0]),getligne(coord[0]))
    //console.log( "colonne",verifColonne(coord[1]),getcolonne(coord[1]))
    //console.log( "dia",verifDiagonal(casse))

    return  verifLigne(coord[0]) || verifColonne(coord[1]) ||  verifDiagonal(casse);
}




/**
 * fonction qui modifie les valeur du tableau de jeu.
 * @param {Number} casse  
 */
function modifTableau(casse) {
    let coord = coordonnee(casse)
    tableau[coord[0]][coord[1]] = joueur
}

/**
 *Fonction qui genere l'affiche du tableau sur le navigateur 
 */
function generateAfficheTableau() {
    let str = ""
    for (let i = 0; i < tableau.length; i++) {

        str += '<tr>'
        for (let j = 0; j < tableau[i].length; j++) {
            str += `<td onclick="${typeMatch}(${cases(j,i)})"><div class="c">L</div></td>`
        }
        elementhtmltableau.innerHTML = str + "</tr>"
    }
}

/**
 * Fonction qui permet de modifier elle prend en argument la casse jouer par un joueur
 * elle affichera si le joueur 0 un O si c'est le joueur 1 qui joue elle affiche un X 
 * @param {Number} casse 
 */
function ModifierAffichageCase(casse){
    let coord = coordonnee(casse)
    elementhtmltableau.children[coord[0]].children[coord[1]].innerHTML = `${joueur < 1 ? '<div class="c" style="color: red">X</div>' : '<div class="c" style="color: blue">O</div>'}`
}

/**
 * Fonction qui permet relancé le jeu elle re initialise les variable et le tableau et aussi laffiche du tableau
 */
function reset() {
    tableau = [];
    elementhtmltableau = document.querySelector("tbody");
    joueur = 0;
    compteur = 0;
    listeChoixRobot = [0,1,2,3,4,5,6,7,8];
    for (let i = 0; i < 3; i++) {
        let liste = []
        for (let j = 0; j < 3; j++) {
           liste.push(42)
        }
        tableau.push(liste)
    }
    generateAfficheTableau()
}

/**
 * Retourne faux si la casse est jouer et vrai la casse n'est pas jouer.
 * @param {Number} casse 
 * @returns { Boolean }
 */
function verifierSiCaseJouer(casse){
    let coord = coordonnee(casse)
    return tableau[coord[0]][coord[1]] === 42 
}

/**
 * elle permet d'afficher qu'elle joueur a gagner.
 */
function affichageVictoire() {
    elementHTMLaffichageVictoire.textContent = `${joueur < 1 ? 'X' : 'O'} à gagné`
}
/**
 * elle permet d'afficher une egalité.
 */
function affichageEgalite() {
    elementHTMLaffichageVictoire.textContent = `égalité`
}

/**
 * fonction qui permet de changer de joueur elle modifie la variable joueur
 */
function changeJoueur() {
    //console.log(joueur)
    joueur = (joueur + 1) % 2
}

/** 
 * fonction qui fait jouer l'ordinateur
 */
 function robot() {
    let random = Math.floor(Math.random() * listeChoixRobot.length);
    let casseRandom = retirechoixbot(random) 
    //console.log(listeChoixRobot)
    changeJoueur()
    modifTableau(casseRandom);
    ModifierAffichageCase(casseRandom);
    compteur++    
    if(conditionDeVictoire(casseRandom)){
        affichageVictoire()
        reset()
    } /* pas besion si jouer en premier
    else if (compteur === 9) {
        affichageEgalite()
        reset()
    }*/
        
}

  /**
   * fonction qui permet de retirer les cases jouer dans la liste du choix du bot 
   * elle permet surtout que l'ordinateur ne choisi pas une casse jouer
   * @param {Number} index 
   * @returns 
   */
function retirechoixbot(index){
    listeChoixRobot = listeChoixRobot.swap(0,index)
    //console.log(listeChoixRobot)
    var retour = listeChoixRobot.shift()
    listeChoixRobot.sort()
    return retour
}

/**
 * fonction de jeu en mode joueur contre ordinateur.
 * @param {Number} casse 
 */
function jeujce(casse) {
    //socketClient.emit("jeu", 'i play');
    if(verifierSiCaseJouer(casse)) {
        changeJoueur()
        modifTableau(casse);
        ModifierAffichageCase(casse);
        compteur++
        retirechoixbot(listeChoixRobot.indexOf(casse))
        
        if(conditionDeVictoire(casse)){
            affichageVictoire()
            reset()
        } else if (compteur === 9) {
            affichageEgalite()
            reset()
        }else{
            robot()
        }
    }
}

let socketClient = io();

/**
 * fonction de jeu en mode joueur contre joueur.
 * @param {Number} casse 
 */
function jeujcj(casse) {
    //socketClient.emit("jeu", 'i play');
    if(verifierSiCaseJouer(casse)) {
        
        changeJoueur()
        modifTableau(casse);
        ModifierAffichageCase(casse);
        compteur++
        
        
        if(conditionDeVictoire(casse)){
            affichageVictoire()
            reset()
        } else if (compteur === 9) {
            affichageEgalite()
            reset()
        }
    } 
}


socketClient.on('connect', confirmation => {
    console.log('je suis connecter')
});

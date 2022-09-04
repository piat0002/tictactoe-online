function Game() {
    this._Players = [null,null];
    
    this._playerWhoPLay = -1;
    
    this._cells = [
                    [-1,-1,-1],
                    [-1,-1,-1],
                    [-1,-1,-1]
                  ];
}

Game.prototype.editCell = function (coordinate) {

}

Game.prototype.winCondition = function (coordinate) {

}

Game.prototype.checkRow = function (coordinate) {

}

Game.prototype.checkCol = function (coordinate) {

}

Game.prototype.checkRDiagno = function (coordinate) {

}

Game.prototype.reset = function () {

}

Game.prototype.checkIfCellIsPlayable = function (coordinate ,player) {

}

Game.prototype.changeTurn = function () {

}



Game.prototype.checkIfPlayerIsMissing = function () {

}


Game.prototype.surrender = function (player) {

}

Game.prototype.play = function (coordinate) {

}

Game.prototype.addPlayer = function (player) {

}
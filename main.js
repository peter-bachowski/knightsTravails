class ChessBoard {
    constructor (boardArray = [], knights = []) {
        this.boardArray = boardArray;
        this.knights = knights;
        let alphabet = 'ABCDEFGH';
        for (let horz = 1; horz <= 8; horz++) {
            for (let vert = 1; vert <= 8; vert ++) {
                let newChessTile = {
                    position: [horz, vert],
                    passed: false,
                    id: alphabet.charAt(vert - 1) + horz
                }
                boardArray.push(newChessTile);
            }
        }
    }

    addKnight (initPos) { // creates a knight on the chessboard at the deside location, and creates a tree for all possible moves
        const newKnight = new Knight(initPos);
        newKnight.root = new Node(initPos);
        this.knights.push(newKnight);
        for (let i = 0; i < this.boardArray.length; i++) {
            let boardTileObj = this.boardArray[i];
            if (boardTileObj.position === initPos) {
                boardTileObj.passed = true;
            }
        }
    }

    knightMoves (currPos, finalPos) {

    }

    possibleMoves (position) {

        let possibleMovesArray = [];
        let moveArray = [];
    
        moveArray.push([position[0]+1, position[1]+2]);
        moveArray.push([position[0]+1, position[1]-2]);
        moveArray.push([position[0]-1, position[1]+2]);
        moveArray.push([position[0]-1, position[1]-2]);
        moveArray.push([position[0]+2, position[1]+1]);
        moveArray.push([position[0]+2, position[1]-1]);
        moveArray.push([position[0]-2, position[1]+1]);
        moveArray.push([position[0]-2, position[1]-1]);
    
        for (let i = 1; i <= 8; i++) {
            let element = moveArray[i-1];
    
            if (element[0] < 0 || element[1] < 0 || element[0] > 8|| element[1] > 8) {
                continue;
            }
            else {
                for (let i = 0; i < this.boardArray.length; i++) {
                    let boardTile = this.boardArray[i];
                    if (element === boardTile.position && boardTile.passed === false) {
                        let newNode = new Node(element);
                        newNode.nextMoves = this.possibleMoves(element);
                        possibleMovesArray.push(newNode);
                        boardTile.passed = true;
                        break;
                    }
                }
            }
        }
    
        return possibleMovesArray;
    }
}

class Node {
    constructor (position, nextMoves = []) {
        this.position = position;
        this.nextMoves = nextMoves;
    }
}

class Knight {
    constructor (currPos, root = null) {
        this.currPos = currPos;
        this.root = root;
    }
}

const newBoard = new ChessBoard();
newBoard.addKnight([5,4]);
console.log(newBoard);

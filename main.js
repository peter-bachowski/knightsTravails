class ChessBoard {
    constructor (boardArray = [], knights = []) {
        this.boardArray = boardArray;
        this.knights = knights;
        let alphabet = 'ABCDEFGH';
    }

    addKnight (initPos) { // creates a knight on the chessboard at the deside location, and creates a tree for all possible moves
        const newKnight = new Knight(initPos);
        newKnight.root = new Node(initPos);
        this.knights.push(newKnight);
    }

    knightMoves (initPos, finalPos) {
        let root = new Node(initPos);
        root.nextMoves = this.createPossibleMoves(root);
        root.nextMoves.forEach(element => {
            element.nextMoves = this.createPossibleMoves(element);
        });
    }



    createPossibleMoves (root) {

        let moveArray = []; 
        let possibleMovesArray = []; //this array should have nodes
        const currPos = root.currPos;
    
        moveArray.push([currPos[0]+1, currPos[1]+2]);
        moveArray.push([currPos[0]+1, currPos[1]-2]);
        moveArray.push([currPos[0]-1, currPos[1]+2]);
        moveArray.push([currPos[0]-1, currPos[1]-2]);
        moveArray.push([currPos[0]+2, currPos[1]+1]);
        moveArray.push([currPos[0]+2, currPos[1]-1]);
        moveArray.push([currPos[0]-2, currPos[1]+1]);
        moveArray.push([currPos[0]-2, currPos[1]-1]);
    
        for (let i = 0; i < 8; i++) { //the loop checks if there are any negative coordinates in the move array
            let element = moveArray[i];
            if (element[0] < 0 || element[1] < 0 || element[0] > 8|| element[1] > 8) {
                continue;
            }
            else {
                possibleMovesArray.push(new Node(element));
            }
        }    
        return possibleMovesArray;
    }
}

class Node {
    constructor (position, nextMoves = []) { //first parameter is a coordinate, second parameter is an array of nodes
        this.position = position;
        this.nextMoves = nextMoves;
    }
}

class Knight {
    constructor (currPos, root) {
        this.currPos = currPos;
        this.root = root;
    }

    
}

const board1 = new ChessBoard();
board1.addKnight([0,0]);
const knight1 = board1.knights[0];
console.log(knight1);

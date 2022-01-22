

class Window {

    constructor() {
        this.player = document.querySelector(".player");
        this.board = document.querySelector(".board");
        this.blocks = document.querySelectorAll(".block");
        this.warning = document.querySelector(".warning");
        this.winning = document.querySelector(".winning");
        this.minBoard = document.querySelector(".min-board");
        this.menu = document.querySelector(".menu");
        this.winnerPlayer = document.querySelector(".winner-player");
        this.numOfMoves = document.querySelector(".num-of-moves");
        this.restart = document.querySelector(".restart");
        this.restart.addEventListener("click",this.restartGame.bind(this));
        this.counterX = 0;
        this.counterO = 0;
        this.blocks.forEach((block) => {
            block.addEventListener("click", this.blockClick.bind(this));
        })
        this.playerTurn = "O";
    }

    blockClick(e) {
        let control = this.blockControl(e.target);
        console.log(e.target);
        if (control) {
            this.player.style.visibility = "visible";
            this.player.textContent = `${this.playerTurn}'s Turn`;
            this.playerTurn == "X" ? this.playerTurn = "O" : this.playerTurn = "X";
            this.playerTurn == "X" ? this.counterX++ : this.counterO++;
            e.target.textContent = this.playerTurn;
            e.target.classList.add(this.playerTurn);
        } else {
            this.warning.style.visibility = "visible";
            e.target.classList.add("warn");
            setTimeout(() => {
                e.target.classList.remove("warn");
                this.warning.style.visibility = "hidden";
            }, 1200);
        }

        let gameControl = this.checkWinner(this.playerTurn);


        if (gameControl.winControl) {
            this.end(this.playerTurn, gameControl.trueComb);
            console.log(gameControl.trueComb);
        } else {

            if (this.isDraw(gameControl.checkArray)) {
                this.end("Draw");
            }
        }
    }

    blockControl(block) {
        let control = block.textContent.length === 0;
        return control;
    }

    checkWinner(player) {
        const winningComb = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        let checkArray = [];
        this.blocks.forEach((block, index) => {
            checkArray.push(block.textContent);
        });
        let trueComb = undefined;
        let winControl = winningComb.some((item) => {
            let sonuc;
            sonuc = item.every((index) => {
                return checkArray[index].includes(player);
            });
            sonuc == true ? trueComb = item : false;
            return sonuc;
        });

        return {winControl, checkArray, trueComb}
    }

    isDraw(checkArray) {
        return checkArray.every((item) => {
            return item === "X" || item === "O";
        });
    }

    end(result, trueComb) {
        this.menu.style.visibility = "visible";
        this.menu.style.opacity = "1";
        this.winnerPlayer.textContent = `The Winning Player : ${result}`;
        this.player.textContent = "";
        this.player.style.visibility = "hidden";
        if (result == "X") {
            this.numOfMoves.textContent = `Number of moves made : ${this.counterX}`;
        } else if (result == "O") {
            this.numOfMoves.textContent = `Number of moves made : ${this.counterO}`;
        } else {
            this.numOfMoves.style.display = "none";
            this.minBoard.style.display="none";
        }

        for (let i = 0; i < trueComb.length; i++) {
            this.minBoard.children[trueComb[i]].textContent = result;
            this.minBoard.children[trueComb[i]].style.background="green";
            this.minBoard.children[trueComb[i]].style.color="white";
        }
    }

    restartGame(){
        this.counterX = 0;
        this.counterO = 0;
        this.menu.style.opacity="0.1";
        this.menu.style.visibility="hidden";
        this.playerTurn = "O";
        this.minBoard.style.display="grid";
        this.numOfMoves.style.display = "block";
        
        for(let i = 0; i<this.minBoard.children.length; i++){
            console.log(this.minBoard.children[i]);
            this.minBoard.children[i].style.background= "";
            this.minBoard.children[i].style.color= "";
            this.minBoard.children[i].textContent="";
        }
        this.blocks.forEach((block) =>{
           block.textContent="";
           if(block.classList.contains("X")){
               block.classList.remove("X");
           }
           else if(block.classList.contains("O")){
               block.classList.remove("O");
           }
        });
        document.addEventListener("DOMContentLoaded",() => {
            const windows = new Window();
          });
    }
}

document.addEventListener("DOMContentLoaded",() => {
    const windows = new Window();
  });

let humanScore =0;
let compScore = 0;
let isGameOver = false;
let maxScore =3;

let getCompChoice = async function(){

    return new Promise((resolve)=>{
        let compChoice = Math.floor(Math.random()*3);
        let compChoiceStr = "";
    
        switch (compChoice) {
            case 0:
                compChoiceStr = "rock";
                break;
            case 1:
                compChoiceStr = "paper";
                break;
            case 2:
                compChoiceStr = "scissors";
                break;
            default:
                compChoiceStr = "paper";
        }
    
        resolve(compChoiceStr);
    });
}

let getHumanChoice = function(){
    return new Promise((resolve) => {
    let imageLinks = document.querySelectorAll(".image-link");
    let MainContainer = document.querySelector(".flex-cont");

    if(document.querySelector(".results-cont").innerHTML === ""){
        document.querySelector(".results-cont").style.display = "none";
    }

    let humanChoice = "";
    
    for (const link of imageLinks) {
        link.addEventListener("click",(ev)=>{
            //prevent page reload
            ev.preventDefault();
            humanChoice = link.childNodes[0].alt;

            for (const link of imageLinks) {
                link.classList.remove("selected");
            }
            link.classList.add("selected");
    
            let oldConfirmationMessage;
    
            if(document.querySelector(".conf-message")){
                oldConfirmationMessage = document.querySelector(".conf-message");
            }
    
            let confirmationMessage = document.createElement("div");
            confirmationMessage.classList.add("conf-message");
            confirmationMessage.innerHTML = `Are you sure you want to pick ${humanChoice}
            <div class="Yes-or-no-cont">
                <a href="/" class="yes-cont"><button class="yes-button">Yes</button></a>
                <a href="/" class="no-cont"><button class="no-button">No</button></a>
            </div>
            `;
    
            if(oldConfirmationMessage){
                MainContainer.removeChild(oldConfirmationMessage);
            }
    
            MainContainer.append(confirmationMessage);

            let yesButton = document.querySelector(".yes-button");
            let noButton = document.querySelector(".no-button");

            noButton.addEventListener("click",(ev)=>{
                ev.preventDefault();
                    MainContainer.removeChild(confirmationMessage);
                    link.classList.remove("selected");
            });

            yesButton.addEventListener("click",(ev)=>{
                ev.preventDefault();
                MainContainer.classList.add("fade-out");
                MainContainer.addEventListener("transitionend", () => 
                    {   
                        link.classList.remove("selected");
                        MainContainer.style.display = "none";
                        MainContainer.removeChild(confirmationMessage);
                        resolve(humanChoice);
                    },{once:true});
            });

            
        });
    }
});
}

let gameLogic = async function(humanChoice,compChoice){
    if (humanChoice === "rock") {
        if (compChoice === "scissors") {
            return "win";
        } 
        else if(compChoice === "paper"){
            return "lose";
        }
        else if(compChoice === "rock"){
            return "tie";
        }
    } else if (humanChoice === "paper") {
        if (compChoice === "scissors") {
            return "lose";
        } 
        else if(compChoice === "paper"){
            return "tie";
        }
        else if(compChoice === "rock"){
            return "win";
        }
    } else  { //scissors
        if (compChoice === "scissors") {
            return "tie";
        } 
        else if(compChoice === "paper"){
            return "win";
        }
        else if(compChoice === "rock"){
            return "lose";
        }
    } 
}


let playRound = async () => {
    let compChoice = await getCompChoice();
    let humanChoice = await getHumanChoice();
    
    let winner = await gameLogic(humanChoice.toLowerCase(),compChoice.toLowerCase());

    let resultsContainer = document.querySelector(".results-cont")
    
    let resultMessage = "";

    if(winner === "win"){
        resultMessage = `You win, ${humanChoice} beats ${compChoice}`;
        humanScore++;
        document.querySelector(".human-score-num").textContent = humanScore;
    } else if(winner === "lose"){
        resultMessage = `You lose, ${compChoice} beats ${humanChoice}`;
        compScore++;
        document.querySelector(".comp-score-num").textContent = compScore;
    } else {
        resultMessage = "Draw"   
    }

    resultsContainer.innerHTML = `
        <div class="results-pic-cont">
            <div class="human-result-cont">
                <div class="result-title">Human</div>
                <img class="mirror " src="./public/images/${humanChoice}.png" alt="${humanChoice}">
                <div class="human-choice">${humanChoice}</div>
            </div>
            <div class="comp-result-cont">
                <div class="result-title">Computer</div>
                <img class="" src="./public/images/${compChoice}.png" alt="${compChoice}">
                <div class="comp-choice">${compChoice}</div>
            </div>
        </div>
        <div class="result-message">${resultMessage}</div>
        <a href="/"><button class="play-next-round">Play next round</button></a>
    `;

    

        resultsContainer.style.display = "";
        // resultsContainer.classList.remove("fade-out");
    
    
    
    let nextButton = document.querySelector(".play-next-round");
    nextButton.addEventListener("click",(ev)=>{
        ev.preventDefault();
        resultsContainer.style.display = "none";
        document.querySelector(".flex-cont").style.display = "";
        document.querySelector(".flex-cont").classList.remove("fade-out");
    });

    if(humanScore ===maxScore || compScore===maxScore){
        isGameOver = true
        if(humanScore === maxScore){
            return "human";
        } 

        if(compScore === maxScore){
            return "computer"
        }
    }
}

async function playGame() {
    // for (let i = 0; i < 5; i++) {
    //     await playRound();
    //     console.log(i);
    // }
    let winnerName = "";
    while(!isGameOver){
        winnerName =  await playRound();
    }

    console.log(winnerName);

    document.querySelector(".flex-cont").style.display = "none";
    document.querySelector(".results-cont").style.display = "none";

    let gameOverMessage = document.createElement("div");
    gameOverMessage.textContent = `Game over ${winnerName} wins`;
    gameOverMessage.classList.add("game-over-message");
    document.body.append(gameOverMessage);
}

playGame();




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


let startGame = async () => {
    let humanScore =0;
    let compScore = 0;
    let compChoice = await getCompChoice();
    let humanChoice = await getHumanChoice();

    console.log(humanChoice,compChoice);
    
    let winner = await gameLogic(humanChoice.toLowerCase(),compChoice.toLowerCase());

    let imageChoicesCont = document.createElement("div");
        imageChoicesCont.classList.add("conf-message");
        imageChoicesCont.innerHTML = `Are you sure you want to pick ${humanChoice}
            <div class="Yes-or-no-cont">
                <a href="/" class="yes-cont"><button class="yes-button">Yes</button></a>
                <a href="/" class="no-cont"><button class="no-button">No</button></a>
            </div>
            `;
    
    // document.body.append(imageChoicesCont);

    console.log(winner);
    
    if(winner === "win"){
        console.log(`You win, ${humanChoice} beats ${compChoice}`);
    } else if(winner === "lose"){
        console.log(`You lose, ${compChoice} beats ${humanChoice}`);
    } else {
        console.log("Tie ya negm");   
    }

    document.querySelector(".flex-cont").style.display = "";
    document.querySelector(".flex-cont").classList.remove("fade-out");
}

startGame();



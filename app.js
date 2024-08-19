let getCompChoice = function(){

    let compChoice = Math.floor(Math.random()*3);
    let compChoiceStr = "";

    switch (compChoice) {
        case 0:
            compChoiceStr = "Rock";
            break;
        case 1:
            compChoiceStr = "Paper";
            break;
        case 2:
            compChoiceStr = "Scissors";
            break;
        default:
            compChoiceStr = "Paper";
    }

    return compChoiceStr;
}

let getHumanChoice = function(){
    let imageLinks = document.querySelectorAll(".image-link");
    let MainContainer = document.querySelector(".flex-cont");
    
    for (const link of imageLinks) {
        link.addEventListener("click",(ev)=>{
            //prevent page reload
            ev.preventDefault();
            let humanChoice = link.childNodes[0].alt;
    
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
                    console.log("la2");
                    MainContainer.removeChild(confirmationMessage);
            });

            yesButton.addEventListener("click",(ev)=>{
                ev.preventDefault();
                    console.log("ah");
            });
    
            
        });
    }
}

getCompChoice();
getHumanChoice();

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


console.log(getCompChoice());
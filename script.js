// add javascript here
var userName = prompt("what is your name?").toLowerCase();
var guessCount = 0;
var range = 0;
var averageScore = 0;
var wins = 0;
var totalGames = 0;
var games = [];
var randomNum = 0;
userName = userName.charAt(0).toUpperCase() + userName.slice(1);
// funcion to reset the game and update the average score and leaderboard
function reset(){
    totalGames++;
    pos = games.length;
    games.push(guessCount);
    // creates array in order of least guesses to most guesses
    while(pos > 0 && games[pos-1] > guessCount){
        [games[pos-1], games[pos]] = [games[pos], games[pos-1]];
    }
    //calculates average score
    if (totalGames > 1){
        var averageScore = (averageScore * (totalGames - 1) + guessCount) / totalGames;
    } else {
        var averageScore = guessCount;
    }
    // updates the average score and leaderboard
    document.getElementById("avgScore").textContent = "Average Score: " + averageScore.toFixed(2);
    var leaderboard = document.querySelectorAll("li[name='leaderboard']");
    if (games.length >= 1){
        leaderboard[0].textContent = games[0];
        if (games.length >= 2){
            leaderboard[1].textContent = games[1];
            if (games.length >= 3){
                leaderboard[2].textContent = games[2];
            }
        }
    }
    // resets buttons
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;
}

// starts game when they click the play button and sets the range based on the difficulty they choose
function startGame(){
    var difficulty = document.querySelector("input[type='radio']:checked");
    if(difficulty.id == "e"){
        range = 3;
    } else if(difficulty.id == "m"){
        range = 10;
    } else if(difficulty.id == "h"){
        range = 100;
    }
    document.getElementById("msg").textContent = userName + " guess a number between 1 and " + range;
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;
    randomNum = Math.floor(Math.random() * range) + 1;
    guessCount = 0;
}
// function for when they click the guess button
function guessNum(){
    if (Number(document.getElementById("guess").value) < 1 || Number(document.getElementById("guess").value) > range ){
        document.getElementById("msg").textContent = userName + " please enter a validnumber between 1 and " + range;
        return;
    }
    guessCount++;
    var guess = Number(document.getElementById("guess").value);
    //resest game if they guess correct
    if (guess == randomNum){
        document.getElementById("msg").textContent = userName +" you are correct!";
        wins++;
        document.getElementById("wins").textContent = "Total wins: " + wins;
        reset();
        return;
    }
    var output = userName + " " ;
    // gives feedback on if the guess is too high or low and how close they are
    if (guess < randomNum){
        output += "too low";
    } else if (guess > randomNum){
        output += "too high";
    }
    output += " ";
    var difference = Math.abs(guess - randomNum);
    if (difference <= 2){
        output += "but you're hot!";
    }
    else if (difference <= 5){
        output += "but you're warm.";
    }
    else {
        output += "and you're cold.";
    }
    document.getElementById("msg").textContent = output;
}

// resests game when they give up
function giveUp(){
    document.getElementById("msg").textContent = userName + " the correct number was " + randomNum;
    guessCount = range;
    reset();
}

// event listeners
document.getElementById("playBtn").addEventListener("click", startGame);
document.getElementById("guessBtn").addEventListener("click", guessNum);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);
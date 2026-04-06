// add javascript here
var name = prompt("what is your name?").toLowerCase();
var guessCount = 0;
var range = 0;
var averageScore = 0;
var wins = 0;
var totalGames = 0;
var games = [];
name = name.charAt(0).toUpperCase() + name.slice(1);
function reset(){
    totalGames++;
    pos = games.length;
    games.pop(guessCount);
    while(pos > 0 && games[pos-1] > guessCount){
        [games[pos-1], games[pos]] = [games[pos], games[pos-1]];
    }
    var averageScore = (averageScore * (totalGames - 1) + guessCount) / totalGames;
    document.getElementById("average").textContent = "Average Score: " + averageScore.toFixed(2);
    var leaderboard = document.querySelectorAll("input[name='leaderboard']");
    if (games.length >= 1){
        leaderboard[0].value = games[0];
        if (games.length >= 2){
            leaderboard[1].value = games[1];
            if (games.length >= 3){
                leaderboard[2].value = games[2];
            }
        }
    }
    document.getElementById("guessBtn").disabled = true;
    document.getElementById("giveUpBtn").disabled = true;
    document.getElementById("playBtn").disabled = false;
}
function startGame(){
    var difficulty = document.querySelector("input[type='radio']:checked");
    if(difficulty.id == "e"){
        range = 3;
    } else if(difficulty.id == "m"){
        range = 10;
    } else if(difficulty.id == "h"){
        range = 100;
    }
    document.getElementById("msg").textContent = name + " guess a number between 1 and " + range;
    document.getElementById("guessBtn").disabled = false;
    document.getElementById("giveUpBtn").disabled = false;
    document.getElementById("playBtn").disabled = true;
    var randomNum = Math.floor(Math.random() * range) + 1;
    guessCount = 0;
}
function guessNum(){
    guessCount++;
    var guess = document.getElementById("guess").value;
    if (guess == randomNum){
        document.getElementById("msg").textContent = name +" you are correct!";
        wins++;
        document.getElementById("wins").textContent = "Total wins: " + wins;
        reset();
        return;
    }
    var output = name + " " ;
    if (guess < randomNum){
        output += "too low";
    } else if (guess > randomNum){
        output += "too high";
    }
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
function giveUp(){
    document.getElementById("msg").textContent = name + " the correct number was " + randomNum;
    guessCount = range;
    reset();
}
document.getElementById("playBtn").addEventListener("click", startGame);
document.getElementById("guessBtn").addEventListener("click", guessNum);
document.getElementById("giveUpBtn").addEventListener("click", giveUp);
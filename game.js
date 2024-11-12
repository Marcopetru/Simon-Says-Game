var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gameHasStarted = false;
var level = 0;

$(document).keypress(function() { //seteamos primer valor de la secuencia del juego y cambiamos el titulo
    if (!gameHasStarted) {
        $("#level-title").text("Level " + level);
        nextSequence();
        gameHasStarted = true;
    }
});


$(".btn").click(function() { //cualquier boton cliqueado guardo su id y lo pusheo a userChosenColour y se emite un sonido segun el color
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //chequea q el valor de ambas secuencias coincidan
        if (userClickedPattern.length === gamePattern.length) { //chequea que el usuario haya terminado su secuencia
            setTimeout(function() { //si la termino y coinciden los ultimos valores llama al proximo nivel
                nextSequence();
            }, 1000);
        } //mientras las longitudes no sean las mismas no hace nada(osea hasta q el jugador termine de jugar su secuencia)
    } else {
        var wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();
        $("body").addClass("game-over");
        setTimeout(function() { //si la termino y coinciden los ultimos valores llama al proximo nivel
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }

}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameHasStarted = false;
}

function nextSequence() { //genera secuencia random de colores + animacion + sonido segun color

    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

function playSound(name) { //hace sonar sonido segun el color pasado como parametro
    var sound = new Audio("./sounds/" + name + ".mp3"); 
    sound.play();
}

function animatePress(currentColour) { //agrega efecto de la clase pressed cuando se presiona el boton y desp de 100 milisegs se elimina la clase del boton
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}


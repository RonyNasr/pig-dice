//business logic
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Player (name,score,turn){
  this.name = name;
  this.score = score;
  this.turn = turn;
}

Player.prototype.endTurn = function () {
  this.turn=0;
};

Player.prototype.startTurn = function () {
  this.turn=1;
};

Player.prototype.hold = function (total) {
  this.score += total;
};

Player.prototype.checkWin = function (total) {
  return ((this.score + total) >= 100);
};

var player1 = new Player(null,0,1);
var player2 = new Player (null,0,0);

var switchPlayer = function(playerName){
  console.log(player1.name, playerName);
  if (player1.name === playerName){
    player1.endTurn();
    $("#score1").removeClass("active");
    player2.startTurn()
    $("#score2").addClass("active");
  }else {
    player2.endTurn();
      $("#score2").removeClass("active");
    player1.startTurn()
      $("#score1").addClass("active");
  }
}

var resetGame = function(){
  player1.name = null;
  player2.name = null;
  $("input#player1").val("");
  $("input#player2").val("");
  $("#score1-span").text("0");
  $("#score2-span").text("0");
  $("#total-span").text("0");
  $(".game-col").hide();
}

//Front end logic
$(function(){
    var total = 0;

  $("#add").click(function(){
    player1.name = $("input#player1").val();
    player2.name = $("input#player2").val();

    $("#score1").addClass("active");

    $("#p1-score").text(player1.name);
    $("#p2-score").text(player2.name);
    $("#score1-span").text(player1.score);
    $("#score2-span").text(player2.score);
    $("#total-span").text(total);

    $(".game-col").show();
  });

  $("#roll").click(function(){
    //if it's the player's turn
      // total = 0;
      var dice = getRandom(1, 6);
      $("#dice-value").text(dice);
      if (dice !== 1){
        total +=dice;
        $("#total-span").text(total);
        if (player1.turn && player1.checkWin(total)){
          player1.score += total;
          alert (player1.name + " has won!! <br> score: " + player1.score);
          resetGame();
        }else if (player2.turn && player2.checkWin(total)) {
          player2.score += total;
          alert (player2.name + " has won!!<br> score: " + player2.score);
          resetGame()
        }
      }else {
        total=0;
        $("#total-span").text(total);
        if (player1.turn){
            switchPlayer(player1.name);
        }else {
          switchPlayer(player2.name);
        }
      }
    });

    $("#hold").click(function() {
      if (player1.turn === 1){
        player1.score += total;
        $("#score1-span").text(player1.score);
        total = 0 ;
        switchPlayer(player1.name);
      } else {
        player2.score += total;
        $("#score2-span").text(player2.score);
        total = 0 ;
        switchPlayer(player2.name);
      }
    });
});

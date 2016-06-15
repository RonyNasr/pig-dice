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

// function Game(){
//   this.total= 0
//   this.players = [];
// }

//Front end logic
$(function(){
  var total = 0;
  var player1 = new Player(null,0,1);
  var player2 = new Player (null,0,0);

  $("#add").click(function(){
    player1.name = $("input#player1").val();
    player2.name = $("input#player2").val();

    $("#p1-score").text(player1.name);
    $("#p2-score").text(player2.name);
    $("#score1-span").text(player1.score);
    $("#score2-span").text(player2.score);
    $("#total-span").text(total);

    $(".game-col").show();
  });

  $("#roll").click(function(){
    //if it's the player's turn
      var dice = getRandom(1, 6);
      if (dice !== 1){
        total +=dice;
        $("#total-span").text(total);
      }else {
        total=0;
        $("#total-span").text(total);
        if (player1.turn){
          player1.endTurn();
          player2.startTurn()
        }else {
          player2.endTurn();
          player1.startTurn()
        }
      }

    $("#hold").click(function() {
    //  debugger;
      if (player1.turn === 1){
        player1.score += total;
        $("#score1-span").text(player1.score);
        total = 0 ;
        player1.endTurn();
        player2.startTurn()
      } else {
        player2.score += total;
        $("#score2-span").text(player2.score);
        total = 0 ;
        player2.endTurn();
        player1.startTurn()
      }
    });
  });

});

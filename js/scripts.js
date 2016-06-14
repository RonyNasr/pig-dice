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

    $(".game-col").show();
  });

  $("#roll").click(function(){
    //if it's the player's turn
      var dice = getRandom(1, 6);
      if (dice !== 1){
        total +=dice;
      }else {
        total=0;
        endTurn();
      }

    $("#hold").click(function() {
      endTurn();
    });
  });

});

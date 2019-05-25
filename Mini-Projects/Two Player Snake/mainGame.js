window.onload = function() {
  canv = document.getElementById("gc");
  ctx = canv.getContext("2d");
  document.addEventListener("keydown", keyPush);
  setInterval(  game, 1000 / 15);
}

var twoPlayer = true;
const MAX_LOOP = 10;
const DEFAULT_LENGTH = 5;
var gridSize = 20;
var tileCountX = 95;
var tileCountY = 43;
var appleX = 15;
var appleY = 15;

function randomColor() {
  let color = ('#'+('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6));
  i = 0
  while((color == '#000000' || color == '#ff0000') && i < MAX_LOOP) {
    color = ('#'+('00000'+(Math.random()*(1<<24)|x0).toString(16)).slice(-6));
  }
  return (color != '#000000' || color != '#ff0000') ? color : '#9024FB'; 
}

function snake() {
  let startX = Math.floor(Math.random() * tileCountX);
  let startY = Math.floor(Math.random() * tileCountY);
  
  this.color = randomColor();
  this.x = startX;
  this.y = startY;
  this.xVelocity = 0;
  this.yVelocity = 0;
  this.trail = [];
  this.tail = DEFAULT_LENGTH;
  
  this.die = () => {
    this.tail = DEFAULT_LENGTH;
    this.x = startX;
    this.y = startY;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.trail = [];
  }
  
  players.push(this);
}

var players = [];
var playerSnake = new snake();
if(twoPlayer) {
  var playerSnakeWASD = new snake();
}

function game() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canv.width, canv.height);
  players.forEach(player => {
    player.x += player.xVelocity;
    player.y += player.yVelocity; 

    borderCollision(player);


    ctx.fillStyle = player.color;
    for (var i = 0; i < player.trail.length; i++) {
      ctx.fillRect(player.trail[i].x * gridSize + 1, player.trail[i].y * gridSize + 1, gridSize - 1, gridSize - 1);
      if (player.trail[i].x == player.x && player.trail[i].y == player.y) {
        player.die();
      }
    }
    players.forEach(otherPlayer => {
      for(var i = 0; i < otherPlayer.trail.length; i++) {
        if(otherPlayer.trail[i].x == player.x && otherPlayer.trail[i].y == player.y) {
          player.die();
        }
      }
    });
    

    player.trail.push({
      x: player.x,
      y: player.y
    });

    while (player.trail.length > player.tail) {
      player.trail.shift();
    }

    eatApple(player);

  });
  ctx.fillStyle = "red";
  ctx.fillRect(appleX * gridSize + 1, appleY * gridSize + 1, gridSize - 1, gridSize - 1);
}

function eatApple(player) {
  if (appleX == player.x && appleY == player.y) {
    player.tail++;
    newApple();
  }
}

function newApple() {
  appleX = Math.floor(Math.random() * tileCountX);
  appleY = Math.floor(Math.random() * tileCountY);
}

function keyPush(evt) {
  switch (evt.keyCode) {
    case 37:
      playerSnake.xVelocity = -1;
      playerSnake.yVelocity = 0;
      break;
    case 38:
      playerSnake.xVelocity = 0;
      playerSnake.yVelocity = -1;
      break;
    case 39:
      playerSnake.xVelocity = 1;
      playerSnake.yVelocity = 0;
      break;
    case 40:
      playerSnake.xVelocity = 0;
      playerSnake.yVelocity = 1;
      break;
    case 65:
      if(twoPlayer) {
        playerSnakeWASD.xVelocity = -1;
        playerSnakeWASD.yVelocity = 0; 
      }
      break;
    case 87:
      if(twoPlayer) {
        playerSnakeWASD.xVelocity = 0;
        playerSnakeWASD.yVelocity = -1;
      }
      break;
    case 68:
      if(twoPlayer) {
        playerSnakeWASD.xVelocity = 1;
        playerSnakeWASD.yVelocity = 0;
      }
      break;
    case 83:
      if(twoPlayer) {
        playerSnakeWASD.xVelocity = 0;
        playerSnakeWASD.yVelocity = 1;
      }
      break;
  }
}

function borderCollision(player) {
  if (player.x < 0) {
    player.x = tileCountX - 1;
  }
  if (player.x > tileCountX - 1) {
    player.x = 0;
  }
  if (player.y < 0) {
    player.y = tileCountY - 1;
  }
  if (player.y > tileCountY - 1) {
    player.y = 0;
  }
}
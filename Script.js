const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Snake settings
let snake = [{ x: 250, y: 250 }];
let direction = 'RIGHT';
const snakeSize = 20;
let score = 0;

// Ball settings
let ball = { x: 0, y: 0 };
let ballSize = 20;

// Game settings
let gameOver = false;

// Generate random positions for the ball
function randomPosition() {
  return Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
}

// Draw the snake
function drawSnake() {
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "green" : "lightgreen"; // Head is green, rest is light green
    ctx.fillRect(snake[i].x, snake[i].y, snakeSize, snakeSize);
  }
}

// Draw the ball
function drawBall() {
  ctx.fillStyle = "red";
  ctx.fillRect(ball.x, ball.y, ballSize, ballSize);
}

// Move the snake
function moveSnake() {
  let head = { ...snake[0] };

  if (direction === 'LEFT') head.x -= snakeSize;
  if (direction === 'RIGHT') head.x += snakeSize;
  if (direction === 'UP') head.y -= snakeSize;
  if (direction === 'DOWN') head.y += snakeSize;

  snake.unshift(head);

  // Check if snake ate the ball
  if (head.x === ball.x && head.y === ball.y) {
    score++;
    ball.x = randomPosition();
    ball.y = randomPosition();
  } else {
    snake.pop(); // Remove the last part of the snake
  }
}

// Check for collisions
function checkCollisions() {
  let head = snake[0];

  // Check wall collisions
  if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
    gameOver = true;
  }

  // Check self collisions
  for (let i = 1; i < snake.length; i++) {
    if (snake[i].x === head.x && snake[i].y === head.y) {
      gameOver = true;
    }
  }
}

// Update the game screen
function updateGame() {
  if (gameOver) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Game Over! Score: " + score, 100, canvas.height / 2);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawBall();
  moveSnake();
  checkCollisions();

  // Display score
  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, 30);
}

// Set random ball position
ball.x = randomPosition();
ball.y = randomPosition();

// Control snake direction
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
  if (e.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
  if (e.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
  if (e.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
});

// Start the game loop
function gameLoop() {
  updateGame();
  setTimeout(gameLoop, 100);
}

gameLoop();
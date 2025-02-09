const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');

let snake = [{ x: 10, y: 10 }];
let direction = { x: 1, y: 0 };
const snakeSize = 20;

function drawSnake() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    for (let part of snake) {
        ctx.fillStyle = '#00FF00'; // Snake color
        ctx.fillRect(part.x * snakeSize, part.y * snakeSize, snakeSize - 1, snakeSize - 1); // Draw each part
    }
}

function updateSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head); // Add new head

    // Remove the last part of the snake if it's too long
    if (snake.length > 5) {
        snake.pop();
    }
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            direction = { x: 1, y: 0 };
            break;
    }
}

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    updateSnake();
    drawSnake();
    requestAnimationFrame(gameLoop); // Repeat the loop
}

gameLoop(); // Start the game loop

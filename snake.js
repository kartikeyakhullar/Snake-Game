console.log('Loaded and working...')


const cvs = document.getElementById('snake')
const ctx = cvs.getContext('2d')


// Create the unit
const box = 32;

// Adding images
const foodImg = new Image()
foodImg.src = 'images/food.png'

const ground = new Image()
ground.src = 'images/ground.png'

// Snake
let snake = [];
snake[0] = {
    x : 9*box,
    y : 10*box
}

// Create the food
let food = {
    x : Math.floor(Math.random()*17 + 1) * box,
    y : Math.floor(Math.random()*15 + 3) * box,
}

// Score
let score = 0;

// Control the snake
document.addEventListener('keydown', direction)

let d;
function direction(event){
    let key = event.keyCode;
    if( key == 37 && d != "RIGHT"){
        d = "LEFT";
    }else if(key == 38 && d != "DOWN"){
        d = "UP";
    }else if(key == 39 && d != "LEFT"){
        d = "RIGHT";
    }else if(key == 40 && d != "UP"){
        d = "DOWN";
    }
}

// Check for collision with the body of the snake

function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// Drawing to the canvas
function draw(){
    ctx.drawImage(ground,0,0)

    for(let i=0;i<snake.length;i++){
        ctx.fillStyle = (i==0)? "green" : "white";
        ctx.fillRect(snake[i].x , snake[i].y, box,box)

        ctx.strokeStyle = "red"
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }
    ctx.drawImage(foodImg,food.x,food.y)

    // Old head position.
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    // Remove the tail
    // snake.pop()

    // Direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;

    if(snakeX == food.x && snakeY == food.y){
        score++;
        console.log('Length should grow I had food.')
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        console.log('Hitting this statement perfectly fine...')
        snake.pop();
    }

    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
    
    if(snakeX < box || snakeX > 17 * box || snakeY < 3*box || snakeY > 17*box || collision(newHead,snake)){
        clearInterval(game);
    }
    
    snake.unshift(newHead);
    

    ctx.fillStyle = "white"
    ctx.font = "45px Changa one"
    ctx.fillText(score,2*box,1.5*box)
}

let game = setInterval(draw,100);
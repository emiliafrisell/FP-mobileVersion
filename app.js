let gameController = (function() {

})();

let UIController = (function() {
   
    return {
        
    };
})();

let controller = (function(gameCtrl, UICtrl) {


    const playArea = document.getElementsByClassName('playArea');
    let player = document.querySelector('.run');
    const price = document.querySelector('.apple');
    
    let playerPosition = {x: 0, y: 0};
    let pricePosition = {x: 0, y: 0};

    playerPosition.x = 2;
    playerPosition.y = 2;
    player.style.setProperty('--playerY', playerPosition.x);
    player.style.setProperty('--playerX', playerPosition.y);

    // pricePosition.x = Math.floor(Math.random() * 20) + 1; 
    // pricePosition.y = Math.floor(Math.random() * 20) + 1;

    // price.style.setProperty('--priceY', pricePosition.x);
    // price.style.setProperty('--priceX', pricePosition.y);

    let score = 0;

    function animate() {
    playArea.clearRect(0, 0, playArea.width, playArea.height);  // clear canvas
    playArea.drawImage(img, imgX, imgY);                       // draw image at current position
    imgX -= 4;
    if (imgX > 200) requestAnimationFrame(animate)        // loop
    }

 

    let setupEventListener = function() {
        document.addEventListener('keydown', btnPress);        
    };

    let btnPress = function(event) {
        if (event.keyCode === 37 || event.which === 37) { // LEFT ARROW key
            if (playerPosition.y >= 1){
                playerPosition.y -= 1;
                drawImgs();
                checkLocation();
            };
            // console.log('LEFT' + playerX);
        } else if (event.keyCode === 38 || event.which === 38) { // UP ARROW key
            if (playerPosition.x >= 1){
                playerPosition.x -= 1;
                drawImgs();
                checkLocation();
            };
            // console.log('UP' +playerY);
        } else if (event.keyCode === 39 || event.which === 39) { // RIGHT ARROW key
            if (playerPosition.y < 44){
                playerPosition.y += 1;
                drawImgs();
                checkLocation();
            };
            // console.log('RIGHT' +playerX);
        } else if (event.keyCode === 40 || event.which === 40) { // DOWN ARROW key
            if (playerPosition.x <= 44){
                playerPosition.x += 1;
                drawImgs();
                checkLocation();
            };
            // console.log('DOWN' + playerY);
        };
    };

    const drawImgs = function() {
        player.style.setProperty('--playerX', playerPosition.x);
        player.style.setProperty('--playerY', playerPosition.y);
    };

    const drawPrice = function() {
        pricePosition.x = (Math.floor(Math.random() * 15) + 1) + 3; 
        pricePosition.y = (Math.floor(Math.random() * 15) + 1) + 3;
        price.style.setProperty('--priceY', pricePosition.x);
        price.style.setProperty('--priceX', pricePosition.y);
    }

    const checkLocation = function() {
        if (playerPosition.y === pricePosition.x && playerPosition.x === pricePosition.y) {
            score++;
            document.getElementById('score').innerHTML = 'Score: ' + score;
            if(score === 4) {
                youWin();
            }
            console.log(score);
            drawPrice();
        }
    };

    let youWin = function() {
        
        alert('You Win!');
        score = 0;
        document.getElementById('score').innerHTML = '';
        playerPosition.x = 2;
        playerPosition.y = 2;
        drawImgs();
        drawPrice();

    };

    return {
        init: function() {
            drawImgs();
            drawPrice();

            // img.onload = animate;
            console.log('Application has started');
            setupEventListener();
        }
    }

})(gameController, UIController);

controller.init();
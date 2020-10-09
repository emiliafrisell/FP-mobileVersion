
let controller = (function() {

	// get player and playArea
    let playArea = document.querySelector('.playArea');
    let player = document.querySelector('.run');

    let rightInterval, downInterval, leftInterval, upInterval;
    let rightCycle, downCycle, leftCycle, upCycle;

    let swipeDirection;

    let distance = 1;
    let speed = 400;

    // create fruits html
    let apple =  '<img class="apple" id="%id%" src="../images/apple.jpg" style="--priceY: %Y%; --priceX:%X%;" />';
    let pineapple =  '<img class="pineapple"  id="%id%" src="../images/pineapple.jpg" style="--priceY: %Y%; --priceX:%X%;" />';
    let grapes = '<img class="grapes"  id="%id%" src="../images/grapes.jpg" style="--priceY: %Y%; --priceX:%X%;" />';
    let orange = '<img class="orange"  id="%id%" src="../images/orange.jpg" style="--priceY: %Y%; --priceX:%X%;" />';
    let pear =  '<img class="pear" id="%id%" src="../images/pear.jpg" style="--priceY: %Y%; --priceX:%X%;" />';

    // make array with the different fruits
    let fruitArray = [apple, pineapple, grapes, orange, pear];

    // select random fruit from the array
    let price = fruitArray[Math.floor(Math.random() * 5)];

    // set initial values
    let currentID = 0;
    let highScore = 0;
    
    let pricePosition = {x: 0, y: 0};

    // create function constructors
    let PlayerPosition = function(x, y) {
        this.x = x;
        this.y = y;
    };

    let PoopPosition = function(x, y) {
        this.x = x;
        this.y = y;
    };

    let FruitPosition = function(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
    };
    
    // startGame function
    let startGame = function() {
        
        console.log('New Game Started');

        // hide start and gameOver screen
        document.querySelector('#start_game').classList.add('hide');
        document.querySelector('#instructions').classList.add('hide');
        document.querySelector('#game_over').classList.add('hide');
        document.querySelector('#poopGIF').classList.add('hide');
        document.querySelector('#try_again').classList.add('hide');

        // display player and turn left
        player.classList.remove('hide');
        player.style = 'transform: scaleX(1);';

        // reset arrays
        steps = [];
        poop = [];
        fruits = [];

        // reset scores and ids
        ID = 0;
        currentID = 0;
        poopID = 0;
        fruitID = 0;
        score = 0;

        gameInterval = setInterval(drawImgs, 20);

        rightCycle = false;
        downCycle = false;
        leftCycle = false;
        upCycle = false;

        // player always starts in the same position
        steps[currentID] = new PlayerPosition(2, 19);
        player.style.setProperty('--playerY', steps[0].y);
        player.style.setProperty('--playerX', steps[0].x);

        // add 5 fruits at random locations
        drawPrice();

        // reset displayed score
        document.getElementById('score').innerHTML = 'Score: ';
    };

    // set up all eventListeners
    let setupEventListener = function() { 
        
        // If start game button is pressed, start new game
        document.querySelector('#start_game').addEventListener('click', startGame);
        
        // If try again button is pressed, start new game
        document.querySelector('#try_again').addEventListener('click', startGame);

        // If any button is pressed on keyboard
        document.addEventListener('keydown', btnPress);   
        
        document.addEventListener('swiped', function(e) {
            if (e.target.classList.contains('playArea')) {
                swipeDirection = e.detail.dir;
                swipe(swipeDirection);
            }
            // console.log(e.target); // the element that was swiped
            console.log(e.detail.dir); // swiped direction
        });
        
    };

    // different functions depending on what key is pressed on keyboard
    let btnPress = function(event) {
        // ENTER key
        if (event.keyCode === 13 || event.which === 13) { 
            // start screen
            if (document.querySelector('#start_game').classList.contains('hide') != true) {
                startGame();
            };
            // game over screen
            if (document.querySelector('#try_again').classList.contains('hide') != true) {
                startGame();
            };

         } else if (event.keyCode === 37 || event.which === 37) { // LEFT ARROW key
            clearInterval(rightInterval); //Clear all other intervals but the left
            clearInterval(downInterval);
            clearInterval(upInterval);
            leftCycle = true;
            rightCycle = false;
            downCycle = false;
            upCycle = false;
            leftInterval = setInterval(moveLeft, speed);

    } else if (event.keyCode === 38 || event.which === 38) { // UP ARROW key
            clearInterval(rightInterval); //Clear all other intervals but the up
            clearInterval(downInterval);
            clearInterval(leftInterval);
            upCycle = true;
            rightCycle = false;
            downCycle = false;
            leftCycle = false;
            upInterval = setInterval(moveUp, speed);

    } else if (event.keyCode === 39 || event.which === 39) { // RIGHT ARROW key
            clearInterval(downInterval); //Clear all other intervals but the right
            clearInterval(leftInterval);
            clearInterval(upInterval);
            rightCycle = true;
            downCycle = false;
            leftCycle = false;
            upCycle = false;
            rightInterval = setInterval(moveRight, speed);

    } else if (event.keyCode === 40 || event.which === 40) { // DOWN ARROW key
            clearInterval(rightInterval); //Clear all other intervals but the down
            clearInterval(leftInterval);
            clearInterval(upInterval);
            downCycle = true;
            rightCycle = false;
            leftCycle = false;
            upCycle = false;
            downInterval = setInterval(moveDown, speed);
    };
};

// different functions depending on what key is pressed on keyboard
let swipe = function(direction) {
    if (direction == 'left') { // LEFT ARROW key
        clearInterval(rightInterval); //Clear all other intervals but the left
        clearInterval(downInterval);
        clearInterval(upInterval);
        leftCycle = true;
        rightCycle = false;
        downCycle = false;
        upCycle = false;
        leftInterval = setInterval(moveLeft, speed);

} else if (direction == 'up') { // UP ARROW key
        clearInterval(rightInterval); //Clear all other intervals but the up
        clearInterval(downInterval);
        clearInterval(leftInterval);
        upCycle = true;
        rightCycle = false;
        downCycle = false;
        leftCycle = false;
        upInterval = setInterval(moveUp, speed);

} else if (direction == 'right') { // RIGHT ARROW key
        clearInterval(downInterval); //Clear all other intervals but the right
        clearInterval(leftInterval);
        clearInterval(upInterval);
        rightCycle = true;
        downCycle = false;
        leftCycle = false;
        upCycle = false;
        rightInterval = setInterval(moveRight, speed);

} else if (direction == 'down') { // DOWN ARROW key
        clearInterval(rightInterval); //Clear all other intervals but the down
        clearInterval(leftInterval);
        clearInterval(upInterval);
        downCycle = true;
        rightCycle = false;
        leftCycle = false;
        upCycle = false;
        downInterval = setInterval(moveDown, speed);
};
};
    const moveLeft = function() {
        if (steps[currentID].y > 1) {
        newPosition(steps[currentID].x, steps[currentID].y)
        // playerPath.push(new Path(imgX, imgY));
        steps[currentID].y -= distance;
        checkLocation();
        }

        // if (playerPath.length > 3){
        //     playerPath.shift(); // Remove the first item in path-array
        //   }
    };

    const moveUp = function() {
        if (steps[currentID].x > 1) {
            newPosition(steps[currentID].x, steps[currentID].y)
        // playerPath.push(new Path(imgX, imgY))
        steps[currentID].x -= distance;
        checkLocation();
        };
        // if (playerPath.length > 3){
        //     playerPath.shift(); // Remove the first item in path-array
        //   }
    }

    const moveRight = function() {
        if (steps[currentID].y < 20) {
            newPosition(steps[currentID].x, steps[currentID].y)
        // playerPath.push(new Path(imgX, imgY))
        steps[currentID].y += distance;
        checkLocation();
        };
        // if (playerPath.length > 3){
        //     playerPath.shift(); // Remove the first item in path-array
        //   }
    }

    const moveDown = function() {
        if (steps[currentID].x < 20) {
            newPosition(steps[currentID].x, steps[currentID].y)
        // playerPath.push(new Path(imgX, imgY))
        steps[currentID].x += distance;
        checkLocation();
        };
        // if (playerPath.length > 3){
        //     playerPath.shift(); // Remove the first item in path-array
        //   }
    }

    // register the players new postition
    let newPosition = function (x, y) {
        // add to array of steps
        currentID++;
        steps[currentID] = new PlayerPosition(x, y);
    };

    const drawImgs = function() {
        // display player at new position
        player.style.setProperty('--playerX', steps[currentID].x);
        player.style.setProperty('--playerY', steps[currentID].y);
    };

    const drawPrice = function() {
        // display fruit at new random location
        while (true) {
            // to make sure that the fruit isn't position on the player or a poop..
            let isSame = 0;

            pricePosition.x = (Math.floor(Math.random() * 20) + 1); 
            pricePosition.y = (Math.floor(Math.random() * 20) + 1);

            // Compare all the poops to the potential position
            poop.forEach(element => {
                if (element.x === pricePosition.x && element.y === pricePosition.y) {
                // .. add 1 every time the positions align
                isSame++;
                console.log('Poop avoided at x: ' + element.y + ', y: ' + element.x + ', new fruit position');
                }  
            });
            if (steps[currentID].x === pricePosition.y && steps[currentID].y === pricePosition.x) {
                console.log('Player avoided, new fruit position');
                isSame++;
            };

            // if the positions dont align, display a random fruit
            if (isSame < 1) { 
                html = fruitArray[Math.floor(Math.random() * 5)];
                
                let newHTML = html.replace('%id%', ID);
                newHTML = newHTML.replace('%Y%', pricePosition.y);
                newHTML = newHTML.replace('%X%', pricePosition.x);

                fruits[fruitID] = new FruitPosition(pricePosition.x, pricePosition.y, ID);
                
                document.querySelector('.playArea').insertAdjacentHTML('beforeend', newHTML);
                
                fruitID++;
                ID++;

                // the while loop only breaks when the positions don't align
                break;
            };  
        };
    };

    const checkLocation = function() {

        // If there are poops.. 
        if (poop.length > -1) {
            for (let i=0; i<poop.length; i++) {
                // ..comare their positions to the players' 
                if (steps[currentID].x === poop[i].x && steps[currentID].y === poop[i].y) {
                    // if they align, you loose
                    gameOver();
                };
            };
        };

        // If there are fruits... 
        if (fruits.length > -1) {
            // compare their positions to the players'
            for (let j=0; j<fruits.length; j++){
                // if the fruit has been eaten..
                if(fruits[j] === undefined) {
                    // ..do nothing
                    // since elements of the array are spliced it gives and error when comparing otherwise

                    // otherwise.. 
                } else if (steps[currentID].x === fruits[j].x && steps[currentID].y === fruits[j].y) {
                    // ..remove fruit from display
                    document.getElementById(fruits[j].id).remove();

                    // ..remove from array so positions dont align anyway
                    fruits.splice(j, 1)
                    
                    // add score
                    score++;

                    // display score
                    document.getElementById('score').innerHTML = 'Score: ' + score;

                    // add poop and display new price
                    addPoop(steps[currentID -1].x, steps[currentID -1].y);
                    drawPrice();
                };
            };
        };
    };
    
    // add step to steps array
    let addPoop = function(x, y) { 
        ID ++;
        
        // poop html
        let html = '<img src="../images/poop.jpg" class="poop" style="--poopY: %Y%; --poopX: %X%;" />';

        // insert position
        let newHTML = html.replace('%Y%', y);
        newHTML = newHTML.replace('%X%', x);

        // add to poop array to compare to player position
        poop[poopID] = new PoopPosition(x, y);
        poopID++;

        // add to playArea
        playArea.insertAdjacentHTML('beforeend', newHTML);
    };
    

    let gameOver = function() { // if you step in poop
        clearInterval(gameInterval); //Stop drawing

        console.log('Game Over - Score: ' + score);

        // display gameOver screen
        document.querySelector('#game_over').classList.remove('hide');
        document.querySelector('#poopGIF').classList.remove('hide');
        document.querySelector('#try_again').classList.remove('hide');

        // set new highScore
        if (score > highScore) {
            highScore = score;
            console.log('New HighScore!');
            document.getElementById('highScore').innerHTML = 'Highscore: ' + score;
        };

        // hide player
        player.classList.add('hide');

        // remove poops and fruits
        document.querySelectorAll('.poop').forEach(element => {
            element.remove();
        });

        document.querySelectorAll('.apple').forEach(element => {
            element.remove();
        });

        document.querySelectorAll('.pineapple').forEach(element => {
            element.remove();
        });

        document.querySelectorAll('.grapes').forEach(element => {
            element.remove();
        });

        document.querySelectorAll('.orange').forEach(element => {
            element.remove();
        });

        document.querySelectorAll('.pear').forEach(element => {
            element.remove();
        });

    };

    return {
        // initiating application
        init: function() {
            console.log('Application has started');
            setupEventListener();
        }
    }

    
})();

controller.init();

// ---------------------- BORROWED CODE TO READ SCREEN SWIPES --------------------------

/*!
 * swiped-events.js - v@version@
 * Pure JavaScript swipe events
 * https://github.com/john-doherty/swiped-events
 * @inspiration https://stackoverflow.com/questions/16348031/disable-scrolling-when-touch-moving-certain-element
 * @author John Doherty <www.johndoherty.info>
 * @license MIT
 */
(function (window, document) {

    'use strict';

    // patch CustomEvent to allow constructor creation (IE/Chrome)
    if (typeof window.CustomEvent !== 'function') {

        window.CustomEvent = function (event, params) {

            params = params || { bubbles: false, cancelable: false, detail: undefined };

            var evt = document.createEvent('CustomEvent');
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
        };

        window.CustomEvent.prototype = window.Event.prototype;
    }

    document.addEventListener('touchstart', handleTouchStart, false);
    document.addEventListener('touchmove', handleTouchMove, false);
    document.addEventListener('touchend', handleTouchEnd, false);

    var xDown = null;
    var yDown = null;
    var xDiff = null;
    var yDiff = null;
    var timeDown = null;
    var startEl = null;

    /**
     * Fires swiped event if swipe detected on touchend
     * @param {object} e - browser event object
     * @returns {void}
     */
    function handleTouchEnd(e) {

        // if the user released on a different target, cancel!
        if (startEl !== e.target) return;

        var swipeThreshold = parseInt(getNearestAttribute(startEl, 'data-swipe-threshold', '20'), 10); // default 20px
        var swipeTimeout = parseInt(getNearestAttribute(startEl, 'data-swipe-timeout', '500'), 10);    // default 500ms
        var timeDiff = Date.now() - timeDown;
        var eventType = '';
        var changedTouches = e.changedTouches || e.touches || [];

        if (Math.abs(xDiff) > Math.abs(yDiff)) { // most significant
            if (Math.abs(xDiff) > swipeThreshold && timeDiff < swipeTimeout) {
                if (xDiff > 0) {
                    eventType = 'swiped-left';
                }
                else {
                    eventType = 'swiped-right';
                }
            }
        }
        else if (Math.abs(yDiff) > swipeThreshold && timeDiff < swipeTimeout) {
            if (yDiff > 0) {
                eventType = 'swiped-up';
            }
            else {
                eventType = 'swiped-down';
            }
        }

        if (eventType !== '') {

            var eventData = {
                dir: eventType.replace(/swiped-/, ''),
                xStart: parseInt(xDown, 10),
                xEnd: parseInt((changedTouches[0] || {}).clientX || -1, 10),
                yStart: parseInt(yDown, 10),
                yEnd: parseInt((changedTouches[0] || {}).clientY || -1, 10)
            };

            // fire `swiped` event event on the element that started the swipe
            startEl.dispatchEvent(new CustomEvent('swiped', { bubbles: true, cancelable: true, detail: eventData }));

            // fire `swiped-dir` event on the element that started the swipe
            startEl.dispatchEvent(new CustomEvent(eventType, { bubbles: true, cancelable: true, detail: eventData }));
        }

        // reset values
        xDown = null;
        yDown = null;
        timeDown = null;
    }

    /**
     * Records current location on touchstart event
     * @param {object} e - browser event object
     * @returns {void}
     */
    function handleTouchStart(e) {

        // if the element has data-swipe-ignore="true" we stop listening for swipe events
        if (e.target.getAttribute('data-swipe-ignore') === 'true') return;

        startEl = e.target;

        timeDown = Date.now();
        xDown = e.touches[0].clientX;
        yDown = e.touches[0].clientY;
        xDiff = 0;
        yDiff = 0;
    }

    /**
     * Records location diff in px on touchmove event
     * @param {object} e - browser event object
     * @returns {void}
     */
    function handleTouchMove(e) {

        if (!xDown || !yDown) return;

        var xUp = e.touches[0].clientX;
        var yUp = e.touches[0].clientY;

        xDiff = xDown - xUp;
        yDiff = yDown - yUp;
    }

    /**
     * Gets attribute off HTML element or nearest parent
     * @param {object} el - HTML element to retrieve attribute from
     * @param {string} attributeName - name of the attribute
     * @param {any} defaultValue - default value to return if no match found
     * @returns {any} attribute value or defaultValue
     */
    function getNearestAttribute(el, attributeName, defaultValue) {

        // walk up the dom tree looking for data-action and data-trigger
        while (el && el !== document.documentElement) {

            var attributeValue = el.getAttribute(attributeName);

            if (attributeValue) {
                return attributeValue;
            }

            el = el.parentNode;
        }

        return defaultValue;
    }

}(window, document));

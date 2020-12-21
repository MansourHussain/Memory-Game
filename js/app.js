/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}




/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function startGame() {
    seconds = 0;
    minutes = 0;
    starsNumber = 3;
    movesNumber = 0;
    closeCards();
    closeBox();
    timer();
    moves();
    removeStars();
    shuffleDeckCards();
}


 let deckCards = document.querySelectorAll('.card');
 let openedCards = [];
 let iconsClassNames = [];
 let movesNumber = 0;
 let seconds = 0;
 let minutes = 0;
 let starsNumber = null;
 let handler;
 
 //reference for restart icon
 let replay = document.querySelector('.restart')
 replay.addEventListener('click', startGame);

//reference for MessageBox buttons
 let playAgain = document.querySelector('.play-again');
 playAgain.addEventListener('click', startGame);
 let close = document.querySelector('.close');
 close.addEventListener('click', closeBox);
       
 function closeBox(){
    document.querySelector('.play-again-box').close();
 }

 //close all cards before start game
 function closeCards() {
    deckCards.forEach(function(card) {
        card.classList.remove('open');
        card.classList.remove('show');
        card.classList.remove('match');
    });
 }

 function timer() {
    if (!handler){
    handler = setInterval(function(){
        seconds = seconds + 1;
        if (seconds > 59) {
            seconds = 0;
            minutes = minutes + 1;
        }

        document.querySelector('.timer').innerText =`${minutes}:${seconds}`;
    },1000);
}}

function stopTimer(){
    clearInterval(handler);
    handler = null;
}

function removeStars() {
     starsNumber = 3; 
}

function moves() {
    let move = document.querySelector('.moves');
    move.innerText = movesNumber;
}

//showModal function from https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal
 let popUp = document.querySelector(".play-again-box");

 function message() {
    popUp.showModal();

    let starsCount = document.querySelector('.stars-count').innerText = 'Your have get '+ starsNumber+' stars';
    let movesCount = document.querySelector('.moves-count').innerText = 'Your Moves is: ' + movesNumber;
    let timeSpent = document.querySelector('time-spent').innerText = minutes +' '+ seconds;
}

 deckCards.forEach(card => {
    card.classList.remove('open');
    card.classList.remove('show');
    card.classList.remove('match');
    let childClass = card.children[0];
    iconsClassNames.push(childClass.className);
     });
     
 function shuffleDeckCards() {
    iconsClassNames = shuffle(iconsClassNames);
    let i = 0
    deckCards.forEach(card => {
    let cardChild = card.children[0];
    cardChild.className = iconsClassNames[i];
    i++;
    });
 }
     
     
deckCards.forEach(function(card) {
    shuffleDeckCards();
    card.addEventListener('click', function(e) {
        timer();
        moves();
        card.classList.add('open', 'show');
        card.className
        openedCards.push(card);
        
        setTimeout(matching, 300);
        function matching() {
            if (openedCards.length==2) {
                let firstCard = openedCards[0];
                let secondCard = openedCards[1];

                let childOne = firstCard.children[0].className;
                let childTwo = secondCard.children[0].className;

                if (childOne == childTwo) {
                    firstCard.classList.add('match');
                    secondCard.classList.add('match');

                    openedCards = [];
                }

                else {
                    firstCard.classList.remove('open', 'show');
                    secondCard.classList.remove('open', 'show');

                    openedCards = [];
                }
                
                movesNumber = movesNumber + 1;
                moves();

                if (movesNumber < 8) {
                    starsNumber = 3;
                }
                else if (movesNumber < 16) {
                    starsNumber = 2;
                }
                else if (movesNumber < 32) {
                    starsNumber = 1;
                }

                let ratesStars = document.querySelector('.stars');
                ratesStars.innerHTML = "";

                for (i =0; i<=starsNumber; i = i + 1) {
                    let star = document.innerHTML = "<li><i class='fa fa-star'></i></li>";
                    ratesStars.innerHTML += star;
                }
            }     

            let remainCards = document.querySelectorAll('.card:not(.match)');
                if (remainCards.length==0) {
                    stopTimer();
                    message();
                } 
        }
    });
});
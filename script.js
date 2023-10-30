document.addEventListener('DOMContentLoaded', function() {
  const startButton = document.querySelector('.start_btn');
  const squares = document.querySelectorAll('.square');

  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  function drawRandomCard() {
    const randomSuitIndex = Math.floor(Math.random() * suits.length);
    const randomSuit = suits[randomSuitIndex];
    const randomRankIndex = Math.floor(Math.random() * ranks.length);
    const randomRank = ranks[randomRankIndex];

    const cardSound = new Audio('assets/draw.mp3'); // Create a new Audio element for each card
    cardSound.play(); // Play the card sound

    return {
      suit: randomSuit,
      rank: randomRank,
      sound: cardSound
    };
  }

  function displayCardInSquare(square, card) {
    const suitImage = document.createElement('img');
    suitImage.src = `${card.suit}.png`;
    suitImage.alt = card.suit;
    suitImage.classList.add('card-image'); // Add the CSS class for sizing

    const numberElement = document.createElement('span');
    numberElement.classList.add('number');
    numberElement.textContent = card.rank; // Add the rank as the number

    if (card.suit === 'hearts' || card.suit === 'diamonds') {
      numberElement.classList.add('red'); // Add the 'red' class for hearts and diamonds
    }

    square.innerHTML = ''; // Clear previous content
    square.appendChild(numberElement);
    square.appendChild(suitImage);

    card.sound.play();

    console.log(card.rank); // Print the number to the console log

    // Check if all squares have cards
    const allSquaresFilled = Array.from(squares).every(square => square.querySelector('.number'));

    if (allSquaresFilled) {
      startButton.textContent = 'Try Again?';
      startButton.classList.add('try-again');
      startButton.disabled = false;
    }
  }

  function displayBlankSquare(square) {
    square.innerHTML = ''; // Clear previous content
  }

  function displayCards() {
    startButton.classList.add('clicked');
    startButton.classList.add('disabled');
    startButton.disabled = true;
    startButton.textContent = 'Start';

    squares.forEach(function(square, index) {
      setTimeout(function() {
        const card = drawRandomCard();
        displayCardInSquare(square, card);

        if (index === squares.length - 1) {
          startButton.classList.remove('disabled');
          startButton.disabled = false;
        }
      }, 500 * index); // Delay each card by 0.5 seconds
    });
  }

  function clearSquares() {
    squares.forEach(function(square) {
      displayBlankSquare(square);
    });
    startButton.textContent = 'Start';
  }

  startButton.addEventListener('click', function() {
    if (startButton.classList.contains('clicked')) {
      startButton.classList.remove('clicked');
      startButton.classList.remove('try-again');
      clearSquares();
    } else {
      displayCards();
    }
  });
});
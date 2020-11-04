/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();
// renderDeckInContainer(masterDeck, document.getElementById('master-deck-container'));

/*----- app's state (variables) -----*/
let shuffledDeck = renderShuffledDeck();
let playerHand = [];
let dealerHand = [];
/*----- cached element references -----*/
const playerContainer = document.getElementById('shuffled-deck-container');
const dealerContainer = document.getElementById('master-deck-container');
// const dealerContainer = document.getElementById('dealer-deck-container');
/*----- event listeners -----*/
// document.querySelector('button').addEventListener('click', renderShuffledDeck);
// document.querySelector('button').addEventListener('click', deal);
/*----- functions -----*/


function renderShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  const tempDeck = [...masterDeck];
  let shuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }

  return shuffledDeck;
}

function getValue(hand)
{
  let hold = 0;

  for(i = 0; i < hand.length; i++)
  {
    hold += hand[i].value;
  }

  return hold;
}

function deal()
{
  while(dealerHand.pop());
  while(playerHand.pop());
  renderDealerHand(shuffledDeck, dealerContainer);
  renderPlayerHand(shuffledDeck, playerContainer);

  console.log(getValue(dealerHand));
  console.log(getValue(playerHand));
}

function newPlayerCard(deck, container){
  let cardB = deck.pop()
  const cardsHtml = `<div class="card ${cardB.face}"></div>`;
  container.innerHTML += cardsHtml;

  playerHand.push(cardB);
}



function hit(){
  newPlayerCard(shuffledDeck, playerContainer);
  console.log(getValue(playerHand));

}

function stand(){
  console.log(value.dealer);
  console.log(value.player);
}

function renderDeckInContainer(deck, container) {
  container.innerHTML = '';
  // Let's build the cards as a string of HTML
  // Use reduce when you want to 'reduce' the array into a single thing - in this case a string of HTML markup 
  const cardsHtml = deck.reduce(function(html, card) {
    return html + `<div class="card ${card.face}"></div>`;
  }, '');
  container.innerHTML = cardsHtml;
}


function renderDealerHand(deck, container) {
  container.innerHTML = '';
  // Let's build the cards as a string of HTML
  // Use reduce when you want to 'reduce' the array into a single thing - in this case a string of HTML markup 
  let card = deck.pop();
  dealerHand.push(card);
  const cardsHtml = `<div class="card ${card.face}"></div>`
                  + `<div class="card back-red"></div>`;
  // (function(html, card) {
  //   return html + `<div class="card ${card.face}"></div>`;
  // }, '');
  container.innerHTML = cardsHtml;
}


function renderPlayerHand(deck, container) {
  container.innerHTML = '';
  // Let's build the cards as a string of HTML
  // Use reduce when you want to 'reduce' the array into a single thing - in this case a string of HTML markup 
  let cardA = deck.pop();
  let cardB = deck.pop();

  playerHand.push(cardA);
  playerHand.push(cardB);

  const cardsHtml = `<div class="card ${cardA.face}"></div>`
                  + `<div class="card ${cardB.face}"></div>`;
  // (function(html, card) {
  //   return html + `<div class="card ${card.face}"></div>`;
  // }, '');
  container.innerHTML = cardsHtml;
}

function buildMasterDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || (rank === 'A' ? 11 : 10)
      });
    });
  });
  return deck;
}


// renderShuffledDeck();

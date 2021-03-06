/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();


/*----- app's state (variables) -----*/
let shuffledDeck = renderShuffledDeck();
let playerHand = [];
let dealerHand = [];
/*----- cached element references -----*/
const playerContainer = document.getElementById('shuffled-deck-container');
const dealerContainer = document.getElementById('master-deck-container');
/*----- functions -----*/

// original shuffled deck
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
// here I need to get the values of the cards and wether 21 is 1 or 11
function getValue(hand)
{
  let hold = 0;
  let check = 0;

  for(i = 0; i < hand.length; i++)
  {
    hold += hand[i].value;
    
    if(hand[i].value === 11)
      check++;
    
    if(hold > 21 && check){
      hold -= 10;
      check--;
    }
  }
    return hold;
}
// here is the deal function that push the cards up to there deck container
function deal()
{
  while(dealerHand.pop());
  while(playerHand.pop());

  shuffledDeck = renderShuffledDeck();

  renderDealerHand(shuffledDeck, dealerContainer);
  renderPlayerHand(shuffledDeck, playerContainer);

  document.getElementById("Hit").disabled = false;
  document.getElementById("Stand").disabled = false;

  document.getElementById("results").innerText = ("Player: " + getValue(playerHand) + "     Dealer: " + getValue(dealerHand));
}
// this feature adds a new card to the player 
function newPlayerCard(deck, container){
  let cardB = deck.pop();
  const cardsHtml = `<div class="card ${cardB.face}"></div>`
  container.innerHTML += cardsHtml;

  playerHand.push(cardB);
}
// this adds to the dealer hand and has the most of win loss logic of the game
function newDealerCard(deck, container)
{
  let card = deck.pop();

  dealerHand.push(card);

  const cardsHtml = `<div class="card ${dealerHand[0].face}"></div>`
                  + `<div class="card ${card.face}"></div>`;
  
  container.innerHTML = cardsHtml;
// here we compare our player hand to our dealer hand and add a message if win , tie or dealer won
  while( (getValue(dealerHand) < getValue(playerHand)) && (getValue(dealerHand) < 21) )
  {
    let cardTemp = deck.pop();
    
    container.innerHTML += `<div class="card ${cardTemp.face}"></div>`;
    dealerHand.push(cardTemp);
  }

  if(getValue(dealerHand) > 21)
  {
    document.getElementById("results").innerText = ("Dealer: " + getValue(dealerHand) + " Dealer Busts, You Win!");
    document.getElementById("Hit").disabled = true;
    document.getElementById("Stand").disabled = true;
  }
  else if(getValue(dealerHand) > getValue(playerHand))
  {
    document.getElementById("results").innerText = ("Player: " + getValue(playerHand) + "     Dealer: " + getValue(dealerHand) + " Dealer won, Play again");
    document.getElementById("Hit").disabled = true;
    document.getElementById("Stand").disabled = true;
  }
  else if(getValue(dealerHand) === getValue(playerHand))
  {
    document.getElementById("results").innerText = ("Player: " + getValue(playerHand) + "     Dealer: " + getValue(dealerHand) + " Push!");
    document.getElementById("Hit").disabled = true;
    document.getElementById("Stand").disabled = true;
  }
  else
  {
  document.getElementById("results").innerText = ("Player: " + getValue(playerHand) + "     Dealer: " + getValue(dealerHand) + " You Win!");
    document.getElementById("Hit").disabled = true;
    document.getElementById("Stand").disabled = true;
  }
}
// here we have our hit function that place another card om the player deck using newPayerCard funtion and has loss message if we exceed
function hit(){
  newPlayerCard(shuffledDeck, playerContainer);
  if(getValue(playerHand) <= 21 )
    document.getElementById("results").innerText = ("Player: " + getValue(playerHand) + "     Dealer: " + getValue(dealerHand));
  else
  {
    document.getElementById("results").innerText = ("Player: " + getValue(playerHand) + "     Player bust play again");
    document.getElementById("Hit").disabled = true;
    document.getElementById("Stand").disabled = true;
  }
}
// our stand function pushes a card on to the dealer hand 
function stand()
{
  newDealerCard(shuffledDeck, dealerContainer);
}

// initial dealer hand
function renderDealerHand(deck, container) {
  container.innerHTML = '';
  let card;
  if(deck.length)
    card = deck.pop();
  dealerHand.push(card);
  const cardsHtml = `<div class="card ${card.face}"></div>`
                  + `<div class="card back-red"></div>`;

  container.innerHTML = cardsHtml;
}

// initial player hand
function renderPlayerHand(deck, container) {
  container.innerHTML = '';
  let cardA = deck.pop();
  let cardB = deck.pop();

  playerHand.push(cardA);
  playerHand.push(cardB);

  const cardsHtml = `<div class="card ${cardA.face}"></div>`
                  + `<div class="card ${cardB.face}"></div>`;

  container.innerHTML = cardsHtml;
}
// master deck
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


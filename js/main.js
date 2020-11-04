/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];

// Build a 'master' deck of 'card' objects used to create shuffled decks
const masterDeck = buildMasterDeck();
// renderDeckInContainer(masterDeck, document.getElementById('master-deck-container'));

/*----- app's state (variables) -----*/
let shuffledDeck;
let playerValue = 0;
let computerValue = 0;

/*----- cached element references -----*/
const shuffledContainer = document.getElementById('shuffled-deck-container');
const masterContainer = document.getElementById('master-deck-container');
// const dealerContainer = document.getElementById('dealer-deck-container');
/*----- event listeners -----*/
document.querySelector('button').addEventListener('click', renderShuffledDeck);
// document.querySelector('button').addEventListener('click', deal);
/*----- functions -----*/


function renderShuffledDeck() {
  // Create a copy of the masterDeck (leave masterDeck untouched!)
  const tempDeck = [...masterDeck];
  shuffledDeck = [];
  while (tempDeck.length) {
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    shuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  renderDealerHand(shuffledDeck, masterContainer);


  renderPlayerHand(shuffledDeck, shuffledContainer);

  // renderAddHand(shuffledDeck, dealerContainer);

  var btn = document.createElement('BUTTON');
    btn.innerHTML = "Hit";                   
    document.body.appendChild(btn);  

  var btn = document.createElement("BUTTON"); 
    btn.innerHTML = "Stand";                
    document.body.appendChild(btn);  


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
  const cardsHtml = `<div class="card ${deck.pop().face}"></div>`
                  + `<div class="card back-red"></div>`;
  // (function(html, card) {
  //   return html + `<div class="card ${card.face}"></div>`;
  // }, '');
  container.innerHTML = cardsHtml;
}

let players = new Array();
function createPlayer(num){
  player = new Array();
  for(let i = 1; i <= num; i++){
    let hand = new Array();
    let player = {Name: 'player ' + i, ID: i, Poimts: 0, Hand: hand};
    players.push(player);
  }
}

function createPlayerUI(){
  document.getElementById('players').innerHTML = '';
  for(var i = 0; i < players.length; i++)
  {
      var div_player = document.createElement('div');
      var div_playerid = document.createElement('div');
      var div_hand = document.createElement('div');
      var div_points = document.createElement('div');

      div_points.className = 'points';
      div_points.id = 'points_' + i;
      div_player.id = 'player_' + i;
      div_player.className = 'player';
      div_hand.id = 'hand_' + i;

      div_playerid.innerHTML = players[i].ID;
      div_player.appendChild(div_playerid);
      div_player.appendChild(div_hand);
      div_player.appendChild(div_points);
      document.getElementById('players').appendChild(div_player);
  }
}


function renderPlayerHand(deck, container) {
  container.innerHTML = '';
  // Let's build the cards as a string of HTML
  // Use reduce when you want to 'reduce' the array into a single thing - in this case a string of HTML markup 
  const cardsHtml = `<div class="card ${deck.pop().face}"></div>`
                  + `<div class="card ${deck.pop().face}"></div>`;
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

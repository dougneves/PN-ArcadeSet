$(() => {
  setInterval(() => {
    //desenha tela
    $('#timer').empty();
    $('#timer').append(TIMER);
  },1000);

  setInterval(() => {
    TIMER--;
    if(TIMER<0) {
      console.log('Perdeu!');
      alert('perdeu!');
      TIMER=523987;
    }
  },1000);

  const pickCards = () => {
    PLAYER_CARDS = [];
    MODEL_CARDS = [];
    for (let i=0; i < AMOUNT_OF_PLAYER_CARDS; i++){
      PLAYER_CARDS.push({
        id:i,
        number:pickNumber(),
        color:pickColor(),
        shape:pickShape(),
        clicks:0
      })
    }

    for (let i=0; i < AMOUNT_OF_MODEL_CARDS; i++){
      MODEL_CARDS.push({
        id:i,
        number:pickNumber(),
        color:pickColor(),
        shape:pickShape(),
        clicks:'-'
      })
    }
  }

  const startTurn = () => {

    $('.modelBoard').empty();
    $('.playerBoard').empty();

    MODEL_CARDS.forEach((card,index) => {
      $('.modelBoard').append('<div class="modelCard card w3-card-4 w3-margin w3-col s1 m1 l1 w3-'+card.color+'" id="model_card_'+card.id+'">'+drawCard(card)+'</div>');
    });
    PLAYER_CARDS.forEach((card,index) => {
      $('.playerBoard').append('<div class="playerCard card w3-card-4 w3-margin w3-col s1 m1 l1 w3-'+card.color+'" id="player_card_'+card.id+'"  onclick="playerCardClick('+card.id+')">'+drawCard(card)+'</div>');
    });

    TIMER=TIMERMAX;
    TIMERMAX+=2;
  }

  const pickNumber = () => {
    return randomNumber(1,9);
  }

  const pickColor = () => {
    const pick = randomNumber(0,3);
    if(pick===0) return 'blue';
    if(pick===1) return 'green';
    if(pick===2) return 'red';
    if(pick===3) return 'yellow';
    return '';
  }

  const pickShape = () => {
    const pick = randomNumber(0,3);
    if(pick===0) return 'square';
    if(pick===1) return 'circle';
    if(pick===2) return 'triangle';
    if(pick===3) return 'star';
    return '';
  }

  const randomNumber = (min,max) => {
    if(min==max) return min;
    if(min>max) {
      const s = min;
      min = max;
      max = s;
    }
    return Math.floor((Math.random() * (max-min)) + min);
  }

  $('#button_done').click(() => {
    //conta os acertos
    let errorHits = 0;
    MODEL_CARDS.forEach((modelCard) => {
      PLAYER_CARDS.forEach((playerCard) => {
        /* TODO: Erro aqui, ele olha um modelcard de cada vez */

        let hits = 0;
        if(modelCard.color === playerCard.color) hits++;
        if(modelCard.shape === playerCard.shape) hits++;
        if(modelCard.number === playerCard.number) hits++;
        if(playerCard.clicks !== hits) errorHits++;
      })
    })

    if(errorHits === 0) {
      alert("acertou!");
      if(AMOUNT_OF_PLAYER_CARDS/4 > AMOUNT_OF_MODEL_CARDS) AMOUNT_OF_MODEL_CARDS++;
      else AMOUNT_OF_PLAYER_CARDS++;
      pickCards();
      startTurn();
    }
    else {
      alert("perdeu!");
    }

  });

  pickCards();
  startTurn();
});

let PLAYER_CARDS = [];
let MODEL_CARDS = [];
const AMOUNT_OF_FEATURES = 3;
let AMOUNT_OF_PLAYER_CARDS = 1;
let AMOUNT_OF_MODEL_CARDS = 1;
let TIMERMAX = 10;
let TIMER = 10;

const playerCardClick = (id) => {
  PLAYER_CARDS[id].clicks++;
  if(PLAYER_CARDS[id].clicks > AMOUNT_OF_FEATURES) PLAYER_CARDS[id].clicks = 0;
  $('#player_card_'+id).empty();
  $('#player_card_'+id).append(drawCard(PLAYER_CARDS[id]));
}

const drawCard = (card) => {
  let ret = '<p class="w3-center w3-xlarge">'+card.number+'</p><p class="w3-center">'+card.shape+'</p><p class="w3-right">';
  for(let i=0;i<card.clicks;i++) {
    ret+='<span class="w3-badge">+</span>';
  }
  ret += '</p>';
  return ret;
}

let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

let isAutoPlaying = false;
let intervalId;

document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => {
    if(!isAutoPlaying){
      intervalId = setInterval(() => {
        const playerMove = pickComputerMove();
        playGame(playerMove);
      }, 1000);
      isAutoPlaying = true;
      document.querySelector('.js-auto-play-button').textContent = 'Stop Auto Play'
    } else {
      clearInterval(intervalId);
      document.querySelector('.js-auto-play-button').textContent = 'Auto Play'
      isAutoPlaying = false;
    };
  });



document.querySelector('.js-reset-score-button')
  .addEventListener('click', ()=>{
    score.wins = 0;
    score.losses =0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
  });

document.querySelector('.js-rock-button')
  .addEventListener('click', ()=> playGame('Rock'));

document.querySelector('.js-paper-button')
  .addEventListener('click', ()=> playGame('Paper'));

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => playGame('Scissors'));

function playGame(playerMove){
  const computerMove = pickComputerMove();

  let result = '';
  if (playerMove === 'Scissors'){
    if (computerMove === 'Rock'){
      result = 'You lose.';
    }else if (computerMove === 'Paper'){
      result = 'You win.';
    }else if (computerMove === 'Scissors'){
      result = 'Tie';
    };
  } else if(playerMove === 'Paper'){
    if (computerMove === 'Rock'){
      result = 'You win.';
    }else if (computerMove === 'Paper'){
      result = 'Tie.';
    }else if (computerMove === 'Scissors'){
      result = 'You lose.';
    };
  } else if (playerMove === 'Rock'){
    if (computerMove === 'Rock'){
      result = 'Tie.';
    }else if (computerMove === 'Paper'){
      result = 'You lose.';
    }else if (computerMove === 'Scissors'){
      result = 'You win.';
    };
  };

  if (result === 'You win.'){
    score.wins += 1;
  }else if (result === 'You lose.'){
    score.losses += 1;
  } else if (result === 'Tie.'){
    score.ties += 1;
  };

  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElement();

  document.querySelector('.js-result').innerHTML = result;
  document.querySelector('.js-moves').innerHTML = `You
  <img src="images/${playerMove}-emoji.png" class="move-icon"> : 
  <img src="images/${computerMove}-emoji.png" class="move-icon">
  Computer`;
}

function updateScoreElement(){
  document.querySelector('.js-score')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove(){
  const randomNumber = Math.random();

  let computerMove = ''; 

  if (randomNumber >= 0 && randomNumber < 1/3) {
    computerMove = 'Rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'Paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1) {
    computerMove = 'Scissors';
  }
  return computerMove;
};
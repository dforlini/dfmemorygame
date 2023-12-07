document.addEventListener('DOMContentLoaded', function(){
    let colors = [];
    let shuffledColors =[];
    let gameBoard = document.getElementById('game');
    let selectedCards = [];
    let canFlip = true;
    let score = 0;
    let highScore = localStorage.getItem('highScore') || Infinity;
    let numCards= getRandomNumber(8, 12);
    const scoreElement = document.getElementById('score');
    const startBtn= document.getElementById('startBtn');
    const restartBtn = document.getElementById('restartBtn');
  
    function startGame(){
  
      numCards= getRandomNumber(8, 12);
      colors= generateColors(numCards);
      shuffledColors = [...colors].sort(() => Math.random() - 0.5);
      canFlip = true;
      renderGameBoard();
      score = 0;
      updateScore();
      startBtn.disabled = true;
      restartBtn.disabled = false;
    }
    
    
  
    function restartGame(){
      selectedCards = [];
      canFlip = true;
      numCards = getRandomNumber(8, 12); 
      shuffledColors = [...colors].sort(() => Math.random() - 0.5);
      renderGameBoard();
      score = 0;
      updateScore();
    }
  
    function generateColors (numCards){
      return Array.from({length: numCards / 2}, () => getRandomColor()).flatMap(color => [color, color]);
      }
      
    
  function getRandomColor(){
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
  function getRandomNumber(min, max){
    return Math.floor(Math.random()* (max-min +1)+min);
  }
  function renderGameBoard(){
    gameBoard.innerHTML = '';
    shuffledColors.forEach(color =>{
      const card = document.createElement('div');
      card.className ='card';
      card.style.backgroundImage= `url('https://plus.unsplash.com/premium_photo-1701185652357-e9632c2b5969?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MDJ8fHxlbnwwfHx8fHw%3D   ')`;
      card.addEventListener('click', function(){
        flipCard(card, color);
    });
   
    gameBoard.appendChild(card);
  });
  
  }
  
  function flipCard(card, color){
    console.log('you just clicked me');
    if(!canFlip || selectedCards.length >= 2 ||card.classList.contains('matched')){
      return;
    }
    
    card.style.backgroundImage = 'none';
    card.style.backgroundColor = color;
    selectedCards.push(card);
  
    if (selectedCards.length ===2){
      canFlip = false;
      setTimeout(checkMatch, 1000);
    }
   
  }
  function checkMatch(){
    const [card1, card2]= selectedCards;
    const isMatch =card1.style.backgroundColor ===card2.style.backgroundColor;
  
    if (isMatch){
      card1.classList.add('matched');
      card2.classList.add('matched');
      removeMatchedCards();
      score++;
      
  
    }
    else {
      setTimeout(() =>{
      card1.style.backgroundImage = '';
      card2.style.backgroundImage = '';
     
      
    }, 500);
  }
  updateScore();
   
    if (document.querySelectorAll('.matched').length === shuffledColors.length){
      endGame();
    }
    selectedCards= [];
    canFlip = true;
  
  }
  function removeMatchedCards(){
  document.querySelectorAll('.matched').forEach(card => {
    card.classList.add('hidden');
  });
  
  
  }
  function updateScore(){
    scoreElement.textContent = `Score: ${score}`;
  }
  function endGame(){
    alert(`Game Over!! \nYour Score: ${score}`);
  
    if (score < highScore){
      highScore = score;
      localStorage.setItem('highScore', highScore);
      alert(`New High Score: ${highScore}`);
    }
    startBtn.style.display = 'block';
    restartBtn.disabled = true;
    matchesMade = 0;
    startBtn.disabled =false;
  }
  
  startBtn.addEventListener('click', startGame);
  restartBtn.addEventListener('click', restartGame);
  
  startGame();
  
  });
  
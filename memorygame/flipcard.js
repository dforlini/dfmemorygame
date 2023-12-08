let selectedCards = []; //added this for the test. 
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
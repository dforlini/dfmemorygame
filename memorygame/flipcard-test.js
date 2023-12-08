describe('flipCard', function(){
    beforeEach(function(){
      canFlip=true;
      selectCards =[];
    });
  
    it('should flip the card and add it to selectedCards', function(){
      const card = document.createElement('div');
      const color= 'color';
  
      flipCard(card, color);
      expect(card.style.backgroundImage).toBe('none');
      expect(card.style.backgroundColor).toBe(color);
      expect(selectedCards).toContain(card);
    });
  
    it('should not flip the card if canFlip is false', function(){
      const card=document.createElement('div');
      const color = 'color';
      canFlip = false;
      flipCard(card, color);
      expect(card.style.backgroundImage).toBe('none');
      expect(card.style.backgroundColor).toBe(color);
      expect(selectedCards).toContain(card);
    });
    
    it('should not flip the card if selectedcards.length is greater than or equal to 2', function (){
      const card = document.createElement('div');
      const color = 'color';
      selectedCards =[document.createElement('div'), document.createElement('div')];
  
      flipCard(card, color);
  
      expect(card.style.backgroundImage).toBe('none');
      expect(card.style.backgroundColor).toBe(color);
      expect(selectedCards).toContain(card);
  
    });
  
    it('should not flip the card if it has the "matched" class', function (){
  const card = document.createElement('div');
  const color = 'color';
  card.classList.add('matched');
  flipCard(card, color);
  
      expect(card.style.backgroundImage).toBe('none');
      expect(card.style.backgroundColor).toBe(color);
      expect(selectedCards).toContain(card);
  
    });
  
  });
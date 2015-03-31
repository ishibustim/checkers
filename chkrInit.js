function initGame()
{
  board = document.getElementById('board');
  popup = document.getElementById('popup');

  popup.classList.toggle('redWins', false);
  popup.classList.toggle('blackWins', false);

  blackRemaining = 15;
  redRemaining = 15;

  initTiles();
  initCheckers();
  initEventListeners();
}//end initGame

function initTiles()
{
  for(var y = 0; y < GRID_HEIGHT; y++)
  {
    for(var x = 0; x < GRID_WIDTH; x++)
    {
      var tileHTML = '<div id="'+x+','+y+'" data-x="'+x+'" data-y="'+y+'" class="tile';
      if((x + y) % 2 == 1)
      {
        tileHTML += ' black';
      }//end if
      tileHTML += '"></div>';
      board.innerHTML += tileHTML;

      var tile = document.getElementById(x+','+y);
      tile.style.top = (y * TILE_HEIGHT) + 'px';
      tile.style.left = (x * TILE_WIDTH) + 'px';
    }//end for
  }//end for
}//end initTiles

function initCheckers()
{
  var counter = 0;
  for(var y = 0; y < 3; y++)
  {
    for(var x = 0; x < GRID_WIDTH; x++)
    {
      if((x + y) % 2 == 1)
      {
        var tile = document.getElementById(x+','+y);
        tile.innerHTML = '<div id="black'+counter+'" class="checker black" draggable="true"></div>';
        counter++;
      }//end if
    }//end for
  }//end for

  counter = 0;
  for(var y = GRID_HEIGHT - 1; y > GRID_HEIGHT - (3 + 1); y--)
  {
    for(var x = 0; x < GRID_WIDTH; x++)
    {
      if((x + y) % 2 == 1)
      {
        var tile = document.getElementById(x+','+y);
        tile.innerHTML = '<div id="red'+counter+'" class="checker red" draggable="true"></div>';
        counter++;
      }//end if
    }//end for
  }//end for
}//end initCheckers

function initEventListeners()
{
  for(var i = 0; i < 15; i++)
  {
    var redChecker = document.getElementById('red'+i);
    var blackChecker = document.getElementById('black'+i);

    redChecker.addEventListener('dragstart', checkerDrag);
    blackChecker.addEventListener('dragstart', checkerDrag);
  }//end for

  for(var y = 0; y < GRID_HEIGHT; y++)
  {
    for(var x = 0; x < GRID_WIDTH; x++)
    {
      var tile = document.getElementById(x+','+y);
      tile.addEventListener('drop', checkerDrop);
      tile.addEventListener('dragover', tileAllowDrop);
    }//end for
  }//end for
}//end initEventListeners

function removeEventListeners()
{
  for(var y = 0; y < GRID_HEIGHT; y++)
  {
    for(var x = 0; x < GRID_WIDTH; x++)
    {
      var tile = document.getElementById(x+','+y);
      if(tile.childNodes.length == 1)
      {
        tile.childNodes[0].removeEventListener('dragstart', checkerDrag);
      }//end if
      tile.removeEventListener('drop', checkerDrop);
      tile.removeEventListener('dragover', tileAllowDrop);
    }//end for
  }//end for
}//end removeEventListeners

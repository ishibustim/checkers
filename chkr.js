var TILE_HEIGHT = 60;
var TILE_WIDTH = 60;
var GRID_HEIGHT = 10;
var GRID_WIDTH = 10;

var board;
var popup;

var blackRemaining;
var redRemaining;

var crownSymbol = '\u2655';

function windowLoad()
{
  newGame();
}//end windowLoad

function newGame()
{
  var game = document.getElementById('game');
  game.innerHTML = '<div id="popup"></div>';
  game.innerHTML += '<div id="board"></div>';

  // Add dummy event listener to prevent context menu
  game.addEventListener('contextmenu', function(ev) { ev.preventDefault(); return false; }, false);

  initGame();
}//end newGame

function checkerDrag(ev)
{
  ev.dataTransfer.setData("text", ev.target.parentNode.id);
}//end checkerDrag

function tileAllowDrop(ev)
{
  ev.preventDefault();

  var tile = ev.target;

  if(tile.classList.contains('black'))
  {
    return true;
  }//end if
  else
  {
    return false;
  }//end else
}//end tileAllowDrop

function checkerDrop(ev)
{
  ev.preventDefault();

  var srcTile = document.getElementById(ev.dataTransfer.getData("text"));
  var destTile = ev.target;
  var checker = srcTile.childNodes[0];

  var srcX = parseInt(srcTile.getAttribute('data-x'));
  var srcY = parseInt(srcTile.getAttribute('data-y'));
  var destX = parseInt(destTile.getAttribute('data-x'));
  var destY = parseInt(destTile.getAttribute('data-y'));

  var middleTile = document.getElementById((srcX + ((destX - srcX) / 2)) + ',' + (srcY + ((destY - srcY) / 2)));

  // If checker was moved 1+1
  if(Math.abs(destX - srcX) == 1 && Math.abs(destY - srcY) == 1 && destTile.childNodes.length == 0)
  {
    var shouldAdd = false;
    if(checker.classList.contains('crown'))
    {
      shouldAdd = true;
    }//end if
    else
    {
      if(checker.classList.contains('black') && destY - srcY > 0)
      {
        shouldAdd = true;
      }//end if
      else if(checker.classList.contains('red') && destY - srcY < 0)
      {
        shouldAdd = true;
      }//end else
    }//end else
    if(shouldAdd)
    {
      destTile.appendChild(checker);
    }//end if
  }//end if
  // If checker was moved 2+2 and a jump
  else if(Math.abs(destX - srcX) == 2 && Math.abs(destY - srcY) == 2 &&
          middleTile.childNodes.length == 1 &&
          ((middleTile.childNodes[0].classList.contains('black') && checker.classList.contains('red')) ||
           (middleTile.childNodes[0].classList.contains('red') && checker.classList.contains('black'))) &&
          destTile.childNodes.length == 0)
  {
    var shouldJump = false;
    if(checker.classList.contains('crown'))
    {
      shouldJump = true;
    }//end if
    else
    {
      if(checker.classList.contains('black') && destY - srcY > 0)
      {
        shouldJump = true;
      }//end if
      else if(checker.classList.contains('red') && destY - srcY < 0)
      {
        shouldJump = true;
      }//end else if
    }//end else
    if(shouldJump)
    {
      destTile.appendChild(checker);
      if(middleTile.childNodes[0].classList.contains('black'))
      {
        blackRemaining--;
      }//end if
      else if(middleTile.childNodes[0].classList.contains('red'))
      {
        redRemaining--;
      }//end else if
      middleTile.childNodes[0].removeEventListener('dragstart', checkerDrag);
      middleTile.removeChild(middleTile.childNodes[0]);
      checkWinLoss();
    }//end if
  }//end else if

  // Crown checker if needed
  if(checker.classList.contains('red') && destY == 0)
  {
    checker.innerHTML = crownSymbol;
    checker.classList.toggle('crown', true);
  }//end if
  else if(checker.classList.contains('black') && destY == GRID_HEIGHT -1)
  {
    checker.innerHTML = crownSymbol;
    checker.classList.toggle('crown', true);
  }//end else if
}//end checkerDrop

function checkWinLoss()
{
  if(redRemaining == 0 && blackRemaining == 0)
  {
    // This should never execute
    popup.innerHTML = 'You tied... somehow...';
    setVisibility(popup, true);
    removeEventListeners();
  }//end if
  else if(redRemaining == 0)
  {
    popup.innerHTML = 'Black Wins!';
    popup.classList.toggle('blackWins', true);
    setVisibility(popup, true);
    removeEventListeners();
  }//end else if
  else if(blackRemaining == 0)
  {
    popup.innerHTML = 'Red Wins!';
    popup.classList.toggle('redWins', true);
    setVisibility(popup, true);
    removeEventListeners();
  }//end else if
}//end checkWinLoss

function setVisibility(elem, flag)
{
  if(flag)
  {
    elem.style.visibility = 'visible';
  }//end if
  else
  {
    elem.style.visibility = 'hidden';
  }//end else
}//end setVisibility

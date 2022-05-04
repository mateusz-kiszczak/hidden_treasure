// GAME ELEMENTS

const treasure = '$';
const hole = 'O';
const field = '░';
const path = '*';
const player = '@';
const dead = '†';

// LEVELS - SIZE 8x12

const level1 = [

  '@', '░', '░', 'O', '░', '░', '░', '░',
  'O', 'O', '░', 'O', '░', 'O', 'O', '░',
  '░', 'O', '░', 'O', '░', 'O', '░', '░',
  '░', '░', '░', 'O', '░', 'O', '░', '░',
  '░', 'O', 'O', 'O', '░', 'O', 'O', '░',
  '░', 'O', '░', '░', '░', '░', '░', '░',
  '░', '░', '░', '░', '░', '░', '░', '░',
  '░', '░', 'O', 'O', 'O', 'O', '░', 'O',
  '░', '░', 'O', '$', '░', 'O', '░', '░',
  'O', '░', 'O', '░', '░', 'O', '░', '░',
  'O', '░', 'O', '░', '░', '░', '░', '░',
  '░', '░', 'O', '░', '░', '░', '░', '░',
];

const level2 = [

  '@', '░', '░', '░', '░', '░', '░', 'O',
  'O', 'O', '░', '░', '░', 'O', '░', 'O',
  '$', 'O', '░', 'O', '░', 'O', '░', '░',
  '░', 'O', '░', 'O', '░', 'O', '░', '░',
  '░', 'O', '░', 'O', '░', 'O', '░', 'O',
  '░', 'O', '░', 'O', '░', 'O', '░', '░',
  '░', 'O', '░', 'O', '░', 'O', '░', '░',
  '░', 'O', '░', 'O', '░', 'O', '░', 'O',
  '░', 'O', 'O', '░', '░', 'O', '░', '░',
  '░', '░', '░', '░', '░', '░', '░', '░',
  '░', 'O', 'O', 'O', '░', '░', '░', '░',
  '░', 'O', '░', '░', '░', 'O', 'O', '░',
];

const level3 = [

  '@', '░', '░', '░', '░', '░', '░', '░',
  '░', 'O', 'O', 'O', '░', 'O', 'O', '░',
  '░', 'O', '░', 'O', '░', 'O', '░', '░',
  '░', 'O', '░', '░', '░', 'O', '░', '░',
  '░', 'O', '░', '░', '░', 'O', '░', 'O',
  '░', '░', 'O', 'O', '░', 'O', 'O', 'O',
  '░', '░', '░', 'O', '░', 'O', '░', 'O',
  '░', 'O', '░', 'O', '░', '░', '░', '░',
  '░', 'O', '░', 'O', 'O', 'O', 'O', '░',
  '░', 'O', '░', '░', '░', '░', 'O', '░',
  '░', 'O', '░', '░', 'O', '░', 'O', '░',
  '░', 'O', 'O', 'O', '░', 'O', '░', '$',
];

// CLASS

class Field {
  constructor(arr) {
    this._field = arr;
  }

  get field() {
    return this._field;
  }

  set field(arr) {
    this._field = arr;
  }
  
  findPlayerPosition() {
    let index = this.field.indexOf(player);
    return index + 1;
  }
  
  updateField(num1, num2) {
    this.printGameRespond(``);
    let updatedField = [...this.field];
    updatedField[num1 - 1] = path;
    if (this.field[num2 - 1] === hole) {
      updatedField[num2 - 1] = dead;
      this.removeControlsListeners();
      this.printGameRespond(`DEAD! Fall into hole.`);
    } else if (this.field[num2 - 1] === treasure) {
      this.removeControlsListeners();
      this.printGameRespond(`You have found the treasure!`);
    } else {
      updatedField[num2 - 1] = player;
    }
    this.field = updatedField;
  }

  moveUp() {
    let playerPosition = this.findPlayerPosition();
    let wantedPosition = playerPosition - 8;
    let newPosition;
    if (wantedPosition > 0) {
      if (this.field[wantedPosition - 1] === path) {
        this.printGameRespond(`Can't go throught same path twice.`);
      } else {
        newPosition = wantedPosition;
        this.updateField(playerPosition, newPosition);
      }
    } else {
      newPosition = playerPosition;
      this.printGameRespond(`Can't go outside the map.`);
    }
  }

  moveDown() {
    let playerPosition = this.findPlayerPosition();
    let wantedPosition = playerPosition + 8;
    let newPosition;
    if (wantedPosition <= 96) {
      if (this.field[wantedPosition - 1] === path) {
        this.printGameRespond(`Can't go throught same path twice.`);
      } else {
        newPosition = wantedPosition;
        this.updateField(playerPosition, newPosition);
      }
    } else {
      newPosition = playerPosition;
      this.printGameRespond(`Can't go outside the map.`);
    }
  }

  moveLeft() {
    let playerPosition = this.findPlayerPosition();
    let wantedPosition = playerPosition - 1;
    let newPosition;
    
    if (playerPosition%8 !== 1) {
      if (this.field[wantedPosition - 1] === path) {
        this.printGameRespond(`Can't go throught same path twice.`);
      } else {
        newPosition = wantedPosition;
        this.updateField(playerPosition, newPosition);
      }
    } else {
      newPosition = playerPosition;
      this.printGameRespond(`Can't go outside the map.`);
    }
  }

  moveRight() {
    let playerPosition = this.findPlayerPosition();
    let wantedPosition = playerPosition + 1;
    let newPosition;

    if (playerPosition%8 !== 0) {
      if (this.field[wantedPosition - 1] === path) {
        this.printGameRespond(`Can't go throught same path twice.`);
      } else {
        newPosition = wantedPosition;
        this.updateField(playerPosition, newPosition);
      }
    } else {
      newPosition = playerPosition;
      this.printGameRespond(`Can't go outside the map.`);
    }
  }

  printGameScreen() {
    let gameScreen = document.getElementById('game-screen');
    gameScreen.innerHTML = '';

    this.field.forEach(element => {
      let newElement = document.createElement('div');
      newElement.textContent = element;
      gameScreen.append(newElement);
    });
  }

  printGameRespond(str) {
    let gameRespond = document.getElementById('game-respond');
    gameRespond.textContent = str;
  }

  handleMoveUpButton = () => {
    this.moveUp();
    this.printGameScreen();
  };
  
  handleMoveDownButton = () => {
    this.moveDown();
    this.printGameScreen();
  };
  
  handleMoveLeftButton = () => {
    this.moveLeft();
    this.printGameScreen();
  };
  
  handleMoveRightButton = () => {
    this.moveRight();
    this.printGameScreen();
  };
  
  handleKeyDown = (event) => {
    let keyCode = event.code;
    if (keyCode === 'KeyW') {
      this.moveUp();
      this.printGameScreen();
    }
    if (keyCode === 'KeyS') {
      this.moveDown();
      this.printGameScreen();
    }
    if (keyCode === 'KeyA') {
      this.moveLeft();
      this.printGameScreen();
    }
    if (keyCode === 'KeyD') {
      this.moveRight();
      this.printGameScreen();
    }
  };
  
  removeControlsListeners = () => {
    let upBotton = document.getElementById('move-up');
    let downBotton = document.getElementById('move-down');
    let leftBotton = document.getElementById('move-left');
    let rightBotton = document.getElementById('move-right');
    
    upBotton.removeEventListener('click', this.handleMoveUpButton);
    downBotton.removeEventListener('click', this.handleMoveDownButton);
    leftBotton.removeEventListener('click', this.handleMoveLeftButton);
    rightBotton.removeEventListener('click', this.handleMoveRightButton);
    document.removeEventListener('keydown', this.handleKeyDown);
  };
  
  addControlsListeners = () => {
    let upBotton = document.getElementById('move-up');
    let downBotton = document.getElementById('move-down');
    let leftBotton = document.getElementById('move-left');
    let rightBotton = document.getElementById('move-right');
    
    upBotton.addEventListener('click', this.handleMoveUpButton);
    downBotton.addEventListener('click', this.handleMoveDownButton);
    leftBotton.addEventListener('click', this.handleMoveLeftButton);
    rightBotton.addEventListener('click', this.handleMoveRightButton);
    document.addEventListener('keydown', this.handleKeyDown);
  };
}


// EVENT LISTENERS

const runGame = (lvl) => {
  const gameField = new Field(lvl);
  gameField.printGameScreen();
  gameField.printGameRespond('');
  gameField.addControlsListeners();
};

const lvlOneButton = document.getElementById('lvl-1-button');
const lvlTwoButton = document.getElementById('lvl-2-button');
const lvlThreeButton = document.getElementById('lvl-3-button');

lvlOneButton.addEventListener('click', function() { runGame(level1) });
lvlTwoButton.addEventListener('click', function() { runGame(level2) });
lvlThreeButton.addEventListener('click', function() { runGame(level3) });
import Phaser from 'phaser';
import StartScene from './scenes/StartScene.js';
import CloseScene from './scenes/CloseScene.js';

import backgroundImage from './assets/background.jpg';
import apple from './assets/apples-food-svgrepo-com.svg';
import avocado from './assets/food-avocado-svgrepo-com.svg';
import grape from './assets/food-grape-blueberry-svgrepo-com.svg';
import orange from './assets/food-orange-svgrepo-com.svg';
import strawberry from './assets/food-strawberry-svgrepo-com.svg';
import pineapple from './assets/pinapple-fresh-food-svgrepo-com.svg';
import eggplant from './assets/food-eggplant-svgrepo-com.svg';
import lemon from './assets/lemon-fresh-food-svgrepo-com.svg';

export default class MyGame extends Phaser.Scene {
    constructor() {
        super('MainScene');

        this.cards = [];
        this.cardsOnScreen = [];
        this.fruitsOnScreen = [];
        this.moves = [];
        this.tableSize = 4;
        this.cellConfig = {
            cellSize: 100,
            cellMargin: 5,
            cellColor: 0xb03f37,
        }
        this.svgHeight = this.cellConfig.cellSize * 0.9;
        this.svgWidth = this.cellConfig.cellSize * 0.9;
        this.winPairsCounter = 0;
        this.seconds = 0;
        this.minutes = 0;
        this.win = false;
        this.finalMoves = 0;
    }

    setBackground(bg) {
        const background = this.add.image(window.innerWidth / 2, window.innerHeight / 2, bg);
        let scaleX = window.innerWidth / background.width;
        let scaleY = window.innerHeight / background.height;
        let scale = Math.max(scaleX, scaleY);
        background.setScale(scale).setScrollFactor(0);
    }

    randomNumberInRange(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    pareExists(name, array) {
        let counter = 0;

        for (let i = 0; i < array.length; i++) {
            if (array[i] === name) {
                counter++;
            }
        }

        if (counter == 2) {
            return true;
        } else if (counter > 2) {
            return false;
        } else {
            return false;
        }
    }

    pushInRandomIndex(name, array) {

        let randomIndex = null;
        let counter = 0;
        let index_1 = 0;
        let index_2 = 0;

        for (let i = 0; i < array.length; i++) {
            if (array[i] === '') {
                counter++;
                if (counter == 1) {
                    index_1 = i;
                }

                if (counter == 2) {
                    index_2 = i;
                }
            }
        }

        if (counter === 2) {

            array[index_1] = name;
            array[index_2] = name;

        } else {
            while (array[randomIndex] !== '') {
                randomIndex = this.randomNumberInRange(0, array.length);
            }

            array[randomIndex] = name;
        }

    }

    showTimer() {
        const timer = document.getElementById('timer');
        timer.style.display = 'flex';
    }

    showTries() {
        const tries = document.getElementById('tries');
        tries.style.display = 'flex';
    }

    updateSeconds() {
        this.seconds++;
    }

    updateMinutes(seconds) {
        if (seconds === 60) {
            this.minutes++;
            this.seconds = 0;
        } else {
            return;
        }
    }

    renderTime() {
        const seconds = document.getElementById('seconds');
        const minutes = document.getElementById('minutes');

        seconds.innerHTML = this.seconds.toString();
        minutes.innerHTML = this.minutes.toString();
    }

    generateCardsArray(cardsArray, tableSize) {
        const numberOfItems = Math.pow(tableSize, 2);

        for (let i = 0; i < numberOfItems; i++) {
            cardsArray.push('');
        }

        for (let i = 0; i < numberOfItems; i++) {
            if (!this.pareExists('apple', cardsArray)) {
                this.pushInRandomIndex('apple', cardsArray);
            } else if (!this.pareExists('avocado', cardsArray)) {
                this.pushInRandomIndex('avocado', cardsArray);
            } else if (!this.pareExists('strawberry', cardsArray)) {
                this.pushInRandomIndex('strawberry', cardsArray);
            } else if (!this.pareExists('pinapple', cardsArray)) {
                this.pushInRandomIndex('pinapple', cardsArray);
            } else if (!this.pareExists('lemon', cardsArray)) {
                this.pushInRandomIndex('lemon', cardsArray);
            } else if (!this.pareExists('grape', cardsArray)) {
                this.pushInRandomIndex('grape', cardsArray);
            } else if (!this.pareExists('orange', cardsArray)) {
                this.pushInRandomIndex('orange', cardsArray);
            } else if (!this.pareExists('eggplant', cardsArray)) {
                this.pushInRandomIndex('eggplant', cardsArray);
            }
        }
    }

    loadGraphics() {
        this.load.svg('apple', apple, {
            width: this.svgHeight,
            height: this.svgWidth
        });
        this.load.svg('orange', orange, {
            width: this.svgHeight,
            height: this.svgWidth
        });
        this.load.svg('grape', grape, {
            width: this.svgHeight,
            height: this.svgWidth
        });
        this.load.svg('avocado', avocado, {
            width: this.svgHeight,
            height: this.svgWidth
        });
        this.load.svg('strawberry', strawberry, {
            width: this.svgHeight,
            height: this.svgWidth
        });
        this.load.svg('pinapple', pineapple, {
            width: this.svgHeight,
            height: this.svgWidth
        });
        this.load.svg('eggplant', eggplant, {
            width: this.svgHeight,
            height: this.svgWidth
        });
        this.load.svg('lemon', lemon, {
            width: this.svgHeight,
            height: this.svgWidth
        });
        this.load.image('background', backgroundImage);
    }

    drawFruit(x, y, fruit) {
        this.fruitsOnScreen.push(this.add.image(x, y, fruit));
    }

    createBoard(cardsArray) {

        const { width, height } = this.scale;
        const { cellSize, cellMargin, cellColor } = this.cellConfig;

        let x = (width * 0.5) - cellSize - 3 * cellMargin * this.tableSize;
        let y = (height * 0.5) - cellSize - 3 * cellMargin * this.tableSize;

        cardsArray.forEach((cell, idx) => {
            this.cardsOnScreen.push(this.add.rectangle(x, y, cellSize, cellSize, cellColor));

            this.drawFruit(x, y, cell);
            x += cellSize + cellMargin;

            if ((idx + 1) % this.tableSize === 0) {

                y += cellSize + cellMargin;
                x = (width * 0.5) - cellSize - 3 * cellMargin * this.tableSize;

            }
        });
    }

    checkMove() {
        if (this.moves.length === 2) {
            const firstMoveIndex = this.moves[0];
            const secondMoveIndex = this.moves[1];

            if (this.cards[firstMoveIndex] === this.cards[secondMoveIndex] && firstMoveIndex !== secondMoveIndex) {
                this.moves = [];
                return true;
            } else if (firstMoveIndex === secondMoveIndex) {
                return false;
            } else {
                return false;
            }
        } else {
            return 'Pick more';
        }
    }

    hideFruit(fruitIndex) {
        this.tweens.add({
            targets: this.fruitsOnScreen[fruitIndex],
            alpha: 0,
            duration: 300,
            ease: 'Power2'
        }, this);
    }

    showFruit(fruitIndex) {
        this.tweens.add({
            targets: this.fruitsOnScreen[fruitIndex],
            alpha: 1,
            duration: 300,
            ease: 'Power2'
        }, this);
    }

    hideAllFruits() {
        this.fruitsOnScreen.forEach((fruit, idx) => {
            this.hideFruit(idx);
        });
    }

    hideSomeFruits(arrayOfFruitsIdx) {
        arrayOfFruitsIdx.forEach((fruitIndexToHide, index) => {
            this.tweens.add({
                targets: this.fruitsOnScreen[fruitIndexToHide],
                alpha: 0,
                duration: 300,
                ease: 'Power2'
            }, this);
        });
        this.moves = [];
    }

    showAllFruits() {
        this.fruitsOnScreen.forEach((fruit, idx) => {
            this.showFruit(idx);
        });
    }

    showStats() {
        const stats = document.getElementById('stats');
        stats.style.display = 'block';
    }

    checkWin() {
        if (this.winPairsCounter === 8) {
            this.win = true;
            return true;
        } else {
            this.win = false;
            return false;
        }
    }

    renderMoves() {
        const tries = document.getElementById('tries');
        tries.innerHTML = this.finalMoves.toString();
    }

    cleanAllIntervals() {
        let id = window.setInterval(() => { });
        while (id--) {
            window.clearInterval(id);
        }
    }

    preload() {
        this.loadGraphics();
    }

    create() {
        this.win = false;
        this.seconds = 0;
        this.minutes = 0;
        this.cardsOnScreen = [];
        this.cards = [];
        this.fruitsOnScreen = [];
        this.moves = [];
        this.winPairsCounter = 0;
        this.finalMoves = 0;
        this.setBackground('background');
        this.showStats();
        this.showTimer();
        this.showTries();
        this.generateCardsArray(this.cards, this.tableSize);
        this.createBoard(this.cards);

        setTimeout(() => {
            setInterval(() => {
                if (this.win) {
                    this.cleanAllIntervals();
                }
                this.updateSeconds();
                this.updateMinutes(this.seconds);
            }, 1000);
            this.hideAllFruits();
            if (this.cardsOnScreen.length !== 0) {
                this.cardsOnScreen.forEach((card, idx) => {
                    card.setInteractive()
                        .on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
                            this.showFruit(idx);
                            this.moves.push(idx);
                            this.finalMoves++;
                            const moveStatus = this.checkMove();
                            if (!moveStatus) {
                                setTimeout(() => {
                                    this.hideSomeFruits(this.moves);
                                }, 1000);
                            }
                            if (moveStatus && moveStatus !== 'Pick more') {
                                this.winPairsCounter++;
                            }
                        })
                });
            }
        }, 5000);
    }

    update() {

        this.renderTime();
        this.renderMoves();

        if (this.checkWin()) {
            setTimeout(() => {
                this.scene.start('Finish');
            }, 1000);
        }
    }
}

const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth);
const DEFAULT_HEIGHT = window.innerHeight;
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT;

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
    },
    scene: [StartScene, MyGame, CloseScene]
};

export const game = new Phaser.Game(config);
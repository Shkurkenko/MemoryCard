import Phaser from "phaser";
import backgroundImage from '../assets/background.jpg';

class CloseScene extends Phaser.Scene {
    constructor() {
        super('Finish');

        this.winningBlock = document.getElementById('winning-popup');
        this.restart = document.getElementById('restart');
    }

    showWinningMenu() {
        this.winningBlock.style.display = 'block';
    }

    hideWinningMenu() {
        this.winningBlock.style.display = 'none';
    }

    hideStartMenu() {
        this.startBlock.style.display = 'none';
    }

    showResults() {
        const minutes = document.getElementById('minutes');
        const seconds = document.getElementById('seconds');
        const tries = document.getElementById('tries');
        const resultMinutes = document.getElementById('resultMinutes');
        const resultSeconds = document.getElementById('resultSeconds');
        const resultTries = document.getElementById('resultTries');

        resultMinutes.innerHTML = minutes.innerHTML + ' ' + 'min' + ' ';
        resultSeconds.innerHTML = seconds.innerHTML + ' ' + 'sec' + ' ';
        resultTries.innerHTML = tries.innerHTML + ' ' + 'tries' + ' ';
    }

    setBackground(bg) {
        const background = this.add.image(window.innerWidth / 2, window.innerHeight / 2, bg);
        let scaleX = window.innerWidth / background.width;
        let scaleY = window.innerHeight / background.height;
        let scale = Math.max(scaleX, scaleY);
        background.setScale(scale).setScrollFactor(0);
    }

    preload() {
        this.load.image('background', backgroundImage);
    }

    create() {
        this.setBackground('background');
        this.showWinningMenu();
        this.showResults();
        this.restart.onclick = (e) => {
            this.hideWinningMenu();
            this.scene.start('MainScene');
        }
    }
}

export default CloseScene;
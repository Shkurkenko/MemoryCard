import Phaser from 'phaser';
import backgroundImage from '../assets/background.jpg';

export default class StartScene extends Phaser.Scene {
    constructor() {
        super('Start');

        this.startBlock = document.getElementById('start-popup');
        this.startButton = document.getElementById('start')
    }

    showStartMenu() {
        this.startBlock.style.display = 'block';
    }

    hideStartMenu() {
        this.startBlock.style.display = 'none';
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
        this.showStartMenu();

        this.startButton.onclick = (e) => {
            this.scene.start('MainScene');
            this.hideStartMenu();
        };
    }
}
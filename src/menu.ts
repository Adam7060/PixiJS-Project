import { Application, Loader, Sprite, Text } from 'pixi.js';
import { getScale, addSprite, addText } from './utils';
import Deck from './scripts/deck';
import Particles from './scripts/particles';
class Menu {
    private game: Application;

    private deckBtn: Sprite = new Sprite();
    private deckBtnText!: Text;

    private particlesBtn: Sprite = new Sprite();
    private particlesBtnText!: Text;

    private toolBtn: Sprite = new Sprite();
    private toolBtnText!: Text;

    private activeScene: any = false;

    constructor(game: Application) {
        this.game = game;
        this.loadAssets();

        return this;
    }
    //#####################################################################################################################################
    loadAssets() {
        const loader = Loader.shared;

        loader.add('button', './assets/button.png');
        loader.add('card', './assets/card.png');

        loader.onComplete.add(() => {
            this.createContent();
        }, this);

        loader.load();
    }
    //#####################################################################################################################################
    createContent() {
        this.deckBtn = addSprite(this.game, 0, 0, 'button');
        this.deckBtnText = addText(this.game, 0, 0, 'Deck Animation');
        this.setInteractive(this.deckBtn, this.onCardBtn);

        this.particlesBtn = addSprite(this.game, 0, 0, 'button');
        this.particlesBtnText = addText(this.game, 0, 0, 'Particles');
        this.setInteractive(this.particlesBtn, this.onParticlesBtn);

        this.toolBtn = addSprite(this.game, 0, 0, 'button');
        this.toolBtnText = addText(this.game, 0, 0, 'Image Tool');
        this.setInteractive(this.toolBtn, this.onToolBtn);

        this.resizeContent(window.innerWidth, window.innerHeight);
    }
    //#####################################################################################################################################
    setInteractive(obj: Sprite, callback: Function) {
        obj.interactive = true;
        obj.on('mousedown', callback.bind(this)).on('touchstart', callback.bind(this));
    }
    //#####################################################################################################################################
    onCardBtn() {
        this.game.stage.removeChildren();
        this.activeScene = new Deck(this.game);
    }
    //#####################################################################################################################################
    onParticlesBtn() {
        this.game.stage.removeChildren();
        this.activeScene = new Particles(this.game);
    }
    //#####################################################################################################################################
    onToolBtn() {
        this.game.stage.removeChildren();
        this.activeScene = new Deck(this.game);
        console.log('Tool button pressed');
    }
    //#####################################################################################################################################
    resizeContent(newWidth: number, newHeight: number) {
        const newScale: number = getScale(newWidth, newHeight);

        // deck button
        this.deckBtn.scale.set(newScale, newScale);
        this.deckBtn.position.set(newWidth / 2, newHeight / 2);

        this.deckBtnText.scale.set(newScale, newScale);
        this.deckBtnText.position.set(newWidth / 2, newHeight / 2);

        // particles button
        this.particlesBtn.scale.set(newScale, newScale);
        this.particlesBtn.position.set(newWidth / 2, this.deckBtn.y + -200 * newScale);

        this.particlesBtnText.scale.set(newScale, newScale);
        this.particlesBtnText.position.set(this.particlesBtn.x, this.particlesBtn.y);

        // tool button
        this.toolBtn.scale.set(newScale, newScale);
        this.toolBtn.position.set(newWidth / 2, this.deckBtn.y + 200 * newScale);

        this.toolBtnText.scale.set(newScale, newScale);
        this.toolBtnText.position.set(this.toolBtn.x, this.toolBtn.y);

        if (this.activeScene) this.activeScene.resizeContent(newWidth, newHeight);
    }
}
export default Menu;

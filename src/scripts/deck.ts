import { Application, Sprite, Text, Ticker } from 'pixi.js';
import { getScale, addSprite, addText } from '../utils';
import { Tween, Group } from 'tweedle.js';

class Deck {
    private game: Application;
    private fpsText!: Text;
    private deck: Array<Sprite> = new Array(144);
    private width: number = window.innerWidth;

    constructor(game: Application) {
        this.game = game;
        this.createContent();
        this.game.ticker.add(() => this.update());
        return this;
    }
    //#####################################################################################################################################
    createContent() {
        this.fpsText = addText(this.game, 0, 0, 'FPS: 0');
        this.fpsText.anchor.set(0, 0);
        let transitionDelay: number = 1000;

        // fill deck
        for (let i = 0; i < this.deck.length; i++) {
            this.deck[i] = addSprite(this.game, 0, 0, 'card');
        }

        // start transitioning starting from last element
        for (let i = 0; i < this.deck.length; i++) {
            setTimeout(() => {
                this.moveCard(this.deck[i], i);
            }, transitionDelay * (this.deck.length - i));
        }

        this.resizeContent(window.innerWidth, window.innerHeight);
    }
    //#####################################################################################################################################
    moveCard(card: Sprite, index: number) {
        new Tween(card.position).to({ x: this.width * 0.7, y: this.deck[index].y }, 2000).start();
        this.game.stage.addChild(card);
    }
    //#####################################################################################################################################
    update() {
        this.fpsText.text = `FPS: ${Ticker.shared.FPS.toFixed(0).toString()}`;
        Group.shared.update();
    }
    //#####################################################################################################################################
    resizeContent(newWidth: number, newHeight: number) {
        this.width = newWidth;
        const newScale: number = getScale(newWidth, newHeight);

        this.fpsText.scale.set(newScale, newScale);

        this.deck.forEach((card, index) => {
            card.scale.set(newScale, newScale);
            card.position.set(newWidth * 0.3, newHeight * 0.18 + index * card.height * 0.03);
        });
    }
}
export default Deck;

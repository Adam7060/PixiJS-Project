import { Application, Sprite, Text, Ticker } from 'pixi.js';
import { getScale, addSprite, addText } from '../utils';

class Deck {
    private game: Application;
    private fpsText!: Text;
    private deck: Array<Sprite> = [];

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

        for (let i = 0; i < 134; i++) {
            this.deck.push(addSprite(this.game, 0, 0, 'card'));
        }

        this.resizeContent(window.innerWidth, window.innerHeight);
    }
    //#####################################################################################################################################
    update() {
        this.fpsText.text = `FPS: ${Ticker.shared.FPS.toFixed(0).toString()}`;
    }
    //#####################################################################################################################################
    resizeContent(newWidth: number, newHeight: number) {
        const newScale: number = getScale(newWidth, newHeight);

        this.fpsText.scale.set(newScale, newScale);

        this.deck.forEach((card, index) => {
            card.scale.set(newScale, newScale);
            card.position.set(newWidth * 0.3, newHeight * 0.18 + index * card.height * 0.035);
        });
    }
}
export default Deck;

import { Application, Sprite } from 'pixi.js';
import { getScale, addSprite } from '../utils';

class Particles {
    private game: Application;
    private rifle: Sprite = new Sprite();

    constructor(game: Application) {
        this.game = game;
        this.createContent();
        this.game.ticker.add(() => this.update());
        return this;
    }
    //#####################################################################################################################################
    createContent() {
        this.rifle = addSprite(this.game, 0, 0, 'rifle');
        this.rifle.anchor.set(0, 0);

        this.resizeContent(window.innerWidth, window.innerHeight);
    }
    //#####################################################################################################################################
    update() {}
    //#####################################################################################################################################
    resizeContent(newWidth: number, newHeight: number) {
        const newScale: number = getScale(newWidth, newHeight);

        this.rifle.scale.set(newScale, newScale);
        this.rifle.position.set(newWidth * 0.05, newHeight / 2);
    }
}
export default Particles;

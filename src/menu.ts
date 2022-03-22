import { Sprite, Loader } from 'pixi.js';

class Menu {
    private game: PIXI.Application;

    constructor(game: PIXI.Application) {
        this.game = game;

        this.loadAssets();
        game.ticker.add(() => this.update());
    }
    //#####################################################################################################################################
    loadAssets() {
        const loader = Loader.shared;

        loader.add('button', './assets/button.png');

        loader.onComplete.once(() => {
            this.createContent();
        });

        loader.load();
    }
    //#####################################################################################################################################
    update() {}
    //#####################################################################################################################################
    createContent() {
        const char1Sprite = Sprite.from('./assets/button.png');
        this.game.stage.addChild(char1Sprite);
    }
    //#####################################################################################################################################
    resizeContent(newWidth: number, newHeight: number) {
        console.log('content resized', newWidth, newHeight);
    }
}
export default Menu;

import { Application, Container, Sprite, Text } from 'pixi.js';
import { getScale, addSprite, addText } from '../utils';

class Tool {
    private game: Application;
    private container: Container = new Container();

    constructor(game: Application) {
        this.game = game;
        this.game.stage.addChild(this.container);
        this.createContent();
        return this;
    }
    //#####################################################################################################################################
    createContent() {
        this.show();

        this.resizeContent(window.innerWidth, window.innerHeight);
    }
    //#####################################################################################################################################
    show() {
        this.container.removeChildren();
        let commonWidth: number = 0;
        for (let i = 0; i < 3; i++) {
            let rndNumber: number = Math.round(Math.random()); // 1 = sprite, 0 = text

            if (rndNumber == 1) {
                const sprite: Sprite = addSprite(this.game, 0, 0, `money-${1 + Math.round(Math.random() * 2)}`);
                sprite.anchor.set(0, 0.5);
                sprite.position.x = commonWidth;
                commonWidth += sprite.width;
                this.container.addChild(sprite);
            } else {
                const text: Text = addText(this.game, 0, 0, `${Math.round(Math.random() * 9999)}`);
                text.anchor.set(0, 0.5);
                text.style.fontSize = 15 + Math.round(Math.random() * 50); // random fontsize
                text.position.x = commonWidth;
                commonWidth += text.width;
                this.container.addChild(text);
            }
        }

        setTimeout(() => {
            this.show();
        }, 2000);
    }
    //#####################################################################################################################################
    resizeContent(newWidth: number, newHeight: number) {
        const newScale: number = getScale(newWidth, newHeight);
        this.container.scale.set(newScale, newScale);
        this.container.position.set(0, newHeight / 2);
    }
}
export default Tool;

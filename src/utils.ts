import { Application, Sprite, Text, TextStyle } from 'pixi.js';

const STANDARD_WIDTH = 500;
const STANDARD_HEIGHT = 500;
export function getScale(clientWidth: number, clientHeight: number) {
    let newScaleX = clientWidth / STANDARD_WIDTH;
    let newScaleY = clientHeight / STANDARD_HEIGHT;
    return newScaleX < newScaleY ? newScaleX : newScaleY;
}
// //#############################################################################################
// /**
//  * Returns the current orientation type of the screen.
//  * @public.
//  * @returns {string}
//  */
export function addSprite(game: Application, x: number, y: number, key: string) {
    let sprite: Sprite = Sprite.from(key);
    sprite.position.set(x, y);
    sprite.anchor.set(0.5, 0.5);
    game.stage.addChild(sprite);
    return sprite;
}

export function addText(game: Application, x: number, y: number, key: string) {
    const style: TextStyle = new TextStyle({
        fontFamily: 'Montserrat',
        fontSize: 48,
        fill: 'black',
    });
    let text: Text = new Text(key, style);
    text.position.set(x, y);
    text.anchor.set(0.5, 0.5);
    game.stage.addChild(text);
    return text;
}

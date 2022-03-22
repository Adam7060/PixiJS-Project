import { Application } from 'pixi.js';
import Menu from './menu';

let config = {
    backgroundColor: 0xffff00,
    width: window.innerWidth,
    height: window.innerHeight,
};

const game = new Application(config);
document.body.appendChild(game.view);

const menu = new Menu(game);

window.addEventListener(
    'resize',
    () => {
        let clientWidth = window.innerWidth;
        let clientHeight = window.innerHeight;

        game.renderer.resize(clientWidth, clientWidth);
        game.stage.scale.x = window.innerWidth;
        game.stage.scale.y = window.innerHeight;

        menu.resizeContent(clientWidth, clientHeight);
    },
    false
);

import { Application } from 'pixi.js';
import Menu from './menu';

interface Config {
    backgroundColor: number;
    width: number;
    height: number;
    resolution: number;
}

let config: Config = {
    backgroundColor: 0xffff00,
    width: window.innerWidth,
    height: window.innerHeight,
    resolution: 1,
};

const game: Application = new Application(config);
document.body.appendChild(game.view);

let menu: Menu = new Menu(game);

window.addEventListener('resize', resize, false);

function resize() {
    let clientWidth: number = window.innerWidth;
    let clientHeight: number = window.innerHeight;

    game.renderer.resize(clientWidth, clientHeight);
    menu.resizeContent(clientWidth, clientHeight);
}

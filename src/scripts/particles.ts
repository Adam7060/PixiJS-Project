import { Application, Sprite, ParticleContainer } from 'pixi.js';
import { getScale, addSprite } from '../utils';

class Particles {
    private game: Application;
    private rifle: Sprite = new Sprite();
    private container: ParticleContainer = new ParticleContainer();
    private fire: Array<Sprite> = new Array();

    constructor(game: Application) {
        this.game = game;
        this.createContent();
        this.game.ticker.add(() => this.update());
        return this;
    }
    //#####################################################################################################################################
    createContent() {
        this.container = new ParticleContainer(10, {
            scale: true,
            rotation: true,
        });
        this.game.stage.addChild(this.container);

        this.rifle = addSprite(this.game, 0, 0, 'rifle');
        this.rifle.anchor.set(0, 0);

        for (let i = 0; i < 10; i++) {
            const particle = Sprite.from('../assets/fire.png');
            particle.anchor.set(0.2, 0.5);
            particle.scale.set(0.2 + Math.random() * 0.5);

            this.fire.push(particle);
            this.container.addChild(particle);
        }

        this.resizeContent(window.innerWidth, window.innerHeight);
    }
    //#####################################################################################################################################
    update() {
        for (let i = 0; i < this.fire.length; i++) {
            const particle = this.fire[i];
            particle.scale.set(particle.scale.x + 0.1);
            if (particle.scale.x > 1.5) particle.scale.set(0.2);

            particle.rotation = -0.5 + Math.random() * 1;
        }
    }
    //#####################################################################################################################################
    resizeContent(newWidth: number, newHeight: number) {
        const newScale: number = getScale(newWidth, newHeight);

        this.rifle.scale.set(newScale, newScale);
        this.rifle.position.set(newWidth * 0.05, newHeight / 2);

        this.container.scale.set(newScale, newScale);
        this.container.position.set(this.rifle.x + this.rifle.width, this.rifle.y + this.rifle.height / 3);
    }
}
export default Particles;

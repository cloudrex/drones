// Copy assets to output
import "../assets/terrain/stone.png";

// Copy index.html to output
require("file-loader?name=[name].[ext]!../index.html");

// Copy style.css to output
require("file-loader?name=[name].[ext]!../style.css");

import {IVector} from "../../public-api/entities";
import GameDrawer from "./drawer";
import GameCache from "./cache";
import GameNetwork from "./network";
import GameMath from "../../public-api/math";

export default class GameClient {
    public readonly dimensions: IVector;
    public readonly relativeDimensions: IVector;
    public readonly x: CanvasRenderingContext2D;
    public readonly cache: GameCache;
    public readonly drawer: GameDrawer;
    public readonly net: GameNetwork;

    private readonly gameElm: HTMLCanvasElement;

    private lastMousePos: IVector;
    private previousDeltaTime: number;
    private activeZone: number;

    public constructor(gameElementId: string, dimensions: IVector) {
        this.gameElm = document.getElementById("game") as HTMLCanvasElement;

        if (!this.gameElm) {
            throw new Error("Game canvas element not found");
        }
        else {
            const context: CanvasRenderingContext2D | null = this.gameElm.getContext("2d");

            if (context === null) {
                throw new Error("Could not retrieve canvas context");
            }
            
            this.x = context;
        }

        this.dimensions = dimensions;
        this.relativeDimensions = GameMath.calculateRelativeSize(dimensions);
        this.cache = new GameCache();
        this.drawer = new GameDrawer(this);
        this.net = new GameNetwork(this);
        this.previousDeltaTime = 0;
        this.activeZone = 0;

        this.lastMousePos = {
            x: 0,
            y: 0
        };

        // Set canvas size
        this.gameElm.setAttribute("width", `${dimensions.x}px`);
        this.gameElm.setAttribute("height", `${dimensions.y}px`);
    }

    public getActiveZone(): number {
        return this.activeZone;
    }

    public async init(): Promise<void> {
        console.log("Game init");
    
        // TODO:
        this.net.init().authenticate({
            username: "john",
            password: "doe"
        });
    
        // Canvas events
        this.gameElm.onclick = (e) => {
            // TODO: Use pos
            const pos: IVector = {
                x: e.offsetX,
                y: e.offsetY
            };
    
            this.net.moveEntity(window.prompt("id") as string, {
                x: 1,
                y: 1
            });
        };
    
        this.gameElm.onmousemove = (e) => {
            this.lastMousePos = {
                x: e.offsetX,
                y: e.offsetY
            };
        };
    
        await this.cache.loadAssets();
        window.requestAnimationFrame(this.update.bind(this));
    }
    
    public update(timestamp: number): void {
        let deltaTime: number = timestamp - this.previousDeltaTime;
    
        // Target positions
        for (let [id, entity] of this.cache.getEntities()) {
            if (entity.targetPosition !== undefined) {
                const velocityTowards: IVector = GameMath.getVelocityTowards(entity.position, entity.targetPosition);
    
                entity.velocity = {
                    x: velocityTowards.x * entity.speed,
                    y: velocityTowards.y * entity.speed
                };
            }
    
            // Update entity position
            entity.position = {
                x: entity.position.x + (entity.velocity.x * deltaTime),
                y: entity.position.y + (entity.velocity.y * deltaTime),
                zone: entity.position.zone
            };
        }
    
        // Re-draw
        this.draw();
    
        // Save new timestamp
        this.previousDeltaTime = timestamp;
    
        // Repeat
        window.requestAnimationFrame(this.update.bind(this));
    }
    
    public draw(): void {
        this.drawer.background()
            .terrain()
            .entities()
            .selection(this.relativeDimensions, this.lastMousePos);
    }

    public debug(): this {
        // Debugging code here
        
        // Expose cache for debugging
        (global as any).cache = this.cache;

        return this;
    }
}

// Init
const game: GameClient = new GameClient("game", {
    x: 800,
    y: 600
});

game.init();
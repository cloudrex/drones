// Copy index.html to output
require("file-loader?name=[name].[ext]!../index.html");

// Copy style.css to output
require("file-loader?name=[name].[ext]!../style.css");

import {IVector} from "../../shared/entities";
import Drawer from "./drawer";
import GameCache from "./cache";
import GameNetwork from "./network";
import GameMath from "../../public-api/math";

const gameElm: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;

if (!gameElm) {
    throw new Error("Game canvas element not found");
}

const dimensions: IVector = {
    x: 800,
    y: 600
};

const relativeDimensions: IVector = GameMath.calculateRelativeSize(dimensions);

gameElm.setAttribute("width", `${dimensions.x}px`);
gameElm.setAttribute("height", `${dimensions.y}px`);

const context: CanvasRenderingContext2D | null = gameElm.getContext("2d");

if (context === null) {
    throw new Error("Could not retrieve canvas context");
}

const x: CanvasRenderingContext2D = context;
const cache: GameCache = new GameCache();

// Expose cache for debugging
(global as any).cache = cache;

const drawer: Drawer = new Drawer(x, dimensions, cache);
const net: GameNetwork = new GameNetwork(cache, dimensions);

let lastMousePos: IVector = {
    x: 0,
    y: 0
};

let previousDeltaTime: number | null = null;

function init(): void {
    console.log("Game init");

    // TODO:
    net.init().authenticate({
        username: "john",
        password: "doe"
    });

    // Canvas events
    gameElm.onclick = (e) => {
        // TODO: Use pos
        const pos: IVector = {
            x: e.offsetX,
            y: e.offsetY
        };

        net.moveEntity(window.prompt("id") as string, {
            x: 1,
            y: 1
        });
    };

    gameElm.onmousemove = (e) => {
        lastMousePos = {
            x: e.offsetX,
            y: e.offsetY
        };
    };

    window.requestAnimationFrame(update);
}

function update(timestamp: number): void {
    if (previousDeltaTime === null) {
        previousDeltaTime = timestamp;
    }

    const deltaTime: number = timestamp - previousDeltaTime;

    // Re-draw
    draw(deltaTime);

    // Repeat
    window.requestAnimationFrame(update);
}

function draw(deltaTime: number): void {
    drawer.background();
    drawer.selection(relativeDimensions, lastMousePos);
    drawer.entities(deltaTime);
}

init();
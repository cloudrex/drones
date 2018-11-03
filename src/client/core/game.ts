// Copy index.html to output
require("file-loader?name=[name].[ext]!../index.html");

// Copy style.css to output
require("file-loader?name=[name].[ext]!../style.css");

import {IVector} from "../../shared/entities";
import Drawer from "./drawer";
import GameCache from "./cache";
import GameNetwork from "./network";

const gameElm: HTMLCanvasElement = document.getElementById("game") as HTMLCanvasElement;

if (!gameElm) {
    throw new Error("Game canvas element not found");
}

const dimensions: IVector = {
    x: 800,
    y: 600
};

gameElm.setAttribute("width", `${dimensions.x}px`);
gameElm.setAttribute("height", `${dimensions.y}px`);

const context: CanvasRenderingContext2D | null = gameElm.getContext("2d");

if (context === null) {
    throw new Error("Could not retrieve canvas context");
}

const x: CanvasRenderingContext2D = context;
const cache: GameCache = new GameCache();
const drawer: Drawer = new Drawer(x, dimensions, cache);
const net: GameNetwork = new GameNetwork(cache, dimensions);

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

    // Game loop
    setInterval(() => {
        update();
        draw();
    }, 1);
}

function update(): void {
    clearScreen();
}

function draw(): void {
    drawer.background();
    drawer.entities();
}

function clearScreen(): void {
    x.clearRect(0, 0, dimensions.x, dimensions.y);
}

init();
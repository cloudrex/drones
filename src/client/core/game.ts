// Copy index.html to output
require("file-loader?name=[name].[ext]!../index.html");

// Copy style.css to output
require("file-loader?name=[name].[ext]!../style.css");

import {IVector} from "../../shared/entities";
import Drawer from "./drawer";
import GameCache from "./cache";
import GameNetwork from "./network";

const gameElm: HTMLCanvasElement | null = document.getElementById("game") as HTMLCanvasElement | null;

if (gameElm === null) {
    throw new Error("Game canvas element not found");
}

const dimensions: IVector = {
    x: gameElm.clientWidth,
    y: gameElm.clientHeight
};

const context: CanvasRenderingContext2D | null = gameElm.getContext("2d");

if (context === null) {
    throw new Error("Could not retrieve canvas context");
}

const x: CanvasRenderingContext2D = context;
const drawer: Drawer = new Drawer(x, dimensions);
const cache: GameCache = new GameCache();
const net: GameNetwork = new GameNetwork(cache);

function init(): void {
    console.log("Game init");

    net.init();

    // Game loop
    setInterval(() => {
        update();
        draw();
    }, 0);
}

function update(): void {
    clearScreen();
}

function draw(): void {
    drawer.background();
}

function clearScreen(): void {
    x.clearRect(0, 0, dimensions.x, dimensions.y);
}

init();
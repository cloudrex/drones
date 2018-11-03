const gameElm: HTMLCanvasElement | null = document.getElementById("game") as HTMLCanvasElement | null;

if (gameElm === null) {
    throw new Error("Game canvas element not found");
}

const context: CanvasRenderingContext2D | null = gameElm.getContext("2d");

if (context === null) {
    throw new Error("Could not retrieve canvas context");
}

const x: CanvasRenderingContext2D = context;

function render(): void {
    x.fillStyle = "#000";
    x.fillRect(0, 0, 1000, 1000);
    x.fill();
}

render();
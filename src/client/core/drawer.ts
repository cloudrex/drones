import {IVector} from "../../shared/entities";

export default class Drawer {
    private readonly x: CanvasRenderingContext2D;
    private readonly dimensions: IVector;

    public constructor(x: CanvasRenderingContext2D, dimensions: IVector) {
        this.x = x;
        this.dimensions = dimensions;
    }

    public background(): this {
        this.x.fillStyle = "#000";
        this.x.fillRect(0, 0, this.dimensions.x, this.dimensions.y);

        return this;
    }
}
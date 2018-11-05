import {IVector} from "../../public-api/entities";
import GameMath from "../../public-api/math";
import GameCache from "./cache";
import Utils from "./utils";
import {IEntityModel, BlockSize} from "../../public-api/entities";

export default class Drawer {
    private readonly x: CanvasRenderingContext2D;
    private readonly dimensions: IVector;
    private readonly cache: GameCache;

    public constructor(x: CanvasRenderingContext2D, dimensions: IVector, cache: GameCache) {
        this.x = x;
        this.dimensions = dimensions;
        this.cache = cache;
    }

    public entities(): this {
        for (let [id, entity] of this.cache.getEntities()) {
            const model: IEntityModel = Utils.getEntityModel(entity.type);

            this.x.fillStyle = model.color;

            if (!model.round) {
                this.x.fillRect(entity.position.x, entity.position.y, BlockSize, BlockSize);
            }
            else {
                this.x.beginPath();

                const pos: IVector = GameMath.calculateBlockAtPosition(entity.position);

                this.x.arc(
                    pos.x + BlockSize / 2,
                    pos.y + BlockSize / 2,
                    BlockSize / 2, 0, 2 * Math.PI
                );
                
                this.x.fill();
                this.x.closePath();
            }
        }

        return this;
    }

    // TODO: Draw selection by block
    public selection(relativeDimensions: IVector, lastMousePosition: IVector): this {
        this.x.fillStyle = "rgba(255, 255, 255, 0.5)";

        const blockPosition: IVector = GameMath.calculateBlockAtPosition(lastMousePosition);

        this.x.fillRect(
            blockPosition.x * BlockSize,
            blockPosition.y * BlockSize,
            BlockSize,
            BlockSize
        );

        return this;
    }

    public background(): this {
        this.x.fillStyle = "#000";
        this.x.fillRect(0, 0, this.dimensions.x, this.dimensions.y);

        return this;
    }
}
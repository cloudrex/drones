import {IVector} from "../../shared/entities";
import GameCache from "./cache";
import Utils from "./utils";
import {IEntityModel, EntitySize} from "../../public-api/entities";

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
            this.x.fillRect(entity.position.x, entity.position.y, EntitySize, EntitySize);
        }

        return this;
    }

    public background(): this {
        this.x.fillStyle = "#000";
        this.x.fillRect(0, 0, this.dimensions.x, this.dimensions.y);

        return this;
    }
}
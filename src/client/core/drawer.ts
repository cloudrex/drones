import {IVector, ITerrainModel, IWorldTerrain} from "../../public-api/entities";
import GameMath from "../../public-api/math";
import Utils from "../../public-api/utils";
import {IEntityModel, BlockSize} from "../../public-api/entities";
import GameClient from "./game";

export default class Drawer {
    private readonly game: GameClient;

    public constructor(game: GameClient) {
        this.game = game;
    }

    public entities(): this {
        for (let [id, entity] of this.game.cache.getEntities()) {
            const model: IEntityModel = Utils.getEntityModel(entity.type);

            this.game.x.fillStyle = model.color;

            if (!model.round) {
                this.game.x.fillRect(entity.position.x, entity.position.y, BlockSize, BlockSize);
            }
            else {
                this.game.x.beginPath();

                const pos: IVector = GameMath.calculateBlockAtPosition(entity.position);

                this.game.x.arc(
                    pos.x + BlockSize / 2,
                    pos.y + BlockSize / 2,
                    BlockSize / 2, 0, 2 * Math.PI
                );
                
                this.game.x.fill();
                this.game.x.closePath();
            }
        }

        return this;
    }

    public terrain(): this {
        const zone: IWorldTerrain[] = this.game.cache.getZone(this.game.getActiveZone());
        
        // TODO: Cache images (if using the same texture over and over again)
        for (let i: number = 0; i < zone.length; i++) {
            const model: ITerrainModel = Utils.getTerrainModel(zone[i].type);

            if (!this.game.cache.hasTexture(model.texture)) {
                throw new Error(`[Drawer.terrain] No texture cached for terrain entity '${zone[i].type}'`);
            }

            this.game.x.drawImage(
                this.game.cache.getTexture(model.texture) as HTMLImageElement,
                zone[i].position.x,
                zone[i].position.y,
                BlockSize,
                BlockSize
            );
        }

        return this;
    }

    // TODO: Draw selection by block
    public selection(relativeDimensions: IVector, lastMousePosition: IVector): this {
        this.game.x.fillStyle = "rgba(255, 255, 255, 0.5)";

        const blockPosition: IVector = GameMath.calculateBlockAtPosition(lastMousePosition);

        this.game.x.fillRect(
            blockPosition.x * BlockSize,
            blockPosition.y * BlockSize,
            BlockSize,
            BlockSize
        );

        return this;
    }

    public background(): this {
        this.game.x.fillStyle = "#000";
        this.game.x.fillRect(0, 0, this.game.dimensions.x, this.game.dimensions.y);

        return this;
    }
}
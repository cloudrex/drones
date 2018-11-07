import {TerrainType, IWorldTerrain, IVector} from "../../public-api/entities";
import GameMath from "../../public-api/math";
import Game from "../core/game";
import Utils from "../../public-api/utils";

export type ITerrainLayer = {
    readonly start: IVector;
    readonly end: IVector;
    readonly columns: number;
    readonly type: TerrainType;
    readonly chance: number;
    readonly groupingFactor: number;
};

export default class TerrainGenerator {
    private readonly layers: ITerrainLayer[];
    private readonly zone: number;

    public constructor(layers: ITerrainLayer[], zone: number) {
        this.layers = layers;
        this.zone = zone;
    }

    public generate(): IWorldTerrain[] {
        const result: IWorldTerrain[] = [];

        for (let i: number = 0; i < this.layers.length; i++) {
            result.push(...TerrainGenerator.processLayer(this.layers[i], this.zone));
        }

        return result;
    }

    public static processLayer(layer: ITerrainLayer, zone: number): IWorldTerrain[] {
        const totalBlocks: number = GameMath.calculateTotalBlocks(layer.start, layer.end);
        const result: IWorldTerrain[] = [];

        console.log(totalBlocks);

        let row: number = 0;

        for (let i: number = 0; i < totalBlocks; i++) {
            if (row >= layer.columns) {
                row++;
            }

            if (Utils.getRandomInt(0, 100 - Math.round(layer.chance)) === 0) {
                result.push(Game.createTerrain(layer.type, {
                    x: row,
                    y: i / layer.columns,
                    zone
                }));
            }
        }

        return result;
    }
}
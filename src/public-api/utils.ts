import {EntityType, IVector, TerrainType, ITerrainModel, DefaultTerrainModels} from "./entities";
import {IEntityModel, DefaultEntityModels} from "./entities";

export default abstract class Utils {
    public static getEntityModel(type: EntityType): IEntityModel {
        return DefaultEntityModels[type];
    }

    public static getTerrainModel(type: TerrainType): ITerrainModel {
        return DefaultTerrainModels[type];
    }

    public static calculateAbsPosition(position: IVector, dimensions: IVector): IVector {
        return {
            x: (dimensions.x / 100) + position.x,
            y: (dimensions.y / 100) + position.y
        };
    }

    public static getRandomInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
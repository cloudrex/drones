import {EntityType, IVector} from "../../shared/entities";
import {IEntityModel, DefaultEntityModels} from "../../public-api/entities";

export default abstract class Utils {
    public static getEntityModel(type: EntityType): IEntityModel {
        return DefaultEntityModels[type];
    }

    public static calculateAbsPosition(position: IVector, dimensions: IVector): IVector {
        return {
            x: (dimensions.x / 100) + position.x,
            y: (dimensions.y / 100) + position.y
        };
    }
}
import {v1} from "uuid";
import {IWorldEntity, EntityType, IWorldVector} from "../../public-api/entities";
import {UniqueId} from "./account";

export type IEntityProperties = {
    readonly drone: Partial<IWorldEntity>;
}

export const DefaultEntityProperties: IEntityProperties = {
    drone: {
        speed: 0.1
    }
};

export default abstract class Game {
    public static createEntity(type: EntityType, owner: UniqueId, position: IWorldVector): IWorldEntity {
        return {
            owner,
            type,

            velocity: {
                x: 0,
                y: 0
            },
            
            // TODO
            speed: 0.1,
            position,
            id: v1()
        };
    }
}
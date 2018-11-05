import {v1} from "uuid";
import {IWorldEntity, EntityType, IWorldVector} from "../../shared/entities";
import {UniqueId} from "../../shared/account";

export type IEntityProperties = {
    readonly [EntityType.Drone]: Partial<IWorldEntity>;
}

export const DefaultEntityProperties: IEntityProperties = {
    [EntityType.Drone]: {
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
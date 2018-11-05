import {v1} from "uuid";
import {IWorldEntity, EntityType, IWorldVector} from "../../shared/entities";
import {UniqueId} from "../../shared/account";

export default abstract class Game {
    public static createEntity(type: EntityType, owner: UniqueId, position: IWorldVector): IWorldEntity {
        return {
            owner,
            type,

            velocity: {
                x: 0,
                y: 0
            },
            
            position,
            id: v1()
        };
    }
}
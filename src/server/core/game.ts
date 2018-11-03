import {v1} from "uuid";
import {IWorldEntity, EntityType, IVector} from "../../shared/entities";
import {UniqueId} from "../../shared/account";

export default abstract class Game {
    public static createEntity(type: EntityType, owner: UniqueId, position: IVector): IWorldEntity {
        return {
            owner,
            type,
            position,
            id: v1()
        };
    }
}
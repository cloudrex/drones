import {v1} from "uuid";
import {IWorldEntity, EntityType, IWorldVector, TerrainType, IWorldTerrain} from "../../publicApi/entities";
import {UniqueId} from "../../publicApi/account";

export type ITerrainProperties = {
    speedChange?: number;
    texture: string;
    walkable?: boolean;
};

export type IEntityPropertyGroup = {
    readonly drone: Partial<IWorldEntity>;
}

export type ITerrainPropertyGroup = {
    readonly stone: ITerrainProperties;
}

export const DefaultEntityProperties: IEntityPropertyGroup = {
    [EntityType.Drone]: {
        speed: 0.1
    }
};

export const DefaultTerrainProperties: ITerrainPropertyGroup = {
    [TerrainType.Stone]: {
        texture: "terrain/stone"
    }
};

export default abstract class Game {
    public static createEntity(type: EntityType, owner: UniqueId, position: IWorldVector): IWorldEntity {
        // TODO: Verify that default for this type isn't undefined
        return {
            ...(DefaultEntityProperties as any)[type],
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

    public static createTerrain(type: TerrainType, position: IWorldVector): IWorldTerrain {
        // TODO: Verify that default for this type isn't undefined
        return {
            ...(DefaultTerrainProperties as any)[type],
            type,
            position,
            id: v1()
        };
    }
}

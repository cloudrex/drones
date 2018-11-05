import {EntityType} from "../shared/entities";

export type IEntityModel = {
    readonly color: string;
    readonly round?: boolean;
}

export type IEntityModels = {
    readonly drone: IEntityModel;
    readonly stone: IEntityModel;
    readonly grass: IEntityModel;
}

export const DefaultEntityModels: IEntityModels = {
    [EntityType.Drone]: {
        color: "#fff",
        round: true
    },

    [EntityType.Stone]: {
        color: "#333"
    },

    [EntityType.Grass]: {
        color: "#336600"
    }
};

export const BlockSize: number = 32;
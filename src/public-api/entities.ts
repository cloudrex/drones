import {EntityType} from "../shared/entities";

export type IEntityModel = {
    readonly color: string;
}

export type IEntityModels = {
    readonly drone: IEntityModel;
}

export const DefaultEntityModels: IEntityModels = {
    [EntityType.Drone]: {
        color: "#fff"
    }
};

export const EntitySize: number = 8;
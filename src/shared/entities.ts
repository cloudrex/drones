import {UniqueId} from "./account";

export type IVector = {
    x: number;
    y: number;
    zone: number;
}

export enum EntityType {
    Drone
}

export type IEntity = {
    readonly id: UniqueId;
}

export interface IWorldEntity extends IEntity {
    position: IVector;
    type: EntityType;
    owner: UniqueId;
}
import {UniqueId} from "./account";

export type IVector = {
    x: number;
    y: number;
}

export interface IWorldVector extends IVector {
    zone: number;
}

export enum EntityType {
    Drone = "drone"
}

export type IEntity = {
    readonly id: UniqueId;
}

export interface IWorldEntity extends IEntity {
    position: IWorldVector;
    type: EntityType;
    owner: UniqueId;
}
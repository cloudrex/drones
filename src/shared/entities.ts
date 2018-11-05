import {UniqueId} from "./account";

export type IVector = {
    x: number;
    y: number;
}

export interface IWorldVector extends IVector {
    zone: number;
}

export enum EntityType {
    Drone = "drone",
    Stone = "stone",
    Grass = "grass"
}

export type IEntity = {
    readonly id: UniqueId;
}

export interface IWorldEntity extends IEntity {
    position: IWorldVector;
    velocity: IVector;
    type: EntityType;
    owner: UniqueId;
    targetPosition?: IVector;
    speed: number;
}
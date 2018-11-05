import {UniqueId} from "./account";

export type IEntityModel = {
    readonly color: string;
    readonly round?: boolean;
}

export type ITerrainModel = {
    readonly texture: string;
};

export type IEntityModels = {
    readonly drone: IEntityModel;
}

export type ITerrainModels = {
    readonly stone: ITerrainModel;
    readonly grass: ITerrainModel;
};

export enum EntityType {
    Drone = "drone"
}

export enum TerrainType {
    Stone = "stone",
    Grass = "grass"
}

export const DefaultEntityModels: IEntityModels = {
    [EntityType.Drone]: {
        color: "#fff",
        round: true
    }
};

export const DefaultTerrainModels: ITerrainModels = {
    stone: {
        texture: "terrain/stone",
    },

    grass: {
        texture: "terrain/grass"
    }
};

export type IVector = {
    x: number;
    y: number;
}

export interface IWorldVector extends IVector {
    zone: number;
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

export interface IWorldTerrain extends IEntity {
    position: IWorldVector;
    texture: string;
    type: TerrainType;
    walkable?: boolean;
    speedChange?: number;
}

export const BlockSize: number = 32;
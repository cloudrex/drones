import {IWorldVector, IVector} from "../public-api/entities";
import {BlockSize} from "./entities";

export default abstract class GameMath {
    public static calculatePositionZone(position: IWorldVector): number {
        let newZone: number = position.zone;

        if (position.zone === 0 || position.zone === 8) {
            if (position.x < 0) {
                return position.zone;
            }
            else if (position.x > 100) {
                return position.zone;
            }
            else if (position.y < 0) {
                return position.zone;
            }
            else if (position.y > 100) {
                return position.zone;
            }
        }

        if (position.x > 100) {
            newZone += 1;
        }
        else if (position.x < 0) {
            newZone -= 1;
        }

        if (position.y > 100) {
            newZone += 3;
        }
        else if (position.y < 0) {
            newZone -= 3;
        }

        return newZone;
    }

    public static calculateRelativeSize(dimensions: IVector): IVector {
        return {
            x: Math.round(dimensions.x / BlockSize),
            y: Math.round(dimensions.y / BlockSize)
        };
    }

    public static getVelocityTowards(position: IVector, destination: IVector) {
        let x: number = 0;
        let y: number = 0;

        if (destination.x > position.x) {
            x = 1;
        }
        else if (destination.x < position.x) {
            x = -1;
        }

        if (destination.y > position.y) {
            y = 1;
        }
        else if (destination.y < position.y) {
            y = -1;
        }

        return {
            x,
            y
        };
    }

    public static calculateBlockAtPosition(position: IVector): IVector {
        return {
           x: Math.round((position.x - (BlockSize / 2)) / BlockSize),
           y: Math.round((position.y - (BlockSize / 2)) / BlockSize)
        };
    }

    public static calculateTotalBlocks(start: IVector, end: IVector): number {
        return (start.x + end.x) * (start.y + end.y);
    }
}
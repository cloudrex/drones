import {IWorldVector} from "../../shared/entities";

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
}
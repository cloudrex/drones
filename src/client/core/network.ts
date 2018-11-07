import {IAuthCredentials, UniqueId} from "../../public-api/account";
import {Events} from "../../public-api/events";
import {IWorldEntity, EntityType, IVector, IWorldTerrain} from "../../public-api/entities";
import Utils from "../../public-api/utils";
import GameMath from "../../public-api/math";
import GameClient from "./game";

export default class GameNetwork {
    private readonly game: GameClient;
    private readonly socket: SocketIOClient.Socket;

    public constructor(game: GameClient) {
        this.game = game;
        this.socket = io();
    }

    public init(): this {
        // Setup events
        this.socket.on(Events.AuthenticateFailed, () => {
            alert("auth failed");
        });

        this.socket.on(Events.Authenticate, (id: UniqueId) => {
            console.log(`Authenticated @ ${id}`);
            
            // Request initial zone
            this.socket.emit(Events.GetTerrainMap, 0);
        });

        this.socket.on(Events.GetTerrainMap, (terrain: IWorldTerrain[], zone: number) => {
            this.game.cache.setZone(zone, terrain);

            console.log("Loaded zone", zone, terrain);
        });

        // TODO: Check if in field of vision before adding
        this.socket.on(Events.SpawnEntity, (entity: IWorldEntity) => {
            console.log(`Added entity @ ${entity.id}`);

            // TODO: Consider creating method to do this
            this.game.cache.setEntity({
                ...entity,

                position: {
                    ...entity.position,
                    ...Utils.calculateAbsPosition(entity.position, this.game.dimensions)
                }
            });
        });

        this.socket.on(Events.MoveEntity, (id: UniqueId, offset: IVector) => {
            const entity: IWorldEntity | null = this.game.cache.getEntity(id);

            if (entity === null) {
                // TODO: Request entity from server, if fails, reset

                return;
            }

            entity.position = {
                ...Utils.calculateAbsPosition(entity.position, this.game.dimensions),
                zone: GameMath.calculatePositionZone(entity.position)
            };
        });

        this.socket.on(Events.SpawnTerrain, (terrain: IWorldTerrain) => {
            if (!this.game.cache.hasZone(terrain.position.zone)) {
                return;
            }

            console.log(`Added terrain @ ${terrain.id}`);

            // TODO: Consider creating method to do this?
            this.game.cache.getZone(terrain.position.zone).push({
                ...terrain,

                position: {
                    ...terrain.position,
                    ...Utils.calculateAbsPosition(terrain.position, this.game.dimensions)
                }
            });
        });

        this.socket.on(Events.BadRequest, () => {
            console.log("Bad request");
        });

        return this;
    }

    public spawnEntity(type: EntityType, position: IVector): this {
        this.socket.emit(Events.SpawnEntity, type, position);

        return this;
    }

    public moveEntity(id: UniqueId, position: IVector): this {
        this.socket.emit(Events.MoveEntity, id, position);

        return this;
    }

    public authenticate(credentials: IAuthCredentials): this {
        this.socket.emit(Events.Authenticate, credentials);

        return this;
    }
}
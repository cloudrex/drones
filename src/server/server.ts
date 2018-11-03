import SocketIO from "socket.io";
import http from "http";
import {UniqueId, IAuthCredentials} from "../shared/account";
import {Events} from "./network/events";
import {SpecialUniqueIds} from "./network/structures";
import {IVector, IWorldEntity, EntityType} from "../shared/entities";
import Game from "./core/game";
import {CenterOriginVector} from "./core/constants";

const socket: SocketIO.Server = SocketIO(http.createServer());

// Data/Local Cache
const entities: Map<UniqueId, IWorldEntity> = new Map();

socket.on(Events.Connection, (client) => {
    let auth: UniqueId | null = null;
    
    console.log("Client connected");

    client.on(Events.Authenticate, (credentials: IAuthCredentials) => {
        if (!credentials.username || !credentials.password) {
            client.emit(Events.AuthenticateFailed);

            return;
        }
        
        auth = SpecialUniqueIds.Admin;
        client.emit(Events.Authenticate, auth);

        // Create initial drone
        socket.emit(Events.SpawnEntity, Game.createEntity(EntityType.Drone, auth, CenterOriginVector))
    });

    client.on(Events.GetActiveWorldZone, () => {
        if (!auth) {
            client.emit(Events.NotAuthorized);

            return;
        }

        // TODO: Debugging
        client.emit(Events.GetActiveWorldZone, 0);
    });

    client.on(Events.MoveEntity, (entityId: UniqueId, position: IVector) => {
        if (!auth) {
            client.emit(Events.NotAuthorized);

            return;
        }
        else if (!entityId || !position || typeof entityId !== "string") {
            client.emit(Events.BadRequest);

            return;
        }

        const entity: IWorldEntity | null = entities.get(entityId) || null;

        if (!entity) {
            client.emit(Events.BadRequest);

            return;
        }
        else if (entity.owner !== auth) {
            client.emit(Events.NotAuthorized);

            return;
        }

        socket.emit(Events.MoveEntity, entityId, position);
    });

    client.on(Events.StopEntity, (entityId: UniqueId) => {
        if (!auth) {
            client.emit(Events.NotAuthorized);

            return;
        }

        const entity: IWorldEntity | null = entities.get(entityId) || null;

        if (!entity) {
            client.emit(Events.BadRequest);

            return;
        }
        else if (entity.owner !== auth) {
            client.emit(Events.NotAuthorized);

            return;
        }

        socket.emit(Events.StopEntity, entityId);
    });

    client.on(Events.Disconnect, () => {
        console.log("Client disconnected");
    });
});
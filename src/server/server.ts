import SocketIO from "socket.io";
import {UniqueId, IAuthCredentials} from "../public-api/account";
import {Events} from "../public-api/events";
import {SpecialUniqueIds} from "./network/structures";
import {IWorldVector, IWorldEntity, EntityType, IVector, IWorldTerrain, TerrainType} from "../public-api/entities";
import Game from "./core/game";
import http, {Server} from "http";
import path from "path";
import express from "express";
import {OriginVector} from "./core/constants";
import TerrainGenerator from "./terrain-generator/terrain-generator";

const port: number = parseInt(process.env.PORT as string) || 80;
const clientRoot: string = path.join(__dirname, "../../", "client");

const app: express.Express = express();
const server: Server = http.createServer(app);
const socket: SocketIO.Server = SocketIO(server);

// Routes
app.use(express.static(clientRoot));

// Data/Local Cache
const entities: Map<UniqueId, IWorldEntity> = new Map();
const terrains: Map<string, IWorldTerrain> = new Map();

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
        client.emit(Events.Reset);

        // Create initial drone
        registerEntity(Game.createEntity(EntityType.Drone, auth, OriginVector));

        // Create debugging terrain
        registerTerrain(Game.createTerrain(TerrainType.Stone, {
            x: 2,
            y: 2,

            // TODO:
            zone: 0
        }));
    });

    client.on(Events.SpawnEntity, (type: EntityType, position: IWorldVector) => {
        if (!auth) {
            client.emit(Events.NotAuthorized);

            return;
        }
        else if (!Object.values(EntityType).includes(type)) {
            client.emit(Events.BadRequest);

            return;
        }

        registerEntity(Game.createEntity(type, auth, position));
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

function registerEntity(entity: IWorldEntity): void {
    entities.set(entity.id, entity);
    socket.emit(Events.SpawnEntity, entity);
}

function registerTerrain(terrain: IWorldTerrain): void {
    terrains.set(terrain.id, terrain);
    socket.emit(Events.SpawnTerrain, terrain);
}

server.listen(port);
console.log(`Server listening on port ${port}`);
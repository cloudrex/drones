import SocketIO from "socket.io";
import {UniqueId, IAuthCredentials} from "../shared/account";
import {Events} from "../public-api/events";
import {SpecialUniqueIds} from "./network/structures";
import {IWorldVector, IWorldEntity, EntityType} from "../shared/entities";
import Game from "./core/game";
import {CenterOriginVector} from "./core/constants";
import http from "http";
import fs from "fs";
import path from "path";

const app = http.createServer(handler);
const port: number = parseInt(process.env.PORT as string) || 80;
const socket: SocketIO.Server = SocketIO(app);
const index: any = fs.readFileSync(path.join(__dirname, "../../", "client", "index.html"));
const gameFile: any = fs.readFileSync(path.join(__dirname, "../../", "client", "game.js"));
const styleFile: any = fs.readFileSync(path.join(__dirname, "../../", "client", "style.css"));

function handler(req: any, res: any): void {
    console.log(`=> ${req.url}`);

    if (req.url === "/core/game.js") {
        res.writeHead(200);
        res.end(gameFile);

        return;
    }
    else if (req.url === "/style.css") {
        res.writeHead(200);
        res.end(styleFile);

        return;
    }

    res.writeHead(200);
    res.end(index);
}

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

    client.on(Events.MoveEntity, (entityId: UniqueId, position: IWorldVector) => {
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

app.listen(port);
console.log(`Server listening on port ${port}`);
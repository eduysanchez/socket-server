import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import * as sockets from '../sockets/sockets';

export default class Server {
    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.listenSocket();
    }

    public static get instance(){
        return this._instance || (this._instance = new this());
    }

    private listenSocket(){
        console.log('Escuchando conecciones socket');
        this.io.on('connection', client => {

            //Connect client
            sockets.connectClient(client);
            
            //Config User
            sockets.configUser(client, this.io);

            //Message
            sockets.message(client, this.io);

            //Desconectar    
            sockets.disconnect(client);

        })
    }

    start(callback: any){
        this.httpServer.listen(this.port, callback);
    }
}
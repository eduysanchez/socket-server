import Server from "./class/server";
import router from "./routes/router";
import bodyParse from "body-parser";
import cors from 'cors';

const server = new Server();

//Cofig bodyParse
server.app.use(bodyParse.urlencoded({extended: true}));
server.app.use(bodyParse.json());

//Cors
server.app.use(cors({origin: true, credentials: true}));

//Rute server
server.app.use('/', router);

server.start( ()=> {
    console.log(`Servidor corriendo en el puerto ${ server.port }`);
})
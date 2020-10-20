import { Socket } from 'socket.io';
import SocketIO from 'socket.io';
import { UserList } from '../class/userlist';
import { User } from '../class/user';

export const usersOnline = new UserList();

export const connectClient = (client: Socket) => {

    const user = new User(client.id);
    usersOnline.add(user);

}

export const disconnect = (client: Socket) => {
    
    client.on('disconnect', () => {

        console.log('Cliente desconectado');
        usersOnline.deleteUser(client.id);

    });

}

//Listen message
export const message = (client: Socket, io: SocketIO.Server) => {
        client.on('message', (payload: {msgFrom: string, msgBody: string}) => {
            console.log('Mensaje recibido:', payload);
            io.emit('newMessage', payload);
        });
}

//ConfigUser
export const configUser = (client: Socket, io: SocketIO.Server) => {
    client.on('configUser', (payload: {name: string}, callback: Function) => {
        
        usersOnline.updateName(client.id, payload.name);

        callback({
            ok: true,
            message: `Usuario ${payload.name} configurado con exito.`
        })
        // io.emit('newMessage', payload);
    });
}
import { Socket } from 'socket.io';
import SocketIO from 'socket.io';
import { UserList } from '../class/userlist';
import { User } from '../class/user';

export const usersOnline = new UserList();

export const connectClient = (client: Socket) => {

    const user = new User(client.id);
    usersOnline.add(user);

}

export const disconnectClient = (client: Socket, io: SocketIO.Server) => {
    
    client.on('disconnect', () => {
        
        usersOnline.deleteUser(client.id);
        
        io.emit('usersOnline', usersOnline.getList() );

    });

}

//Listen message
export const message = (client: Socket, io: SocketIO.Server) => {
        client.on('message', (payload: {msgFrom: string, msgBody: string}) => {
            io.emit('newMessage', payload);
        });
}

//ConfigUser
export const configUser = (client: Socket, io: SocketIO.Server) => {
    client.on('configUser', (payload: {name: string}, callback: Function) => {
        
        usersOnline.updateName(client.id, payload.name);
        
        io.emit('usersOnline', usersOnline.getList() );

        callback({
            ok: true
        });

    });
}

//Get users list
export const userslist = (client: Socket, io: SocketIO.Server) => {
    client.on('getUserslist', () => {
        
        io.to(client.id).emit('usersOnline', usersOnline.getList() );
        
    });
}
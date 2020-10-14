import { Socket } from 'socket.io';
import SocketIO from 'socket.io';

export const disconnect = (client: Socket) => {
    
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

}

//Listen message
export const message = (client: Socket, io: SocketIO.Server) => {
        client.on('message', (payload: {de: string, cuerpo: string}) => {
            console.log('Mensaje recibido:', payload);
            io.emit('newMessage', payload);
        });
}
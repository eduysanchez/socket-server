import { User } from "./user";

export class UserList {

    public list: User[] = [];

    constructor(){}

    //Add an user
    public add(user: User){
        this.list.push(user);
        console.log(this.list);
        return user;
    }

    //Update name
    public updateName(id: string, name: string){
        for (let user of this.list) {
            if(user.id === id){
                user.name = name;
                break;
            }   
        }

        console.log('===== Actualizando Usuario =====');
        console.log(this.list);
    }

    //Get list user
    public getList(){
        return this.list;
    }

    //Get User
    public getUser(id: string){
        return this.list.find(user => user.id === id);
    }

    //Get user in room
    public getUserRoom(room: string){
        return this.list.filter( user => user.room === room);
    }

    //Delete user
    public deleteUser(id: string){
        const tmpUser = this.getUser(id);

        this.list = this.list.filter(user => user.id !== id);

        return tmpUser;
    }
}
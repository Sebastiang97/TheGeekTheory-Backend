import { User } from "../Domain/User";
import { UserService } from "../Domain/UserService";


export class UpdateUser {
    constructor(private userService: UserService) { }

    async execute(users: User[]): Promise<User[] | null> {
        // const usersUploads: User[] = []
        // for (const user of users) {
        //     let userEnt: any = {
        //         ...user
        //     }
        //     delete userEnt.id;
        //     const userUpload = await this.userService.update(user.id, userEnt);
        //     if(userUpload != null){
        //         usersUploads.push(userUpload)
        //     }
        // }
        
        // return Promise.resolve(usersUploads)
        return this.userService.updateMany(users)
    }
}
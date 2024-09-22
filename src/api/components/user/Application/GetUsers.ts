import { User } from "../Domain/User";
import { UserService } from "../Domain/UserService";

export class GetUsers {
    constructor(private userService:UserService)
    {}

    execute(): Promise<User[]>{
        return this.userService.findAll()
    }
}
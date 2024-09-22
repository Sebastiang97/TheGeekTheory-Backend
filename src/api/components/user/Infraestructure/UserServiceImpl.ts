import { PrismaRepository } from "../../../../store/prisma/PrismaRepository";
import { BaseServiceImpl } from "../../common/Infrastructure/ServiceImpl/BaseServiceImpl";
import { User } from "../Domain/User";
import { UserService } from "../Domain/UserService";


export class UserServiceImpl extends BaseServiceImpl<User> implements UserService{

    constructor(prismaRepository: PrismaRepository<User>){
        super(prismaRepository)
    }

}
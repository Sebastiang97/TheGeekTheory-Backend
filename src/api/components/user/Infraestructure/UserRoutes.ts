import { Router } from "express";
import { User } from "../Domain/User";
import { getRepo } from "../../common/Infrastructure/GetRepo";
import { UserServiceImpl } from "./UserServiceImpl";
import { UserController } from "./User.controller";
// import { AuthMiddleware } from "../../auth/infraestructure/AuthMiddleware";


// let router = baseRoutes("product").getRoutes()


// export default router;

export class UserRoutes{
    static get routes(): Router {
        const router = Router();
        
        const UserRepository = getRepo<User>("user")

        const userServiceImpl = new UserServiceImpl(UserRepository)

        const userController = new UserController(userServiceImpl)

        router.get("/", userController.list)

        router.get("/:id", userController.getById)

        router.put("/updateUsers", userController.update)
        
        return router
    }
}
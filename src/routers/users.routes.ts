import { Router } from "express";
import { createUsersController } from "../controllers/users.controllers";
import {emailAlreadyRegistered,VerifyUserById} from "../middlewares/users.middlewares"
import {validateToken} from "../middlewares/valideteToken.middlewares"
import {getUserController, getUserLoggedController,updateUsersController, deleteUserController,activeUserController} from "../controllers/users.controllers"

const userRoutes : Router = Router()

userRoutes.post('',emailAlreadyRegistered, createUsersController)
userRoutes.get('',validateToken, getUserController )
userRoutes.get('/profile',validateToken, getUserLoggedController )
userRoutes.patch('/:id',validateToken,VerifyUserById, updateUsersController )
userRoutes.delete('/:id',validateToken,VerifyUserById, deleteUserController )
userRoutes.put('/:id',validateToken,VerifyUserById, activeUserController )

export default userRoutes
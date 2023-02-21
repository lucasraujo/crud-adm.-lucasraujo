import { Router } from "express";
import {userLoginController} from "../controllers/login.controllers"

const loginRoutes : Router = Router()

loginRoutes.post("", userLoginController )


export default loginRoutes
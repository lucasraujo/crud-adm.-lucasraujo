import { Request, Response } from "express";
import { iLoginRequest } from "../interfaces/login.interfaces";
import { loginServices } from "../services/login/login.services"

const userLoginController = async (request : Request, response : Response) : Promise<Response>=> {


      const TOKEN = await loginServices(request.body )

    return  response.json({token:TOKEN})

}


export {userLoginController}
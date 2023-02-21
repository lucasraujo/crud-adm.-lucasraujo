import { NextFunction, Request, Response } from "express";
import {AppError} from "../error"
import jwt from "jsonwebtoken"
const validateToken = async (request : Request , response : Response, next : NextFunction) : Promise<Response | void> => {

    let token = request.headers.authorization

    if(!token ){
        throw new AppError('token is missing', 403)
    }

    token = token.split(" ")[1]


    jwt.verify(token,  process.env.SECRETKEY! , (error, decoded: any )=>{
        if(error){
            throw new AppError(error.message, 401)
        }

        request.user = {
            id: Number(decoded.sub),
            admin : decoded.admin
        }

        return next()
    } )


}

export {validateToken}
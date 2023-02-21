import { NextFunction, Request, Response } from "express";
import { QueryConfig } from "pg";
import {client} from "../database/"
import {AppError} from "../error"

const emailAlreadyRegistered = async (request : Request, response : Response, next: NextFunction):  Promise<Response | void> => {

    const emailRequest : string = request.body.email

    const query : string = `
    SELECT 
        * 
    FROM 
        users
    WHERE 
       users.email = $1
    `  
    const queryConfig : QueryConfig ={
        text: query,
        values: [emailRequest]
    }

    const queryResult  = await client.query(queryConfig)

    if(queryResult.rowCount > 0){
        throw new AppError( "E-mail already registered" , 409 )
    }

    return next()

}

const VerifyUserById = async (request : Request, response : Response, next: NextFunction):  Promise<Response | void> => {

    const idParam: string = request.params.id

    const query : string = `
    SELECT 
        * 
    FROM 
        users
    WHERE 
       users.id = $1
    `  
    const queryConfig : QueryConfig ={
        text: query,
        values: [idParam]
    }

    const queryResult  = await client.query(queryConfig)

    if(queryResult.rowCount === 0){
        throw new AppError( "User not found" , 404 )
    }

    return next()

}

export {emailAlreadyRegistered,VerifyUserById}
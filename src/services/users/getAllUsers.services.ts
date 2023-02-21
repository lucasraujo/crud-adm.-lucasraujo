import { Request } from "express"
import { QueryResult } from "pg"
import { client } from "../../database"
import {AppError} from "../../error"


const getAllUsersServices = async (request :Request) =>{

   let admin = request.user.admin 

     if (!admin ){ 
         throw new AppError("Insufficient Permission" , 403)
     }

    const query = `
    SELECT 
        * 
    FROM 
    users;
    
    `
    const queryResult : QueryResult  = await client.query(query)


    return queryResult.rows 

}

export {getAllUsersServices}
import { Request } from "express"
import { QueryConfig, QueryResult } from "pg"
import { client } from "../../database"
import {AppError} from "../../error"


const getUsersLoggedServices = async (request :Request) =>{

   let id : number = request.user.id


    const query = `
    SELECT 
        * 
    FROM
    users
    WHERE 
    users.id = $1
    ;
    
    `
   const queryConfig : QueryConfig = {
    text: query,
    values: [id]
   }


    const queryResult : QueryResult  = await client.query(queryConfig)


    return queryResult.rows[0] 

}

export {getUsersLoggedServices}
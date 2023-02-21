import { Request } from "express"
import { QueryConfig, QueryResult } from "pg"
import { AppError } from "../../error"
import { client } from "../../database";

const activeUserServices = async (request : Request ) =>{

    const userId  = request.user.id
    const admin = request.user.admin
    const idParam = Number(request.params.id)

    if(admin === false && userId != idParam ){
        throw new AppError("Insufficient Permission", 403)
    }


    const queryVerifyUser : string =`
    SELECT 
        * 
    FROM 
        users
    WHERE
        users.id = $1;

    `
    const queryConfigVerifyUser : QueryConfig = {
        text: queryVerifyUser,
        values:[idParam]
    }

    const queryResultVerifyUser = await client.query(queryConfigVerifyUser)

    const userActive = queryResultVerifyUser.rows[0].active

    if(userActive === true){
        throw new AppError("User already active",400)
    }

    const query : string = `
    
    UPDATE 
        users
    SET
        (active) = ROW(true)
    WHERE
        users.id = $1
    RETURNING 
        *;
    
    `
    const queryConfig : QueryConfig = {
        text: query,
        values:[idParam]
    }

    const queryResult = await client.query(queryConfig)

    return queryResult.rows

}

export {activeUserServices}
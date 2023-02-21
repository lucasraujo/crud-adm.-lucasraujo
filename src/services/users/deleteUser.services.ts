import { Request } from "express"
import { QueryConfig } from "pg"
import { client } from "../../database"
import { AppError } from "../../error"

const deleteUserServices = async (request : Request ) =>{

    const userId  = request.user.id
    const admin = request.user.admin
    const idParam = Number(request.params.id)

    if(admin === false && userId != idParam ){
        throw new AppError("Insufficient Permission", 403)
    }

    const query : string = `
    
    UPDATE 
        users
    SET
        (active) = ROW(false)
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

export {deleteUserServices}
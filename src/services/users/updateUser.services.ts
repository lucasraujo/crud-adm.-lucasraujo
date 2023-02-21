import { Request } from "express";
import{updateUsersSchema} from "../../schemas/users.schemas"
import{AppError}from "../../error"
import format from "pg-format";
import { QueryConfig, QueryResult } from "pg";
import { client } from "../../database";

const updateUsersServices = async (request : Request) => {

    const validetedBody = updateUsersSchema.parse(request.body)
    const userId  = request.user.id
    const admin = request.user.admin
    const idParam = Number(request.params.id)

    if(admin === false && userId != idParam ){
        throw new AppError("Insufficient Permission", 403)
    }

    const query : string = format(`
    
    UPDATE 
        users
    SET
        (%I) = ROW(%L)
    WHERE
        users.id = $1
    RETURNING 
        *;
    
    `, Object.keys(validetedBody), Object.values(validetedBody))

    const queryConfig : QueryConfig ={
        text : query,
        values: [idParam]
    }

    const queryResult : QueryResult = await client.query(queryConfig)

    return queryResult.rows 


}

export {updateUsersServices}
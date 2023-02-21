import format from "pg-format";
import { client } from "../../database";
import { iCreateUserRequestBody } from "../../interfaces/users.interfaces";
import {createUsersSchema} from "../../schemas/users.schemas"


const createUserService = async(body: iCreateUserRequestBody ) => {

    let  validatedBody = createUsersSchema.parse(body)

    const query :string = format(`
    INSERT INTO users(%I) VALUES(%L)
    RETURNING *

    `, Object.keys(validatedBody), Object.values(validatedBody) )

    const queryResult =await client.query(query)

    return queryResult.rows[0]
}

export default createUserService;
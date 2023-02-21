import { QueryConfig, QueryResult } from "pg";
import { iLoginRequest } from "../../interfaces/login.interfaces";
import {client} from "../../database"
import {AppError} from "../../error"
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken"
import "dotenv/config"
import { loginSchema } from "../../schemas/login.schemas";
const loginServices = async (loginData: iLoginRequest) : Promise<string> => { 

    let validatedBodyByZod = loginSchema.parse(loginData)

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
        values : [validatedBodyByZod.email]
    }

    const queryResult : QueryResult = await client.query(queryConfig)

    if( queryResult.rowCount === 0 ){ 
        throw new AppError("Wrong email or password",401 )
    }

    if(queryResult.rows[0].actve === false){
        throw new AppError("user is not active",403 )
    }

    const matchPassword : boolean = await compare(validatedBodyByZod.password, queryResult.rows[0].password )

    if(!matchPassword){
        throw new AppError("Wrong email or password",401 )
    }



    const token : string = jwt.sign({
        admin : queryResult.rows[0].admin
    },
    process.env.SECRETKEY!,
    {
        expiresIn: "24h",
        subject  : queryResult.rows[0].id.toString()

    })


    return token

}

export {loginServices}
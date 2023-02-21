import { hashSync } from 'bcryptjs'
import {z} from 'zod'

 const createUsersSchema = z.object({
    name: z.string().max(20),
     email: z.string().email().max(100),
     admin: z.boolean().default(false),
     active: z.boolean().default(true) ,
     password: z.string().transform((pass)=>{
        return hashSync(pass,10)
    })
 })


const updateUsersSchema =z.object({
    name: z.string().max(20).optional(),
    email: z.string().email().max(100).optional(),
    admin: z.boolean().default(false).optional(),
    active: z.boolean().default(true).optional(),
    password: z.string().transform((pass)=>{
        return hashSync(pass,10)
    }).optional()

})

export{ createUsersSchema, updateUsersSchema }
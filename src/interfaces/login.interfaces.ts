import{ loginSchema }from "../schemas/login.schemas"
import z from "zod"

type iLoginRequest = z.infer <typeof loginSchema>

export {iLoginRequest }
import app from './app'
import {connectDatabase} from "./database"

app.listen(3000 ,async ()=>{
    await connectDatabase()
    console.log('server is running!')
})
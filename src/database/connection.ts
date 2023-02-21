import client from "./config"

const connectDatabase = async(): Promise<void> =>{
    await client.connect()
    console.log('Database connected!')
}

export default connectDatabase
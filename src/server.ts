import express from "express";
import router  from './router'
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import db from "./config/db";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import swaggerUi from 'swagger-ui-express'

//Conectar a la base de datos
export async function connectDB(){
    try {
        await db.authenticate()
        db.sync()
        // console.log( colors.blue('Conexion exitosa a la BD'))
    } catch (error) {
        // console.log(error)
        console.log( colors.red.bold('Hubo un error al conectar con la base de datos'))
    }
}

connectDB()

//Instancia de express
const server = express()

//Permitir conexiones 
const corsOptions : CorsOptions = {
    origin: function( origin, callback ) {
        if( origin === process.env.FRONTEND_URL || 'http://localhost:4000'){
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}
server.use(cors(corsOptions))

//Leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router) 

server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))


export default server    

//PRUEBA DE VER SI ESTO FUNCIONA
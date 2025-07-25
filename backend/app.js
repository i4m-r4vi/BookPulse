import express from 'express'
import dotenv from 'dotenv'
import { dbConnect } from './db/db.js'
import bodyParser from 'body-parser'
import cors from 'cors'


dotenv.config()

const app = express()

app.use(bodyParser.json({
    limit:'5mb'
}))
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())


const port = 3000 || process.env.PORT

app.get('/',(req,res)=>{
    res.status(200).json({message:"The App is Working"})
})

app.listen(port,()=>{
    dbConnect()
    console.log(`The App is Listening on ${port}`)
})
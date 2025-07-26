import express from 'express'
import dotenv from 'dotenv'
import { dbConnect } from './db/db.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'


dotenv.config()

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json({
    limit: '5mb'
}))
app.use(cors())
app.use(cookieParser())
app.use('/api/auth/', authRoutes)


const port = 3000 || process.env.PORT

app.get('/', (req, res) => {
    res.status(200).json({ message: "The App is Working" })
})

app.listen(port, () => {
    dbConnect()
    console.log(`The App is Listening on ${port}`)
})
import express from 'express'
import dotenv from 'dotenv'
import { dbConnect } from './db/db.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import authRoutes from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary'
import bookRoutes from './routes/book.routes.js'
import issuedRoutes from './routes/issued.routes.js'
import requestRoutes from './routes/request.routes.js'
import { swaggerDocument, swaggerUi } from './swagger.js'


dotenv.config()

const app = express()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
})




app.use(express.json({
    limit: '5mb',
}))
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))

app.use(cors({
    origin: true,
    credentials: true
}
))
app.use(cookieParser())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api/auth/', authRoutes)
app.use('/api/book', bookRoutes)
app.use('/api/issuedProcess', issuedRoutes)
app.use('/api/request', requestRoutes)

app.set('view engine', 'ejs')
app.use(express.static('public'))


const port = 3000 || process.env.PORT

app.get('/', (req, res) => {
    res.status(200).json({ message: "The App is Working" })
})

app.listen(port, () => {
    dbConnect()
    console.log(`The App is Listening on ${port}`)
})
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
import swaggerUiDist from 'swagger-ui-dist'
import * as path from "path";
import { fileURLToPath } from "url";
import YAML from 'yamljs'

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API,
    api_secret: process.env.CLOUDINARY_SECRET
})
const app = express()

app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.json({
    limit: '5mb',
}))
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))
app.use(cookieParser())
app.use('/api/auth/', authRoutes)
app.use('/api/book', bookRoutes)
app.use('/api/issuedProcess', issuedRoutes)
app.use('/api/request', requestRoutes)

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use("/swagger-ui", express.static(swaggerUiDist.absolutePath()));




const port = 3000 || process.env.PORT

app.get('/', (req, res) => {
    res.status(200).json({ message: "The App is Working" })
})

app.get("/api-docs", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "html", "swagger.html"));
});
const authDoc = YAML.load(path.join(__dirname, "docs", "auth-docs.yaml"));
const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "BookPulse API",
        version: "1.0.0",
        description: "API Docs",
    },
    servers: [
        { url:`${process.env.BACKENDURL}/api/` },
        { url: process.env.BACKENDURL },
    ],
    components: {
        securitySchemes: {
            cookieAuth: {
                type: "apiKey",
                in: "cookie",
                name: "bookpulse"
            }
        }
    },
    security: [{ cookieAuth: [] }],
    paths: { ...authDoc.paths }
};

app.get("/swagger.yaml", (req, res) => {
    res.setHeader("Content-Type", "application/yaml");
    res.send(YAML.stringify(swaggerDocument, 10));
});

app.listen(port, () => {
    dbConnect()
    console.log(`The App is Listening on ${port}`)
})
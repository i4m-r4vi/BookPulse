import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import dotenv from "dotenv";
import * as path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load all individual YAML docs
const authDoc = YAML.load(path.join(__dirname, "./docs/auth-docs.yaml"));
const bookDoc = YAML.load(path.join(__dirname, "./docs/book-docs.yaml"));
const issuedDoc = YAML.load(path.join(__dirname, "./docs/issued-docs.yaml"));
const requestDoc = YAML.load(path.join(__dirname, "./docs/request-docs.yaml"));

// Merge all paths and components into one Swagger document
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "BookPulse API",
    version: "1.0.0",
    description: "BookPulse API by Ravi",
  },
  servers: [
    { url: `${process.env.BACKENDURL}/api/` },
    { url: process.env.BACKENDURL },
  ],
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name:"bookpulse"
      },
    },
  },
  security: [
    {
      cookieAuth: [],
    },
  ],
  paths: {
    ...authDoc.paths,
    // ...bookDoc.paths,
    // ...issuedDoc.paths,
    // ...requestDoc.paths,
  },
};

export { swaggerUi, swaggerDocument };

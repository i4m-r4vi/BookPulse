import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import dotenv from 'dotenv'

dotenv.config()


const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BookPulse API",
      version: "1.0.0",
      description: "BookPulse API By Ravi",
    },
    servers: [
      {
        url: `${process.env.BACKENDURL}/api/`,
      },
    ],
  },
  apis: ["./routes/*.js"], // wherever your routes are defined
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
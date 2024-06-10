import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "BACKEND TEST CASE",
      version: "1.0.0",
      description: "Jawaban backend test case dari EIGEN",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
  },
  apis: ["../routes/*.js"], // path ke file API Anda
};

export const swaggerDocs = swaggerJSDoc(swaggerOptions);

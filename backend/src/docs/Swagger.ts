import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: "Receitas Culinárias API",
        version: "1.0.0",
        description: "API de receitas culinárias",
    },
    host: `${process.env.HOST}:${process.env.PORT}`,
    basePath: '/api/v1/',
}

export const options = {
    swaggerDefinition,
    apis: ['./**/*.yaml'],
};

export const swaggerSpec = swaggerJSDoc(options);
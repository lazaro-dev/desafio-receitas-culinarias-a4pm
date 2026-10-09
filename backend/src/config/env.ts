import z from "zod";

const schema = z.object({
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
    PORT: z.string().default('8080'),
    HOST: z.string().default('localhost'),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string()
})

const env = schema.parse(process.env)

export default env
import 'dotenv/config'
import { string, z } from 'zod'

const envSchema = z.object({
    NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
    DATABASE_URL: z.string(),
    PORT: z.coerce.number().default(3333),
    JWT_SECRET: z.coerce.string()
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false){
    console.error('Invalid environment variables')

    throw new Error ('Invalid environment variables')
}

export const env = _env.data
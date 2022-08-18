import * as dotenv from 'dotenv'

dotenv.config();

export default {
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT,

    database: {
        type: process.env.TYPEORM_CONNECTION,
        host: process.env.TYPEORM_HOST,
        port: Number.parseInt(process.env.TYPEORM_PORT as string),
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database: process.env.TYPEORM_DATABASE,
    },
};
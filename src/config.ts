require("dotenv").config()
import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
    // host: process.env.DB_HOST,
    // port: Number(process.env.DB_PORT),
    // username: process.env.DB_UN,
    // password: process.env.DB_PW,
    // database: process.env.DB_DB,
    entities: ["dist/**/*.entity{.ts,.js}"],
    synchronize: false,
    autoLoadEntities: true
};

export const jwtConstants = {
    secret: process.env.JWT_SECRET,
};
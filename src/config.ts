require("dotenv").config()
import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_UN,
    password: process.env.DB_PW,
    database: process.env.DB_DB,
    entities: [__dirname + "src/**/*.entity{.ts,.js}"],
    synchronize: true,
    autoLoadEntities: true
};

export const jwtConstants = {
    secret: process.env.JWT_SECRET,
};
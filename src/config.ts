require("dotenv").config();
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "postgres",
    url: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    entities: [__dirname + "src/**/*.entity{.ts,.js}"],
    synchronize: (process.env.NODE_ENV === "dev" ? true : false),
    autoLoadEntities: true
};

export const jwtConstants = {
    secret: process.env.JWT_SECRET,
};
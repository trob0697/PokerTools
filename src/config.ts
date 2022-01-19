import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: "postgres",
    host: "localhost",
    port: 5000,
    username: "tahreak",
    password: "",
    database: "PokerTools",
    entities: [__dirname + "src/**/*.entity{.ts,.js}"],
    synchronize: true,
    autoLoadEntities: true
};

export const jwtConstants = {
    secret: "secretKey",
};
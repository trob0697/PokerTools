import { join } from "path";
import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config";

import { PreflopchartsController } from "./preflopcharts/preflopcharts.controller";
import { PreflopchartsModule } from './preflopcharts/preflopcharts.module';
import { PreflopChartsService } from "./preflopcharts/preflopcharts.service";

import { UserModule } from './user/user.module';
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { User } from "./user/entities/user.entity";

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User]),
    PreflopchartsModule, UserModule, AuthModule],
  controllers: [PreflopchartsController, UserController],
  providers: [PreflopChartsService, UserService],
})
export class AppModule {}

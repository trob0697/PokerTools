import { join } from "path";
import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { typeOrmConfig } from "./config";

import { PreflopchartsController } from "./preflopcharts/preflopcharts.controller";
import { PreflopchartsModule } from "./preflopcharts/preflopcharts.module";
import { PreflopChartsService } from "./preflopcharts/preflopcharts.service";

import { UserModule } from "./user/user.module";
import { UserController } from "./user/user.controller";
import { UserService } from "./user/user.service";
import { User } from "./user/entities/user.entity";

import { AuthModule } from "./auth/auth.module";

import { EquityCalculatorModule } from "./equitycalculator/equitycalculator.module";
import { EquityCalculatorController } from "./equitycalculator/equitycalculator.controller";
import { EquityCalculatorService } from "./equitycalculator/equitycalculator.service";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "build"),
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User]),
    PreflopchartsModule, UserModule, AuthModule, EquityCalculatorModule],
  controllers: [PreflopchartsController, UserController, EquityCalculatorController],
  providers: [PreflopChartsService, UserService, EquityCalculatorService],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { PreflopchartsController } from "./preflopcharts.controller";
import { PreflopChartsService } from "./preflopcharts.service";

@Module({
    imports: [],
    controllers: [PreflopchartsController],
    providers: [PreflopChartsService]
})
export class PreflopchartsModule {}
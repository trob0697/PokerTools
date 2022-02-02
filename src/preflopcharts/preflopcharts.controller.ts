import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PreflopChartsService } from "./preflopcharts.service";

@Controller("preflop-charts")
export class PreflopchartsController {
    constructor(private preflopChartsService: PreflopChartsService) {}

    @UseGuards(JwtAuthGuard)
    @Get("chart")
    async getSpecificChart(@Query() query): Promise<JSON>{
        const { chart, scenario, villain, hero } = query;
        return this.preflopChartsService.getChart(chart, scenario, villain, hero);
    }
}

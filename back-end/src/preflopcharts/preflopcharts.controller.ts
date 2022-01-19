import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { PreflopChartsService } from "./preflopcharts.service";

@Controller("preflop-charts")
export class PreflopchartsController {
    constructor(private preflopChartsService: PreflopChartsService) {}

    @UseGuards(JwtAuthGuard)
    @Get("all")
    async getAllCharts(): Promise<JSON>{
        return this.preflopChartsService.getAllCharts();
    }

    @UseGuards(JwtAuthGuard)
    @Get("query")
    async getSpecificChart(@Query() query): Promise<JSON>{
        const { game, scenario, villain, hero } = query;
        return this.preflopChartsService.getChart(game, scenario, villain, hero);
    }
}
import { Controller, Get, HttpException, HttpStatus, UseGuards, Request, Post, Delete } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import jwt_decode from "jwt-decode";
import { PreflopChartsService } from "./preflopcharts.service";

@Controller("preflop-charts")
export class PreflopchartsController {
    constructor(private preflopChartsService: PreflopChartsService) {}
/*
    @UseGuards(JwtAuthGuard)
    @Post("add-chart")
    async addChart(@Request() req){
        try{
            const user = jwt_decode(req.headers.authorization.split(" ")[1]);
            if(!user || !user["verified"] || !user["active"])
                throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);

            if(JSON.parse(await this.preflopChartsService.getUsersCharts(user["id"])).length >= 5)
                throw new HttpException("Maximum amount of charts for this user has been reached", HttpStatus.NOT_ACCEPTABLE);
            if(!await this.preflopChartsService.validateChartName(user["id"], req.body.folder))
                throw new HttpException("This chart name is already taken", HttpStatus.NOT_ACCEPTABLE);

            const rawData = await this.preflopChartsService.parseChartData(req.body.folder);
            await this.preflopChartsService.uploadChartData(user["id"], "", rawData);

            return new HttpException("Chart Added", HttpStatus.CREATED);
        }
        catch(e){
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }
*/
    @UseGuards(JwtAuthGuard)
    @Delete("delete-chart")
    async deleteChart(@Request() req){
        try{
            const user = jwt_decode(req.headers.authorization.split(" ")[1]);
            if(!user || !user["verified"] || !user["active"])
                throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);

            if(user["id"] === 1)
                throw new HttpException("Super user cannot be modified", HttpStatus.UNAUTHORIZED);
            
            await this.preflopChartsService.deleteChart(user["id"], req.body.name);

            return new HttpException("Chart Deleted", HttpStatus.ACCEPTED);
        }
        catch(e){
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get("users-charts")
    async usersCharts(@Request() req){
        try{
            const user = jwt_decode(req.headers.authorization.split(" ")[1]);
            if(!user || !user["verified"] || !user["active"])
                throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);
            
            return await this.preflopChartsService.getUsersCharts(user["id"]);
        }
        catch(e){
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post("chart-data")
    async chartData(@Request() req){
        try{
            const user = jwt_decode(req.headers.authorization.split(" ")[1]);
            if(!user || !user["verified"] || !user["active"])
                throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);

            const { name, scenario, villain, hero } = req.body;

            return await this.preflopChartsService.getChartData(user["id"], name, scenario, villain, hero);
        }
        catch(e){
            throw new HttpException(e, HttpStatus.BAD_REQUEST);
        }
    }
}

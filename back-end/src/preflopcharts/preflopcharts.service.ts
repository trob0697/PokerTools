import { Injectable } from "@nestjs/common";
const data =  require("./data.json");

@Injectable()
export class PreflopChartsService{
    getAllCharts(){
        return data;
    }

    getChart(game: string, scenario: string, villain: string, hero: string){
        return data[game][scenario][villain][hero];
    }
}
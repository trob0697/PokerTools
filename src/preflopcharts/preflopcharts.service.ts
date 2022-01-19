import { Injectable } from "@nestjs/common";
import * as data from "./data.json"

@Injectable()
export class PreflopChartsService{
    getAllCharts(){
        return data;
    }

    getChart(game: string, scenario: string, villain: string, hero: string){
        return data[game][scenario][villain][hero];
    }
}
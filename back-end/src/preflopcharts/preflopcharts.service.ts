import { Injectable } from "@nestjs/common";
import * as upswingData from "./data/upswingData.json";
import * as carrotCornerData from "./data/carrotCornerData.json";

@Injectable()
export class PreflopChartsService{
    getChart(chart: string, scenario: string, villain: string, hero: string){
        if(chart === "UpswingPoker")
            return upswingData[scenario][villain][hero];
        else if(chart === "CarrotCorner")
            return carrotCornerData[scenario][villain][hero];
        else
            return null;
    }
}
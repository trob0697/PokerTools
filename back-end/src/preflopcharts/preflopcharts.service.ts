import { Injectable } from "@nestjs/common";
import { getConnection } from "typeorm";
import { Chart } from "./entities/chart.entity";

@Injectable()
export class PreflopChartsService{

    async validateChartName(ownderId: number, name: string): Promise<boolean>{
        const count = await getConnection().createQueryBuilder()
            .select("chart")
            .from(Chart, "chart")
            .where("owner_id = :id AND name = :name", { id: ownderId, name: name })
            .getCount(); 

        return count === 0;
    }

    async parseChartData(data: any): Promise<JSON | any>{
        
    }

    async uploadChartData(ownerId: number, chartName: string, chartData: object): Promise<void>{
        const chart = new Chart();
        chart.owner_id = ownerId;
        chart.name = chartName;
        chart.tabs = JSON.stringify(Object.keys(chartData));
        chart.data = JSON.stringify(chartData);
        await chart.save();
    }

    async deleteChart(ownderId: number, name: string): Promise<void>{
        await getConnection().createQueryBuilder()
            .delete()
            .from(Chart, "chart")
            .where("owner_id = :id AND name = :name", { id: ownderId, name: name })
            .execute();
    }

    async getUsersCharts(ownderId: number): Promise<string>{
        const charts = await getConnection().createQueryBuilder()
            .select(["chart.name", "chart.tabs"])
            .from(Chart, "chart")
            .where("owner_id = :id", { id: ownderId })
            .getMany();      

        return JSON.stringify(charts);
    }

    async getChartData(ownderId: number, name: string, scenario: string, villain: string, hero: string): Promise<string>{
        const chart = await getConnection().createQueryBuilder()
            .select("chart")
            .from(Chart, "chart")
            .where("owner_id = :id AND name = :name", { id: ownderId, name: name })
            .getOne();
        
        const chartJson = JSON.parse(chart.data);
        const chartData = chartJson[scenario][villain][hero];

        return JSON.stringify(chartData);
    }
}
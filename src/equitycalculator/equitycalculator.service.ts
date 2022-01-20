import { Injectable } from "@nestjs/common";
import { calculateEquity } from "poker-odds"

@Injectable()
export class EquityCalculatorService {
    calculateEquities(players, board){
        const playersArr = JSON.parse(players);
        const boardArr = JSON.parse(board)
        const iterations = 10000;
        const exhaustive = false;
        
        playersArr.forEach((player, i) => {
            if(player.length === 4)
                playersArr[i] = [player.substring(0, 2), player.substring(2)];
            else
                console.log(); //Handle range
        });

        let data = calculateEquity(playersArr, boardArr, iterations, exhaustive);
        let count = data[0].count;
        let res = []

        data.forEach((item) => {
            let eq = Number((item.wins/count*100).toFixed(1));
            res.push(eq);
        });
        
        return res;
    }
}

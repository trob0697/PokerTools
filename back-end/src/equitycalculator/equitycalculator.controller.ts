import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { EquityCalculatorService } from "./equitycalculator.service";

@Controller("equity-calculator")
export class EquityCalculatorController {
  constructor(private readonly equityCalculatorService: EquityCalculatorService) {}

  @UseGuards(JwtAuthGuard)
  @Post("calculate")
  async calculate(@Body() body): Promise<any>{
    const { players, board } = body;
    let res = this.equityCalculatorService.calculateEquities(players, board);
    return res;
  }
}

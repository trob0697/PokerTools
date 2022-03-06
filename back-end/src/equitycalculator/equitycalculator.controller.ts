import { Request, Controller, HttpException, HttpStatus, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import jwt_decode from "jwt-decode";
import { EquityCalculatorService } from "./equitycalculator.service";

@Controller("equity-calculator")
export class EquityCalculatorController {
  constructor(private readonly equityCalculatorService: EquityCalculatorService) {}

  @UseGuards(JwtAuthGuard)
  @Post("calculate")
  async calculate(@Request() req): Promise<any>{
    try{
      const user = jwt_decode(req.headers.authorization.split(" ")[1]);
      if(!user || !user["verified"] || !user["active"])
          throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);

      const { players, board } = req.body;
      let res = this.equityCalculatorService.calculateEquities(players, board);
      return res;
    }
    catch(e){
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}

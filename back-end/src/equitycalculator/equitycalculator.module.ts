import { Module } from "@nestjs/common";
import { EquityCalculatorService } from "./equitycalculator.service";
import { EquityCalculatorController } from "./equitycalculator.controller";

@Module({
  controllers: [EquityCalculatorController],
  providers: [EquityCalculatorService]
})
export class EquityCalculatorModule {}

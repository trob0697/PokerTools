import { forwardRef, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";

import { UserModule } from "src/user/user.module";

import { jwtConstants } from "src/config";

@Module({
  imports: [forwardRef(() => UserModule), PassportModule, JwtModule.register({
    secret: jwtConstants.secret,
    signOptions: { expiresIn: "1d" }
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}

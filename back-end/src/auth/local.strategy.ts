import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authSerice: AuthService){
        super({ usernameField: "email" });
    }

    async validate(email: string, password: string): Promise<any> {
        const user = await this.authSerice.validateUser(email, password);
        if(!user){
            throw new HttpException("Login failed", HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}
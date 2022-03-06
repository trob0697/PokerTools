import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UserService
    ){}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findOneUserByEmail(email);
        if(user && await bcrypt.compare(password, user.password)){
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);
        if(!user.verified)
            throw "Please verify your email address";
        return {
            ...user,
            access_token: this.jwtService.sign(user)
        };
    }
}

import { Body, Controller, HttpException, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { LocalAuthGuard } from "src/auth/local-auth.guards";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Post("register")
  async register(@Body() body): Promise<any>{
    const { email, username, password, password2 } = body;
    if(await this.userService.userUniqueValidation(email, username))
      throw new HttpException("This email and/or username is taken", HttpStatus.CONFLICT);
    if(password !== password2)
      throw new HttpException("The passwords do not match", HttpStatus.FORBIDDEN);
    if(await this.userService.userRegistration(email, username, password))
      return new HttpException("Account created", HttpStatus.CREATED);
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }
}

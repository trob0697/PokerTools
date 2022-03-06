import { Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { LocalAuthGuard } from "src/auth/local-auth.guards";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import jwt_decode from "jwt-decode";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor( private readonly userService: UserService, private readonly authService: AuthService ) {}

  @Post("register")
  async register(@Request() req){
    try{
      const { email, password, password2 } = req.body;
      if(await this.userService.userUniqueValidation(email))
        throw new HttpException("This email is taken", HttpStatus.CONFLICT);
      if(password !== password2)
        throw new HttpException("The passwords do not match", HttpStatus.FORBIDDEN);
      if(await this.userService.userRegistration(email, password))
        return new HttpException("Account created", HttpStatus.CREATED);
    }
    catch(e){
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req) {
    try{
      const { email, password } = req.body;
      return await this.authService.login(email, password);
    }
    catch(e){
      throw new HttpException(e, HttpStatus.UNAUTHORIZED);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post("change-email")
  async changeEmail(@Request() req){
    try{
      const user = jwt_decode(req.headers.authorization.split(" ")[1]);
      if(!user || !user["verified"] || !user["active"])
          throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);

      if(user["id"] === 1)
        throw new HttpException("Super user cannot be modified", HttpStatus.UNAUTHORIZED);
      
      const { newEmail, password } = req.body;
      
      await this.userService.changeEmail(user["id"], newEmail, password);
    }
    catch(e){
        throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post("change-password")
  async changePassword(@Request() req){
    try{
      const user = jwt_decode(req.headers.authorization.split(" ")[1]);
      if(!user || !user["verified"] || !user["active"])
          throw new HttpException("Unauthorized", HttpStatus.UNAUTHORIZED);

      if(user["id"] === 1)
        throw new HttpException("Super user cannot be modified", HttpStatus.UNAUTHORIZED);
      
      const { password, newPassword } = req.body;
      
      await this.userService.changePassword(user["id"], password, newPassword);
    }
    catch(e){
        throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

/*
  @Post("verify")
  async verify(@Request() req){
    try{
      const { id } = req.id;
      await this.userService.verifyUser(id);
    }
    catch(e){
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  @Post("activate")
  async activate(@Request() req){
    try{
      const { id } = req.id;
      await this.userService.activateUser(id);
    }
    catch(e){
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }*/

  /*
  @Get("all-users")
  async getAllUsers(){
    try{
      return await this.userService.getAllUsers();
    }
    catch(e){
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
  */
}

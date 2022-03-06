import { Injectable } from "@nestjs/common";
import { getConnection } from "typeorm";
import { User } from "./entities/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  async userUniqueValidation(email: string): Promise<boolean> {
    const count = await getConnection().createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("email = :email", { email: email })
      .getCount();

    return count === 0;
  }

  async userRegistration(email: string, password: string): Promise<User | undefined>{
    const user = new User();
    user.email = email;
    user.password = password;
    return await user.save();
  }

  async findOneUserByEmail(email: string): Promise<User | undefined>{
    const user = await getConnection().createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("email = :email", { email: email })
      .getOne();
    
    return user;
  }

  async findOneUserById(id: number): Promise<User | undefined>{
    const user = await getConnection().createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("id = :id", { id: id })
      .getOne();
    
    return user;
  }

  async changeEmail(id: number, newEmail: string, password: string): Promise<void>{
    const user = await this.findOneUserById(id);
    if(user && await this.userUniqueValidation(newEmail) && await bcrypt.compare(password, user.password)){
      user.email = newEmail;
      user.verified = false;
      user.save();
    }
  }

  async changePassword(id: number, password: string, newPassword: string): Promise<void>{
    const user = await this.findOneUserById(id);
    if(user && await bcrypt.compare(password, user.password)){
      user.setPassword(newPassword);
      user.save();
    }
  }

  async verifyUser(id: number): Promise<void>{
    const user = await getConnection().createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("id = :id", { id: id })
      .getOne();

    user.verified = true;
    await user.save();
  }

  async activateUser(id: number): Promise<void>{
    const user = await getConnection().createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("id = :id", { id: id })
      .getOne();

    user.active = true;
    await user.save();
  }

  async getAllUsers(): Promise<any>{
    const users = await getConnection().createQueryBuilder()
      .select("user")
      .from(User, "user")
      .getMany();

    return users;
  }
}

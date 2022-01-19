import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){ }

  async userUniqueValidation(email: string, username: string): Promise<any> {
    return await this.userRepository.count({ where: [{ email: email }, { username: username}]})
  }

  async userRegistration(email: string, username: string, password: string): Promise<User>{
    const user = new User();
    user.email = email;
    user.username = username;
    user.password = password;
    return await user.save();
  }

  async findOne(email: string): Promise<User | undefined>{
    return await this.userRepository.findOne({where: { email: email }})
  }
}

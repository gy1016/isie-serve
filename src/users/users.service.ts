import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  // 用户是否存在
  async findOne(username: string) {
    const isExist = await this.usersRepository.findOne({ where: { username } });
    return isExist;
  }

  // 创建用户
  async register(user: Partial<UsersEntity>): Promise<UsersEntity> {
    const { username } = user;
    const isExist = await this.findOne(username);
    if (isExist) {
      throw new HttpException('用户名已存在！', 401);
    }
    return await this.usersRepository.save(user);
  }

  // 用户登录
  async login(user: Partial<UsersEntity>): Promise<UsersEntity> {
    const { username, password } = user;
    const isUserExist = await this.findOne(username);
    if (isUserExist) {
      const { password: dbPassword } = isUserExist;
      if (password === dbPassword) {
        return isUserExist;
      } else {
        throw new HttpException('密码错误！', 401);
      }
    } else {
      throw new HttpException('用户名不存在！', 401);
    }
  }
}

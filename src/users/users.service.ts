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

  // 创建用户
  async create(user: Partial<UsersEntity>): Promise<UsersEntity> {
    const { username } = user;
    const isExist = await this.usersRepository.findOne({ where: { username } });
    if (isExist) {
      throw new HttpException('用户名已存在！', 401);
    }
    return await this.usersRepository.save(user);
  }
}

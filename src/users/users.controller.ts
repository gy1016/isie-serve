import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user';
import { Body, Controller, Post } from '@nestjs/common';

@ApiTags('用户')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /**
   * 创建用户
   * @param user
   */
  @ApiOperation({ summary: '创建用户' })
  @Post('create')
  async create(@Body() user: CreateUserDto) {
    return await this.usersService.create(user);
  }
}

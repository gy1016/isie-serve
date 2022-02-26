import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('用户')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  /**
   * 创建用户
   * @param user
   */
  @ApiOperation({ summary: '创建用户' })
  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return await this.usersService.register(user);
  }

  /**
   * 用户登录
   * @param user
   */
  @ApiOperation({ summary: '用户登陆' })
  @Post('login')
  async login(@Body() user: LoginUserDto) {
    return await this.usersService.login(user);
  }

  /**
   * 用户信息
   * @param user
   */
  @ApiOperation({ summary: '用户信息' })
  @UseGuards(JwtAuthGuard)
  @Post('profile')
  async profile(@Body() user: LoginUserDto) {
    return user;
  }
}

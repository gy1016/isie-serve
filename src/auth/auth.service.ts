import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UsersEntity } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      // 不给前端返回密码
      return result;
    }
    return null;
  }

  async login(user: UsersEntity) {
    // console.log('守卫返回的user是不是在这里：！！！', user);
    const payload = { username: user.username, sub: user.id };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async verify(payload: any) {
    const { password, ...user } = await this.usersService.findOne(
      payload.username,
    );
    return user;
  }
}

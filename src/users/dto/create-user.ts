import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserRoleType } from '../users.entity';

export class CreateUserDto {
  @ApiProperty({ description: '用户名' })
  @IsNotEmpty({ message: '用户名必填' })
  readonly username: string;

  @ApiProperty({ description: '密码' })
  @IsNotEmpty({ message: '密码必填' })
  readonly password: string;

  @ApiPropertyOptional({ description: '角色' })
  readonly role: UserRoleType;

  @ApiPropertyOptional({ description: '用户创建时间' })
  readonly create_time: Date;

  @ApiPropertyOptional({ description: '用户更新时间' })
  readonly update_time: Date;
}

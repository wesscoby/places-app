import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AutoMap } from 'nestjsx-automapper';

import { BaseDTO } from "../../shared";
import { Place } from "../../places";


export class User extends BaseDTO {
  @AutoMap()
  @ApiProperty()
  readonly name!: string;

  @AutoMap()
  @ApiProperty()
  readonly email!: string;

  @AutoMap()
  @ApiPropertyOptional()
  readonly avatar?: string;

  @AutoMap(() => Place)
  @ApiProperty({ type: () => [Place] })
  readonly places!: Place[];
}

export class CreateUserDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiPropertyOptional()
  readonly password?: string;

  @ApiPropertyOptional()
  readonly avatar?: string;
}


export class LoginUserDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;
}

export class UpdateUserDto {
  @ApiPropertyOptional()
  readonly name?: string;

  @ApiPropertyOptional()
  readonly avatar?: string;
}

// export type OmitPasswordUserDto = Omit<User, "password">;
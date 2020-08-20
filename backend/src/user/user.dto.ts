import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { AutoMap } from 'nestjsx-automapper';

import { BaseModelDTO } from "../shared";
import { PlaceDTO, Place } from "../places";


export class UserDTO extends BaseModelDTO {
  @AutoMap()
  @ApiProperty()
  readonly name!: string;

  @AutoMap()
  @ApiProperty()
  readonly email!: string;

  @AutoMap()
  @ApiPropertyOptional()
  readonly avatar?: string;

  @AutoMap(() => PlaceDTO)
  @ApiProperty({ type: () => [PlaceDTO] })
  readonly places!: PlaceDTO[];
}

export class CreateUserDTO {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiPropertyOptional()
  readonly password?: string;

  @ApiPropertyOptional()
  readonly avatar?: string;
}


export class LoginUserDTO {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;
}

export class UpdateUserDTO {
  @ApiPropertyOptional()
  readonly name?: string;

  @ApiPropertyOptional()
  readonly avatar?: string;
}

// export type OmitPasswordUserDto = Omit<User, "password">;
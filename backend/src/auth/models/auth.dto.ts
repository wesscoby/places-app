import { ApiProperty } from '@nestjs/swagger';

import { UserProfile } from '../../user';


export class AuthDto {
  @ApiProperty({ type: () => UserProfile })
  readonly user: UserProfile;

  @ApiProperty()
  token: string;
}
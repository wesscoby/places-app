import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AutoMap } from 'nestjsx-automapper';

import { BaseDTO } from '../../shared';
import { User } from '../../user';

export class Coordinates {
  @AutoMap()
  @ApiProperty({ description: 'Latitude' })
  readonly lat!: number;

  @AutoMap()
  @ApiProperty({ description: 'Longitude' })
  readonly lng!: number;
}

export class Place extends BaseDTO {
  @AutoMap()
  @ApiProperty()
  readonly title: string;

  @AutoMap()
  @ApiProperty()
  readonly description: string;

  @AutoMap()
  @ApiProperty()
  readonly address: string;

  @AutoMap(() => Coordinates)
  @ApiProperty({ type: Coordinates })
  readonly coordinates!: Coordinates;

  @AutoMap()
  @ApiPropertyOptional()
  readonly image?: string;

  @AutoMap(() => User)
  @ApiProperty({ type: () => User })
  readonly creator!: User;
}

export class CreatePlaceDto {
  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly address: string;

  @AutoMap(() => Coordinates)
  @ApiProperty({ type: Coordinates })
  readonly coordinates!: Coordinates;

  @AutoMap()
  @ApiPropertyOptional()
  readonly image?: string;
}

export class UpdatePlaceDto {
  @ApiPropertyOptional()
  readonly title?: string;

  @ApiPropertyOptional()
  readonly description?: string;

  @ApiPropertyOptional()
  readonly image?: string;
}
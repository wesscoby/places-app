import {
  ApiProperty, ApiPropertyOptional, OmitType, PickType, PartialType
} from '@nestjs/swagger';
import { AutoMap } from 'nestjsx-automapper';

import { User } from '../../user';

export class Coordinates {
  @AutoMap()
  @ApiProperty({ description: 'Latitude' })
  readonly lat!: number;

  @AutoMap()
  @ApiProperty({ description: 'Longitude' })
  readonly lng!: number;
}

export class Place {
  @AutoMap()
  @ApiProperty() 
  readonly id!: string;

  @AutoMap()
  @ApiProperty()
  readonly title!: string;

  @AutoMap()
  @ApiProperty()
  readonly description!: string;

  @AutoMap()
  @ApiProperty()
  readonly address!: string;

  @AutoMap(() => Coordinates)
  @ApiProperty({ type: Coordinates })
  readonly coordinates!: Coordinates;

  @AutoMap()
  @ApiPropertyOptional()
  readonly image?: string;

  @AutoMap()
  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: Date;

  @AutoMap()
  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt!: Date;

  @AutoMap(() => User)
  @ApiProperty({ type: User })
  readonly creator!: User;
}

export class CreatePlaceDto extends PickType(
  Place,
  ['title', 'description', 'address', 'coordinates', 'image'] as const
) {}

export class UpdatePlaceDto extends PartialType(
  PickType(Place, ['title', 'description', 'image'] as const)
) {}
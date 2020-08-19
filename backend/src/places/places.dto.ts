import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AutoMap } from 'nestjsx-automapper';

import { BaseModelDTO } from '../shared';

export class LocationDTO {
  @AutoMap()
  @ApiProperty({ description: 'Latitude' })
  readonly lat!: number;

  @AutoMap()
  @ApiProperty({ description: 'Longitude' })
  readonly lng!: number;
}

export class PlaceDTO extends BaseModelDTO {
  @AutoMap()
  @ApiProperty()
  readonly title: string;

  @AutoMap()
  @ApiProperty()
  readonly description: string;

  @AutoMap()
  @ApiProperty()
  readonly address: string;

  @AutoMap(() => LocationDTO)
  @ApiProperty({ type: LocationDTO })
  readonly location!: LocationDTO;

  @AutoMap()
  @ApiPropertyOptional()
  readonly image?: string;
}

export class CreatePlaceDTO {
  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly address: string;

  @AutoMap(() => LocationDTO)
  @ApiProperty({ type: LocationDTO })
  readonly location!: LocationDTO;

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
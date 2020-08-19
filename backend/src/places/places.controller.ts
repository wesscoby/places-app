import { 
  Controller, Get, Post, Body, Res, Param, 
  Patch, Delete
} from '@nestjs/common';
import { 
  ApiTags, ApiOperation, ApiCreatedResponse, ApiParam 
} from '@nestjs/swagger';
import { InjectMapper, AutoMapper } from 'nestjsx-automapper';

import { PlacesService } from './places.service';
import { Place } from './places.model';
import { PlaceDTO, CreatePlaceDTO, UpdatePlaceDto } from './places.dto';


@Controller('places')
@ApiTags('Places')
export class PlacesController {
  constructor(
    private readonly places: PlacesService,
    @InjectMapper() private readonly mapper: AutoMapper
  ) {}

  public toDto(place: Place): PlaceDTO {
    return this.mapper.map(place, PlaceDTO, Place);
  }

  public toDtoArray(places: Place[]): PlaceDTO[] {
    return this.mapper.mapArray(places, PlaceDTO, Place);
  }

  @Get(':pid')
  @ApiOperation({ summary: 'Get a specific place by ID' })
  @ApiParam({ name: 'pid', description: 'Place ID' })
  async readOne(
    @Param('pid') pid: string,
    // @Res() res: Response
  ): Promise<PlaceDTO> {
    const place = await this.places.getById(pid);
    return this.toDto(place);
  }


  // @Get('user/:uid')
  // @ApiOperation({ summary: 'Retrieve list of all places for a given user ID' })
  // @ApiParam({ name: 'uid', description: 'User ID' })
  // async readPlacesByUser(
  //   @Param('uid') uid: string
  // ) {
  //   return await { uid }
  // }


  @Get()
  @ApiOperation({ summary: 'Retrieve list of all places' })
  async readAll(): Promise<Place[]> {
    const places =  await this.places.getAll();
    return this.toDtoArray(places);
  }


  @Post()
  @ApiOperation({ summary: 'Create a new place' })
  @ApiCreatedResponse({ 
    description: 'The record has been successfully created.',
    type: PlaceDTO
  })
  async create(
    @Body() place: CreatePlaceDTO
  ): Promise<PlaceDTO> {
    const createdPlace =  await this.places.create(place);
    return this.toDto(createdPlace);
  }


  @Patch(':pid')
  @ApiOperation({ summary: 'Update a place by ID' })
  @ApiParam({ name: 'pid', description: 'Place ID' })
  // @ApiCreatedResponse({ 
  //   description: 'The record has been successfully updated.',
  //   type: Place
  // })
  async update(
    @Param('pid') pid: string,
    @Body() update: UpdatePlaceDto
  ): Promise<PlaceDTO> {
    const updated = await this.places.update(pid, update);
    return this.toDto(updated);
  }


  @Delete(':pid')
  @ApiOperation({ summary: 'Delete a place by ID' })
  @ApiParam({ name: 'pid', description: 'Place ID' })
  // @ApiCreatedResponse({ 
  //   description: 'The record has been successfully deleted.',
  //   type: Place
  // })
  async delete(
    @Param('pid') pid,
    @Res() res
  ): Promise<PlaceDTO> {
    const deleted = await this.places.delete(pid);
    return this.toDto(deleted);
  }
}

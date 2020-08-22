import { 
  Controller, Get, Post, Body, Param, 
  Patch, Delete, UseInterceptors
} from '@nestjs/common';
import { 
  ApiTags, ApiOperation, ApiCreatedResponse, ApiParam, ApiBody
} from '@nestjs/swagger';
import { InjectMapper, AutoMapper } from 'nestjsx-automapper';

import { PlacesService } from './places.service';
import { Place, Places, PlacesModel, CreatePlaceDto, UpdatePlaceDto } from './models';
import { TransformInterceptor } from '../shared';
import { Auth, ReqUser } from '../auth';


@Controller('places')
@ApiTags('Places')
@UseInterceptors(new TransformInterceptor())
export class PlacesController {
  constructor(
    private readonly places: PlacesService,
    @InjectMapper() private readonly mapper: AutoMapper
  ) {}

  public toDto(place: PlacesModel): Place {
    return this.mapper.map(place, Place, PlacesModel);
  }

  public toDtoArray(places: PlacesModel[]): Place[] {
    return this.mapper.mapArray(places, Place, PlacesModel);
  }

  @Get(':pid')
  @ApiOperation({ summary: 'Get a specific place by ID' })
  @ApiParam({ name: 'pid', description: 'Place ID' })
  async readOne(
    @Param('pid') pid: string
  ): Promise<Place> {
    const place = await this.places.getById(pid);
    return this.toDto(place);
  }


  @Get('user/:uid')
  @ApiOperation({ summary: 'Retrieve list of all places for a given user ID' })
  @ApiParam({ name: 'uid', description: 'User ID' })
  async readPlacesByUser(
    @Param('uid') uid: string
  ): Promise<Place[]> {
    const places = await this.places.getPlacesByUser(uid);
    return this.toDtoArray(places);
  }


  @Get()
  @ApiOperation({ summary: 'Retrieve list of all places' })
  async readAll(): Promise<Place[]> {
    const places = await this.places.getAll();
    return this.toDtoArray(places);
  }

  // TODO Add id of authed user as param for `this.places.create`
  @Post()
  @ApiOperation({ summary: 'Create a new place' })
  @Auth()
  @ApiBody({ type: () => CreatePlaceDto })
  @ApiCreatedResponse({ 
    description: 'The record has been successfully created.',
    type: () => Place
  })
  async create(
    @ReqUser('id') uid: string,
    @Body() place: CreatePlaceDto
  ): Promise<Place> {
    const createdPlace =  await this.places.createPlace(uid, place);
    return this.toDto(createdPlace);
  }


  @Patch(':pid')
  @Auth()
  @ApiOperation({ summary: 'Update a place by ID' })
  @ApiParam({ name: 'pid', description: 'Place ID' })
  @ApiBody({ type: () => UpdatePlaceDto })
  @ApiCreatedResponse({ 
    description: 'The record has been successfully updated.',
    type: () => Place
  })
  async update(
    @Param('pid') pid: string,
    @Body() update: UpdatePlaceDto
  ): Promise<Place> {
    const updated = await this.places.update(pid, update);
    return this.toDto(updated);
  }


  @Delete(':pid')
  @Auth()
  @ApiOperation({ summary: 'Delete a place by ID' })
  @ApiParam({ name: 'pid', description: 'Place ID' })
  @ApiCreatedResponse({ 
    description: 'The record has been successfully deleted.',
    type: () => Place
  })
  async delete(
    @Param('pid') pid
  ): Promise<any> {
    const deleted = await this.places.delete(pid);
    return this.toDto(deleted);
  }
}

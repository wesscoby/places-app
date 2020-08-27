import { 
  Controller, Get, Post, Body, Param, 
  Patch, Delete, UseInterceptors, Res, HttpStatus, UnauthorizedException
} from '@nestjs/common';
import { 
  ApiTags, ApiOperation, ApiCreatedResponse, ApiParam, ApiBody, ApiNoContentResponse, ApiNotFoundResponse
} from '@nestjs/swagger';
import { InjectMapper, AutoMapper } from 'nestjsx-automapper';

import { PlacesService } from './places.service';
import { Place, PlacesModel, CreatePlaceDto, UpdatePlaceDto } from './models';
// import { TransformInterceptor } from '../shared';
import { Auth, ReqUser, IsAdmin, isOwnPlace } from '../auth';


@Controller('places')
@ApiTags('Places')
// @UseInterceptors(new TransformInterceptor())
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

  @Get()
  @ApiOperation({ summary: 'Retrieve list of all places' })
  async readAll(): Promise<Place[]> {
    const places = await this.places.getAll();
    return this.toDtoArray(places);
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
  @ApiOperation({ summary: 'Retrieve list of all places by user' })
  @ApiParam({ name: 'uid', description: 'User ID' })
  async readPlacesByUser(
    @Param('uid') uid: string
  ): Promise<Place[]> {
    const places = await this.places.getPlacesByUser(uid);
    return this.toDtoArray(places);
  }


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
  @ApiOperation({
    summary: 'Update a place by ID (only "creator" is authorized)'
  })
  @ApiParam({ name: 'pid', description: 'Place ID' })
  @ApiBody({ type: () => UpdatePlaceDto })
  @ApiCreatedResponse({
    description: 'The record has been successfully updated.',
    type: () => Place
  })
  @Auth()
  async update(
    @ReqUser('id') uid: string,
    @Param('pid') pid: string,
    @Body() update: UpdatePlaceDto
  ): Promise<Place> {
    const place = await this.places.getById(pid);
    if(
      !isOwnPlace(uid, this.toDto(place))
    ) throw new UnauthorizedException('You cannot modify this resource');

    const updated = await this.places.updatePlace(pid, update);
    return this.toDto(updated);
  }


  @Delete(':pid')
  @ApiOperation({
    summary: 'Delete a place by ID (only an admin or "creator" is authorized)'
  })
  @ApiParam({ name: 'pid', description: 'Place ID' })
  @ApiNoContentResponse({ description: 'Successful' })
  @ApiNotFoundResponse({ description: 'Not Found' })
  @Auth()
  async delete(
    @IsAdmin() isAdmin: boolean,
    @ReqUser('id') uid: string, 
    @Param('pid') pid: string, 
    @Res() res
  ) {
    const place = await this.places.getById(pid);
    if(isAdmin || isOwnPlace(uid, this.toDto(place))) {
      await this.places.deletePlace(pid, uid);
      return res.status(HttpStatus.NO_CONTENT).json({});
    } else {
      throw new UnauthorizedException('You cannot delete this resource');
    }
  }
}

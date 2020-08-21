import { ApiProperty } from "@nestjs/swagger";
import { AutoMap } from 'nestjsx-automapper';


export class BaseDTO {
  @AutoMap()
  @ApiProperty({ type: String, format: 'date-time' })
  createdAt!: Date;

  @AutoMap()
  @ApiProperty({ type: String, format: 'date-time' })
  updatedAt!: Date;
  
  @AutoMap()
  @ApiProperty() 
  id!: string;
}
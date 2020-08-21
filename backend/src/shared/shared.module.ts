import { Module, Global } from '@nestjs/common';

import { ConfigService } from './config/';


@Global()
@Module({
  imports: [],
  providers: [ConfigService],
  exports: [ConfigService]
})
export class SharedModule {}

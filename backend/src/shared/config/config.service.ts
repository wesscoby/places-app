import { Injectable } from '@nestjs/common';
import { get } from 'config';

@Injectable()
export class ConfigService {
  public get<T>(key: string): T {
    return get<T>(key);
  }
}

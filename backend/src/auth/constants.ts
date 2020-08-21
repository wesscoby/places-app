import { ConfigService } from '../shared';


const config = new ConfigService();
const secret = config.get<string>('jwt.secret');

export const jwtConstants = { secret };
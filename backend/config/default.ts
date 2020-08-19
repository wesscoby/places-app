import { config } from 'dotenv';

config();
const { env } = process;

export default {
  app: {
    host: env.API_HOST,
    port: env.PORT
  },
  api: {
    prefix: env.API_URL_GLOBAL_PREFIX
  },
  database: {
    url: env.MONGODB_URL
  },
  bcrypt: {
    rounds: env.BCRYPT_SALT_ROUNDS
  },
  jwt: {
    secret: env.JWT_SECRET
  }
}
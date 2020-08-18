import { config } from 'dotenv';

config();
const { env } = process;

export default {
  port: env.PORT,
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
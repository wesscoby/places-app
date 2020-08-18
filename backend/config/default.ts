import { config } from 'dotenv';

config();
const { env } = process;

export default {
  env: {
    port: env.PORT,
    mongodbUrl: env.MONGODB_URL,
    bcryptSaltRounds: env.BCRYPT_SALT_ROUNDS,
    jwtSecret: env.JWT_SECRET
  }
}
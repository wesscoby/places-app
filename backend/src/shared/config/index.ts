const { env } = process;

export default () => ({
  app: {
    host: env.SERVER,
    port: env.PORT,
    client: env.CLIENT
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
})
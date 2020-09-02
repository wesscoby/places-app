import * as bcrypt from 'bcrypt';


const rounds = process.env.BCRYPT_SALT_ROUNDS;

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(parseInt(rounds));
    return await bcrypt.hash(password, salt);
  } catch(error) { 
    throw error;
  }
}

export const comparePasswords = async (
  plain: string, hashed: string
): Promise<boolean> => {
  return await bcrypt.compare(plain, hashed);
}
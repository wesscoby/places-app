import * as bcrypt from 'bcrypt';

import { ConfigService } from '../shared'; 


const config = new ConfigService();
const rounds = config.get<string>('bcrypt.rounds');

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
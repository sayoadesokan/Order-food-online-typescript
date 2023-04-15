import bcrypt from 'bcrypt';

export const generateSalt = async () => {
  return bcrypt.gensalt();
};

export const generatePassword = async (password: string, salt: string) => {
  return bcrypt.hash(password, salt);
};

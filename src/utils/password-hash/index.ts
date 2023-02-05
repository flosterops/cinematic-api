// utils
import bcrypt from "bcrypt";

export const hashPassword = (plainPassword: string): string => {
  return bcrypt.hashSync(plainPassword, 10);
};

export const comparePassword = (
  plainPassword: string,
  hashedPassword: string
): boolean => {
  return bcrypt.compareSync(plainPassword, hashedPassword);
};

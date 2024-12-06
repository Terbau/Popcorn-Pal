import { hash, verify } from "@node-rs/argon2";

/**
 * Hashes a password using Argon2.
 * @param password - The password to hash.
 * @returns The hashed password.
 */
export const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, {
    memoryCost: 19456,
    timeCost: 2,
    outputLen: 32,
    parallelism: 1,
  });
};

/**
 * Verifies a password hash using Argon2.
 * @param hash - The password hash to verify.
 * @param password - The password to verify.
 * @returns Whether the password is valid.
 */
export const verifyPasswordHash = async (
  hash: string,
  password: string,
): Promise<boolean> => {
  return await verify(hash, password);
};

/**
 * Verifies that a password meets the minimum strength requirements.
 * @param password - The password to verify.
 * @returns Whether the password meets the minimum strength requirements.
 */
export const verifyPasswordStrength = (password: string): boolean => {
  return password.length >= 8 && password.length <= 100;
};

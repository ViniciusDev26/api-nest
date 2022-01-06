import { compareSync, hashSync } from 'bcrypt';

export function encryptPassword(password: string): string {
  return hashSync(password, 10);
}

export function comparePassword(password: string, hash: string): boolean {
  return compareSync(password, hash);
}

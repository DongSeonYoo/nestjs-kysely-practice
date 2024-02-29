import { Generated } from 'kysely';

export interface UserTable {
  id: Generated<number>;
  email: string;
  name: string;
  password: string;
  address_id: number | null;
}

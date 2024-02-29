import { ColumnType, Generated } from 'kysely';

export interface AddressTable {
  id: Generated<number>;
  street: string | null;
  city: string | null;
  country: string | null;
}

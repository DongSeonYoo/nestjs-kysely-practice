import { Generated } from 'kysely';

export interface ArticleTable {
  id: Generated<number>;
  title: string;
  content: string;
}

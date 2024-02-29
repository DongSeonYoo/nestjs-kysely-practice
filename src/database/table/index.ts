import { Kysely } from 'kysely';
import { AddressTable } from './address.table';
import { ArticleTable } from './article.table';
import { CategorieArticleTable } from './category-article.table';
import { CategorieTable } from './category.table';
import { CommentsTable } from './comment.table';
import { UserTable } from './user.table';

export interface Tables {
  user: UserTable;
  article: ArticleTable;
  address: AddressTable;
  category: CategorieTable;
  categoryArticle: CategorieArticleTable;
  comment: CommentsTable;
}

export class Database extends Kysely<Tables> {}

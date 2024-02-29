import { Injectable } from '@nestjs/common';
import { Database } from 'src/database/table';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';

@Injectable()
export class ArticleRepository {
  constructor(private readonly database: Database) {}

  async getAll() {
    const response = await this.database
      .selectFrom('article')
      .selectAll()
      .execute();

    return response;
  }

  async getArticleById(id: number) {
    const response = await this.database
      .selectFrom('article')
      .where('id', '=', id)
      .selectAll()
      .executeTakeFirst();

    return response;
  }

  async createArticle(data: CreateArticleDto) {
    const createdArticle = await this.database
      .insertInto('article')
      .values({
        title: data.title,
        content: data.content,
      })
      .returning('article.id')
      .executeTakeFirstOrThrow();

    return createdArticle.id;
  }

  async updateArticle(articleId: number, data: UpdateArticleDto) {
    return this.database
      .updateTable('article')
      .set({
        title: data.title,
        content: data.content,
      })
      .where('id', '=', articleId)
      .executeTakeFirstOrThrow();
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { ArticleRepository } from './article.repository';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  async getAll() {
    const articleList = await this.articleRepository.getAll();

    return articleList;
  }

  async getArticleById(articleId: number) {
    const article = await this.articleRepository.getArticleById(articleId);

    if (!article) {
      throw new BadRequestException('article이 존재하지 않습니다');
    }

    return article;
  }

  async createArticle(createArticleDto: CreateArticleDto) {
    const articleId =
      await this.articleRepository.createArticle(createArticleDto);

    return articleId;
  }

  async updateArticle(articleId: number, updateArticleDto: UpdateArticleDto) {
    return this.articleRepository.updateArticle(articleId, updateArticleDto);
  }
}

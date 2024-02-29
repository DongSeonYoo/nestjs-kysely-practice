import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/list')
  getArticleList() {
    return this.articleService.getAll();
  }

  @Get('/:articldId')
  getArticleById(@Param('articleId') articleId: number) {
    return this.articleService.getArticleById(articleId);
  }

  @Post('')
  createArticle(@Body() articleDto: CreateArticleDto) {
    return this.articleService.createArticle(articleDto);
  }
}

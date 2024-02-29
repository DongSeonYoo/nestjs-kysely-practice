interface IArticleModelData {
  id: number;
  title: string;
  content: string;
}

export class Article {
  id: number;
  title: string;
  content: string;
  constructor({ id, title, content }: IArticleModelData) {
    this.id = id;
    this.title = title;
    this.content = content;
  }
}

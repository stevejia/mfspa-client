export default interface ArticleInfoModel {
  articleId: number;
  title: string;
  content: string;
  type: number;
  tag: number;
  publishTime: string;
  readCount?: number;
  thumbupCount?: number;
  commentCount?: number;
}

export const defaultInfoModel: ArticleInfoModel = {
  articleId: null,
  title: "",
  content: "",
  type: 1,
  tag: null,
  publishTime: "",
};

export enum ArticleType {
  original = 1,
  reprint,
  translate,
}

export const getArticleType = (type: ArticleType): string[] => {
  if (ArticleType.original === type) {
    return ["原创", "green"];
  }
  if (ArticleType.reprint === type) {
    return ["转载", "red"];
  }
  if (ArticleType.translate === type) {
    return ["翻译", "yellow"];
  }
};

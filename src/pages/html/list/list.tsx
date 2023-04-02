import { Button, Card, Tag } from "antd";
import React, { useState } from "react";
import { formatDate } from "../../../utils";
import "./index.less";

enum ArticleTag {
  original = "原创",
  reprint = "转载",
}

interface ArticleModel {
  title: string;
  content: string;
  publishTime: number;
  tag: ArticleTag;
  readCount: number;
  thumbsUpCount: number;
  commentCount: number;
}

const HtmlList = (props) => {
  const initialArticles: ArticleModel[] = [
    {
      title: "askdkkasdfk",
      content:
        "askdkfaskdfjlaskdjflaksjdflak sjdfljasldfjals jlksjadflajsdlkfjasldkjflasdjfklasjdlfkjasldkfjalskdf",
      publishTime: Date.now(),
      tag: ArticleTag.original,
      readCount: 300,
      thumbsUpCount: 102,
      commentCount: 33,
    },
    {
      title: "askdkkasdfk",
      content:
        "askdkfaskdfjlaskdjflaksjdflak sjdfljasldfjals jlksjadflajsdlkfjasldkjflasdjfklasjdlfkjasldkfjalskdf",
      publishTime: Date.now(),
      tag: ArticleTag.original,
      readCount: 300,
      thumbsUpCount: 102,
      commentCount: 33,
    },
    {
      title: "askdkkasdfk",
      content:
        "askdkfaskdfjlaskdjflaksjdflak sjdfljasldfjals jlksjadflajsdlkfjasldkjflasdjfklasjdlfkjasldkfjalskdf",
      publishTime: Date.now(),
      tag: ArticleTag.original,
      readCount: 300,
      thumbsUpCount: 102,
      commentCount: 33,
    },
  ];
  const [articleList, setArticleList] =
    useState<ArticleModel[]>(initialArticles);

  return (
    <div className="article-list-wrapper">
      {articleList?.map((article) => (
        <Card
          className="article-item"
          title={<Button className="article-header" type="link">{article.title}</Button>}
          actions={[
            <div>{<Tag color={article.tag === ArticleTag.original ? 'green' : 'red'}>{article.tag}</Tag>}</div>,
            <div>发布博客&nbsp;{formatDate(article.publishTime)}</div>,
            <div>{article.readCount}&nbsp;阅读</div>,
            <div>{article.thumbsUpCount}&nbsp;点赞</div>,
            <div>{article.commentCount}&nbsp;评论</div>,
          ]}
        >
          {article.content}
        </Card>
      ))}
    </div>
  );
};

export default HtmlList;

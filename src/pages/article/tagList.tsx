import { Button, Card, Tag } from "antd";
import React, { useEffect, useState } from "react";
import request from "../../request/request";
import { parseQueryString } from "../../request/requestUtil";
import { formatDate } from "../../utils";
import { ArticleType, getArticleType } from "./types";
import "./tagList.less";
const TagArticleList = (props) => {
  const [articleList, setArticleList] = useState([])
  const queryArticleList = async () => {
    const params = parseQueryString(location.href);
    const {data: {articleList}} = await request.get("articleinfo/list", params);
    setArticleList(articleList);
    console.log(articleList);
  };
  useEffect(() => {
    queryArticleList();
  }, []);
  return (
    <div className="article-list-wrapper">
      {articleList?.map((article) => (
        <Card
          key={article.articleId}
          className="article-item"
          title={
            <Button className="article-header" type="link">
              {article.title}
            </Button>
          }
          actions={[
            <div>
              {
                <Tag
                  color={getArticleType(article.type)[1]}
                >
                  {getArticleType(article.type)[0]}
                </Tag>
              }
            </div>,
            <div>发布博客&nbsp;{formatDate(+article.publishTime)}</div>,
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

export default TagArticleList;

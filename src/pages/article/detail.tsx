import { Tag } from "antd";
import React, { useEffect, useState } from "react";
import MfspaMarkdown from "../../components/mfspa-markdown";
import request from "../../request/request";
import { parseQueryString } from "../../request/requestUtil";
import { formatTime } from "../../utils";
import "./detail.less";
import { getArticleType } from "./types";
const ArticleDetail = (props) => {
  console.log(props);
  const [articleInfo, setArticleInfo] = useState(null);
  const getArticleInfo = async () => {
    const params = parseQueryString(location.href);
    const {
      data: { articleInfo },
    } = await request.get("articleinfo/get", params);
    console.log(articleInfo);
    setArticleInfo(articleInfo);
  };
  useEffect(() => {
    getArticleInfo();
  }, []);

  return (
    articleInfo && (
      <div className="article-detail">
        <div className="article-title">
          {articleInfo.title}
          <div className="article-sub-info">
            <Tag color={getArticleType(articleInfo.type)[1]}>
              {getArticleType(articleInfo.type)[0]}
            </Tag>
            <div className="m-r-12">于{formatTime(+articleInfo.publishTime)}发布</div>
            <div className="m-r-12">{articleInfo.readCount || 0}阅读</div>
            <div className="m-r-12">{articleInfo.thumbsUpCount || 0}点赞</div>
            <div className="m-r-12">{articleInfo.commentCount || 0}评论</div>
          </div>
        </div>
        <div className="article-content">
          <MfspaMarkdown content={articleInfo.content}></MfspaMarkdown>
        </div>
      </div>
    )
  );
};

export default ArticleDetail;

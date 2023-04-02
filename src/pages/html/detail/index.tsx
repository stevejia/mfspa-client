import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./index.less";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import MfspaMarkdown from "../../../components/mfspa-markdown";
const HtmlDetail = (props) => {
  console.log(props.location);
  const test2 = `# 概述
  这是一个微前端框架，该框架主要包含 3 层

  - ## 主应用(mfspa-server)
    主应用层主要是做页面整体布局，页面菜单权限，以及路由分发
  - ## 中间层(mfspa-node)
    中间node层主要做子应用版本发布记录，子应用调试记录，做基础数据记录
  - ## 子应用层(mfspa-client)
    子应用层主要按照产品的模块区分，计划支持React、Vue2.x、Vue3.x以及Anuglar等开发框架的支持适配
    目前仅支持React框架的子应用开发，后续会相继进行扩展

    ~~~ typescript
        interface test {
            a: number;
            b: string;
        }
        console.log('333');
    ~~~
  `
  const test = `## A paragraph with *emphasis* and **strong importance**.

  > ### A block quote with ~strikethrough~ and a URL: https://reactjs.org.
  
  * Lists
  * [ ] todo
  * [x] done
  
  A table:
  
  | a | b |
  | - | - |

  ~~~ js
  console.log('333');
  ~~~ js

  `;
  
  return (
    <div className="article-detail">
      <MfspaMarkdown content={test2}></MfspaMarkdown>
    </div>
  );
};

export default HtmlDetail;

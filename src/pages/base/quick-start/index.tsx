import React from "react";
import ReactMarkdown from "react-markdown";

import overall from "./overall.md";
import './index.less';
export default class OverAllPage extends React.Component<any, any> {
  async componentDidMount(): Promise<void> {}
  render(): React.ReactNode {
    return (
      <div>
        <ReactMarkdown className="overall-md">{overall}</ReactMarkdown>
      </div>
    );
  }
}

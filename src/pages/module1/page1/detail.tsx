import * as React from "react";

import { NavigateFunction } from "react-router-dom";
import WithRouter from "../../../router/withRouter";
interface Module1Page1DetailProps {
  navigate?: NavigateFunction;
}
class Module1Page1Detail extends React.Component<Module1Page1DetailProps, any> {
  render() {
    console.log("测试热更新332223333");
    return (
      <div>
        Module1 Page1123123
        <div
          onClick={() => {
            this.props.navigate(
              "/app/testA/module1/page1/manage?test=3333333333"
            );
          }}
        >
          go manage
        </div>
      </div>
    );
  }
}

export default Module1Page1Detail;

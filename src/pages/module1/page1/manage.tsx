import * as React from "react";
import { NavigateFunction, useRoutes } from "react-router-dom";
import WithRouter from "../../../router/withRouter";
interface Module1Page1DetailProps {
  navigate?: NavigateFunction;
}
class Module1Page1Manage extends React.Component<Module1Page1DetailProps, any> {
  render() {
    console.log(344);
    
    return (
      <div>
        Module1 Page1 Manage12222
        <div
          onClick={() =>
            this.props.navigate("/app/testA/module1/page1/list?test=3333333333")
          }
        >
          goto list
        </div>
        <div
          onClick={() =>
            this.props.navigate(
              "/app/testA/module1/page1/detail?test=3333333333"
            )
          }
        >
          goto detail
        </div>
      </div>
    );
  }
}

export default Module1Page1Manage;

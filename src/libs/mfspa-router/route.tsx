import React, { Suspense } from "react";
import { MfspaRouteObject } from "./type";
interface MfspaRouteProps {
  data: MfspaRouteObject;
  matched: boolean;
}
class MfspaRoute extends React.Component<MfspaRouteProps, any> {
  navigate = (path: string) => {
    console.log(path);
    window.history.pushState({ path: path }, "", path);
  };

  render() {
    const env = process.env.NODE_ENV;
    const { data, matched } = this.props;
    console.log("route data", data);
    if (!matched) {
      return null;
    }
    if (env === "development") {
      return <data.component navigate={this.navigate}></data.component>;
    }
    return (
      <Suspense fallback={<>loading</>}>
        <data.component navigate={this.navigate} />
      </Suspense>
    );
  }
}

export default MfspaRoute;

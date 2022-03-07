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
    const { data, matched } = this.props;
    return matched ? (
      <Suspense fallback={<>loading</>}>
        <data.component navigate={this.navigate} />
      </Suspense>
    ) : null;
  }
}

export default MfspaRoute;

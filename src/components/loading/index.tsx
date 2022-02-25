import * as React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import "./index.less";
import store from "../../store";
class Loading extends React.Component<any, any> {
  state = {
    loading: false,
  };

  componentDidMount(): void {
    store.subscribe(() => {
      const storeState = store.getState();
      this.setState({ loading: storeState.Loading.loading });
    });
  }

  render() {
    const { loading } = this.state;
    return (
      loading && (
        <div className="mfspa-loading">
          <LoadingOutlined />
        </div>
      )
    );
  }
}

export default Loading;

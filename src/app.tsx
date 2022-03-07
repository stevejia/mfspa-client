import * as React from "react";
import { Provider } from "react-redux";
import Loading from "./components/loading";
import store from "./store";
import { genRoutes, RenderRoutes } from "./router";
// import {  Routes, Switch } from "react-router";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Module1Page1List from "./pages/module1/page1/list";
import Module1Page1Manage from "./pages/module1/page1/manage";
import WithRouter from "./router/withRouter";
import MfspaRoutes from "./libs/mfspa-router/routes";
import { isNullOrEmpty } from "./utils";
class App extends React.Component<any, any> {
  state = {
    renderRoutes: true,
  };
  componentDidMount(): void {
    if (isNullOrEmpty(window.reloadCount) || window.reloadCount > 0) {
      this.setState({ renderRoutes: false }, () => {
        this.setState({ renderRoutes: true });
      });
    }
  }
  render() {
    const { renderRoutes } = this.state;
    return (
      <Provider store={store}>
        {renderRoutes && <MfspaRoutes routes={genRoutes()}></MfspaRoutes>}
      </Provider>
    );
  }
}

export default App;

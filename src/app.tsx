import * as React from "react";
import { Provider } from "react-redux";
import Loading from "./components/loading";
import store from "./store";
import { renderRoutes } from "react-router-config";
import routes from "./router";
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <div className="mfspa-content">
          {routes && renderRoutes(routes)}
        </div>
      </Provider>
    );
  }
}

export default App;

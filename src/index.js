import {render} from "react-dom";
import "antd/dist/antd.css";
import "./index.less";
import App from "./app.tsx";
import mockMenus from "../mfspa.menu";
console.log(window.mfspa);
console.log(35354);
window.addHistoryListener("historyChange", function (d) {
  console.log("history change", window.history.state);
});
render(<App />, document.querySelector("#mfspa-root"));
console.log(9999);
if (module?.hot?.accept) {
  module?.hot?.accept();
  window.mfspa.trigger({
    type: "getMockMenu",
    data: {
      mockMenus,
    },
  });
}

import ReactDom from "react-dom";
import "antd/dist/antd.css";
import "./index.less";
import App from "./app.tsx";
console.log(window.mfspa);
console.log(35354);
window.addHistoryListener("historyChange", function (d) {
  console.log("history change", window.history.state);
});
ReactDom.render(<App />, document.querySelector("#mfspa-root"));
console.log(9999);
if (module?.hot?.accept) {
  module?.hot?.accept();
}

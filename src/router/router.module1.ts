import Module1Page1Detail from "../pages/module1/page1/detail";
import Module1Page1List from "../pages/module1/page1/list";
import Module1Page1Manage from "../pages/module1/page1/manage";

const module1Routes = {
  path: "/module1",
  name: "module1",
  routes: [
    {
      path: "/page1/list",
      exact: true,
      component: Module1Page1List,
    },
    {
      path: "/page1/detail",
      component: Module1Page1Detail,
    },
    {
      path: "page1/manage",
      component: Module1Page1Manage,
    },
  ],
};

export default module1Routes;

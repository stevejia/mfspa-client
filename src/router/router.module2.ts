import Module2Page1Detail from "../pages/module2/page1/detail";
import Module2Page1List from "../pages/module2/page1/list";
import Module2Page1Manage from "../pages/module2/page1/manage";

const module2Routes = {
  path: "/module2",
  name: "module2",
  children: [
    {
      path: "/page1/list",
      exact: true,
      component: Module2Page1List,
    },
    {
      path: "/page1/detail",
      component: Module2Page1Detail,
    },
    {
      path: "page1/manage",
      component: Module2Page1Manage,
    },
  ],
};

export default module2Routes;

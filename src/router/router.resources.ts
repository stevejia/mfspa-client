import { lazy } from "react";
import dynamicImport from "../libs/mfspa-router/dynamicImport";
import { MfspaRouteObject } from "../libs/mfspa-router/type";
import GroupList from "../pages/resources/group/list";
import Menu from "../pages/resources/menu";
import PageList from "../pages/resources/page/list";

console.log(process.env.NODE_ENV);

const resourcesRoutes: MfspaRouteObject = {
  path: "/resources",
  children: [
    {
      path: "/group",
      children: [
        {
          path: "/list",
          name: "页面资源组",
          component: dynamicImport(GroupList),
        },
      ],
    },
    {
      path: "/page",
      children: [
        {
          path: "/list",
          name: "页面列表",
          component: dynamicImport(PageList),
        },
      ],
    },
    {
      path: "/menu",
      children: [
        {
          path: "/list",
          name: "菜单列表",
          component: dynamicImport(Menu),
        },
      ],
    },
  ],
};

export default resourcesRoutes;

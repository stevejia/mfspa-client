import { lazy } from "react";
import dynamicImport from "../libs/mfspa-router/dynamicImport";
import { MfspaRouteObject } from "../libs/mfspa-router/type";
import groupList from "../pages/resources/group/list";
import pageList from "../pages/resources/page/list";

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
          component: dynamicImport(groupList),
        },
      ],
    },
    {
      path: "/page",
      children: [
        {
          path: "/list",
          name: "页面列表",
          component: dynamicImport(pageList),
        },
      ],
    },
  ],
};

export default resourcesRoutes;

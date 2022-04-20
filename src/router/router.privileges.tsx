import { lazy } from "react";
import { MfspaRouteObject } from "../libs/mfspa-router/type";

const privilegesRoutes: MfspaRouteObject = {
  path: "privileges",
  children: [
    {
      path: "list",
      name: "权限列表",
      component: lazy(() => import("../pages/privileges/list")),
    },
    // {
    //   path: "/menu",
    //   children: [
    //     {
    //       path: "/list2",
    //       component: lazy(() => import("../pages/module1/page1/list")),
    //     },
    //     {
    //       path: "/detail2",
    //       component: lazy(() => import("../pages/module1/page1/list")),
    //     },
    //     {
    //       path: "/manage2",
    //       component: lazy(() => import("../pages/module1/page1/list")),
    //     },
    //   ],
    // },
  ],
};

export default privilegesRoutes;

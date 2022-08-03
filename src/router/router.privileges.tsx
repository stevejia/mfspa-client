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
  ],
};

export default privilegesRoutes;

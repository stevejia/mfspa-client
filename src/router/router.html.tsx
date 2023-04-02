import { lazy } from "react";
import { MfspaRouteObject } from "../libs/mfspa-router/type";

const htmlRoutes: MfspaRouteObject = {
  path: "html",
  children: [
    {
      path: "list",
      name: "list",
      component: lazy(() => import("../pages/html/list/list")),
    },
    {
        path: "detail",
        name: "detail",
        component: lazy(() => import("../pages/html/detail")),
      }
  ],
};

export default htmlRoutes;

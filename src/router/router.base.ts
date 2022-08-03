import { lazy } from "react";
import { MfspaRouteObject } from "../libs/mfspa-router/type";

const baseRoutes: MfspaRouteObject = {
  path: "base",
  children: [
    {
      path: "overall",
      name: "overall",
      component: lazy(() => import("../pages/base/overall/index")),
    },
    {
      path: "quickstart",
      name: "quickstart",
      component: lazy(() => import("../pages/base/quick-start/index")),
    },
  ],
};

export default baseRoutes;

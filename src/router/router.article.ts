import { lazy } from "react";
import { MfspaRouteObject } from "../libs/mfspa-router/type";

const articleRoutes: MfspaRouteObject = {
  path: "article",
  children: [
    {
      path: "publish",
      name: "publish",
      component: lazy(() => import("../pages/article/publish")),
    }
  ],
};

export default articleRoutes;

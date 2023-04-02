import { lazy } from "react";
import { MfspaRouteObject } from "../libs/mfspa-router/type";

const articleRoutes: MfspaRouteObject = {
  path: "article",
  children: [
    {
      path: "publish",
      name: "publish",
      component: lazy(() => import("../pages/article/publish")),
    },
    {
      path: "tagList",
      name: "tagList",
      component: lazy(() => import("../pages/article/tagList")),
    },
    {
      path: "detail",
      name: "detail",
      component: lazy(() => import("../pages/article/detail")),
    }
  ],
};

export default articleRoutes;

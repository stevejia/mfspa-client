import React from "react";
import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import { MfspaRouteObject } from "../libs/mfspa-router/type";
import Index from "../pages";
import Module1Page1Detail from "../pages/module1/page1/detail";
import Module1Page1List from "../pages/module1/page1/list";
import Module1Page1Manage from "../pages/module1/page1/manage";

const module1Routes: MfspaRouteObject = {
  path: "module1",
  children: [
    {
      path: "page1",
      name: "3333",
      children: [
        {
          path: "list",
          component: lazy(() => import("../pages/module1/page1/list")),
        },
        {
          path: "detail",
          component: lazy(() => import("../pages/module1/page1/detail")),
        },
        {
          path: "manage",
          component: lazy(() => import("../pages/module1/page1/manage")),
        },
      ],
    },
    {
      path: "/page2",
      children: [
        {
          path: "/list2",
          component: lazy(() => import("../pages/module1/page1/list")),
        },
        {
          path: "/detail2",
          component: lazy(() => import("../pages/module1/page1/list")),
        },
        {
          path: "/manage2",
          component: lazy(() => import("../pages/module1/page1/list")),
        },
      ],
    },
  ],
};

export default module1Routes;

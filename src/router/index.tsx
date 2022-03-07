import {
  BrowserRouter as Router,
  Route,
  RouteObject,
  Routes,
  useRoutes,
} from "react-router-dom";
import module1Routes from "./router.module1";
import module2Routes from "./router.module2";

import config from "../../mfspa.config";
import { clone } from "../utils";
import React, { Fragment } from "react";
import { renderRoutes } from "../libs/mfspa-router";
import { MfspaRouteObject } from "../libs/mfspa-router/type";

const routePrefix = `/app/${config.appPattern}`;
const allRoutes: MfspaRouteObject[] = [
  {
    path: routePrefix,
    children: [module1Routes],
  },
];

const _genRoutes = (
  route: MfspaRouteObject,
  mfspaRoutes: MfspaRouteObject[]
) => {
  if (!route.children) {
    console.log(route, 1);
    mfspaRoutes.push(route);
    return;
  } else {
    route.children.forEach((child) => {
      child.fullPath =
        child.fullPath || combinePath(route.fullPath || route.path, child.path);
      _genRoutes(child, mfspaRoutes);
    });
  }
};

const combinePath = (parentPath: string, childPath: string): string => {
  if (parentPath.endsWith("/")) {
    parentPath = parentPath.slice(0, parentPath.length - 1);
  }

  if (!childPath.startsWith("/")) {
    childPath = "/" + childPath;
  }

  return parentPath + childPath;
};

const genRoutes = (routes?: MfspaRouteObject[]): MfspaRouteObject[] => {
  routes = routes || allRoutes;
  const mfspaRoutes: MfspaRouteObject[] = [];
  routes.forEach((route) => _genRoutes(route, mfspaRoutes));
  return mfspaRoutes;
};

const RenderRoutes = (): React.ReactElement => {
  const routes = allRoutes || ([] as any[]);
  const mfspaRoutes: any[] = genRoutes(routes);
  console.log(mfspaRoutes);

  // return useRoutes(routes);

  // return [
  //   React.createElement(Router, { key: "router" }, [
  //     React.createElement(
  //       Routes,
  //       { key: "routes" },
  //       mfspaRoutes?.map((mfspaRoute, index) => {
  //         return React.createElement(
  //           Route,
  //           { ...mfspaRoute, ...{ key: index } },
  //           []
  //         );
  //       })
  //     ),
  //   ]),
  // ];
  return renderRoutes(mfspaRoutes);
};

export { RenderRoutes, genRoutes };

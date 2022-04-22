import { lazy } from "react";

const dynamicImport = (component) => {
  const env = process.env.NODE_ENV;
  if (env === "development") {
    return component;
  } else if (env === "production") {
    return lazy(component);
  }
};

export default dynamicImport;

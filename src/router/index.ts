import module1Routes from "./router.module1";
import module2Routes from "./router.module2";

import config from "../../mfspa.config";
import Index from "../pages";

const routes = [
  {
    path: `/app/${config.appPattern}/`,
    name: "",
    component: Index,
    routes: [module1Routes],
  },
];

export default routes;

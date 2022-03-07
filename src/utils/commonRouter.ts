import { NavigateFunction, NavigateOptions, To } from "react-router-dom";
import { isNullOrEmpty } from ".";

class MfspaCommonRouter {
  private static navigate?: NavigateFunction = null;
  static go(to: To, options?: NavigateOptions) {
    const navigate = MfspaCommonRouter.navigate;
    if (isNullOrEmpty(navigate)) navigate(to, options);
  }
  static update(navigate: NavigateFunction) {
    MfspaCommonRouter.navigate = navigate;
  }
}

export default MfspaCommonRouter;

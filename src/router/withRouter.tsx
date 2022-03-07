import React from "react";
import { useNavigate } from "react-router-dom";
import MfspaCommonRouter from "../utils/commonRouter";
const WithRouter = (Heder: any) => {
  return () => {
    const navigate = useNavigate();
    MfspaCommonRouter.update(navigate);
    return <Heder navigate={navigate} />;
  };
};
export default WithRouter;

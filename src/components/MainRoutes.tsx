import { FC, ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import EvaluationPage from "../pages/EvaluationDashboard";
import HomePage from "../pages/HomePage";
import { routes } from "../routes";

const MainRoutes: FC = (): ReactElement => {
  return (
    <>
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.evaluation} element={<EvaluationPage />} />
      </Routes>
    </>
  );
};

export default MainRoutes;

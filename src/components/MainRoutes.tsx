import { FC, ReactElement } from "react";
import { Route, Routes } from "react-router-dom";

import EvaluationPage from "../pages/EvaluationDashboard";
import HomePage from "../pages/HomePage";
import { SignPage } from "../pages/SignPage";
import SportScoreData from "../pages/SportScoreData";
import { routes } from "../routes";

import { SignInForm } from "./account/SignInForm";
import { SignUpForm } from "./account/SignUpForm";

const MainRoutes: FC = (): ReactElement => {
  return (
    <>
      <Routes>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.evaluation} element={<EvaluationPage />} />
        <Route path={routes.signIn} element={<SignPage><SignInForm/></SignPage>} />
        <Route path={routes.signUp} element={<SignPage><SignUpForm/></SignPage>} />
        <Route path={routes.sportScoreData} element={<SportScoreData/>} />
      </Routes>
    </>
  );
};

export default MainRoutes;

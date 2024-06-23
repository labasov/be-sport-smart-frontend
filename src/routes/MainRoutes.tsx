import { FC, ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';
import EvaluationPage from '../pages/EvaluationPage';
import HomePage from '../pages/HomePage';
import SummaryPage from '../pages/SummaryPage';
import { paths }  from './paths';

const MainRoutes: FC = (): ReactElement => {
  return (
    <>
        <Routes>
            <Route path={paths.home} element={<HomePage />} />
            <Route path={paths.evaluation} element={<EvaluationPage />} />
            <Route path={paths.summary} element={<SummaryPage />} />
        </Routes>
    </>
  );
}

export default MainRoutes;
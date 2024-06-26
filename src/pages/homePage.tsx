import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import WithApplicationInsights from '../components/core/telemetry/TelemetryWithAppInsights.tsx';
import { routes } from '../routes.ts';

const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(routes.evaluation);
    }, [navigate]); 

    return (
        <>Hey</>
    );
};

const HomePageWithTelemetry = WithApplicationInsights(HomePage, 'HomePage');

export default HomePageWithTelemetry;

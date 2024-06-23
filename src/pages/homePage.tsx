import { useNavigate } from 'react-router-dom';
import WithApplicationInsights from '../components/TelemetryWithAppInsights.tsx';
import { useEffect } from 'react';
import { paths } from '../routes/paths.ts';

const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate(paths.evaluation);
    }, [navigate]); 

    return (
        <>Hey</>
    );
};

const HomePageWithTelemetry = WithApplicationInsights(HomePage, 'HomePage');

export default HomePageWithTelemetry;

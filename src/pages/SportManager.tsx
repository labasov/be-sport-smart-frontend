import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SportTable from '../components/admin/sport-manager-table/SportTable.tsx';
import { useAuth } from '../components/common/AuthProvider.tsx';
import { routes } from '../routes.ts';

const SportManagerPage = () => {
    const navigate = useNavigate();
    const { loading, isInRole } = useAuth();

    useEffect(() => {
        if (!loading && !isInRole('Admin')) {
            navigate(routes.home);
        }
    }, [navigate, isInRole, loading]); 

    return (
      <Box mt={4} mb={4}>
        <SportTable/>
      </Box>
    );
};

export default SportManagerPage;

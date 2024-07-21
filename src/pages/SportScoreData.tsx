import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SportScoreManageTable from '../components/admin/SportScoreManageTable.tsx';
import { useAuth } from '../components/common/AuthProvider.tsx';
import { routes } from '../routes.ts';

const SportScoreData = () => {
    const navigate = useNavigate();
    const { loading, isInRole } = useAuth();

    useEffect(() => {
        if (!loading && !isInRole('Admin')) {
            navigate(routes.home);
        }
    }, [navigate, isInRole]); 

    return (
      <Box mt={4} mb={4}>
        <SportScoreManageTable/>
      </Box>
    );
};

export default SportScoreData;

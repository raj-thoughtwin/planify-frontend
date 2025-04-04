import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingComponent: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#f8fafc',
      }}
    >
      <CircularProgress sx={{ color: '#3b82f6' }} />
    </Box>
  );
};

export default LoadingComponent; 
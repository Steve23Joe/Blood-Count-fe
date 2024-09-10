import React from 'react';
import { Paper, Typography, Box, Theme } from '@mui/material';
import { SxProps } from '@mui/system';
import OverviewIcon from '@mui/icons-material/Dashboard'; 
import AgeSexDistributionChart from './AgeSexDistributionChart';
import ChartTabs from './ChartTabs';

interface OverviewSectionProps {
  title: string;
  sx?: SxProps<Theme>;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({ title, sx }) => {
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3, 
        maxWidth: 1920, 
        m: 2, 
        ...sx,
      }}
    >
      <Box sx={{ display: 'inline-flex', alignItems: 'center', position: 'relative' }}>
        <OverviewIcon sx={{ mr: 1, mb: 1, color: 'purple' }} />
      <Typography variant="h5" component="h2" gutterBottom>
        {title}
      </Typography>
      <Box
          sx={{
            position: 'absolute',
            bottom: 4,
            left: 0,
            width: '100%',
            height: 2,
            bgcolor: 'purple',
          }}
        />
      </Box>
      <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: 2,   
      }}>
        <Box
        sx={{
            width: '47%',
            padding: 2,
            textAlign: 'center',
        }}>
            <AgeSexDistributionChart />
        </Box>
        <Box
            sx={{
                width: '40%',
                padding: 2,
                textAlign: 'center',
            }}>
            <ChartTabs />
        </Box>
      </Box>
    </Paper>
  );
};

export default OverviewSection; 
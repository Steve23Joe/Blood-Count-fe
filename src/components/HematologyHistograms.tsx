import React from 'react';
import { Box, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const wbcData = [
    { halfYear: 'First Half', lastYear: 6500, thisYear: 6700 },
    { halfYear: 'Second Half', lastYear: 6200, thisYear: 6800 },
];

const rbcData = [
    { halfYear: 'First Half', lastYear: 4.9, thisYear: 5.1 },
    { halfYear: 'Second Half', lastYear: 4.7, thisYear: 5.2 },
];

const HematologyHistograms: React.FC = () => {
    return (
        <Box>
            <Grid container spacing={2}>
                {/* WBC Histogram */}
                <Grid item xs={12} md={6}>
                    <Box>
                        <ResponsiveContainer width="100%" height={137} maxHeight={137}>
                            <BarChart data={wbcData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="halfYear" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="lastYear" fill="#8884d8" name="Last Year" />
                                <Bar dataKey="thisYear" fill="#ff9999" name="This Year" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                </Grid>

                {/* RBC Histogram */}
                <Grid item xs={12} md={6}>
                    <Box>
                        <ResponsiveContainer width="100%" height={137} maxHeight={137}>
                            <BarChart data={rbcData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="halfYear" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="lastYear" fill="#8884d8" name="Last Year" />
                                <Bar dataKey="thisYear" fill="#ff9999" name="This Year" />
                            </BarChart>
                        </ResponsiveContainer>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default HematologyHistograms;

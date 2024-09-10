import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => {
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
            style={{ width: '100%' }}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

const bmiData = [
    { range: '<18.5', count: 10 },
    { range: '18.5-24.9', count: 45 },
    { range: '25-29.9', count: 30 },
    { range: '30-34.9', count: 20 },
    { range: '>35', count: 15 },
];

const ethnicityData = [
    { name: 'Caucasian', value: 60 },
    { name: 'African American', value: 20 },
    { name: 'Asian', value: 10 },
    { name: 'Hispanic', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ChartTabs: React.FC = () => {
    const [value, setValue] = useState(0);

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ display: 'flex', height: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', borderRight: 1, borderColor: 'divider' }}>
                <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs"
                    sx={{ borderRight: 1, borderColor: 'divider', pt: 5 }}
                >
                    <Tab label="BMI" />
                    <Tab label="Ethnicity" />
                </Tabs>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                <TabPanel value={value} index={0}>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={bmiData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="range" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="count" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <ResponsiveContainer width="100%" height={400}>
                        <PieChart>
                            <Pie
                                data={ethnicityData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label
                            >
                                {ethnicityData.map((_entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Legend />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </TabPanel>
            </Box>
        </Box>
    );
};

export default ChartTabs;
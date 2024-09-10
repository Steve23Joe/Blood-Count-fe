import { Box, Card, CardContent, Chip, Grid, Typography } from '@mui/material';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import OverviewSection from './components/OverviewSection';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import AddAlertIcon from '@mui/icons-material/AddAlert';
import HematologyHistograms from './components/HematologyHistograms';
import ControlAndDisplay from './components/ControlAndDisplay';

function App() {

  return (
    <>
      <ResponsiveAppBar />
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
        <OverviewSection 
          title="Patients Overview" 
        />
      </Box>

      <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 2,
            }}
        >
            <Card sx={{ width: '33%', marginRight: 2 }}>
                <CardContent sx={{  height: 169 }}>
                  {/* Todo: Move this icon-title pattern into component */}
                  <Box sx={{ display: 'inline-flex', alignItems: 'center', position: 'relative' }}>
                    <WhatshotIcon sx={{ mr: 1, mb: 1, color: 'purple' }} />
                  <Typography variant="h5" component="h2" gutterBottom>
                    Today's Trending
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
                    <Typography>
                    <Chip label="Flu risk is under control" sx={{m: 1, backgroundColor: 'green', color: 'white', fontWeight: 'bold' }}/>
                    <Chip label="Alert is running" sx={{m:1, backgroundColor: 'orange', color: 'white', fontWeight: 'bold' }}/>
                    <Chip label="Busy time during holiday seasons" sx={{m: 1, backgroundColor: 'purple', color: 'white',fontWeight: 'bold'}}/>
                    </Typography>
                </CardContent>
            </Card>

            <Card sx={{ width: '66%' }}>
                <CardContent>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      {/* Todo: Move this icon-title pattern into component */}
                      <Box sx={{ display: 'inline-flex', alignItems: 'center', position: 'relative' }}>
                        <AddAlertIcon sx={{ mr: 1, mb: 1, color: 'purple' }} />
                      <Typography variant="h5" component="h2" gutterBottom>
                        Alerting
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
                      <Typography>
                        Unusually high WBC, RET-He compared to same time of the previous year
                      </Typography>
                    </Grid>

                    <Grid item xs={8}>
                        <Box
                            sx={{
                                padding: 2,
                                textAlign: 'center',
                            }}
                        >
                          <HematologyHistograms />
                        </Box>
                    </Grid>
                </Grid>
                </CardContent>
            </Card>
        </Box>
        <ControlAndDisplay />
    </>
  )
}

export default App

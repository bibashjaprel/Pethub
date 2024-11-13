import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid, CircularProgress, Divider, Box } from '@mui/material';
import { Pets as PetsIcon, Person as PersonIcon, ThumbUp as ThumbUpIcon, CardGiftcard as CardGiftcardIcon, PendingActions as PendingActionsIcon } from '@mui/icons-material';
import { LinearProgress } from '@mui/material';

const AnalyzeDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPets: 0,
    totalUsers: 0,
    adoptionRate: 0,
    donationRate: 0,
    pendingAdoptions: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Mock data, replace this with your API call
        const response = {
          totalPets: 120,
          totalUsers: 150,
          adoptionRate: 75, // Percentage
          donationRate: 50, // Percentage
          pendingAdoptions: 10,
        };
        setStats(response);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard Analytics
      </Typography>

      <Grid container spacing={3}>
        {/* Total Pets */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PetsIcon sx={{ fontSize: 40, marginRight: 2 }} />
                <Typography variant="h6">Total Pets</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {stats.totalPets}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Users */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PersonIcon sx={{ fontSize: 40, marginRight: 2 }} />
                <Typography variant="h6">Total Users</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {stats.totalUsers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Adoption Rate */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <ThumbUpIcon sx={{ fontSize: 40, marginRight: 2 }} />
                <Typography variant="h6">Adoption Rate</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {stats.adoptionRate}%
              </Typography>
              <LinearProgress variant="determinate" value={stats.adoptionRate} sx={{ marginTop: 2 }} />
            </CardContent>
          </Card>
        </Grid>

        {/* Donation Rate */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <CardGiftcardIcon sx={{ fontSize: 40, marginRight: 2 }} />
                <Typography variant="h6">Donation Rate</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {stats.donationRate}%
              </Typography>
              <LinearProgress variant="determinate" value={stats.donationRate} sx={{ marginTop: 2 }} />
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Adoptions */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PendingActionsIcon sx={{ fontSize: 40, marginRight: 2 }} />
                <Typography variant="h6">Pending Adoptions</Typography>
              </Box>
              <Typography variant="h4" color="primary">
                {stats.pendingAdoptions}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ marginTop: 4, marginBottom: 4 }} />

      <Grid container spacing={3}>
        {/* Additional info or charts can go here */}
        {/* Example: Chart with data */}
      </Grid>
    </Box>
  );
};

export default AnalyzeDashboard;

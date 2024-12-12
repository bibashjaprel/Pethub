import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Box,
  LinearProgress,
  Skeleton,
} from '@mui/material';
import { Pets as PetsIcon, Person as PersonIcon, ThumbUp as ThumbUpIcon, CardGiftcard as CardGiftcardIcon, PendingActions as PendingActionsIcon } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer } from 'recharts';
import CountUp from 'react-countup';

// Mock data for the graph
const graphData = [
  { name: 'Jan', adoptionRate: 30, donationRate: 45 },
  { name: 'Feb', adoptionRate: 60, donationRate: 50 },
  { name: 'Mar', adoptionRate: 80, donationRate: 60 },
  { name: 'Apr', adoptionRate: 75, donationRate: 55 },
  { name: 'May', adoptionRate: 90, donationRate: 70 },
];

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
    return (
      <Box sx={{ padding: 2 }}>
        <Skeleton variant="text" width="60%" sx={{ marginBottom: 2 }} />
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton variant="rectangular" width="100%" height={180} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton variant="rectangular" width="100%" height={180} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton variant="rectangular" width="100%" height={180} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Skeleton variant="rectangular" width="100%" height={180} />
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Dashboard Analytics
      </Typography>

      <Grid container spacing={3}>
        {/* Total Pets */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PetsIcon sx={{ fontSize: 40, color: 'primary.main', marginRight: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total Pets</Typography>
              </Box>
              <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold', marginTop: 1 }}>
                <CountUp end={stats.totalPets} start={0} duration={2} separator="," />
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Total Users */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PersonIcon sx={{ fontSize: 40, color: 'secondary.main', marginRight: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total Users</Typography>
              </Box>
              <Typography variant="h4" color="secondary" sx={{ fontWeight: 'bold', marginTop: 1 }}>
                <CountUp end={stats.totalUsers} start={0} duration={2} separator="," />
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Adoption Rate */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <ThumbUpIcon sx={{ fontSize: 40, color: '#FF6347', marginRight: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Adoption Rate</Typography>
              </Box>
              <Typography variant="h4" color="#FF6347" sx={{ fontWeight: 'bold', marginTop: 1 }}>
                {stats.adoptionRate}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={stats.adoptionRate}
                sx={{
                  marginTop: 2,
                  height: 8,
                  borderRadius: 4,
                  background: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    background: '#FF6347',
                    borderRadius: 4,
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Donation Rate */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <CardGiftcardIcon sx={{ fontSize: 40, color: '#32CD32', marginRight: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Donation Rate</Typography>
              </Box>
              <Typography variant="h4" color="#32CD32" sx={{ fontWeight: 'bold', marginTop: 1 }}>
                {stats.donationRate}%
              </Typography>
              <LinearProgress
                variant="determinate"
                value={stats.donationRate}
                sx={{
                  marginTop: 2,
                  height: 8,
                  borderRadius: 4,
                  background: '#e0e0e0',
                  '& .MuiLinearProgress-bar': {
                    background: '#32CD32',
                    borderRadius: 4,
                  },
                }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Pending Adoptions */}
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={3} sx={{ borderRadius: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PendingActionsIcon sx={{ fontSize: 40, color: '#FFD700', marginRight: 2 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Pending Adoptions</Typography>
              </Box>
              <Typography variant="h4" color="gold" sx={{ fontWeight: 'bold', marginTop: 1 }}>
                <CountUp end={stats.pendingAdoptions} start={0} duration={2} separator="," />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Divider sx={{ marginTop: 4, marginBottom: 4 }} />

      {/* Graphs Section */}
      <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
        Adoption & Donation Rates Over Time
      </Typography>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={graphData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <RechartsTooltip />
          <Legend />
          <Line type="monotone" dataKey="adoptionRate" stroke="#FF6347" strokeWidth={3} />
          <Line type="monotone" dataKey="donationRate" stroke="#32CD32" strokeWidth={3} />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AnalyzeDashboard;


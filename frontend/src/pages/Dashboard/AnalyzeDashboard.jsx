import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Skeleton,
} from '@mui/material';
import {
  Pets as PetsIcon,
  Person as PersonIcon,
  PendingActions as PendingActionsIcon,
  VolunteerActivism as VolunteerIcon,
  Assignment as AdoptionIcon,
} from '@mui/icons-material';
import CountUp from 'react-countup';
import {
  getUser,
  AllPets,
  getAvailablePets,
  getCreateRequests, // as donate request
  getAdoptionRequests,
} from '../../utils/apiHelpers';

// Reusable Card Component
const StatCard = ({ icon: Icon, color, title, value }) => (
  <Card elevation={3} sx={{ borderRadius: 2 }}>
    <CardContent>
      <Box display="flex" alignItems="center">
        <Icon sx={{ fontSize: 40, color: color, marginRight: 2 }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
          {title}
        </Typography>
      </Box>
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', marginTop: 1, color }}
      >
        <CountUp end={value} start={0} duration={2} separator="," />
      </Typography>
    </CardContent>
  </Card>
);

const AnalyzeDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPets: 0,
    availablePets: 0,
    donateRequests: 0,
    adoptionRequests: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const users = await getUser();
        const totalUsers = users.length;

        const pets = await AllPets();
        const totalPets = pets.length;

        const availablePets = await getAvailablePets();
        const totalAvailablePets = availablePets.length;

        const donateRequests = await getCreateRequests();
        const totalDonateRequests = donateRequests.length;

        const adoptionRequests = await getAdoptionRequests();
        const totalAdoptionRequests = adoptionRequests.length;

        setStats({
          totalUsers,
          totalPets,
          availablePets: totalAvailablePets,
          donateRequests: totalDonateRequests,
          adoptionRequests: totalAdoptionRequests,
        });
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
        {/* Total Users */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={PersonIcon}
            color="secondary.main"
            title="Total Users"
            value={stats.totalUsers}
          />
        </Grid>

        {/* Total Pets */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={PetsIcon}
            color="primary.main"
            title="Total Pets"
            value={stats.totalPets}
          />
        </Grid>

        {/* Available Pets */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={PetsIcon}
            color="green"
            title="Available Pets"
            value={stats.availablePets}
          />
        </Grid>

        {/* Donate Requests */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={VolunteerIcon}
            color="purple"
            title="Donate Requests"
            value={stats.donateRequests}
          />
        </Grid>

        {/* Adoption Requests */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            icon={AdoptionIcon}
            color="#FFD700"
            title="Adoption Requests"
            value={stats.adoptionRequests}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyzeDashboard;

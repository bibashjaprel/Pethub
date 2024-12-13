import React, { useState, useEffect } from "react";
import { Box, Grid, Paper, CircularProgress, Typography, Chip, Divider } from "@mui/material";
import { getAdopMyrequest } from "../utils/apiHelpers";

const MyRequest = () => {
  const [adoptRequests, setAdoptRequests] = useState([]);
  const [donateRequests, setDonateRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch adoption and donation requests on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const adoptionData = await getAdopMyrequest();
        console.log(adoptionData)
        setAdoptRequests(adoptionData.filter((item) => item.status === "approved"));
        setDonateRequests(adoptionData.filter((item) => item.type === "donate"));
      } catch (err) {
        setError("Error fetching requests");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Render adoption or donation request status with Chip for better visualization
  const renderStatus = (status) => {
    switch (status) {
      case "pending":
        return <Chip label="Pending" color="warning" />;
      case "approved":
        return <Chip label="Approved" color="success" />;
      case "rejected":
        return <Chip label="Rejected" color="error" />;
      default:
        return <Chip label="Unknown" color="default" />;
    }
  };

  // Loading state
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Error state
  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography variant="h6" color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        My Requests
      </Typography>

      {/* Adoption Requests Section */}
      <Typography variant="h5" sx={{ mt: 3 }} color="textSecondary">
        Adoption Applications
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={3}>
        {adoptRequests.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="body1" align="center">No adoption requests found.</Typography>
          </Grid>
        ) : (
          adoptRequests.map((request) => (
            <Grid item xs={12} sm={6} md={4} key={request.id}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>{request.petName}</Typography>
                <Typography variant="body2" color="textSecondary">{request.message}</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" color="textSecondary">Applied on: {new Date(request.date).toLocaleDateString()}</Typography>
                  {renderStatus(request.status)}
                </Box>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>

      {/* Donation Requests Section */}
      <Typography variant="h5" sx={{ mt: 5 }} color="textSecondary">
        Donation Applications
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={3}>
        {donateRequests.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="body1" align="center">No donation requests found.</Typography>
          </Grid>
        ) : (
          donateRequests.map((request) => (
            <Grid item xs={12} sm={6} md={4} key={request.id}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>{request.donationItem}</Typography>
                <Typography variant="body2" color="textSecondary">{request.message}</Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" color="textSecondary">Applied on: {new Date(request.date).toLocaleDateString()}</Typography>
                  {renderStatus(request.status)}
                </Box>
              </Paper>
            </Grid>
          ))
        )}
      </Grid>
    </Box>
  );
};

export default MyRequest;

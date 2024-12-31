import React, { useState, useEffect } from "react";
import { Box, Grid, Paper, CircularProgress, Typography, Chip, Divider } from "@mui/material";
import { getMyAdoptionRequest } from "../utils/apiHelpers";

const UserCart = () => {
  const [adoptRequests, setAdoptRequests] = useState({});
  const [donateRequests, setDonateRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const adoptionData = await getMyAdoptionRequest();
        const groupedAdoptRequests = adoptionData.reduce((acc, request) => {
          const { status } = request;
          acc[status] = acc[status] || [];
          acc[status].push(request);
          return acc;
        }, {});

        const groupedDonateRequests = adoptionData.filter((item) => item.type === "donate");

        setAdoptRequests(groupedAdoptRequests);
        setDonateRequests(groupedDonateRequests);
      } catch (err) {
        setError(`Error fetching requests: ${err.message || "Unknown error"}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const renderStatus = (status) => {
    const statusMap = {
      Pending: "warning",
      approved: "success",
      rejected: "error",
      default: "default",
    };

    return <Chip label={status.charAt(0).toUpperCase() + status.slice(1)} color={statusMap[status] || statusMap.default} />;
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto" }}>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        My Requests
      </Typography>

      {/* Adoption Requests Section */}
      {Object.keys(adoptRequests).map((status) => (
        <div key={status}>
          <Typography variant="h5" sx={{ mt: 3 }} color="textSecondary">
            {status.charAt(0).toUpperCase() + status.slice(1)} Applications
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={3}>
            {adoptRequests[status].length === 0 ? (
              <Grid item xs={12}>
                <Typography variant="body1" align="center">
                  No {status} adoption requests found.
                </Typography>
              </Grid>
            ) : (
              adoptRequests[status].map((request) => (
                <Grid item xs={12} sm={6} md={4} key={request.id}>
                  <Paper sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {request.pet ? request.pet.name : 'No pet name available'}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Description: {request.message}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Typography variant="body2" color="textSecondary">
                        Applied on: {new Date(request.updatedAt).toLocaleDateString()}
                      </Typography>
                      {renderStatus(request.status)}
                    </Box>
                  </Paper>
                </Grid>
              ))
            )}
          </Grid>
        </div>
      ))}

      {/* Donation Requests Section */}
      <Typography variant="h5" sx={{ mt: 5 }} color="textSecondary">
        Donation Applications
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Grid container spacing={3}>
        {donateRequests.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              No donation requests found.
            </Typography>
          </Grid>
        ) : (
          donateRequests.map((request) => (
            <Grid item xs={12} sm={6} md={4} key={request.id}>
              <Paper sx={{ p: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {request.donationItem}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Description: {request.message}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography variant="body2" color="textSecondary">
                    Applied on: {new Date(request.updatedAt).toLocaleDateString()}
                  </Typography>
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

export default UserCart;

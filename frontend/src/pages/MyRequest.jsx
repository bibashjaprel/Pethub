import React, { useState, useEffect } from "react";
import { Box, Grid, Paper, CircularProgress, Typography, Chip, Divider } from "@mui/material";
import { getMyAdoptionRequest } from "../utils/apiHelpers";

const MyRequest = () => {
  const [adoptRequests, setAdoptRequests] = useState([]);
  const [donateRequests, setDonateRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch adoption and donation requests on component mount
  useEffect(() => {
    const fetchRequests = async () => {
      console.log("Fetching adoption and donation requests...");
      try {
        const adoptionData = await getMyAdoptionRequest();
        console.log("API Response:", adoptionData);

        // Group adoption requests by status
        const groupedAdoptRequests = adoptionData.reduce((acc, request) => {
          const { status, type } = request;
          if (!acc[status]) acc[status] = []; // Create a new array if the status doesn't exist
          acc[status].push(request);
          return acc;
        }, {});

        // Group donation requests
        const groupedDonateRequests = adoptionData.filter((item) => item.type === "donate");

        console.log("Grouped Adoption Requests:", groupedAdoptRequests);
        console.log("Grouped Donation Requests:", groupedDonateRequests);

        setAdoptRequests(groupedAdoptRequests);
        setDonateRequests(groupedDonateRequests);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError(`Error fetching requests: ${err.message || "Unknown error"}`);
      } finally {
        console.log("API fetch completed. Setting loading state to false.");
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const renderStatus = (status) => {
    console.log("Rendering status for:", status);
    switch (status) {
      case "Pending":
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
    console.log("Loading state: Showing loader...");
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  // Error state
  if (error) {
    console.log("Error state:", error);
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
              adoptRequests[status].map((request, index) => {
                console.log(`Rendering Adoption Request #${index + 1}:`, request);
                return (
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
                );
              })
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
          donateRequests.map((request, index) => {
            console.log(`Rendering Donation Request #${index + 1}:`, request);
            return (
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
            );
          })
        )}
      </Grid>
    </Box>
  );
};

export default MyRequest;

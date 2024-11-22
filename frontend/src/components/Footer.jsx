import React from 'react';
import { Container, Grid, Typography, Link, Box, IconButton } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box component="footer" bgcolor="primary.main" color="white" py={4}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              About PetHub
            </Typography>
            <Typography variant="body2">
              PetHub is dedicated to connecting pet lovers with the pets they want to adopt. We strive to provide the best experience for both adopters and pet owners.
            </Typography>
          </Grid>

          {/* Links Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" underline="hover" display="block">
              Home
            </Link>
            <Link href="/contact" color="inherit" underline="hover" display="block">
              About Us
            </Link>
          </Grid>

          {/* Social Media Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box display="flex" gap={2}>
              <IconButton color="inherit" href="https://facebook.com" target="_blank">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" href="https://twitter.com" target="_blank">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" href="https://instagram.com" target="_blank">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" href="https://linkedin.com" target="_blank">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
        <Box mt={4} textAlign="center">
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} PetHub. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

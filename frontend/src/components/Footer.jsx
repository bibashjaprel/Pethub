import React from 'react';
import { Container, Grid, Typography, Link, Box, IconButton, Divider } from '@mui/material';
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
              PetHub connects passionate pet lovers with pets in need of a loving home. Our mission is to provide a smooth, hassle-free adoption experience.
            </Typography>
          </Grid>

          {/* Links Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
              Home
            </Link>
            <Link href="/about-us" color="inherit" underline="hover" display="block" sx={{ mb: 1 }}>
              About Us
            </Link>
          </Grid>

          {/* Social Media Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box display="flex" gap={2}>
              <IconButton color="inherit" href="https://facebook.com" target="_blank" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" href="https://twitter.com" target="_blank" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" href="https://instagram.com" target="_blank" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" href="https://linkedin.com" target="_blank" aria-label="LinkedIn">
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />

        {/* Copyright Section */}
        <Box textAlign="center">
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} PetHub. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Button,
  styled,
} from '@mui/material';
import { Pets, People } from '@mui/icons-material';

const Section = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 0),
  backgroundColor: theme.palette.background.default,
}));

const TeamMember = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

const AboutUs = () => {
  return (
    <Box className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <Section sx={{ textAlign: 'center', py: 6, backgroundColor: 'primary.main' }}>
        <Container maxWidth="md">
          <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 2, color:"white"}}>
            About PetHub
          </Typography>
          <Typography variant="h6" color="white" sx={{ mb: 4 }}>
            Connecting pets with loving homes and families.
          </Typography>
          <Pets fontSize="large" color="primary" />
        </Container>
      </Section>

      {/* Mission Statement */}
      <Section>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Our Mission
          </Typography>
          <Typography variant="body1" color="textSecondary">
            At PetHub, we are dedicated to helping animals find their forever homes. 
            We work with shelters and adoption centers to provide a safe, friendly platform 
            where you can find pets that need a loving family. We believe every pet deserves a 
            chance to find a happy home.
          </Typography>
        </Container>
      </Section>

      {/* Our Vision */}
      <Section>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Our Vision
          </Typography>
          <Typography variant="body1" color="textSecondary">
            We envision a world where no pet is left without a family. Our vision is to create a 
            community-driven platform that promotes responsible pet ownership, spreads awareness 
            about animal welfare, and makes the pet adoption process seamless and joyful.
          </Typography>
        </Container>
      </Section>

      {/* Our Team */}
      <Section>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
            Meet Our Team
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {/* Bibash Japrel */}
            <Grid item xs={12} md={5}>
              <TeamMember elevation={3}>
                <Avatar
                  src="https://www.bibashjaprel.com.np/images/aboutsecphoto%20(2).jpg"
                  alt="Bibash Japrel"
                  sx={{ width: 80, height: 80, mr: 3 }}
                />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Bibash Japrel
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Team Leader - Passionate about guiding the team and ensuring successful projects.
                  </Typography>
                </Box>
              </TeamMember>
            </Grid>

            {/* Binisha Shahi */}
            <Grid item xs={12} md={5}>
              <TeamMember elevation={3}>
                <Avatar
                  src="https://via.placeholder.com/150?text=BS"
                  alt="Binisha Shahi"
                  sx={{ width: 80, height: 80, mr: 3 }}
                />
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    Binisha Shahi
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Developer - Dedicated to creating and enhancing user-friendly features.
                  </Typography>
                </Box>
              </TeamMember>
            </Grid>
          </Grid>
        </Container>
      </Section>

      {/* Call to Action */}
      <Section sx={{ textAlign: 'center', py: 6 }}>
        <Container maxWidth="md">
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            Join Us in Making a Difference
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 4 }}>
            Whether you’re looking to adopt a pet, volunteer, or donate, there are many ways to help our cause. 
            Together, we can create a better world for animals.
          </Typography>

          <Button
            component={Link}
            to="https://github.com/bibashjaprel/Pethub"
            variant="contained"
            color="primary"
            size="large"
            startIcon={<People />}
            target="_blank" // Open in a new tab
            >
          Get Involved
        </Button>
        </Container>
      </Section>
    </Box>
  );
};

export default AboutUs;

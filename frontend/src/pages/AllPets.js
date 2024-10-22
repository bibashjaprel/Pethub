import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Paper, Typography, CircularProgress, Button, styled } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import { useParams, Link } from 'react-router-dom';

const Label = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
}));

const HomePage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { type } = useParams();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/pets?type=${type || ''}`);
        setPets(response.data);
      } catch (err) {
        setError('Error fetching pets');
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [type]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2, color: 'blue' }}>
          Loading...
        </Typography>
      </div>
    );
  }

  if (error) {
    return (
      <Typography variant="body1" sx={{ color: 'red', textAlign: 'center', mt: 10 }}>
        {error}
      </Typography>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <Typography variant="h3" sx={{ fontWeight: 'bold', mb: 6, textAlign: 'center' }}>
        {type ? `${type}s` : 'Pets'} available for adoption near you
      </Typography>
      <Box sx={{ width: '100%', minHeight: 800 }}>
        {pets.length ? (
          <Masonry columns={4} spacing={2}>
            {pets.map((pet) => (
              <div key={pet._id} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Link to={`/${pet.species.toLowerCase()}/${pet._id}`} style={{ textDecoration: 'none' }}>
                  <img
                    src={pet.image || 'https://plus.unsplash.com/premium_photo-1675437553489-0ddf979f299a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'} // Use pet.image if available
                    alt={pet.name}
                    loading="lazy"
                    style={{
                      borderBottomLeftRadius: 4,
                      borderBottomRightRadius: 4,
                      display: 'block',
                      width: '100%',
                      height: 'auto',
                      objectFit: 'cover',
                    }}
                  />
                </Link>
                <Typography sx={{ padding: 1 }}>
                  <strong>{pet.name}</strong><br />
                  <strong>Species:</strong> {pet.species}<br />
                  <strong>Breed:</strong> {pet.breed}<br />
                  <strong>Age:</strong> {pet.age}<br />
                  <strong>Description:</strong> {pet.description}
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                  Adopt {pet.name}
                </Button>
              </div>
            ))}
          </Masonry>
        ) : (
          <Typography variant="body1" sx={{ color: 'red', textAlign: 'center', mt: 10 }}>
            No {type ? `${type}s` : 'pets'} available for adoption now.
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default HomePage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Paper,
  Typography,
  Button,
  styled,
  TextField,
  IconButton,
  AppBar,
  Toolbar,
  Skeleton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Masonry from '@mui/lab/Masonry';
import { useParams, Link } from 'react-router-dom';

const PetCard = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: 8,
  overflow: 'hidden',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[5],
  },
}));

const Allpets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { type } = useParams();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const token = localStorage.getItem('authToken');
        axios.defaults.baseURL = 'https://pethub-backend-3te5.onrender.com';
        const response = await axios.get(`/api/v1/pets/availabe/?type=${type || ''}`, {
          headers: {
             Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setPets(response.data);
        } else {
          setError(`Error fetching pets: ${response.statusText}`);
        }
      } catch (err) {
        if (err.response) {
          setError(`Server Error: ${err.response.status} - ${err.response.data.message || 'Something went wrong'}`);
        } else if (err.request) {
          setError('Network Error: No response received from the server');
        } else {
          // Something happened in setting up the request
          setError(`Error: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [type]);

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <AppBar
        position="sticky"
        sx={{
          top: 0,
          mb: 4,
          transition: 'all 0.3s ease-in-out',
          zIndex: 1201,
          backgroundColor: '#1976d2',
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'start' }}>
            Available Pets
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#f0f0f0',
              borderRadius: 1,
              transition: 'all 0.3s ease',
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                width: 200,
                '& .MuiOutlinedInput-root': {
                  height: 36,
                  paddingRight: 0,
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
              InputProps={{
                endAdornment: (
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ width: '100%', minHeight: 800 }}>
        {loading ? (
          // Show Skeleton loaders instead of circular progress
          <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
            {[...Array(8)].map((_, index) => (
              <PetCard key={index} sx={{ p: 2 }}>
                <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 2 }} />
                <Skeleton width="60%" sx={{ mt: 2 }} />
                <Skeleton width="80%" sx={{ mt: 1 }} />
                <Skeleton width="50%" sx={{ mt: 1 }} />
                <Skeleton width="90%" sx={{ mt: 1 }} />
                <Skeleton width="40%" sx={{ mt: 2 }} />
              </PetCard>
            ))}
          </Masonry>
        ) : error ? (
          <Typography variant="body1" sx={{ color: 'red', textAlign: 'center', mt: 10 }}>
            {error}
          </Typography>
        ) : (
          <>
            {filteredPets.length ? (
              <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
                {filteredPets.map((pet) => (
                  <PetCard key={pet._id} sx={{ p: 2 }}>
                    <Link to={`/${pet.species.toLowerCase()}/${pet._id}`} style={{ textDecoration: 'none' }}>
                      <img
                        src={
                          pet.image ||
                          'https://plus.unsplash.com/premium_photo-1675437553489-0ddf979f299a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                        }
                        alt={pet.name}
                        loading="lazy"
                        style={{
                          borderRadius: 8,
                          display: 'block',
                          width: '100%',
                          height: 'auto',
                          objectFit: 'cover',
                        }}
                      />
                    </Link>
                    <Typography sx={{ padding: 1 }}>
                      <strong>{pet.name}</strong>
                      <br />
                      <strong>Species:</strong> {pet.species}
                      <br />
                      <strong>Breed:</strong> {pet.breed}
                      <br />
                      <strong>Age:</strong> {pet.age}
                      <br />
                      <strong>Description:</strong> {pet.description}
                      <br />
                      <strong>Donor:</strong> {pet.donor ? pet.donor.name : 'Unknown'}
                    </Typography>
                    <Link to={`/${pet.species.toLowerCase()}/${pet._id}`} style={{ textDecoration: 'none' }}>
                      <Button variant="contained" color="primary" fullWidth sx={{ mt: 1 }}>
                        Adopt {pet.name}
                      </Button>
                    </Link>
                  </PetCard>
                ))}
              </Masonry>
            ) : (
              <Typography variant="body1" sx={{ color: 'red', textAlign: 'center', mt: 10 }}>
                No {type ? `${type}s` : 'pets'} available for adoption now.
              </Typography>
            )}
          </>
        )}
      </Box>
    </div>
  );
};

export default Allpets;


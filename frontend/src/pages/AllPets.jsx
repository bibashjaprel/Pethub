import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Button,
  styled,
  TextField,
  IconButton,
  AppBar,
  Toolbar,
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

const HomePage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
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

  const handleSearch = () => {

  };

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

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <AppBar position="static" sx={{ mb: 4 }}>
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1, textAlign: 'start' }}>
          <Typography variant="h6">Available pets</Typography>
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: 1 }}>
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
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ width: '100%', minHeight: 800 }}>
        {filteredPets.length ? (
          <Masonry
            columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
            spacing={2}
          >
            {filteredPets.map((pet) => (
              <PetCard key={pet._id} sx={{ p: 2 }}>
                <Link to={`/${pet.species.toLowerCase()}/${pet._id}`} style={{ textDecoration: 'none' }}>
                  <img
                    src={pet.image || 'https://plus.unsplash.com/premium_photo-1675437553489-0ddf979f299a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
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
                  <strong>{pet.name}</strong><br />
                  <strong>Species:</strong> {pet.species}<br />
                  <strong>Breed:</strong> {pet.breed}<br />
                  <strong>Age:</strong> {pet.age}<br />
                  <strong>Description:</strong> {pet.description}
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
      </Box>
    </div>
  );
};

export default HomePage;

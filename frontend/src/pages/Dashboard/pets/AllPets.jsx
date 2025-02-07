import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  styled,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  AppBar,
  Toolbar,
  Skeleton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Masonry from '@mui/lab/Masonry';
import { Link } from 'react-router-dom';
import { getAvailablePets } from '../../../utils/apiHelpers';

// Styled Pet Card Component
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

// Filter Component for each select
const FilterSelect = ({ label, value, onChange, options, name }) => (
  <FormControl sx={{ minWidth: 120 }}>
    <InputLabel sx={{ color: '#1976d2' }}>{label}</InputLabel> {/* Adjust color for better visibility */}
    <Select
      name={name}
      value={value}
      onChange={onChange}
      displayEmpty
      sx={{
        backgroundColor: '#f9f9f9', // Lighter background for better contrast
        '& .MuiSelect-root': {
          color: '#333', // Darker text color
        },
        '& .MuiOutlinedInput-root': {
          borderRadius: 5,
          borderColor: '#1976d2', // Border color to match theme
        },
        '& .MuiInputLabel-root': {
          fontWeight: 'bold', // Make label text bold for clarity
        },
      }}
    >
      <MenuItem value="">
        <em>All</em>
      </MenuItem>
      {options.map((option) => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const Allpets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    species: '',
    breed: '',
    status: '',
    age: '',
  });

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getAvailablePets();
        setPets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const filteredPets = pets.filter((pet) => {
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecies = filters.species ? pet.species === filters.species : true;
    const matchesBreed = filters.breed ? pet.breed === filters.breed : true;
    const matchesAge = filters.age ? pet.age === filters.age : true;

    return matchesSearch && matchesSpecies && matchesBreed && matchesAge;
  });

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const clearFilters = () => {
    setFilters({ species: '', breed: '', status: '', age: '' });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <AppBar position="sticky" sx={{ top: 0, mb: 4, backgroundColor: '#1976d2' }}>
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

      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap', justifyContent: 'center' }}>
        <FilterSelect
          label=""
          value={filters.species}
          onChange={handleFilterChange}
          options={[...new Set(pets.map((pet) => pet.species))]}
          name="species"
        />

        <FilterSelect
          label=""
          value={filters.breed}
          onChange={handleFilterChange}
          options={[...new Set(pets.map((pet) => pet.breed))]}
          name="breed"
        />

        <FilterSelect
          label=""
          value={filters.age}
          onChange={handleFilterChange}
          options={[...new Set(pets.map((pet) => pet.age))]}
          name="age"
        />

        <Button
          variant="outlined"
          onClick={clearFilters}
          sx={{
            padding: '10px 20px',
            backgroundColor: '#fff',
            color: '#1976d2',
            borderColor: '#1976d2',
            '&:hover': {
              backgroundColor: '#1976d2',
              color: '#fff',
            },
          }}
        >
          Clear All Filters
        </Button>
      </Box>

      <Box sx={{ width: '100%', minHeight: 800 }}>
        {loading ? (
          <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={2}>
            {[...Array(8)].map((_, index) => (
              <PetCard key={index} sx={{ p: 2 }}>
                <Skeleton variant="rectangular" width="100%" height={200} sx={{ borderRadius: 2 }} />
                <Skeleton width="60%" sx={{ mt: 2 }} />
                <Skeleton width="80%" sx={{ mt: 1 }} />
                <Skeleton width="50%" sx={{ mt: 1 }} />
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
                        src={pet.image || 'https://via.placeholder.com/150'}
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
                No pets available for adoption now.
              </Typography>
            )}
          </>
        )}
      </Box>
    </div>
  );
};

export default Allpets;

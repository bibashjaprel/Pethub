const express = require('express');
const cors = require('cors');
const app = express();
const connectDB = require('./config/dbconfig.js');
require('dotenv').config();
const PORT = process.env.PORT;

const userRoutes = require('./routes/user.routes.js');
const petRoutes = require('./routes/pet.routes.js');
const adoptionRoutes = require('./routes/petAdoption.routes.js')
const petDonateRoutes = require('./routes/petDonate.routes.js')
// const adoptionRequestRoutes = require('./routes/adoptionapplication.routes.js')


connectDB();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: ['http://localhost:3000', 'https://pethub-rosy.vercel.app'], 
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/pets', petRoutes);
app.use('/api/v1/adoption', adoptionRoutes);
app.use('/api/v1/donate', petDonateRoutes);
// app.use('/api/v1/adoptionrequest', adoptionRequestRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

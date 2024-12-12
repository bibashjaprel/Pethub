const mongoose = require('mongoose');
const Pet = require('../models/pet.models.js');
const cloudinary = require('../config/cloudinary.js');

// Get all approved pets
const getPets = async (req, res) => {
  try {
    const pets = await Pet.find().populate('doner', 'firstname lastname');
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch all pets' });
  }
};

// Get available pets
const getAvailablePets = async (req, res) => {
  try {
    const pets = await Pet.find({ status: 'available' }).sort({ createdAt: -1 });
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch available pets' });
  }
};

// Get pending pets
const getPendingPets = async (req, res) => {
  try {
    const pets = await Pet.find({ status: 'Pending' }).populate('doner', 'firstname lastname');
    res.status(200).json(pets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pending pets' });
  }
};

// Update pet status
const updatePendingPetStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid pet ID' });
  }

  if (!['available', 'Pending'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const updatedPet = await Pet.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedPet) {
      return res.status(404).json({ error: 'Pet not found' });
    }
    res.status(200).json(updatedPet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update pet status' });
  }
};

// Get single pet
const getPet = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid pet ID' });
  }

  try {
    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ error: 'No such pet found' });
    }
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch pet' });
  }
};

// Create pet with image upload
const createPet = async (req, res) => {
  const { name, species, breed, age, description } = req.body;
  let emptyFields = [];

  if (!name) emptyFields.push('name');
  if (!species) emptyFields.push('species');
  if (!breed) emptyFields.push('breed');
  if (!age) emptyFields.push('age');
  if (!description) emptyFields.push('description');

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill all fields', emptyFields });
  }

  try {
    let imageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: 'pets' });
      imageUrl = result.secure_url;
    }

    const pet = await Pet.create({ name, species, breed, age, description, image: imageUrl });
    res.status(201).json(pet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete pet
const deletePet = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid pet ID' });
  }

  try {
    const pet = await Pet.findOneAndDelete({ _id: id });
    if (!pet) {
      return res.status(404).json({ error: 'No such pet found' });
    }
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete pet' });
  }
};

// Update pet with image upload
const updatePet = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid pet ID' });
  }

  try {
    const pet = await Pet.findById(id);
    if (!pet) {
      return res.status(404).json({ error: 'No such pet found' });
    }

    let imageUrl = pet.image;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, { folder: 'pets', width: 500, height: 500, crop: 'fill' });
      imageUrl = result.secure_url;
    }

    const updatedPet = await Pet.findOneAndUpdate(
      { _id: id },
      { ...req.body, image: imageUrl },
      { new: true }
    );

    res.status(200).json(updatedPet);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update pet' });
  }
};

module.exports = {
  getPets,
  getPet,
  createPet,
  deletePet,
  updatePet,
  getPendingPets,
  getAvailablePets,
  updatePendingPetStatus,
};

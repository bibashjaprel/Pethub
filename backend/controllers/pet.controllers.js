const mongoose = require('mongoose')
const Pet = require('../models/pet.models.js')

// get all pets
const getPets = async (req, res)=>{
  const pets = await Pet.find({});
  res.status(200).json(pets);
}

// get single pet
const getPet = async (req, res)=>{
  const {id} = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such pet'})
  }

  const pet = await Pet.findById(id)
  if (!pet) {
    return res.status(404).json({error: 'No such Pet'})
  }
  res.status(200).json(pet)
}


// create pet
const createPet = async (req, res) => {
  const {name, species, breed, age, description} = req.body
  
  let emptyFields = []

  if(!name){
    emptyFields.push('name')
  }
  if(!species){
    emptyFields.push('species')
  }
  if(!breed){
    emptyFields.push('breed')
  }
  if(!age){
    emptyFields.push('age')
  }
  if(!description){
    emptyFields.push('description')
  }

  if(emptyFields.length > 0){
    return res.status(400).json({error: 'Please fill the all fields', emptyFields})
  }

  //adding to the database
  try{
    const pet = await Pet.create({name, species, breed, age, description})
    res.status(201).json(pet)
  }catch(error){
    res.status(400).json({error: error.message})
  }
}


//delete pet
const deletePet = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such pet'})
  }

  const pet = await Pet.findOneAndDelete({_id: id})

  if(!pet) {
    return res.status(400).json({error: 'No such Pet'})
  }
  res.status(200).json(pet)
}

// update pet 
const updatePet = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such Pet'})
  }
  const pet = await Pet.findOneAndUpdate({_id: id}, {
    ...req.body
  })
  if (!pet) {
    return res.status(400).json({error: 'No such Pet'})
  }

  res.status(200).json(pet)
}

module.exports = {
  getPets,
  getPet,
  createPet,
  deletePet,
  updatePet
}

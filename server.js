const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const FoodModel = require('./models/Food');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'  // Allow requests from your React frontend
}));

// MongoDB connection
mongoose.connect("mongodb+srv://enzokaduri:vilbEtsjo7nHiLd0@crud.bpvgn.mongodb.net/food?retryWrites=true&w=majority&appName=CRUD")
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// POST route to insert food data
app.post('/insert', async (req, res) => {
  const { foodName, days } = req.body;
  const food = new FoodModel({ foodName, daysSinceIAte: days });

  try {
    await food.save();
    res.status(200).send("Food saved successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error saving food");
  }
});


app.put('/update', async (req, res) => {
  const { newFoodName, id } = req.body;

  try {
    const updateFood = await FoodModel.findById(id); // Use await to fetch the document
    if (updateFood) {
      updateFood.foodName = newFoodName; // Update the field
      await updateFood.save(); // Save the updated document
      res.send("update successful");
    } else {
      res.status(404).send("Food not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating food");
  }
});

app.delete('/delete/:id',async (req,res)=>{
   const id = req.params.id;
   await FoodModel.findByIdAndDelete(id).exec();
   res.send("deleted");
});

app.get('/read', async (req, res) => {
   try {
     const result = await FoodModel.find({});
     res.send(result);
   } catch (error) {
     console.log(error);
     res.status(500).send("Error reading data");
   }
 });
 

// Start the server
app.listen(8800, () => {
  console.log("Server running on port 8800");
});

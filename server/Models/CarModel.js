import mongoose from "mongoose";

// Define the schema for a car
const CarSchema = new mongoose.Schema({
  wilayat: {
     type: String, 
     required: true 
    },
  startDate: {
     type: Date, 
     required: true 
    },
  endDate: { 
    type: Date, 
    required: true 
  },
  startTime: { 
    type: String, 
    required: true 
  },
  endTime: { 
    type: String, 
    required: true 
  },
});

const CarModel = mongoose.model("Car", CarSchema);
export default CarModel;

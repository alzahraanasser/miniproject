import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for booking a car


export const booking = createAsyncThunk(
  "cars/booking",
  async (carData) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/booking`, {
        wilayat: carData.wilayat,
        startDate: carData.startDate,
        endDate: carData.endDate,
        startTime: carData.startTime,
        endTime: carData.endTime,
      });
      const cars = response.data.cars;
      const msg = response.data.msg;
      console.log(msg);
      return { cars, msg };
    } catch (error) {
      const msg = error.message;
      return { msg };
    }
  }
);

export const getrent = createAsyncThunk("rent/getrent", async () => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/getrent`);
    return response.data.cars;
  } catch (error) {
    console.log(error);
  }
});

// Update car details
export const updateCarDetails = createAsyncThunk(
  "cars/updateCarDetails",
  async (carData) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/updateCar/${carData.id}`,
        carData
      );
      return response.data;
    } catch (error) {
      console.error("Error updating car:", error.message);
      throw error;
    }
  }
);

// Initial state for the car slice
const initialState = {
  cars: [],
  msg: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
};

// Create the car slice
export const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(booking.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(booking.fulfilled, (state, action) => {
        state.isSuccess = true; // Set success state
        state.cars = action.payload.cars; // Set car data
        state.msg = action.payload.msg; // Set success message
      })
      .addCase(booking.rejected, (state, action) => {
        state.isError = true; // Set error state
        state.msg = action.payload.msg || "Unexpected error occurred"; // Set error message
      })
      .addCase(getrent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getrent.fulfilled, (state, action) => {
        state.status = "succeeded";
      // Update the state with fetched posts
        console.log(action.payload);
        state.cars = action.payload;
      })
      .addCase(getrent.rejected, (state, action) => {
        state.status = "failed";
        state.msg = action.payload.msg
      })
      .addCase(updateCarDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCarDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedCar = action.payload;
        state.cars = state.cars.map((car) =>
          car._id === updatedCar._id ? updatedCar : car
        );
      })
      .addCase(updateCarDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.msg = action.error.message;
      });
  },
});

// Export the reducer
export default carSlice.reducer;
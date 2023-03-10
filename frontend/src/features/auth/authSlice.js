// reducers and initial state will be stpred here

// Thunk functions-- related to middleware
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Get user from local storage
// parsing it because local storage can only have Strings
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
// Thunk function- deals with async data and backend
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message)
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // so tht we can reset the state to the original value
    reset: (state) => {
      (state.isLoading = false),
        (state.isError = false),
        (state.isSuccess = false),
        (state.message = "");
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(register.pending, (state)=>{
        state.isLoading= true
    })
    .addCase(register.fulfilled, (state, action)=> {
        state.isLoading = false
        state.isSuccess = true
        state.user = action.payload
    })
    .addCase(register.rejected , (state, action) => {
        state.isLoading = false
        state.isError= true
        state.message= action.payload 
        state.user= null
    })
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;

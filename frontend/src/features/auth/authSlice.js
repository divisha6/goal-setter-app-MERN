// reducers and initial state will be stpred here

// Thunk functions-- related to middleware
import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'

// Get user from local storage
// parsing it because local storage can only have Strings
const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
    user: user ? user : null,
    isError : false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        // so tht we can reset the state to the original value
        reset: (state) => {
            state.isLoading = false,
            state.isError = false,
            state.isSuccess= false,
            state.message= ""
        },
    },
    extraReducers: {}
})

export const {reset} = authSlice.actions;
export default authSlice.reducer;

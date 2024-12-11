import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching paginated users (messages)
export const fetchMessages = createAsyncThunk(
  'messages/fetchMessages',
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://gorest.co.in/public/v1/users?page=${page}`
      );
      return response.data; // Returns paginated user data
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],   // List of fetched users (messages)
    page: 1,        // Current page
    total: 0,       // Total number of users
    loading: false,
    error: null,
  },
  reducers: {
    resetMessages: (state) => {
      state.messages = [];
      state.page = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = [...action.payload.data, ...state.messages]; // Append to messages
        state.total = action.payload.meta.pagination.total;
        state.page += 1; // Increment page number
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetMessages } = messageSlice.actions;
export default messageSlice.reducer;

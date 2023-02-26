import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchWeatherData = createAsyncThunk('fetchWeatherData', async (cityName) => {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid={YOUR_API_KEY}');
    return response.json();
});

const weatherSlice = createSlice({
    name: "weather",
    initialState: {
        isLoading: false,
        data: null,
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWeatherData.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchWeatherData.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchWeatherData.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        })
    }
});

export default weatherSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth'; // Import the auth reducer
import statsReducer from './stats';

const store = configureStore({
    reducer: {
        // Add your reducers here
        auth: authReducer,
        stats: statsReducer,
    },
});

export default store;
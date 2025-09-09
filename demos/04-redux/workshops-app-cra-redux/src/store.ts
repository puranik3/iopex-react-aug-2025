import { configureStore } from '@reduxjs/toolkit';
import { themeReducer } from './features/themeSlice';

/**
 * state -> {
        theme: {
            value: 'light',
            contrastValue: 'dark'
        }
    }
 */
const store = configureStore({
    reducer: {
        theme: themeReducer
    }
});

export default store;
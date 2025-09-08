import { createSlice } from "@reduxjs/toolkit";

type Theme = "light" | "dark";

interface ThemeState {
    value: Theme;
    contrastValue: Theme;
}

const initialState : ThemeState = {
    value: 'light',
    contrastValue: 'dark'
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        // type: 'theme/toggleTheme'. Also creates action creators.
        // if the dispatched action has a payload property, this function receives it as the 2nd argument
        toggleTheme(state/*, payload */) {
            // no need for complicated spread to copy object - we instead receive a "draft state" - do whatever changes on this object - no need to return.
            // return {
            //     ...state,
            //     value: {
            //         ...state
            //         theme: state.value === 'light' ? 'dark' : 'light'
            //     }
            // }
            state.contrastValue = state.value;
            state.value = ( state.value === 'light' ? 'dark' : 'light' );
        },
        // // type: 'theme/decrement'
        // decrement() {

        // }
        // // type: 'theme/increment'
        // increment() {

        // }
    }
});

const { toggleTheme } = themeSlice.actions;
const themeReducer = themeSlice.reducer;

export {
    themeSlice as default,
    toggleTheme,
    themeReducer
}
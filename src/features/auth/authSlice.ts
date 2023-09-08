import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
    name: string,
    email: string
}

interface InitialState {
    accessToken: null | string,
    user: null | User,
}

const initialState: InitialState = {
    accessToken: null,
    user: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoggedIn: (state, action: PayloadAction<InitialState>) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        },
        userLoggedOut: (state) => {
            state.accessToken = null;
            state.user = null;
        },
    },
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
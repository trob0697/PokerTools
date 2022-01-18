import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuth: false,
        info: {}
    },
    reducers: {
        maintainAuthorization: (state) => {
            state.isAuth = true;
        },
        authorize: (state, action) => {
            state.isAuth = true;
            state.info = action.payload;
        },
        deauthorize: (state) => {
            state.isAuth = false;
            state.info = {};
        }
    }
});

export const { maintainAuthorization, authorize, deauthorize } = userSlice.actions;

export default userSlice.reducer;
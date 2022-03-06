import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: "",
    id: null,
    email: null,
    verified: null,
    active: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        authorize: (state, action) => {
            state.token = action.payload.access_token;
            state.id = action.payload.id;
            state.email = action.payload.email;
            state.verified = action.payload.verified;
            state.active = action.payload.active;
        },
        deauthorize: () => {
            return initialState;
        }
    }
});

export const { authorize, deauthorize } = userSlice.actions;

export default userSlice.reducer;
import { profileCreate } from "../../api/create";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


const initialState = {};

export const fetchProfileCreate = createAsyncThunk(
    "profileCreate/fetchProfileCreate",
    async (data, { dispatch }) => {
        const response = await profileCreate(data);
        dispatch(postUser(response));
        return response
    }
);

export const profileCreateSlice = createSlice({
    name: "profileCreate",
    initialState,
    reducers: {
        postUser: (state, action) => {
            state = action.payload;
            return state;
        },
    },
});

export const { postUser } = profileCreateSlice.actions;
export default profileCreateSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: "",
    name: "",
    email: "",
    role: "",
    isAuth: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            const { _id, name, email, role } = action.payload;
            state._id = _id;
            state.name = name;
            state.email = email;
            state.role = role;
            state.isAuth = true;
        },
        removeUser: (state) => {
            state._id = "";
            state.email = "";
            state.name = "";
            state.role = "";
            state.isAuth = false;
        }
    }
})

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
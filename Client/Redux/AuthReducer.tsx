import { createSlice } from "@reduxjs/toolkit";

const InitialState={
    Mode:"Light",
    User:null,
    Token:null,
    Posts:[]
}

export const AuthSlice=createSlice({
    name:"Auth",
    initialState:InitialState,
    reducers:{
        SetMode:(State)=>{
            State.Mode = State.Mode==="Light" ? "Dark":"Light";
        },
    }

})

export const {SetMode} =AuthSlice.actions;
export default AuthSlice.reducer;
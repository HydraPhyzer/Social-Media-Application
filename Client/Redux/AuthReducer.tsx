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
        SetLogIn:(State,Action)=>{
            State.User=Action.payload.User;
            State.Token=Action.payload.Token;
        },
        SetLogOut:(State)=>{
            State.User=null;
            State.Token=null;
        }
    }

})

export const {SetMode,SetLogIn,SetLogOut} =AuthSlice.actions;
export default AuthSlice.reducer;
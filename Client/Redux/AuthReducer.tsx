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
        },
        SetPost:(State,Action)=>{
            State.Posts=Action.payload.Post
        }
    }

})

export const {SetMode,SetLogIn,SetLogOut,SetPost} =AuthSlice.actions;
export default AuthSlice.reducer;
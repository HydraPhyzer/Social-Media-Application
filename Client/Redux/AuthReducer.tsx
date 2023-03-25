import { createSlice } from "@reduxjs/toolkit";

const InitialState = {
  Mode: "Light",
  User: null,
  Token: null,
  Posts: [],
  Chats: {},
};

export const AuthSlice = createSlice({
  name: "Auth",
  initialState: InitialState,
  reducers: {
    SetMode: (State) => {
      State.Mode = State.Mode === "Light" ? "Dark" : "Light";
    },
    SetLogIn: (State, Action) => {
      State.User = Action.payload.User;
      State.Token = Action.payload.Token;
    },
    SetLogOut: (State) => {
      State.User = null;
      State.Token = null;
      State.Posts = [];
      State.Chats = [];
    },
    SetPost: (State, Action) => {
      State.Posts = Action.payload.Post;
    },
    SetUser: (State, Action) => {
      State.User = Action.payload.User;
    },
    PatchEachPost: (State, Action) => {
      const UpdatedPost: any = State.Posts.map((Each: any) => {
        if (Each?._id === Action.payload.Post?._id) {
          return Action.payload.Post;
        }
        return Each;
      });
      State.Posts = UpdatedPost;
    },
    SetChats: (State, Action) => {
      State.Chats = Action.payload.Chats;
    },
  },
});

export const {
  SetMode,
  SetLogIn,
  SetLogOut,
  SetPost,
  SetUser,
  PatchEachPost,
  SetChats,
} = AuthSlice.actions;
export default AuthSlice.reducer;

import Avatar from "../Avatar/Avatar";

import React, { useEffect, useMemo, useState } from "react";
import { createTheme, ThemeOptions, useMediaQuery } from "@mui/material";
import { CustomTheme } from "../../Components/Themes/CustomTheme";
import { ThemeSettings } from "../../Components/Themes/Themes";
import Axios from "../../Components/Axios/Axios";
import { SetChats, SetTypingUsers } from "../../Redux/AuthReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const EachChatUser = ({ Friends, Socket }: any) => {
  const Mode = useSelector((State: any) => State.Mode);
  const User = useSelector((State: any) => State.User);
  const OnlineUsers = useSelector((State: any) => State.OnlineUsers);

  // let [TyUser, SetTyUser] = useState<any>(null);

  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);
  let Dispatch = useDispatch();

  // useEffect(() => {
  //   // alert("Good")
  //   Socket?.emit("Get-TypingUsers", User?._id);
  //   Socket?.on("Take-TypingUsers", (Data: any) => {
  //     console.log("Your Data :", Data);
  //     SetTyUser((Prev:any)=>[...Data]);
  //   });
  // }, [Socket]);

  const TypingUsers = useSelector((state: any) => state.TypingUsers);

  useEffect(() => {
    Socket?.emit("Get-TypingUsers", {SenderId:User?._id, ReceiverId:Friends?._id});
    Socket?.on("Take-TypingUsers", (Data: any) => {
      // SetTyUser([...Data]);
      console.log("Typing Users :", Data);
      Dispatch(SetTypingUsers({ TypingUser: Data })); 
    });
  }, [Socket]);

  console.log("Typing Users :", TypingUsers);

  let ShowChat = async (UserId: string, FriendId: string) => {
    await Axios.get(`/getchats/${UserId}/${FriendId}`).then((Res) => {
      if (Res.data) {
        if (Res.data?.SenderID !== UserId) {
          let Depend = { ...Res.data, SenderID: UserId, ReceiverID: FriendId };
          Dispatch(SetChats({ Chats: Depend }));
        } else {
          Dispatch(SetChats({ Chats: Res.data }));
        }
      }
    });
  };

  return (
    <div
      className="p-2 flex gap-x-5 bg-red-500 rounded-md items-center mb-1 cursor-pointer w-full"
      style={{
        backgroundColor: Theme.Palette.Background.Default,
      }}
      onClick={() => {
        ShowChat(User?._id, Friends?._id);
      }}
    >
      <div>
        <Avatar
          Status={
            OnlineUsers?.some(
              (Each: { UserId: string; SocketId: string }) =>
                Each?.UserId == Friends?._id
            )
              ? true
              : false
          }
          Path={`http://localhost:7001/Assets/${Friends?.PicturePath}`}
        />
      </div>
      <div>
        <p
          className="text-sm"
          style={{
            color: Theme.Palette.Neutral.Dark,
          }}
        >
          {Friends?.FirstName + " " + Friends?.LastName}
        </p>
        <p
          className="text-xs"
          style={{
            color: Theme.Palette.Neutral.MediumMain,
          }}
        >
          {OnlineUsers?.some(
            (Each: { UserId: string; SocketId: string }) =>
              Each?.UserId == Friends?._id
          )
            ? TypingUsers?.some(
                (Each: { SenderId: string;ReceiverId:string; SocketId: string }) =>
                  // Each?.UserId == Friends?._id
                  Each?.SenderId == Friends?._id && Each?.ReceiverId == User?._id
              )
              ? "Typing..."
              : "Online"
            : "Offline"}
        </p>
      </div>
    </div>
  );
};

export default EachChatUser;

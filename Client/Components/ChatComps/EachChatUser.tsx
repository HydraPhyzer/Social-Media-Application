import Avatar from "../Avatar/Avatar";

import React, { useMemo } from "react";
import { createTheme, ThemeOptions, useMediaQuery } from "@mui/material";
import { CustomTheme } from "../../Components/Themes/CustomTheme";
import { useSelector } from "react-redux";
import { ThemeSettings } from "../../Components/Themes/Themes";
import Axios from "../../Components/Axios/Axios";
import {SetChats} from "../../Redux/AuthReducer";
import { useDispatch } from "react-redux";

const EachChatUser = ({ Friends }: any) => {
  const Mode = useSelector((State: any) => State.Mode);
  const User = useSelector((State: any) => State.User);
  const OnlineUsers = useSelector((State: any) => State.OnlineUsers);
  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);
  let Dispatch = useDispatch();

  let ShowChat = async (UserId: string, FriendId: string) => {
    await Axios.get(`/getchats/${UserId}/${FriendId}`).then((Res) => {
      if(Res.data){
        if(Res.data?.SenderID!==UserId){
          let Depend={...Res.data,SenderID:UserId,ReceiverID:FriendId}
          Dispatch(SetChats({Chats:Depend}));
        }
        else{
          Dispatch(SetChats({Chats:Res.data}));
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
        <Avatar Status={OnlineUsers?.some((Each:{UserId:string,SocketId:string})=>Each?.UserId==Friends?._id)?true:false} Path={`http://localhost:7001/Assets/${Friends?.PicturePath}`} />
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
          Last Seen at 19:45:53 PM
        </p>
      </div>
    </div>
  );
};

export default EachChatUser;

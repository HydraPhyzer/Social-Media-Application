import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeOptions, IconButton } from "@mui/material";
import { ThemeSettings } from "../../Themes/Themes";
import { CustomTheme } from "../../Themes/CustomTheme";
import Avatar from "../../Avatar/Avatar";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { SetUser } from "../../../Redux/AuthReducer";
import Axios from "../../Axios/Axios";
import { useRouter } from "next/router";

const FriendsList = ({ Friends }: any) => {
  const Mode = useSelector((State: any) => State.Mode);
  const User = useSelector((State: any) => State.User);
  let Router = useRouter();
  const OnlineUsers = useSelector((State: any) => State.OnlineUsers);
  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);

  let Dispatch = useDispatch();

  let RemoveFriend = async () => {
    let FrmData = new FormData();

    FrmData.append("UserId", User?._id);
    FrmData.append("FriendId", Friends?._id);
    try {
      let Start = await Axios.patch("/removefriend", FrmData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Dispatch(SetUser({ User: Start.data }));
      console.log(Start.data);
    } catch (Error) {}
  };

  return (
    <div className=" p-3 rounded-md text-sm">
      <div>
        <div className="flex justify-between items-center cursor-pointer">
          <section
            className="flex items-center gap-x-2"
            onClick={() => {
              Router.push(`/search/${Friends?._id}`);
            }}
          >
            <Avatar
              Status={
                OnlineUsers?.some(
                  (Each: { UserId: string; SocketId: string }) =>
                    Each?.UserId == Friends?._id
                )
                  ? true
                  : false
              }
              Path={`http://localhost:8001/Assets/${Friends?.PicturePath}`}
            />
            <p className="hover:underline hover:cursor-pointer">
              {Friends?.FirstName + " " + Friends?.LastName}
            </p>
          </section>

          {User?.Friends?.includes(Friends?._id) ? (
            <IconButton onClick={RemoveFriend}>
              <PersonRemoveIcon
              className="p-1 bg-black rounded-full text-white"
              />
            </IconButton>
          ) : (
            <IconButton>
              <PersonAddAlt1Icon
              className="p-1 bg-black rounded-full text-green-400"
              />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
function Dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

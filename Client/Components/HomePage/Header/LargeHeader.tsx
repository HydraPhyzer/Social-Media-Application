import React, { useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import ChatIcon from "@mui/icons-material/Chat";
import Dialog from "./Dialog";
import { createTheme, IconButton, ThemeOptions } from "@mui/material";
import Avatar from "../../Avatar/Avatar";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { SetMode } from "../../../Redux/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import { ThemeSettings } from "../../Themes/Themes";
import { CustomTheme } from "../../Themes/CustomTheme";
import AppInfo from "../../AppInfo/AppInfo";
import { useRouter } from "next/router";
import Axios from "../../Axios/Axios";

const LargeHeader :any= () => {
  let [SearchedUser, setSearchUser] = React.useState([]);
  const User = useSelector((State: any) => {
    return State?.User;
  });
  const Mode = useSelector((State: any) => State.Mode);
  const Dispatch = useDispatch();
  let Router = useRouter();
  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);
  let SetMod = () => {
    Dispatch(SetMode());
  };

  let SearchUser = async (Value: string) => {
    if (Value) {
      let FrmData = new FormData();
      FrmData.append("Query", Value);
      try {
        let Res = await Axios.get(`/searchuser/${Value}`);
        setSearchUser(Res.data);
      } catch (Err) {}
    } else {
      setSearchUser([]);
    }
  };

  return (
    <div
      className="flex justify-between"
      style={{ backgroundColor: Theme.Palette.Background.Alt }}
    >
      <div className="flex gap-x-5 items-center ">
        <p
          className="text-[1.3rem] font-bold"
          style={{ color: Theme.Palette.Primary.Main }}
        >
          Connectify
        </p>
        <div
          className="bg-white flex items-center rounded-md px-2"
          style={{
            backgroundColor: Theme.Palette.Background.Default,
            color: Theme.Palette.Neutral.Main,
            position: "relative",
          }}
        >
          <div>
            <input
              className="outline-none bg-transparent"
              type="text"
              placeholder="Search ..."
              onChange={(E) => {
                SearchUser(E.target.value);
              }}
            />
            <div
              className="rounded-md p-2 flex flex-col gap-y-2"
              style={{
                width: "100%",
                maxHeight: "40vh",
                overflow: "scroll",
                position: "absolute",
                top: 45,
                left: 0,
                background: Theme.Palette.Background.Default,
                display: SearchedUser.length > 0 ? "flex" : "none",
              }}
            >
              {SearchedUser.map((User: any) => {
                return (
                  <div onClick={()=>{Router.push(`/search/${User._id}`);setSearchUser([])}} className="flex gap-2 items-center hover:cursor-pointer">
                    <Avatar
                      Path={`http://localhost:7001/Assets/${User?.PicturePath}`}
                    />
                    <p className="text-sm">
                      {User?.FirstName + " " + User?.LastName}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <IconButton>
            <SearchIcon
              className="text-red-500"
              style={{ color: Theme.Palette.Primary.Main }}
            />
          </IconButton>
        </div>
      </div>

      <div className="flex items-center gap-x-3">
        <IconButton
          onClick={SetMod}
          style={{ color: Theme.Palette.Primary.Main }}
        >
          <LightModeIcon className="hover:animate-spin"/>
        </IconButton>
        <IconButton style={{ color: Theme.Palette.Primary.Main }}>
          <CircleNotificationsIcon className="Bell"/>
        </IconButton>
        <AppInfo />

        <IconButton
          onClick={() => {
            Router.push("/chats");
          }}
          style={{ color: Theme.Palette.Primary.Main }}
        >
          <ChatIcon className="hover:animate-pulse" />
        </IconButton>
        <Dialog />
      </div>
    </div>
  );
};

export default LargeHeader;
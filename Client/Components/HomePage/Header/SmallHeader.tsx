import React, { useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import ChatIcon from "@mui/icons-material/Chat";
import Dialog from "./Dialog";
import { createTheme, Divider, IconButton, ThemeOptions } from "@mui/material";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { SetMode } from "../../../Redux/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import { ThemeSettings } from "../../Themes/Themes";
import { CustomTheme } from "../../Themes/CustomTheme";
import MenuIcon from "@mui/icons-material/Menu";
import AppInfo from "../../AppInfo/AppInfo";
import Axios from "../../Axios/Axios";
import { useRouter } from "next/router";
import Avatar from "../../Avatar/Avatar";

const SmallHeader = () => {
  const [Show, setShow] = React.useState(false);
  let [SearchedUser, setSearchUser] = React.useState([]);
  let Router = useRouter();
  const Mode = useSelector((State: any) => State.Mode);
  const Dispatch = useDispatch();
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
    <div>
      <div className="flex gap-x-5 items-center justify-between">
        <p
          className="text-[1.3rem] font-bold"
          style={{ color: Theme.Palette.Primary.Main }}
        >
          Connectify
        </p>
        <div
          className="bg-white flex items-center px-2 text-black rounded-md"
          style={{ backgroundColor: Theme.Palette.Background.Default }}
        >
          <IconButton
            onClick={() => {
              setShow(!Show);
            }}
            sx={{ color: Theme.Palette.Primary.Main }}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </div>
      {Show ? (
        <div>
          <Divider
            sx={{ border: 1, my: 1, color: Theme.Palette.Primary.Main }}
          />
          <div
            className="bg-white flex justify-between my-1 items-center px-2 rounded-md"
            style={{
              backgroundColor: Theme.Palette.Background.Default,
              color: Theme.Palette.Neutral.Main,
              position: "relative",
            }}
          >
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
                zIndex: 100,
                background: Theme.Palette.Background.Default,
                display: SearchedUser.length > 0 ? "flex" : "none",
              }}
            >
              {SearchedUser.map((User: any) => {
                return (
                  <div
                    onClick={() => {
                      Router.push(`/search/${User._id}`);
                      setSearchUser([]);
                    }}
                    className="flex gap-2 items-center hover:cursor-pointer"
                  >
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
            <IconButton>
              <SearchIcon
                className="text-red-500"
                style={{ color: Theme.Palette.Primary.Main }}
              />
            </IconButton>
          </div>
          <div className="flex justify-between items-center gap-x-3 my-3">
            <IconButton
              onClick={SetMod}
              className="w-[25%]"
              style={{
                color: Theme.Palette.Primary.Main,
                backgroundColor: Theme.Palette.Background.Default,
                borderRadius: "5px",
              }}
            >
              <LightModeIcon />
            </IconButton>

            <IconButton
              className="w-[25%]"
              style={{
                color: Theme.Palette.Primary.Main,
                backgroundColor: Theme.Palette.Background.Default,
                borderRadius: "5px",
              }}
            >
              <CircleNotificationsIcon />
            </IconButton>
            <IconButton
              className="w-[25%]"
              style={{
                backgroundColor: Theme.Palette.Background.Default,
                color: Theme.Palette.Primary.Main,
                borderRadius: "5px",
              }}
              onClick={() => {
                Router.push("/chats");
              }}
            >
              <ChatIcon />
            </IconButton>
          </div>
          <div>
            <Dialog />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SmallHeader;

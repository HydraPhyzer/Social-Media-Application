import React, { useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import ChatIcon from "@mui/icons-material/Chat";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import Dialog from "./Dialog";
import { createTheme, IconButton, ThemeOptions } from "@mui/material";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { SetMode } from "../../../Redux/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import { ThemeSettings } from "../../Themes/Themes";
import { CustomTheme } from "../../Themes/CustomTheme";

const LargeHeader = () => {
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
  
  return (
    <div className="flex justify-between" style={{ backgroundColor: Theme.Palette.Background.Alt }}>
      <div className="flex gap-x-5 items-center">
        <p className="text-[1.3rem] font-bold" style={{color: Theme.Palette.Primary.Main}}>Connectify</p>
        <div className="bg-white flex items-center px-2 text-black rounded-md" style={{ backgroundColor: Theme.Palette.Background.Default }}>
          <input
            className="outline-none bg-transparent"
            type="text"
            placeholder="Search ..."
          />
          <IconButton>
            <SearchIcon className="text-red-500" style={{ color: Theme.Palette.Primary.Main }} />
          </IconButton>
        </div>
      </div>

      <div className="flex items-center gap-x-3">
        <IconButton onClick={SetMod} style={{color: Theme.Palette.Primary.Main}}>
          <LightModeIcon />
        </IconButton>
        <IconButton style={{color: Theme.Palette.Primary.Main}}>
          <CircleNotificationsIcon />
        </IconButton>
        <IconButton style={{color: Theme.Palette.Primary.Main}}>
          <ContactSupportIcon />
        </IconButton>
        <IconButton style={{color: Theme.Palette.Primary.Main}}>
          <ChatIcon />
        </IconButton>
        <Dialog />
      </div>
    </div>
  );
};

export default LargeHeader;

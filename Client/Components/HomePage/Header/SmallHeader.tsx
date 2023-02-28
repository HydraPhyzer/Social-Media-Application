import React, { useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import ChatIcon from "@mui/icons-material/Chat";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import Dialog from "./Dialog";
import { createTheme, Divider, IconButton, ThemeOptions } from "@mui/material";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { SetMode } from "../../../Redux/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import { ThemeSettings } from "../../Themes/Themes";
import { CustomTheme } from "../../Themes/CustomTheme";
import MenuIcon from "@mui/icons-material/Menu";

const SmallHeader = () => {
  const [Show, setShow] = React.useState(false);
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
          ?
          <div
            className="bg-white flex justify-between my-1 items-center px-2 text-black rounded-md"
            style={{ backgroundColor: Theme.Palette.Background.Default }}
          >
            <input
              className="outline-none bg-transparent"
              type="text"
              placeholder="Search ..."
            />
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
              style={{ color: Theme.Palette.Primary.Main }}
            >
              <LightModeIcon />
            </IconButton>
            <IconButton style={{ color: Theme.Palette.Primary.Main }}>
              <CircleNotificationsIcon />
            </IconButton>
            <IconButton style={{ color: Theme.Palette.Primary.Main }}>
              <ContactSupportIcon />
            </IconButton>
            <IconButton style={{ color: Theme.Palette.Primary.Main }}>
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

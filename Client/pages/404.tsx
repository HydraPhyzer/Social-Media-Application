import React, { useMemo } from "react";
import Image from "next/image";
import { Box, createTheme, ThemeOptions } from "@mui/system";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { SetMode } from "../Redux/AuthReducer";
import { ThemeSettings } from "../Components/Themes/Themes";
import { CustomTheme } from "../Components/Themes/CustomTheme";
import DarkModeIcon from "@mui/icons-material/DarkMode"
import { useRouter } from "next/router";

const NotFound = () => {
  const Mode = useSelector((State: any) => State.Mode);
  const Dispatch = useDispatch();
  let Router=useRouter();

  let SetMod = () => {
    Dispatch(SetMode());
  };

  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);
  return (
    <div style={{ backgroundColor: Theme.Palette.Background.Default }}
    className="max-h-[100vh] overflow-hidden">
      <Box
        className="flex items-center text-center p-3"
        sx={{
          backgroundColor: Theme.Palette.Background.Alt,
          color: Theme.Palette.Primary.Main,
        }}
      >
        <div className="mx-auto">
          <span>Connectify</span>
          <Image
            src="/Favicon/Favicon.png"
            height={20}
            width={20}
            alt="Logo"
            className="inline mx-1"
          />
        </div>
        <DarkModeIcon
          onClick={() => {
            SetMod();
          }}
        />
      </Box>

      <div className="flex flex-col justify-evenly items-center h-[100vh]">
        <img src="Giphy/Error.gif" alt="" height="30%" width="30%" className="rounded-md" />
        <button onClick={()=>{Router.push("/")}} className="text-center self-center p-2 rounded-sm text-white" style={{backgroundColor:Theme.Palette.Primary.Main}}>Home Page</button>
      </div>
    </div>
  );
};

export default NotFound;

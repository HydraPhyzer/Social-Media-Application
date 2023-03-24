import Avatar from "../Avatar/Avatar";

import React, { useMemo } from "react";
import { createTheme, ThemeOptions, useMediaQuery } from "@mui/material";
import { CustomTheme } from "../../Components/Themes/CustomTheme";
import { useSelector } from "react-redux";
import { ThemeSettings } from "../../Components/Themes/Themes";

const EachChatUser = ({ Friends }: any) => {
  const Mode = useSelector((State: any) => State.Mode);
  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);
  return (
    <div
      className="p-2 flex gap-x-5 bg-red-500 rounded-md items-center mb-1 cursor-pointer w-full"
      style={{
        backgroundColor: Theme.Palette.Background.Default,
      }}
    >
      <div>
        <Avatar Path={`http://localhost:7001/Assets/${Friends?.PicturePath}`} />
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

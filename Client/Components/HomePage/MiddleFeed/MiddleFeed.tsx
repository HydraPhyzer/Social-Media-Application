import React from "react";
import PostHandler from "./PostHandler/PostHandler";

import { createTheme, ThemeOptions} from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { ThemeSettings } from "../../Themes/Themes";
import { CustomTheme } from "../../Themes/CustomTheme";

const MiddleFeed = () => {

  const Mode = useSelector((State: any) => State.Mode);
  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);
  return (
    <div
    >
      <PostHandler />
    </div>
  );
};

export default MiddleFeed;

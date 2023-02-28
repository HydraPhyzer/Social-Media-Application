import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme, ThemeOptions } from "@mui/material";
import { ThemeSettings } from "../../Themes/Themes";
import { CustomTheme } from "../../Themes/CustomTheme";
import Sponsers from "./Sponsers";
import FriendsList from "./FriendsList";

const RightFeed = () => {
  const Mode = useSelector((State: any) => State.Mode);
  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);

  return (
    <div className="flex flex-col gap-y-5">
      <Sponsers/>
      <FriendsList/>
    </div>
  );
};

export default RightFeed;

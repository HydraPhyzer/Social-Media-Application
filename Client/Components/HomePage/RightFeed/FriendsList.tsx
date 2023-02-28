import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme, ThemeOptions,IconButton } from "@mui/material";
import { ThemeSettings } from "../../Themes/Themes";
import { CustomTheme } from "../../Themes/CustomTheme";
import Avatar from "../../Avatar/Avatar";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

const FriendsList = () => {
  const Mode = useSelector((State: any) => State.Mode);
  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);
  return (
    <div
      className="p-3 rounded-md text-sm"
      style={{ backgroundColor: Theme.Palette.Background.Alt }}
    >
      <p className="font-medium mb-5">Friends List</p>

      <div>
        <div className="flex justify-between items-center mb-3">
          <section className="flex items-center gap-x-2">
            <Avatar Path="http://localhost:7001/Assets/55d14bd1-4138-4044-a515-3a0ee60d820f.png" />
            <p>Muhammad Zubair</p>
          </section>

          <IconButton>
            <PersonAddAlt1Icon
              style={{ color: Theme.Palette.Neutral.MediumMain }}
            />
          </IconButton>
        </div>

        <div className="flex justify-between items-center mb-3">
          <section className="flex items-center gap-x-2">
            <Avatar Path="http://localhost:7001/Assets/55d14bd1-4138-4044-a515-3a0ee60d820f.png" />
            <p>Muhammad Zubair</p>
          </section>

          <IconButton>
            <PersonRemoveIcon
              style={{ color: Theme.Palette.Neutral.MediumMain }}
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default FriendsList;

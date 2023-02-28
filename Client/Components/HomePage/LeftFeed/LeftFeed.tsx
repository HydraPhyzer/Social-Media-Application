import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Avatar from "../../Avatar/Avatar";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { createTheme, IconButton, ThemeOptions } from "@mui/material";
import { Divider } from "@mui/material";
import { ThemeSettings } from "../../Themes/Themes";
import { CustomTheme } from "../../Themes/CustomTheme";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmailIcon from "@mui/icons-material/Email";

const LeftFeed = () => {
  const Mode = useSelector((State: any) => State.Mode);
  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);

  const User = useSelector((State: any) => {
    return State?.User;
  });

  return (
    <div className="p-3">
      <div className="flex justify-between items-center">
        <div className="Left flex gap-x-2 items-center">
          <Avatar Path={`http://localhost:7001/Assets/${User.PicturePath}`} />
          <div>
            <p className="text-sm">{User.FirstName + " " + User.LastName}</p>
            <p
              className="text-xs"
              style={{ color: Theme.Palette.Neutral.MediumMain }}
            >
              2 Friends
            </p>
          </div>
        </div>
        <div className="Right">
          <IconButton>
            <PersonOutlineIcon
              style={{ color: Theme.Palette.Neutral.MediumMain }}
            />
          </IconButton>
        </div>
      </div>

      <Divider sx={{ my: 2, backgroundColor: Theme.Palette.Neutral.Dark }} />

      <div>
        <div className="flex justify-between gap-x-2 text-sm items-center mb-2">
          <div className="flex gap-x-2 items-center">
            <InsertCommentIcon />
            <p>Total Comments</p>
          </div>
          <p
            className="p-[8px]"
            style={{ color: Theme.Palette.Neutral.MediumMain }}
          >
            20
          </p>
        </div>
        <div className="flex justify-between gap-x-2 text-sm items-center">
          <div className="flex gap-x-2 items-center">
            <FavoriteIcon/>
            <p>Total Likes</p>
          </div>
          <p
            className="p-[8px]"
            style={{ color: Theme.Palette.Neutral.MediumMain }}
          >
            20
          </p>
        </div>
      </div>
      <Divider sx={{ my: 2, backgroundColor: Theme.Palette.Neutral.Dark }} />

      <div className="flex gap-x-2">
        <EmailIcon />
        <p style={{ color: Theme.Palette.Neutral.MediumMain }}>{User.Email}</p>
      </div>
    </div>
  );
};

export default LeftFeed;

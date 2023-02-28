import React from "react";
import { createTheme, Divider, ThemeOptions } from "@mui/material";
import { useMemo } from "react";
import { useSelector } from "react-redux";

import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import { ThemeSettings } from "../Components/Themes/Themes";
import { CustomTheme } from "../Components/Themes/CustomTheme";
import Avatar from "../Components/Avatar/Avatar";

const PostHandler = () => {
  const Mode = useSelector((State: any) => State.Mode);
  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);
  return (
    <div
      className="p-3 rounded-md w-[100%]"
      style={{
        backgroundColor: Theme.Palette.Background.Alt,
        color: Theme.Palette.Neutral.Dark,
      }}
    >
      <div className="Top flex gap-x-2">
        <Avatar Path="http://localhost:7001/Assets/55d14bd1-4138-4044-a515-3a0ee60d820f.png" />
        <input
          type="text"
          placeholder="What's On Your Mind !!"
          className="w-[100%] rounded-full px-3 outline-none"
          style={{ backgroundColor: Theme.Palette.Background.Default }}
        />
      </div>

      <Divider sx={{ my: 2, backgroundColor: Theme.Palette.Neutral.Dark }} />

      <hr className="my-2" style={{ backgroundColor: Theme.Palette.Neutral.Dark }}/>

      <div className="flex justify-between">
        <section className="flex text-xs items-center">
            <InsertPhotoIcon
              style={{ color: Theme.Palette.Neutral.MediumMain }}
            />
          <p>Image</p>
        </section>
        <section className="flex text-xs items-center">
            <VideoCameraBackIcon
              style={{ color: Theme.Palette.Neutral.MediumMain }}
            />
          <p>Video</p>
        </section>
        <section className="flex text-xs items-center">
            <AttachFileIcon
              style={{ color: Theme.Palette.Neutral.MediumMain }}
            />
          <p>File</p>
        </section>
        <section className="flex text-xs items-center">
            <AudioFileIcon
              style={{ color: Theme.Palette.Neutral.MediumMain }}
            />
          <p>Audio</p>
        </section>
        <section className="flex text-xs items-center">
          <button className="rounded-full px-4 py-2" style={{ backgroundColor: Theme.Palette.Primary.Main }}>Post</button>
        </section>
      </div>
    </div>
  );
};

export default PostHandler;

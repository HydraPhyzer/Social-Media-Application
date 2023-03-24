import React, { useMemo } from "react";
import { createTheme, ThemeOptions, useMediaQuery } from "@mui/material";
import { CustomTheme } from "../../Components/Themes/CustomTheme";
import { useSelector } from "react-redux";
import { ThemeSettings } from "../../Components/Themes/Themes";
import EachChatUser from "./EachChatUser";
import SendIcon from "@mui/icons-material/Send";

const MessageScreen = () => {
  const Matches = useMediaQuery("(max-width:715px)");
  const Mode = useSelector((State: any) => State.Mode);
  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);
  return (
    <section
      className="rounded-md "
      style={{
        backgroundColor: Theme.Palette.Background.Alt,
        color: Theme.Palette.Neutral.Dark,
      }}
    >
      <div className="p-3 min-h-[85vh] flex flex-col justify-between">
        <section>
          <EachChatUser />
        </section>
        <section
          style={{ backgroundColor: Theme.Palette.Background.Default }}
          className="flex-1 rounded-md p-3"
        >
          Chat
        </section>
        <section>
          <div
            className="my-1 flex p-2 rounded-md justify-self-end"
            style={{ backgroundColor: Theme.Palette.Background.Default }}
          >
            <input
              type="text"
              className="w-[100%] bg-transparent rounded-md outline-none"
              value="Hello"
            />
            <SendIcon className="hover:cursor-pointer" />
          </div>
        </section>
      </div>
    </section>
  );
};

export default MessageScreen;

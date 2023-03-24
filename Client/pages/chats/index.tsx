import React, { useMemo } from "react";
import Head from "next/head";
import SmallHeader from "../../Components/HomePage/Header/SmallHeader";
import LargeHeader from "../../Components/HomePage/Header/LargeHeader";
import { createTheme, ThemeOptions, useMediaQuery } from "@mui/material";
import { CustomTheme } from "../../Components/Themes/CustomTheme";
import { useSelector } from "react-redux";
import { ThemeSettings } from "../../Components/Themes/Themes";
import ChatUsers from "../../Components/ChatComps/ChatUsers";
import MessageScreen from "../../Components/ChatComps/MessageScreen";

const index = () => {
  const Matches = useMediaQuery("(max-width:715px)");
  const Mode = useSelector((State: any) => State.Mode);
  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);
  return (
    <div
      className="bg-red-500 h-[100vh]"
      style={{
        backgroundColor: Theme.Palette.Background.Default,
        color: Theme.Palette.Neutral.Dark,
      }}
    >
      <Head>
        <title>Chats</title>
      </Head>

      <section>
        <header
          className="w-[100vw] shadow-md sticky top-0 z-[10000]"
          style={{ backgroundColor: Theme.Palette.Background.Alt }}
        >
          <div className="max-w-[1280px] mx-auto p-3">
            {Matches ? <SmallHeader /> : <LargeHeader />}
          </div>
        </header>
      </section>

      <section className="w-[100vw]">
        <div
          className={
            Matches
              ? "max-w-[1280px] mx-auto p-3 flex justify-between gap-y-5 flex-col"
              : "max-w-[1280px] mx-auto p-3 flex justify-between gap-x-5"
          }
        >
          <div
            className={`w-[100%] flex-[0.3] rounded-md h-fit ${
              Matches ? "order-1" : ""
            }`}
          >
            <ChatUsers />
          </div>
          <div
            className={`w-[100%] rounded-md flex-[0.7] ${
              Matches ? "order-3" : ""
            }`}
          >
            <MessageScreen />
          </div>
        </div>
      </section>
    </div>
  );
};

export default index;

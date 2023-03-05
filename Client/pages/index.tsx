import { Box, createTheme, ThemeOptions, useMediaQuery } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import LargeHeader from "../Components/HomePage/Header/LargeHeader";
import SmallHeader from "../Components/HomePage/Header/SmallHeader";
import LeftFeed from "../Components/HomePage/LeftFeed/LeftFeed";
import MiddleFeed from "../Components/HomePage/MiddleFeed/MiddleFeed";
import RightFeed from "../Components/HomePage/RightFeed/RightFeed";
import { CustomTheme } from "../Components/Themes/CustomTheme";
import { ThemeSettings } from "../Components/Themes/Themes";
import Axios from "../Components/Axios/Axios";
import { useRouter } from "next/router";

const Home = () => {
  let [Move, setMove] = useState(false);
  const Matches = useMediaQuery("(max-width:715px)");

  const Mode = useSelector((State: any) => State.Mode);
  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);

  let Router = useRouter();
  let Token = useSelector((State: any) => State?.Token);

  useEffect(() => {
    let VerifyUser = async () => {
      Axios.get("/", {
        method: "GET",
        headers: { Authorization: `Bearer ${Token}` },
      })
        .then((Res) => {
          if (Res?.data?.Error) {
            Router.push("/login");
          } else {
            setMove(true);
          }
        })
        .catch((Err) => {
          Router.push("/login");
        });
    };
    VerifyUser();
  }, []);

  return (
    Move && (
      <Box
        sx={{
          backgroundColor: Theme.Palette.Background.Default,
          minHeight: "100vh",
        }}
      >
        <Head>
          <title>Connectify</title>
        </Head>

        <div>
          <header
            className="w-[100vw] shadow-md sticky top-0 z-[10000]"
            style={{ backgroundColor: Theme.Palette.Background.Alt }}
          >
            <div className="max-w-[1280px] mx-auto p-3">
              {Matches ? <SmallHeader /> : <LargeHeader />}
            </div>
          </header>

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
                style={{
                  backgroundColor: Theme.Palette.Background.Alt,
                  color: Theme.Palette.Neutral.Dark,
                }}
              >
                <LeftFeed />
              </div>
              <div
                className={`w-[100%] flex-[0.4] ${Matches ? "order-3" : ""}`}
              >
                <MiddleFeed />
              </div>
              <div
                className={`w-[100%] flex-[0.3] rounded-md ${
                  Matches ? "order-2" : ""
                }`}
                style={{
                  color: Theme.Palette.Neutral.Dark,
                }}
              >
                <RightFeed />
              </div>
            </div>
          </section>
        </div>
      </Box>
    )
  );
};
export default Home;

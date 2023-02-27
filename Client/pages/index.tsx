import { Box, createTheme, ThemeOptions, useMediaQuery } from "@mui/material";
import type { NextPage } from "next";
import Head from "next/head";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import LargeHeader from "../Components/HomePage/Header/LargeHeader";
import SmallHeader from "../Components/HomePage/Header/SmallHeader";
import { CustomTheme } from "../Components/Themes/CustomTheme";
import { ThemeSettings } from "../Components/Themes/Themes";

const Home: NextPage = () => {
  const Matches = useMediaQuery("(max-width:715px)");

  const Mode = useSelector((State: any) => State.Mode);
  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);

  
  return (
    <Box sx={{ backgroundColor: Theme.Palette.Background.Default , minHeight:"100vh"}}>
      <Head>
        <title>Connectify</title>
      </Head>

      <div>
        <header className="w-[100vw] shadow-md" style={{ backgroundColor: Theme.Palette.Background.Alt}}>
          <div className="max-w-[1280px] mx-auto p-3">{Matches ? <SmallHeader /> : <LargeHeader />}</div>
        </header>
      </div>
    </Box>
  );
};
export default Home;
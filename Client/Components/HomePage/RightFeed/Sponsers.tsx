import React, { useEffect, useMemo } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { createTheme, IconButton, ThemeOptions } from "@mui/material";
import { ThemeSettings } from "../../Themes/Themes";
import { CustomTheme } from "../../Themes/CustomTheme";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";
import ArrowCircleRightRoundedIcon from "@mui/icons-material/ArrowCircleRightRounded";

const Sponsers = () => {
  const Mode = useSelector((State: any) => State.Mode);
  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);

  const [AllProd, SetAllProd] = React.useState([] as any);
  const [CurrProd, SetCurrProd] = React.useState(0);

  useEffect(() => {
    let GetAll = async () => {
      await fetch("https://fakestoreapi.com/products", { method: "GET" })
        .then((res) => res.json())
        .then((res) => SetAllProd(res));
    };
    GetAll();
  }, []);


  return (
    // <div>
    <div
      className="flex flex-col text-sm gap-y-3 p-3 rounded-md"
      style={{ backgroundColor: Theme.Palette.Background.Alt }}
    >
      <div className="flex justify-between">
        <p className="font-medium">Sponsered</p>
        <p style={{ color: Theme.Palette.Neutral.MediumMain }}>Create Ad</p>
      </div>

      <div className="flex items-center justify-between">
        <ArrowCircleLeftRoundedIcon
          onClick={() => {
            SetCurrProd(Math.abs(CurrProd - 1) % AllProd.length);
          }}
        />
        <div style={{ margin: "auto" }}>
          <Image
            src={AllProd[CurrProd]?.image}
            style={{ width: "150px", height: "150px", objectFit: "fill" }}
            width={100}
            height={70}
            alt="Sponser"
            className="rounded-md"
          />
        </div>
        <ArrowCircleRightRoundedIcon
          onClick={() => {
            SetCurrProd((CurrProd + 1) % AllProd.length);
          }}
        />
      </div>

      <div className="flex justify-between">
        <p>{AllProd[CurrProd]?.title.slice(0, 20).concat("  ...")} </p>
        <p style={{ color: Theme.Palette.Neutral.MediumMain }}>
          {AllProd[CurrProd]?.image.slice(0, 20)}
        </p>
      </div>
      <p
        style={{ color: Theme.Palette.Neutral.MediumMain }}
        className="text-justify"
      >
        {AllProd[CurrProd]?.description.slice(0, 110).concat("  ...")}
      </p>
    </div>
    // </div>
  );
};

export default Sponsers;

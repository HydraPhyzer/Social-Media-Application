import React, { useMemo } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { createTheme, ThemeOptions } from "@mui/material";
import { ThemeSettings } from "../../Themes/Themes";
import { CustomTheme } from "../../Themes/CustomTheme";

const Sponsers = () => {
  const Mode = useSelector((State: any) => State.Mode);
  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);
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
      <div style={{ margin: "auto" }}>
        <Image
          src="https://cdn.shopify.com/s/files/1/0557/9872/6852/products/Skin-White-7-Day-Beauty-Cream-250gm_2400x.jpg?v=1618649970"
          style={{ width: "150px", height: "150px" }}
          width={100}
          height={70}
          objectFit="cover"
          alt="Sponser"
          className="rounded-md"
        />
      </div>
      <div className="flex justify-between">
        <p>MikaCosmetics</p>
        <p style={{ color: Theme.Palette.Neutral.MediumMain }}>
          mikacosmetics.com
        </p>
      </div>
      <p
        style={{ color: Theme.Palette.Neutral.MediumMain }}
        className="text-justify"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi tenetur
        alias quod, voluptate quos odio voluptatum beatae sequi tempore aliquid?
      </p>
    </div>
    // </div>
  );
};

export default Sponsers;

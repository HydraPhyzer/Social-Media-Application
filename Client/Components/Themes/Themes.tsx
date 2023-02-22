export const ColorThemes = {
  Grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  Primary: {
    50: "#E6FBFF",
    100: "#CCF7FE",
    200: "#99EEFD",
    300: "#66E6FC",
    400: "#33DDFB",
    500: "#00D5FA",
    600: "#00A0BC",
    700: "#006B7D",
    800: "#00353F",
    900: "#001519",
  },
};

export const ThemeSettings = (Mode:any) => {
  return {
    Palette: {
      Mode: Mode,
      ...(Mode === "Dark"
        ? {
            // palette values for Dark mode
            Primary: {
              Dark: ColorThemes.Primary[200] ,
              Main: ColorThemes.Primary[500],
              Light: ColorThemes.Primary[800],
            },
            Neutral: {
              Dark: ColorThemes.Grey[100],
              Main: ColorThemes.Grey[200],
              MediumMain: ColorThemes.Grey[300],
              Medium: ColorThemes.Grey[400],
              Light: ColorThemes.Grey[700],
            },
            Background: {
              Default: ColorThemes.Grey[900],
              Alt: ColorThemes.Grey[800],
            },
          }
        : {
            Primary: {
              Dark: ColorThemes.Primary[700],
              Main: ColorThemes.Primary[500],
              Light: ColorThemes.Primary[50],
            },
            Neutral: {
              Dark: ColorThemes.Grey[700],
              Main: ColorThemes.Grey[500],
              MediumMain: ColorThemes.Grey[400],
              Medium: ColorThemes.Grey[300],
              Light: ColorThemes.Grey[50],
            },
            Background: {
              Default: ColorThemes.Grey[100],
              Alt: ColorThemes.Grey[0],
            },
          }),
    },
  };
};

import { Theme } from '@mui/material/styles';

export interface CustomTheme extends Theme {
  Palette: {
    Primary: {
      Dark: string;
      Main: string;
      Light: string;
    };

    Neutral: {
      Dark: string;
      Main: string;
      MediumMain: string;
      Medium: string;
      Light: string;
    };
    Background: {
      Default: string;
      Alt: string;
    };
    Mode: any;
  };
}

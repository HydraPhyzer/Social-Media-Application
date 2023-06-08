import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import { createTheme, IconButton, ThemeOptions } from "@mui/material";
import { ThemeSettings } from "../Themes/Themes";
import { CustomTheme } from "../Themes/CustomTheme";
import { useSelector } from "react-redux";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

export default function AppInfo() {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const Mode = useSelector((State: any) => State.Mode);
  let Theme = React.useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);

  return (
    <div>
      <IconButton
        onClick={handleClickOpen("paper")}
        style={{ color: Theme.Palette.Primary.Main }}
      >
        <ContactSupportIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className="bg-black"
      >
        <div>
          <DialogTitle 
            id="scroll-dialog-title"
            style={{
              backgroundColor: Theme.Palette.Background.Alt,
              color: Theme.Palette.Primary.Main,
            }}
          >
            Connectify
          </DialogTitle>
          <DialogContent
            style={{ backgroundColor: Theme.Palette.Background.Default }}
            dividers={scroll === "paper"}
          >
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
              style={{ color: Theme.Palette.Neutral.Main, fontSize: "0.9rem" }}
            >
              Connectify is a social networking app that allows users to create
              profiles, share posts, photos, and videos, and connect with
              friends and family. The app is similar to Facebook in terms of its
              basic functionality. Connectify aims to provide a safe and
              positive online community for its users, with a focus on promoting
              meaningful connections and interactions.
            </DialogContentText>
          </DialogContent>
          <DialogActions
            style={{
              backgroundColor: Theme.Palette.Background.Alt,
              color: Theme.Palette.Neutral.Main,
            }}
          >
            <Button
              onClick={handleClose}
              style={{
                textTransform: "capitalize",
                backgroundColor: Theme.Palette.Primary.Main,
                color: "black",
              }}
            >
              <ThumbUpAltIcon />
            </Button>
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
}

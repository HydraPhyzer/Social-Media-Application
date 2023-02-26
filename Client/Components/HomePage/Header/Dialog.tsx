import * as React from "react";
import { styled, createTheme, ThemeOptions } from "@mui/material/styles";
import {
  MenuItem,
  Divider,
  Avatar,
  Menu,
  MenuProps,
  Button,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { CustomTheme } from "../../Themes/CustomTheme";
import { ThemeSettings } from "../../Themes/Themes";
import { useSelector } from "react-redux";

const StyledMenu = styled((props: MenuProps) => <Menu {...props} />)(
  ({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
    },
  })
);

export default function CustomizedMenus() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const Mode = useSelector((State: any) => State.Mode);
  let Theme = React.useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);

  return (
    <div>
      <Button
        variant="contained"
        disableElevation
        onClick={handleClick}
        style={{ textTransform: "capitalize" }}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          backgroundColor: Theme.Palette.Primary.Main,
          color: Theme.Palette.Background.Alt,
          "&:hover": {
            backgroundColor: Theme.Palette.Primary.Main,
          },
        }}
      >
        Muhammad Zubair
      </Button>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem>
          <Avatar
            sx={{ mr: 1 }}
            src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80"
          />{" "}
          Zubair
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem>
          <LogoutIcon sx={{ mr: 1 }} /> Logout
        </MenuItem>
      </StyledMenu>
    </div>
  );
}

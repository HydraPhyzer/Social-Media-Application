import * as React from "react";
import { styled, createTheme, ThemeOptions } from "@mui/material/styles";
import { MenuItem, Divider, Menu, MenuProps, Button } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";
import { CustomTheme } from "../../Themes/CustomTheme";
import { ThemeSettings } from "../../Themes/Themes";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "../../Avatar/Avatar";
import { SetLogOut } from "../../../Redux/AuthReducer";
import { Router, useRouter } from "next/router";

const StyledMenu = styled((props: MenuProps) => <Menu {...props} />)(
  ({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
    },
  })
);

type LoggedInUserType = {
  _id: string;
  FirstName: string;
  LastName: string;
  Email: string;
  Password: string;
  Friends: [];
  PicturePath: string;
  updatedAt: string;
  createdAt: string;
  __v: number;
  Token: string;
  Posts: [];
};

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

  const [LoggedInUser, setLoggedInUser] = React.useState<LoggedInUserType>();

  const User = useSelector((State: any) => {
    return State?.User;
  });

  React.useEffect(() => {
    setLoggedInUser(User);
    console.log(User);
  }, [User]);

  let Dispatch = useDispatch();
  let Router = useRouter();

  let LogOutFunc = () => {
    Router.push("/login").then(() => {
      Dispatch(SetLogOut());
    });
  };

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
        {LoggedInUser?.FirstName + " " + LoggedInUser?.LastName}
      </Button>
      <StyledMenu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem>
          <Avatar
            Path={`http://localhost:7001/Assets/${LoggedInUser?.PicturePath}`}
          />
          {LoggedInUser?.FirstName + " " + LoggedInUser?.LastName}
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={LogOutFunc}>
          <LogoutIcon sx={{ mr: 1 }} /> Logout
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
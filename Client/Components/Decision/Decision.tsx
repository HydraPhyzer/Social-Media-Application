import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import { createTheme, IconButton, ThemeOptions } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ThemeSettings } from "../Themes/Themes";
import { CustomTheme } from "../Themes/CustomTheme";
import { useSelector } from "react-redux";
import Axios from "../Axios/Axios";
import { SetPost } from "../../Redux/AuthReducer";
import FormData from "form-data";
import { useDispatch } from "react-redux";
import { AxiosRequestConfig } from "axios";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  }
) {
  return <Slide direction="up" {...props} />;
});

export default function Decision({ PostId, UserSocket, User }: any) {
  const [open, setOpen] = React.useState(false);

  let Dispatch = useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const Mode = useSelector((State: any) => State.Mode);
  let Theme = React.useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);

  React.useEffect(() => {
    UserSocket?.on("Get-Feed", (Data: any) => {
      Dispatch(SetPost({ Post: Data }));
    });
  }, []);

  let DeletePost = () => {
    let FrmData: any = new FormData();
    FrmData.append("PostId", PostId);

    Axios.delete(`/deletepost/${PostId}`, {}).then(() => {
      Axios.get("/getallposts").then((Res) => {
        UserSocket?.emit("Update-Feed", {
          Sender: User?._id,
          Friends: User?.Friends,
        });
        // Dispatch(SetPost({ Post: Res.data }));
        setOpen(false);
      });
    });
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <DeleteIcon
          className="text-red-600 rounded-full p-1 bg-black"
        />
      </IconButton>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          style={{
            fontSize: "0.9rem",
            fontWeight: "bold",
            background: Theme.Palette.Background.Alt,
            color: Theme.Palette.Primary.Main,
          }}
        >
          {"Post Deletion ?"}
        </DialogTitle>
        <DialogContent
          style={{
            background: Theme.Palette.Background.Alt,
          }}
        >
          <DialogContentText
            id="alert-dialog-slide-description"
            style={{ fontSize: "0.9rem",color: Theme.Palette.Primary.Dark }}
          >
            Are You Sure About Deleting This Post ?
          </DialogContentText>
        </DialogContent>

        <DialogActions style={{ background: Theme.Palette.Background.Alt }}>
          <Button color="success" style={{ textTransform: "capitalize" }} onClick={handleClose}>
            Nope
          </Button>
          <Button color="warning" style={{ textTransform: "capitalize" }} onClick={DeletePost}>
            Yeah
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

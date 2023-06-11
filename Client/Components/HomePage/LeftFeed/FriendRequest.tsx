import { Icon, IconButton, ThemeOptions, createTheme } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { ThemeSettings } from "../../Themes/Themes";
import { useSelector, useDispatch } from "react-redux";
import { CustomTheme } from "../../Themes/CustomTheme";
import Avatar from "../../Avatar/Avatar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { SetUser } from "../../../Redux/AuthReducer";
import Axios from "../../Axios/Axios";
import CustomizedSnackbars from "../../Toast/Toast";

type PropsType = {
  Message: string;
  Visible: boolean;
  severity: "error" | "warning" | "info" | "success";
};
const FriendRequest = ({ UserSocket }: { UserSocket: any }) => {
  const Mode = useSelector((State: any) => State.Mode);
  const [FriendSpecs, SetFriendSpecs] = React.useState<any>([]);
  const User = useSelector((State: any) => {
    return State?.User;
  });
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const playSound = () => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  };
  const [ShowToast, setShowToast] = React.useState<PropsType>({
    Message: "",
    Visible: false,
    severity: "error",
  });
  let UpdateState = () => {
    setShowToast({ ...ShowToast, Visible: false });
  };
  let Dispatch = useDispatch();
  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);

  useEffect(() => {
    UserSocket?.on(
      "Take-Request",
      ({ Updated, Bell }: { Updated: any; Bell: boolean }) => {
        Dispatch(SetUser({ User: Updated }));
        Bell && playSound();
        GetFriendSpecs();
      }
    );
    UserSocket?.on("Take-Both-Friendship", ({ Updated }: any) => {
      Dispatch(SetUser({ User: Updated }));
      GetFriendSpecs();
    });
  }, [User]);

  let GetFriendSpecs = async () => {
    try {
      await Axios.get(`/getrequests/${User?._id}`).then((Res) => {
        SetFriendSpecs([...Res.data]);
      });
    } catch (Error: any) {
      if (Error?.Error) {
        setShowToast({
          ...ShowToast,
          Message: Error?.response?.data.Error,
          Visible: true,
        });
      }
    }
  };

  let AddFriend = async (FriendID: any) => {
    let FrmData = new FormData();

    FrmData.append("UserId", User?._id);
    FrmData.append("FriendId", FriendID);
    try {
      let Start = await Axios.patch("/addfriend", FrmData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Dispatch(SetUser({ User: Start.data }));
      UserSocket?.emit("Update-Both-Friendship", {
        Friend: FriendID,
        RealUser: User?._id,
        Bell: true,
      });
    } catch (Error: any) {
      if (Error?.Error) {
        setShowToast({
          ...ShowToast,
          Message: Error?.response?.data.Error,
          Visible: true,
        });
      }
    }
  };

  let DeclineRequest = (FriendID: any) => {
    let FrmData = new FormData();

    FrmData.append("UserId", User?._id);
    FrmData.append("FriendId", FriendID);
    try {
      Axios.patch("/declinerequest", FrmData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }).then((Res) => {
        Dispatch(SetUser({ User: Res.data }));
        UserSocket?.emit("Send-Request", {
          ToID: User?._id,
          Bell: false,
        });
      });
    } catch (Error) {}
  };

  React.useEffect(() => {
    GetFriendSpecs();
  }, []);

  return (
    <div
      className="my-2 p-2 rounded-md"
      style={{
        backgroundColor: Theme.Palette.Background.Alt,
        color: Theme.Palette.Neutral.Dark,
      }}
    >
      <p className="font-medium mb-2 sticky left-0 top-0">Friend Request</p>

      <section className="max-h-[37vh] overflow-scroll">
        {FriendSpecs?.map((MyUser: any, Ind: any) => {
          return (
            <div
              key={Ind}
              className="flex justify-between p-2 rounded-md mb-1"
              style={{ background: Theme.Palette.Background.Default }}
            >
              <section className="flex gap-x-2 items-center">
                <Avatar
                  Status={false}
                  Path={`http://localhost:8001/Assets/${MyUser?.PicturePath}`}
                />
                <p className="hover:underline hover:cursor-pointer">
                  {MyUser?.FirstName + " " + MyUser?.LastName}
                </p>
              </section>

              <span>
                <IconButton
                  onClick={() => {
                    AddFriend(MyUser?._id);
                  }}
                >
                  <CheckCircleIcon className="text-green-500" />
                </IconButton>
                <IconButton
                  onClick={() => {
                    DeclineRequest(MyUser?._id);
                  }}
                >
                  <CancelIcon className="text-red-500" />
                </IconButton>
              </span>
            </div>
          );
        })}
      </section>

      <div>
        {ShowToast.Visible && (
          <CustomizedSnackbars
            Props={ShowToast}
            Func={() => {
              UpdateState();
            }}
          />
        )}
      </div>
      <audio ref={audioRef} style={{ display: "none" }}>
        <source src="./Tone/Tone.mp3" type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default FriendRequest;

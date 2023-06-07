import React, { useMemo, useState, useRef, useEffect } from "react";
import {
  createTheme,
  IconButton,
  ThemeOptions,
  useMediaQuery,
} from "@mui/material";
import { CustomTheme } from "../../Components/Themes/CustomTheme";
import { useSelector } from "react-redux";
import { ThemeSettings } from "../../Components/Themes/Themes";
import EachChatUser from "./EachChatUser";
import SendIcon from "@mui/icons-material/Send";
import Axios from "../../Components/Axios/Axios";
import CustomizedSnackbars from "../Toast/Toast";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import FormData from "form-data";
import { useDispatch } from "react-redux";
import { SetChats, SetTypingUsers } from "../../Redux/AuthReducer";

type PropsType = {
  Message: string;
  Visible: boolean;
  severity: "error" | "warning" | "info" | "success";
};

const MessageScreen = ({ UserSocket }: { UserSocket: any }) => {
  const Scroll: any = useRef(null);
  const Matches = useMediaQuery("(max-width:715px)");
  const [FriendSpecs, SetFriendSpecs] = useState(null);
  const [ShowToast, setShowToast] = React.useState<PropsType>({
    Message: "",
    Visible: false,
    severity: "error",
  });
  let Dispatch = useDispatch();
  const [Text, setText] = useState("");
  const [TypingStatus, SetTypingStatus] = useState(false);

  const [TypingUsers, setTypingUsers] = useState(
    useSelector((State: any) => State.TypingUsers)
  );
  let [TypingTimer, SetTypingTimer]: [TypingTimer: any, SetTypingTimer: any] =
    useState(undefined);
  let UpdateState = () => {
    setShowToast({ ...ShowToast, Visible: false });
  };
  const Mode = useSelector((State: any) => State.Mode);
  const User = useSelector((State: any) => State.User);
  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);
  const Chats = useSelector((State: any) => State.Chats);

  let GetFriendSpecs = async () => {
    try {
      await Axios.get(
        `/getuser/${
          Chats?.ReceiverID == User?._id ? Chats?.SenderID : Chats?.ReceiverID
        }`
      ).then((Res) => {
        SetFriendSpecs(Res.data);
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

  useEffect(() => {
    TypingStatus
      ? UserSocket?.emit("New-TypingUser", {
          SenderId: User?._id,
          ReceiverId: Chats?.ReceiverID,
        })
      : UserSocket?.emit("Stop-TypingUser", {
          SenderId: User?._id,
          ReceiverId: Chats?.ReceiverID,
        });

    UserSocket?.emit("Get-TypingUsers", User?._id);
    UserSocket?.on("Take-TypingUsers", (Data: any) => {
      setTypingUsers([...Data]);
      Dispatch(SetTypingUsers({ TypingUser: Data }));
    });
  }, [TypingStatus]);

  useEffect(() => {
    UserSocket?.on("Get-Chat", async (Sender: string) => {
      if (Sender != (User?._id ? Chats?.SenderID : Chats?.ReceiverID)) {
        await Axios.get(
          `/getchats/${User?._id}/${Sender
            // Chats?.ReceiverID == User?._id ? Chats?.SenderID : Chats?.ReceiverID
          }`
        ).then((Res) => {
          if (Res.data) {
            Dispatch(SetChats({ Chats: Res?.data }));
          }
        });
      }
    });
  }, []);

  React.useEffect(() => {
    GetFriendSpecs();
    setText("");
    Scroll?.current?.scrollIntoView({ behaviour: "smooth" });
  }, [Chats]);

  let SendMessage = async () => {
    if (!Text) {
      setShowToast({
        ...ShowToast,
        Message: "Empty Messages Cant Be Send",
        Visible: true,
        severity: "info",
      });
    } else {
      try {
        let FrmData: any = new FormData();
        // FrmData.append("SenderID", Chats?.SenderID);
        FrmData.append("SenderID", User?._id);
        // FrmData.append("ReceiverID", Chats?.ReceiverID);
        FrmData.append(
          "ReceiverID",
          Chats?.ReceiverID == User?._id ? Chats?.SenderID : Chats?.ReceiverID
        );
        FrmData.append("Message", Text);

        await Axios.post("/sendmessage", FrmData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }).then(async (Res) => {
          if (Res.data) {
            UserSocket?.emit("Send-Chat", {
              Receiver:
                Chats?.ReceiverID == User?._id
                  ? Chats?.SenderID
                  : Chats?.ReceiverID,
              Sender: User?._id,
            });
            Dispatch(SetChats({ Chats: Res.data }));
          }
          setText("");
        });
      } catch (Error: any) {
        setShowToast({
          ...ShowToast,
          Message: Error?.response?.data.Error,
          Visible: true,
          severity: "warning",
        });
      }
    }
  };

  return (
    <section
      className="rounded-md "
      style={{
        backgroundColor: Theme.Palette.Background.Alt,
        color: Theme.Palette.Neutral.Dark,
      }}
    >
      {Chats && Object.keys(Chats).length > 0 ? (
        <div
          className={`p-3 flex flex-col justify-between overflow-scroll ${
            Matches ? "h-[65vh]" : "h-[85vh]"
          }`}
        >
          <section>
            <EachChatUser
              Friends={FriendSpecs}
              // MyTypingUsers={TypingUsers}
              Socket={UserSocket}
            />
          </section>
          <section
            style={{ backgroundColor: Theme.Palette.Background.Default }}
            className="flex-1 rounded-md p-3 overflow-scroll"
          >
            {Chats &&
              Chats?.Messages &&
              Chats?.Messages.map((Each: any) => {
                return (
                  <section
                    style={{
                      width: "100%",
                      justifyContent: Each?.Owner == User._id ? "end" : "start",
                    }}
                    ref={Scroll}
                    className="flex"
                  >
                    <div
                      className="w-[50%] flex flex-col justify-between p-2 rounded-md mb-1"
                      style={{ backgroundColor: Theme.Palette.Background.Alt }}
                    >
                      <p style={{ color: Theme.Palette.Neutral.Main }}>
                        {Each?.MessageText}
                      </p>
                      <p className="text-xs self-end">
                        {new Date(Each?.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </section>
                );
              })}
          </section>
          <section>
            <div
              className="my-1 flex p-2 rounded-md justify-self-end"
              style={{ backgroundColor: Theme.Palette.Background.Default }}
            >
              <input
                type="text"
                className="w-[100%] bg-transparent rounded-md outline-none"
                placeholder="Type Message to Send !"
                value={Text}
                onChange={(E) => {
                  setText(E.target.value);
                }}
                onKeyUp={(E: any) => {
                  clearTimeout(TypingTimer);
                  let Value = setTimeout(() => {
                    SetTypingStatus(false);
                    // console.log("Not Typing");
                  }, 2000);
                  SetTypingTimer(Value);
                }}
                onKeyDown={(E: any) => {
                  if (E.key == "Enter" || E.keyCode === 13) {
                    SendMessage();
                  }
                  clearTimeout(TypingTimer);
                  SetTypingStatus(true);
                  // console.log("Typing");
                }}
              />
              <IconButton
                onClick={SendMessage}
                style={{ color: Theme.Palette.Primary.Main }}
              >
                <SendIcon className="hover:cursor-pointer" />
              </IconButton>
            </div>
          </section>
        </div>
      ) : (
        <div className="p-3 min-h-[85vh] flex flex-col justify-between">
          Click on Any User to Start Chat
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        </div>
      )}
      <div>
        {!Chats || ShowToast.Visible ? (
          <CustomizedSnackbars
            Props={ShowToast}
            Func={() => {
              UpdateState();
            }}
          />
        ) : (
          ""
        )}
      </div>
    </section>
  );
};

export default MessageScreen;

import React, { useMemo, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import ChatIcon from "@mui/icons-material/Chat";
import Dialog from "./Dialog";
import { Badge, createTheme, IconButton, ThemeOptions } from "@mui/material";
import Avatar from "../../Avatar/Avatar";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { SetMode } from "../../../Redux/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import { ThemeSettings } from "../../Themes/Themes";
import { CustomTheme } from "../../Themes/CustomTheme";
import AppInfo from "../../AppInfo/AppInfo";
import { useRouter } from "next/router";
import Axios from "../../Axios/Axios";

const LargeHeader: any = ({ UserSocket }: { UserSocket: any }) => {
  let [SearchedUser, setSearchUser] = React.useState([]);
  let [UserSpec, SetUserSpec] = React.useState({
    Unread: [] as any[],
    Read: [] as any[],
  });
  let [ShowNoti, setShowNoti] = React.useState(false);
  let [Notifications, setNotifications] = React.useState<any>(null);

  const User = useSelector((State: any) => {
    return State?.User;
  });

  const Mode = useSelector((State: any) => State.Mode);
  const Dispatch = useDispatch();
  let Router = useRouter();
  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);

  let SetMod = () => {
    Dispatch(SetMode());
  };

  let SearchUser = async (Value: string) => {
    if (Value) {
      let FrmData = new FormData();
      FrmData.append("Query", Value);
      try {
        let Res = await Axios.get(`/searchuser/${Value}`);
        setSearchUser(Res.data);
      } catch (Err) {}
    } else {
      setSearchUser([]);
    }
  };

  useEffect(() => {
    UserSocket?.emit("Send-Request-Notification", {
      ToID: User?._id,
    });

    UserSocket?.on(
      "Receive-Request-Notification",
      ({ MyNotifications }: { MyNotifications: any }) => {
        console.log(MyNotifications);
        setNotifications(MyNotifications);
      }
    );
  }, []);

  return (
    <div
      className="flex justify-between"
      style={{ backgroundColor: Theme.Palette.Background.Alt }}
    >
      <div className="flex gap-x-5 items-center ">
        <p
          onClick={() => {
            Router.push("/");
          }}
          className="text-[1.3rem] font-bold cursor-pointer"
          style={{ color: Theme.Palette.Primary.Main }}
        >
          Connectify
        </p>
        <div
          className="bg-white flex items-center rounded-md px-2"
          style={{
            backgroundColor: Theme.Palette.Background.Default,
            color: Theme.Palette.Neutral.Main,
            position: "relative",
          }}
        >
          <div>
            <input
              className="outline-none bg-transparent"
              type="text"
              placeholder="Search ..."
              onChange={(E) => {
                SearchUser(E.target.value);
              }}
            />
            <div
              className="rounded-md p-2 flex flex-col gap-y-2"
              style={{
                width: "100%",
                maxHeight: "40vh",
                overflow: "scroll",
                position: "absolute",
                top: 45,
                left: 0,
                background: Theme.Palette.Background.Default,
                display: SearchedUser.length > 0 ? "flex" : "none",
              }}
            >
              {SearchedUser.map((User: any, Ind: any) => {
                return (
                  <div
                    onClick={() => {
                      Router.push(`/search/${User._id}`);
                      setSearchUser([]);
                    }}
                    key={Ind}
                    className="flex gap-2 items-center hover:cursor-pointer"
                  >
                    <Avatar
                      Path={`http://localhost:8001/Assets/${User?.PicturePath}`}
                    />
                    <p className="text-sm">
                      {User?.FirstName + " " + User?.LastName}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <IconButton>
            <SearchIcon
              className="text-red-500"
              style={{ color: Theme.Palette.Primary.Main }}
            />
          </IconButton>
        </div>
      </div>

      <div className="flex items-center gap-x-3">
        <IconButton
          onClick={SetMod}
          style={{ color: Theme.Palette.Primary.Main }}
        >
          <LightModeIcon className="hover:animate-spin" />
        </IconButton>
        <IconButton
          style={{ color: Theme.Palette.Primary.Main, position: "relative" }}
          onClick={() => {
            setShowNoti(!ShowNoti);
            ShowNoti == true &&
              UserSocket?.emit("Manage-Notification", {
                UserId: User?._id,
              });
          }}
        >
          <Badge badgeContent={Notifications?.Unread.length} color="warning">
            <CircleNotificationsIcon className="Bell" />
          </Badge>

          <>
            {ShowNoti && (
              <div
                className="rounded-md p-2 flex flex-col gap-y-2 shadow-2xl"
                style={{
                  width: "52vh",
                  maxHeight: "40vh",
                  overflow: "scroll",
                  position: "absolute",
                  top: 45,
                  left: 0,
                  background: Theme.Palette.Background.Default,
                  // display: Notifications?.Unread.length > 0  ? "flex" : "none",
                }}
              >
                <>
                  {Notifications?.Unread.length > 0 && (
                    <small className="text-xs text-start text-black bg-white w-fit px-1 rounded-sm">
                      Newer 🔔
                    </small>
                  )}
                  {Notifications?.Unread.map((User: any) => {
                    return (
                      <div
                        onClick={() => {
                          Router.push(`/search/${User?._id}`);
                          setSearchUser([]);
                        }}
                        className="flex gap-2 items-center hover:cursor-pointer text-justify border-gray-500 py-2 bg-gray-500 px-1 rounded-md"
                      >
                        <Avatar
                          Path={`http://localhost:8001/Assets/${User?.SenderID?.PicturePath}`}
                        />
                        <p className="text-sm mb-2">
                          {User?.SenderID?.FirstName +
                            " " +
                            User?.SenderID?.LastName}
                          <p className="text-white">
                            {User?.Type == 1
                              ? "Posted Something"
                              : User?.Type == 2 && "Send You Request"}
                          </p>
                        </p>
                      </div>
                    );
                  })}

                  {/* ======================== */}

                  {Notifications?.Read.length > 0 && (
                    <small className="text-xs text-start text-black bg-white w-fit px-1 rounded-sm">
                      Older 🔔
                    </small>
                  )}
                  {Notifications?.Read.map((User: any) => {
                    return (
                      <div
                        onClick={() => {
                          Router.push(`/search/${User?.SenderID?._id}`);
                          setSearchUser([]);
                        }}
                        className="flex gap-2 items-center hover:cursor-pointer text-justify border-gray-500 py-2 bg-gray-800 px-1 rounded-md"
                      >
                        <Avatar
                          Path={`http://localhost:8001/Assets/${User?.SenderID?.PicturePath}`}
                        />
                        <p className="text-sm mb-2">
                          {User?.SenderID?.FirstName +
                            " " +
                            User?.SenderID?.LastName}
                          <p className="text-white">
                            {User?.Type == 1
                              ? "Posted Something"
                              : User?.Type == 2 && "Send You Request"}
                          </p>
                        </p>
                      </div>
                    );
                  })}

                  {Notifications?.Unread.length == 0 &&
                  Notifications?.Read.length == 0 ? (
                    <p className="text-xs text-start text-white my-auto">
                      No Notifications to Read Yet{" "}
                    </p>
                  ) : (
                    <p
                      onClick={() => {
                        UserSocket?.emit("Clear-Notifications", {
                          UserId: User._id,
                        });
                      }}
                      className="text-white sticky bottom-0 left-[100%] text-xs bg-red-500 text-center  p-1 w-fit rounded-sm flex items-center"
                    >
                      Clear
                    </p>
                  )}
                </>
              </div>
            )}
          </>
        </IconButton>
        <AppInfo />

        <IconButton
          onClick={() => {
            Router.push("/chats");
          }}
          style={{ color: Theme.Palette.Primary.Main }}
        >
          <ChatIcon className="hover:animate-pulse" />
        </IconButton>
        <Dialog />
      </div>
    </div>
  );
};

export default LargeHeader;

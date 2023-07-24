import React, { useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import LightModeIcon from "@mui/icons-material/LightMode";
import ChatIcon from "@mui/icons-material/Chat";
import Dialog from "./Dialog";
import {
  Badge,
  createTheme,
  Divider,
  IconButton,
  ThemeOptions,
} from "@mui/material";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import { SetMode } from "../../../Redux/AuthReducer";
import { useDispatch, useSelector } from "react-redux";
import { ThemeSettings } from "../../Themes/Themes";
import { CustomTheme } from "../../Themes/CustomTheme";
import MenuIcon from "@mui/icons-material/Menu";
import AppInfo from "../../AppInfo/AppInfo";
import Axios from "../../Axios/Axios";
import { useRouter } from "next/router";
import Avatar from "../../Avatar/Avatar";

const SmallHeader = ({ UserSocket }: { UserSocket: any }) => {
  let [Notifications, setNotifications] = React.useState<any>(null);
  const [Show, setShow] = React.useState(false);
  let [SearchedUser, setSearchUser] = React.useState([]);
  let [ShowNoti, setShowNoti] = React.useState(false);
  let [UserSpec, SetUserSpec] = React.useState({
    Unread: [] as any[],
    Read: [] as any[],
  });
  const User = useSelector((State: any) => {
    return State?.User;
  });
  let Router = useRouter();
  const Mode = useSelector((State: any) => State.Mode);
  const Dispatch = useDispatch();
  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);
  let SetMod = () => {
    Dispatch(SetMode());
  };

  React.useEffect(() => {
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

  // React.useEffect(() => {
  //   GetUserSpecs();
  // }, [Notifications]);

  let GetUserSpecs = async () => {
    try {
      Notifications.Unread.map(async (id: any) => {
        let Arr: any = [];
        console.log(id);
        await Axios.get(`/getuser/${id?.SenderID?._id}`).then((Data: any) => {
          Arr.push(Data);
        });
        SetUserSpec((Prev: any) => {
          return { ...Prev, Unread: [...Arr] };
        });
      });

      Notifications.Read.map(async (id: any) => {
        let Arr: any = [];
        await Axios.get(`/getuser/${id?.SenderID?._id}`).then((Data: any) => {
          Arr.push(Data);
        });
        SetUserSpec((Prev: any) => {
          return { ...Prev, Read: [...Arr] };
        });
      });
    } catch (error) {
      console.error(error);
    }
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

  return (
    <div>
      <div className="flex gap-x-5 items-center justify-between">
        <p
          className="text-[1.3rem] font-bold"
          style={{ color: Theme.Palette.Primary.Main }}
          onClick={() => {
            Router.push("/");
          }}
        >
          Connectify
        </p>
        <div
          className="bg-white flex items-center px-2 text-black rounded-md"
          style={{ backgroundColor: Theme.Palette.Background.Default }}
        >
          <IconButton
            onClick={() => {
              setShow(!Show);
            }}
            sx={{ color: Theme.Palette.Primary.Main }}
          >
            <MenuIcon />
          </IconButton>
        </div>
      </div>
      {Show ? (
        <div>
          <Divider
            sx={{ border: 1, my: 1, color: Theme.Palette.Primary.Main }}
          />
          <div
            className="bg-white flex justify-between my-1 items-center px-2 rounded-md"
            style={{
              backgroundColor: Theme.Palette.Background.Default,
              color: Theme.Palette.Neutral.Main,
              position: "relative",
            }}
          >
            <input
              className="outline-none bg-transparent relative"
              type="text"
              placeholder="Search ..."
              onChange={(E) => {
                SearchUser(E.target.value);
              }}
            />
            <div
              className="rounded-md p-2 flex flex-col gap-y-2"
              style={{
                // width: "100%",
                maxHeight: "40vh",
                overflow: "scroll",
                position: "absolute",
                top: 45,
                left: 0,
                zIndex: 100,
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
            <IconButton>
              <SearchIcon
                className="text-red-500"
                style={{ color: Theme.Palette.Primary.Main }}
              />
            </IconButton>
          </div>
          <div className="flex justify-between items-center gap-x-3 my-3">
            <IconButton
              onClick={SetMod}
              className="w-[25%]"
              style={{
                color: Theme.Palette.Primary.Main,
                backgroundColor: Theme.Palette.Background.Default,
                borderRadius: "5px",
              }}
            >
              <LightModeIcon />
            </IconButton>

            <IconButton
              className="w-[25%]"
              style={{
                color: Theme.Palette.Primary.Main,
                backgroundColor: Theme.Palette.Background.Default,
                borderRadius: "5px",
              }}
              onClick={() => {
                setShowNoti(!ShowNoti);
                ShowNoti && GetUserSpecs();
              }}
            >
              {/* <CircleNotificationsIcon /> */}
              <Badge
                badgeContent={Notifications?.Unread.length}
                color="warning"
              >
                <CircleNotificationsIcon className="Bell" />
              </Badge>
            </IconButton>
            <IconButton
              className="w-[25%]"
              style={{
                backgroundColor: Theme.Palette.Background.Default,
                color: Theme.Palette.Primary.Main,
                borderRadius: "5px",
              }}
              onClick={() => {
                Router.push("/chats");
              }}
            >
              <ChatIcon />
            </IconButton>
          </div>
          <div>
            <Dialog />
          </div>
          {ShowNoti && (
            <div
              className="rounded-md p-2 flex flex-col gap-y-2 shadow-2xl my-2"
              style={{
                width: "95vw",
                zIndex: 100000,
                maxHeight: "40vh",
                overflow: "scroll",
                top: 45,
                background: Theme.Palette.Background.Default,
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
        </div>
      ) : null}
    </div>
  );
};

export default SmallHeader;

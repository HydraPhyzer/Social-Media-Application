import React, { useMemo } from "react";
import { createTheme, ThemeOptions, useMediaQuery } from "@mui/material";
import { CustomTheme } from "../../Components/Themes/CustomTheme";
import { useSelector } from "react-redux";
import { ThemeSettings } from "../../Components/Themes/Themes";
import EachChatUser from "./EachChatUser";
import Axios from "../Axios/Axios";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ChatUsers = () => {
  const Matches = useMediaQuery("(max-width:715px)");
  const [FriendList, setFriendList] = React.useState([]);
  const Mode = useSelector((State: any) => State.Mode);
  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);

  const User = useSelector((State: any) => {
    return State?.User;
  });

  let Func = React.useCallback(async () => {
    await Axios.get(`/getfriends/${User?._id}`).then((Res) => {
      setFriendList(Res.data);
    });
  }, [User]);

  React.useEffect(() => {
    Func();
  }, [User]);

  return (
    <section
      className="p-3 rounded-md max-h-[85vh]"
      style={{
        backgroundColor: Theme.Palette.Background.Alt,
        color: Theme.Palette.Neutral.Dark,
      }}
    >
      {FriendList ? (
        <div className="h-[85vh] overflow-scroll">
          {FriendList.length > 0 ? (
            FriendList.map((Each, Ind) => {
              return <EachChatUser Friends={Each} key={Ind} />;
            })
          ) : (
            <div
              className="flex justify-center items-center text-sm text-red-600 flex-row rounded-md p-3 text-justify"
              style={{
                backgroundColor: Theme.Palette.Background.Default,
              }}
            >
              You Have 0 Friends, Make Friends to Chat With Them
            </div>
          )}
        </div>
      ) : (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </section>
  );
};

export default ChatUsers;

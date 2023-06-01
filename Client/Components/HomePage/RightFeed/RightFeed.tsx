import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { createTheme, ThemeOptions } from "@mui/material";
import { ThemeSettings } from "../../Themes/Themes";
import { CustomTheme } from "../../Themes/CustomTheme";
import Sponsers from "./Sponsers";
import FriendsList from "./FriendsList";
import Axios from "../../Axios/Axios";

const RightFeed = () => {
  const Mode = useSelector((State: any) => State.Mode);
  const [FriendList, setFriendList] = React.useState([]);
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
    <div className="flex flex-col gap-y-5">
      <Sponsers />

      <div className="max-h-[30vh] overflow-scroll rounded-md" style={{ backgroundColor: Theme.Palette.Background.Alt }}>
      <p className="font-medium p-3">Friends List</p>
      {FriendList.map((Each, Ind) => {
        return <FriendsList Friends={Each} key={Ind} Controls={true} />;
      })}
      </div>
    </div>
  );
};

export default RightFeed;

import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, ThemeOptions, IconButton } from "@mui/material";
import { ThemeSettings } from "../../Themes/Themes";
import { CustomTheme } from "../../Themes/CustomTheme";
import Avatar from "../../Avatar/Avatar";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { SetUser } from "../../../Redux/AuthReducer";
import Axios from "../../Axios/Axios";

const FriendsList = ({ Friends }: any) => {
  const Mode = useSelector((State: any) => State.Mode);
  const User = useSelector((State: any) => State.User);
  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);

  let Dispatch = useDispatch();

  let RemoveFriend = async () => {
    let FrmData = new FormData();

    FrmData.append("UserId", User?._id);
    FrmData.append("FriendId", Friends?._id);
    try {
      let Start = await Axios.patch("/removefriend", FrmData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Dispatch(SetUser({ User: Start.data }));
      console.log(Start.data);
    } catch (Error) {}
  };

  return (
    <div
      className=" p-3 rounded-md text-sm"
    >
      <div>
        <div className="flex justify-between items-center">
          <section className="flex items-center gap-x-2">
            <Avatar
              Path={`http://localhost:7001/Assets/${Friends?.PicturePath}`}
            />
            <p>{Friends?.FirstName + " " + Friends?.LastName}</p>
          </section>

          {User?.Friends?.includes(Friends?._id) ? (
            <IconButton onClick={RemoveFriend}>
              <PersonRemoveIcon
                style={{ color: Theme.Palette.Neutral.MediumMain }}
              />
            </IconButton>
          ) : (
            <IconButton>
              <PersonAddAlt1Icon
                style={{ color: Theme.Palette.Neutral.MediumMain }}
              />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsList;
function Dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}

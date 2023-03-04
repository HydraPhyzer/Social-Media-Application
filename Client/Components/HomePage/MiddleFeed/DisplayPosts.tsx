import React, { useState } from "react";
import Avatar from "../../Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, IconButton, ThemeOptions } from "@mui/material";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import { CustomTheme } from "../../Themes/CustomTheme";
import { ThemeSettings } from "../../Themes/Themes";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Axios from "../../Axios/Axios";
import FormData from "form-data";
import { SetUser } from "../../../Redux/AuthReducer";

const DisplayPosts = ({ SinglePost }: any) => {
  let [Likes, setLikes] = useState(SinglePost?.Likes);

  const User = useSelector((State: any) => {
    return State?.User;
  });
  const Mode = useSelector((State: any) => State.Mode);
  let Theme = React.useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);
  let Dispatch = useDispatch();

  let AddFriend = async () => {
    let FrmData = new FormData();

    FrmData.append("UserId", User?._id);
    FrmData.append("FriendId", SinglePost?.UserId);
    try {
      let Start = await Axios.patch("/addfriend", FrmData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Dispatch(SetUser({ User: Start.data }));
      console.log(Start.data);
    } catch (Error) {}
  };
  let RemoveFriend = async () => {
    let FrmData = new FormData();

    FrmData.append("UserId", User?._id);
    FrmData.append("FriendId", SinglePost?.UserId);
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
  console.log(Likes);

  let LikePost = async () => {
    await Axios.post(`likepost/${SinglePost?._id}`, { UserId: User?._id }).then(
      (Res) => {
        setLikes(Res.data?.Likes);
      }
    );
  };

  return (
    <div>
      <div
        className="mt-5 p-3 rounded-md"
        style={{
          backgroundColor: Theme.Palette.Background.Alt,
          color: Theme.Palette.Neutral.Dark,
        }}
      >
        <section className="flex justify-between items-center">
          <div className="Left flex gap-x-2 items-center">
            <Avatar
              Path={`http://localhost:7001/Assets/${SinglePost?.UserPicturePath}`}
            />
            <div>
              <p className="text-sm">
                {SinglePost?.FirstName + " " + SinglePost?.LastName}
              </p>
              <p
                className="text-xs"
                style={{ color: Theme.Palette.Neutral.MediumMain }}
              >
                Uploaded On: &nbsp;
                {new Date(SinglePost?.createdAt).getDate() +
                  "/" +
                  new Date(SinglePost?.createdAt).getMonth() +
                  "/" +
                  new Date(SinglePost?.createdAt).getFullYear() +
                  " at " +
                  new Date(SinglePost?.createdAt).toLocaleTimeString()}
              </p>
            </div>
          </div>
          <div className="Right">
            {SinglePost?.UserId == User._id ? (
              <IconButton>
                <MoreHorizIcon style={{ color: Theme.Palette.Neutral.Main }} />
              </IconButton>
            ) : User?.Friends.includes(SinglePost?.UserId) ? (
              <IconButton onClick={RemoveFriend}>
                <PersonRemoveIcon
                  style={{ color: Theme.Palette.Neutral.Main }}
                />
              </IconButton>
            ) : (
              <IconButton onClick={AddFriend}>
                <PersonAddAlt1Icon
                  style={{ color: Theme.Palette.Neutral.Main }}
                />
              </IconButton>
            )}
          </div>
        </section>

        {SinglePost?.Description ? (
          <section className="my-2">
            <p>{SinglePost?.Description}</p>
          </section>
        ) : null}

        {SinglePost?.PostPicturePath ? (
          <section className="h-[300px] w-[100%] relative my-2 rounded-md">
            <Image
              src={`http://localhost:7001/Assets/${SinglePost?.PostPicturePath}`}
              layout="fill"
              alt="Post image"
              objectFit="contain"
            />
          </section>
        ) : null}
        <section>
          <div
            className="flex justify-between items-center border-t-[1px] border-dotted"
            style={{ borderColor: Theme.Palette.Neutral.Dark }}
          >
            <div>
              <IconButton onClick={LikePost}>
                <FavoriteIcon className={Likes[`${User?._id}`]==true ? "text-red-500":"text-gray-500" }/>
              </IconButton>
              <span>{Object.keys(Likes).length}</span>
            </div>
            <div>
              <IconButton>
                <CommentIcon className="text-green-500" />
              </IconButton>
              <span>12</span>
            </div>
            <div>
              <IconButton>
                <ShareIcon className="text-blue-500" />
              </IconButton>
              <span>12</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DisplayPosts;

import React, { useState, useEffect } from "react";
import Avatar from "../../Avatar/Avatar";
import { useDispatch, useSelector } from "react-redux";
import { createTheme, IconButton, ThemeOptions } from "@mui/material";
import Image from "next/image";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import { CustomTheme } from "../../Themes/CustomTheme";
import { ThemeSettings } from "../../Themes/Themes";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import Axios from "../../Axios/Axios";
import FormData from "form-data";
import { SetUser, PatchEachPost } from "../../../Redux/AuthReducer";
import SendIcon from "@mui/icons-material/Send";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import Decision from "../../Decision/Decision";
import { useRouter } from "next/router";

const DisplayPosts = ({ SinglePost, UserSocket }: any) => {
  const User = useSelector((State: any) => {
    return State?.User;
  });
  let Router = useRouter();

  const IsLiked = Boolean(SinglePost?.Likes[User?._id]);
  const LikeCount = Object.keys(SinglePost?.Likes).length;
  const CommentCount = SinglePost?.Comments?.length;
  const Comments = SinglePost?.Comments;
  const [ShowComments, setShowComments] = useState(false);
  const [RemovePost, setRemovePost] = useState(false);

  const [CommentText, setCommentText] = useState("");

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

  let LikePost = async () => {
    await Axios.post(`likepost/${SinglePost?._id}`, { UserId: User?._id }).then(
      (Res) => {
        Dispatch(PatchEachPost({ Post: Res.data }));
      }
    );
  };

  let AddComment = async () => {
    await Axios.post(`addcomment/${SinglePost?._id}`, {
      UserId: User?._id,
      Text: CommentText,
    }).then((Res) => {
      Dispatch(PatchEachPost({ Post: Res.data }));
    });
    setCommentText("");
  };

  return (
    <div>
      <div
        className="mb-3 p-3 rounded-md"
        style={{
          backgroundColor: Theme.Palette.Background.Alt,
          color: Theme.Palette.Neutral.Dark,
        }}
      >
        <section className="flex justify-between items-center">
          <div
            className="Left flex gap-x-2 items-center"
            onClick={() => {
              Router.push(`/search/${SinglePost?.UserId}`);
            }}
          >
            <Avatar
              Path={`http://localhost:7001/Assets/${SinglePost?.UserPicturePath}`}
            />
            <div>
              <p className="text-sm hover:underline hover:cursor-pointer">
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
            {SinglePost?.UserId == User?._id ? (
              <Decision
                PostId={SinglePost?._id}
                UserSocket={UserSocket}
                User={User}
              />
            ) : User?.Friends.includes(SinglePost?.UserId) ? (
              <IconButton onClick={RemoveFriend}>
                <PersonRemoveIcon className="p-1 bg-black rounded-full text-white" />
              </IconButton>
            ) : (
              <IconButton onClick={AddFriend}>
                <PersonAddAlt1Icon className="p-1 bg-black rounded-full text-green-400" />
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
          <section className="relative my-2">
            {[".jpg", ".jpeg", ".png"].some((Extension) =>
              SinglePost?.PostPicturePath.endsWith(Extension)
            ) ? (
              <div className="h-[300px] w-[100%]">
                <Image
                  src={`http://localhost:7001/Assets/${SinglePost?.PostPicturePath}`}
                  layout="fill"
                  alt="Post image"
                  objectFit="contain"
                />
              </div>
            ) : [".mp4", ".mkv", ".webm", ".mpeg4"].some((Extension) =>
                SinglePost?.PostPicturePath.endsWith(Extension)
              ) ? (
              <video width="100%" height="100%" controls>
                <source
                  src={`http://localhost:7001/Assets/${SinglePost?.PostPicturePath}`}
                />
              </video>
            ) : [".m4a", ".mp3", "wav", "alac", "flac", "ogg"].some(
                (Extension) => SinglePost?.PostPicturePath.endsWith(Extension)
              ) ? (
              <audio controls className="w-[100%] py-2">
                <source
                  src={`http://localhost:7001/Assets/${SinglePost?.PostPicturePath}`}
                />
              </audio>
            ) : null}
          </section>
        ) : null}
        <section>
          <div
            className="flex justify-between items-center"
            style={{ borderColor: Theme.Palette.Neutral.Dark }}
          >
            <div>
              <IconButton onClick={LikePost}>
                <FavoriteIcon
                  className={IsLiked == true ? "text-red-500" : "text-gray-500"}
                />
              </IconButton>
              <span>{LikeCount}</span>
            </div>
            <div>
              <IconButton
                onClick={() => {
                  setShowComments(!ShowComments);
                }}
              >
                <CommentIcon className="text-green-500" />
              </IconButton>
              <span>{CommentCount}</span>
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

      {ShowComments ? (
        <section
          className="p-3 my-1 rounded-md max-h-[150px] overflow-scroll border-[1px]"
          style={{
            backgroundColor: Theme.Palette.Background.Alt,
            color: Theme.Palette.Neutral.Dark,
            borderColor: Theme.Palette.Primary.Light,
          }}
        >
          <div
            className="my-1 flex p-2 rounded-md"
            style={{ backgroundColor: Theme.Palette.Background.Default }}
          >
            <input
              type="text"
              className="w-[100%] bg-transparent rounded-md outline-none"
              value={CommentText}
              onChange={(E) => {
                setCommentText(E.target.value);
              }}
            />
            <SendIcon onClick={AddComment} className="hover:cursor-pointer" />
          </div>
          {Comments.map((EachComm: string, ind: number) => {
            return (
              <p key={ind}>
                <RadioButtonCheckedIcon
                  fontSize="small"
                  style={{ color: Theme.Palette.Primary.Main }}
                />{" "}
                {EachComm}
              </p>
            );
          })}
        </section>
      ) : null}
    </div>
  );
};

export default DisplayPosts;

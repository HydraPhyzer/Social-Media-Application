import { Router, useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import Axios from "../../Components/Axios/Axios";
import {
  Box,
  Divider,
  IconButton,
  ThemeOptions,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import { useSelector } from "react-redux";
import { ThemeSettings } from "../../Components/Themes/Themes";
import { CustomTheme } from "../../Components/Themes/CustomTheme";
import SmallHeader from "../../Components/HomePage/Header/SmallHeader";
import LargeHeader from "../../Components/HomePage/Header/LargeHeader";
import LeftFeed from "../../Components/HomePage/LeftFeed/LeftFeed";
import MiddleFeed from "../../Components/HomePage/MiddleFeed/MiddleFeed";
import RightFeed from "../../Components/HomePage/RightFeed/RightFeed";

import InsertCommentIcon from "@mui/icons-material/InsertComment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EmailIcon from "@mui/icons-material/Email";
import Avatar from "../../Components/Avatar/Avatar";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import Sponsers from "../../Components/HomePage/RightFeed/Sponsers";
import React from "react";
import FriendsList from "../../Components/HomePage/RightFeed/FriendsList";
import DisplayPosts from "../../Components/HomePage/MiddleFeed/DisplayPosts";

const SearchUserPage = () => {
  const router = useRouter();
  const { userid } = router.query;
  const [UserDetails, setUserDetails] = useState({} as any);
  const [FriendList, setFriendList] = useState([]);
  const [Posts, setPosts] = useState([] as any);

  let [Move, setMove] = useState(false);
  const Matches = useMediaQuery("(max-width:715px)");

  const Mode = useSelector((State: any) => State.Mode);
  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);
  let Token = useSelector((State: any) => State?.Token);

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const { data } = await Axios.get(`/getsearchuser/${userid}`);
        setUserDetails(data);

        await Axios.get(`/getfriends/${userid}`).then((Res) => {
          setFriendList(Res.data);
        });

        await Axios.get(`/getallposts/${userid}`).then((Res) => {
          setPosts(Res.data);
        });
      } catch (error) {
        router.push("/404");
      }
    };
    getUserDetails();

    let VerifyUser = async () => {
      Axios.get("/", {
        method: "GET",
        headers: { Authorization: `Bearer ${Token}` },
      })
        .then((Res) => {
          if (Res?.data?.Error) {
            router.push("/login");
          } else {
            setMove(true);
          }
        })
        .catch((Err) => {
          router.push("/login");
        });
    };
    VerifyUser();
  }, [userid]);

  let UpdateCommenstCount = () => {
    return UserDetails?.PostInfo?.reduce((Acc: number, Post: any) => {
      return Acc + Post?.Comments?.length;
    }, 0);
  };
  let UpdateLikesCount = () => {
    return UserDetails?.PostInfo?.reduce((Acc: number, Post: any) => {
      return Acc + Object.keys(Post?.Likes).length;
    }, 0);
  };

  return (
    Move &&
    UserDetails && (
      <Box
        sx={{
          backgroundColor: Theme.Palette.Background.Default,
          minHeight: "100vh",
        }}
      >
        <Head>
          <title>Searching {UserDetails?.UserInfo?.FirstName}</title>
        </Head>

        <div>
          <header
            className="w-[100vw] shadow-md sticky top-0 z-[10000]"
            style={{ backgroundColor: Theme.Palette.Background.Alt }}
          >
            <div className="max-w-[1280px] mx-auto p-3">
              {Matches ? <SmallHeader /> : <LargeHeader />}
            </div>
          </header>

          <section className="w-[100vw]">
            <div
              className={
                Matches
                  ? "max-w-[1280px] mx-auto p-3 flex justify-between gap-y-5 flex-col"
                  : "max-w-[1280px] mx-auto p-3 flex justify-between gap-x-5"
              }
            >
              <div
                className={`w-[100%] flex-[0.3] rounded-md h-fit ${
                  Matches ? "order-1" : ""
                }`}
                style={{
                  backgroundColor: Theme.Palette.Background.Alt,
                  color: Theme.Palette.Neutral.Dark,
                }}
              >
                {/* <LeftFeed /> */}

                <div className="p-3">
                  <div className="flex justify-between items-center">
                    <div className="Left flex gap-x-2 items-center">
                      <Avatar
                        Path={`http://localhost:8001/Assets/${UserDetails?.UserInfo?.PicturePath}`}
                      />
                      <div>
                        <p className="text-sm hover:underline hover:cursor-pointer">
                          {UserDetails?.UserInfo?.FirstName +
                            " " +
                            UserDetails?.UserInfo?.LastName}
                        </p>
                        <p
                          className="text-xs"
                          style={{ color: Theme.Palette.Neutral.MediumMain }}
                        >
                          {UserDetails?.UserInfo?.Friends.length} Friends
                        </p>
                      </div>
                    </div>
                    <div className="Right">
                      <IconButton>
                        <PersonOutlineIcon
                          style={{ color: Theme.Palette.Neutral.MediumMain }}
                        />
                      </IconButton>
                    </div>
                  </div>

                  <Divider
                    sx={{ my: 2, backgroundColor: Theme.Palette.Neutral.Dark }}
                  />

                  <div>
                    <div className="flex justify-between gap-x-2 text-sm items-center mb-2">
                      <div className="flex gap-x-2 items-center">
                        <InsertCommentIcon />
                        <p>Total Comments</p>
                      </div>
                      <p
                        className="p-[8px]"
                        style={{ color: Theme.Palette.Neutral.MediumMain }}
                      >
                        {UpdateCommenstCount()}
                      </p>
                    </div>
                    <div className="flex justify-between gap-x-2 text-sm items-center">
                      <div className="flex gap-x-2 items-center">
                        <FavoriteIcon />
                        <p>Total Likes</p>
                      </div>
                      <p
                        className="p-[8px]"
                        style={{ color: Theme.Palette.Neutral.MediumMain }}
                      >
                        {UpdateLikesCount()}
                      </p>
                    </div>
                  </div>
                  <Divider
                    sx={{ my: 2, backgroundColor: Theme.Palette.Neutral.Dark }}
                  />

                  <div className="flex gap-x-2">
                    <EmailIcon />
                    <p style={{ color: Theme.Palette.Neutral.MediumMain }}>
                      {UserDetails?.UserInfo?.Email}
                    </p>
                  </div>
                </div>

                {/* ============ */}
              </div>
              <div
                className={`w-[100%] flex-[0.4] ${Matches ? "order-3" : ""}`}
              >
                <div className="max-h-[85vh] overflow-scroll">
                  {Posts &&
                    Posts.map((EachPost: any, Ind: number) => {
                      return <DisplayPosts key={Ind} SinglePost={EachPost} />;
                    })}
                </div>
              </div>
              <div
                className={`w-[100%] flex-[0.3] rounded-md ${
                  Matches ? "order-2" : ""
                }`}
                style={{
                  color: Theme.Palette.Neutral.Dark,
                }}
              >
                {/* <RightFeed /> */}
                <div className="flex flex-col gap-y-5">
                  {!Matches && <Sponsers />}

                  <div
                    className="max-h-[30vh] overflow-scroll rounded-md"
                    style={{ backgroundColor: Theme.Palette.Background.Alt }}
                  >
                    <p className="font-medium p-3">Friends List</p>

                    {FriendList &&
                      FriendList.map((Each, Ind) => {
                        return <FriendsList Friends={Each} key={Ind} />;
                      })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Box>
    )
  );
};

export default SearchUserPage;

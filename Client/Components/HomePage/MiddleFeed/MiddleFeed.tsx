import React, { useCallback, useEffect, useMemo, useState } from "react";
import PostHandler from "./PostHandler/PostHandler";

import { useDispatch, useSelector } from "react-redux";
import DisplayPosts from "./DisplayPosts";
import { SetPost } from "../../../Redux/AuthReducer";
import Axios from "../../Axios/Axios";

const MiddleFeed = ({ UserSocket }: { UserSocket: any }) => {
  let Dispatch = useDispatch();

  let [Render, setRender] = useState(false);
  let Post = useSelector((State: any) => State.Posts);

  let GetData = async () => {
    await Axios.get("/getallposts").then((Res: any) => {
      Dispatch(SetPost({ Post: Res.data }));
      setRender(true);
    });
  };
  useEffect(() => {
    GetData();
  }, []);

  return (
    <div className="max-h-[85vh] overflow-scroll">
      <PostHandler UserSocket={UserSocket} />

      {Post &&
        Render &&
        Post.map((EachPost: any, Ind: number) => {
          return <DisplayPosts key={Ind} SinglePost={EachPost} UserSocket={UserSocket} />;
        })}
    </div>
  );
};

export default MiddleFeed;

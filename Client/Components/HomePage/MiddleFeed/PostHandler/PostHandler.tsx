import React, { useCallback } from "react";
import {
  createTheme,
  Divider,
  ThemeOptions,
  IconButton,
  Box,
  Typography,
  LinearProgressProps,
  LinearProgress,
} from "@mui/material";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThemeSettings } from "../../../Themes/Themes";
import { CustomTheme } from "../../../Themes/CustomTheme";
import Avatar from "../../../Avatar/Avatar";

import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import Dropzone from "react-dropzone";
import DeleteIcon from "@mui/icons-material/Delete";
import FormData from "form-data";
import Axios from "../../../Axios/Axios";
import { config } from "process";
import { SetPost } from "../../../../Redux/AuthReducer";
import CustomizedSnackbars from "../../../Toast/Toast";

type PostType = {
  Description: string;
  PostPicturePath: string;
  [key: string]: string;
};
interface FileWithPath extends File {
  path: string;
  name: string;
  preview: string;
}
function LinearProgressWithLabel(
  props: LinearProgressProps & { value: number }
) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}
type PropsType = {
  Message: string;
  Visible: boolean;
  severity: "error" | "warning" | "info" | "success";
};

const PostHandler = () => {
  const [Post, setPost] = React.useState<PostType>({
    Description: "",
    PostPicturePath: "",
  });
  const [File, setFile] = React.useState<File[]>([]);
  const [Progress, SetProgress] = React.useState<number>(0);
  const [SelectedFile, setSelectedFile] = React.useState<any>(null);
  const [VideoUrl, setVideoUrl] = React.useState("");
  const [AudioUrl, setAudioUrl] = React.useState("");
  const [ShowToast, setShowToast] = React.useState<PropsType>({
    Message: "",
    Visible: false,
    severity: "error",
  });

  const SetValues = (Attr: string, Value: string) => {
    setPost({ ...Post, [Attr]: Value });
  };
  let UpdateState = () => {
    setShowToast({ ...ShowToast, Visible: false });
  };

  const Mode = useSelector((State: any) => State?.Mode);
  const User = useSelector((State: any) => State?.User);
  const Dispatch = useDispatch();
  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);

  let onDrop = (Files: any) => {
    const AcceptedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    const FilteredFiles = Files.filter((file: File) =>
      AcceptedFileTypes.includes(file.type)
    );
    if (FilteredFiles?.length > 0) {
      setFile(FilteredFiles);
      const Reader = new FileReader();
      Reader.onload = () => {
        if (typeof Reader?.result === "string") {
          setPost({ ...Post, PostPicturePath: Reader.result });
        } else {
          setPost({ ...Post, PostPicturePath: "" });
        }
      };
      Reader.readAsDataURL(Files[0]);
    } else {
      setShowToast({
        ...ShowToast,
        Message: "Irralvant File Type or File Size too Large",
        Visible: true,
      });
    }
  };
  let onVideoDrop = (Files: any) => {
    const AcceptedFileTypes = ["video/mp4", "video/mpeg"];
    const FilteredFiles = Files.filter((file: File) =>
      AcceptedFileTypes.includes(file.type)
    );
    if (FilteredFiles?.length > 0) {
      setSelectedFile(Files[0]);

      const Reader = new FileReader();
      Reader.onload = () => {
        if (typeof Reader?.result === "string") {
          setPost({ ...Post, PostPicturePath: Reader.result });
        } else {
          setPost({ ...Post, PostPicturePath: "" });
        }
      };
      Reader.readAsDataURL(Files[0]);
    } else {
      setShowToast({
        ...ShowToast,
        Message: "Irralvant File Type or File Size too Large",
        Visible: true,
      });
    }

    setVideoUrl(URL.createObjectURL(Files[0]));
  };

  let onAudioDrop = (Files: any) => {
    const AcceptedFileTypes = [
      "audio/mp4",
      "audio/mp3",
      "audio/m4a",
      "audio/x-m4a",
      "audio/mpeg",
      "audio/wav",
      "audio/wave",
      "audio/aac",
      "audio/x-aac",
      "audio/ogg",
      "audio/flac",
      "audio/alac",
      "audio/x-matroska",
      "audio/x-midi",
    ];
    const FilteredFiles = Files.filter((file: File) =>
      AcceptedFileTypes.includes(file.type)
    );
    if (FilteredFiles?.length > 0) {
      setSelectedFile(Files[0]);

      const Reader = new FileReader();
      Reader.onload = () => {
        if (typeof Reader?.result === "string") {
          setPost({ ...Post, PostPicturePath: Reader.result });
        } else {
          setPost({ ...Post, PostPicturePath: "" });
        }
      };
      Reader.readAsDataURL(Files[0]);
    } else {
      setShowToast({
        ...ShowToast,
        Message: "Irralvant File Type or File Size too Large",
        Visible: true,
      });
    }

    setAudioUrl(URL.createObjectURL(Files[0]));
  };

  const SubmitPost = async () => {
    if (!Post.Description && !Post.PostPicturePath) {
    } else {
      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", function (event) {
        const percent = (event.loaded / event.total) * 100;
      });
      let config = {
        onUploadProgress: function (progressEvent: any) {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          SetProgress(percent);
        },
      };
      let FrmData = new FormData();

      FrmData.append("Description", Post.Description);
      FrmData.append("UserId", User?._id);

      if (File?.[0]) {
        FrmData.append("Image", File?.[0]);
        FrmData.append(
          "PicturePath",
          File[0] ? (File[0] as FileWithPath).path : ""
        );
      }
      if (SelectedFile) {
        FrmData.append("Image", SelectedFile);
        FrmData.append("PicturePath", SelectedFile?.path);
      }
      try {
        await Axios.post("/createpost", FrmData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          ...config,
        }).then((Res) => {
          setPost({ Description: "", PostPicturePath: "" });
          SetProgress(0);
          setFile([]);
          setVideoUrl("");
          setAudioUrl("")
          setSelectedFile(null);
          Dispatch(SetPost({ Post: Res.data }));
        });
      } catch (Error: any) {
        setShowToast({
          ...ShowToast,
          Message: Error?.response?.data.Error,
          Visible: true,
        });
      }
    }
  };

  return (
    <div
      className="p-3 rounded-md w-[100%]"
      style={{
        backgroundColor: Theme.Palette.Background.Alt,
        color: Theme.Palette.Neutral.Dark,
      }}
    >
      <div className="Top flex gap-x-2">
        <Avatar Path={`http://localhost:7001/Assets/${User?.PicturePath}`} />
        <input
          type="text"
          placeholder="What's On Your Mind !!"
          className="w-[100%] rounded-full px-3 outline-none"
          style={{ backgroundColor: Theme.Palette.Background.Default }}
          onChange={(E) => {
            SetValues("Description", E.target.value);
          }}
          value={Post?.Description}
        />
      </div>
      <Divider sx={{ my: 2, backgroundColor: Theme.Palette.Neutral.Dark }} />

      {File[0] ? (
        <div className="flex justify-between items-center my-4">
          <img
            src={Post?.PostPicturePath}
            style={{
              display: "block",
              width: "100px",
              height: "100px",
              objectFit: "contain",
              borderRadius: "5px",
            }}
            onLoad={() => {
              URL.revokeObjectURL((File[0] as FileWithPath).preview);
            }}
          />
          <DeleteIcon
            onClick={() => {
              setFile([]);
              SetProgress(0);
            }}
            fontSize="small"
            className="text-red-500"
          />
        </div>
      ) : VideoUrl ? (
        <div className="flex items-center justify-between">
          <video
            src={VideoUrl}
            controls
            style={{
              display: "block",
              width: "90%",
              height: "200px",
              objectFit: "contain",
              borderRadius: "5px",
            }}
          />
          <DeleteIcon
            onClick={() => {
              setSelectedFile(null);
              setVideoUrl("");
            }}
            fontSize="small"
            className="text-red-500"
          />
        </div>
      ) : AudioUrl ? (
        <div className="flex items-center justify-between">
          <audio src={AudioUrl} controls />
          <DeleteIcon
            onClick={() => {
              setSelectedFile(null);
              setAudioUrl("");
            }}
            fontSize="small"
            className="text-red-500"
          />
        </div>
      ) : null}
      <div>
        {Progress > 0 ? (
          <Box sx={{ width: "100%" }}>
            <LinearProgressWithLabel value={Progress} />
          </Box>
        ) : null}
      </div>
      <div className="flex justify-between">
        <section className="flex text-xs items-center">
          <IconButton>
            <Dropzone
              onDrop={onDrop}
              multiple={false}
              minSize={0}
              maxSize={5242880}
            >
              {({ getRootProps, getInputProps }) => (
                <section className="hover:cursor-pointer">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <InsertPhotoIcon
                      style={{ color: Theme.Palette.Neutral.MediumMain }}
                    />
                  </div>
                </section>
              )}
            </Dropzone>
          </IconButton>
          <p>Image</p>
        </section>
        <section className="flex text-xs items-center">
          <IconButton>
            <Dropzone
              onDrop={onVideoDrop}
              multiple={false}
              minSize={0}
              maxSize={10485760}
            >
              {({ getRootProps, getInputProps }) => (
                <section className="hover:cursor-pointer">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <VideoCameraBackIcon
                      style={{ color: Theme.Palette.Neutral.MediumMain }}
                    />
                  </div>
                </section>
              )}
            </Dropzone>
          </IconButton>
          <p>Video</p>
        </section>
        <section className="flex text-xs items-center">
          <IconButton>
            <AttachFileIcon
              style={{ color: Theme.Palette.Neutral.MediumMain }}
            />
          </IconButton>
          <p>File</p>
        </section>
        <section className="flex text-xs items-center">
          <IconButton>
            <Dropzone onDrop={onAudioDrop} multiple={false} minSize={0}>
              {({ getRootProps, getInputProps }) => (
                <section className="hover:cursor-pointer">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <AudioFileIcon
                      style={{ color: Theme.Palette.Neutral.MediumMain }}
                    />
                  </div>
                </section>
              )}
            </Dropzone>
          </IconButton>
          <p>Audio</p>
        </section>
        <section className="flex text-xs items-center">
          <button
            className="rounded-full px-4 py-2"
            style={{ backgroundColor: Theme.Palette.Primary.Main }}
            onClick={SubmitPost}
          >
            Post
          </button>
        </section>
        <div>
          {ShowToast.Visible ? (
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
      </div>
    </div>
  );
};
export default PostHandler;

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { useSelector, useDispatch } from "react-redux";
import { createTheme, ThemeOptions } from "@mui/material/styles";
import { ThemeSettings } from "../../Components/Themes/Themes";
import { CustomTheme } from "../../Components/Themes/CustomTheme";
import useMediaQuery from "@mui/material/useMediaQuery";
import Image from "next/image";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Box, Button, FormControl, SnackbarContent } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { SetMode } from "../../Redux/AuthReducer";
import DeleteIcon from "@mui/icons-material/Delete";
import Dropzone from "react-dropzone";
import Axios from "../../Components/Axios/Axios";
import FormData from "form-data";
import Snackbar from "@mui/material/Snackbar";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import CustomizedSnackbars from "../../Components/Toast/Toast";

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

interface FileWithPath extends File {
  path: string;
  name: string;
  preview: string;
}
type PropsType = {
  Message: string;
  Visible: boolean;
  severity: "error" | "warning" | "info" | "success";
};

const SignUp = () => {
  //Hooks Here
  const Matches = useMediaQuery("(max-width:800px)");
  const [File, setFile] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState("");
  const [OpenSnackbar, SetOpenSnackbar] = useState(false);
  const [Progress, SetProgress] = useState<number>(0);
  const [ShowToast, setShowToast] = useState<PropsType>({
    Message: "",
    Visible: false,
    severity: "error",
  });

  //Setting Theme Using Redux
  const Mode = useSelector((State: any) => State.Mode);
  const Dispatch = useDispatch();
  let SetMod = () => {
    Dispatch(SetMode());
  };

  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);

  //Form Schema
  let Router = useRouter();
  const SignUpSchema = Yup.object().shape({
    FirstName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("First Name is Required !!"),
    LastName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Last Name is Required !!"),
    Email: Yup.string().required("Email is Required !!"),
    Password: Yup.string().required("Password is Required !!"),
  });

  //DropZone Work Here
  let onDrop = (Files: any) => {
    // console.log(Files);
    const AcceptedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    const FilteredFiles = Files.filter((file: File) =>
      AcceptedFileTypes.includes(file.type)
    );
    if (FilteredFiles?.length > 0) {
      setFile(FilteredFiles);
      const Reader = new FileReader();
      Reader.onload = () => {
        if (typeof Reader?.result === "string") {
          setPreviewUrl(Reader.result);
        } else {
          setPreviewUrl("");
        }
      };
      Reader.readAsDataURL(Files[0]);
    } else {
      alert("Irralvant File Type or File Size too Large");
    }
  };
  let SignUp = async (values: any, resetForm: Function) => {
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

    let Formdata = new FormData();
    for (let Value in values) {
      Formdata.append(Value, values[Value]);
    }
    Formdata.append("Image", File?.[0]);
    Formdata.append(
      "PicturePath",
      File[0] ? (File[0] as FileWithPath).path : ""
    );

    try {
      let Res = await Axios.post("/auth/register", Formdata, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        ...config,
      }).then(() => {
        setFile([]);
        SetProgress(0);
        setShowToast({
          ...ShowToast,
          Message: "Successfully Signed Up",
          Visible: true,
          severity:"success"
        });
        resetForm({ values: "" });
        Router.push("/login");
      });
    } catch (Error: any) {
      setShowToast({
        ...ShowToast,
        Message: Error?.response?.data.Error,
        Visible: true,
      });
    }
  };
  let UpdateState = () => {
    setShowToast({ ...ShowToast, Visible: false });
  };

  return (
    <Box
      sx={{ backgroundColor: Theme.Palette.Background.Default }}
      className="min-h-[100vh]"
    >
      <Head>
        <title>Signup To Connectify</title>
      </Head>
      <div className="flex flex-col gap-y-5 text-white">
        <Box
          className="flex items-center text-center p-3 sticky top-0"
          sx={{
            backgroundColor: Theme.Palette.Background.Alt,
            color: Theme.Palette.Primary.Main,
          }}
        >
          <div className="mx-auto">
            <span>Connectify</span>
            <Image
              src="/Favicon/Favicon.png"
              height={20}
              width={20}
              alt="Logo"
              className="inline mx-1"
            />
          </div>
          <DarkModeIcon
            onClick={() => {
              SetMod();
            }}
          />
        </Box>

        <section className="flex flex-col justify-center items-center">
          <Box
            className={`p-5 ${Matches ? "w-[100%]" : "w-[40%]"}`}
            sx={{
              backgroundColor: Theme.Palette.Background.Alt,
              color: Theme.Palette.Primary.Dark,
            }}
          >
            <p className="text-center mb-10">Hey 👋. Welcome to Connectify</p>
            <Formik
              initialValues={{
                FirstName: "",
                LastName: "",
                Email: "",
                Password: "",
              }}
              validationSchema={SignUpSchema}
              onSubmit={(values, { resetForm }) => {
                SignUp(values, resetForm);
              }}
            >
              {({ errors, touched }) => (
                <Form className={`flex flex-col`}>
                  <FormControl sx={{ m: 1 }} variant="standard">
                    <div
                      className={
                        Matches
                          ? "flex justify-between gap-y-5 flex-col"
                          : "flex justify-between gap-y-5 gap-x-2"
                      }
                    >
                      <div>
                        <Field
                          as={TextField}
                          label="First Name"
                          variant="filled"
                          size="small"
                          className="bg-[#ecf0f1] w-[100%]"
                          name="FirstName"
                        />
                        {errors.FirstName && touched.FirstName ? (
                          <div className="text-[0.7rem] mt-[5px] text-red-500 ">
                            {errors.FirstName}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <Field
                          as={TextField}
                          label="Last Name"
                          variant="filled"
                          size="small"
                          className="bg-[#ecf0f1] w-[100%]"
                          name="LastName"
                        />
                        {errors.LastName && touched.LastName ? (
                          <div className="text-[0.7rem] mt-[5px] text-red-500">
                            {errors.LastName}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </FormControl>

                  <FormControl sx={{ m: 1 }} variant="standard">
                    <Field
                      as={TextField}
                      label="Enter Your Email"
                      variant="filled"
                      size="small"
                      className="bg-[#ecf0f1]"
                      name="Email"
                    />
                    {errors.Email && touched.Email ? (
                      <div className="text-[0.7rem] mt-[5px] text-red-500">
                        {errors.Email}
                      </div>
                    ) : null}
                  </FormControl>

                  <FormControl sx={{ m: 1 }} variant="standard">
                    <Field
                      as={TextField}
                      name="Password"
                      label="Enter Your Password"
                      variant="filled"
                      size="small"
                      className="bg-[#ecf0f1]"
                    />

                    {errors.Password && touched.Password ? (
                      <div className="text-[0.7rem] mt-[5px] text-red-500">
                        {errors.Password}
                      </div>
                    ) : null}
                  </FormControl>

                  <Box
                    sx={{ m: 1, border: "1px dashed grey", p: 2 }}
                    className="text-xs"
                  >
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
                            <p style={{ color: Theme.Palette.Primary.Dark }}>
                              Drag & Drop or Just Click To Upload Image. (Size
                              &lt; 5Mb)
                            </p>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                    {File[0] ? (
                      <div className="flex justify-between items-center border-b-[1px] p-1 my-1">
                        <p>
                          {File[0]?.name}
                          <img
                            src={previewUrl}
                            style={{
                              display: "block",
                              width: "100px",
                              height: "100px",
                              objectFit: "contain",
                            }}
                            onLoad={() => {
                              URL.revokeObjectURL(
                                (File[0] as FileWithPath).preview
                              );
                            }}
                          />
                        </p>
                        <DeleteIcon
                          onClick={() => {
                            setFile([]);
                            SetProgress(0);
                          }}
                          fontSize="small"
                          className="text-red-500"
                        />
                      </div>
                    ) : null}

                    {Progress > 0 ? (
                      <Box sx={{ width: "100%" }}>
                        <LinearProgressWithLabel value={Progress} />
                      </Box>
                    ) : null}
                  </Box>

                  <Button
                    type="submit"
                    className="rounded-0"
                    sx={{
                      m: 1,
                      backgroundColor: Theme.Palette.Primary.Main,
                      color: Theme.Palette.Primary.Light,
                      "&:hover": {
                        backgroundColor: Theme.Palette.Primary.Dark,
                      },
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      borderRadius: "0",
                    }}
                  >
                    SignUp
                  </Button>

                  <Typography
                    onClick={() => {
                      Router.push("/login");
                    }}
                    sx={{
                      m: 1,
                      color: Theme.Palette.Primary.Dark,
                      textDecoration: "underline",
                      ":hover": { cursor: "pointer" },
                      fontSize: "0.7rem",
                    }}
                  >
                    Already Have an Account ?, Login{" "}
                  </Typography>
                </Form>
              )}
            </Formik>
          </Box>
        </section>
      </div>
      {/* <div>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          open={OpenSnackbar}
          autoHideDuration={3000}
          onClose={() => SetOpenSnackbar(false)}
          key={"top" + "right"}
          message="Successfully Signed Up"
        />
      </div> */}
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
    </Box>
  );
};

export default SignUp;

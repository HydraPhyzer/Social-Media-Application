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

import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import { Box, Button, FormControl, InputLabel, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";

import { SetMode, SetLogIn, SetUserSocket } from "../../Redux/AuthReducer";
import Axios from "../../Components/Axios/Axios";
import CustomizedSnackbars from "../../Components/Toast/Toast";
import { io } from "socket.io-client";

type PropsType = {
  Message: string;
  Visible: boolean;
  severity: "error" | "warning" | "info" | "success";
};

const Login = () => {
  let Router = useRouter();
  const [ShowToast, setShowToast] = useState<PropsType>({
    Message: "",
    Visible: false,
    severity: "error",
  });
  const Matches = useMediaQuery("(max-width:600px)");

  const Mode = useSelector((State: any) => State.Mode);
  const UserSocket = useSelector((State: any) => State.UserSocket);
  const Dispatch = useDispatch();

  let SetMod = () => {
    Dispatch(SetMode());
  };

  let Theme = useMemo(() => {
    return createTheme(
      ThemeSettings(Mode) as unknown as ThemeOptions
    ) as CustomTheme;
  }, [Mode]);

  const LoginSchema = Yup.object().shape({
    Email: Yup.string().email("Invalid Email").required("Email is Required !!"),
    Password: Yup.string()
      .min(2, "Password Too Short !")
      .max(50, "Password Too Long")
      .required("Password is Required !!"),
  });
  let LogIn = async (values: any, resetForm: any) => {
    try {
      let Res = await Axios.post("/auth/login", values).then((Result) => {
        setShowToast({
          ...ShowToast,
          Message: "Successfully Logged In",
          Visible: true,
          severity: "success",
        });
        Dispatch(
          SetLogIn({
            User: Result.data.SearchUser,
            Token: Result.data.Token,
          })
        );

        resetForm();
        Router.push("/");
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
      className="h-[100vh]"
    >
      <Head>
        <title>Login To Connectify</title>
      </Head>
      <div className="flex flex-col gap-y-5 text-white">
        <Box
          className="flex items-center text-center p-3"
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
            <p className="text-center mb-10">Welcome Back to Connectify</p>
            <Formik
              initialValues={{
                Email: "",
                Password: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={(values, { resetForm }) => {
                LogIn(values, resetForm);
              }}
            >
              {({ errors, touched }) => (
                <Form className={`flex flex-col`}>
                  <FormControl sx={{ m: 1 }} variant="standard">
                    <Field
                      as={TextField}
                      name="Email"
                      label="Enter Your Email"
                      variant="filled"
                      size="small"
                      className="bg-[#ecf0f1]"
                    />

                    {errors.Email && touched.Email ? (
                      <div className="text-[0.7rem] mt-[5px] text-red-500">
                        {errors.Email}
                      </div>
                    ) : (
                      ""
                    )}
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
                    ) : (
                      ""
                    )}
                  </FormControl>

                  <Button
                    type="submit"
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
                    Login
                  </Button>

                  <Typography
                    onClick={() => {
                      Router.push("/signup");
                    }}
                    sx={{
                      m: 1,
                      color: Theme.Palette.Primary.Dark,
                      textDecoration: "underline",
                      ":hover": { cursor: "pointer" },
                      fontSize: "0.7rem",
                    }}
                  >
                    Dont Have an Account ?, Sign Up{" "}
                  </Typography>
                </Form>
              )}
            </Formik>
          </Box>
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
        </section>
      </div>
    </Box>
  );
};

export default Login;

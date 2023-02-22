import React, { useCallback, useEffect, useMemo } from "react";
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

import { SetMode } from "../../Redux/AuthReducer";
import Dropzone from "react-dropzone";

const Login = () => {
  let Router = useRouter();
  const Matches = useMediaQuery("(max-width:600px)");

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

  const LoginSchema = Yup.object().shape({
    Email: Yup.string().email("Invalid Email").required("Email is Required !!"),
    Password: Yup.string()
      .min(2, "Password Too Short !")
      .max(50, "Password Too Long")
      .required("Password is Required !!"),
  });

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
              onSubmit={(values) => {
                console.log(values);
              }}
            >
              {({ errors, touched }) => (
                <Form className={`flex flex-col`}>
                  <FormControl sx={{ m: 1 }} variant="standard">
                    <TextField
                      id="password-input"
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
                    <TextField
                      id="password-input"
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
        </section>
      </div>
    </Box>
  );
};

export default Login;

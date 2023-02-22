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
import { Box, Button, FormControl } from "@mui/material";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { SetMode } from "../../Redux/AuthReducer";
import DeleteIcon from "@mui/icons-material/Delete";
import Dropzone from "react-dropzone";

const SignUp = () => {
  const Matches = useMediaQuery("(max-width:800px)");
  const [File, setFile] = useState([{}]);

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

  let Router = useRouter();
  const SignUpSchema = Yup.object().shape({
    FirstName: Yup.string()
      .max(10, "First Name Too Long ")
      .required("First Name is Required !!"),
    LastName: Yup.string()
      .max(10, "Last Name Too Long ")
      .required("Last Name is Required !!"),
    Email: Yup.string().email("Invalid Email").required("Email is Required !!"),
    Password: Yup.string()
      .min(2, "Password Too Short !")
      .max(50, "Password Too Long")
      .required("Password is Required !!"),
  });

  let onDrop = (Files: any) => {
    setFile(Files);
  };

  return (
    <Box
      sx={{ backgroundColor: Theme.Palette.Background.Default }}
      className="h-[100vh]"
    >
      <Head>
        <title>Signup To Connectify</title>
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
            <p className="text-center mb-10">Hey 👋. Welcome to Connectify</p>
            <Formik
              initialValues={{
                FirstName: "",
                LastName: "",
                Email: "",
                Password: "",
              }}
              validationSchema={SignUpSchema}
              onSubmit={(values) => {
                console.log(values);
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
                        <TextField
                          label="First Name"
                          variant="filled"
                          size="small"
                          className="bg-[#ecf0f1] w-[100%]"
                        />
                        {errors.FirstName && touched.FirstName ? (
                          <div className="text-[0.7rem] mt-[5px] text-red-500 ">
                            {errors.FirstName}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <TextField
                          label="Last Name"
                          variant="filled"
                          size="small"
                          className="bg-[#ecf0f1] w-[100%]"
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
                    <TextField
                      label="Enter Your Email"
                      variant="filled"
                      size="small"
                      className="bg-[#ecf0f1]"
                    />
                    {errors.Email && touched.Email ? (
                      <div className="text-[0.7rem] mt-[5px] text-red-500">
                        {errors.Email}
                      </div>
                    ) : null}
                  </FormControl>

                  <FormControl sx={{ m: 1 }} variant="standard">
                    <TextField
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
                            <p style={{color:Theme.Palette.Primary.Dark}}>Drag & Drop or Just Click To Upload Image</p>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                    {File[0]?.name ? (
                      <div className="flex justify-between items-center border-b-[1px] p-1 my-1">
                        <p>{File[0]?.name}</p>
                        <DeleteIcon
                          onClick={() => {
                            setFile([{}]);
                          }}
                          fontSize="small"
                          className="text-red-500"
                        />
                      </div>
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
    </Box>
  );
};

export default SignUp;

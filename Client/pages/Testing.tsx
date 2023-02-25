import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Button, FormControl, TextField } from "@mui/material";

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

export const ValidationSchemaExample = () => (
  <div className="bg-black text-red-500">
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={(values) => {
        // same shape as initial values
        console.log(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <FormControl sx={{ m: 1 }} variant="standard">
            <div>
              <div>
                <Field
                  as={TextField}
                  label="First Name"
                  variant="filled"
                  size="small"
                  className="bg-[#ecf0f1] w-[100%]"
                  name="firstName"
                />
                {errors.firstName && touched.firstName ? (
                  <div className="text-[0.7rem] mt-[5px] text-red-500">
                    {errors.firstName}
                  </div>
                ) : null}
              </div>
              <div>
                <Field
                  as={TextField}
                  label="Last Name"
                  variant="filled"
                  size="small"
                  name="lastName"
                  className="bg-[#ecf0f1] w-[100%]"
                />
                {errors.lastName && touched.lastName ? (
                  <div className="text-[0.7rem] mt-[5px] text-red-500">
                    {errors.lastName}
                  </div>
                ) : null}
              </div>
            </div>
          </FormControl>

          <FormControl sx={{ m: 1 }} variant="standard">
            <Field
              as={TextField}
              label="Enter Your email"
              variant="filled"
              size="small"
              className="bg-[#ecf0f1]"
              name="email"
            />
            {errors.email && touched.email ? (
              <div className="text-[0.7rem] mt-[5px] text-red-500">
                {errors.email}
              </div>
            ) : null}
          </FormControl>
          <Button type="submit" className="rounded-0 bg-black">
            SignUp
          </Button>
        </Form>
      )}
    </Formik>
  </div>
);

export default ValidationSchemaExample;

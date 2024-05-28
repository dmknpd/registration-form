import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router";

import Menu from "../Menu/Menu";

const SignUpShecma = Yup.object().shape({
  email: Yup.string().email("Invaild email").required("Required"),
  password: Yup.string().min(4, "Too short!").required("Required"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

const Registation = () => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  return (
    <div className="bg-gray-700 w-screen h-screen flex items-center justify-center">
      <Menu />
      <div className="bg-stone-200 w-96 h-auto py-10 px-1 rounded flex flex-col items-center">
        <h2 className="text-2xl font-semibold">Register</h2>
        <Formik
          initialValues={{ email: "", password: "", confirm: "" }}
          validationSchema={SignUpShecma}
          onSubmit={(values, { setSubmitting, resetForm }) => {
            const { confirm, ...userValues } = values;

            axios
              .post("http://localhost:3001/register", userValues)
              .then(({ data }) =>
                setUser({
                  token: data.accessToken,
                  ...data.user,
                })
              )
              .catch((error) => console.log(error.message));
            setSubmitting(false);
            resetForm();

            // localStorage.setItem(
            //   "user",
            //   JSON.stringify({
            //     token: user.accessToken,
            //     ...user,
            //   })
            // );
            // navigate("/");
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col w-full items-center gap-4">
              <div className="flex flex-col mt-5 w-4/5">
                <label htmlFor="email" className="">
                  Email:
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="rounded h-8 px-2"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-600 mt-1"
                />
              </div>

              <div className="flex flex-col w-4/5">
                <label htmlFor="password" className="">
                  Password:
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="rounded h-8 px-2"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-600 mt-1"
                />
              </div>

              <div className="flex flex-col w-4/5">
                <label htmlFor="confirm" className="">
                  Confirm Password:
                </label>
                <Field
                  type="password"
                  name="confirm"
                  id="confirm"
                  className="rounded h-8 px-2"
                />
                <ErrorMessage
                  name="confirm"
                  component="div"
                  className="text-red-600 mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-white mt-3 px-5 py-1 rounded hover:bg-gray-300"
              >
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Registation;

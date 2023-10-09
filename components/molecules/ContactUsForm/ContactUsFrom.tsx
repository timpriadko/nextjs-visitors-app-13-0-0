import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import cx from "classnames";
import { useState } from "react";
import useAxios from "axios-hooks";
import { useId } from "react";
import GreenCheckMarkVerified from "../../../public/assets/greenCheckMarkVerified.svg";
import styles from "./contactUsFrom.module.scss";

const validationSchema = Yup.object().shape({
  username: Yup.string().required("User name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  message: Yup.string().required("Message is required"),
});

interface FormData {
  username: string;
  email: string;
  message: string;
}

const initialValues: FormData = {
  username: "",
  email: "",
  message: "",
};

const ContactUsForm = () => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const usernameId = useId();
  const emailId = useId();
  const msgId = useId();

  const [
    { data: formFetchData, loading: formFetchLoading, error: formFetchError },
    executeForm,
  ] = useAxios(
    {
      url: "/api/contact",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
    { manual: true }
  );

  const handleSubmit = async (values: FormData) => {
    await executeForm({
      data: values,
    })
      .then((res) => res)
      .then((data) => {
        console.log("data-handleSubmit", {
          data,
        });
        setIsFormSubmitted(true);
      });
  };

  if (formFetchLoading)
    return (
      <p className='h-[256px] flex items-center justify-center font-bold text-3xl'>
        Loading...
      </p>
    );
  if (formFetchError)
    return (
      <p className='h-[256px] flex items-center justify-center font-bold text-3xl text-red-600 text-center'>
        Error!
        <br />
        <br />
        Please, update the form values and try again
      </p>
    );

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) =>
        isFormSubmitted ? (
          <div className='text-green-500'>
            <p className='text-center mb-3'>Your message is sent!</p>
            <GreenCheckMarkVerified className='mx-auto mb-2' />
          </div>
        ) : (
          <Form className={cx(styles.form, "max-w-3xl mx-auto")}>
            <div
              className={cx(styles.formItem, {
                [styles["error"]]: errors.username && touched.username,
              })}
            >
              <label htmlFor={usernameId}>User Name</label>
              <Field type='text' name='username' id={usernameId} />
              <ErrorMessage
                name='username'
                component='div'
                className={cx(styles.error)}
              />
            </div>

            <div
              className={cx(styles.formItem, {
                [styles["error"]]: errors.email && touched.email,
              })}
            >
              <label htmlFor={emailId}>Email</label>
              <Field type='email' name='email' id={emailId} />
              <ErrorMessage
                name='email'
                component='div'
                className={cx(styles.error)}
              />
            </div>

            <div
              className={cx(styles.formItem, {
                [styles["error"]]: errors.message && touched.message,
              })}
            >
              <label htmlFor={msgId}>Message</label>
              <Field as='textarea' name='message' id={msgId} />
              <ErrorMessage
                name='message'
                component='div'
                className={cx(styles.error)}
              />
            </div>

            <button
              type='submit'
              className='block mx-auto mt-3 border-solid border-2 border-gray-500 px-5 py-2 rounded-md hover:bg-gray-500 hover:text-neutral-100 ease-out duration-100'
            >
              Submit
            </button>
          </Form>
        )
      }
    </Formik>
  );
};

export default ContactUsForm;

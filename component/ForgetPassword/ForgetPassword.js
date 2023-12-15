import React, { useState, useRef } from "react";
import { resetPasswordLinkAxios as resetPasswordLink } from "../Helper/AxiosFunction.js";
import { Container, Paper, Text, TextInput, Button } from "@mantine/core";
import classes from "./ForgetPassword.module.css";
import EmailSent from "./EmailSent";

const ResetPasswordLink = () => {
  const [emailSentState, setEmailSentState] = useState(false);
  const [email, setEmail] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    resetPasswordLink(email)
      .then((res) => {
        if (res.data !== "user not found") {
          setEmailSentState(true);
          console.log(res.data);
        } else {
          throw new Error("User is not registered");
        }
      })
      .catch((err) => {
        alert(`Error: ${err.message}`);
      });
  };

  return (
    <Container className=" flex justify-center  items-center w-40  sm:w-60 md:w-80">
      {emailSentState && <EmailSent />}
      {!emailSentState && (
        <Paper>
          <h1 className="text-3xl font-bold mb-8">忘記密碼</h1>
          {/* <Text size="md">請輸入你登記的電郵地址</Text> */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <TextInput
              label="請輸入你登記的電郵地址"
              fullWidth
              onChange={(e) => setEmail(e.currentTarget.value)} // Handle change
              className="w-full"
            />
            <button
              type="submit"
              variant="outline"
              className="bg-blue-600 py-2 px-8 text-md text-white cursor-pointer rounded-full flex items-center transition duration-100 ease-in-out hover:bg-gray-500 mt-2 mx-1"
            >
              發送重置鏈接
            </button>
          </form>
        </Paper>
      )}
    </Container>
  );
};

export default ResetPasswordLink;

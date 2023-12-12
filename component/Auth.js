import { useState, useRef } from "react";
import { useRouter } from "next/router";
import useStore from "../stores/stores";
import { useDisclosure } from "@mantine/hooks";
import { Button, TextInput, Anchor, LoadingOverlay, Box } from "@mantine/core";
import { logIn } from "../component/Helper/AxiosFunction";
import { useUserForm } from "../component/Form/FormModel/FormContext";
import cookie from "js-cookie";

const AuthForm = () => {
  const router = useRouter();
  const form = useUserForm();
  const [visible, { toggle }] = useDisclosure(false);
  const adduserId = useStore((state) => state.adduserId);
  const loginAction = useStore((state) => state.loginuserId);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    toggle();
    setIsLoading(true);
    form.setValues((prev) => ({ ...prev, ...event }));
    logIn(isLogin, form.values.email, form.values.password)
      .then((res) => {
        if (res.status === 201) {
          return res.data;
        } else {
          let errorMessage = "Authentication failed!";
          throw new Error(errorMessage);
        }
      })
      .then((res) => {
        console.log(res.accessToken);
        cookie.set("access_token", res.accessToken, { expires: 1 / 24 }); // 1 hour expiration
        adduserId(res.userId);
        loginAction();
        router.push("/cases");
      })
      .catch((err) => {
        alert(err.message);
        toggle();
      });
  };

  return (
    <section>
      <h1 className="text-xl font-bold mb-8">{isLogin ? "登入" : "登記"}</h1>
      <form onSubmit={submitHandler} className="">
        {/* Email input */}
        <Box pos="relative">
          <LoadingOverlay
            visible={visible}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <div>
            <TextInput
              label="電郵地址"
              type="email"
              id="email"
              required
              {...form.getInputProps("email")}
              className="w-full"
            />
          </div>
          {/* Password input */}
          <div>
            <TextInput
              label="密碼"
              type="password"
              id="password"
              required
              {...form.getInputProps("password")}
              className="w-full"
            />
          </div>
          {/* Buttons and link */}
          <div className="flex flex-col space-y-2">
            {!isLoading && (
              <Button variant="deafult" onClick={submitHandler}>
                {isLogin ? "Login" : "Create Account"}
              </Button>
            )}
            {isLoading && <p>Sending request...</p>}
            <Button
              type="button"
              variant="deafult"
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </Button>
            <Anchor className="self-center">忘記密碼</Anchor>
          </div>
        </Box>
      </form>
    </section>
  );
};

export default AuthForm;

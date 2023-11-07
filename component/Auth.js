import { useState, useRef } from "react";
import { useRouter } from "next/router";
import useStore from "../stores/stores";
import Link from "next/link";
import { Button, TextInput } from "@mantine/core";
import { logIn } from "../component/Helper/AxiosFunction";
import { useUserForm } from "../component/Form/FormModel/FormContext";

const AuthForm = () => {
  const router = useRouter();
  const form = useUserForm();
  const addUserid = useStore((state) => state.addUserid);
  const loginAction = useStore((state) => state.loginUserid);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    form.setValues((prev) => ({ ...prev, ...event }));
    logIn(isLogin, form.values.email, form.values.password)
      .then((res) => {
        setIsLoading(false);
        if (res.status === 201) {
          return res.data;
        } else {
          let errorMessage = "Authentication failed!";
          throw new Error(errorMessage);
        }
      })
      .then((res) => {
        console.log(res.accessToken);
        localStorage.setItem("accessToken", res.accessToken);
        addUserid(res.userid);
        loginAction();
        router.push("/cases");
      })
      .catch((err) => {
        alert(err.message);
        setIsLoading(false);
      });
  };

  return (
    <section>
      <h1>{isLogin ? "登入" : "登記"}</h1>
      <form onSubmit={submitHandler}>
        <div>
          <TextInput
            label="Email"
            type="email"
            id="email"
            required
            {...form.getInputProps("email")}
          />
        </div>
        <div>
          <TextInput
            label="Password"
            type="password"
            id="password"
            required
            {...form.getInputProps("password")}
          />
        </div>
        <div>
          {!isLoading && (
            <Button variant="outlined" onClick={submitHandler}>
              {isLogin ? "Login" : "Create Account"}
            </Button>
          )}
          {isLoading && <p>Sending request...</p>}
          <Button type="button" onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </Button>
          <Button>
            <Link href="/forgetPassword">忘記密碼</Link>
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;

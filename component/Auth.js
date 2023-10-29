import { useState, useRef } from "react";
import { useRouter } from "next/router";
import useStore from "../stores/stores";
import Link from "next/link";
import { Button, TextInput } from "@mantine/core";
import { logIn } from "../component/Helper/AxiosFunction";

const AuthForm = () => {
  const router = useRouter();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const addUserid = useStore((state) => state.addUserid);
  const loginAction = useStore((state) => state.loginUserid);
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword = passwordInputRef.current?.value;
    setIsLoading(true);
    logIn(isLogin, url, enteredEmail, enteredPassword)
      .then((res) => {
        setIsLoading(false);
        if (res.status == 200) {
          return res.data;
        } else {
          return res.then((data) => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((res) => {
        console.log(res.userID);
        addUserid(res.userID);
        loginAction();
        console.log(res.accessToken);
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
          <TextField
            label="Email"
            type="email"
            id="email"
            required
            inputRef={emailInputRef}
          />
        </div>
        <div>
          <TextField
            label="Password"
            type="password"
            id="password"
            required
            inputRef={passwordInputRef}
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

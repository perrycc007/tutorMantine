import { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/router";
// import { useNavigate } from 'react-router-dom';
import Axios from "Axios";
import { VerifyResetPasswordAxios } from "../../../../component/Helper/AxiosFunction";
// import useStore from '../stores/stores';
import ResetPassword from "../../../../component/ResetPassword/ResetPassword";
import InvalidResetLink from "../../../../component/ResetPassword/InvalidResetLink";

const ResetPasswordPage = () => {
  const router = useRouter();
  const { token } = router.query;
  const { userid } = router.query;
  const [linkValid, setLinkValid] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log(userid, token);

    if (token != null) {
      VerifyResetPasswordAxios(userid, token)
        .then((res) => {
          console.log(res);
          setLoading(false);
          if (res.data == "jwt expired") {
            // let errorMessage = "Link has Expired";
            setLinkValid(false);
            setLoading(false);
            // throw new Error(errorMessage);
          } else if (res.data == "invalid token") {
            // let errorMessage = "Link is invalid";
            setLinkValid(false);
            setLoading(false);
            // throw new Error(errorMessage);
          } else {
            setLinkValid(true);
            setLoading(false);
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }, [router.query]);

  return (
    <Fragment>
      {!loading && linkValid && <ResetPassword />}
      {!loading && !linkValid && <InvalidResetLink />}
    </Fragment>
  );
};

export default ResetPasswordPage;

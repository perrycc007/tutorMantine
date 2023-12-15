import ForgetPassword from "../../component/ForgetPassword/ForgetPassword";
import { Card } from "@mantine/core";
const ResetPasswordLink = () => {
  return (
    <section
      className="flex py-20 bg-fixed min-h-screen bg-cover
 bg-login-page justify-center bg-center max-w-screen "
    >
      <Card className="flex max-h-96 justify-center  px-10 py-10  bg-white rounded-lg shadow-md sm:px-15 py-10  lg:px-15 py-10 ">
        <ForgetPassword />
      </Card>
    </section>
  );
};

export default ResetPasswordLink;

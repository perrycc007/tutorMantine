import Auth from "../../component/Auth";
import { Card } from "@mantine/core";
const AuthPage = () => {
  return (
    <>
      <section
        className="flex py-20  min-h-screen bg-cover
       bg-login-page justify-center bg-center max-w-screen"
      >
        {/* Adjusted card container with responsive padding */}
        {/* <div className="mt-4 "> */}
        <Card className="flex max-h-96 justify-center  px-10 py-10  bg-white rounded-lg shadow-md sm:px-15 py-10  lg:px-15 py-10 ">
          <Auth />
        </Card>
        {/* </div> */}
      </section>
    </>
  );
};

export default AuthPage;

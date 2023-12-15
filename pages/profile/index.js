import { useEffect, useState } from "react";
import userStore from "../../stores/stores";
import { stripFormEventProperties } from "../../component/Helper/HelperFunction";
import Form from "../../component/Form/Form";
import { Card, LoadingOverlay } from "@mantine/core";
import {
  fetchProfileData,
  updateProfileAxios,
  updateTutorAxios,
} from "../../component/Helper/AxiosFunction";

const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [isTutor, setIsTutor] = useState("tutor");
  const getuserId = userStore((state) => state.userId);
  const Profile = userStore((state) => state.Profile);
  const TutorProfile = userStore((state) => state.TutorProfile);
  const updateProfile = userStore((state) => state.updateProfile);
  const updateTutor = userStore((state) => state.updateTutor);
  const [TutorData, setTutorData] = useState({});
  const [ProfileData, setProfileData] = useState({});

  const updateFormHandler = async (values) => {
    try {
      const cleanedValues = stripFormEventProperties(values);
      await updateProfileAxios(getuserId, cleanedValues);
      updateProfile(cleanedValues);
      setProfileData((prev) => ({ ...prev, ...cleanedValues }));
    } catch (error) {
      alert("Error updating profile:", error);
    }
  };

  const updateTutorFormHandler = async (values) => {
    try {
      const cleanedValues = stripFormEventProperties(values);
      console.log(cleanedValues);
      await updateTutorAxios(getuserId, cleanedValues);
      updateTutor(cleanedValues);
      setTutorData((prev) => ({ ...prev, ...cleanedValues }));
    } catch (error) {
      alert("Error updating tutor profile:", error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileResponse, tutorResponse] = await fetchProfileData(
          getuserId
        );
        updateProfile(profileResponse);
        setProfileData(profileResponse);
        updateTutor(tutorResponse);
        setTutorData(tutorResponse);
      } catch (error) {
        alert("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  useEffect(() => {}, [
    TutorData,
    ProfileData,
    updateTutorFormHandler,
    updateFormHandler,
  ]);
  return (
    <>
      {/* {loading && <p>Loading...</p>} */}
      <section className="flex max-w-screen bg-cover bg-fixed py-10 min-h-screen bg-login-page bg-center">
        <div className="flex w-screen justify-center md:items-center mb-20">
          <div className="mt-4 h-fit">
            <Card className="flex justify-center px-4 py-6 bg-white rounded-lg shadow-md sm:px-10 py-10 lg:px-16 py-16">
              <LoadingOverlay
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: "sm", blur: 2 }}
              />
              <Form
                data={ProfileData}
                tutorData={TutorData}
                updateForm={updateFormHandler}
                updateTutorForm={updateTutorFormHandler}
                type={isTutor}
              />
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserProfile;

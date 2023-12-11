// import ProfileForm from "../../components/Form/ProfileForm";
import { useEffect, useState } from "react";
import userStore from "../../stores/stores";
import { stripFormEventProperties } from "../../component/Helper/HelperFunction";
import Form from "../../component/Form/Form";
import {
  fetchProfileData,
  updateProfileAxios,
  updateTutorAxios,
} from "../../component/Helper/AxiosFunction";
const UserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [isTutor, serIsTutor] = useState("tutor");
  const getuserId = userStore((state) => state.userId);
  const Profile = userStore((state) => state.Profile);
  const TutorProfile = userStore((state) => state.TutorProfile);
  const updateProfile = userStore((state) => state.updateProfile);
  const updateTutor = userStore((state) => state.updateTutor);
  const [TutorDate, setTutorData] = useState({ ...TutorProfile });
  const [ProfileData, setProfileData] = useState({ ...Profile });
  const updateFormHanlder = (values) => {
    console.log("ProfileData", values);
    updateProfile(stripFormEventProperties(values));
    updateProfileAxios(getuserId, stripFormEventProperties(values));
    setProfileData((prev) => ({
      ...prev,
      ...stripFormEventProperties(values),
    }));
  };
  const updateTutorFormHandler = (values) => {
    updateTutor(stripFormEventProperties(values));
    updateTutorAxios(getuserId, stripFormEventProperties(values));
    setTutorData((prev) => ({ ...prev, ...stripFormEventProperties(values) }));
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const [profileResponse, tutorResponse] = await fetchProfileData(
          getuserId
        );
        updateProfile(profileResponse);
        setProfileData(profileResponse);
        updateTutor(tutorResponse);
        setTutorData(tutorResponse);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, [loading]);

  return (
    <>
      {/* {loading && <p>Loading...</p>} */}
      <Form
        data={ProfileData}
        tutorData={TutorDate}
        updateForm={updateFormHanlder}
        updateTutorForm={updateTutorFormHandler}
        type={isTutor}
      />
      {/* {!loading && <ProfileForm profile={profile} tutor={tutor} />}
       */}
    </>
  );
};

export default UserProfile;

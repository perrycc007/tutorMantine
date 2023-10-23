// import ProfileForm from "../../components/Form/ProfileForm";
import { useEffect, useState } from "react";
import axios from "axios";
import userStore from "../../stores/stores";
import Form from "../../component/Form/Form";
const UserProfile = () => {
  const getUserid = userStore((state) => state.userId);
  const Profile = userStore((state) => state.Profile);
  const TutorProfile = userStore((state) => state.TutorProfile);
  const updateProfile = userStore((state) => state.updateProfile);
  const updateTutor = userStore((state) => state.updateTutor);
  const updateFormHanlder = (values) => {
    updateProfile(values);
  };
  const updateTutorFormHandler = (values) => {
    updateTutor(values);
  };
  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       const [profileResponse, tutorResponse] = await Promise.all([
  //         axios.get(`http://localhost:3001/profile/${getUserid}`),
  //         axios.get(`http://localhost:3001/tutor/${getUserid}`),
  //       ]);
  //       setProfile(profileResponse.data.result);
  //       setTutor(tutorResponse.data.result);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching user profile:", error);
  //       setLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <>
      {/* {loading && <p>Loading...</p>} */}
      <Form
        data={Profile}
        tutorData={TutorProfile}
        updateForm={updateFormHanlder}
        updateTutorForm={updateTutorFormHandler}
      />
      {/* {!loading && <ProfileForm profile={profile} tutor={tutor} />}
       */}
    </>
  );
};

export default UserProfile;

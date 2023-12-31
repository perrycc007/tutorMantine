// import ProfileForm from "../../components/Form/ProfileForm";
import { useEffect, useState } from "react";
import userStore from "../../stores/stores";
import { stripFormEventProperties } from "../../component/Helper/HelperFunction";
import Form from "../../component/Form/Form";
import {
  TextInput,
  TextInputProps,
  ActionIcon,
  useMantineTheme,
  rem,
} from "@mantine/core";
import { IconSearch, IconArrowRight } from "@tabler/icons-react";

import {
  fetchProfileData,
  updateProfileAdminAxios,
  updateTutorAdminAxios,
} from "../../component/Helper/AxiosFunction";
const AdminUserProfile = () => {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(1);
  const [currentUserId, setCurrentUserId] = useState(1);
  const Profile = userStore((state) => state.Profile);
  const TutorProfile = userStore((state) => state.TutorProfile);
  const updateProfile = userStore((state) => state.updateProfile);
  const updateTutor = userStore((state) => state.updateTutor);
  const updateFormHanlder = (values) => {
    const cleanedValues = stripFormEventProperties(values);
    updateProfile(cleanedValues);
    updateProfileAdminAxios(currentUserId, cleanedValues).catch((error) => {
      alert(`Failed to update profile: ${error.message}`);
    });
  };

  const updateTutorFormHandler = (values) => {
    const cleanedValues = stripFormEventProperties(values);
    updateTutor(cleanedValues);
    updateTutorAdminAxios(currentUserId, cleanedValues).catch((error) => {
      alert(`Failed to update tutor profile: ${error.message}`);
    });
  };

  const getUserIdhandler = (id) => {
    setUserId(id);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const [profileResponse, tutorResponse] = await fetchProfileData(userId);
      updateProfile(profileResponse);
      updateTutor(tutorResponse);
      setCurrentUserId(userId);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
    setLoading(false);
  };
  return (
    <>
      {/* {loading && <p>Loading...</p>} */}

      <TextInput
        radius="xl"
        size="md"
        placeholder="Search questions"
        rightSectionWidth={42}
        onChange={(event) => {
          getUserIdhandler(event.target.value);
        }}
        leftSection={
          <IconSearch
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        }
        rightSection={
          <ActionIcon
            onClick={fetchData}
            size={32}
            radius="xl"
            color={theme.primaryColor}
            variant="filled"
          >
            <IconArrowRight
              style={{ width: rem(18), height: rem(18) }}
              stroke={1.5}
            />
          </ActionIcon>
        }
      />

      <Form
        data={Profile}
        tutorData={TutorProfile}
        updateForm={updateFormHanlder}
        updateTutorForm={updateTutorFormHandler}
        type={isTutor}
      />
      {/* {!loading && <ProfileForm profile={profile} tutor={tutor} />}
       */}
    </>
  );
};

export default AdminUserProfile;

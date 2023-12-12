import Axios from "Axios";
import { stringify, parse } from "flatted";
import userStore from "../../stores/stores";
import cookie from "js-cookie";
import exp from "constants";

const url = "http://localhost:3001";
const axiosInstance = (accesstoken) => {
  return Axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${accesstoken}`,
      "Content-Type": "application/json",
    },
  });
};

// ... [previous imports and setup code]

// Helper function for retry mechanism
async function axiosRetry(axiosFunc, maxAttempts = 3) {
  let attempts = 0;
  while (attempts < maxAttempts) {
    try {
      return await axiosFunc();
    } catch (error) {
      if (attempts === maxAttempts - 1) {
        throw error;
      }
      attempts++;
    }
  }
}

// Wrap each Axios request with the retry mechanism

export async function toggleCheck(idmatch, checkStatus) {
  try {
    const axiosFunc = () =>
      axiosInstance(cookie.get("access_token")).patch(
        url + "/admin/toggleCheck",
        { idmatch, checkStatus }
      );
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in toggleCheck:", error);
    throw error;
  }
}

// Repeat similar wrapping for other functions

export async function toggleAvail(idmatch, availability) {
  try {
    const axiosFunc = () =>
      axiosInstance(cookie.get("access_token")).patch(
        url + "/admin/toggleAvail",
        { idmatch, availability }
      );
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in toggleAvail:", error);
    throw error;
  }
}

export async function toggleAdminStatus(id, status, type) {
  try {
    const axiosFunc = () => {
      if (type == "cases") {
        return axiosInstance(cookie.get("access_token")).patch(
          url + `/admin/updateCaseStatus`,
          { studentId: id, status: status }
        );
      } else {
        return axiosInstance(cookie.get("access_token")).patch(
          url + `/admin/updateTutorStatus`,
          { tutorId: id, status: status }
        );
      }
    };
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in toggleAdminStatus:", error);
    throw error;
  }
}

export async function toggleVerify(id, verify) {
  try {
    const axiosFunc = () =>
      axiosInstance(cookie.get("access_token")).patch(
        url + `/admin/updateTutorVerify`,
        { tutorId: id, verify: verify }
      );
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in toggleVerify:", error);
    throw error;
  }
}

export async function updateTutorAdminAxios(getuserId, values) {
  try {
    const axiosFunc = () => {
      const safeValues = parse(stringify(values));
      const information = { userId: getuserId, ...safeValues };
      return axiosInstance(cookie.get("access_token")).patch(
        `/admin/updateTutor`,
        { information }
      );
    };
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in updateTutorAdminAxios:", error);
    throw error;
  }
}

export async function updateStudentAdminAxios(getuserId, values) {
  try {
    const axiosFunc = () => {
      const safeValues = parse(stringify(values));
      const information = { userId: getuserId, ...safeValues };
      return axiosInstance(cookie.get("access_token")).patch(
        `/admin/updateStudent`,
        { userId: getuserId, ...information }
      );
    };
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in updateStudentAdminAxios:", error);
    throw error;
  }
}

export async function updateProfileAdminAxios(getuserId, values) {
  try {
    const axiosFunc = () => {
      const safeValues = parse(stringify(values));
      const information = { userId: getuserId, ...safeValues };
      return axiosInstance(cookie.get("access_token")).patch(
        `http://localhost:3001/admin/profile`,
        information
      );
    };
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in updateProfileAdminAxios:", error);
    throw error;
  }
}

export async function getMatchResultBystudentIdAxios(enteredstudentId, page) {
  try {
    const axiosFunc = () =>
      axiosInstance(cookie.get("access_token")).get(
        `http://localhost:3001/result/studentId/${enteredstudentId}?page=${page}`
      );
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in getMatchResultBystudentIdAxios:", error);
    throw error;
  }
}

export async function getMatchResultBytutorIdAxios(enteredtutorId, page) {
  try {
    const axiosFunc = () =>
      axiosInstance(cookie.get("access_token")).get(
        `http://localhost:3001/result/studentId/${enteredtutorId}?page=${page}`
      );
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in getMatchResultBytutorIdAxios:", error);
    throw error;
  }
}

export async function getStudentList() {
  try {
    const axiosFunc = () =>
      axiosInstance(cookie.get("access_token")).get(
        `http://localhost:3001/result/studentIdSorted`
      );
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in getStudentList:", error);
    throw error;
  }
}

export async function getTutorList() {
  try {
    const axiosFunc = () =>
      axiosInstance(cookie.get("access_token")).get(
        `http://localhost:3001/result/tutorIdSorted`
      );
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in getTutorList:", error);
    throw error;
  }
}

export async function getTutor(enteredtutorId) {
  try {
    const axiosFunc = () =>
      axiosInstance(cookie.get("access_token")).get(
        `http://localhost:3001/tutor/${enteredtutorId}`
      );
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in getTutor:", error);
    throw error;
  }
}

export async function TutorGetAxios() {
  try {
    const axiosFunc = () =>
      axiosInstance(cookie.get("access_token")).get(
        `http://localhost:3001/tutors`
      );
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in TutorGetAxios:", error);
    throw error;
  }
}

export async function TutorGetWithFavouriteAxios() {
  try {
    const axiosFunc = () =>
      axiosInstance(cookie.get("access_token")).get(
        `http://localhost:3001/tutors/withFavourite`
      );
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in TutorGetWithFavouriteAxios:", error);
    throw error;
  }
}

export async function tutorFilterAxios(preference) {
  try {
    const axiosFunc = () =>
      axiosInstance(cookie.get("access_token")).post(
        `http://localhost:3001/tutors/filter`,
        { preference }
      );
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in tutorFilterAxios:", error);
    throw error;
  }
}

export async function tutorFilterWithFavouriteAxios(preference) {
  try {
    const axiosFunc = () =>
      axiosInstance(cookie.get("access_token")).post(
        `http://localhost:3001/tutors/filterWithFavourite`,
        { preference }
      );
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in tutorFilterWithFavouriteAxios:", error);
    throw error;
  }
}

export async function updateTutorAxios(getuserId, values) {
  try {
    const axiosFunc = () => {
      const safeValues = parse(stringify(values));
      const information = { userId: getuserId, ...safeValues };
      return axiosInstance(cookie.get("access_token")).patch(`/tutors`, {
        information,
      });
    };
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in updateTutorAxios:", error);
    throw error;
  }
}

export async function updateStudentAxios(getuserId, values) {
  try {
    const axiosFunc = () => {
      const safeValues = parse(stringify(values));
      const information = { userId: getuserId, ...safeValues };
      return axiosInstance(cookie.get("access_token")).patch(`/students`, {
        userId: getuserId,
        ...information,
      });
    };
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in updateStudentAxios:", error);
    throw error;
  }
}

export async function createStudentAxios(getuserId, values) {
  try {
    const axiosFunc = () => {
      const safeValues = parse(stringify(values));
      const information = { userId: getuserId, ...safeValues };
      return axiosInstance(cookie.get("access_token")).post(`/students`, {
        userId: getuserId,
        ...information,
      });
    };
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in createStudentAxios:", error);
    throw error;
  }
}

export async function fetchProfileData(getuserId) {
  try {
    const axiosFunc = () =>
      Promise.all([
        axiosInstance(cookie.get("access_token")).get(`/profile/${getuserId}`),
        axiosInstance(cookie.get("access_token")).get(`/tutors/${getuserId}`),
      ]);
    const [profileResponse, tutorResponse] = await axiosRetry(axiosFunc);
    return [profileResponse.data, tutorResponse.data];
  } catch (error) {
    console.error("Error in fetchProfileData:", error);
    throw error;
  }
}

export async function updateProfileAxios(getuserId, values) {
  try {
    const axiosFunc = () => {
      const safeValues = parse(stringify(values));
      const information = { userId: getuserId, ...safeValues };
      return axiosInstance(cookie.get("access_token")).patch(
        `http://localhost:3001/profile`,
        information
      );
    };
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in updateProfileAxios:", error);
    throw error;
  }
}

export async function fetchHistory(getuserId) {
  try {
    const axiosFunc = () =>
      axiosInstance(cookie.get("access_token")).get(
        `http://localhost:3001/history/${getuserId}`
      );
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in fetchHistory:", error);
    throw error;
  }
}

export async function CaseGetAxios() {
  try {
    const axiosFunc = () =>
      axiosInstance(cookie.get("access_token")).get(
        `http://localhost:3001/students`
      );
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in CaseGetAxios:", error);
    throw error;
  }
}

export async function caseFilterAxios(preference) {
  try {
    const axiosFunc = () =>
      axiosInstance(cookie.get("access_token")).post(
        `http://localhost:3001/students/filter`,
        { preference }
      );
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in caseFilterAxios:", error);
    throw error;
  }
}

export async function CaseGetAxiosWithFavourite() {
  try {
    const axiosFunc = () =>
      axiosInstance(cookie.get("access_token")).get(
        `http://localhost:3001/students/withFavourite`
      );
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in CaseGetAxiosWithFavourite:", error);
    throw error;
  }
}

export async function caseFilterAxiosWithFavourite(preference) {
  try {
    const axiosFunc = () =>
      axiosInstance(cookie.get("access_token")).post(
        `http://localhost:3001/students/filterWithFavourite`,
        { preference }
      );
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in caseFilterAxiosWithFavourite:", error);
    throw error;
  }
}

export async function removeFavouriteTutorAxios(userId, tutorId) {
  try {
    const axiosFunc = () =>
      axiosInstance(cookie.get("access_token")).delete(
        `http://localhost:3001/favourite/removeTutor`,
        { data: { userId, tutorId } }
      );
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in removeFavouriteTutorAxios:", error);
    throw error;
  }
}

export async function removeFavouriteStudentAxios(userId, studentId) {
  try {
    const axiosFunc = () =>
      axiosInstance(cookie.get("access_token")).delete(
        `http://localhost:3001/favourite/removeStudent`,
        { data: { userId, studentId } }
      );
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in removeFavouriteStudentAxios:", error);
    throw error;
  }
}

export async function addFavouriteTutorAxios(userId, tutorId) {
  try {
    const axiosFunc = () =>
      axiosInstance(cookie.get("access_token")).post(
        `http://localhost:3001/favourite/addTutor`,
        { userId, tutorId }
      );
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in addFavouriteTutorAxios:", error);
    throw error;
  }
}

export async function addFavouriteStudentAxios(userId, studentId) {
  try {
    const axiosFunc = () =>
      axiosInstance(cookie.get("access_token")).post(
        `http://localhost:3001/favourite/addStudent`,
        { userId, studentId }
      );
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in addFavouriteStudentAxios:", error);
    throw error;
  }
}

export async function getFavouriteStudentListAxios(getuserId) {
  try {
    const axiosFunc = () =>
      axiosInstance(cookie.get("access_token")).get(
        `http://localhost:3001/favourite/students/${getuserId}`
      );
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in getFavouriteStudentListAxios:", error);
    throw error;
  }
}

export async function getFavouriteTutorListAxios(getuserId) {
  try {
    const axiosFunc = () =>
      axiosInstance(cookie.get("access_token")).get(
        `http://localhost:3001/favourite/tutors/${getuserId}`
      );
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in getFavouriteTutorListAxios:", error);
    throw error;
  }
}

// ... [previous code]

export async function resetPasswordLinkAxios(enteredEmail) {
  try {
    const axiosFunc = () =>
      Axios.post("http://localhost:3001/forgetPassword", {
        email: enteredEmail,
      });
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in resetPasswordLinkAxios:", error);
    throw error;
  }
}

export async function ResetPasswordAxios(userId, token, enteredPassword) {
  try {
    const axiosFunc = () =>
      Axios.post(`http://localhost:3001/forgetPassword/${userId}/${token}`, {
        password: enteredPassword,
      });
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in ResetPasswordAxios:", error);
    throw error;
  }
}

export async function logIn(isLogin, enteredEmail, enteredPassword) {
  try {
    let url =
      "http://localhost:3001" + (isLogin ? "/auth/login" : "/auth/signup");
    const axiosFunc = () =>
      Axios.post(url, {
        email: enteredEmail,
        password: enteredPassword,
      });
    const res = await axiosRetry(axiosFunc);
    console.log(res);
    return res;
  } catch (error) {
    console.error("Error in logIn:", error);
    throw error;
  }
}

export async function VerifyResetPasswordAxios(userId, token) {
  try {
    const axiosFunc = () =>
      Axios.get(`http://localhost:3001/forgetPassword/${userId}/${token}`);
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in VerifyResetPasswordAxios:", error);
    throw error;
  }
}

export async function checkAdminAxios() {
  try {
    const axiosFunc = () =>
      axiosInstance(cookie.get("access_token")).get(
        `http://localhost:3001/admin`
      );
    return await axiosRetry(axiosFunc);
  } catch (error) {
    console.error("Error in checkAdminAxios:", error);
    throw error;
  }
}

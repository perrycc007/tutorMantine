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
// AdminDisplay

export async function toggleCheck(idmatch, checkStatus) {
  console.log(idmatch, checkStatus);
  const res = await axiosInstance(cookie.get("access_token")).patch(
    url + "/admin/toggleCheck",
    {
      idmatch: idmatch,
      checkStatus: checkStatus,
    }
  );
  // console.log(res.data.result);
  return res;
}
export async function toggleAvail(idmatch, availability) {
  cookie.get("access_token");
  const res = await axiosInstance(cookie.get("access_token")).patch(
    url + "/admin/toggleAvail",
    {
      idmatch: idmatch,
      availability: availability,
    }
  );
  // console.log(res.data.result);
  return res;
}

export async function toggleAdminStatus(id, status, type) {
  cookie.get("access_token");
  if (type == "cases") {
    const response = await axiosInstance(cookie.get("access_token")).patch(
      url + `/admin/updateCaseStatus`,
      {
        studentId: id,
        status: status,
      }
    );
    return response;
  } else {
    const response = await axiosInstance(cookie.get("access_token")).patch(
      url + `/admin/updateTutorStatus`,
      {
        tutorId: id,
        status: status,
      }
    );
    return response;
  }
}
export async function toggleVerify(id, verify) {
  console.log(id, verify);
  cookie.get("access_token");
  const response = await axiosInstance(cookie.get("access_token")).patch(
    url + `/admin/updateTutorVerify`,
    {
      tutorId: id,
      verify: verify,
    }
  );
  return response;
}

// updateTutor

export async function updateTutorAdminAxios(getuserId, values) {
  const safeValues = parse(stringify(values));
  const information = { userId: getuserId, ...safeValues };
  const response = await axiosInstance(cookie.get("access_token")).patch(
    `/admin/updateTutor`,
    {
      information,
    }
  );
  return response;
}
// update student
export async function updateStudentAdminAxios(getuserId, values) {
  const safeValues = parse(stringify(values));
  const information = { userId: getuserId, ...safeValues };
  const response = await axiosInstance(cookie.get("access_token")).patch(
    `/admin/updateStudent`,
    {
      userId: getuserId,
      ...information,
    }
  );
  return response;
}
// admin update user profile
export async function updateProfileAdminAxios(getuserId, values) {
  const safeValues = parse(stringify(values));
  const information = { userId: getuserId, ...safeValues };
  const response = await axiosInstance(cookie.get("access_token")).patch(
    `http://localhost:3001/admin/profile`,
    // `http://localhost:3001/profile/${getuserId}`,
    information
  );
  return response;
}

// AdminResult

// export async function getMatchResultAxios(page) {
//   cookie.get("access_token");
//   const response = await axiosInstance(cookie.get("access_token")).get(
//     `http://localhost:3001/result/${page}`
//   );
//   return response;
// }
export async function getMatchResultBystudentIdAxios(enteredstudentId, page) {
  console.log(page);
  const response = await axiosInstance(cookie.get("access_token")).get(
    `http://localhost:3001/result/studentId/${enteredstudentId}?page=${page}`
  );
  return response;
}

export async function getMatchResultBytutorIdAxios(enteredtutorId, page) {
  const response = await axiosInstance(cookie.get("access_token")).get(
    `http://localhost:3001/result/studentId/${enteredtutorId}?page=${page}`
  );
  return response;
}

export async function getStudentList() {
  const response = await axiosInstance(cookie.get("access_token")).get(
    `http://localhost:3001/result/studentIdSorted`
  );
  return response;
}
export async function getTutorList() {
  const response = await axiosInstance(cookie.get("access_token")).get(
    `http://localhost:3001/result/tutorIdSorted`
  );
  return response;
}

export async function getTutor(enteredtutorId) {
  cookie.get("access_token");
  const response = await Axios.get(
    `http://localhost:3001/tutor/${enteredtutorId}`
  );
  return response;
}

// Tutor
export async function TutorGetAxios() {
  const response = await Axios.get(`http://localhost:3001/tutors`);
  console.log(response.data.result);
  return response;
}
export async function TutorGetWithFavouriteAxios() {
  const response = await axiosInstance(cookie.get("access_token")).get(
    `http://localhost:3001/tutors/withFavourite`
  );
  console.log(response.data.result);
  return response;
}

// export async function CaseGetAxios() {
//   const response = await Axios.get(`http://localhost:3001/students`);
//   console.log(response.data.result);
//   return response;
// }

export async function tutorFilterAxios(preference) {
  const response = await Axios.post(`http://localhost:3001/tutors/filter`, {
    preference,
  });
  return response;
}

export async function tutorFilterWithFavouriteAxios(preference) {
  const response = await axiosInstance(cookie.get("access_token")).post(
    `http://localhost:3001/tutors/filter`,
    {
      preference,
    }
  );
  return response;
}

export async function updateTutorAxios(getuserId, values) {
  const safeValues = parse(stringify(values));
  const information = { userId: getuserId, ...safeValues };
  const response = await axiosInstance(cookie.get("access_token")).patch(
    `/tutors`,
    {
      information,
    }
  );
  return response;
}

// Student
export async function updateStudentAxios(getuserId, values) {
  const safeValues = parse(stringify(values));
  const information = { userId: getuserId, ...safeValues };
  const response = await axiosInstance(cookie.get("access_token")).patch(
    `/students`,
    {
      userId: getuserId,
      ...information,
    }
  );
  return response;
}

export async function createStudentAxios(getuserId, values) {
  const safeValues = parse(stringify(values));
  const information = { userId: getuserId, ...safeValues };
  const response = await axiosInstance(cookie.get("access_token")).post(
    `/students`,
    { userId: getuserId, ...information }
  );
  return response;
}

// Profile
export async function fetchProfileData(getuserId) {
  const [profileResponse, tutorResponse] = await Promise.all([
    axiosInstance(cookie.get("access_token")).get(`/profile/${getuserId}`),
    axiosInstance(cookie.get("access_token")).get(`/tutors/${getuserId}`),
  ]);
  return [profileResponse.data, tutorResponse.data];
}

export async function updateProfileAxios(getuserId, values) {
  const safeValues = parse(stringify(values));
  const information = { userId: getuserId, ...safeValues };
  console.log(information);
  const response = await axiosInstance(cookie.get("access_token")).patch(
    `http://localhost:3001/profile`,
    // `http://localhost:3001/profile/${getuserId}`,
    information
  );
  return response;
}

// history
export async function fetchHistory(getuserId) {
  const response = await axiosInstance(cookie.get("access_token")).get(
    `http://localhost:3001/history/${getuserId}`
  );
  return response;
}
// case

export async function CaseGetAxios() {
  const response = await Axios.get(`http://localhost:3001/students`);
  console.log(response.data.result);
  return response;
}

export async function caseFilterAxios(preference) {
  const response = await Axios.post(`http://localhost:3001/students/filter`, {
    preference,
  });
  return response;
}

export async function CaseGetAxiosWithFavourite() {
  const response = await axiosInstance(cookie.get("access_token")).get(
    `http://localhost:3001/students/withFavourite`
  );
  console.log(response.data.result);
  return response;
}

export async function caseFilterAxiosWithFavourite(preference) {
  const response = await axiosInstance(cookie.get("access_token")).post(
    `http://localhost:3001/students/filterWithFavourite`,
    {
      preference,
    }
  );
  return response;
}

// Favourite
// remove favourite tutor
export async function removeFavouriteTutorAxios(userId, tutorId) {
  const response = await axiosInstance(cookie.get("access_token")).delete(
    `http://localhost:3001/favourite/removeTutor`,
    {
      userId: userId,
      tutorId: tutorId,
    }
  );
  return response;
}

// remove favourite case
export async function removeFavouriteStudentAxios(userId, studentId) {
  console.log(userId, studentId);
  const response = await axiosInstance(cookie.get("access_token")).delete(
    `http://localhost:3001/favourite/removeStudent`,
    {
      userId: userId,
      studentId: studentId,
    }
  );
  return response;
}

// add favourite tutor
export async function addFavouriteTutorAxios(userId, tutorId) {
  const response = await axiosInstance(cookie.get("access_token")).post(
    `http://localhost:3001/favourite/addTutor`,
    {
      userId: userId,
      tutorId: tutorId,
    }
  );
  return response;
}
// add favourite case
export async function addFavouriteStudentAxios(userId, studentId) {
  console.log(userId, studentId);
  const response = await axiosInstance(cookie.get("access_token")).post(
    `http://localhost:3001/favourite/addStudent`,
    {
      userId: userId,
      studentId: studentId,
    }
  );
  return response;
}
// get student favourite list
export async function getFavouriteStudentListAxios(getuserId) {
  const response = await axiosInstance(cookie.get("access_token")).get(
    `http://localhost:3001/favourite/students/${getuserId}`
  );
  return response;
}

// get tutor favourite list
export async function getFavouriteTutorListAxios(getuserId) {
  const response = await axiosInstance(cookie.get("access_token")).get(
    `http://localhost:3001/favourite/tutors/${getuserId}`
  );
  return response;
}

// ForgetPassword
export async function resetPasswordLinkAxios(enteredEmail) {
  const res = await Axios.post("http://localhost:3001/forgetPassword", {
    email: enteredEmail,
  });
  return res;
}

// ResetPassword
export async function ResetPasswordAxios(userId, token, enteredPassword) {
  const res = await Axios.post(
    `http://localhost:3001/forgetPassword/${userId}/${token}`,
    {
      password: enteredPassword,
    }
  );
  return res;
}

export async function logIn(isLogin, enteredEmail, enteredPassword) {
  let url = "http://localhost:3001";
  if (isLogin) {
    url = url + "/auth/login";
    console.log(url);
  } else {
    url = url + "/auth/signup";
  }
  const res = await Axios.post(url, {
    email: enteredEmail,
    password: enteredPassword,
  });
  console.log(res);
  return res;
}

// resetPassword
export async function VerifyResetPasswordAxios(userId, token) {
  const res = await Axios.get(
    `http://localhost:3001/forgetPassword/${userId}/${token}`
  );
  return res;
}

// adminGuard
export async function checkAdminAxios() {
  const response = await axiosInstance(cookie.get("access_token")).get(
    `http://localhost:3001/admin`
  );
  return response;
}

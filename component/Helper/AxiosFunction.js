import Axios from "Axios";
import { stringify, parse } from "flatted";
import userStore from "../../stores/stores";
import cookie from "js-cookie";

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
        studentid: id,
        status: status,
      }
    );
    return response;
  } else {
    const response = await axiosInstance(cookie.get("access_token")).patch(
      url + `/admin/updateTutorStatus`,
      {
        tutorid: id,
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
      tutorid: id,
      verify: verify,
    }
  );
  return response;
}

// updateTutor

export async function updateTutorAdminAxios(getUserid, values) {
  const safeValues = parse(stringify(values));
  const information = { userid: getUserid, ...safeValues };
  const response = await axiosInstance(cookie.get("access_token")).patch(
    `/admin/updateTutor`,
    {
      information,
    }
  );
  return response;
}
// update student
export async function updateStudentAdminAxios(getUserid, values) {
  const safeValues = parse(stringify(values));
  const information = { userid: getUserid, ...safeValues };
  const response = await axiosInstance(cookie.get("access_token")).patch(
    `/admin/updateStudent`,
    {
      userid: getUserid,
      ...information,
    }
  );
  return response;
}
// admin update user profile
export async function updateProfileAdminAxios(getUserid, values) {
  const safeValues = parse(stringify(values));
  const information = { userid: getUserid, ...safeValues };
  const response = await axiosInstance(cookie.get("access_token")).patch(
    `http://localhost:3001/profile`,
    // `http://localhost:3001/profile/${getUserid}`,
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
export async function getMatchResultByStudentIdAxios(enteredStudentId, page) {
  console.log(page);
  const response = await axiosInstance(cookie.get("access_token")).get(
    `http://localhost:3001/result/studentid/${enteredStudentId}?page=${page}`
  );
  return response;
}

export async function getMatchResultByTutorIdAxios(enteredTutorId, page) {
  const response = await axiosInstance(cookie.get("access_token")).get(
    `http://localhost:3001/result/studentid/${enteredTutorId}?page=${page}`
  );
  return response;
}

export async function getStudentList() {
  const response = await axiosInstance(cookie.get("access_token")).get(
    `http://localhost:3001/result/studentidSorted`
  );
  return response;
}
export async function getTutorList() {
  const response = await axiosInstance(cookie.get("access_token")).get(
    `http://localhost:3001/result/tutoridSorted`
  );
  return response;
}

export async function getTutor(enteredTutorId) {
  cookie.get("access_token");
  const response = await Axios.get(
    `http://localhost:3001/tutor/${enteredTutorId}`
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

export async function updateTutorAxios(getUserid, values) {
  const safeValues = parse(stringify(values));
  const information = { userid: getUserid, ...safeValues };
  const response = await axiosInstance(cookie.get("access_token")).patch(
    `/tutors`,
    {
      information,
    }
  );
  return response;
}

// Student
export async function updateStudentAxios(getUserid, values) {
  const safeValues = parse(stringify(values));
  const information = { userid: getUserid, ...safeValues };
  const response = await axiosInstance(cookie.get("access_token")).patch(
    `/students`,
    {
      userid: getUserid,
      ...information,
    }
  );
  return response;
}

export async function createStudentAxios(getUserid, values) {
  const safeValues = parse(stringify(values));
  const information = { userid: getUserid, ...safeValues };
  const response = await axiosInstance(cookie.get("access_token")).post(
    `/students`,
    { userid: getUserid, ...information }
  );
  return response;
}

// Profile
export async function fetchProfileData(getUserid) {
  const [profileResponse, tutorResponse] = await Promise.all([
    axiosInstance(cookie.get("access_token")).get(`/profile/${getUserid}`),
    axiosInstance(cookie.get("access_token")).get(`/tutors/${getUserid}`),
  ]);
  console.log(tutorResponse.data);
  return [profileResponse.data, tutorResponse.data];
}

export async function updateProfileAxios(getUserid, values) {
  const safeValues = parse(stringify(values));
  const information = { userid: getUserid, ...safeValues };
  const response = await axiosInstance(cookie.get("access_token")).patch(
    `http://localhost:3001/profile`,
    // `http://localhost:3001/profile/${getUserid}`,
    information
  );
  return response;
}

// history
export async function fetchHistory(getUserid) {
  const response = await axiosInstance(cookie.get("access_token")).get(
    `http://localhost:3001/history/${getUserid}`
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
export async function removeFavouriteTutorAxios(userid, tutorid) {
  const response = await axiosInstance(cookie.get("access_token")).delete(
    `http://localhost:3001/favourite/removeTutor`,
    {
      userid: userid,
      tutorid: tutorid,
    }
  );
  return response;
}

// remove favourite case
export async function removeFavouriteCaseAxios(userid, studentid) {
  console.log(userid, studentid);
  const response = await axiosInstance(cookie.get("access_token")).delete(
    `http://localhost:3001/favourite/removeStudent`,
    {
      userid: userid,
      studentid: studentid,
    }
  );
  return response;
}

// add favourite tutor
export async function addFavouriteTutorAxios(userid, tutorid) {
  const response = await axiosInstance(cookie.get("access_token")).post(
    `http://localhost:3001/favourite/addTutor`,
    {
      userid: userid,
      tutorid: tutorid,
    }
  );
  return response;
}
// add favourite case
export async function addFavouriteCaseAxios(userid, studentid) {
  console.log(userid, studentid);
  const response = await axiosInstance(cookie.get("access_token")).post(
    `http://localhost:3001/favourite/addStudent`,
    {
      userid: userid,
      studentid: studentid,
    }
  );
  return response;
}

// Store
export async function fetchFavouriteTutor(getUserid) {
  return await axiosInstance(cookie.get("access_token")).get(
    `http://localhost:3001/favourite/tutors/${getUserid}`
  );
}
export async function fetchFavouriteCases(getUserid) {
  return await axiosInstance(cookie.get("access_token")).get(
    `http://localhost:3001/favourite/cases/${getUserid}`
  );
}

// Favourite
export async function getFavouriteTutorListAxios(getUserid) {
  const response = await axiosInstance(cookie.get("access_token")).post(
    `http://localhost:3001/tutor/getFavouriteCase/${getUserid}`
  );
  return response;
}

export async function getFavouriteStudentListAxios(getUserid) {
  const response = await axiosInstance(cookie.get("access_token")).post(
    `http://localhost:3001/students/getFavouriteCase/${getUserid}`
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
export async function ResetPasswordAxios(userid, token, enteredPassword) {
  const res = await Axios.post(
    `http://localhost:3001/forgetPassword/${userid}/${token}`,
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
export async function VerifyResetPasswordAxios(userid, token) {
  const res = await Axios.get(
    `http://localhost:3001/forgetPassword/${userid}/${token}`
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

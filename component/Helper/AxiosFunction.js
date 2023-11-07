import Axios from "Axios";
import { stringify, parse } from "flatted";

const url = "http://localhost:3001";

// AdminDisplay

export async function toggleCheck(idmatch, checkStatus) {
  const res = await Axios.patch(url + "/admin/toggleCheck", {
    idmatch: idmatch,
    checkStatus: checkStatus,
  });
  // console.log(res.data.result);
  return res;
}
export async function toggleAvail(idmatch, availability) {
  const res = await Axios.patch(url + "/admin/toggleAvail", {
    idmatch: idmatch,
    availability: availability,
  });
  // console.log(res.data.result);
  return res;
}

export async function toggleStatus(id, status, type) {
  if (type == "cases") {
    const response = await Axios.patch(url + `/history/updateCaseStatus`, {
      studentid: id,
      status: status,
    });
    response.data.result;
  } else {
    const response = await Axios.patch(url + `/history/updateTutorStatus`, {
      tutorid: id,
      status: status,
    });
    response.data.result;
  }
  return response.data.result;
}
export async function toggleVerify(id, verify) {
  const response = await Axios.patch(url + `/admin/updateTutorVerify`, {
    tutorid: id,
    verify: verify,
  });
  return response.data.result;
}
// AdminResult
export async function getMatchResultAxios(page) {
  const response = await Axios.get(`http://localhost:3001/result/${page - 1}`);
  return response;
}
export async function getSingleMatchResultAxios(enteredStudentId) {
  const response = await Axios.get(
    `http://localhost:3001/result/studentid/${enteredStudentId}`
  );
  return response;
}

export async function getTutor(enteredTutorId) {
  const response = await Axios.get(
    `http://localhost:3001/tutor/${enteredTutorId}`
  );
  return response;
}

// Tutor
export async function TutorGetAxios() {
  const response = await Axios.get(`http://localhost:3001/tutor`);
  return response;
}

export async function tutorFilterAxios(preference) {
  const response = await Axios.post(`http://localhost:3001/tutor`, {
    preference,
  });
  return response;
}

export async function updateTutorAxios(getUserid, values) {
  const safeValues = parse(stringify(values));
  const information = { userid: getUserid, ...safeValues };
  const response = await Axios.patch(`http://localhost:3001/tutors`, {
    information,
  });
  return response;
}
// Profile
export async function fetchProfileData(getUserid) {
  const [profileResponse, tutorResponse] = await Promise.all([
    Axios.get(`http://localhost:3001/profile/${getUserid}`),
    Axios.get(`http://localhost:3001/tutors/${getUserid}`),
  ]);
  console.log(tutorResponse.data);
  return [profileResponse.data, tutorResponse.data];
}

export async function updateProfileAxios(getUserid, values) {
  const safeValues = parse(stringify(values));
  const information = { userid: getUserid, ...safeValues };
  const response = await Axios.patch(
    `http://localhost:3001/profile`,
    // `http://localhost:3001/profile/${getUserid}`,
    information
  );
  return response;
}

// history
export async function fetchHistory(getUserid) {
  const response = await Axios.get(
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
  const response = await Axios.post(`http://localhost:3001/students`, {
    preference,
  });
  return response;
}

export async function UpdateFavoriteCase(newFavourite, getUserid) {
  const response = await Axios.patch("http://localhost:3001/favourite/case", {
    caseid: newFavourite,
    userid: getUserid,
  });
  // console.log(res.data.result);
  return response;
}

export async function UpdateFavorite(newFavourite, getUserid) {
  const response = await Axios.patch("http://localhost:3001/favourite/tutor", {
    caseid: newFavourite,
    userid: getUserid,
  });
  // console.log(res.data.result);
  return response;
}

// Store
export async function fetchFavouriteTutor(getUserid) {
  return await Axios.get(`http://localhost:3001/favourite/tutors/${getUserid}`);
}
export async function fetchFavouriteCases(getUserid) {
  return await Axios.get(`http://localhost:3001/favourite/cases/${getUserid}`);
}

// Favourite
export async function getFavouriteTutorListAxios(getUserid) {
  const response = await Axios.post(
    `http://localhost:3001/tutor/getFavouriteCase/${getUserid}`
  );
  return response;
}

export async function getFavouriteStudentListAxios(getUserid) {
  const response = await Axios.post(
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

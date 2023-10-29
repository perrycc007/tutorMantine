const url = "http://localhost:3001/";

// AdminDisplay

export async function toggleCheck(idmatch, checked, checking) {
  const res = await Axios.patch(url + "/admin/toggleCheck", {
    idmatch: idmatch,
    checked: checked,
    checking: checking,
  });
  // console.log(res.data.result);
  return res;
}
export async function toggleAvail(idmatch, notavailtutor) {
  const res = await Axios.patch(url + "/admin/toggleAvail", {
    idmatch: idmatch,
    notavailtutor: notavailtutor,
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
export async function toggleVerify(id, verify, type) {
  const response = await Axios.patch(url + `/admin/updateTutorVerify`, {
    tutorid: id,
    verify: verify,
  });
  return response.data.result;
}
// AdminResult
export async function getMatchResultAxios(page) {
  const response = await axios.get(`http://localhost:3001/result/${page - 1}`);
  return response;
}
export async function getSingleMatchResultAxios(enteredStudentId) {
  const response = await axios.get(
    `http://localhost:3001/result/studentid/${enteredStudentId}`
  );
  return response;
}

export async function getTutor(enteredTutorId) {
  const response = await axios.get(
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
  const response = await axios.post(`http://localhost:3001/tutor`, {
    preference,
  });
  return response;
}

// Profile
export async function fetchProfileData(getUserid) {
  const [profileResponse, tutorResponse] = await Promise.all([
    axios.get(`http://localhost:3001/profile/${getUserid}`),
    axios.get(`http://localhost:3001/tutor/${getUserid}`),
  ]);
  return [profileResponse, tutorResponse];
}
// history
export async function fetchHistory(getUserid) {
  const response = await axios.get(
    `http://localhost:3001/history/${getUserid}`
  );
  return response;
}
// case

export async function CaseGetAxios() {
  const response = await axios.get(`http://localhost:3001/cases`);
  return response;
}

export async function caseFilterAxios(preference) {
  const response = await axios.post(`http://localhost:3001/cases`, {
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
  const response = await Axios.get(
    `http://localhost:3001/favourite/tutor/${getUserid}`
  );
}
export async function fetchFavouriteCase(getUserid) {
  const response = await Axios.get(
    `http://localhost:3001/favourite/case/${getUserid}`
  );
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
    `http://localhost:3001/cases/getFavouriteCase/${getUserid}`
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

export async function logIn(isLogin, url, enteredEmail, enteredPassword) {
  if (isLogin) {
    url = "http://localhost:3001/login";
  } else {
    url = "http://localhost:3001/register";
  }
  const res = await Axios.post(url, {
    email: enteredEmail,
    password: enteredPassword,
  });
  console.log(res.data.result);
  return res;
}

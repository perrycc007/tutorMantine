import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  fetchFavouriteCases,
  fetchFavouriteTutor,
} from "../component/Helper/AxiosFunction";
// Helper function to clear local storage
function clearLocalStorage() {
  localStorage.clear(); // Adjust this based on your client-side storage mechanism
}
const serialize = (obj) => {
  const seen = new WeakSet();
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) {
        return; // Avoid circular references
      }
      seen.add(value);
    }
    return value;
  });
};

// Helper function to set login time in local storage
function setLoginTime(time) {
  localStorage.setItem("loginTime", time); // Adjust this based on your client-side storage mechanism
}

// Helper function to get login time from local storage
function getLoginTime() {
  return;
  //  parseInt(localStorage.getItem("loginTime"));
  // Adjust this based on your client-side storage mechanism
}

// Define the store
let store = (set) => ({
  userId: null,
  isTutor: false,
  isLoggedin: false,
  favouriteTutor: [],
  favouriteCase: [],
  Profile: {
    findus: "",
    language: "",
    name: "sdosadad",
    nationality: "",
    phoneno: "",
    address: "",
    emergencycontact: "",
    emergencyrelationship: "",
    emergencyphone: "",
  },
  TutorProfile: {
    lowestpay: 100,
    highestpay: 200,
    yearofexperience: "",
    experience: "",
    highestteachinglevel: "",
    educationallevel: "",
    notes: "",
    schoolcat: "",
    year: "",
    strength: "",
    genderrequirement: "",
    expectation: "",
    agreewith: "",
    occupation: "",
    secondaryschool: "",
    primaryschool: "",
    publicexamgrade: "",
    university: "",
    major: "",
    othercert: "",
    others: "",
    intro: "",
    grade: [],
    location: [""],
    subject: [],
  },
  NewStudentApplication: {
    lowestpay: 100,
    highestpay: 200,
    yearofexperience: "",
    experience: "",
    highestteachinglevel: "",
    educationallevel: "",
    notes: "",
    schoolcat: "",
    year: "",
    strength: "",
    genderrequirement: "",
    expectation: "",
    agreewith: "",
    occupation: "",
    secondaryschool: "",
    primaryschool: "",
    publicexamgrade: "",
    university: "",
    major: "",
    othercert: "",
    others: "",
    location: [],
    subject: [],
  },
  updateProfile: (NewProfile) => {
    const updatedProfile = JSON.parse(serialize(NewProfile));
    set({ Profile: updatedProfile });
  },

  updateNewStudentApplication: (NewApplication) => {
    const updatedApplication = JSON.parse(serialize(NewApplication));
    set({ NewStudentApplication: updatedApplication });
  },
  updateTutor: (Tutor) => {
    const serializedTutor = serialize(Tutor);
    const updatedTutor = JSON.parse(serializedTutor);
    set({ TutorProfile: updatedTutor });
  },
  fetchFavouriteTutor: async (id) => {
    const res = await fetchFavouriteTutor(id);
    if (res.data != null) {
      set({ favouriteTutor: await res.data.favouritetutorid });
    }
  },
  fetchFavouriteCases: async (id) => {
    const res = await fetchFavouriteCases(id);
    if (res.data != null) {
      set({ favouriteCase: await res.data.favouritecaseid });
    }
  },
  addUserid: (userid) => set({ userId: userid }),
  loginUserid: () => {
    set({ isLoggedin: true });
    setLoginTime(Date.now());
  },
  logoutUserid: () => {
    set({ isLoggedin: false });
    clearLocalStorage();
    window.location.href = "/login";
  },
  cleanFavourite: () => set({ favourite: [] }),
  removeUserid: () => set({ userId: null }),
  setFavouriteTutor: (newFavourite) => set({ favouriteTutor: newFavourite }),
  setFavouriteCase: (newFavourite) => set({ favouriteCase: newFavourite }),
  toggleIstutor: (Mode) => set({ isTutor: Mode }),
  checkAutoLogout: () => {
    const loginTime = getLoginTime();
    const currentTime = Date.now();
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

    if (currentTime - loginTime > sevenDaysInMs) {
      store.logoutUserid();
    }
  },
});

store = persist(store, { name: "data" });
const userStore = create(devtools(store));

// Invoke checkAutoLogout periodically to check for automatic logout
setInterval(() => {
  userStore.getState().checkAutoLogout();
}, 1000 * 60 * 60); // Run every hour (adjust the interval as needed)

export default userStore;

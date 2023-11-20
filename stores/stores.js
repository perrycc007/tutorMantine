import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  fetchFavouriteCases,
  fetchFavouriteTutor,
} from "../component/Helper/AxiosFunction";
import cancelableookies from "js-cookie";
import Cookies from "js-cookie";
// Helper function to clear local storage
function clearLocalStorage() {
  localStorage.removeItem("data"); // Adjust this based on your client-side storage mechanism
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

// Helper function to get login time from local storage
function getLoginTime() {
  return;
  //  parseInt(localStorage.getItem("loginTime"));
  // Adjust this based on your client-side storage mechanism
}

// Define the store
let store = (set) => ({
  userId: "",
  isTutor: false,
  isLoggedin: false,
  favouriteTutor: [],
  favouriteCase: [],
  Profile: {
    findus: "",
    language: "",
    name: "",
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
    locations: [""],
    subjects: [],
    availtimes: [],
    grade: {
      HKCEE_ChineseLanguage: "",
      HKCEE_EnglishLanguage: "",
      HKCEE_Mathematics: "",
      HKCEE_ChineseLiterature: "",
      HKCEE_EnglishLiterature: "",
      HKCEE_ChineseHistory: "",
      HKCEE_WorldHistory: "",
      HKCEE_Geography: "",
      HKCEE_Music: "",
      HKCEE_AdditionalMathematics: "",
      HKCEE_Physics: "",
      HKCEE_Biology: "",
      HKCEE_Chemistry: "",
      HKCEE_BusinessStudies: "",
      HKCEE_PrinciplesofAccounts: "",
      HKCEE_Economics: "",
      HKCEE_ComputerStudies: "",
      HKALE_ChineseLanguage: "",
      HKALE_EnglishLanguage: "",
      HKALE_Mathematics: "",
      HKALE_ChineseLiterature: "",
      HKALE_EnglishLiterature: "",
      HKALE_ChineseHistory: "",
      HKALE_WorldHistory: "",
      HKALE_Geography: "",
      HKALE_Music: "",
      HKALE_AdditionalMathematics: "",
      HKALE_Physics: "",
      HKALE_Biology: "",
      HKALE_Chemistry: "",
      HKALE_BusinessStudies: "",
      HKALE_PrinciplesofAccounts: "",
      HKALE_Economics: "",
      HKALE_ComputerStudies: "",
      HKDSE_ChineseLanguage: "",
      HKDSE_EnglishLanguage: "",
      HKDSE_Mathematics: "",
      HKDSE_LiberalStudies: "",
      HKDSE_ChineseLiterature: "",
      HKDSE_EnglishLiterature: "",
      HKDSE_MathematicsM1: "",
      HKDSE_MathematicsM2: "",
      HKDSE_ChineseHistory: "",
      HKDSE_Economics: "",
      HKDSE_EthicsandReligiousStudies: "",
      HKDSE_Geography: "",
      HKDSE_History: "",
      HKDSE_TourismandHospitalityStudies: "",
      HKDSE_Biology: "",
      HKDSE_Chemistry: "",
      HKDSE_Physics: "",
      HKDSE_IntegratedScienceCombinedScience: "",
      HKDSE_IntegratedScienceIntegratedScience: "",
      HKDSE_InformationandCommunicationTechnology: "",
      HKDSE_TechnologyandLiving: "",
      HKDSE_DesignandAppliedTechnology: "",
      HKDSE_VisualArts: "",
      HKDSE_Music: "",
      HKDSE_PhysicalEducation: "",
      HKDSE_BusinessAccountingandFinancialStudies: "",
      HKDSE_HealthManagementandSocialCare: "",
      HKDSE_OtherLanguagesFrench: "",
      HKDSE_OtherLanguagesJapanese: "",
      HKDSE_OtherLanguagesGerman: "",
      HKDSE_OtherLanguagesSpanish: "",
      HKDSE_OtherLanguagesHindi: "",
      HKDSE_OtherLanguagesUrdu: "",
      IB_LanguagesEnglishLanguageLiteratureSLHL: "",
      IB_LanguagesEnglishLiteratureSLHL: "",
      IB_LanguagesChineseALanguageLiteratureSL: "",
      IB_LanguagesChineseALiteratureSL: "",
      IB_LanguagesChineseBSLHL: "",
      IB_MathematicsMathematics: "",
      IB_MathematicsMathematicsSL: "",
      IB_MathematicsMathematicsHL: "",
      IB_MathematicsFurtherMathematicsHL: "",
      IB_HumanitiesandSocialSciencesBusinessManagement: "",
      IB_HumanitiesandSocialSciencesEconomics: "",
      IB_HumanitiesandSocialSciencesGlobalPolitics: "",
      IB_HumanitiesandSocialSciencesHistory: "",
      IB_HumanitiesandSocialSciencesPhilosophy: "",
      IB_HumanitiesandSocialSciencesPsychology: "",
      IB_HumanitiesandSocialSciencesSocialandCulturalAnthropology: "",
      IB_HumanitiesandSocialSciencesWorldReligionsSL: "",
      IB_SciencesBiology: "",
      IB_SciencesChemistry: "",
      IB_SciencesPhysics: "",
    },
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
    locations: [],
    subjects: [],
    availtimes: [],
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
  },
  logoutUserid: () => {
    Cookies.remove("access_token");
    clearLocalStorage();
    set(initialState);
    window.location.href = "/auth";
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

const initialState = {
  userId: "",
  isTutor: false,
  isLoggedin: false,
  favouriteTutor: [],
  favouriteCase: [],
  accessToken: "",
  Profile: {
    findus: "",
    language: "",
    name: "",
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
    location: [""],
    subject: [],
    availtime: [],
    grade: {
      HKCEE_ChineseLanguage: "",
      HKCEE_EnglishLanguage: "",
      HKCEE_Mathematics: "",
      HKCEE_ChineseLiterature: "",
      HKCEE_EnglishLiterature: "",
      HKCEE_ChineseHistory: "",
      HKCEE_WorldHistory: "",
      HKCEE_Geography: "",
      HKCEE_Music: "",
      HKCEE_AdditionalMathematics: "",
      HKCEE_Physics: "",
      HKCEE_Biology: "",
      HKCEE_Chemistry: "",
      HKCEE_BusinessStudies: "",
      HKCEE_PrinciplesofAccounts: "",
      HKCEE_Economics: "",
      HKCEE_ComputerStudies: "",
      HKALE_ChineseLanguage: "",
      HKALE_EnglishLanguage: "",
      HKALE_Mathematics: "",
      HKALE_ChineseLiterature: "",
      HKALE_EnglishLiterature: "",
      HKALE_ChineseHistory: "",
      HKALE_WorldHistory: "",
      HKALE_Geography: "",
      HKALE_Music: "",
      HKALE_AdditionalMathematics: "",
      HKALE_Physics: "",
      HKALE_Biology: "",
      HKALE_Chemistry: "",
      HKALE_BusinessStudies: "",
      HKALE_PrinciplesofAccounts: "",
      HKALE_Economics: "",
      HKALE_ComputerStudies: "",
      HKDSE_ChineseLanguage: "",
      HKDSE_EnglishLanguage: "",
      HKDSE_Mathematics: "",
      HKDSE_LiberalStudies: "",
      HKDSE_ChineseLiterature: "",
      HKDSE_EnglishLiterature: "",
      HKDSE_MathematicsM1: "",
      HKDSE_MathematicsM2: "",
      HKDSE_ChineseHistory: "",
      HKDSE_Economics: "",
      HKDSE_EthicsandReligiousStudies: "",
      HKDSE_Geography: "",
      HKDSE_History: "",
      HKDSE_TourismandHospitalityStudies: "",
      HKDSE_Biology: "",
      HKDSE_Chemistry: "",
      HKDSE_Physics: "",
      HKDSE_IntegratedScienceCombinedScience: "",
      HKDSE_IntegratedScienceIntegratedScience: "",
      HKDSE_InformationandCommunicationTechnology: "",
      HKDSE_TechnologyandLiving: "",
      HKDSE_DesignandAppliedTechnology: "",
      HKDSE_VisualArts: "",
      HKDSE_Music: "",
      HKDSE_PhysicalEducation: "",
      HKDSE_BusinessAccountingandFinancialStudies: "",
      HKDSE_HealthManagementandSocialCare: "",
      HKDSE_OtherLanguagesFrench: "",
      HKDSE_OtherLanguagesJapanese: "",
      HKDSE_OtherLanguagesGerman: "",
      HKDSE_OtherLanguagesSpanish: "",
      HKDSE_OtherLanguagesHindi: "",
      HKDSE_OtherLanguagesUrdu: "",
      IB_LanguagesEnglishLanguageLiteratureSLHL: "",
      IB_LanguagesEnglishLiteratureSLHL: "",
      IB_LanguagesChineseALanguageLiteratureSL: "",
      IB_LanguagesChineseALiteratureSL: "",
      IB_LanguagesChineseBSLHL: "",
      IB_MathematicsMathematics: "",
      IB_MathematicsMathematicsSL: "",
      IB_MathematicsMathematicsHL: "",
      IB_MathematicsFurtherMathematicsHL: "",
      IB_HumanitiesandSocialSciencesBusinessManagement: "",
      IB_HumanitiesandSocialSciencesEconomics: "",
      IB_HumanitiesandSocialSciencesGlobalPolitics: "",
      IB_HumanitiesandSocialSciencesHistory: "",
      IB_HumanitiesandSocialSciencesPhilosophy: "",
      IB_HumanitiesandSocialSciencesPsychology: "",
      IB_HumanitiesandSocialSciencesSocialandCulturalAnthropology: "",
      IB_HumanitiesandSocialSciencesWorldReligionsSL: "",
      IB_SciencesBiology: "",
      IB_SciencesChemistry: "",
      IB_SciencesPhysics: "",
    },
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
    availtime: [],
  },
};

export default userStore;

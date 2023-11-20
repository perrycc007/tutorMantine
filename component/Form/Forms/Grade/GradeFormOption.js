const HKCEE = {
  主科: {
    HKCEE_ChineseLanguage: "中國語文",
    HKCEE_EnglishLanguage: "英國語文",
    HKCEE_Mathematics: "數學",
  },

  文科: {
    HKCEE_ChineseLiterature: "中國文學",
    HKCEE_EnglishLiterature: "英國文學",
    HKCEE_ChineseHistory: "中國歷史",
    HKCEE_WorldHistory: "世界歷史",
    HKCEE_Geography: "地理",
    HKCEE_Music: "音樂",
  },
  理科: {
    HKCEE_AdditionalMathematics: "附加數學",
    HKCEE_Physics: "物理",
    HKCEE_Biology: "生物",
    HKCEE_Chemistry: "化學",
  },
  商業學: {
    HKCEE_BusinessStudies: "商業學",
    HKCEE_PrinciplesofAccounts: "會計學原理",
    HKCEE_Economics: "經濟",
    HKCEE_ComputerStudies: "電腦",
  },
};
const HKALE = {
  主科: {
    HKALE_ChineseLanguage: "中國語文",
    HKALE_EnglishLanguage: "英國語文",
    HKALE_GeneralEducation: "通識教育",
  },
  文科: {
    HKALE_ChineseLiterature: "中國文學",
    HKALE_EnglishLiterature: "英國文學",
    HKALE_ChineseHistory: "中國歷史",
    HKALE_WorldHistory: "世界歷史",
    HKALE_Geography: "地理",
    HKALE_Music: "音樂",
  },
  理科: {
    HKALE_PureMathematics: "純粹數學",
    HKALE_AppliedMathematics: "應用數學",
    HKALE_Physics: "物理",
    HKALE_Biology: "生物",
    HKALE_Chemistry: "化學",
  },
  商業學: {
    HKALE_IntroductiontoBusiness: "企業概論",
    HKALE_PrinciplesofAccounts: "會計學原理",
    HKALE_Economics: "經濟",
    HKALE_GovernmentandPublicAffairs: "政府及公共事務",
    HKALE_MathematicsandStatistics: "數學及統計學",
    HKALE_Psychology: "心理學",
  },
};

const HKDSE = {
  核心科目: {
    HKDSE_ChineseLanguage: "中國語文",
    HKDSE_EnglishLanguage: "英國語文",
    HKDSE_Mathematics: "數學",
    HKDSE_GeneralEducation: "通識教育",
  },
  選修科目: {
    HKDSE_ChineseLiterature: "中國文學",
    HKDSE_EnglishLiterature: "英國文學",
    HKDSE_ChineseHistory: "中國歷史",
    HKDSE_WorldHistory: "世界歷史",
    HKDSE_Geography: "地理",
    HKDSE_Music: "音樂",
    HKDSE_PureMathematics: "純粹數學",
    HKDSE_AppliedMathematics: "應用數學",
    HKDSE_Physics: "物理",
    HKDSE_Biology: "生物",
    HKDSE_Chemistry: "化學",
    HKDSE_IntroductiontoBusiness: "企業概論",
    HKDSE_PrinciplesofAccounts: "會計學原理",
    HKDSE_Economics: "經濟",
    HKDSE_GovernmentandPublicAffairs: "政府及公共事務",
    HKDSE_MathematicsandStatistics: "數學及統計學",
    HKDSE_Psychology: "心理學",
  },
  其他語言科目: {
    HKDSE_French: "法語",
    HKDSE_Japanese: "日語",
    HKDSE_German: "德語",
    HKDSE_Spanish: "西班牙語",
    HKDSE_Hindi: "印地語",
    HKDSE_Urdu: "烏爾都語",
  },
};

const IB = {
  Languages: {
    IB_English: "English: Language & Literature (SL & HL)",
    IB_Literature: "English: Literature (SL & HL)",
    IB_ChineseA: "Chinese A: Language & Literature (SL)",
    IB_ChineseALiterature: "Chinese A: Literature (SL)",
    IB_ChineseB: "Chinese B (SL & HL)",
  },
  Mathematics: {
    IB_Mathematics: "Mathematics",
    IB_MathematicsSL: "Mathematics (SL)",
    IB_MathematicsHL: "Mathematics (HL)",
    IB_FurtherMathematicsHL: "Further Mathematics (HL)",
  },
  "Humanities and Social Sciences": {
    IB_BusinessManagement: "Business Management",
    IB_Economics: "Economics",
    IB_GlobalPolitics: "Global Politics",
    IB_History: "History",
    IB_Philosophy: "Philosophy",
    IB_Psychology: "Psychology",
    IB_SocialandCulturalAnthropology: "Social and Cultural Anthropology",
    IB_WorldReligionsSL: "World Religions (SL)",
  },
  Sciences: {
    IB_Biology: "Biology",
    IB_Chemistry: "Chemistry",
    IB_Physics: "Physics",
    IB_SportsExerciseandHealthScience: "Sports, Exercise and Health Science",
    IB_CreativeTechnicalandVocational: "Creative, Technical and Vocational",
    IB_InformationTechnology: "Information Technology",
    IB_ComputerScience: "Computer Science",
    IB_DesignTechnology: "Design Technology",
  },
};

const IGCSE = {
  Languages: {
    IGCSE_Chinese: "Chinese",
    IGCSE_EnglishA: "English A",
    IGCSE_EnglishB: "English B",
    IGCSE_EnglishLiterature: "English Literature",
  },
  Sciences: {
    IGCSE_Biology: "Biology",
    IGCSE_Chemistry: "Chemistry",
    IGCSE_Physics: "Physics",
    IGCSE_Science: "Science",
    IGCSE_Geography: "Geography",
  },
  "Creative, Technical and Vocational": {
    IGCSE_ComputerScience: "Computer Science",
    IGCSE_DesignandTechnology: "Design and Technology",
  },
  Mathematics: {
    IGCSE_MathematicsA: "Mathematics A",
    IGCSE_MathematicsB: "Mathematics B",
    IGCSE_FurtherPureMathematics: "Further Pure Mathematics",
  },
  "Humanities and Social Sciences": {
    IGCSE_Business: "Business",
    IGCSE_Economics: "Economics",
    IGCSE_History: "History",
    IGCSE_Accounting: "Accounting",
  },
};

const GCEALevel = {
  Languages: {
    GCEA_Level_EnglishLanguage: "English Language",
    GCEA_Level_EnglishLiterature: "English Literature",
  },
  Sciences: {
    GCEA_Level_Biology: "Biology",
    GCEA_Level_Chemistry: "Chemistry",
    GCEA_Level_Physics: "Physics",
  },
  Mathematics: {
    GCEA_Level_Mathematics: "Mathematics",
    GCEA_Level_FurtherMathematics: "Further Mathematics",
    GCEA_Level_PureMathematics: "Pure Mathematics",
  },
  "Humanities and Social Sciences": {
    GCEA_Level_Accounting: "Accounting",
    GCEA_Level_BusinessStudies: "Business Studies",
    GCEA_Level_Economics: "Economics",
    GCEA_Level_Psychology: "Psychology",
  },
};

const numberBase = [
  {
    value: "",
    label: "請選擇",
  },
  {
    value: "U",
    label: "U",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
  {
    value: "5",
    label: "5",
  },
  {
    value: "5*",
    label: "5*",
  },
  {
    value: "5**",
    label: "5**",
  },
];

const GradeBase = [
  {
    value: "",
    label: "請選擇",
  },
  {
    value: "A+",
    label: "A+",
  },
  {
    value: "A",
    label: "A",
  },
  {
    value: "B",
    label: "B",
  },
  {
    value: "C",
    label: "C",
  },
  {
    value: "D",
    label: "D",
  },
  {
    value: "E",
    label: "E",
  },
  {
    value: "F",
    label: "F",
  },
];

export default {
  id: "GradeFormOption",
  list: { HKCEE, HKALE, HKDSE, IB, IGCSE, GCEALevel },
  grade: { GradeBase, numberBase },
};

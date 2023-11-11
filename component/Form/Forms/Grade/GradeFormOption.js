const HKCEE = {
  主科: {
    ChineseLanguage: "中國語文",
    EnglishLanguage: "英國語文",
    Mathematics: "數學",
  },

  文科: {
    ChineseLiterature: "中國文學",
    EnglishLiterature: "英國文學",
    ChineseHistory: "中國歷史",
    WorldHistory: "世界歷史",
    Geography: "地理",
    Music: "音樂",
  },
  理科: {
    AdditionalMathematics: "附加數學",
    Physics: "物理",
    Biology: "生物",
    Chemistry: "化學",
  },
  商業學: {
    BusinessStudies: "商業學",
    PrinciplesofAccounts: "會計學原理",
    Economics: "經濟",
    ComputerStudies: "電腦",
  },
};

const HKALE = {
  主科: {
    ChineseLanguage: "中國語文",
    EnglishLanguage: "英國語文",
    GeneralEducation: "通識教育",
  },
  文科: {
    ChineseLiterature: "中國文學",
    EnglishLiterature: "英國文學",
    ChineseHistory: "中國歷史",
    WorldHistory: "世界歷史",
    Geography: "地理",
    Music: "音樂",
  },
  理科: {
    PureMathematics: "純粹數學",
    AppliedMathematics: "應用數學",
    Physics: "物理",
    Biology: "生物",
    Chemistry: "化學",
  },
  商業學: {
    IntroductiontoBusiness: "企業概論",
    PrinciplesofAccounts: "會計學原理",
    Economics: "經濟",
    GovernmentandPublicAffairs: "政府及公共事務",
    MathematicsandStatistics: "數學及統計學",
    Psychology: "心理學",
  },
};

const HKDSE = {
  核心科目: {
    ChineseLanguage: "中國語文",
    EnglishLanguage: "英國語文",
    Mathematics: "數學",
    GeneralEducation: "通識教育",
  },
  選修科目: {
    ChineseLiterature: "中國文學",
    EnglishLiterature: "英國文學",
    ChineseHistory: "中國歷史",
    WorldHistory: "世界歷史",
    Geography: "地理",
    Music: "音樂",
    PureMathematics: "純粹數學",
    AppliedMathematics: "應用數學",
    Physics: "物理",
    Biology: "生物",
    Chemistry: "化學",
    IntroductiontoBusiness: "企業概論",
    PrinciplesofAccounts: "會計學原理",
    Economics: "經濟",
    GovernmentandPublicAffairs: "政府及公共事務",
    MathematicsandStatistics: "數學及統計學",
    Psychology: "心理學",
  },
  其他語言科目: {
    French: "法語",
    Japanese: "日語",
    German: "德語",
    Spanish: "西班牙語",
    Hindi: "印地語",
    Urdu: "烏爾都語",
  },
};

const IB = {
  Languages: {
    English: "English: Language & Literature (SL & HL)",
    Literature: "English: Literature (SL & HL)",
    ChineseA: "Chinese A: Language & Literature (SL)",
    ChineseALiterature: "Chinese A: Literature (SL)",
    ChineseB: "Chinese B (SL & HL)",
  },
  Mathematics: {
    Mathematics: "Mathematics",
    MathematicsSL: "Mathematics (SL)",
    MathematicsHL: "Mathematics (HL)",
    FurtherMathematicsHL: "Further Mathematics (HL)",
  },
  "Humanities and Social Sciences": {
    BusinessManagement: "Business Management",
    Economics: "Economics",
    GlobalPolitics: "Global Politics",
    History: "History",
    Philosophy: "Philosophy",
    Psychology: "Psychology",
    SocialandCulturalAnthropology: "Social and Cultural Anthropology",
    WorldReligionsSL: "World Religions (SL)",
  },
  Sciences: {
    Biology: "Biology",
    Chemistry: "Chemistry",
    Physics: "Physics",
    SportsExerciseandHealthScience: "Sports, Exercise and Health Science",
    CreativeTechnicalandVocational: "Creative, Technical and Vocational",
    InformationTechnology: "Information Technology",
    ComputerScience: "Computer Science",
    DesignTechnology: "Design Technology",
  },
};

const IGCSE = {
  Languages: ["Chinese", "English A", "English B", "English Literature"],
  Sciences: ["Biology", "Chemistry", "Physics", "Science", "Geography"],
  "Creative, Technical and Vocational": [
    "Computer Science",
    "Design and Technology",
  ],
  Mathematics: ["Mathematics A", "Mathematics B", "Further Pure Mathematics"],
  "Humanities and Social Sciences": [
    "Business",
    "Economics",
    "History",
    "Accounting",
  ],
};

const GCEALevel = {
  Languages: ["English Language", "English Literature"],
  Sciences: ["Biology", "Chemistry", "Physics"],
  Mathematics: ["Mathematics", "Further Mathematics", "Pure Mathematics"],
  "Humanities and Social Sciences": [
    "Accounting",
    "Business Studies",
    "Economics",
    "Psychology",
  ],
};

const numberBase = [
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
  list: { HKCEE, HKALE, HKDSE, IB, IGCSE, GCEALevel, GradeBase, numberBase },
};

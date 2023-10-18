
const formField = {
  selectfield: {
    BasicInfo: {
      findus: {
        name: "findus",
        label: "認識我們的途徑",
        requiredErrorMsg: "Required",
        option: [
          {
            value: "undefined",
            label: "None",
          },
          {
            value: "Google",
            label: "網上",
          },
          {
            value: "friend",
            label: "朋友",
          },
          {
            value: "other",
            label: "其他",
          },
        ],
      },

      language: {
        name: "language",
        label: "主要語言",
        option: [
          {
            value: "undefined",
            label: "None",
          },
          {
            value: "chinese",
            label: "中文",
          },
          {
            value: "english",
            label: "英文",
          },
          {
            value: "other",
            label: "其他",
          },
        ],
      },
    },
    Education: {
      yearofexperience: {
        name: "yearofexperience",
        label: "補習年資",
        requiredErrorMsg: "補習年資 is required",
        option: [
          {
            value: "undefined",
            label: "None",
          },
          {
            value: "1",
            label: "1",
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
            value: "6",
            label: "6",
          },
          ,
          {
            value: "7",
            label: "7",
          },
          {
            value: "8",
            label: ">8",
          },
        ],
      },
      experience: {
        name: "experience",
        label: "教育機構經驗",
        requiredErrorMsg: "Experience is required",
        option: [
          {
            value: "undefined",
            label: "None",
          },
          {
            value: "補習社",
            label: "補習社",
          },
          {
            value: "功課輔導班",
            label: "功課輔導班",
          },
          {
            value: "老師",
            label: "老師",
          },
          {
            value: "補習老師",
            label: "補習老師",
          },
        ],
      },
      highestteachinglevel: {
        name: "highestteachinglevel",
        label: "最高可補年級",
        requiredErrorMsg: "最高可補年級 is required",
        option: [
          {
            value: "沒有",
            label: "None",
          },
          {
            value: "幼稚園",
            label: "幼稚園",
          },
          {
            value: "小學",
            label: "小學",
          },
          {
            value: "中學",
            label: "中學",
          },
          {
            value: "成人",
            label: "成人",
          },
        ],
      },
      educationallevel: {
        name: "educationallevel",
        label: "教育程度",
        requiredErrorMsg: "最高可補年級 is required",
        option: [
          {
            value: "undefined",
            label: "None",
          },
          {
            value: "小學",
            label: "小學",
          },
          {
            value: "中學",
            label: "中學",
          },
          {
            value: "大專",
            label: "大專",
          },
          {
            value: "大學",
            label: "大學",
          },
          {
            value: "碩士",
            label: "碩士",
          },
          {
            value: "博士",
            label: "博士",
          },
        ],
      },
      notes: {
        name: "notes",
        label: "是否有筆記提供",
        requiredErrorMsg: "Notes is required",
        option: [
          {
            value: "undefined",
            label: "",
          },
          {
            value: "有",
            label: "有",
          },
          {
            value: "沒有",
            label: "沒有",
          },
        ],
      },
      schoolcat: {
        name: "schoolcat",
        label: "中學類別",
        requiredErrorMsg: "中學類別 is required",
        option: [
          {
            value: "undefined",
            label: "None",
          },
          {
            value: "中文中學",
            label: "中文中學",
          },
          {
            value: "英文中學",
            label: "英文中學",
          },
          {
            value: "國際學校",
            label: "國際學校",
          },
          {
            value: "其他",
            label: "其他",
          },
        ],
      },
      year: {
        name: "year",
        label: "現時就讀年級",
        option: [
          {
            value: "undefined",
            label: "None",
          },
          {
            value: "1",
            label: "1",
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
            value: "<4",
            label: "<4",
          },
        ],
      },
      language: {
        name: "language",
        label: "授課語言",
        option: [
          {
            value: "undefined",
            label: "None",
          },
          {
            value: "Chinese",
            label: "中文",
          },
          {
            value: "English",
            label: "英文",
          },
          {
            value: "Mandarin",
            label: "普通話",
          },
        ],
      },
      strength: {
        name: "strength",
        label: "強項",
        option: [
          {
            value: "undefined",
            label: "None",
          },
          {
            value: "操卷",
            label: "操卷",
          },
          {
            value: "補底",
            label: "補底",
          },
          {
            value: "清concept",
            label: "清concept",
          },
          {
            value: "功課輔導",
            label: "功課輔導",
          },
          {
            value: "拔尖",
            label: "拔尖",
          },
          {
            value: "打好根基",
            label: "打好根基",
          },
          {
            value: "應付公開試",
            label: "應付公開試",
          },
          {
            value: "應付校內試",
            label: "應付校內試",
          },
        ],
      },
    },
    StudentOthers: {
      genderrequirement: {
        name: "genderrequirement",
        label: "導師性別要求",
        option: [
          {
            value: "undefined",
            label: "None",
          },
          {
            value: "None",
            label: "沒有偏好",
          },
          {
            value: "M",
            label: "男性",
          },
          {
            value: "F",
            label: "女性",
          },
        ],
      },
      expectation: {
        name: "expectation",
        label: "期望目標",
        option: [
          {
            value: "undefined",
            label: "None",
          },
          {
            value: "操卷",
            label: "操卷",
          },
          {
            value: "補底",
            label: "補底",
          },
          {
            value: "清concept",
            label: "清concept",
          },
          {
            value: "功課輔導",
            label: "功課輔導",
          },
          {
            value: "拔尖",
            label: "拔尖",
          },
          {
            value: "打好根基",
            label: "打好根基",
          },
          {
            value: "應付公開試",
            label: "應付公開試",
          },
          {
            value: "應付校內試",
            label: "應付校內試",
          },
        ],
      },
    },
  },
  checkboxfieldfield: {
    agreewith: {
      name: "agreewith",
      label: "已閱讀並同意以上條款",
    },
  },
  inputfield: {
    BasicInfo: {
      name: {
        name: "name",
        label: "中或英文身份證全名",
        requiredErrorMsg: "Required",
      },
      nationality: {
        name: "nationality",
        label: "國藉",
        requiredErrorMsg: "Required",
      },
      phoneno: {
        name: "phoneno",
        label: "聯絡電話",
        requiredErrorMsg: "Required",
      },
      address: {
        name: "address",
        label: "固定住宅地址",
        requiredErrorMsg: "Required",
      },
      emergencycontact: {
        name: "emergencycontact",
        label: "緊急聯絡人姓名",
      },
      emergencyrelationship: {
        name: "emergencyrelationship",
        label: "關係",
      },
      emergencyphone: {
        name: "emergencyphone",
        label: "緊急聯絡人電話",
      },
    },
    Education: {
      occupation: {
        name: "occupation",
        label: "現時職業",
        requiredErrorMsg: "Occupation is required",
      },

      secondaryschool: {
        name: "secondaryschool",
        label: "就讀中學",
        requiredErrorMsg: "就讀中學 is required",
      },
      primaryschool: {
        name: "primaryschool",
        label: "就讀小學",
        requiredErrorMsg: "就讀小學 is required",
      },

      publicexamgrade: {
        name: "publicexamgrade",
        label: "香港中學會考分數（六科總分）",
        requiredErrorMsg: "中學類別 is required",
      },
      university: {
        name: "university",
        label: "就讀大學",
      },
      major: {
        name: "major",
        label: "大學主修科目",
      },
      othercert: {
        name: "othercert",
        label: "其他專業應可課程",
      },
    },
    StudentOthers: {
      others: {
        name: "others",
        label: "特別要求/其他資料/學習困難",
      },
    },
    TutorOthers: {
      intro: {
        name: "intro",
        label: "自我介紹",
        numberOfText: 200,
      },
    },
  },
};

export default formField;

const HKCEE = {
              主科:['中國語文','英國語文','數學'], 
              文科:['中國文學', '英國文學',  '中國歷史',  '世界歷史',  '地理',  '音樂'  ], 
              理科:['附加數學','物理',  '生物',  '化學',  ],
              商業學:['商業學', '會計學原理', '經濟', '電腦' ]} 


const HKALE = {
              主科:['中國語文','英國語文','通識教育'], 
              文科:['中國文學', '英國文學',  '中國歷史',  '世界歷史',  '地理',  '音樂'  ], 
              理科:['純粹數學','應用數學','物理',  '生物',  '化學',   ],
              商業學:['企業概論', '會計學原理', '經濟', '政府及公共事務','數學及統計學','心理學' ]} 


const HKDSE = {
                核心科目:['中國語文','英國語文','數學','通識教育'], 
                選修科目:['中國文學','英國文學','數學(M1)','數學(M2)','中國歷史','經濟','倫理與宗教','地理'
                ,'歷史','旅遊與款待','生物','化學','物理','科學:組合科學','科學:綜合科學','資訊及通訊科技','科技與生活'
                ,'設計與應用科技','視覺藝術','音樂','體育','企業,會計與財務概論','健康管理與社會關懷'],
                其他語言科目:['法語','日語' ,'德語','西班牙語' ,'印地語' ,'烏爾都語' ]}


const IB = {
              Languages:['English: Language & Literature (SL & HL)',  'English: Literature (SL & HL)', ' Chinese A: Language & Literature (SL)',
              'Chinese A: Literature (SL)',  'Chinese B (SL & HL)',  ], 
              Mathematics: ['Mathematics',
              ' Mathematics (SL)',    'Mathematics (HL)',   ' Further Mathematics (HL)',],
              'Humanities and Social Sciences': ['Business Management', 'Economics', 'Global Politics',  'History',  'Philosophy', 'Psychology',
              'Social and Cultural Anthropology', 'World Religions (SL)'], 
              Sciences:['Biology','Chemistry',
              'Physics',   'Sports, Exercise and Health Science',  ' Creative, Technical and Vocational',    ' Information Technology',
              ' Computer Science', ' Design Technology',]}
const IGCSE = {
              Languages:['Chinese','English A','English B','English Literature'],
              Sciences:['Biology', 'Chemistry', 'Physics', 'Science', 'Geography', ]
              ,'Creative, Technical and Vocational':['Computer Science','Design and Technology' ],
              Mathematics:['Mathematics A', ' Mathematics B', 'Further Pure Mathematics' ]
              ,'Humanities and Social Sciences':['Business',  'Economics',  'History',  'Accounting' ]}

const GCEALevel = {
              Languages:['English Language','English Literature'],
              Sciences:['Biology',  'Chemistry',  'Physics'  ],
              Mathematics:['Mathematics','Further Mathematics',
              'Pure Mathematics',],
              'Humanities and Social Sciences':['Accounting',  'Business Studies',  'Economics',  'Psychology'  ]}

const numberBase = [
  {
    value: undefined,
    label: 'None'
  },
  {
    value: 'U',
    label: 'U'
  },
  {
    value: '2',
    label: '2'
  },
  {
    value: '3',
    label: '3'
  },
  {
    value: '4',
    label: '4'
  },
  {
    value: '5',
    label: '5'
  },
  {
    value: '5*',
    label: '5*'
  },
  {
    value: '5**',
    label: '5**'
  },
];

const GradeBase = [
    {
      value: undefined,
      label: 'None'
    },
    {
      value: 'A+',
      label: 'A+'
    },
    {
      value: 'A',
      label: 'A'
    },
    {
      value: 'B',
      label: 'B'
    },
    {
      value: 'C',
      label: 'C'
    },
    {
      value: 'D',
      label: 'D'
    },
    {
      value: 'E',
      label: 'E'
    },
    {
      value: 'F',
      label: 'F'
    },
  ];

 export default {id: 'GradeFormOption', list:{HKCEE,HKALE,HKDSE,IB,IGCSE,GCEALevel,GradeBase,numberBase}}
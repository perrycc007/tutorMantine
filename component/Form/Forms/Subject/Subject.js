const tutor = { cat: "補習",
              index:0, 
              items:[
                '全科',	'文科',	'理科',	'商科',
                '中文',	'英文',	'數學',	'數學(M1)',
                '數學(M2)',	'中國文學',	'英國文學',	'中國歷史',
                '世界歷史',	'地理',	'通識教育',	'綜合科學',
                '綜合人文學',	'附加數學',	'純粹數學',	'應用數學',
                '物理',	'生物',	'化學',	'商業學',
                '會計',	'經濟',	'企業概論',	'政府及公共事務',
                '數學及統計學','BAFS']};
const oral = {cat: "會話", 
            index:1, 
            items:[
              '普通話','廣東話','英文拼音',	'日語',
              '韓語',	'法語',	'意大利語',	'德語',
              '西班牙語',	'英語會話',	'GCE',	'TOEFL',
              'IELTS'
]};

const music = {cat: "音樂", 
              index:2, 
              items:[
                '大提琴','中提琴','小提琴','小號',
                '口琴',	'木笛',	'長笛',	'牧童笛',
                '單簧管','色士風','二胡',	'古箏',
                '琵琶',	'揚琴',	'柳琴',	'結他',
                '木結他','電結他','電子琴','鋼琴',
                '聲樂',	'樂理',]};

const others = {cat: "其他", 
              index:3, 
              items:[
                '游水(蛙式)','游水(自由式)','游水(背泳)','游水(蝶式)',
                '繪畫',	'電腦',	'劍橋英語',	'奧數',
                '珠心算','學林數學','IGCSE','IB其他',]};

const subjects = [tutor,oral,music,others]

export default subjects
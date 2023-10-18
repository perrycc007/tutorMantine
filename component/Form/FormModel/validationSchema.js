import * as Yup from 'yup';
import moment from 'moment';
import checkoutFormModel from './formField';
const {
  formField: {
    Email,
    Password,
    ConfirmPassword,
    FindUs,
    Name,
    PhoneNo,
    Address,
    Nationality,
    EmergencyContact,
    EmergencyRelationship,
    EmergencyPhone,
    Occupation,
    YearOfExperience,
    Experience,
    HighestTeachingLevel,
    EducatoionLevel,
    Notes,
    SecondarySchool,
    PrimarySchool,
    SchoolCat,
    PublicExamGrade,
    country
  }
} = checkoutFormModel;



export default [
  Yup.object().shape({
    [Email.name]: Yup.string().required(`${Email.requiredErrorMsg}`),
    [Password.name]: Yup.string().required(`${Password.requiredErrorMsg}`),
    [Name.name]: Yup.string().required(`${Name.requiredErrorMsg}`),
    [PhoneNo.name]: Yup.string().required(`${PhoneNo.requiredErrorMsg}`),
    [Address.name]: Yup.string().required(`${Address.requiredErrorMsg}`),
    [Nationality.name]: Yup.string()
      .nullable()
      .required(`${Nationality.requiredErrorMsg}`),
    [PhoneNo.name]: Yup.string()
      .required(`${PhoneNo.requiredErrorMsg}`)
      .test(
        'len',
        `${PhoneNo.invalidErrorMsg}`,
        val => val && val.length === 8
      ),
    [EmergencyPhone.name]: Yup.string()
    .required(`${EmergencyPhone.requiredErrorMsg}`)
    .test(
      'len',
      `${PhoneNo.invalidErrorMsg}`,
      val => val && val.length === 8
    ),
    [EmergencyContact.name]: Yup.string().required(`${EmergencyContact.requiredErrorMsg}`),
    [EmergencyRelationship.name]: Yup.string()
      .nullable()
      .required(`${EmergencyRelationship.requiredErrorMsg}`),
    [Occupation.name]: Yup.string().required(`${Occupation.requiredErrorMsg}`),
    [YearOfExperience.name]: Yup.string()
    .nullable()
    .required(`${YearOfExperience.requiredErrorMsg}`),
    [Experience.name]: Yup.string()
    .nullable()
    .required(`${Experience.requiredErrorMsg}`),
    [HighestTeachingLevel.name]: Yup.string().required(`${HighestTeachingLevel.requiredErrorMsg}`),
    [Notes.name]: Yup.string()
      .nullable()
      .required(`${Notes.requiredErrorMsg}`),
    [EducatoionLevel.name]: Yup.string()
    .nullable()
    .required(`${EducatoionLevel.requiredErrorMsg}`),
    [SecondarySchool.name]: Yup.string().required(`${SecondarySchool.requiredErrorMsg}`),
    [PrimarySchool.name]: Yup.string().required(`${PrimarySchool.requiredErrorMsg}`),
    [SchoolCat.name]: Yup.string().required(`${SchoolCat.requiredErrorMsg}`),
    [PublicExamGrade.name]: Yup.string().required(`${PublicExamGrade.requiredErrorMsg}`),
    [nameOnCard.name]: Yup.string().required(`${nameOnCard.requiredErrorMsg}`),
    [cardNumber.name]: Yup.string()
      .required(`${cardNumber.requiredErrorMsg}`)
      .matches(visaRegEx, cardNumber.invalidErrorMsg),
    [expiryDate.name]: Yup.string()
      .nullable()
      .required(`${expiryDate.requiredErrorMsg}`)
      .test('expDate', expiryDate.invalidErrorMsg, val => {
        if (val) {
          const startDate = new Date();
          const endDate = new Date(2050, 12, 31);
          if (moment(val, moment.ISO_8601).isValid()) {
            return moment(val).isBetween(startDate, endDate);
          }
          return false;
        }
        return false;
      }),
    [cvv.name]: Yup.string()
      .required(`${cvv.requiredErrorMsg}`)
      .test('len', `${cvv.invalidErrorMsg}`, val => val && val.length === 3)
  })
];

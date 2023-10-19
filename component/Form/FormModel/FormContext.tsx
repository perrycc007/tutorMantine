// form-context.ts file
import { createFormContext } from "@mantine/form";

// define the UserFormValues with formField/BasicInfo

interface UserFormValues {
  findus: string;
  language: string;
  name: string;
  nationality: string;
  phoneno: string;
  address: string;
  emergencycontact: string;
  emergencyrelationship: string;
  emergencyphone: string;
  lowestpay: number;
  highestpay: number;
  yearofexperience: string;
  experience: string;
  highestteachinglevel: string;
  educationallevel: string;
  notes: string;
  schoolcat: string;
  year: string;
  strength: string;
  genderrequirement: string;
  expectation: string;
  agreewith: string;
  occupation: string;
  secondaryschool: string;
  primaryschool: string;
  publicexamgrade: string;
  university: string;
  major: string;
  othercert: string;
  others: string;
  intro: string;
  grade: any;
  location: any;
}

// You can give context variables any name
export const [UserFormProvider, useUserFormContext, useUserForm] =
  createFormContext<UserFormValues>();

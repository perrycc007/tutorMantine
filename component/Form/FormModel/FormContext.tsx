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
  emergencyphone: number;
}

// You can give context variables any name
export const [UserFormProvider, useUserFormContext, useUserForm] =
  createFormContext<UserFormValues>();

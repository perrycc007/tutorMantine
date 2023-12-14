import { useEffect, useState } from "react";
import { TextInput, Select, Button, Alert } from "@mantine/core";
import formField from "../FormModel/formField";
import { useUserForm } from "../FormModel/FormContext";
const inputfield = formField.inputfield.BasicInfo;
const checkboxfield = formField.checkboxfieldfield.agreewith;
const selectfield = formField.selectfield.BasicInfo;

const PersonalInfoForm = (props) => {
  const form = useUserForm({
    initialValues: { ...props.data },
    validateInputOnBlur: true,
    validate: {
      findus: (value) =>
        value ? (value.length > 0 ? null : "此欄位是必需的") : "此欄位是必需的",
      language: (value) =>
        value ? (value.length > 0 ? null : "請選擇語言") : "請選擇語言",
      name: (value) => (/^[a-zA-Z ]+$/.test(value) ? null : "名稱只能包含字母"),
      nationality: (value) =>
        value ? (value.length > 0 ? null : "國籍為必填項") : "國籍為必填項",
      phoneno: (value) =>
        value
          ? /^\d{8}$/.test(value)
            ? null
            : "無效的電話號碼"
          : "電話號碼為必填項",
      address: (value) =>
        value ? (value.length > 3 ? null : "地址必須更長") : "地址必須更長",
      emergencycontact: (value) =>
        value
          ? value.length > 0
            ? null
            : "需要緊急聯絡方式"
          : "需要緊急聯絡方式",
      emergencyrelationship: (value) =>
        value
          ? value.length > 0
            ? null
            : "需要與緊急聯絡人的關係"
          : "需要與緊急聯絡人的關係",
      emergencyphone: (value) =>
        value
          ? /^\d{8}$/.test(value)
            ? null
            : "無效的電話號碼"
          : "電話號碼為必填項",
    },
  });
  const submitHanlder = (event) => {
    form.setValues((prev) => ({ ...prev, ...event }));
    const NewData = { ...form.values };
    props.updateForm(NewData);
  };
  useEffect(() => {
    form.setValues(props.data);
    form.resetDirty(props.data);
  }, [props.data]);

  return (
    <form
      className="mt-2"
      onSubmit={form.onSubmit((values) => submitHanlder(values))}
    >
      {Object.entries(inputfield).map(([key, value]) => (
        <TextInput
          label={value.label}
          placeholder={value.label}
          key={value.label}
          {...form.getInputProps(value.name)}
        />
      ))}
      {Object.entries(selectfield).map(([key, value]) => (
        <Select
          label={value.label}
          data={value.option}
          placeholder={value.label}
          key={value.label}
          {...form.getInputProps(value.name)}
          //   value={formData[formField.selectfield.BasicInfo.name]}
        />
      ))}
      <button type="submit">更新</button>
    </form>
  );
};

export default PersonalInfoForm;

export const readDate = (notFormat) => {
  const time = notFormat.split("t");
  let dayOfWeek = [];
  let startingTime = `${time[1]}:00`;
  switch (time[0]) {
    case "d1":
      dayOfWeek = "星期一";
      break;
    case "d2":
      dayOfWeek = "星期二";
      break;
    case "d3":
      dayOfWeek = "星期三";
      break;
    case "d4":
      break;
    case "d5":
      dayOfWeek = "星期五";
      break;
    case "d6":
      dayOfWeek = "星期六";
      break;
    case "d7":
      dayOfWeek = "星期日";
      break;

    default:
    // code block
  }

  const result = [dayOfWeek, startingTime];
  return result;
};

export function stripFormEventProperties(event) {
  const formData = {};

  const propertiesToRemove = [
    "timeStamp",
    "type",
    "_reactName",
    "bubbles",
    "cancelable",
    "defaultPrevented",
    "eventPhase",
    "isTrusted",
    "nativeEvent",
    "currentTarget",
    "target",
    "_targetInst",
  ];
  function stripProperties(obj, propsToRemove) {
    // Create a shallow copy of the object
    const newObj = { ...obj };

    // Iterate over all properties to remove and delete them from the new object
    propsToRemove.forEach((prop) => {
      delete newObj[prop];
    });

    return newObj;
  }

  // Iterate over all properties of the event object
  for (const [key, value] of Object.entries(event)) {
    // Check if the value is of a type that you'd expect form data to be
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      Array.isArray(value) ||
      typeof value === "object"
    ) {
      formData[key] = value;
    }
  }
  const result = stripProperties(formData, propertiesToRemove);
  return result;
}

export const isTokenExpired = (token) => {
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1]));
    if (!exp) {
      return false;
    }

    return Date.now() >= exp * 1000;
  } catch {
    return false;
  }
};

export function cleanProfileObject(originalObject) {
  const cleanedObject = {};
  const keysToKeep = [
    "address",
    "agreewith",
    "country",
    "emergencycontact",
    "emergencyphone",
    "emergencyrelationship",
    "findus",
    "idprofile",
    "language",
    "name",
    "nationality",
    "phoneno",
    "userid",
  ];
  for (const key of keysToKeep) {
    if (originalObject.hasOwnProperty(key)) {
      cleanedObject[key] = originalObject[key];
    }
  }

  return cleanedObject;
}

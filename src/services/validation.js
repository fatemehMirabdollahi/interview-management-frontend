import { defineRule } from "vee-validate";
import { max, numeric, max_value, min_value } from "@vee-validate/rules";

// setInteractionMode('aggressive')

const double = (value, [decimals]) => {
  let regex = /^-?\d+(?:\.{1}\d+){0,1}$/;
  if (decimals) {
    regex = new RegExp(`^-?\\d+(?:\\.{1}\\d{${decimals}}){0,1}$`);
  }
  return regex.test(value);
};
const isBetween = (value, params) => {
  const regex = /^\d+$/;
  if (regex.test(value)) {
    if (Number(params[0]) <= value && Number(params[1]) >= value) return true;
    else return `عدد باید بین ${params[0]} و ${params[1]} باشد.`;
  }
  return "عدد انتخابی باید طبیعی باشد.";
};
const required = (value) => {
  if ((value != undefined && !value.toString().length) || value == null) {
    return ".این فیلد الزامیست";
  }
  return true;
};
const integer = (value) => {
  if (value === "") {
    return true;
  }
  if (/^\d+$/.test(value)) {
    return true;
  } else {
    return "عدد انتخابی باید طبیعی باشد.";
  }
};
const maxLength = (value, params) => {
  if (value?.length > params[0]) {
    return `حداکثر${params[0]} کاراکتر مجاز میباشد`;
  } else return true;
};
const passwordCheck = (value) => {
  var regularExpression =
    /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (regularExpression.test(value)) {
    return true;
  } else {
    return "رمز عبور باید بین ۶ تا ۱۶ کاراکتر، حداقل دارای یک کارکتر خاص و یک عدد باشد.";
  }
};
const confirmPass = (value) => {
  if (value === document.getElementById("password").value) {
    return true;
  } else return "تکرار با رمز عبور یکسان نیست.";
};
const checkMax = (value, params) => {
  if (value === "") {
    return true;
  }
  const regex = /^\d+$/;
  if (regex.test(value)) {
    console.log(params[0].value, params[0]);
    let max = document.getElementById(params[0]).value;
    if (Number(value) > Number(max)) {
      return "نمره داده شده از حداکثر نمره بیشتر است";
    } else return true;
  } else return "عدد انتخابی باید طبیعی باشد.";
};
const checkSumMax = (value, params) => {
  let first = Number(document.getElementById("first").value);
  let second = Number(document.getElementById("second").value);
  let third = Number(document.getElementById("third").value);
  let max = Number(document.getElementById(params[0]).value);
  const regex = /^\d+$/;
  if (value === "") {
    return true;
  }
  if (regex.test(value)) {
    if (first + second + third > max)
      return "نمره داده شده از حداکثر نمره بیشتر است";
  } else return "عدد انتخابی باید طبیعی باشد.";

  return true;
};
defineRule("required", required);
defineRule("max", max);
defineRule("numeric", numeric);
defineRule("max_value", max_value);
defineRule("min_value", min_value);
defineRule("integer", integer);
defineRule("double", double);
defineRule("isBetween", isBetween);
defineRule("maxLength", maxLength);
defineRule("passwordCheck", passwordCheck);
defineRule("confirmPass", confirmPass);
defineRule("checkMax", checkMax);
defineRule("checkSumMax", checkSumMax);

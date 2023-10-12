import { defineStore } from "pinia";

export const registerStore = defineStore("registerStore", () => {
  function containsSpecialCharacters(str) {
    const specialCharactersRegex = /[!@#$%^&*(),.?":{}|<>]/; // Biểu thức chính quy kiểm tra ký tự đặc biệt
    return specialCharactersRegex.test(str);
  }

  return {
    containsSpecialCharacters,
  };
});

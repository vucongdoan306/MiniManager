import { defineStore } from "pinia";
import { ref } from "vue";
export const userInfoStore = defineStore("userInfoStore", () => {
  const userInfo = ref({
    user: {},
  });

  function setUserInfo() {}

  return {
    userInfo,
  };
});

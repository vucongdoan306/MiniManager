import { defineStore } from "pinia";
import { ref } from "vue";

export const snackStore = defineStore("masterStore", () => {
  const isShowSnackBar = ref(false);
  const contentSnackBar = ref("");
  const timeOut = ref(2000);
  const timeOutDefault = 2000;
  const contentButton = ref("Close");

  function openSnackBar(content, time) {
    isShowSnackBar.value = true;
    contentSnackBar.value = content;
    if (time) {
      timeOut.value = time;
    }
    setTimeout(() => {
      isShowSnackBar.value = false;
      timeOut.value = timeOutDefault;
    }, timeOut.value);
  }

  return {
    isShowSnackBar,
    contentSnackBar,
    timeOut,
    openSnackBar,
    contentButton,
  };
});

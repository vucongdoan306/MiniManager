<script setup>
import { hexToRgb } from "@layouts/utils";
import { useTheme } from "vuetify";
import SnackBar from "./layouts/components/SnackBar.vue";

const { global } = useTheme();
</script>

<template>
  <VApp
    :style="`--v-global-theme-primary: ${hexToRgb(
      global.current.value.colors.primary
    )}`"
  >
    <RouterView />
    <snack-bar></snack-bar>
  </VApp>
</template>

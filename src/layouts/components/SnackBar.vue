<script setup>
import { snackStore } from "@/stores/snack-store";
import { getCurrentInstance } from "vue";

const { proxy } = getCurrentInstance();
const store = snackStore();
</script>

<template>
  <v-snackbar v-model="store.isShowSnackBar" :timeout="store.timeOut">
    {{ store.contentSnackBar }}
    <template v-slot:actions>
      <v-btn
        color="success"
        variant="text"
        @click="store.isShowSnackBar = !store.isShowSnackBar"
      >
        {{ $t(store.contentButton) }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

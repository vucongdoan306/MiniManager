<script setup>
import { registerStore } from "@/stores/register-store";
import { snackStore } from "@/stores/snack-store";
import AuthProvider from "@/views/pages/authentication/AuthProvider.vue";
import logo from "@images/logo.svg?raw";
import { getCurrentInstance, ref } from "vue";
const { proxy } = getCurrentInstance();
const snackState = snackStore();
const registerState = registerStore();

const form = ref({
  username: "",
  email: "",
  password: "",
  firstname: "",
  lastname: "",
  privacyPolicies: false,
});

const isValidate = ref(false);

function checkRequired(checkValue) {
  if (!isValidate.value) {
    return true;
  }

  if (!checkValue) {
    return proxy.$t("Fieldcannotbeleftblank");
  }
}

function checkSpecialChar(checkValue) {
  if (!isValidate.value) {
    return true;
  }

  if (registerState.containsSpecialCharacters(checkValue)) {
    return proxy.$t("Thefieldcannotcontainspecialcharacters");
  }
}

const isPasswordVisible = ref(false);

async function registerAccount() {
  if (
    !(
      form.value.email &&
      form.value.firstname &&
      form.value.lastname &&
      form.value.password &&
      form.value.username
    )
  ) {
    snackState.openSnackBar(proxy.$t("Pleaseenterenoughinformation"));
    isValidate.value = true;
    return;
  }

  proxy.$api
    .post("/Auth/RegisterUser", {
      username: form.value.username,
      firstName: form.value.firstname,
      lastName: form.value.lastname,
      password: form.value.password,
      email: form.value.email,
    })
    .then(() => {
      snackState.openSnackBar(proxy.$t("RegisterSuccessful"));
    })
    .catch(() => {
      snackState.openSnackBar(proxy.$t("Registrationfailed"));
    });
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard class="auth-card pa-4 pt-7" max-width="448">
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div class="d-flex text-primary" v-html="logo" />
          </div>
        </template>

        <VCardTitle class="text-2xl font-weight-bold"> sneat </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">{{ $t("Adventurestartshere") }}🚀</h5>
        <p class="mb-0">
          {{ $t("LetsRegister") }}
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent="registerAccount()">
          <VRow>
            <VCol cols="6">
              <VTextField
                v-model="form.lastname"
                :rules="[
                  checkRequired(form.lastname),
                  checkSpecialChar(form.lastname),
                ]"
                :placeholder="$t('EnterLastName')"
                :label="$t('LastName')"
                type="text"
                autofocus
              />
            </VCol>

            <VCol cols="6">
              <VTextField
                v-model="form.firstname"
                :rules="[
                  checkRequired(form.firstname),
                  checkSpecialChar(form.firstname),
                ]"
                :placeholder="$t('EnterFirstName')"
                :label="$t('FirstName')"
                type="text"
              />
            </VCol>

            <!-- Username -->
            <VCol cols="12">
              <VTextField
                v-model="form.username"
                :rules="[
                  checkRequired(form.username),
                  checkSpecialChar(form.firstname),
                ]"
                :placeholder="$t('EnterUsername')"
                :label="$t('username')"
                type="text"
              />
            </VCol>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.email"
                :rules="[checkRequired(form.email)]"
                label="Email"
                placeholder="johndoe@email.com"
                type="email"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                :rules="[checkRequired(form.password)]"
                :label="$t('Password')"
                :placeholder="$t('EnterPassword')"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
              <div class="d-flex align-center mt-1 mb-4">
                <VCheckbox
                  id="privacy-policy"
                  v-model="form.privacyPolicies"
                  inline
                />
                <VLabel for="privacy-policy" style="opacity: 1">
                  <span class="me-1">I agree to</span>
                  <a href="javascript:void(0)" class="text-primary"
                    >privacy policy & terms</a
                  >
                </VLabel>
              </div>

              <VBtn block type="submit">
                {{ $t("signup") }}
              </VBtn>
            </VCol>

            <!-- login instead -->
            <VCol cols="12" class="text-center text-base">
              <span>{{ $t("haveaccount") }}</span>
              <RouterLink class="text-primary ms-2" to="/login">
                {{ $t("signin") }}
              </RouterLink>
            </VCol>

            <VCol cols="12" class="d-flex align-center">
              <VDivider />
              <span class="mx-4">{{ $t("or") }}</span>
              <VDivider />
            </VCol>

            <!-- auth providers -->
            <VCol cols="12" class="text-center">
              <AuthProvider />
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<script setup>
import AuthProvider from '@/views/pages/authentication/AuthProvider.vue';
import logo from '@images/logo.svg?raw';
import { getCurrentInstance, ref } from "vue";
const { proxy } = getCurrentInstance();

const form = ref({
  username: '',
  password: '',
  remember: false,
})

const rules = ref({
  required: value => !!value || proxy.$t('Fieldcannotbeleftblank')
})

const isPasswordVisible = ref(false)

async function login(){
  await proxy.$api.post("/Auth/LoginApp",{userName: form.value.username,password: form.value.password}).then(data=>{
    localStorage.setItem("authToken",data)
    proxy.$router.push("/")
  });

}

const validateLogin = () =>{
  
}
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div
              class="d-flex text-primary"
              v-html="logo"
            />
          </div>
        </template>

        <VCardTitle class="text-2xl font-weight-bold">
          {{ $t('AppName') }}
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">
          {{ $t('welcome') }} {{ $t('AppName') }}! 👋🏻
        </h5>
        <p class="mb-0">
          {{ $t('signinsub') }}
        </p>
      </VCardText>

      <VCardText>
        <VForm @submit.prevent.self="login">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="form.username"
                :rules="[rules.required]"
                autofocus
                :placeholder="$t('EnterUsername')"
                :label="$t('username')"
                type="text"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="form.password"
                :rules="[rules.required]"
                :label="$t('Password')"
                :placeholder="$t('EnterPassword')"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                <VCheckbox
                  v-model="form.remember"
                  :label="$t('rememberme')"
                />

                <RouterLink
                  class="text-primary ms-2 mb-1"
                  to="javascript:void(0)"
                >
                  {{ $t('ForgotPassword') }}
                </RouterLink>
              </div>

              <!-- login button -->
              <VBtn
                block
                type="submit"
                :loading="loading"
                @click="login"
              >
                Login
              </VBtn>
            </VCol>

            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>{{ $t('donthaveaccount') }}</span>
              <RouterLink
                class="text-primary ms-2"
                to="/register"
              >
                {{ $t('createnewaccount') }}
              </RouterLink>
            </VCol>

            <VCol
              cols="12"
              class="d-flex align-center"
            >
              <VDivider />
              <span class="mx-4">or</span>
              <VDivider />
            </VCol>

            <!-- auth providers -->
            <VCol
              cols="12"
              class="text-center"
            >
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

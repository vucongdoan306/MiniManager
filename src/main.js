/* eslint-disable import/order */
import "@/@iconify/icons-bundle"
import App from "@/App.vue"
import vuetify from "@/plugins/vuetify"
import { loadFonts } from '@/plugins/webfontloader'
import router from "@/router"
import "@core/scss/template/index.scss"
import "@layouts/styles/index.scss"
import "@styles/styles.scss"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import { createPinia } from "pinia"
import { createApp } from "vue"

import i18n from "@/i18n/config"

loadFonts()

// Create vue app
const app = createApp(App)

app.use(i18n)

// Use plugins
app.use(vuetify)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)

const config = app.config

config.globalProperties.$t = i18n.global.t
config.globalProperties.$tc = i18n.global.tc
config.globalProperties.$te = i18n.global.te
config.globalProperties.$d = i18n.global.d
config.globalProperties.$n = i18n.global.n

// Mount vue app

app.mount("#app")

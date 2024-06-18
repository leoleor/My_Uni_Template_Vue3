import { createSSRApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import uviewPlus from '@/uni_modules/uview-plus'
import { isWechat, setOssCover, timeFormat } from '@/utils/tools'
import { uploadFile } from '@/utils/http'
import { goLogin } from '@/utils/publicMethod'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()

  app.provide('global', {
    $isWechat: isWechat,
    $goLogin: goLogin,
    $setOssCover: setOssCover,
    $uploadFile: uploadFile,
    $timeFormat: timeFormat
  })

  app.use(pinia)
  app.use(uviewPlus)

  return {
    app
  }
}

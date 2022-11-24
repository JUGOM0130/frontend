import {
    createApp
} from 'vue'
import App from './App.vue'
import MyPage from './views/MyPage.vue'
import router from './router'

createApp(App).use(router).use(router).mount('#app')
createApp(MyPage).use(router).use(router).mount('#app')

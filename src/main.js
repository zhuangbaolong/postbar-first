import Vue from 'vue'
import App from './App.vue'
import router from './router'
/*引入Element-UI的依赖库*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

/*引入自定义全局样式*/
import '@/assets/css/main.css'

/*引入axios起步请求插件*/
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:9090/post'
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')

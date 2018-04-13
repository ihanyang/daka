import Vue from 'vue'
import App from './index.vue'

const app = new Vue(App)
app.$mount()

export default {
    config: {
        navigationBarTitleText: '添加打卡内容',
    }
}
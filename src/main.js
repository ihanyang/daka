import Vue from 'vue'
import App from './App'

import '@/css/common'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
    config: {
        // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
        pages: ['^pages/index/index', 'pages/discover/index', 'pages/post/index', 'pages/detail/index', 'pages/invite/index'],
        window: {
          onReachBottomDistance: 200,
          backgroundTextStyle: 'light',
          navigationBarBackgroundColor: '#FFF',
          navigationBarTitleText: '打卡',
          navigationBarTextStyle: 'white',
          navigationBarBackgroundColor: '#22CDCB'
        },
        tabBar: {
            color:'#7AE6E6',
            selectedColor:'#22CDCB',
            borderStyle: 'white',
            backgroundColor: '#FFF',
            list: [
                {
                    text: '打卡',
                    pagePath: 'pages/index/index',
                    iconPath: 'static/daka-icon.png',
                    selectedIconPath: 'static/daka-icon-selected.png'
                },
                {
                    text: '发现',
                    pagePath: 'pages/discover/index',
                    iconPath: 'static/discover-icon.png',
                    selectedIconPath: 'static/discover-icon-selected.png'
                }
            ]
        }
    }
}

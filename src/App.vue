<script>
    import {login, sendTime} from '@/utils'

    export default {
        data() {
            return {
                // index: -1,
                // token: '',
                // domain: '',
                // dakaList: []
            }
        },

        async onLaunch() {
            setTimeout(() => {
                const app = getApp()

                app.dakaTotalNum = 0
                app.dakaPlanNum = 0
                app.dakaList = []
            }, 0)

            if (! wx.getStorageSync('isDakaRecord')) {
                wx.reLaunch({
                    url: '/pages/discover/index'
                })
            }

            //if (! wx.getStorageSync('session')) {
                await login()
            //}

            // 清除七牛 token
            wx.removeStorage({
                key: 'qiniu'
            })
        },

        onShow() {
            setTimeout(() => {
                getApp().enterTime = + new Date()
            })
        },

        onHide() {
            sendTime()
        },

        onError(e) {
            console.log(e)
        }
    }
</script>
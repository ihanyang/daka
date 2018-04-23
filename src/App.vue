<script>
    import {sendTime} from '@/utils'

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
            const app = this.$mp.app

            app.dakaTotalNum = 0
            app.dakaPlanNum = 0
            app.dakaList = []

            if (! wx.getStorageSync('isDakaRecord')) {
                wx.reLaunch({
                    url: '/pages/discover/index'
                })
            }

            wx.removeStorageSync('session')

            // 清除七牛 token
            wx.removeStorageSync('qiniu')
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
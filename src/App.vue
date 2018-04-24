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

            if (! wx.getStorageSync('isAuthorization')) {
                if (this.$mp.appOptions.path.indexOf('detail') === -1) {
                    wx.reLaunch({
                        url: '/pages/discover/index'
                    })
                }
            }
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
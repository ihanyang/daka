<script>
    import {sendTime} from '@/utils'

    export default {
        async onLaunch() {
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
        }
    }
</script>
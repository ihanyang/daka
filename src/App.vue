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

            if (! wx.getStorageSync('session')) {
                await login()
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
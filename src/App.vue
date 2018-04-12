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

                console.log(getApp())
            }, 0)

            if (! wx.getStorageSync('session')) {
                await login()
            }


        },

        onShow() {
            //console.log(7777)

            setTimeout(() => {
                getApp().enterTime = + new Date()
            })
        },

        onHide() {
            //console.log(666)
            sendTime()
        },

        onError(e) {
            console.log(e)
        }
    }
</script>
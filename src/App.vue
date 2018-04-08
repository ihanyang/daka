<script>
    import api from '@/api'
    import {login} from '@/utils'

    export default {
        data() {
            return {
                index: -1,
                token: '',
                dakaList: []
            }
        },

        async onLaunch() {
            await login()

            const data = await api.getQiNiuToken()

            if (data.flag !== 1) {
                wx.showModal({
                    title: '提示',
                    content: data.msg,
                    showCancel: false
                })

                return
            }

            getApp().token = data.data.token
        }
    }
</script>
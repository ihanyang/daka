<script>
    import {login} from '@/utils'

    export default {
        data() {
            return {
                index: -1,
                token: '',
                domain: '',
                dakaList: []
            }
        },

        async onLaunch() {
            if (! wx.getStorageSync('session')) {
                await login()
            }
        }
    }
</script>
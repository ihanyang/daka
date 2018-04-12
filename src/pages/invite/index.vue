<style src="@/css/invite"></style>

<template>
    <div class="invite-wrapper">
        <!-- <div class="invite-content">
            <div class="invite-user-info">
                <img class="avatar" :src="user.avatar" mode="aspectFill">
                <span v-text="user.nickname"></span>
                <p>邀请你加入打卡计划</p>
            </div>

            <div class="invite-desc">发生地方读书书法大师大师啊书法大师大师大飒飒</div>

            <div class="invite-qr">
                <img :src="qr" mode="aspectFill">
                <p>长按识别二维码与{{user.nickname}}一起打卡</p>
            </div>
        </div> -->

        <div class="invite-content">
            <img :src="qr" mode="aspectFill">
        </div>

        <div id="daka-save" class="btn save-btn" @click="save">保存图片</div>
    </div>
</template>

<script>
    import api from '@/api'

    export default {
        data() {
            return {
                user: {},

                qr: ''
            }
        },

        created() {
            wx.getStorage({
                key: 'user',
                success: (res) => {
                    this.user = res.data
                }
            })
        },

        onLoad() {
            this.getInviteQR()
        },

        onShareAppMessage() {
            return {
                title: `${this.user.nickname}邀请你加入打卡计划`,
                path: '/pages/index/index'
            }
        },

        methods:{
            async getInviteQR() {
                const params = {
                    clockPID: + this.$root.$mp.query.id
                }

                const data = await api.getInviteCard(params)

                if (data.flag === 1) {
                    this.qr = data.data.ImageUrl

                    return
                }

                wx.showModal({
                    title: '提示',
                    content: data.msg,
                    showCancel: false
                })
            },
            async save() {
                wx.getSetting({
                    success: (res) => {
                        if (res.authSetting['scope.writePhotosAlbum'] === false) {
                            wx.showModal({
                                title: '提示',
                                content: '保存需要权限',
                                success: (res) => {
                                    if (res.confirm) {
                                        wx.openSetting({
                                            success: (res) => {
                                                if (res.authSetting['scope.writePhotosAlbum']) {
                                                    this.saveImage()
                                                }
                                            }
                                        })
                                    } else if (res.cancel) {
                                        wx.showToast({
                                            title: '保存失败',
                                            icon: 'none',
                                            duration: 2000
                                        })
                                    }
                                }
                            })
                        } else {
                            this.saveImage()
                        }
                    }
                })
            },
            saveImage(res) {
                wx.getImageInfo({
                    src: this.qr,
                    success: (res) => {
                        wx.saveImageToPhotosAlbum({
                            filePath: res.path,
                            success: () => {
                                wx.showToast({
                                    title: '保存成功',
                                    icon: 'none',
                                    duration: 2000
                                })
                            },
                            fail: () => {
                                wx.showToast({
                                    title: '保存失败',
                                    icon: 'none',
                                    duration: 2000
                                })
                            }
                        })
                    }
                })
            }
        }
    }
</script>
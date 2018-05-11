<style src="@/css/invite"></style>

<template>
    <div class="invite-wrapper">
        <div class="invite-content">
            <img :src="qr" mode="aspectFill">
        </div>

        <div id="daka-save" class="btn save-btn" @click="save">保存图片</div>
    </div>
</template>

<script>
    import {getInviteCard} from '@/api'

    export default {
        data() {
            return {
                qr: ''
            }
        },

        onLoad() {
            this.getInviteQR()
        },

        onShareAppMessage() {
            return {
                title: `${getApp().user.nickname}邀请你加入打卡计划`,
                path: '/pages/index/index'
            }
        },

        methods:{
            async getInviteQR() {
                const params = {
                    clockPID: + this.$root.$mp.query.id
                }

                const data = await getInviteCard(params)

                if (! data) {
                    return
                }

                if (data.flag === 1) {
                    this.qr = data.data.ImageUrl

                    return
                }
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
<style src="@/css/post"></style>

<template>
    <div class="post-wrapper">
        <div class="post-box">
            <h2>打卡项目名称</h2>
            <input type="text" placeholder="例：考研打卡群（必填 50 字以内）" focus="true" maxlength="50" v-model="title">
            <div class="post-img-wrapper">
                <img :src="postImage" class="selected" mode="aspectFill" v-if="postImage">
                <img :src="postImg" mode="aspectFill" v-else>
                <div class="post-input" @click="chooseImage">
                    <span>本地上传图片</span>
                </div>
            </div>
        </div>

        <div class="post-box">
            <h2>打卡详细描述</h2>
            <textarea v-model="detail" auto-height maxlength="300" :show-confirm-bar="false" placeholder="请输入详细描述（选填）"></textarea>
        </div>

        <div class="btn generation-plan" :class="{disabled: ! isDisabled}" @click="generationPlan" v-if="! generating">生成计划</div>
        <div class="btn generation-plan disabled" v-else>生成中...</div>
    </div>
</template>

<script>
    import api from '@/api'

    export default {
        data() {
            return {
                title: '',
                detail: '',

                postImg: '',
                postImage: '',

                generating: false
            }
        },

        computed: {
            isDisabled() {
                return this.title.trim()
            }
        },

        async onLoad() {
            const arr = ['http://oocffpuei.bkt.clouddn.com/FmG4MSRzdulpZCtJHuGKtSBXon8P', 'http://oocffpuei.bkt.clouddn.com/FpZmEjtse2nlTY5fhGXLGY2LvUy-', 'http://oocffpuei.bkt.clouddn.com/FvKzKmPpen_rEyQOqT_HBfAJHQxS', 'http://oocffpuei.bkt.clouddn.com/FoyIKF2GBSJvxMzZWZlmmfiB2R1x']

            this.postImg = arr[Math.floor(Math.random() * arr.length)]

            const app = getApp()

            if (wx.getStorageSync('qiniu')) {
                app.token = wx.getStorageSync('qiniu').data.token
                app.domain = wx.getStorageSync('qiniu').data.domain

                return
            }

            const data = await api.getQiNiuToken()

            if (data.flag !== 1) {
                wx.showModal({
                    title: '提示',
                    content: data.msg,
                    showCancel: false
                })

                return
            }

            const {token, domain} = data.data

            wx.setStorage({
                key: 'qiniu',
                data
            })

            app.token = token
            app.domain = domain
        },

        onUnload() {
            this.title = ''
            this.postImg = ''
            this.detail = ''
        },

        methods: {
            chooseImage() {
                const app = getApp()

                wx.chooseImage({
                    success: (res) => {
                        wx.uploadFile({
                            url: 'https://up.qbox.me',
                            filePath: res.tempFilePaths[0],
                            name: 'file',
                            formData: {
                                token: app.token
                            },
                            success: (res) => {
                                const data = JSON.parse(res.data)

                                if (res.statusCode !== 200) {
                                    wx.showModal({
                                        title: '错误',
                                        content: data.error,
                                        showCancel: false
                                    })

                                    return
                                }
                                this.postImage = `${app.domain}${data.key}`
                            }
                        })
                    }
                })
            },
            async generationPlan() {
                if (! this.title.trim().length) {
                    wx.showToast({
                        title: '请填写打卡项目名称',
                        icon: 'none',
                        duration: 2000
                    })

                    return
                }

                if (! this.postImg) {
                    wx.showToast({
                        title: '请选择封面图片',
                        icon: 'none',
                        duration: 2000
                    })

                    return
                }

                this.generating = true

                const params = {
                    planName: this.title,
                    description: this.detail,
                    cover: this.postImage || this.postImg
                }

                const data = await api.createDaKa(params)

                this.generating = false

                const app = getApp()

                app.isLearningPlanNumChange = true
                app.dakaList.unshift({
                    HasFinish: 0,
                    HasClock: 0,
                    ClockNum: 0,
                    IsJoin: 1,
                    ClockPID: data.data.id,
                    PlanName: this.title,
                    Cover: this.postImage || this.postImg,
                    Description: this.detail,
                    AvatarList: [{Avatar: wx.getStorageSync('user').avatar}]
                })

                wx.navigateBack({
                    delta: 1
                })
            }
        }
    }
</script>
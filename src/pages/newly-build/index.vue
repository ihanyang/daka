<style src="@/css/newly-build"></style>

<template>
    <div class="newly-build-wrapper">
        <div class="newly-build-box">
            <h2>打卡项目名称</h2>
            <input type="text" placeholder="例：考研打卡群（必填 50 字以内）" focus="true" maxlength="50" v-model.lazy="title">
            <div class="newly-build-img-wrapper">
                <img :src="newlyBuildImage" class="selected" mode="aspectFill" v-if="newlyBuildImage">
                <img :src="newlyBuildImg" mode="aspectFill" v-else>
                <div class="newly-build-input" @click="chooseImage">
                    <span>本地上传图片</span>
                </div>
            </div>
        </div>

        <div class="newly-build-box">
            <h2>打卡详细描述</h2>
            <textarea v-model.lazy="detail" auto-height maxlength="300" placeholder-class="placeholder" placeholder="请输入详细描述（选填 300 字以内）"></textarea>
        </div>

        <div class="newly-build-box">
            <h2>隐私设置</h2>
            <label @click="selectSecretType(0)">
                <i class="radio-btn" :class="{selected: secretType === 0}"></i>
                公开
                <span>允许任何人加入你的打卡小组</span>
            </label>
            <label @click="selectSecretType(1)">
                <i class="radio-btn" :class="{selected: secretType === 1}"></i>
                私密
                <span>小组成员只能通过组长邀请进入小组</span>
            </label>
        </div>

        <div class="generation-btn-wrapper">
            <!-- <div class="btn" @click="goAddContent">下一步：添加打卡内容</div> -->

            <template v-if="! generating">
                <div id="daka-generation" class="btn generation-btn" @click="generationPlan">生成计划</div>
            </template>
            <template v-else>
                <div class="btn generation-btn">生成中...</div>
            </template>
        </div>
    </div>
</template>

<script>
    import api from '@/api'

    export default {
        data() {
            return {
                title: '',
                detail: '',

                newlyBuildImg: '',
                newlyBuildImage: '',

                secretType: -1,

                generating: false
            }
        },

        computed: {
            isDisabled() {
                return this.title.trim()
            }
        },

        async onLoad() {
            const arr = ['http://jhsy-img.caizhu.com/daka/FmG4MSRzdulpZCtJHuGKtSBXon8P.gif', 'http://jhsy-img.caizhu.com/daka/FoyIKF2GBSJvxMzZWZlmmfiB2R1x.gif', 'http://jhsy-img.caizhu.com/daka/FpZmEjtse2nlTY5fhGXLGY2LvUy-.gif', 'http://jhsy-img.caizhu.com/daka/FvKzKmPpen_rEyQOqT_HBfAJHQxS.gif']

            this.newlyBuildImg = arr[Math.floor(Math.random() * arr.length)]

            this.getQiNiuToken()
        },

        onUnload() {
            this.title = ''
            this.newlyBuildImg = ''
            this.newlyBuildImage = ''
            this.detail = ''

            this.secretType = -1
        },

        methods: {
            async getQiNiuToken() {
                const app = getApp()

                if (app.qiniu) {
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

                app.qiniu = data.data
            },
            goAddContent() {
                if (! this.title.trim().length) {
                    wx.showToast({
                        title: '请填写打卡项目名称',
                        icon: 'none',
                        duration: 2000
                    })

                    return
                }

                if (this.secretType === -1) {
                    wx.showToast({
                        title: '请选择公开或者私密',
                        icon: 'none',
                        duration: 2000
                    })

                    return
                }

                const app = getApp()

                app.newlyBuild = {
                    title: this.title,
                    cover: this.newlyBuildImage || this.newlyBuildImg,
                    detail: this.detail,
                    secretType: this.secretType
                }

                wx.navigateTo({
                    url: '/pages/add-content/index'
                })
            },
            selectSecretType(value) {
                this.secretType = value
            },
            chooseImage() {
                const app = getApp()

                wx.chooseImage({
                    success: (res) => {
                        wx.uploadFile({
                            url: 'https://up.qbox.me',
                            filePath: res.tempFilePaths[0],
                            name: 'file',
                            formData: {
                                token: app.qiniu.token
                            },
                            success: (res) => {
                                const data = JSON.parse(res.data)

                                if (res.statusCode !== 200) {
                                    wx.showModal({
                                        title: '提示',
                                        content: data.error,
                                        showCancel: false
                                    })

                                    return
                                }

                                this.newlyBuildImage = `${app.qiniu.domain}${data.key}`
                            }
                        })
                    },
                    fail() {
                        wx.showToast({
                            title: '选择图片失败请重试',
                            icon: 'none',
                            duration: 2000
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

                if (this.secretType === -1) {
                    wx.showToast({
                        title: '请选择公开或者私密',
                        icon: 'none',
                        duration: 2000
                    })

                    return
                }

                this.generating = true

                const params = {
                    planName: this.title,
                    cover: this.newlyBuildImage || this.newlyBuildImg,
                    description: this.detail,
                    private: this.secretType,
                    planType: 1
                }

                const timer = setTimeout(() => {
                    wx.showLoading({
                        title: '努力生成中',
                        mask: true
                    })
                }, 1500)

                const data = await api.createDaKa(params)

                if (data.flag !== 1) {
                    wx.showModal({
                        title: '提示',
                        content: data.msg,
                        showCancel: false
                    })

                    return
                }

                this.generating = false

                const app = getApp()

                app.dakaPlanNum++
                app.dakaList.unshift({
                    HasFinish: 0,
                    HasClock: 0,
                    ClockNum: 0,
                    IsJoin: 1,
                    ClockPID: data.data.id,
                    PlanName: this.title,
                    Cover: this.newlyBuildImage || this.newlyBuildImg,
                    Description: this.detail,
                    AvatarList: [{Avatar: wx.getStorageSync('user').avatar}]
                })

                // 清除掉定时器
                clearTimeout(timer)

                wx.switchTab({
                    url: '/pages/index/index'
                })
            }
        }
    }
</script>
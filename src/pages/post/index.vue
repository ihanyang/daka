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
            <textarea v-model="detail" auto-height maxlength="300" placeholder-class="placeholder" placeholder="请输入详细描述（选填 300 字以内）"></textarea>
        </div>

        <div class="post-box">
            <h2>设置开始结束日期</h2>
            <label @click="selectSecretType(1)">
                <i class="radio-btn" :class="{selected: secretType === 1}"></i>
                公开
                <span>允许任何人加入你的打卡小组</span>
            </label>
            <label @click="selectSecretType(2)">
                <i class="radio-btn" :class="{selected: secretType === 2}"></i>
                私密
                <span>小组成员只能通过组长邀请进入小组</span>
            </label>
            <div class="post-date-box" v-if="isPostDateBoxShow">
                <div class="post-date-item">
                    <picker mode="date" :value="startDate" @change="startDateChange">
                        <p :class="{actived: startDate}" v-text="startDate || '开始日期'"></p>
                    </picker>
                </div>
                <div class="post-date-item">
                    <picker mode="date" :start="startDate" :value="endDate" @change="endDateChange">
                        <p :class="{actived: endDate}" v-text="endDate || '结束日期'"></p>
                    </picker>
                </div>
            </div>
        </div>

        <!-- <div id="daka-generation" class="btn generation-plan" :class="{disabled: ! isDisabled}" @click="generationPlan" v-if="! generating">生成计划</div>
        <div class="btn generation-plan disabled" v-else>生成中...</div> -->

        <div class="generation-btn-wrapper">
            <div class="btn" @click="goAddContent">下一步：添加打卡内容</div>

            <template v-if="! generating">
                <div class="btn generation-btn" @click="generationPlan">直接生成计划</div>
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

                postImg: '',
                postImage: '',

                secretType: 1,

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
            this.postImage = ''
            this.detail = ''
        },

        methods: {
            goAddContent() {
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
                                token: app.token
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

                                this.postImage = `${app.domain}${data.key}`
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

                this.generating = true

                const params = {
                    planName: this.title,
                    cover: this.postImage || this.postImg,
                    description: this.detail,
                    secretType: this.secretType
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
                    Cover: this.postImage || this.postImg,
                    Description: this.detail,
                    AvatarList: [{Avatar: wx.getStorageSync('user').avatar}]
                })

                // 清楚掉定时器
                clearTimeout(timer)

                wx.switchTab({
                    url: '/pages/index/index'
                })
            }
        }
    }
</script>
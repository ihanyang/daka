<style src="@/css/newly-build"></style>

<template>
    <div class="newly-build-wrapper">
        <div class="newly-build-box">
            <h2>打卡项目名称</h2>
            <input type="text" placeholder="例：考研打卡群（必填 50 字以内）" focus="true" maxlength="50" v-model.lazy="title">
            <div class="newly-build-img-wrapper">
                <img :src="newlyBuildImage" class="selected" mode="aspectFill" v-if="newlyBuildImage">
                <img :src="newlyBuildImg" mode="aspectFill" v-else>
                <div class="newly-build-input" @click="chooseImageCover">
                    <span>本地上传图片</span>
                </div>
            </div>
        </div>

        <div class="newly-build-box">
            <h2>打卡详细描述</h2>
            <textarea v-model.lazy="detail" @input="input" :show-confirm-bar="false" :maxlength="maxlength" placeholder-class="placeholder" placeholder="请输入详细描述（选填 1000 字以内）"></textarea>
        </div>

        <div class="newly-build-box">
            <div class="preview-image" v-if="previewImages.length">
                <div class="n-image-wrapper" :key="item" v-for="(item, index) of previewImages">
                    <span class="del" @click="deleteImage(index)"></span>
                    <img :src="item" mode="aspectFill">
                </div>

                <!-- <div class="n-image-wrapper resume-add-image" @click="chooseImage" v-if="previewImages.length < 9"></div> -->
            </div>
            <div class="add-image" @click="chooseImage" v-if="previewImages.length < 10">
                <div class="add-image-icon">添加图片</div>
            </div>
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
    import {getQiNiuToken, addNewDaka} from '@/api'

    export default {
        data() {
            return {
                title: '',
                detail: '',

                maxlength: -1,

                newlyBuildImg: '',
                newlyBuildImage: '',

                previewImages: [],

                secretType: -1,

                generating: false
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
            this.previewImages = []
        },

        methods: {
            chooseImage() {
                const app = getApp()

                wx.chooseImage({
                    success: (res) => {
                        this.previewImages = [... this.previewImages, ... res.tempFilePaths].slice(0, 9)
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
            deleteImage(index) {
                this.previewImages.splice(index, 1)
            },
            input(e) {
                const value = e.mp.detail.value

                if (value.length > 1000) {
                    this.maxlength = 1000

                    wx.showToast({
                        title: '内容过长，最多1000字',
                        icon: 'none'
                    })
                }

                this.detail = value.slice(0, 1000)
            },
            async getQiNiuToken() {
                const app = getApp()

                if (app.qiniu) {
                    return
                }

                const data = await getQiNiuToken()

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
                if (! this.title.trim()) {
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
            chooseImageCover() {
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
            uploadImage() {
                const app = getApp()
                const p = this.previewImages.map((item) => {
                    return new Promise((resolve, reject) => {
                        wx.uploadFile({
                            url: 'https://up.qbox.me',
                            filePath: item,
                            name: 'file',
                            formData: {
                                token: app.qiniu.token
                            },
                            success: (res) => {
                                const data = JSON.parse(res.data)

                                if (res.statusCode !== 200) {
                                    wx.showModal({
                                        title: '提示',
                                        content: '上传失败',
                                        showCancel: false
                                    })

                                    reject()

                                    return
                                }

                                resolve(`${app.qiniu.domain}${data.key}`)
                            }
                        })
                    })
                })

                return Promise.all(p)
            },
            addNewDakaWX(params) {
                ///api/clock/addPlan

                params.session = getApp().session

                return new Promise((resolve, reject) => {
                    wx.request({
                        url: (process.env.NODE_ENV === 'production' ? 'https://api.jinghao.com' : 'http://jhtest.jinghao.com') + '/api/clock/addPlan',
                        method: 'POST',
                        data: params,
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success({data}) {
                            resolve(data)
                        },
                        fail() {
                            wx.showModal({
                                title: '提示',
                                content: '生成计划失败'
                            })
                        }
                    })
                })
            },
            async generationPlan() {
                if (! this.title.trim()) {
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

                const imagesURL = await this.uploadImage()
                const a = imagesURL.map((item) => ({MediaUrl: item, Width: 0, Height: 0}))

                const params = {
                    planName: this.title,
                    cover: this.newlyBuildImage || this.newlyBuildImg,
                    description: this.detail,
                    private: this.secretType,
                    planType: 1,
                    //descImages: a
                }

                a.forEach((item, index) => {
                    params[`descImages[${index}][MediaUrl]`] = item.MediaUrl
                    params[`descImages[${index}][Width]`] = item.Width
                    params[`descImages[${index}][Height]`] = item.Height
                })

                const data = await this.addNewDakaWX(params)

                if (data.flag !== 1) {
                    wx.showModal({
                        title: '提示',
                        content: data.msg,
                        showCancel: false
                    })

                    return
                }

                this.generating = false

                this.$store.commit('setDakaPlanNum', ++ this.$store.state.dakaPlanNum)
                this.$store.commit('setDakaList', [{
                    HasFinish: 0,
                    HasClock: 0,
                    ClockNum: 0,
                    IsJoin: 1,
                    JoinNum: 1,
                    ClockPID: data.data.id,
                    PlanName: this.title,
                    Cover: this.newlyBuildImage || this.newlyBuildImg,
                    Description: this.detail,
                    AvatarList: [{Avatar: getApp().user.avatar}]
                }, ... this.$store.state.dakaList])

                wx.switchTab({
                    url: '/pages/index/index'
                })
            }
        }
    }
</script>
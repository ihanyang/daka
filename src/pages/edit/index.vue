<style src="@/css/newly-build"></style>
<style>
.edit-btn {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    color: #22CDCB;
    font-size: 15px;
    line-height: 60px;
    box-shadow: 0 0 15px rgba(46, 217, 208, .2);
    background-color: #FFF;
}
</style>

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
            <textarea v-model.lazy="detail" auto-height maxlength="1000" placeholder-class="placeholder" placeholder="请输入详细描述（选填 1000 字以内）"></textarea>
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

        <div class="btn edit-btn" @click="save">保存修改</div>
    </div>
</template>

<script>
    import {getDetailData, getQiNiuToken, editDetailData} from '@/api'

    export default {
        data() {
            return {
                title: '',
                detail: '',

                newlyBuildImg: '',
                newlyBuildImage: '',

                previewImages: [],

                secretType: -1,

                generating: false
            }
        },

        computed: {
            isDisabled() {
                return this.title.trim()
            }
        },

        onLoad() {
            const arr = ['http://jhsy-img.caizhu.com/daka/FmG4MSRzdulpZCtJHuGKtSBXon8P.gif', 'http://jhsy-img.caizhu.com/daka/FoyIKF2GBSJvxMzZWZlmmfiB2R1x.gif', 'http://jhsy-img.caizhu.com/daka/FpZmEjtse2nlTY5fhGXLGY2LvUy-.gif', 'http://jhsy-img.caizhu.com/daka/FvKzKmPpen_rEyQOqT_HBfAJHQxS.gif']

            this.newlyBuildImg = arr[Math.floor(Math.random() * arr.length)]

            this.getDetail()
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
            uploadImage() {
                const app = getApp()
                const p = this.previewImages.filter((item) => {
                    return item.indexOf('oocffpuei.bkt.clouddn.com') === -1
                }).map((item) => {
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
            async getDetail() {
                wx.showLoading({
                    title: '正在加载'
                })

                const params = {
                    clockPID: this.$root.$mp.query.id
                }

                const data = await getDetailData(params)

                if (! data) {
                    return
                }

                this.title = data.data.PlanName
                this.detail = data.data.Description
                this.secretType = data.data.Private
                this.newlyBuildImage = data.data.Cover

                this.previewImages = data.data.DescImages.map((item) => item.MediaUrl)

                wx.hideLoading()
            },
            async getQiNiuToken() {
                const app = getApp()

                if (app.qiniu) {
                    return
                }

                const data = await getQiNiuToken()

                if (! data) {
                    return
                }

                app.qiniu = data.data
            },
            save() {
                if (this.$saveing) {
                    return
                }

                this.$saveing = true

                setTimeout(async () => {
                    if (! this.title.trim().length) {
                        wx.showToast({
                            title: '请填写打卡项目名称',
                            icon: 'none',
                            duration: 2000
                        })

                        this.$saveing = false

                        return
                    }

                    if (this.secretType === -1) {
                        wx.showToast({
                            title: '请选择公开或者私密',
                            icon: 'none',
                            duration: 2000
                        })

                        this.$saveing = false

                        return
                    }

                    let imagesURL = await this.uploadImage()


                    imagesURL = [... this.previewImages.filter((item) => item.indexOf('oocffpuei.bkt.clouddn.com') !== -1), ... imagesURL]

                    const a = imagesURL.map((item) => ({MediaUrl: item, Width: 0, Height: 0}))


                    const params = {
                        clockPID: this.$root.$mp.query.id,
                        planName: this.title,
                        cover: this.newlyBuildImage || this.newlyBuildImg,
                        description: this.detail,
                        private: this.secretType
                    }

                    a.forEach((item, index) => {
                        params[`descImages[${index}][MediaUrl]`] = item.MediaUrl
                        params[`descImages[${index}][Width]`] = item.Width
                        params[`descImages[${index}][Height]`] = item.Height
                    })

                    await editDetailData(params)

                    wx.showToast({
                        title: '修改成功',
                        icon: 'none'
                    })

                    this.$saveing = false

                    // 标记是否编辑过
                    getApp().isEdit = 2
                }, 500)
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
            }
        }
    }
</script>
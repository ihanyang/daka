<style src="@/css/post"></style>

<template>
    <div class="post-wrapper">
        <div class="post-box">
            <h2>打卡项目名称</h2>
            <input type="text" placeholder="例：考研打卡群（必填）" focus="true" maxlength="50" v-model="title">
            <div class="post-img-wrapper">
                <img :src="postImg" mode="aspectFill" :class="{selected: isSelectImg}">
                <div class="post-input" @click="chooseImage">
                    <span>本地上传图片</span>
                </div>
            </div>
        </div>

        <div class="post-box">
            <h2>打卡详细描述</h2>
            <textarea v-model="detail" auto-height maxlength="300" :show-confirm-bar="false" placeholder="请输入详细描述（选填）"></textarea>
        </div>

        <div class="post-box">
            <h2>设置开始结束日期</h2>
            <label @click="selectRadio(1)">
                <i class="radio-btn" :class="{selected: dateType === 1}"></i>
                长期打卡
            </label>
            <label @click="selectRadio(2)">
                <i class="radio-btn" :class="{selected: dateType === 2}"></i>
                设置打卡时间段
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

        <div class="btn generation-plan" :class="{disabled: ! isDisabled}" @click="generationPlan" v-if="! generating">生成计划</div>
        <div class="btn generation-plan disabled" v-else>生成中...</div>
    </div>
</template>

<script>
    //import postImg from '@/images/discover-icon.png'
    import api from '@/api'

    export default {
        data() {
            return {
                title: '',
                detail: '',
                postImg: '',

                dateType: -1,
                startDate: '',
                endDate: '',

                generating: false
            }
        },

        computed: {
            isPostDateBoxShow() {
                return this.dateType === 2
            },
            isSelectImg() {
                return ! this.postImg.startsWith('data')
            },
            isDisabled() {
                return this.title && this.postImg && this.dateType !== -1
            }
        },

        onUnload() {
            this.title = ''
            this.postImg = ''
            this.detail = ''

            this.dateType = -1
            this.startDate = ''
            this.endDate = ''
        },

        methods: {
            selectRadio(value) {
                this.dateType = value
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
                                this.postImg = `${app.domain}${JSON.parse(res.data).key}`
                            }
                        })
                    }
                })
            },
            startDateChange(e) {
                this.startDate = e.mp.detail.value
            },
            endDateChange(e) {
                this.endDate = e.mp.detail.value
            },
            async generationPlan() {
                this.generating = true

                const params = {
                    planName: this.title,
                    description: this.detail,
                    cover: this.postImg,
                    timeType: this.dateType
                }

                if (this.dateType === 2) {
                    params.startTime = this.startDate
                    params.stopTime = this.endDate
                }

                const data = await api.createDaKa(params)

                this.generating = false

                getApp().dakaList.unshift({
                    HasFinish: 0,
                    HasClock: 0,
                    ClockNum: 0,
                    ClockPID: data.data.id,
                    PlanName: this.title,
                    Cover: this.postImg,
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
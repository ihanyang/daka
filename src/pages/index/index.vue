<style src="@/css/home"></style>

<template>
    <div class="home-wrapper">

        <header class="home-header">
            <div class="user-info">
                <img class="avatar" :src="userInfo.avatar">
                <p v-text="userInfo.nickname"></p>
            </div>
            <div class="home-learn">
                <div class="home-learn-item">
                    <strong>{{learnHoursFormat}}</strong>
                    <p>累计学习时长</p>
                </div>
                <div class="home-learn-item">
                    <strong>{{dakaTimes}}天</strong>
                    <p>累计打卡天数</p>
                </div>
                <div class="home-learn-item">
                    <strong>{{learnPlan}}个</strong>
                    <p>学习计划</p>
                </div>
            </div>
        </header>

        <div class="btn create-daka-btn" :class="{dakaed: isDakaRecord}" @click="go" v-if="! isDakaRecord">创建我的打卡</div>
        <div class="daka-list-wrapper" v-else>
            <header>
                <h1>我的计划</h1>
                <div class="btn created-daka-btn" @click="go">创建我的打卡</div>
            </header>
            <ul>
                <daka-item :item="item" :index="index" :key="item.url" v-for="item of dakaList"></daka-item>
            </ul>
        </div>

        <div class="loading-scroll" v-if="loadingScroll"></div>

        <loading v-if="isLoading"></loading>
    </div>
</template>

<script>
    import dakaItem from '@/components/daka-item'
    import loading from '@/components/loading'

    import api from '@/api'

    export default {
        data() {
            return {
                isLoading: false,
                isLoaded: false,

                userInfo: {},

                isDakaRecord: false,
                isListLoaded: false,
                dakaList: [],

                learnHours: 0,
                dakaTimes: 0,
                learnPlan: 0,

                page: 1,

                loadingScroll: false
            }
        },

        components: {
            dakaItem,
            loading
        },

        computed: {
            learnHoursFormat() {
                let str
                const hours = 1 * 60 * 60
                const time = this.learnHours

                if (time < hours) {
                    str = `${Math.round(Math.max(1, time / 60))}分钟`
                }

                if (time % hours === 0) {
                    str = `${time / hours}小时`
                }

                if (time < 24 * hours) {
                    const h = ~~ (time / hours)

                    str = `${h}小时${Math.round(Math.max(1, (time - h * hours) / 60))}分钟`
                }

                if (time % (24 * hours) === 0) {
                    str = `${time / (hours * 24)}天`
                }

                if (time > 24 * hours && time % (24 * hours) !== 0) {
                    const day = ~~ (time / (24 * hours))
                    const h = ~~ ((time - (day * 24 * hours)) / hours)
                    const m = Math.round(Math.max(1, (time - ((day * 24 * hours) + (h * hours))) / 60))

                    //console.log(h)
                    const hourStr = `${h}小时`
                    const minuteStr = `${m}分钟`

                    str = `${day}天${h ? hourStr : ''}${m && ! h ? minuteStr : ''}`
                }

                if (time >= 30 * 24 * hours) {
                    const month = ~~ (time / (30 * 24 * hours))
                    const day = ~~ ((time - (month * 30 * 24 * hours)) / (24 * hours))

                    const monthStr = `${month}月`
                    const dayStr = `${day}天`

                    str = `${month}月${day ? dayStr : ''}`
                }

                return str
            }
        },

        async onLoad() {
            this.isDakaRecord = wx.getStorageSync('isDakaRecord')

            if (! this.isDakaRecord) {
                wx.switchTab({
                    url: '/pages/discover/index'
                })

                this.noAuthorize = true
            }
        },

        async onShow() {
            const app = getApp()

            if (app.isLearningPlanNumChange) {
                this.learnPlan++
                app.isLearningPlanNumChange = false
            }

            if (app.isDakaNumChange) {
                this.dakaTimes++
                app.isDakaNumChange = false
            }

            if (this.noAuthorize) {
                return
            }

            if (this.isLoaded) {
                return
            }

            this.isLoaded = true
            this.isLoading = true

            await this.getUserInfo()

            this.isLoading = false
        },

        onHide() {
            this.noAuthorize = false
        },

        onReachBottom() {
            this.scroll()
        },

        methods: {
            async getUserInfo() {
                wx.getUserInfo({
                    withCredentials: true,
                    success: async (res) => {
                        // 保存一个授权完成的标志 发现页面需要据此更新状态
                        wx.setStorage({
                            key: 'isAuthorization',
                            data: true
                        })

                        await api.saveUserInfo({
                            encryptedData: res.encryptedData,
                            iv: res.iv
                        })

                        const [userInfo] = await Promise.all([api.getHomeData(), this.getMyDaKaList()])

                        this.userInfo = {
                            avatar: userInfo.data.Avatar,
                            nickname: userInfo.data.Nickname
                        }

                        ! wx.getStorageSync('isDakaRecord') && wx.setStorage({
                            key: 'isDakaRecord',
                            data: true
                        })

                        wx.setStorage({
                            key: 'user',
                            data: this.userInfo
                        })

                        this.learnHours = userInfo.data.StudyTime
                        this.dakaTimes = userInfo.data.ClockDay
                        this.learnPlan = userInfo.data.PlanNum
                    },
                    fail: () => {
                        wx.showModal({
                            title: '用户拒绝授权',
                            content: '请重新授权',
                            showCancel: false,
                            success: () => {
                                wx.openSetting({
                                    success: () => {
                                        this.getUserInfo()
                                    }
                                })
                            }
                        })
                    }
                })
            },
            async getMyDaKaList() {
                const params = {
                    page: this.page,
                    pagesize: 10
                }

                const data = await api.getMyDaKaList(params)

                if (data.flag !== 1) {
                    wx.showModal({
                        title: '提示',
                        content: data.msg,
                        showCancel: false
                    })

                    return
                }

                this.page++
                this.isDakaRecord = !! data.data.Total

                data.data.Rows.forEach((item) => {
                    item.IsJoin = true
                })

                getApp().dakaList = [... this.dakaList, ... data.data.Rows]

                this.dakaList = getApp().dakaList

                this.isListLoaded =  this.dakaList.length === data.data.Total
            },
            go() {
                wx.navigateTo({
                    url: '/pages/post/index'
                })
            },
            async scroll() {
                this.loadingScroll = true

                ! this.isListLoaded && await this.getMyDaKaList()

                this.loadingScroll = false
            }
        }
    }
</script>
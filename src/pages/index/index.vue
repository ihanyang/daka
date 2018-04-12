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
                    <p>累计时长</p>
                </div>
                <div class="home-learn-item">
                    <strong>{{dakaTotalNum}}天</strong>
                    <p>累计打卡天数</p>
                </div>
                <div class="home-learn-item">
                    <strong>{{dakaPlanNum}}个</strong>
                    <p>打卡计划</p>
                </div>
            </div>
        </header>

        <div id="daka-create" class="btn create-daka-btn" :class="{dakaed: isDakaRecord}" @click="go" v-if="! isDakaRecord">创建我的打卡</div>
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
    import {sendTime, getDefaultAvatar} from '@/utils'

    export default {
        data() {
            return {
                isLoadedHomeData: false,
                isLoading: false,
                //isLoaded: false,

                userInfo: {},

                isDakaRecord: false,
                isListLoaded: false,
                dakaList: [],

                learnHours: 0,
                dakaTotalNum: 0,
                //learnPlan: 0,
                dakaPlanNum: 0,

                page: 1,

                loadingScroll: false
            }
        },

        components: {
            dakaItem,
            loading
        },

        computed: {
            // dakaPlanNum() {
            //     return getApp().dakaPlanNum
            // },
            // dakaList() {
            //     return getApp().dakaList
            // },
            learnHoursFormat() {
                let str
                const hours = 1 * 60 * 60
                const time = this.learnHours

                if (time < hours) {
                    str = `${Math.round(time / 60)}分钟`

                    return str
                }

                if (time % hours === 0) {
                    str = `${time / hours}小时`

                    return str
                }

                if (time < 24 * hours) {
                    const h = ~~ (time / hours)

                    str = `${h}小时${Math.round(Math.max(1, (time - h * hours) / 60))}分`

                    return str
                }

                if (time % (24 * hours) === 0) {
                    str = `${time / (hours * 24)}天`

                    return str
                }

                if (time > 24 * hours && time % (24 * hours) !== 0) {
                    const day = ~~ (time / (24 * hours))
                    const h = ~~ ((time - (day * 24 * hours)) / hours)
                    const m = Math.round(Math.max(1, (time - ((day * 24 * hours) + (h * hours))) / 60))

                    //console.log(h)
                    const hourStr = `${h}小时`
                    const minuteStr = `${m}分钟`

                    str = `${day}天${h ? hourStr : ''}${m && ! h ? minuteStr : ''}`

                    return str
                }

                if (time >= 30 * 24 * hours) {
                    const month = ~~ (time / (30 * 24 * hours))
                    const day = ~~ ((time - (month * 30 * 24 * hours)) / (24 * hours))

                    const monthStr = `${month}月`
                    const dayStr = `${day}天`

                    str = `${month}月${day ? dayStr : ''}`

                    return str
                }
            }
        },

        async onLoad() {



            this.isDakaRecord = wx.getStorageSync('isJoined')
            this.isDakaRecord = wx.getStorageSync('isDakaRecord')

            //console.log(this.isDakaRecord)

            if (! this.isDakaRecord) {
                //console.log(55)
                // this.isLoading = true

                // await this.getUserInfo()

                // this.isLoading = false

                wx.switchTab({
                    url: '/pages/discover/index'
                })

                this.noAuthorize = true
            }
        },

        async onShow() {
            console.log(this.isDakaRecord)
            const app = getApp()


            //console.log(app.dakaList.length)

            this.dakaList = app.dakaList
            this.dakaPlanNum = app.dakaPlanNum
            this.dakaTotalNum = app.dakaTotalNum

            this.isDakaRecord = app.dakaList.length
            //console.log(app.dakaList.length)


            // if (app.isLearningPlanNumChange) {
            //     this.learnPlan++
            //     app.isLearningPlanNumChange = false
            // }

            // if (app.isDakaNumChange) {
            //     this.dakaTimes++
            //     app.isDakaNumChange = false
            // }

            // 加入计划后自动更新

            // if (app.joins && app.joins.length) {
            //     this.learnPlan = + this.learnPlan + app.joins.length
            //     this.dakaList = [... app.joins, ... this.dakaList]

            //     app.joins = []
            // }

            if (this.noAuthorize) {
                return
            }

            // if (this.isLoaded) {
            //     return
            // }

            // this.isLoaded = true

            if (! this.isLoadedHomeData) {
                this.isLoading = true

                await this.getUserInfo()

                this.isLoading = false
                this.isLoadedHomeData = true

                wx.setStorageSync('isLoadedHomeData', true)
            }
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
                        wx.setStorageSync('isAuthorization', true)

                        await api.saveUserInfo({
                            encryptedData: res.encryptedData,
                            iv: res.iv
                        })

                        const [userInfo] = await Promise.all([api.getHomeData(), this.getMyDaKaList()])

                        this.userInfo = {
                            avatar: userInfo.data.Avatar || getDefaultAvatar(),
                            nickname: userInfo.data.Nickname
                        }

                        //! wx.getStorageSync('isDakaRecord') &&

                        wx.setStorage({
                            key: 'user',
                            data: this.userInfo
                        })

                        this.learnHours = userInfo.data.StudyTime

                        //console.log(userInfo)

                        const app = getApp()

                        app.dakaTotalNum = + userInfo.data.ClockDay
                        app.dakaPlanNum = + userInfo.data.PlanNum

                        this.dakaTotalNum = app.dakaTotalNum
                        this.dakaPlanNum = app.dakaPlanNum

                        if (app.dakaPlanNum) {
                            wx.setStorage({
                                key: 'isDakaRecord',
                                data: true
                            })
                        }
                    },
                    fail: () => {
                        const flag = wx.getStorageSync('flag')

                        if (flag) {
                            wx.removeStorageSync('flag')

                            wx.switchTab({
                                url: '/pages/discover/index'
                            })
                        } else {
                            wx.showModal({
                                content: '为了保障您能正常使用，请您在接下来的微信授权中点击【允许】',
                                showCancel: false,
                                confirmText: '下一步',
                                success: (res) => {
                                    //if (res.confirm) {
                                        wx.setStorageSync('flag', true)

                                        wx.openSetting({
                                            success: () => {
                                                this.getUserInfo()
                                            }
                                        })
                                    //}
                                }
                            })
                        }
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

                // const ids = data.data.Rows.map((item) => item.ClockPID)
                // const temp = this.dakaList.filter((item, index) => {
                //     if (ids.indexOf(item.ClockPID) !== -1) {
                //         return false
                //     }

                //     return true
                // })

                // getApp().dakaList = [... temp, ... data.data.Rows]

                // this.dakaList = getApp().dakaList
                //console.log(getApp().aa)
                 //console.log(getApp().dakaList)
                //getApp().dakaList = [... getApp().dakaList, ... data.data.Rows]
                const app = getApp()

                app.dakaPlanNum = data.data.Total
                app.dakaList.push(... data.data.Rows)


                //console.log(this.dakaList)
                //console.log(getApp().dakaList)

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
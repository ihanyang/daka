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

        <form @submit="submit" :report-submit="true" v-if="loaded && ! isDakaRecord && ! checkStatus">
            <button form-type="submit" id="daka-create" class="btn create-daka-btn" :class="{dakaed: isDakaRecord}">创建我的打卡</button>
        </form>


        <div class="daka-list-wrapper" v-else>
            <header>
                <h1>我的计划</h1>
                <!-- <div class="btn created-daka-btn" @click="go">创建我的打卡</div> -->
                <form @submit="submit" :report-submit="true" v-if="loaded && ! checkStatus">
                    <button form-type="submit" id="daka-create" class="btn created-daka-btn">创建我的打卡</button>
                </form>
            </header>
            <ul>
                <daka-item :item="item" :index="index" :key="item.ClockPID" v-for="item of dakaList"></daka-item>
            </ul>
        </div>

        <auth v-if="authModalStatus" @userInfoHandler="userInfoHandler"></auth>

        <div class="loading-scroll" v-if="loadingScroll"></div>
    </div>
</template>

<script>
    import auth from '@/components/auth'
    import dakaItem from '@/components/daka-item'
    import loading from '@/components/loading'

    import {getCheckStatus, addFormId, getHomeData, getHomeDaKaList} from '@/api'
    import {login, sendTime, getDefaultAvatar} from '@/utils'

    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                loaded: false,
                authModalStatus: false,
                checkStatus: false,

                userInfo: {},
                learnHours: 0,

                isLoadedHomeData: false,

                page: 1,
                isListLoaded: false,
                loadingScroll: false
            }
        },

        components: {
            auth,
            dakaItem,
            loading
        },

        computed: {
            ... mapState(['dakaList', 'dakaTotalNum', 'dakaPlanNum']),

            isDakaRecord() {
                return this.dakaList.length
            },

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

        async onShow() {
            wx.setNavigationBarTitle({
                title: '打卡'
            })

            if (! wx.getStorageSync('isDiscovered')) {
                return
            }

            const app = getApp()

            // if (app.session) {
            //     if (! this.loaded) {
            //         this.userInfoHandler()
            //     }
            // } else {
            //     //await this.getUserInfo()
            //     this.userInfoHandler()
            // }

            if (! this.loaded) {
                this.userInfoHandler()
            }

            if (app.isEdit === 1) {
                app.isEdit = 0
                // wx.startPullDownRefresh()
                // return

                this.page = 1

                this.getMyDaKaList(1)

                return
            }

            // 更新状态
            let index = -1

            app.item && this.dakaList.forEach((item, i) => {
                if (item.ClockPID === app.item.ClockPID) {
                    index = i
                }
            })

            index !== -1 && (this.dakaList[index] = app.item)

            app.item = null
        },

        onReachBottom() {
            this.scroll()
        },
        onPullDownRefresh() {
            this.page = 1

            // 去掉全局的 loading
            getApp().isShowLoading = true

            Promise.all([this.getHomeData(), this.getMyDaKaList(true)]).catch((e) => {
                console.error(e)
            })
        },

        onHide() {
            this.authModalStatus = false
        },

        methods: {
            async check() {
                const params = {
                    flag: 'clock'
                }

                const data = await getCheckStatus(params)

                if (! data) {
                    return
                }

                if (data.flag === 1) {
                    if (+ data.data.status01 === 1) {
                        this.checkStatus = false
                    } else {
                        this.checkStatus = true
                    }
                }
            },
            submit(e) {
                this.sendFormId(e.target.formId)

                this.go()
            },
            sendFormId(id) {
                const params = {
                    formId: id,
                    type: 1
                }

                addFormId(params)
            },
            userInfoHandler() {
                this.authModalStatus = false

                Promise.all([this.check(), this.getHomeData(), this.getMyDaKaList()]).then(() => {
                    this.loaded = true
                }).catch(async (e) => {
                    //this.loaded = true

                    if (e.code === -100) {
                        await login()

                        this.authModalStatus = true
                    }

                    console.error(e)
                })

                wx.setStorageSync('isLoadedHomeData', true)
            },
            async getUserInfo() {
                await login()

                this.authModalStatus = true
                //await this.getUserInfoWX()
            },
            getUserInfoWX() {
                return new Promise((resolve, reject) => {
                    wx.getUserInfo({
                        withCredentials: true,
                        success: async (res) => {
                            // 保存一个授权完成的标志 发现页面需要据此更新状态
                            wx.setStorageSync('isAuthorization', true)

                            const data = await api.saveUserInfo({
                                encryptedData: res.encryptedData,
                                iv: res.iv
                            })

                            resolve()
                        },
                        fail: () => {
                            if (this.$sqFlag) {
                                this.$sqFlag = false

                                wx.switchTab({
                                    url: '/pages/discover/index'
                                })
                            } else {
                                wx.showModal({
                                    content: '为了保障您能正常使用，请您在接下来的微信授权中点击【允许】',
                                    showCancel: false,
                                    confirmText: '下一步',
                                    success: (res) => {
                                        this.$sqFlag = true

                                        wx.openSetting({
                                            success: () => {
                                                this.getUserInfo().then(() => {
                                                    this.getHomeData()
                                                })
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    })
                })
            },
            async getHomeData() {
                const data = await getHomeData()

                if (! data) {
                    return
                }

                this.userInfo = {
                    avatar: data.data.Avatar || getDefaultAvatar(),
                    nickname: data.data.Nickname
                }

                getApp().user = this.userInfo

                this.learnHours = data.data.StudyTime

                this.$store.commit('setDakaTotalNum', + data.data.ClockDay)
                this.$store.commit('setDakaPlanNum', + data.data.PlanNum)
            },
            async getMyDaKaList(flag) {
                const params = {
                    page: this.page,
                    pagesize: 10
                }

                const data = await getHomeDaKaList(params)

                if (! data) {
                    return
                }

                if (flag) {
                    this.$store.commit('setDakaList', [])

                    wx.stopPullDownRefresh()
                }

                this.page++

                data.data.Rows.forEach((item) => {
                    item.IsJoin = true
                })

                this.$store.commit('setDakaList', [... this.$store.state.dakaList, ... data.data.Rows])

                this.isListLoaded =  this.dakaList.length === data.data.Total
            },
            go() {
                wx.navigateTo({
                    url: '/pages/newly-build/index'
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
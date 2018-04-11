<style src="@/css/detail"></style>

<template>
    <div class="detail-wrapper">
        <header class="detail-header">
            <p>已坚持打卡（天）</p>
            <strong v-text="day"></strong>

            <p v-if="isComplete">共有{{totalDaKa}}人完成打卡</p>
            <p v-else>今日已有{{todayDaKa}}人打卡</p>

            <div class="detail-avatar-list">
                <img :key="item.Avatar" :src="item.Avatar || defaultAvatar" v-for="item of avatarList">
            </div>
            <div class="invite-btn" v-if="isShowInviteBtn" @click="showActionSheet"></div>
        </header>

        <template v-if="isJoin">
            <template v-if="isComplete">
                <div class="btn daka-btn disabled">已完成</div>
            </template>
            <template v-else>
                <div class="btn daka-btn disabled" v-if="isDaKa">已打卡</div>
                <div class="btn daka-btn" @click="daka" v-else>打卡</div>
            </template>
        </template>
        <template v-else>
            <div class="btn daka-btn" @click="dakaPrompt">打卡</div>
        </template>

        <div class="detail-intro">
            <p :class="{'line-overflow': isShrink && isLongIntro}" v-text="intro"></p>
            <div class="btn" @click="spread" v-if="isShrink && isLongIntro">展开</div>
            <div class="btn" @click="shrink" v-if="isLongIntro && taped">收起</div>
        </div>

        <button open-type="share"></button>

        <div class="btn join-btn" v-if="! isJoin" @click="join">加入该小组</div>

        <action-sheet @cancel="shareModalStatus = false" v-if="shareModalStatus"></action-sheet>
    </div>
</template>

<script>
    import actionSheet from '@/components/action-sheet'

    import api from '@/api'
    import {sendTime, getDefaultAvatar} from '@/utils'

    export default {
        data() {
            return {
                day: 0,
                todayDaKa: 0,
                avatarList: [],
                intro: '',

                totalDaKa: 0,
                isShrink: true,
                taped: false,

                isDaKaing: false,
                isComplete: false,
                isDaKa: false,
                isJoin: false,

                shareModalStatus: false
            }
        },

        components: {
            actionSheet
        },

        computed: {
            isLongIntro() {
                return this.intro.length > 40
            },
            isShowInviteBtn() {
                return this.isJoin && ! this.isComplete
            },
            defaultAvatar() {
                return getDefaultAvatar()
            }
        },

        onLoad() {
            const {item} = getApp()

            if (item) {
                this.isJoin = item.IsJoin
                this.isDaKa = item.HasClock
                this.isComplete = item.HasFinish
                this.todayDaKa = item.ClockNum
                this.avatarList = item.AvatarList

                wx.setNavigationBarTitle({
                    title: item.PlanName.length > 20 ? `${item.PlanName.slice(0, 20)}...` : item.PlanName
                })
            }

            this.getDetailData()
        },

        onShow() {
            const app = getApp()

            if (! app.enterTime) {
                app.enterTime = + new Date()
            }
        },

        onUnload() {
            this.clear()

            if (wx.getStorageSync('isAuthorization')) {
                sendTime()
            }
        },

        onShareAppMessage(res) {
            return {
                title: `${wx.getStorageSync('user').nickname}邀请你加入打卡计划#${getApp().planName}#`,
                path: `/pages/detail/index?id=${this.$root.$mp.query.id}`
            }
        },

        methods: {
            spread() {
                this.isShrink = false
                this.taped = true
            },
            shrink() {
                this.isShrink = true
                this.taped = false
            },
            async getDetailData() {
                wx.getUserInfo({
                    withCredentials: true,
                    success: async (res) => {
                        // 保存一个授权完成的标志 发现页面需要据此更新状态
                        wx.setStorage({
                            key: 'isAuthorization',
                            data: true
                        })

                        wx.showLoading({
                            title: '正在加载',
                            mask: true
                        })

                        await api.saveUserInfo({
                            encryptedData: res.encryptedData,
                            iv: res.iv
                        })

                        const params = {
                            clockPID: this.$root.$mp.query.id
                        }

                        const data = await api.getDetailData(params)

                        wx.hideLoading()

                        if (data.flag !== 1) {
                            wx.showModal({
                                title: '错误',
                                content: data.msg
                            })

                            return
                        }

                        this.day = data.data.ClockDay
                        this.todayDaKa = data.data.TodayClockNum
                        this.totalDaKa = data.data.TotalJoinNum
                        this.avatarList = data.data.AvatarList
                        this.intro = data.data.Description

                        // 获取详情之后需要再次设置，因为第一次进入时可能没授权
                        this.isJoin = data.data.HasJoin
                        this.isDaKa = data.data.HasClock
                        this.isComplete = data.data.HasFinish

                        getApp().planName = data.data.PlanName

                        wx.setNavigationBarTitle({
                            title: data.data.PlanName.length > 20 ? `${data.data.PlanName.slice(0, 20)}...` : data.data.PlanName
                        })
                    },
                    fail: () => {
                        wx.showModal({
                            content: '为了保障您能正常使用，请您在接下来的微信授权中点击【允许】',
                            showCancel: false,
                            confirmText: '下一步',
                            success: (res) => {
                                if (res.confirm) {
                                    wx.openSetting({
                                        success: () => {
                                            this.getDetailData()
                                        }
                                    })
                                }
                            }
                        })
                    }
                })
            },
            async daka() {
                const params = {
                    clockPID: this.$root.$mp.query.id
                }

                this.isDaKa = true

                const data = await api.daka(params)

                if (data.flag !== 1) {
                    this.isDaKa = false

                    wx.showToast({
                        title: data.msg,
                        icon: 'none',
                        duration: 2000
                    })

                    return
                }

                this.day++

                this.todayDaKa = data.data.TodayClockNum

                const app = getApp()

                app.item.HasClock = 1
                app.item.ClockNum++

                wx.showToast({
                    title: '加油，你离梦想又近了一步！',
                    icon: 'none',
                    duration: 2000
                })

                // 首页累计打卡天数自动更新

                const dakaDate = wx.getStorageSync('dakaDate')
                const date = new Date()
                const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

                if (! dakaDate || dakaDate !== dateString) {
                    app.isDakaNumChange = true

                    wx.setStorage({
                        key: 'dakaDate',
                        data: dateString
                    })
                }
            },
            async join() {
                const params = {
                    clockPID: + this.$root.$mp.query.id
                }

                const data = await api.joinGroup(params)

                if (data.flag !== 1) {
                    wx.showToast({
                        title: data.msg,
                        icon: 'none',
                        duration: 2000
                    })

                    return
                }

                this.isJoin = true

                if (this.avatarList.length < 3) {
                    this.avatarList.unshift({
                        Avatar: wx.getStorageSync('user').avatar
                    })
                } else {
                    this.avatarList = [{
                        Avatar: wx.getStorageSync('user').avatar
                    }, ... this.avatarList.slice(0, 2)]
                }

                const app = getApp()

                app.item.IsJoin = 1

                if (app.item.AvatarList.length < 3) {
                    app.item.AvatarList.unshift({
                        Avatar: wx.getStorageSync('user').avatar
                    })
                } else {
                    app.item.AvatarList = [{
                        Avatar: wx.getStorageSync('user').avatar
                    }, ... app.item.AvatarList.slice(0, 2)]
                }

                if (! app.joins) {
                    app.joins = []
                }

                app.joins.push(app.item)

                //getApp().joins.push(getApp().item)


                wx.showToast({
                    title: '加入成功',
                    icon: 'none',
                    duration: 2000
                })
            },
            dakaPrompt() {
                wx.showToast({
                    title: '加入小组后才可打卡哟',
                    icon: 'none',
                    duration: 2000
                })
            },
            showActionSheet() {
                this.shareModalStatus = true
                return

                wx.showActionSheet({
                    itemList: ['分享给朋友', '生成卡片 保存分享'],
                    success(res) {
                        console.log(res.tapIndex)
                    }
                })
            },
            clear() {
                this.day = 0
                this.todayDaKa = 0
                this.intro = ''
                this.avatarList = []

                this.taped = false
                this.isShrink = true
                this.isJoin = false
                this.isComplete = false
                this.isDaKa = false
                this.isDaKaing = false
                this.shareModalStatus = false
            }
        }
    }
</script>
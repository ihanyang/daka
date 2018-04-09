<style src="@/css/detail"></style>

<template>
    <div class="detail-wrapper">
        <header class="detail-header">
            <p>已坚持打卡（天）</p>
            <strong v-text="day"></strong>

            <p v-if="isComplete">共有{{totalDaKa}}人完成打卡</p>
            <p v-else>今日已有{{todayDaKa}}人打卡</p>

            <div class="detail-avatar-list">
                <img :key="item.Avatar" :src="item.Avatar" v-for="item of avatarList">
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
            <div class="btn" @click="isShrink = false" v-if="isShrink && isLongIntro">展开</div>
        </div>

        <button open-type="share"></button>

        <div class="btn join-btn" v-if="! isJoin" @click="join">加入该小组</div>

        <action-sheet @cancel="shareModalStatus = false" v-if="shareModalStatus"></action-sheet>
    </div>
</template>

<script>
    import actionSheet from '@/components/action-sheet'

    import api from '@/api'

    export default {
        data() {
            return {
                day: 0,
                todayDaKa: 0,
                avatarList: [],
                intro: '',

                totalDaKa: 0,
                isShrink: true,

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
            }
        },

        onLoad() {
            this.getDetailData()
        },
        onUnload() {
            this.clear()
        },

        onShareAppMessage(res) {
            return {
                title: `${wx.getStorageSync('user').nickname}邀请你加入打卡计划`,
                path: '/pages/index/index'
            }
        },

        methods: {
            async getDetailData() {
                wx.getUserInfo({
                    withCredentials: true,
                    success: async (res) => {
                        await api.saveUserInfo({
                            encryptedData: res.encryptedData,
                            iv: res.iv
                        })

                        const params = {
                            clockPID: this.$root.$mp.query.id
                        }

                        wx.showLoading({
                            title: '正在加载',
                            mask: true
                        })

                        const data = await api.getDetailData(params)

                        wx.hideLoading()
                        wx.setNavigationBarTitle({
                            title: data.data.PlanName
                        })

                        this.day = data.data.ClockDay
                        this.todayDaKa = data.data.TodayClockNum
                        this.totalDaKa = data.data.TotalJoinNum
                        this.avatarList = data.data.AvatarList
                        this.intro = data.data.Description
                        this.isJoin = data.data.HasJoin
                        this.isDaKa = data.data.HasClock
                        this.isComplete = data.data.HasFinish

                    },
                    fail: () => {
                        wx.showModal({
                            title: '用户拒绝授权',
                            content: '请重新授权',
                            showCancel: false,
                            success: () => {
                                wx.openSetting({
                                    success: () => {
                                        this.getDetailData()
                                    }
                                })
                            }
                        })
                    }
                })



            },
            async daka() {
                const params = {
                    clockPID: this.$root.$mp.query.id
                }

                const data = await api.daka(params)

                if (data.flag === 1) {
                    this.day++
                    this.isDaKa = true
                    this.todayDaKa = data.data.TodayClockNum

                    const app = getApp()
                    const dakaList = app.dakaList
                    const index = app.index

                    dakaList[index].HasClock = 1
                    dakaList[index].ClockNum++

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
                }
            },
            async join() {
                const params = {
                    clockPID: +this.$root.$mp.query.id
                }

                const data = await api.joinGroup(params)

                if (data.flag === 1) {
                    this.isJoin = true

                    wx.showToast({
                        title: '加入成功',
                        icon: 'none',
                        duration: 2000
                    })
                }
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

                this.isJoin = false
                this.isComplete = false
                this.isDaKa = false
                this.isDaKaing = false
            }
        }
    }
</script>
<style src="@/css/detail"></style>

<template>
    <div class="detail-wrapper" :class="{a: ! isJoin && ! joining}">
        <template v-if="todayCover">
            <header class="detail-header" v-if="isDaKa">
                <p>已坚持打卡（天）</p>
                <strong v-text="day"></strong>

                <p v-if="isComplete">共有{{totalDaKa}}人完成打卡</p>
                <p v-else>今日已有{{todayDaKa}}人打卡</p>

                <div class="detail-avatar-list">
                    <img :key="item.Avatar" :src="item.Avatar || defaultAvatar" v-for="item of avatarList">
                </div>
                <div id="daka-invite" class="invite-btn" v-if="isShowInviteBtn" @click="showActionSheet"></div>
            </header>

            <header class="detail-header-complete" v-else>
                <div class="detail-header-book" @click="goChapterDetail(todayID, 1)">
                    <img :src="todayCover" mode="aspectFill">
                    <div class="detail-header-book-info">
                        <h3 v-text="todayTitle"></h3>
                        <p v-text="todayAuthor"></p>
                    </div>
                    <div class="tips">今日任务</div>
                </div>
                <div id="daka-invite" class="invite-btn" v-if="isShowInviteBtn" @click="showActionSheet"></div>
            </header>
        </template>
        <template v-else>
            <header class="detail-header">
                <p>已坚持打卡（天）</p>
                <strong v-text="day"></strong>

                <p v-if="isComplete">共有{{totalDaKa}}人完成打卡</p>
                <p v-else>今日已有{{todayDaKa}}人打卡</p>

                <div class="detail-avatar-list">
                    <img :key="item.Avatar" :src="item.Avatar || defaultAvatar" v-for="item of avatarList">
                </div>
                <div id="daka-invite" class="invite-btn" v-if="isShowInviteBtn" @click="showActionSheet"></div>
            </header>
        </template>

        <template v-if="isJoin">
            <template v-if="isComplete">
                <div class="btn daka-btn disabled">已完成</div>
            </template>
            <template v-else>
                <div class="btn daka-btn disabled" v-if="isDaKa">已打卡</div>

                <form @submit="submit" :report-submit="true" v-else>
                    <button form-type="submit" id="daka-daka" class="btn daka-btn">打卡</button>
                </form>
                <!-- <div id="daka-daka" class="btn daka-btn" @click="forDaka" v-else>打卡</div> -->
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

        <div class="new-messages" @click="goMessage" v-if="newMessagesNum">
            <img :src="newMessagesAvatar" mode="aspectFill">
            你有{{newMessagesNum}}条消息
        </div>

        <div class="detail-tab">
            <div class="detail-tab-item" :class="{selected: index === 0}" @click="index = 0">打卡心得</div>
            <div class="detail-tab-item" :class="{selected: index === 1}" @click="index = 1" v-if="isShowTable">课程表</div>
        </div>
        <div class="experience-list" v-if="index === 0">
            <experience-item :key="item.PostID" :item="item" v-for="item of experienceList"></experience-item>
        </div>
        <p class="no-data" v-if="index === 0 && ! experienceList.length">暂无打卡心得</p>

        <template v-if="index === 1">
            <div class="resume-add-content-btn" @click="goAddContent" v-if="iszu">
                <span class="add-icon"></span>
                添加内容
            </div>
            <div class="syllabus-list">
                <div class="syllabus-item" :key="item.Title" v-for="item of syllabusList">
                    <div class="syllabus-content">
                        <img :src="item.Cover" mode="aspectFill">
                        <div class="syllabus-info">
                            <h2 v-text="item.Title"></h2>
                            <span v-text="item.Author"></span>
                            <p class="line-overflow" v-text="item.Abstract"></p>
                        </div>
                    </div>

                    <!-- <div class="syllabus-chapter actived" :key="item.SECID" v-text="item.Title" v-if="item.Unlock === 0"></div> -->
                    <div class="syllabus-chapter" :class="{actived: item.Unlock === 0}" :key="item.SECID" v-text="item.Title" @click="goChapterDetail(item.SECID, 1, item.Unlock)" v-for="(item, $ii) of item.ChapterList"></div>
                </div>
            </div>
        </template>

        <!-- <div id="daka-join" class="btn join-btn" v-if="! isJoin && ! joining" @click="join">加入该小组</div> -->
        <form @submit="submitJoin" :report-submit="true" v-if="! isJoin && ! joining">
            <button form-type="submit" id="daka-join" class="btn join-btn">加入该小组</button>
        </form>

        <div class="btn join-btn" v-if="joining">加入中...</div>

        <div class="go-home" v-if="isShowHome" @click="goHome"></div>

        <!-- <div class="post-comment-btn" v-if="isShowPostBtn" @click="goPost"></div> -->
        <form @submit="submitPost" :report-submit="true" v-if="isShowPostBtn">
            <button form-type="submit" class="post-comment-btn"></button>
        </form>

        <!-- <div class="reply-box" v-if="isShowReplyBox">
            <textarea v-model.lazy="replyContent" auto-height :show-confirm-bar="false" :auto-focus="true" maxlength="300" placeholder-class="placeholder" :placeholder="placeholder" @blur="blur"></textarea>
            <div @click="reply">发表</div>
        </div> -->

        <action-sheet @cancel="shareModalStatus = false" v-if="shareModalStatus"></action-sheet>

        <div class="loading-scroll" v-if="loadingScroll"></div>
    </div>
</template>

<script>
    import actionSheet from '@/components/action-sheet'
    import experienceItem from '@/components/experience-item'

    import api, {fetch} from '@/api'
    import {login, sendTime, getDefaultAvatar} from '@/utils'

    export default {
        data() {
            return {
                index: 0,

                page: 1,
                loadingScroll: false,
                isListLoaded: false,

                isShowHome: false,
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

                iszu: false,

                joining: false,

                shareModalStatus: false,

                //placeholder: '说点啥',
                //isShowReplyBox: false,
                //replyContent: '',

                planType: 1,
                isRead: 0,
                todayID: -1,
                todayCover: '',
                todayTitle: '',
                todayAuthor: '',

                newMessagesNum: 0,
                newMessagesAvatar: 'http://p3.ifengimg.com/a/2018_16/03dd1d38d0713ae.jpg',
                experienceList: [],
                syllabusList: []
            }
        },

        components: {
            actionSheet,
            experienceItem
        },

        computed: {
            isLongIntro() {
                return this.intro.length > 40
            },
            isShowInviteBtn() {
                return this.isJoin && ! this.isComplete
            },
            isShowPostBtn() {
                return this.isJoin && ! this.isShowHome
            },
            defaultAvatar() {
                return getDefaultAvatar()
            },
            isShowTable() {
                if (this.iszu) {
                    return true
                } else {
                    if (this.syllabusList.length) {
                        return true
                    }
                }
            }
        },

        async onLoad() {
            const {item, session} = getApp()

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

            // 用户点击分享进入
            if (getCurrentPages()[0].route.indexOf('detail') !== -1) {
                this.isShowHome = true

                // 留个进入过发现页的标记 不是详情
                wx.setStorage({
                    key: 'isDiscovered',
                    data: true
                })
            }

            wx.showLoading({
                title: '正在加载',
                mask: true
            })

            if (! session) {
                await login()
                await this.getDetailData()

                //Promise.all([this.getNewMessage(), this.getExperienceList()]).then(() => {
                //}).catch(() => {
                    //wx.hideLoading()
                //})
            } else {
                await this.getDetailData()
            }

            wx.hideLoading()


        },

        async onShow() {
            const app = getApp()

            if (app.post) {
                this.index = 0
                this.experienceList.unshift(app.post)

                app.post = null
            }

            if (app.newContent) {
                wx.showLoading({
                    title: '正在加载',
                    mask: true
                })

                await this.getDetailData()

                wx.hideLoading()
            }

            app.contentList = []
        },

        onReachBottom() {
            this.scroll()
        },

        onUnload() {
            const app = getApp()

            // 自动更新首页我的计划列表

            if (wx.getStorageSync('isLoadedHomeData') && app.tapJoin) {
                app.dakaList.unshift(Object.assign({}, app.item))
            }

            app.tapJoin = false

            this.isShowHome = false

            this.clear()

        },

        onHide() {
            this.isShowHome = false
        },

        onShareAppMessage(res) {
            return {
                title: `${wx.getStorageSync('user').nickname}邀请你加入打卡计划#${getApp().planName}#`,
                path: `/pages/detail/index?id=${this.$root.$mp.query.id}`
            }
        },

        methods: {
            submit(e) {
                //console.log(e)
                this.sendFormId(e.target.formId)

                this.forDaka()
            },
            submitJoin(e) {
                //console.log(e)
                this.sendFormId(e.target.formId)

                this.join()
            },
            submitPost(e) {
                //console.log(e)
                this.sendFormId(e.target.formId)

                this.goPost()
            },
            sendFormId(id) {
                const params = {
                    formId: id,
                    type: 1
                }

                fetch('/wxapplib/wxapp/addFormId', params)
            },
            showReplyBox({id, nickname}) {
                if (nickname) {
                    this.$replyID = id
                    this.$replyNickname = nickname
                    this.placeholder = `回复${nickname}`

                    this.isShowReplyBox = true

                    return
                }

                this.placeholder = '说点啥'
                this.isShowReplyBox = true
            },
            goHome() {
                wx.switchTab({
                    url: '/pages/index/index'
                })
            },
            goMessage() {
                // 去掉小红点
                this.newMessagesNum = 0
                getApp().item.NewMessageNum = 0

                wx.navigateTo({
                    url: `/pages/messages/index?id=${this.$root.$mp.query.id}`
                })
            },
            goPost() {
                wx.navigateTo({
                    url: `/pages/post/index?id=${this.$root.$mp.query.id}`
                })
            },
            goChapterDetail(id, isRead, lock) {
                if (lock === 0) {
                    return
                }

                getApp().isRead = !! isRead

                wx.navigateTo({
                    url: `/pages/read/index?id=${id}`
                })
            },
            goAddContent() {
                getApp().$genID = this.$root.$mp.query.id
                getApp().$genType = 1

                wx.navigateTo({
                    url: '/pages/add-content/index'
                })
            },
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

                        const userInfo = {
                            avatar: res.userInfo.avatarUrl,
                            nickname: res.userInfo.nickName
                        }

                        wx.setStorage({
                            key: 'user',
                            data: userInfo
                        })


                        await api.saveUserInfo({
                            encryptedData: res.encryptedData,
                            iv: res.iv
                        })

                        Promise.all([this.getNewMessage(), this.getExperienceList()])


                        const params = {
                            clockPID: this.$root.$mp.query.id || this.$root.$mp.appOptions.scene
                        }


                        const data = await api.getDetailData(params)

                        if (data.flag !== 1) {

                            // 需要重新登陆
                            if (data.flag === -100) {
                                const currentPage = getCurrentPages()[0]

                                wx.reLaunch({
                                    url: `/${currentPage.route}?id=${currentPage.options.id}`
                                })

                                return
                            }

                            wx.showModal({
                                title: '提示',
                                content: data.msg
                            })

                            return
                        }

                        this.day = data.data.ClockDay
                        this.todayDaKa = data.data.TodayClockNum
                        this.totalDaKa = data.data.TotalJoinNum
                        this.avatarList = data.data.AvatarList
                        this.intro = data.data.Description

                        if (data.data.MenuList) {
                            this.syllabusList = data.data.MenuList
                        }

                        this.iszu = data.data.IsPlanOwner
                        this.isRead = data.data.IsRead
                        this.planType = data.data.PlanType

                        if (data.data.TodayData) {
                            this.todayCover = data.data.TodayData.Cover
                            this.todayAuthor = data.data.TodayData.Chapter.Title
                            this.todayID = data.data.TodayData.Chapter.SECID
                            this.todayTitle = data.data.TodayData.Title
                        }

                        // 获取详情之后需要再次设置，因为第一次进入时可能没授权
                        this.isJoin = data.data.HasJoin
                        this.isDaKa = data.data.HasClock
                        this.isComplete = data.data.HasFinish

                        // 更新 item
                        const app = getApp()

                        app.day = this.day
                        app.item.IsJoin = this.isJoin

                        // if (app.item) {
                        //     app.item.IsJoin = true
                        // }

                        if (this.isJoin) {
                            wx.setStorageSync('isJoined', true)
                        }

                        app.planName = data.data.PlanName

                        wx.setNavigationBarTitle({
                            title: data.data.PlanName.length > 20 ? `${data.data.PlanName.slice(0, 20)}...` : data.data.PlanName
                        })
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
                                                this.getDetailData()
                                            }
                                        })
                                    //}
                                }
                            })
                        }

                    }
                })
            },
            blur() {
                //this.isShowReplyBox = false
            },
            async reply() {
                const app = getApp()
                const params = {
                    postID: app.postItem.PostID,
                    replyContent: this.replyContent
                }

                if (this.$replyID) {
                    params.replyID = this.$replyID
                }

                const data = await fetch('/api/clock-post/reply', params)

                if (data.flag !== 1) {
                    wx.showToast({
                        title: data.msg,
                        icon: 'none',
                        duration: 2000
                    })

                    return
                }

                app.postItem.ReplyList = [{
                    Nickname: wx.getStorageSync('user').nickname,
                    ReplyContent: this.replyContent,
                    ReplyMemberID: this.$replyID,
                    ReplyMemberNickname: this.$replyNickname
                }, ... app.postItem.ReplyList]

                app.postItem = null

                this.$replyID = null
                this.$replyNickname = null
                this.isShowReplyBox = false
                this.replyContent = ''


                //this.experienceList = data.data.Rows
            },
            async getNewMessage() {
                const params = {
                    clockPID: this.$root.$mp.query.id
                }
                const data = await fetch('/api/clock/newMessageNum', params)

                if (data.flag !== 1) {
                    wx.showToast({
                        title: data.msg,
                        icon: 'none',
                        duration: 2000
                    })

                    return
                }

                this.newMessagesNum = data.data.NewMessageNum
                this.newMessagesAvatar = data.data.Avatar || this.defaultAvatar
            },
            async getExperienceList() {
                const params = {
                    clockPID: this.$root.$mp.query.id,
                    page: this.page,
                    pagesize: 10
                }

                const data = await fetch('/api/clock-post/list', params)

                if (data.flag !== 1) {
                    wx.showToast({
                        title: data.msg,
                        icon: 'none',
                        duration: 2000
                    })

                    return
                }

                this.page++

                this.experienceList.push(... data.data.Rows)

                //this.experienceList = data.data.Rows
                this.isListLoaded =  this.experienceList.length === data.data.Total
            },
            forDaka() {
                //if (this.planType === 2 && ! getApp().isRead) {
                if (this.todayTitle && ! getApp().isRead) {
                    wx.showModal({
                        title: '提示',
                        content: '你还没有完成今日的打卡任务，确定要打卡吗？',
                        cancelText: '再想想',
                        success: (res) => {
                            if (res.confirm) {
                                this.daka()

                                return
                            }
                        }
                    })

                    return
                }

                this.daka()
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

                if (typeof app.item.TodayClockNum !== 'undefined') {
                    app.item.TodayClockNum = + app.item.TodayClockNum + 1
                } else {
                    app.item.ClockNum++
                }


                wx.showToast({
                    title: '加油，你离梦想又近了一步！',
                    icon: 'none',
                    duration: 2000
                })

                //if (app.isRead) {
                    //app.isRead = false

                    setTimeout(() => {
                        wx.navigateTo({
                            url: `/pages/post/index?id=${this.$root.$mp.query.id}`
                        })
                    })
                //}

                // 首页累计打卡天数自动更新

                const dakaDate = wx.getStorageSync('dakaDate')
                const date = new Date()
                const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

                if (! dakaDate || dakaDate !== dateString) {
                    //app.isDakaNumChange = true

                    //console.log(app.dakaTotalNum)
                    app.dakaTotalNum++

                    //console.log(app.dakaTotalNum)

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

                this.joining = true

                const data = await api.joinGroup(params)

                this.joining = false

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

                if (app.item) {
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
                }

                // 标记点击过加入按钮
                //wx.setStorageSync('tapJoin', true)
                app.tapJoin = true

                // if (! app.joins) {
                //     app.joins = []
                // }

                // app.joins.push(app.item)

                //getApp().joins.push(getApp().item)

                // wx.setStorage({
                //     key: 'isNeedUpdate',
                //     data: true
                // })

                // 加入任意一个之后，再次进入就直接进入首页
                wx.setStorageSync('isJoined', true)


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
            async scroll() {
                this.loadingScroll = true

                ! this.isListLoaded && await this.getExperienceList()

                this.loadingScroll = false
            },
            clear() {
                this.day = 0
                this.todayDaKa = 0
                this.intro = ''
                this.avatarList = []

                this.index = 0
                this.iszu = false
                this.isRead = 0

                this.page = 1
                this.experienceList = []

                this.planType = 1
                this.isRead = 0
                this.todayID = -1
                this.todayCover = ''
                this.todayTitle = ''
                this.todayAuthor = ''

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
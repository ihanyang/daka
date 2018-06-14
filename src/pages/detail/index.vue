<style src="@/css/detail"></style>

<template>
    <div class="detail-wrapper a" :class="{'hide-tabbar': checkStatus}">
        <!-- <template v-if="todayCover">
            <header class="detail-header" v-if="isDaKa">
                <p>已坚持打卡（天）</p>
                <strong v-text="day"></strong>

                <p v-if="isComplete">共有{{totalDaKa}}人完成打卡</p>
                <p v-else>今日已有{{todayDaKa}}人打卡</p>

                <div class="detail-avatar-list">
                    <img :key="item.Avatar" :src="item.Avatar || defaultAvatar" v-for="item of avatarList">
                </div>
                <div id="daka-invite" class="invite-btn" v-if="isShowInviteBtn" @click="showActionSheet"></div>
                <div class="header-setting-icon" @click="goSetting" v-if="! checkStatus"></div>
            </header>

            <header class="detail-header-complete" v-else>
                <div id="daka-today-read" class="detail-header-book" @click="goChapterDetail(todayID, 1)">
                    <img :src="todayCover" mode="aspectFill">
                    <div class="detail-header-book-info">
                        <h3 v-text="todayTitle"></h3>
                        <p v-text="todayAuthor"></p>
                    </div>
                    <div class="tips">今日任务</div>
                </div>
                <div id="daka-invite" class="invite-btn" v-if="isShowInviteBtn" @click="showActionSheet"></div>
            </header>
        </template> -->
            <header class="detail-header" :class="{san: isSan}">
                <p>已坚持打卡(天)</p>
                <strong v-text="day"></strong>

                <div class="detail-avatar-list">
                    <img :key="item.Avatar" :src="item.Avatar || defaultAvatar" v-for="item of avatarList">
                    <p>{{joinNum}}人已加入</p>
                </div>

                <div class="detail-tt-wrapper" :class="{tt: ! iszu}" v-if="isJoin && ! checkStatus">
                    <div class="item adds-icon" v-if="iszu" @click="goAddContent">添加内容</div>
                    <div class="item setting-icon" @click="goSetting">设置</div>
                    <div class="item invite-icon" @click="showActionSheet">邀请好友</div>
                </div>
            </header>

        <!-- <template v-if="isJoin">
            <template v-if="isComplete">
                <div class="btn daka-btn disabled">已完成</div>
            </template>
            <template v-else>
                <div class="btn daka-btn disabled" v-if="isDaKa">已打卡</div>

                <div class="daka-btn-wrapper" v-else>
                    <form @submit="submit" :report-submit="true">
                        <button form-type="submit" id="daka-daka" class="btn daka-btn">打卡</button>
                    </form>
                    <i @click="goSetting" v-if="todayCover && ! checkStatus"></i>
                </div>
            </template>
        </template>
        <template v-else>
            <div class="btn daka-btn" @click="dakaPrompt">打卡</div>
        </template> -->



        <button open-type="share"></button>

        <div class="new-messages" :class="{n: newMessagesNum}" @click="goMessage" v-if="newMessagesNum && ! checkStatus">
            <img :src="newMessagesAvatar" mode="aspectFill">
            你有{{newMessagesNum}}条消息
        </div>

        <div class="today-card-wrapper" :class="{n: newMessagesNum}" v-if="todayCover && ! checkStatus">
            <h1>
                今日任务
                <div class="btn ke-btn" @click="goKe">课程表</div>
            </h1>
            <div class="today-card" @click="goChapterDetail(todayID, 1)">
                <img :src="todayCover" mode="aspectFill">
                <div class="today-card-info">
                    <h3 v-text="todayTitle"></h3>
                    <p v-text="todayAuthor"></p>
                </div>
            </div>
        </div>

        <div class="detail-tab" :class="{m: ! todayCover, mm: ! isJoin, c: newMessagesNum}" v-if="! checkStatus && loaded">
            <div class="detail-tab-item" :class="{selected: index === i}" @click="index = i" :key="i" v-text="item" v-for="(item, i) of tabs"></div>
            <!-- <div id="daka-ke" class="detail-tab-item" :class="{selected: index === 1}" @click="index = 1" v-if="isShowTable">课程表</div> -->
        </div>
        <div class="experience-list" v-if="index === 0 && ! checkStatus">
            <experience-item :key="item.PostID" :item="item" v-for="item of experienceList"></experience-item>
        </div>
        <p class="no-data" v-if="index === 0 && ! experienceList.length && ! checkStatus && loaded">暂无打卡心得</p>

        <div class="detail-intro" v-if="index === 1 && ! checkStatus">


            <template v-if="introList.length">
                <!-- <p :class="{'line-overflow': isShrink && isLongIntro}" v-text="intro"></p>
                <div class="btn" @click="spread" v-if="isShrink && isLongIntro">展开</div>
                <div class="btn" @click="shrink" v-if="isLongIntro && taped">收起</div> -->
                <!-- <p v-text="intro"></p> -->
                <div class="intro-list">
                    <p v-for="item of introList" :key="item" v-text="item"></p>
                </div>
            </template>
            <template v-if="isShowDesc">
                <p class="no">组长很懒，没有填写打卡描述~</p>
            </template>

            <img class="detail-image" :src="item.MediaUrl" v-for="item of detailImages" mode="widthFix">
        </div>

        <div class="cc-list" v-if="index === 2 && ! checkStatus">
            <div class="cc-item" :class="{zu: item.IsPlanOwner == 1}" :key="item.Avatar" v-for="item of ccList">
                <img :src="item.Avatar || defaultAvatar">
                <p v-text="item.Nickname"></p>
                <span>已坚持打卡{{item.ClockDay}}天</span>
            </div>
        </div>


        <!-- <template v-if="index === 1 && ! checkStatus">
            <div id="daka-add-content" class="resume-add-content-btn" @click="goAddContent" v-if="iszu">
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

                    <div class="syllabus-chapter" :class="{actived: item.Unlock === 0}" :key="item.SECID" v-text="item.Title" @click="goChapterDetail(item.SECID, 1, item.Unlock)" v-for="(item, $ii) of item.ChapterList"></div>
                </div>
            </div>
        </template> -->

        <form @submit="submitJoin" :report-submit="true" v-if="! isJoin">
            <button form-type="submit" id="daka-join" class="btn join-btn">加入该小组</button>
        </form>

        <!-- <form @submit="submitPost" :report-submit="true" v-if="isJoin && ! checkStatus">
            <button form-type="submit" id="daka-post-comment" class="post-comment-btn"></button>
        </form> -->

        <action-sheet @cancel="shareModalStatus = false" v-if="shareModalStatus"></action-sheet>

        <div class="loading-scroll" v-if="loadingScroll"></div>

        <auth v-if="authModalStatus" @userInfoHandler="userInfoHandler"></auth>

        <tab-bar :isDaKa="isDaKa" v-if="isJoin" @daka="submit"></tab-bar>

        <music-icon @close="musicClose"></music-icon>

        <canvas class="canvas" canvas-id="ccc"/>
    </div>
</template>

<script>
    import musicIcon from '@/components/music-icon'
    import tabBar from '@/components/tab-bar'
    import actionSheet from '@/components/action-sheet'
    import experienceItem from '@/components/experience-item'

    import {getDetailData, getCCList, getNewMessage, getExperienceList, daka, join, getCheckStatus, addFormId, getUserInfo, getQiNiuToken} from '@/api'
    import {login, getDefaultAvatar} from '@/utils'

    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                isSan: false,
                canvasId: 'mycanvas',

                loaded: false,

                authModalStatus: false,
                checkStatus: false,

                index: 0,

                tabs: ['打卡心得', '打卡详情', '小组成员'],

                page: 1,
                loadingScroll: false,
                isListLoaded: false,

                isShowHome: false,

                day: 0,
                todayDaKa: 0,
                totalDaKa: 0,
                avatarList: [],
                intro: '',
                joinNum: 0,

                isShrink: true,
                taped: false,

                isComplete: false,
                isDaKa: false,
                isJoin: false,

                iszu: 0,

                shareModalStatus: false,

                planType: 1,
                isRead: 0,
                todayID: -1,
                todayCover: '',
                todayTitle: '',
                todayAuthor: '',

                newMessagesNum: 0,
                newMessagesAvatar: '',
                //experienceList: [],
                syllabusList: [],

                pageCC: 1,
                isListLoadedCC: false,
                ccList: [],

                detailImages: [],

                //isShowMusicIcon: false
            }
        },

        components: {
            //auth,
            tabBar,
            musicIcon,
            actionSheet,
            experienceItem
        },

        computed: {
            ... mapState(['experienceList']),

            introList() {
                console.log(!!this.intro)
                return this.intro.split('\n')
            },
            isShowDesc() {
                if (this.intro) {
                    return false
                }

                if (this.detailImages.length) {
                    return false
                }

                return true
            },
            isLongIntro() {
                return this.intro.length > 40
            },
            isShowInviteBtn() {
                return ! this.checkStatus && this.isJoin && ! this.isComplete
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
            const res = wx.getSystemInfoSync()
            console.log(res.brand)
            if (res.brand === 'QiKU') {
                this.isSan = true
            }

            this.$detailID = this.$root.$mp.query.id || decodeURIComponent(this.$root.$mp.query.scene)
            getApp().detailID = this.$detailID

            const {item, session, save} = getApp()

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

            //if (! this.loaded) {
                this.userInfoHandler()
            //}

            // if (save) {
            //     Promise.all([this.getDetailData(), this.getCCList(), this.getNewMessage(), this.getExperienceList()]).then(() => {
            //         //wx.hideLoading()
            //         this.loaded = true
            //     }).catch((e) => {
            //         this.loaded = true
            //         //wx.hideLoading()

            //         console.log(e)
            //     })

            //     // 审核开关
            //     this.check()
            // } else {
            //     await this.getUserInfo()
            // }

            //this.getQiNiuToken()
        },

        onShow() {
            // 用户点击分享进入
            if (getCurrentPages()[0].route.indexOf('detail') !== -1) {
                this.isShowHome = true

                // 留个进入过发现页的标记 不是详情
                wx.setStorage({
                    key: 'isDiscovered',
                    data: true
                })
            }

            const app = getApp()

            if (app.isEdit === 2) {
                //this.page = 1
                //this.experienceList = []
                this.getDetailData()

                app.isEdit = 1
            }

            // 添加了新内容
            if (app.newContent) {
                app.newContent = false

                this.getDetailData()
            }

            // 删除了计划
            // if (app.isDeletePlan) {
            //     app.isDeletePlan = false

            //     this.$store.commit('setDakaPlanNum', -- this.$store.state.dakaPlanNum)
            //     this.$store.commit('setDakaList', this.$store.state.dakaList.filter((item) => item.ClockPID !== this.$detailID))

            //     this.clear()
            //     this.getData()
            // }

            // 背景音乐
            // if (app.bgm) {
            //     this.isShowMusicIcon = true
            // }

            app.contentList = []
        },

        onReachBottom() {
            this.scroll()
        },

        onUnload() {
            this.isSan = false
            this.clear()

            let music = getApp().$musicE

            if (music) {
                music.stop()
                music = null
            }
        },

        onHide() {
            this.isShowHome = false

            let music = getApp().$musicE

            if (music) {
                music.stop()
                music = null
            }
        },

        onShareAppMessage(res) {
            const app = getApp()
            console.log(this.$shareURL)

            return {
                title: `${app.user.nickname}邀请你加入打卡计划#${app.planName}#`,
                path: `/pages/detail/index?id=${this.$detailID}`,
                imageUrl: this.$shareURL + '?imageMogr2/thumbnail/1200x960!'
            }
        },

        methods: {
            musicClose() {
                this.isShowMusicIcon = false
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
            getData() {
                Promise.all([this.getDetailData(), this.getQiNiuToken(), this.getCCList(), this.getNewMessage(), this.getExperienceList(), this.getUserInfo()]).then(() => {
                    //wx.hideLoading()
                    this.loaded = true
                }).catch((e) => {
                    console.error(e)
                })
            },
            userInfoHandler() {
                this.authModalStatus = false

                Promise.all([this.getDetailData(), this.getQiNiuToken(), this.getCCList(), this.getNewMessage(), this.getExperienceList(), this.getUserInfo()]).then(() => {
                    //wx.hideLoading()
                    this.loaded = true
                }).catch(async (e) => {
                    //wx.hideLoading()
                    //this.loaded = true

                    if (e.code === -100) {
                        const data = await login()

                        // 1 需要授权
                        if (data.data.needAuth === 1) {
                            this.authModalStatus = true
                        } else {
                            // 保存一个授权完成的标志 发现页面需要据此更新状态
                            wx.setStorageSync('isAuthorization', true)

                            this.getData()
                        }
                    }

                    console.error(e)
                })

                // 审核开关
                this.check()
            },
            async check() {
                const params = {
                    flag: 'clock'
                }

                const data = await getCheckStatus(params)

                if (! data) {
                    return
                }

                if (data.flag === 1) {
                    if (+ data.data.status02 === 1) {
                        this.checkStatus = false
                    } else {
                        this.checkStatus = true
                    }
                }
            },
            submit(e) {
                this.sendFormId(e.target.formId)

                this.forDaka()
            },
            submitJoin(e) {
                //this.sendFormId(e.target.formId)

                this.join()
            },
            submitPost(e) {
                this.sendFormId(e.target.formId)

                this.goPost()
            },
            sendFormId(id) {
                const params = {
                    formId: id,
                    type: 1
                }

                addFormId(params)
            },
            goHome() {
                wx.switchTab({
                    url: '/pages/index/index'
                })
            },
            goKe() {
                wx.navigateTo({
                    url: '/pages/ke/index'
                })
            },
            goSetting() {
                wx.navigateTo({
                    url: `/pages/setting/index?id=${this.$detailID}&type=${this.iszu}`
                })
            },
            goMessage() {
                // 去掉小红点
                this.newMessagesNum = 0

                const app = getApp()

                if (app.item) {
                    app.item.NewMessageNum = 0
                }

                wx.navigateTo({
                    url: `/pages/messages/index?id=${this.$detailID}`
                })
            },
            goPost() {
                wx.navigateTo({
                    url: `/pages/post/index?id=${this.$detailID}`
                })
            },
            goChapterDetail(id, isRead, lock) {
                getApp().currentCover = this.todayCover

                if (lock === 0) {
                    return
                }

                getApp().isRead = !! isRead

                wx.navigateTo({
                    url: `/pages/read/index?id=${id}`
                })
            },
            goAddContent() {
                const app = getApp()

                app.$genID = this.$detailID
                app.$genType = 1

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
            async getUserInfo() {
                const data = await getUserInfo()

                if (! data) {
                    return
                }

                getApp().user = {
                    avatar: data.data.Avatar,
                    nickname: data.data.Nickname
                }
                //await login()

                //this.authModalStatus = true
                //await this.getUserInfoWX()
            },
            getUserInfoWX() {
                return new Promise((resolve, reject) => {
                    wx.getUserInfo({
                        withCredentials: true,
                        success: async (res) => {
                            // 保存一个授权完成的标志 发现页面需要据此更新状态
                            wx.setStorage({
                                key: 'isAuthorization',
                                data: true
                            })

                            const userInfo = {
                                avatar: res.userInfo.avatarUrl || getDefaultAvatar(),
                                nickname: res.userInfo.nickName
                            }

                            getApp().user = userInfo

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
                                                    this.getDetailData()
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
            async getDetailData() {
                const params = {
                    clockPID: this.$detailID
                }

                const data = await getDetailData(params)

                if (! data) {
                    return
                }

                this.day = data.data.ClockDay
                this.joinNum = data.data.JoinNum
                this.todayDaKa = data.data.TodayClockNum
                this.totalDaKa = data.data.TotalJoinNum
                this.avatarList = data.data.AvatarList
                this.intro = data.data.Description

                this.detailImages = data.data.DescImages

                if (data.data.MenuList) {
                    this.syllabusList = data.data.MenuList
                    getApp().syllabusList = this.syllabusList
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

                // 自定义分享图片

                this.toImage(data)

                // 更新 item
                const app = getApp()

                app.day = this.day

                if (app.item) {
                    app.item.IsJoin = this.isJoin
                }

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
            downloadImage(url) {
                return new Promise((resolve, reject) => {
                    wx.downloadFile({
                        url,
                        success({tempFilePath}) {
                            resolve(tempFilePath)
                        }
                    })
                })
            },
            async toImage(data) {
                const arr = ['http://oocffpuei.bkt.clouddn.com/FmHeVs4Wkn6zw2x3Yoq3hky9LCHy', ... data.data.AvatarList.map((item) => item.Avatar || this.defaultAvatar)].map((item) => this.downloadImage(item))
                const result = await Promise.all(arr)
                const rateX = wx.getSystemInfoSync().windowWidth / 414
                const rateY = wx.getSystemInfoSync().windowHeight / 672
                //console.log(wx.getSystemInfoSync().windowWidth)
                //console.log(wx.getSystemInfoSync().windowHeight)
                const ctx = wx.createCanvasContext('ccc')

                ctx.drawImage(result[0], 0, 0, 500 * rateX, 400 * rateY)

                ctx.save()
                ctx.setFillStyle('#FFF')
                ctx.fillRect(53 * rateX, 80 * rateY, 394 * rateX, 240 * rateY)
                ctx.fill()
                ctx.save()



                ctx.setFontSize(14)
                ctx.setFillStyle('#333')
                //ctx.setTextAlign('center')
                ctx.fillText('今日热门打卡', ((500 * rateX) - ctx.measureText('今日热门打卡').width) / 2, (50 + 80) * rateY)

                ctx.setFontSize(28)
                ctx.setFillStyle('#1D2C2F')

                const strArr = data.data.PlanName.split('')//.length > 8 ? `${data.data.PlanName.slice(0, 8)}...` : data.data.PlanName

                let str = ''
                let i = []
                strArr.forEach((item, index) => {
                    str = str + item

                    //console.log(str)
                        //console.log(ctx.measureText(str).width / 180)
                    if (~~ (ctx.measureText(str).width / (180 * 1))) {
                        if (i.findIndex((item) => item.b === ~~ (ctx.measureText(str).width / (180 * 1))) === -1) {
                            i.push({
                                a: index,
                                b: ~~ (ctx.measureText(str).width / (180 * 1))
                            })
                        }

                    }
                })

                //console.log(i)
                i = i.map((item) => item.a)
                 //i = [... new Set(i.map((item) => item.b))]
                 //i = [6,12]


                if (i.length === 0) {
                    ctx.fillText(str, ((500 * rateX) - ctx.measureText(str).width) / 2, (30 + 80 + 53 + 21) * rateY)
                } else {
                    ctx.fillText(str.slice(0, i[0]), ((500 * rateX) - ctx.measureText(str.slice(0, i[0])).width) / 2, (30 + 80 + 53 + 21) * rateY)

                    i.length > 1 && i.forEach((item, index) => {
                        if (index + 1 === i.length) {
                            return
                        }

                        ctx.fillText(str.slice(i[index], i[index + 1] - 1) + '...', ((500 * rateX) - ctx.measureText(str.slice(i[index], i[index + 1] - 1) + '...').width) / 2, ((30 + 80 + 53 + 21) + ((index + 1) * 50)) * rateY  )
                    })

                    i.length === 1 && ctx.fillText(str.slice(i[i.length - 1]), ((500 * rateX) - ctx.measureText(str.slice(i[i.length - 1])).width) / 2, ((30 + 80 + 53 + 21) + 50) * rateY)

                    //ctx.fillText(str.slice(i[0]), (300 - ctx.measureText(str.slice(i[0])).width) / 2, 150)
                }

                // let num = ~~ (ctx.measureText(str).width / 180)

                // while (num--) {
                //     ctx.fillText(str, (300 - 180 / 2, 100)
                // }

                ctx.setFontSize(14)

                //const start = 53 + (394 - (data.data.AvatarList.length * 14) - 5 - ((`${data.data.joinNum}`.length + 4) * 10)  )
                const avatarWidth = data.data.AvatarList.length * 14 * rateX
                const textWidth = ctx.measureText(`${data.data.JoinNum}人已加入`).width
                const start = ((500 * rateX) - (avatarWidth + 5 + textWidth)) / 2

                //console.log(avatarWidth)
                //console.log(textWidth)
                //console.log(start)

                let avatarY = ((30 + 80 + 53 + 21) + 50 + 38) * rateY

                if (i.length === 0) {
                    avatarY = avatarY - (50 * rateY)
                }

                data.data.AvatarList.forEach((item, index) => {
                    ctx.beginPath()
                    ctx.arc(start + (index * 14 * rateX) + (7 * rateX), avatarY + (7 * rateY), (7 * rateX), 0, Math.PI * 2)
                    ctx.clip()
                    ctx.drawImage(result[index + 1], start + (index * 14 * rateX), avatarY, 14 * rateX, 14 * rateY)
                    ctx.restore()
                })


                let joinY = ((30 + 80 + 53 + 21) + 50 + 50) * rateY

                if (i.length === 0) {
                    joinY = joinY - (50 * rateY)
                }

                ctx.setFontSize(14)
                ctx.setFillStyle('#1D2C2F')
                ctx.fillText(`${data.data.JoinNum}人已加入`, (start + (data.data.AvatarList.length * 14 * rateX)) + 5, joinY)

                ctx.draw(false, () => {
                    //return
                    wx.canvasToTempFilePath({
                        canvasId: 'ccc',
                        success: ({tempFilePath}) => {
                            //console.log(tempFilePath)
                            const app = getApp()

                            wx.uploadFile({
                                url: 'https://up.qbox.me',
                                filePath: tempFilePath,
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

                                    //console.log(`${app.qiniu.domain}${data.key}`)
                                    this.$shareURL = `${app.qiniu.domain}${data.key}`
                                }
                            })
                        }
                    })
                })
            },
            async getNewMessage() {
                const params = {
                    clockPID: this.$detailID
                }
                const data = await getNewMessage(params)

                if (! data) {
                    return
                }

                this.newMessagesNum = data.data.NewMessageNum
                this.newMessagesAvatar = data.data.Avatar || this.defaultAvatar
            },
            async getExperienceList() {
                const params = {
                    clockPID: this.$detailID,
                    page: this.page,
                    pagesize: 10
                }

                const data = await getExperienceList(params)

                if (! data) {
                    return
                }

                this.page++
                this.$store.commit('setExperienceList', [... this.$store.state.experienceList, ... data.data.Rows])
                this.isListLoaded =  this.experienceList.length === data.data.Total
            },
            async getCCList() {
                const params = {
                    clockPID: this.$detailID,
                    page: this.pageCC,
                    pagesize: 10
                }

                const data = await getCCList(params)

                if (! data) {
                    return
                }

                this.pageCC++
                this.ccList.push(... data.data.Rows)
                this.isListLoadedCC =  this.ccList.length === data.data.Total
            },
            forDaka() {
                if (this.isDaKa) {
                    wx.showToast({
                        title: '已经打过了',
                        icon: 'none',
                        duration: 2000
                    })

                    return
                }

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
                    clockPID: this.$detailID
                }

                this.isDaKa = true

                const data = await daka(params)

                if (! data) {
                    return
                }

                this.day++
                this.todayDaKa = data.data.TodayClockNum

                const app = getApp()

                app.day = this.day

                if (app.item) {
                    app.item.HasClock = 1

                    if (typeof app.item.TodayClockNum !== 'undefined') {
                        app.item.TodayClockNum = + app.item.TodayClockNum + 1
                    } else {
                        app.item.ClockNum++
                    }
                }

                wx.showToast({
                    title: '加油，你离梦想又近了一步！',
                    icon: 'none',
                    duration: 2000
                })

                ! this.checkStatus && setTimeout(() => {
                    wx.navigateTo({
                        url: `/pages/post/index?id=${this.$detailID}`
                    })
                })
            },
            async join() {
                const params = {
                    clockPID: this.$detailID
                }
                const app = getApp()

                this.isJoin = true

                // this.ccList.push({
                //     Avatar: app.user.avatar,
                //     Nickname: app.user.nickname,
                //     ClockDay: this.day,
                //     IsPlanOwner: 0
                // })

                await join(params)


                // if (this.avatarList.length < 3) {
                //     this.avatarList.unshift({
                //         Avatar: app.user.avatar
                //     })
                // } else {
                //     this.avatarList = [{
                //         Avatar: app.user.avatar
                //     }, ... this.avatarList.slice(0, 2)]
                // }

                // 刷新
                // this.page = 1
                // this.experienceList = []
                // this.getDetailData()

                // 刷新页面
                this.pageCC = 1
                this.ccList = []

                Promise.all([this.getDetailData(), this.getCCList()]).catch((e) => {
                    console.log(e)
                })

                this.experienceList.forEach((item) => {
                    item.HasJoin = 1
                })



                if (app.item) {
                    app.item.IsJoin = 1
                    app.item.JoinNum++

                    if (app.item.AvatarList.length < 3) {
                        app.item.AvatarList.unshift({
                            Avatar: app.user.avatar
                        })
                    } else {
                        app.item.AvatarList = [{
                            Avatar: app.user.avatar
                        }, ... app.item.AvatarList.slice(0, 2)]
                    }
                }

                if (wx.getStorageSync('isLoadedHomeData')) {
                    this.$store.commit('setDakaPlanNum', ++ this.$store.state.dakaPlanNum)

                    app.item && this.$store.commit('setDakaList', [app.item, ... this.$store.state.dakaList])
                }

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
                getApp().isShowLoading = true

                this.loadingScroll = true

                if (this.index === 2) {
                    if (! this.isListLoadedCC) {
                        await this.getCCList()
                    }
                } else {
                    if (! this.isListLoaded) {
                        await this.getExperienceList()
                    }
                }

                this.loadingScroll = false
            },
            clear() {
                this.day = 0
                this.todayDaKa = 0
                this.intro = ''
                this.avatarList = []

                this.index = 0
                this.iszu = 0

                this.newMessagesNum = 0

                this.authModalStatus = false

                this.page = 1
                this.syllabusList = []

                this.pageCC = 1
                this.ccList = []

                this.$store.commit('setExperienceList', [])

                this.planType = 1
                this.isRead = 0
                this.todayID = -1
                this.todayCover = ''
                this.todayTitle = ''
                this.todayAuthor = ''

                this.taped = false
                this.isShrink = true
                this.isJoin = false
                this.isShowHome = false
                this.isComplete = false
                this.isDaKa = false
                this.shareModalStatus = false
            }
        }
    }
</script>
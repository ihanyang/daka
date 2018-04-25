<style src="@/css/comment-detail"></style>

<template>
	<div class="comment-detail-wrapper" :class="{commenting: isShowReplyBox}">
		<div class="comment-box">
			<header>
				<img class="avatar" :src="avatar || defaultAvatar" mode="aspectFill">
				<div class="info">
					<strong v-text="nickname"></strong>
					<span>{{time}}</span>
				</div>
			</header>
			<p v-text="content"></p>


			<template v-if="images.length === 1">
				<img class="comment-image" :src="images[0].ImageUrl" mode="aspectFill" @click="previewImage">
			</template>
			<template v-if="images.length > 1">
				<div class="image-wrapper" :class="{four: images.length === 4}" @click="previewImage">
					<img class="content-image" :key="item.ImageUrl" :src="item.ImageUrl" :data-index="item.ImageUrl" mode="aspectFill" v-for="(item, $ii) of images">
				</div>
			</template>

			<footer v-if="isJoin">
				<div class="like-icon" :class="{liked: liked}" @click="like"></div>
				<div class="comment-icon" @click="comment"></div>
			</footer>
		</div>

		<div class="detail-reply-wrapper">
			<div class="like-list">
				{{likeName}}
			</div>
			<reply-item :key="item.CreateTime" :item="item" v-for="item of replyList" @reply="replyHandler"></reply-item>
		</div>

		<div class="reply-box" v-if="isShowReplyBox">
            <textarea v-model="replyContent" auto-height :auto-focus="true" maxlength="300" placeholder-class="placeholder" :placeholder="placeholder" @blur="blur"></textarea>
            <div @click="reply">发表</div>
        </div>
	</div>
</template>

<script>
	import {timeFormat, getDefaultAvatar} from '@/utils'

	import replyItem from '@/components/reply-item'

	import {fetch} from '@/api'

	export default {
		data() {
			return {
				liked: false,

				avatar: '',
				nickname: '',
				content: '',
				createTimeStamp: '',
				isJoin: false,
				images: [],
				likeNameList: [],

				replyList: [],

				isShowReplyBox: false,
				placeholder: '说点啥',
                replyContent: '',
			}
		},

		components: {
			replyItem
		},

		computed: {
			likeName() {
				return this.likeNameList.map((item) => item.Nickname).join('、')
			},
			time() {
				return timeFormat(this.createTimeStamp)
			},
			defaultAvatar() {
				return getDefaultAvatar()
			}
		},

		async onLoad() {
			wx.showLoading({
				title: '正在加载'
			})

			await this.getDetail()

			wx.hideLoading()
		},

		methods: {
			previewImage(e) {
				const {index} = e.target.dataset
				const params = {
					urls: this.images.map((item) => item.ImageUrl)
				}

				if (index) {
					params.current = index
				}

				wx.previewImage(params)
			},
			async getDetail() {
				const params = {
					postID: this.$root.$mp.query.id
				}
				const data = await fetch('/api/clock-post/detail', params)

				if (data.flag !== 1) {
                    wx.showModal({
                        title: '提示',
                        content: data.msg,
                        showCancel: false
                    })

                    return
                }

                this.avatar = data.data.Avatar
                this.nickname = data.data.Nickname
                this.content = data.data.Content
                this.createTimeStamp = data.data.CreateTimeStamp
                this.isJoin = data.data.HasJoin

                this.replyList = data.data.ReplyList
                this.likeNameList = data.data.PraiseList
                this.images = data.data.ImageList
                this.liked = !! data.data.IsPraise
			},
			async like() {
				const nickname = wx.getStorageSync('user').nickname
				const params = {
					postID: this.$root.$mp.query.id
				}
				const url = ! this.liked ? '/api/clock-post/praise' : '/api/clock-post/unPraise'

				this.liked = ! this.liked

				if (this.liked) {
					this.likeNameList.push({Nickname: nickname})
				} else {
					let index = -1

					this.likeNameList.forEach((item, i) => {
						if (item.Nickname === nickname) {
							index = i
						}
					})

					this.likeNameList.splice(index, 1)
				}

				const data = await fetch(url, params)

				if (data.flag !== 1) {
                    wx.showToast({
                        title: data.msg,
                        icon: 'none',
                        duration: 2000
                    })

                    return
                }
			},
			blur() {
                this.isShowReplyBox = false
            },
            comment() {
            	this.isShowReplyBox = true
            },
            replyHandler(id, nickname) {
            	this.isShowReplyBox = true

            	this.$id = id
            	this.$nickname = nickname
            	this.placeholder = `回复${nickname}：`
            },
            async reply() {
                //const app = getApp()
                const params = {
                    postID: this.$root.$mp.query.id,
                    replyContent: this.replyContent
                }

                if (this.$id) {
                	params.replyID = this.$id
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

                const a = {
                	Nickname: wx.getStorageSync('user').nickname,
                	Avatar: wx.getStorageSync('user').avatar,
                	ReplyContent: this.replyContent,
                	CreateTime: + new Date()
                }

                if (this.$id) {
                	a.ReplyMemberID = this.$id
                	a.ReplyMemberNickname = this.$nickname
                }

                this.replyList.unshift(a)

                this.$id = null
                this.isShowReplyBox = false
                this.replyContent = ''


                //this.experienceList = data.data.Rows
            }
		}
	}
</script>
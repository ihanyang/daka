<style src="@/css/comment-detail"></style>

<template>
	<div class="comment-detail-wrapper">
		<div class="comment-box">
			<header v-if="loaded">
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

			<music-e :audio="audioInfo" v-if="audioInfo"></music-e>

			<footer v-if="isJoin">
				<div class="like-icon" :class="{liked: liked}" @click="like" v-text="likeNum"></div>
				<div class="comment-icon" @click="comment" v-text="replyNum"></div>
			</footer>
		</div>

		<div class="detail-reply-wrapper">
			<div class="like-list">
				{{likeName}}
			</div>
			<reply-item :isJoin="isJoin" :key="item.CreateTime" :item="item" v-for="item of replyList" @reply="replyHandler"></reply-item>
		</div>
	</div>
</template>

<script>
	import {timeFormat, getDefaultAvatar} from '@/utils'

	import musicE from '@/components/music-e'
	import replyItem from '@/components/reply-item'

	import {fetch} from '@/api'

	export default {
		data() {
			return {
				liked: false,
				loaded: false,

				avatar: '',
				nickname: '',
				content: '',
				createTimeStamp: 0,
				isJoin: false,
				images: [],
				likeNameList: [],

				audioInfo: null,

				replyList: [],

				placeholder: '说点啥',
                replyContent: '',
			}
		},

		components: {
			replyItem,
			musicE
		},

		computed: {
			likeNum() {
				return this.likeNameList.length
			},
			replyNum() {
				return this.replyList.length
			},
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

			await this.getDetail().catch((e) => {
				console.error(e)
			})

			wx.hideLoading()
		},

		onUnload() {
			this.avatar = ''
			this.nickname = ''
			this.content = ''
			this.createTimeStamp = 0
			this.isJoin = false
			this.images = []
			this.likeNameList = []

			this.loaded = false
			this.replyList = []

			getApp().$musicArray && getApp().$musicArray.forEach((item) => {
                if (! item.paused) {
                    item.stop()
                }
            })
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

                this.loaded = true

                this.avatar = data.data.Avatar
                this.nickname = data.data.Nickname
                this.content = data.data.Content
                this.createTimeStamp = data.data.CreateTimeStamp
                this.isJoin = data.data.HasJoin

                this.audioInfo = data.data.AudioInfo

                this.replyList = data.data.ReplyList
            	getApp().postItem.ReplyList = data.data.ReplyList

                this.likeNameList = data.data.PraiseList
                this.images = data.data.ImageList
                this.liked = !! data.data.IsPraise
			},
			async like() {
				const {nickname} = getApp().user
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
            comment(id, nickname) {
            	const app = getApp()

				if (typeof id !== 'object') {
					app.replyID = id
					app.replyNickname = nickname
				}

				wx.navigateTo({
					url: '/pages/post-comment/index'
				})
            },
            replyHandler(id, nickname) {
            	this.comment(id, nickname)
            }
		}
	}
</script>
<style scoped>
.experience-item {
	margin-bottom: 25px;
	color: #333;
	font-size: 16px;
}
header {
	display: flex;
	margin-bottom: 20px;
}
.avatar {
	width: 50px;
	height: 50px;
	margin-right: 20px;
}
.info {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;

	& span {
		color: #AAA;
		font-size: 15px;
	}
}
.content {
	margin-bottom: 20px;
	line-height: 1.6;
	word-break: break-all;
}
.content-image {
	width: 100%;
	height: 100px;
	margin-bottom: 13px;
	border-radius: 5px;
}
.like-icon {
	width: 15px;
	height: 20px;
	margin-left: auto;
	margin-right: 35px;
	background: url(~@/images/like.png) no-repeat;
	background-size: 100%;
}
.like-icon.liked {
	background-image: url(~@/images/liked.png);
}
.comment-icon {
	width: 18px;
	height: 19px;
	background: url(~@/images/comment.png) no-repeat;
	background-size: 100%;
}
footer {
	display: flex;
	margin-bottom: 23px;
	color: #AAA;
	font-size: 13px;
}
.reply-list {
	padding-left: 12px;
	color: #AAA;
	font-size: 14px;
	border-left: 4px solid #EBEBEB;

	& div {
		margin-bottom: 15px;
	}

	& span {
		color: #333;
	}

	& span.reply-text {
		color: #22CDCB;
	}
}
.view-all-btn {
	color: #22CDCB;
	font-size: 14px;
}
.image-wrapper {
	position: relative;

	& img {
		width: 105px;
		height: 70px;
		margin-right: 10px;
		margin-bottom: 0;
	}

	& img:nth-child(3n) {
		margin-right: 0;
	}

	& img:nth-child(n+4) {
		margin-top: 10px;
	}
}
.image-wrapper.four {
	width: 300px;

	& img:nth-child(3) {
		margin-right: 10px;
	}
}
</style>

<template>
	<div class="experience-item">
		<div @click="go">
			<header>
				<img class="avatar" :src="item.Avatar || defaultAvatar" mode="aspectFill">
				<div class="info">
					<strong class="nickname" v-text="item.Nickname"></strong>
					<span>已坚持打卡{{item.ClockDay}}天</span>
				</div>
			</header>
			<p class="content" v-text="item.Content"></p>
		</div>
		<img class="content-image" :src="item.ImageList[0].ImageUrl" mode="aspectFill" v-if="item.ImageList.length === 1" @click="previewImage">
		<div class="image-wrapper" :class="{four: item.ImageList.length === 4}" v-else @click="previewImage">
			<img class="content-image" :key="item.ImageUrl" :src="item.ImageUrl" :data-index="item.ImageUrl" mode="aspectFill" v-for="(item, $ii) of item.ImageList">
		</div>
		<footer>
			<div class="time">{{time}}</div>
			<div class="like-icon" :class="{liked: item.IsPraise}" @click="like"></div>
			<div class="comment-icon" @click="comment"></div>
		</footer>
		<div class="reply-list">
			<div v-for="(item, $ii) of replyList" :key="item.ReplyID" @click="comment(item.ReplyID, item.Nickname)">
				<template v-if="item.ReplyMemberID">
					<span v-text="item.Nickname"></span>
					<span class="reply-text">回复</span>
					<span v-text="item.ReplyMemberNickname"></span>
					：{{item.ReplyContent}}
				</template>
				<template v-else>
					<span v-text="item.Nickname"></span>：{{item.ReplyContent}}
				</template>
			</div>
		</div>
		<div class="btn view-all-btn" v-if="item.ReplyList.length > 5" @click="go">查看全部</div>
	</div>
</template>

<script>
	import {timeFormat, getDefaultAvatar} from '@/utils'
	import {fetch} from '@/api'

	export default {
		props: ['item'],

		computed: {
			replyList() {
				return this.item.ReplyList.slice(0, 5)
			},
			time() {
				return timeFormat(+ new Date(this.item.CreateTime))
			},
			defaultAvatar() {
				return getDefaultAvatar()
			}
		},

		methods: {
			previewImage(e) {
				const {index} = e.target.dataset
				const params = {
					urls: this.item.ImageList.map((item) => item.ImageUrl)
				}

				if (index) {
					params.current = index
				}

				wx.previewImage(params)
			},
			go() {
				wx.navigateTo({
					url: `/pages/comment-detail/index?id=${this.item.PostID}`
				})
			},
			async like() {
				const params = {
					postID: this.item.PostID
				}
				const url = ! this.item.IsPraise ? '/api/clock-post/praise' : '/api/clock-post/unPraise'

				this.item.IsPraise = ! this.item.IsPraise

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

				app.postItem = this.item

				this.$emit('showReplyBox', {id, nickname})
			}
		}
	}
</script>
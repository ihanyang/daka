<style scoped>
.messages-item {
	display: flex;
	padding: 0 20px;
	margin-top: 35px;

	& .avatar {
		width: 56px;
		height: 56px;
		margin-right: 20px;
	}

	& .info {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		color: #333;
		font-size: 12px;
	}

	& strong {
		font-size: 16px;
	}

	& .time {
		color: #AAA;
		font-size: 10px;
	}

	& .quote {
		display: flex;
		align-items: center;
		width: 80px;
		height: 56px;
		padding: 10px 4px;
		color: #AAA;
		font-size: 12px;
		line-height: 1.5;
		box-sizing: border-box;
		border-radius: 5px;
		background-color: #F2F2F2;
	}
}
.info p {
	width: 175px;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.info .like {
	width: 12px;
	height: 12px;
	background: url(~@/images/liked-reply.png) left center no-repeat;
	background-size: 100%;
}
</style>

<template>
	<div class="messages-item" @click="go">
		<img class="avatar" :src="item.Avatar || defaultAvatar" mode="aspectFill">
		<div class="info">

			<template v-if="item.MessageType === 3">
					<strong>{{item.Nickname}}赞了你</strong>
					<p class="like"></p>
				</template>
				<template v-else>
					<strong>{{item.Nickname}}评论了你</strong>
					<p v-text="item.ReplyContent"></p>
				</template>

			<div class="time" v-text="time"></div>
		</div>
		<div class="quote">
			<p class="line-overflow" v-text="item.Content"></p>
		</div>
	</div>
</template>

<script>
	import {timeFormat, getDefaultAvatar} from '@/utils'

	export default {
		props: ['item'],

		computed: {
			time() {
				return timeFormat(this.item.CreateTimeStamp)
			},
			defaultAvatar() {
				return getDefaultAvatar()
			}
		},

		methods: {
			go() {
				getApp().postItem = this.item

                wx.navigateTo({
					url: `/pages/comment-detail/index?id=${this.item.PostID}`
				})
            }
		}
	}
</script>
<style scoped>
.post-wrapper {
	padding: 20px 18px 0;
	color: #ABABAB;
	font-size: 16px;

	& textarea {
		height: 130px;
		padding: 10px;
		color: #333;
		line-height: 1.6;
	}

	& .placeholder {
		color: #ABABAB;
	}
}
.post-btn {
	width: 180px;
	margin: 40px auto;
	font-size: 18px;
	line-height: 50px;
	border-radius: 5px;
	background-color: #22CDCB;
}
</style>

<template>
	<div class="post-wrapper">
		<textarea v-model.lazy="content" maxlength="300" focus :show-confirm-bar="false" placeholder-class="placeholder" :placeholder="placeholder"></textarea>

		<div class="btn post-btn" @click="post">发表</div>
	</div>
</template>

<script>
	import {postExperienceComment} from '@/api'

	export default {
		data() {
			return {
				content: '',
				placeholder: '光看不如聊一句～'
			}
		},

		onLoad() {
			const nickname = getApp().replyNickname

			if (nickname) {
				this.placeholder = `回复${nickname}`
			}
		},

		onUnload() {
			const app = getApp()

			app.replyID = null
			app.replyNickname = ''

			this.content = ''
			this.placeholder = '光看不如聊一句～'
		},

		methods: {
			post() {
				setTimeout(async () => {
					if (! this.content.trim()) {
						wx.showToast({
							title: '请先写下评论，再发表吧',
							icon: 'none'
						})

						return
					}

					wx.showLoading({
						title: '正在发表'
					})

					const app = getApp()
	                const params = {
	                    postID: app.postItem.PostID,
	                    replyContent: this.content
	                }

	                if (app.replyID) {
	                    params.replyID = app.replyID
	                }

	                const data = await postExperienceComment(params)

	                if (! data) {
	                	return
	                }

	                app.postItem.ReplyNum++
	                app.postItem.ReplyList.unshift({
	                    Avatar: app.user.avatar,
	                    Nickname: app.user.nickname,
	                    ReplyContent: this.content,
	                    ReplyMemberID: app.replyID,
	                    ReplyID: data.data.id,
	                    CreateTimeStamp: + new Date(),
	                    ReplyMemberNickname: app.replyNickname
	                })

	                //app.postItem = null
	                app.replyID = null
	                app.replyNickname = null

	                wx.navigateBack({
	                	delta: 1
	                })

	            }, 100)
			}
		}
	}
</script>
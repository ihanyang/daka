<style scoped>
.experience-item {
	margin-bottom: 25px;
	color: #333;
	font-size: 16px;
}
header {
	display: flex;
	margin-bottom: 10px;
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
	margin-left: 70px;
	margin-bottom: 15px;
	line-height: 1.6;
	word-break: break-all;
}
.content-image {
	width: 100px;
	height: 105px;
	margin-bottom: 13px;
	margin-left: 70px;
	border-radius: 5px;
}
.like-icon {
	padding-left: 28px;
	margin-left: auto;
	margin-right: 35px;
	background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTMuNzEyIDE2LjY0OEguOTcxYy0uNTM3IDAtLjk3MS0uNDU2LS45NzEtMS4wMlY1Ljg0OGMwLS41NjUuNDM0LTEuMDIuOTctMS4wMmgyLjc0MmMuNTM3IDAgLjk3MS40NTUuOTcxIDEuMDJ2OS43NzhjMCAuNTYzLS40MzQgMS4wMjEtLjk3IDEuMDIxek0xLjU2NSAxNS4xMkgzLjEzdi04LjRIMS41NjV2OC40em00Ljg3IDEuNjhjLS41MyAwLS45NTctLjQ1Ni0uOTU3LTEuMDJWNS44NWMwLS4yNDEuMDc5LS40NjEuMjA5LS42MzZMNy42NDkgMi4xQzguNDcuNzk2IDEwLjEzNS40NDYgMTEuMzU4IDEuMzI0Yy41OTMuNDI0Ljk5NSAxLjA3IDEuMTMxIDEuODE3YTIuOTkgMi45OSAwIDAgMS0uMzk1IDIuMTI1bDMuODE1LS4yMTVjLjYtLjA0MSAxLjE3My4yMDYgMS41NzcuNjc4YTIuMTggMi4xOCAwIDAgMSAuNDkgMS43NDJsLTEuMTIzIDcuNTZhMi4xMjUgMi4xMjUgMCAwIDEtLjY2NiAxLjI2NWMtLjM1Ny4zMjUtLjgxLjUwNC0xLjI3OC41MDRINi40MzV6bS42MDgtMS42OGg4LjEyMmMuMDI4IDAgLjA1LS4wMjIuMDU1LS4wNDhsMS4yMTMtOC4wMThjLjAwMy0uMDEuMDA1LS4wMjctLjAxNC0uMDQ4LS4wMTgtLjAyMi0uMDM2LS4wMi0uMDQzLS4wMmgtLjAwNWwtNi4xNjIuMzk3YTEuMDI3IDEuMDI3IDAgMCAxLS45NTQtLjUyOSAxLjEzIDEuMTMgMCAwIDEgLjAxNi0xLjEzbDEuMTEtMS44NGMuMDA0LS4wMS4wMTEtLjAxOC4wMTYtLjAyN2EuODkyLjg5MiAwIDAgMCAuMTI0LS42NDUuODUzLjg1MyAwIDAgMC0uMzQ3LS41NDYuNzk4Ljc5OCAwIDAgMC0xLjEzNy4yMzNsLTEuOTYgMy4wNTVhLjE0LjE0IDAgMCAxLS4wMDguMDNsLS4wMjMuMDcxdjkuMDY1aC0uMDAzeiIgZmlsbD0iI0FBQSIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9zdmc+) left center no-repeat;
	background-size: 18px 16px;
}
.like-icon.liked {
	background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTMuNzEyIDE2LjY0OEguOTcxYy0uNTM3IDAtLjk3MS0uNDU2LS45NzEtMS4wMlY1Ljg0OGMwLS41NjUuNDM0LTEuMDIuOTctMS4wMmgyLjc0MmMuNTM3IDAgLjk3MS40NTUuOTcxIDEuMDJ2OS43NzhjMCAuNTYzLS40MzQgMS4wMjEtLjk3IDEuMDIxek0xLjU2NSAxNS4xMkgzLjEzdi04LjRIMS41NjV2OC40em00Ljg3IDEuNjhjLS41MyAwLS45NTctLjQ1Ni0uOTU3LTEuMDJWNS44NWMwLS4yNDEuMDc5LS40NjEuMjA5LS42MzZMNy42NDkgMi4xQzguNDcuNzk2IDEwLjEzNS40NDYgMTEuMzU4IDEuMzI0Yy41OTMuNDI0Ljk5NSAxLjA3IDEuMTMxIDEuODE3YTIuOTkgMi45OSAwIDAgMS0uMzk1IDIuMTI1bDMuODE1LS4yMTVjLjYtLjA0MSAxLjE3My4yMDYgMS41NzcuNjc4YTIuMTggMi4xOCAwIDAgMSAuNDkgMS43NDJsLTEuMTIzIDcuNTZhMi4xMjUgMi4xMjUgMCAwIDEtLjY2NiAxLjI2NWMtLjM1Ny4zMjUtLjgxLjUwNC0xLjI3OC41MDRINi40MzV6bS42MDgtMS42OGg4LjEyMmMuMDI4IDAgLjA1LS4wMjIuMDU1LS4wNDhsMS4yMTMtOC4wMThjLjAwMy0uMDEuMDA1LS4wMjctLjAxNC0uMDQ4LS4wMTgtLjAyMi0uMDM2LS4wMi0uMDQzLS4wMmgtLjAwNWwtNi4xNjIuMzk3YTEuMDI3IDEuMDI3IDAgMCAxLS45NTQtLjUyOSAxLjEzIDEuMTMgMCAwIDEgLjAxNi0xLjEzbDEuMTEtMS44NGMuMDA0LS4wMS4wMTEtLjAxOC4wMTYtLjAyN2EuODkyLjg5MiAwIDAgMCAuMTI0LS42NDUuODUzLjg1MyAwIDAgMC0uMzQ3LS41NDYuNzk4Ljc5OCAwIDAgMC0xLjEzNy4yMzNsLTEuOTYgMy4wNTVhLjE0LjE0IDAgMCAxLS4wMDguMDNsLS4wMjMuMDcxdjkuMDY1aC0uMDAzeiIgZmlsbD0iIzMzMyIgZmlsbC1ydWxlPSJub256ZXJvIi8+PC9zdmc+);
}
.comment-icon {
	padding-left: 28px;
	background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTciIGhlaWdodD0iMTYiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI0FBQSIgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNOS40MTcgMTUuOGExLjIxIDEuMjEgMCAwIDEtLjQ4LS4xIDEuMTgyIDEuMTgyIDAgMCAxLS43MTgtMS4wNWwtLjAzNS0xLjEyM0gyLjczN0EyLjczMyAyLjczMyAwIDAgMSAwIDEwLjgwNVYyLjkyMkEyLjczMyAyLjczMyAwIDAgMSAyLjczNy4yaDExLjMyNkEyLjczMyAyLjczMyAwIDAgMSAxNi44IDIuOTIydjcuODgzYTIuNzMzIDIuNzMzIDAgMCAxLTIuNzM3IDIuNzIyaC0uODY1Yy0uNDc1IDAtLjkzNC4xNzItMS4yOS40ODRsLTEuNzA2IDEuNDkzYy0uMjE3LjE5LS40OTYuMjk2LS43ODUuMjk2ek0yLjczNyAxLjg3Yy0uNTg1IDAtMS4wNTguNDcxLTEuMDU5IDEuMDUzdjcuODgyYy4wMDEuNTgxLjQ3NCAxLjA1MiAxLjA1OSAxLjA1M2g1LjcxYTEuMzk3IDEuMzk3IDAgMCAxIDEuNDA3IDEuMzUzbC4wMTIuMzY0LjkzNC0uODE5YTMuNjUgMy42NSAwIDAgMSAyLjM5Ny0uODk4aC44NjZjLjU4NCAwIDEuMDU4LS40NzIgMS4wNTgtMS4wNTNWMi45MjJjMC0uNTgtLjQ3NC0xLjA1Mi0xLjA1OC0xLjA1M0gyLjczN3oiLz48cGF0aCBkPSJNMi40IDcuNGExLjIgMS4yIDAgMSAwIDIuNCAwIDEuMiAxLjIgMCAwIDAtMi40IDB6TTcuMiA3LjRhMS4yIDEuMiAwIDEgMCAyLjQgMCAxLjIgMS4yIDAgMCAwLTIuNCAwek0xMiA3LjRhMS4yIDEuMiAwIDEgMCAyLjQgMCAxLjIgMS4yIDAgMCAwLTIuNCAweiIvPjwvZz48L3N2Zz4=) left center no-repeat;
	background-size: 17px 16px;
}
footer {
	display: flex;
	margin-bottom: 23px;
	margin-top: 20px;
	color: #AAA;
	font-size: 14px;
}
.reply-list {
	padding-left: 12px;
	color: #AAA;
	font-size: 14px;
	border-left: 4px solid #EBEBEB;

	& div {
		margin-bottom: 15px;
		word-break: break-all;
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
	margin-left: 70px;
	position: relative;

	& img {
		width: 90px;
		height: 90px;
		margin-right: 10px;
		margin-bottom: 0;
		margin-left: 0;
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
.f-line {
	width: 100%;
	height: 1px;
	margin-top: 22px;
	background-color: #E1E1E1;
}
.experience-item:last-child .f-line {
	display: none;
}
</style>

<template>
	<div class="experience-item">
		<div @click="go">
			<header>
				<img class="avatar" :src="item.Avatar || defaultAvatar" mode="aspectFill">
				<div class="info">
					<strong class="nickname" v-text="item.Nickname"></strong>
					<span>{{time}} 已坚持打卡{{item.ClockDay}}天</span>
				</div>
			</header>
			<p class="content" v-text="item.Content"></p>
		</div>
		<img class="content-image" :src="item.ImageList[0].ImageUrl" mode="aspectFill" v-if="item.ImageList.length === 1" @click="previewImage">
		<div class="image-wrapper" :class="{four: item.ImageList.length === 4}" v-else @click="previewImage">
			<img class="content-image" :key="item.ImageUrl" :src="item.ImageUrl" :data-index="item.ImageUrl" mode="aspectFill" v-for="(item, $ii) of item.ImageList">
		</div>

		<music-e :audio="item.AudioInfo" v-if="item.AudioInfo"></music-e>

		<footer>


			<template v-if="item.HasJoin">
				<div class="like-icon" :class="{liked: item.IsPraise}" @click="like" v-text="item.PraiseNum"></div>
				<div class="comment-icon" @click="comment" v-text="item.ReplyNum"></div>
			</template>
		</footer>
		<div class="f-line"></div>
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
	import musicE from '@/components/music-e'

	export default {
		props: ['item'],

		components: {
			musicE
		},

		computed: {
			replyList() {
				return this.item.ReplyList.slice(0, 5)
			},
			time() {
				return timeFormat(this.item.CreateTimeStamp)
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
				getApp().postItem = this.item

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

				if (this.item.IsPraise) {
					this.item.PraiseNum++
				} else {
					this.item.PraiseNum--
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
				if (! this.item.HasJoin) {
					return
				}

				const app = getApp()

				app.postItem = this.item

				if (typeof id !== 'object') {
					app.replyID = id
					app.replyNickname = nickname
				}

				wx.navigateTo({
					url: '/pages/post-comment/index'
				})
			}
		}
	}
</script>
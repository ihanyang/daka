<style scoped>
.read-wrapper {
	padding: 40px 30px 0;
	color: #333;
	font-size: 18px;
}
h1 {
	margin-bottom: 28px;
	font-size: 25px;
	font-weight: bold;
}
.content {
	text-indent: 35px;
	line-height: 1.7;
}
.tips {
	margin-top: 30px;
	position: relative;
	color: #AAA;
	text-align: center;

	&::after {
		content: "";
		width: 95%;
		height: 1px;
		position: absolute;
		top: 50%;
		left: 50%;
		background: linear-gradient(to right, #E5E5E5 28%, transparent 28%, transparent 72%, #E5E5E5 72%);
		transform: translate(-50%, -50%);
	}
}
</style>

<template>
	<div class="read-wrapper">
		<h1 v-text="title"></h1>

		<p class="content" v-text="content"></p>

		<div class="tips">今日任务已阅</div>
	</div>
</template>

<script>
	import {fetch} from '@/api'

	export default {
		data() {
			return {
				title: '',
				content: ''
			}
		},

		onLoad() {
			this.getContent()
		},

		methods: {
			async getContent() {
				wx.showLoading({
					title: '正在加载'
				})

				const params = {
					SECID: this.$root.$mp.query.id
				}

				const data = await fetch('/api/clock/chapterDetail', params)

				if (data.flag !== 1) {
		            wx.showModal({
		                title: '提示',
		                content: data.msg,
		                showCancel: false
		            })

		            return
		        }

		        wx.hideLoading()

		        this.title = data.data.Title
		        this.content = data.data.Content
			}
		}
	}
</script>
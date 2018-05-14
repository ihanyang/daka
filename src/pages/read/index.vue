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
	margin-bottom: 10px;
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

		<!-- <text class="content" v-text="content"></text> -->
		<p class="content" :key="item" v-for="item of contentList" v-text="item"></p>

		<div class="tips">今日任务已阅</div>
	</div>
</template>

<script>
	import {getReadContent} from '@/api'

	export default {
		data() {
			return {
				title: '',
				content: '',
				contentList: []
			}
		},

		onLoad() {
			this.getContent()
		},

		onUnload() {
			this.title = ''
			this.contentList = []
		},

		methods: {
			async getContent() {
				const params = {
					SECID: this.$root.$mp.query.id
				}

				const data = await getReadContent(params)

				if (! data) {
					return
				}

				this.title = data.data.ChapterTitle
		        //this.content = data.data.Content.replace(/<br>/g, '\n').replace(/<(?:.|\s)*?>/g, "").replace(/&nbsp;/g, '')

		        this.contentList = data.data.Content.match(/<p>.*?<\/p>/g).map((item) => item.replace(/<(?:.|\s)*?>/g, "").replace(/&nbsp;/g, ''))

		        wx.setNavigationBarTitle({
		        	title: data.data.BookTitle
		        })
			}
		}
	}
</script>
<style scoped>
.read-wrapper {
	min-height: 100vh;
	padding: 40px 30px;
	color: #333;
	font-size: 18px;
	box-sizing: border-box;
	background-color: #FAFAFA;
}
h1 {
	margin-bottom: 28px;
	font-size: 25px;
	font-weight: bold;
}
.content {
	margin-bottom: 10px;
	/* text-indent: 35px; */
	line-height: 1.7;
	word-break: break-all;
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
video {
	display: block;
	width: 100%;
	margin: 0 auto 15px;
}
img {
	display: block;
	width: 100%;
	margin-bottom: 15px;
}
</style>

<template>
	<div class="read-wrapper">
		<h1 v-text="title"></h1>

		<video :src="video.MediaUrl" v-if="video"></video>

		<music :id="id" :audio="audio" v-if="audio"></music>

		<!-- <text class="content" v-text="content"></text> -->
		<p class="content" :style="item.ps" :key="item.value" v-for="item of contentList" v-if="item.value">
			<template v-if="item.type === 0">
				<img :src="item" mode="widthFix" v-for="(item, i) of item.value">
			</template>
			<template v-if="item.type === 1">
				<span :style="item.ss" v-if="item.ss">
					{{item.value}}
				</span>
				<span v-else>
					{{item.value}}
				</span>
			</template>
		</p>

		<div class="tips">今日任务已阅</div>
	</div>
</template>

<script>
	import music from '@/components/music'
	import {getReadContent} from '@/api'

	export default {
		data() {
			return {
				title: '',
				content: '',
				contentList: [],

				//url: '',
				//duration: 0,
				//audioTitle: '',

				audio: null,

				video: null,

				time: 0,

				id: '',
			}
		},

		components: {
			music
		},

		onLoad() {
			this.getContent().catch((e) => {
				console.log(e)
			})

			getApp().currentReadID = this.$root.$mp.query.id
		},

		onUnload() {
			this.title = ''
			this.contentList = []

			this.video = null
			this.audio = null

			// 背景音乐
			// if (this.audio) {
			// 	getApp().$audio = this.audio
			// 	return
			// }


			// const app = getApp()

			// app.bgmIsPlay = true
			// app.bgm = wx.getBackgroundAudioManager()

			// app.bgm.src = this.url
			// app.bgm.seek(this.time)
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

		        //this.contentList = data.data.Content.match(/<p>.*?<\/p>/g).map((item) => item.replace(/<(?:.|\s)*?>/g, "").replace(/&nbsp;/g, ''))

		        //console.log( data.data.Content.match(/<p>.*?<\/p>/g).map((item) => item.replace(/<(?:.|\s)*?>/g, "")) )
		        //console.log(data.data.Content)
		        //console.log(data.data.Content.match(/<p[^>]*>.*?<\/p>/g))
		        const re = /<img\s+src=['"]([^'"]+)[^>]*>/g

		        this.contentList = data.data.Content.match(/<p[^>]*>.*?<\/p>/g).map((item) => {
		        	if (item.indexOf('<img') === -1) {
		        		//console.log(item.match(/style="(.+)"/))

		        		let styleText = ''
		        		let psStyletext = ''
		        		let bb
		        		let pp

		        		var pRe = /<p[^>]*style="([^>]+)"/g
		        		var sRe = /style="([^>]+)"/g

		        		while(bb = sRe.exec(item)) {
		        			styleText = styleText + bb[1]
		        		}

		        		//console.log(item.match(/<p[^>]*style="([^>]+)"/g))
		        		while(pp = pRe.exec(item)) {
		        			psStyletext = psStyletext + pp[1]
		        		}

		        		return {
			        		type: 1,
			        		value: item.replace(/<(?:.|\s)*?>/g, "").replace(/&nbsp;/g, ' '),
			        		ss: styleText,
			        		ps: psStyletext
			        	}
		        	}

		        	const obj = {
		        		type: 0,
		        		value: []
		        	}
		        	let result
		        	//console.log(result)

		        	while(result = re.exec(item)) {
		        		obj.value.push(result[1])
		        	}

		        	return obj



		        })
		        //console.log(this.contentList)

		        wx.setNavigationBarTitle({
		        	title: data.data.BookTitle
		        })

		        this.video = data.data.VideoInfo


		        // data.data.AudioInfo = {
		        // 	MediaTitle: '哈哈哈',
		        // 	MediaTime: 25,
		        // 	MediaUrl: 'http://oocffpuei.bkt.clouddn.com/Fom47okucGUEST1WAYEXRi6dz-OK'
		        // }

		        if (! data.data.AudioInfo) {
		        	return
		        }

		        const {MediaUrl, MediaTime, MediaTitle} = data.data.AudioInfo


		        this.audio = {
		        	url: MediaUrl,
		        	duration: MediaTime,
		        	title: MediaTitle
		        }
		        return

		        this.audioTitle = data.data.AudioInfo.MediaTitle
		        this.duration = data.data.AudioInfo.MediaTime
		        this.url = data.data.AudioInfo.MediaUrl
			}
		}
	}
</script>
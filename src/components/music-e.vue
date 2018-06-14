<style scoped>
.musice-wrapper {
	display: flex;
	align-items: center;
	/* height: 60px; */
	padding: 13px 39px 13px 20px;
	margin-top: 14px;
	margin-bottom: 20px;
	margin-left: 60px;
	border-radius: 5px;
	background-color: #FFF;
}
.icon {
	width: 35px;
	height: 35px;
	margin-right: 20px;
	border-radius: 50%;
	background: #22CDCB url(~@/images/play-music.png) center no-repeat;
	background-size: 13px;
}
.icon.paused {
	background-image: url(~@/images/pause-music.png);
	background-size: 10px;
}
.music-info-wrapper {
	flex: 1;
}
.music-time {
	color: #ABABAB;
	font-size: 10px;
}
.music-progress-wrapper {
	flex: 1;
	height: 14px;
	margin-top: 10px;
	position: relative;
	border-radius: 2px;
	background: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 40%, #D8D8D8 40%, #D8D8D8 55%, rgba(0, 0, 0, 0) 55%);
}
.music-progress {
	height: 2px;
	position: absolute;
	top: 50%;
	left: 0;
	border-radius: 2px;
	background-color: #22CDCB;
	transform: translateY(-50%);

	&::after {
		content: "";
		width: 8px;
		height: 8px;
		position: absolute;
		top: 50%;
		right: 0;
		border: 2px solid #02CECC;
		border-radius: 50%;
		background-color: #96F4F3;
		transform: translate(0%, -50%);
	}
}
</style>

<template>
	<div class="musice-wrapper">
		<div class="icon" @click="play" v-if="stage === 0"></div>
		<div class="icon paused" @click="pause" v-if="stage === 1"></div>
		<div class="icon" @click="resume" v-if="stage === 2"></div>

		<div class="music-info-wrapper">
			<div class="music-time">{{minute}}:{{second}}/{{minuteTotal}}:{{secondTotal}}</div>
			<div class="music-progress-wrapper" @click="seek">
				<div class="music-progress" :style="{width: width}"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['audio'],

		data() {
			return {
				time: 0,
				stage: 0
			}
		},

		computed: {
			width() {
				return `${this.time / this.audio.MediaTime * 100}%`
			},
			minuteTotal() {
				return `${~~ (this.audio.MediaTime / 60)}`.replace(/\b(\w)\b/g, '0$1')
			},
			secondTotal() {
				return `${this.audio.MediaTime - (this.minuteTotal * 60)}`.replace(/\b(\w)\b/g, '0$1')
			},
			minute() {
				return `${~~ (this.time / 60)}`.replace(/\b(\w)\b/g, '0$1')
			},
			second() {
				return `${this.time - (this.minute * 60)}`.replace(/\b(\w)\b/g, '0$1')
			},
			isNeedPaused() {
				return this.$store.state.isNeedPaused
			}
		},

		watch: {
			isNeedPaused(value) {
				if (value) {
					wx.showModal({
						title: '232',
						content: '23423'
					})
					this.$music.stop()

					this.$store.commit('setIsNeedPaused', false)
				}
			}
		},

		onLoad() {
			if (! getApp().$musicArray) {
				getApp().$musicArray = []
			}
		},

		methods: {
			play() {
				getApp().$musicArray.forEach((item) => {
					item.pause()
				})

				const music = wx.createInnerAudioContext()

				this.$music = music

				getApp().$musicArray.push(music)

				music.autoplay = true
				music.src = this.audio.MediaUrl

				//console.log(wx.getSystemInfoSync())

				// if (wx.getSystemInfoSync().system.match(/iOS\s9/)) {
				// 	setTimeout(() => {
				// 		music.stop()
				// 	}, 50)
				// }

				music.onPlay((e) => {
					//this.stage === 2 && this.resume()
					console.log('音乐播放')

					this.stage = 1
				})

				music.onTimeUpdate(() => {
					this.time = ~~ music.currentTime
				})

				music.onPause((e) => {
					console.log('音乐暂停')

					this.stage = 2
				})

				music.onEnded((e) => {
					console.log('音乐播放完成')

					this.toEnd()
				})

				music.onStop((e) => {
					console.log('音乐停止播放了')

					this.toEnd()
				})
			},
			pause() {
				console.log(34342)
				this.$music.pause()
			},
			seek(e) {
				if (! this.$music) {
					return
				}

				if (this.$music.paused) {
					return
				}

				const width = wx.getSystemInfoSync().windowWidth
				const barWidth = 165 * width / 375 //184 * width / 375
				const offsetleft = 153//105
				const value = ~~ (((e.mp.detail.x - offsetleft) / barWidth) * this.audio.MediaTime)


				//this.time = value
				this.$music.seek(value)
			},
			resume() {
				getApp().$musicArray.forEach((item) => {
					item.pause()
				})

				this.$music.play()

				//getApp().$musicE.pause()

				//getApp().$musicE = this.$music
			},
			toEnd() {
				this.time = 0
				this.stage = 0
			}
		}
	}
</script>
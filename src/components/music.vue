<style scoped>
.musice-wrapper {
	display: flex;
	align-items: center;
	height: 60px;
	padding: 13px 0px 13px 20px;
	margin-top: 14px;
	margin-bottom: 20px;
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
	margin-left: 15px;
	margin-right: 15px;
	color: #ABABAB;
	font-size: 10px;
	transform: translateY(20%);
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
		transform: translateY(-50%);
	}
}
p {
	color: #333;
	font-size: 13px;
}
.music-info {
	display: flex;
	align-items: center;
}
</style>

<template>
	<div class="musice-wrapper">
		<div class="icon" @click="play" v-if="stage === 0"></div>
		<div class="icon paused" @click="pause" v-if="stage === 1"></div>
		<div class="icon" @click="resume" v-if="stage === 2"></div>

		<div class="music-info-wrapper">
			<!-- <div class="music-time">{{minute}}:{{second}}/{{duration}}</div> -->
			<p v-text="audio.title"></p>
			<div class="music-info">
				<div class="music-progress-wrapper" @click="seek">
					<div class="music-progress" :style="{width: width}"></div>
				</div>
				<div class="music-time" v-if="! isPlayed">{{minuteTotal}}:{{secondTotal}}</div>
				<div class="music-time" v-else>{{minute}}:{{second}}</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['id', 'audio'],

		data() {
			return {
				paused: true,

				time: 0,

				stage: 0,
				isPlayed: false,

				isCanStop: false,

				tt: 0,
			}
		},

		computed: {
			width() {
				return `${this.time / this.audio.duration * 100}%`
			},
			minuteTotal() {
				return `${~~ (this.audio.duration / 60)}`.replace(/\b(\w)\b/g, '0$1')
			},
			secondTotal() {
				return `${this.audio.duration - (this.minuteTotal * 60)}`.replace(/\b(\w)\b/g, '0$1')
			},
			minute() {
				return `${~~ (this.time / 60)}`.replace(/\b(\w)\b/g, '0$1')
			},
			second() {
				return `${this.time - (this.minute * 60)}`.replace(/\b(\w)\b/g, '0$1')
			},
			musicPlaying() {
				return this.$store.state.musicPlaying
			},
			bgmStatus() {
				return this.$store.state.bgmStatus
			},
		},

		watch: {
			bgmStatus(value) {
				if (value === 0) {
					this.stage = 1
					this.isPlayed = true
				} else if (value === 1) {
					this.pause()
				} else {
					this.toEnd()
					this.isPlayed = false
				}
			}
		},

		onLoad() {
			const bgm = this.$store.state.bgm

			if (! bgm) {
				return
			}

			if (getApp().currentReadID !== bgm.$id) {
				this.time = 0
				this.stage = 0
				this.width = '0%'
				this.isPlayed = false
				this.isCanStop = true

				//bgm.stop()

				return
			}
		},

		methods: {
			play() {
				let bgm = this.$store.state.bgm

				if (bgm) {
					bgm.stop()
					//this.stage = 1
					bgm.title = this.audio.title
					bgm.src = this.audio.url
					bgm.coverImgUrl = getApp().currentCover

					bgm.$id = getApp().currentReadID

					this.isCanStop = false
					this.$store.commit('setCurrentCover', getApp().currentCover)

					return

					this.isCanStop = false
				}

				getApp().audio = this.audio
				this.$store.commit('setCurrentCover', getApp().currentCover)

				this.$bgm = bgm = wx.getBackgroundAudioManager()

				this.$store.commit('setBGM', bgm)

				bgm.$id = getApp().currentReadID

				//this.$music.autoplay = true
				bgm.title = this.audio.title
				bgm.src = this.audio.url
				bgm.coverImgUrl = getApp().currentCover

				bgm.onTimeUpdate(() => {
					if (this.isCanStop) {
						return
					}

					this.time = ~~ bgm.currentTime
				})

				bgm.onPlay((e) => {
					//this.stage === 2 && this.resume()
					console.log('音乐播放')
					this.$store.commit('setBGMStatus', 0)
				})

				bgm.onPause((e) => {
					console.log('音乐暂停')

					//this.pause()
					this.$store.commit('setBGMStatus', 1)
				})

				bgm.onEnded((e) => {
					console.log('音乐播放完成')

					//this.toEnd()
					this.$store.commit('setBGMStatus', 2)
				})

				bgm.onStop((e) => {
					console.log('音乐停止播放了')

					//this.toEnd()

					this.$store.commit('setBGMStatus', 2)
				})

				//this.isPlayed = true
				this.time = 0
				//this.stage = 1
			},
			pause() {
				this.stage = 2
				this.$bgm.pause()
			},
			seek(e) {
				const width = wx.getSystemInfoSync().windowWidth
				const barWidth = 184 * width / 375
				const offsetleft = 105
				const value = ~~ (((e.mp.detail.x - offsetleft) / barWidth) * this.audio.duration)


				if (! this.$bgm) {
					return
				}

				//this.time = value
				this.$bgm.seek(value)
			},
			resume() {
				this.stage = 1

				this.$bgm.play()
			},
			toEnd() {
				// if (this.isCanStop) {
				// 	return
				// }

				this.time = 0
				this.stage = 0
			}
		}
	}
</script>
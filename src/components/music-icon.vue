<style scoped>
.music-wrapper {
	position: fixed;
	right: 20px;
	bottom: 20%;

	& .close {
		width: 11px;
		height: 11px;
		position: absolute;
		top: 0;
		right: 0;
		background: url(~@/images/close-music.png) no-repeat;
		background-size: 100%;
		transform: translateX(100%);
	}

	& img {
		width: 55px;
		height: 55px;
		animation: rotate 12s linear infinite;
	}

	& img.an {
		animation-play-state: paused;
	}

	& img.end {
		animation: none;
	}

	& .icon {
		width: 15px;
		height: 15px;
		position: absolute;
		top: 50%;
		left: 50%;
		pointer-events: none;
		background: url(~@/images/pause-music.png) no-repeat;
		background-size: 100%;
		transform: translate(-50%, -50%);
	}

	& .icon.play {
		background-image: url(~@/images/play.png);
	}
}
@keyframes rotate {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}
</style>

<template>
	<div class="music-wrapper" v-if="isShow">
		<span class="close" @click="close"></span>
		<img :src="cover" class="avatar" :class="{an: isPause, end: end}" mode="aspectFill" @click="cont">
		<span class="icon" :class="{play: isPause}"></span>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isShow: false,
				//cover: '',

				isPause: false,
				end: false
			}
		},

		computed: {
			cover() {
				return this.$store.state.currentCover
			},
			bgmEnd() {
				return this.$store.state.bgmEnd
			},
			bgm() {
				return this.$store.state.bgm
			},
			bgmStatus() {
				return this.$store.state.bgmStatus
			},
		},

		watch: {
			bgmStatus(value) {
				if (value === 0) {
					this.play()
					this.isShow = true
				} else if (value === 1) {
					this.pause()
					this.isShow = false
				} else {
					this.toEnd()
					this.isShow = false
				}
			},
			bgmEnd(value) {
				if (value) {
					this.toEnd()
				}
			}
		},

		onLoad() {
			//console.log(123)
			//this.cover = getApp().musicCover

			const bgm = this.bgm

			if (! bgm) {
				return
			}

			console.log(bgm.paused)

			this.isPause = bgm.paused

			// bgm.onEnded(() => {
			// 	this.end = true
			// 	this.isPause = true
			// })

			// bgm.onPlay((e) => {
			// 	this.resume()
			// })

			// bgm.onPause((e) => {
			// 	this.pause()
			// })

			// bgm.onStop((e) => {
			// 	console.log('停止播放了11')

			// 	this.toEnd()
			// })
		},

		methods: {
			cont() {
				let bgm = this.$store.state.bgm

				if (this.end) {
					bgm.src = getApp().audio.url

					//this.play()

					return
					//this.$store.commit('setMusicPlaying', false)
				}

				if (bgm.paused) {
					bgm.play()
				} else {
					bgm.pause()
				}
			},
			play() {
				this.end = false
				this.isPause = false

				//getApp().bgm.play()
			},
			pause() {
				//getApp().bgm.pause()

				this.isPause = true
			},
			resume() {
				this.end = false
				this.isPause = false
			},
			toEnd() {
				this.end = true
				this.isPause = true
			},
			close() {
				let bgm = this.$store.state.bgm

				bgm.stop()

				this.isShow = false
				// let bgm = getApp().bgm

				// console.log(bgm)
				// //if (bgm.paused) {
				// 	bgm.stop()
				// //}

				// bgm = null
				// getApp().musicCover = null

				// this.$emit('close')
			}
		}
	}
</script>
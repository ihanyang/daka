<style scoped>
.post-wrapper {
	padding: 20px 18px 0;
	color: #ABABAB;
	font-size: 16px;

	& textarea {
		height: 130px;
		margin-bottom: 20px;
		color: #333;
		line-height: 1.6;
	}

	& .placeholder {
		color: #ABABAB;
	}
}
.add-image-wrapper {
	display: flex;
}
.add-image {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 90px;
	height: 80px;
	margin-right: 15px;
	border-radius: 5px;
	background-color: #F2F2F2;
}
.add-image-icon {
	padding-top: 33px;
	font-size: 12px;
	background: url(~@/images/image-icon.png) center top no-repeat;
	background-size: 25px;
}
.microphone {
	background-image: url(~@/images/microphone.png);
	background-size: 18px 27px;
}
.post-preview-image {
	margin-top: 38px;
	font-size: 0;
}
.post-image-wrapper {
	display: inline-block;
	margin-right: 10px;
	position: relative;

	& img {
		width: 105px;
		height: 70px;
	}

	& .del {
		width: 16px;
		height: 16px;
		position: absolute;
		top: -4px;
		right: -4px;
		border-radius: 50%;
		background: url(~@/images/close.png);
		background-size: 100%;
	}
}
.post-image-wrapper:nth-child(3n) {
	margin-right: 0;
}

.post-image-wrapper:nth-child(n+4) {
	margin-top: 10px;
}
.resume-add-image {
	display: inline-block;
	width: 105px;
	height: 70px;
	position: relative;

	&::before, &::after {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		background-color: #D8D8D8;
		transform: translate(-50%, -50%);
	}

	&::before {
		width: 41px;
		height: 2px;
	}

	&::after {
		width: 2px;
		height: 41px;
	}
}
.post-btn, .delete-btn {
	width: 180px;
	margin: 61px auto;
	font-size: 18px;
	line-height: 50px;
	border-radius: 5px;
	background-color: #22CDCB;
}
.delete-btn {
	width: 50px;
	margin: 0 0 0 auto;
	font-size: 13px;
	line-height: 30px;
}
.post-audio-wrapper {
	display: flex;
	align-items: center;
	margin-top: 30px;
	color: #ABABAB;
	font-size: 12px;

	& .icon {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 55px;
		height: 55px;
		margin-right: 20px;
		border-radius: 50%;
		box-shadow: 0 0 15px rgba(46, 217, 208, .2);

		&::after {
			content: "";
			width: 20px;
			height: 20px;
			border-radius: 8px;
			background-color: #22CDCB;
		}
	}

	& .icon.play {
		background: url(~@/images/play.png) center no-repeat;
		background-size: 22px;

		&::after {
			display: none;
		}
	}

	& .icon.pause {
		background: url(~@/images/pause.png) center no-repeat;
		background-size: 10px 18px;

		&::after {
			display: none;
		}
	}

	& p {
		width: 220px;
		margin-top: 10px;
		line-height: 1.6;
	}
}

</style>

<template>
	<div class="post-wrapper">
		<textarea v-model.lazy="experience" maxlength="500" placeholder-class="placeholder" placeholder="说说今天的心得和收获吧～"></textarea>

		<div class="add-image-wrapper">
			<div class="add-image" @click="chooseImage" v-if="! previewImages.length">
				<div class="add-image-icon">图片</div>
			</div>
			<div class="add-image post-audio" @click="chooseAudio" v-if="isRecording === 0">
				<div class="add-image-icon microphone">音频</div>
			</div>
		</div>

		<div class="post-audio-wrapper" v-if="isRecording === 1">
			<div class="icon" @click="stop"></div>
			<div class="info">
				<span>{{minute}}:{{second}}/10:00</span>
				<p>录音结束前请勿进行其他操作，录音时长 10 分钟内</p>
			</div>
		</div>

		<div class="post-audio-wrapper" v-if="isRecording === 2">
			<div class="icon play" @click="play"></div>
			<div class="info">
				<span>{{minute}}:{{second}}</span>
				<p>点击图标可播放音频</p>
			</div>
			<div class="btn delete-btn" @click="deleteAudio">删除</div>
		</div>

		<div class="post-audio-wrapper" v-if="isRecording === 3">
			<div class="icon play" @click="play" v-if="isPause"></div>
			<div class="icon pause" @click="pause" v-else></div>

			<div class="info">
				<span>{{minutePlay}}:{{secondPlay}}/{{minute}}:{{second}}</span>
				<p>点击图标可播放音频</p>
			</div>
			<div class="btn delete-btn" @click="deleteAudio">删除</div>
		</div>

		<template v-if="previewImages.length">
			<div class="post-preview-image">
				<div class="post-image-wrapper" :key="item" v-for="(item, index) of previewImages">
					<span class="del" @click="deleteImage(index)"></span>
					<img :src="item" mode="aspectFill">
				</div>

				<div class="post-image-wrapper resume-add-image" @click="chooseImage" v-if="previewImages.length < 9"></div>
			</div>
		</template>

		<div class="btn post-btn" @click="post">发表</div>
	</div>
</template>

<script>
	import {postExperience, getQiNiuToken} from '@/api'

	export default {
		data() {
			return {
				posting: false,

				experience: '',
				previewImages: [],
				images: [],

				//minute: 0,
				//second: 0,
				time: 0,
				timePlay: 0,
				isRecording: 0,
				waitPlay: false,
				isPause: false,
				isCanStop: true,
				stoped: false
			}
		},

		computed: {
			minute() {
				return `${~~ (this.time / 60)}`.replace(/\b(\w)\b/g, '0$1')
			},
			second() {
				return `${this.time - (this.minute * 60)}`.replace(/\b(\w)\b/g, '0$1')
			},
			minutePlay() {
				return `${~~ (this.timePlay / 60)}`.replace(/\b(\w)\b/g, '0$1')
			},
			secondPlay() {
				return `${this.timePlay - (this.minutePlay * 60)}`.replace(/\b(\w)\b/g, '0$1')
			}
		},

		onLoad() {
			this.isCanStop = true

			this.getQiNiuToken()
		},

		onUnload() {
			this.experience = ''
			this.previewImages = []
			this.images = []

			this.isRecording = 0
			this.isPause = false
			this.posting = false

			this.time = 0
			this.timePlay = 0
			this.state = 0

			console.log(this.$voice)
			console.log(this.$recorder)

			this.$voice && this.$voice.stop()


			if (this.$recorder) {
				this.isCanStop = false
				! this.stoped && this.$recorder.stop()

				this.$recorder = null
			}


			this.stoped = false

			this.$voice = null
			//this.$recorder = null
			this.$recorderPath = null

			//clearTimeout(this.$timerPlay)
			clearTimeout(this.$timer)
		},

		methods: {
			async getQiNiuToken() {
                const app = getApp()

                // if (app.qiniu) {

                //     return
                // }

                const data = await getQiNiuToken({
                	mediaType: 1
                })

                if (! data) {
                	return
                }

                app.qiniu = data.data
            },
            chooseAudio() {
            	let bgm = this.$store.state.bgm

				if (bgm) {
					bgm.pause()
				}
            	//this.isRecording = 1

            	this.$recorder = wx.getRecorderManager()

            	this.$recorder.onStart(() => {
            		this.isRecording = 1
            	})

            	// this.$recorder.onPause(() => {

            	// })

            	this.$recorder.onStop(({tempFilePath}) => {
            		this.stoped = true

            		if (! this.isCanStop) {
            			return
            		}

            		clearTimeout(this.$timer)

            		this.isRecording = 2
            		this.$recorderPath = tempFilePath
            	})

            	this.$recorder.onError((e) => {
            		wx.showToast({
            			title: JSON.stringify(e),
            			icon: 'none',
            			duration: 2000
            		})

            		this.isRecording = 0

            		clearTimeout(this.$timer)
            	})

            	this.$recorder.start({
            		duration: 60000 * 10,
            	})

            	this.$timer = setTimeout(function go () {
            		if (this.time >= 10 * 60) {
            			this.isRecording = 2

            			return
            		}

            		this.time++

            		this.$timer = setTimeout(go.bind(this), 1000)
            	}.bind(this), 1000)
            },
            deleteAudio() {
            	this.time = 0
            	this.timePlay = 0
            	this.isRecording = 0
            	this.isPause = false

            	this.$voice.stop()

            	this.$voice = null
            	this.$recorder = null
            	this.$recorderPath = null

            	//clearTimeout(this.$timerPlay)
            },
            stop() {
            	// 只能调用 stop 一次
            	this.stoped = true
            	this.$recorder.stop()
            	//this.waitPlay = true
            },
            play() {
            	// 说明当前是暂停状态
            	if (this.timePlay) {
            		this.$voice.play()

            		this.isPause = false
            		this.isRecording = 3

            		// this.$timerPlay = setTimeout(function go () {
	            	// 	if (this.timePlay >= this.time) {
	            	// 		this.timePlay = 0
	            	// 		this.isRecording = 2

	            	// 		return
	            	// 	}

	            	// 	this.timePlay++

	            	// 	this.$timerPlay = setTimeout(go.bind(this), 1000)
	            	// }.bind(this), 1000)

            		return
            	}

            	const voice = wx.createInnerAudioContext()

            	this.$voice = voice

				voice.autoplay = true
				voice.src = this.$recorderPath

				this.isRecording = 3

				voice.onPlay((e) => {
					console.log('音乐播放')
				})

				voice.onTimeUpdate(() => {
					// wx.showToast({
					// 	title: '' + (~~ voice.currentTime)
					// })
					this.timePlay = ~~ voice.currentTime

				})

				voice.onEnded((e) => {
					console.log('录音播放完成')

					this.timePlay = 0
            		this.isRecording = 2
				})

				// this.$timerPlay = setTimeout(function go () {
    //         		if (this.timePlay >= this.time) {
    //         			this.timePlay = 0
    //         			this.isRecording = 2

    //         			return
    //         		}

    //         		this.timePlay++

    //         		this.$timerPlay = setTimeout(go.bind(this), 1000)
    //         	}.bind(this), 1000)
            },
            pause() {
            	this.isPause = true
            	this.$voice.pause()

            	//clearTimeout(this.$timerPlay)
            },
			chooseImage() {
                const app = getApp()

                wx.chooseImage({
                    success: (res) => {
                    	this.previewImages = [... this.previewImages, ... res.tempFilePaths].slice(0, 9)
                    },
                    fail() {
                        wx.showToast({
                            title: '选择图片失败请重试',
                            icon: 'none',
                            duration: 2000
                        })
                    }
                })
            },
            deleteImage(index) {
            	this.previewImages.splice(index, 1)
            },
            uploadImage(arr) {
            	const app = getApp()
            	const p = arr.map((item) => {
            		return new Promise((resolve, reject) => {
            			wx.uploadFile({
		                    url: 'https://up.qbox.me',
		                    filePath: item,
		                    name: 'file',
		                    formData: {
		                        token: app.qiniu.token
		                    },
		                    success: (res) => {
		                    	// wx.showModal({
		                    	// 	title:'sdfsdfds',
		                    	// 	content: JSON.stringify(res.data)
		                    	// })
		                        const data = JSON.parse(res.data)

		                        console.log(data)

		                        if (res.statusCode !== 200) {
		                            wx.showModal({
		                                title: '提示',
		                                content: '上传失败',
		                                showCancel: false
		                            })

		                            reject()

		                            return
		                        }

		                        resolve(`${app.qiniu.domain}${data.key}`)
		                    }
		                })
            		})
            	})

            	return Promise.all(p)
            },
            getImageInfo() {
            	const p = this.previewImages.map((src) => {
	            	return new Promise((resolve, reject) => {
	            		wx.getImageInfo({
	            			src,
	            			success: (res) => {
	            				resolve({
	            					width: res.width,
	            					height: res.height
	            				})
	            			}
	            		})
	            	})
	            })

	            return Promise.all(p)
            },
			post() {
				if (this.posting) {
					return
				}

				this.posting = true

				if (this.isRecording === 1) {
					wx.showToast({
						title: '正在录音',
						icon: 'none'
					})

					this.posting = false

					return
				}

				if (this.isRecording === 3) {
					if (! this.$voice.paused) {
						wx.showToast({
							title: '正在播放',
							icon: 'none'
						})

						this.posting = false

						return
					}
				}

				setTimeout(async () => {
					if (! this.experience.trim()) {
						wx.showToast({
							title: '请先写下今天的心得，再发表吧',
							icon: 'none'
						})

						this.posting = false

						return
					}

					const app = getApp()

					app.loadingText = '正在发表'

					const imagesURL = await this.uploadImage(this.previewImages)
					const a = imagesURL.map((item) => ({url: item, width: 0, height: 0}))

					let audioURL

					if (this.$recorderPath) {
						[audioURL] = await this.uploadImage([this.$recorderPath])
					}


					//return

					const params = {
						clockPID: this.$root.$mp.query.id,
						content: this.experience,
						images: JSON.stringify(a)
					}

					//audioURL = 'http://oocffpuei.bkt.clouddn.com/Fom47okucGUEST1WAYEXRi6dz-OK'

					if (audioURL) {
						params.audioUrl = audioURL
						params.audioTime = this.time
						//params.processID = app.qiniu.persistentId
					}

					const data = await postExperience(params)

					if (! data) {
						return
					}

			        wx.showToast({
			        	title: '发布成功',
			        	icon: 'none'
			        })

			        const item = {
			        	PostID: data.data.id,
			        	Nickname: app.user.nickname,
			        	Avatar: app.user.avatar,
			        	ClockDay: app.day,
			        	Content: this.experience,
			        	CreateTimeStamp: + new Date(),
			        	IsPraise: 0,
			        	HasJoin: 1,
			        	PraiseNum: 0,
			        	ReplyNum: 0,
			        	ImageList: a.map((item) => ({ImageUrl: item.url})),
			        	ReplyList: []
			        }

			        if (audioURL) {
			        	item.AudioInfo = {
			        		MediaTime: this.time,
			        		MediaUrl: audioURL
			        	}
			        }

			        this.$store.commit('setExperienceList', [item, ... this.$store.state.experienceList])

			        wx.navigateBack({
						delta: 1
					})
				}, 70)
			}
		}
	}
</script>
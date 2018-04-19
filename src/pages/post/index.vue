<style>
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
.add-image {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 90px;
	border-radius: 5px;
	background-color: #F2F2F2;
}
.add-image-icon {
	padding-top: 33px;
	font-size: 12px;
	background: url(~@/images/image-icon.png) center top no-repeat;
	background-size: 25px;
}
.post-preview-image {
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
.post-btn {
	width: 180px;
	margin: 61px auto;
	font-size: 18px;
	line-height: 50px;
	border-radius: 5px;
	background-color: #22CDCB;
}
</style>

<template>
	<div class="post-wrapper">
		<textarea v-model.trim="experience" maxlength="500" placeholder-class="placeholder" placeholder="说说今天的心得和收获吧～"></textarea>

		<template v-if="previewImages.length">
			<div class="post-preview-image">
				<div class="post-image-wrapper" :key="item" v-for="(item, index) of previewImages">
					<span class="del" @click="deleteImage(index)"></span>
					<img :src="item" mode="aspectFill">
				</div>

				<div class="post-image-wrapper resume-add-image" @click="chooseImage" v-if="previewImages.length < 9"></div>
			</div>
		</template>
		<template v-else>
			<div class="add-image" @click="chooseImage">
				<div class="add-image-icon">添加图片</div>
			</div>
		</template>

		<div class="btn post-btn" @click="post">发表</div>
	</div>
</template>

<script>
	import api, {fetch} from '@/api'

	export default {
		data() {
			return {
				posting: false,

				experience: '',
				previewImages: [],
				images: []
			}
		},

		onLoad() {
			this.getQiNiuToken()
		},

		onUnload() {
			this.experience = ''
			this.previewImages = []
			this.images = []
		},

		methods: {
			async getQiNiuToken() {
                const app = getApp()
                const qiniu = wx.getStorageSync('qiniu')

                if (qiniu) {
                    app.token = qiniu.data.token
                    app.domain = qiniu.data.domain

                    return
                }

                const data = await api.getQiNiuToken()

                if (data.flag !== 1) {
                    wx.showModal({
                        title: '提示',
                        content: data.msg,
                        showCancel: false
                    })

                    return
                }

                const {token, domain} = data.data

                wx.setStorage({
                    key: 'qiniu',
                    data
                })

                app.token = token
                app.domain = domain
            },
			chooseImage() {
                const app = getApp()

                wx.chooseImage({
                    success: (res) => {
                    	this.previewImages = [... this.previewImages, ... res.tempFilePaths]
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
            uploadImage() {
            	const app = getApp()
            	const p = this.previewImages.map((item) => {
            		return new Promise((resolve, reject) => {
            			wx.uploadFile({
		                    url: 'https://up.qbox.me',
		                    filePath: item,
		                    name: 'file',
		                    formData: {
		                        token: app.token
		                    },
		                    success: (res) => {
		                        const data = JSON.parse(res.data)

		                        if (res.statusCode !== 200) {
		                            wx.showModal({
		                                title: '提示',
		                                content: '上传失败',
		                                showCancel: false
		                            })

		                            reject()

		                            return
		                        }

		                        resolve(`${app.domain}${data.key}`)
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
			async post() {
				if (! this.experience) {
					wx.showToast({
						title: '请先写下今天的心得，再发表吧',
						icon: 'none'
					})

					return
				}

				wx.showLoading({
					title: '正在发表'
				})

				const imagesURL = await this.uploadImage()

				const a = imagesURL.map((item) => ({url: item, width: 0, height: 0}))

				//const a = await Promise.all(this.getImageInfo(), this.uploadImage())

				const params = {
					clockPID: this.$root.$mp.query.id,
					content: this.experience,
					images: JSON.stringify(a)
				}

				//this.posting = true

				const data = await fetch('/api/clock-post/add', params)

				wx.hideLoading()

				if (data.flag !== 1) {
		            wx.showModal({
		                title: '提示',
		                content: data.msg,
		                showCancel: false
		            })

		            return
		        }

		        wx.showToast({
		        	title: '发布成功',
		        	icon: 'none'
		        })

		        const app = getApp()

		        app.$post = {
		        	PostID: data.data.id,
		        	Nickname: wx.getStorageSync('user').nickname,
		        	Avatar: wx.getStorageSync('user').avatar,
		        	ClockDay: 0,
		        	Content: this.experience,
		        	CreateTime: + new Date(),
		        	IsPraise: 0,
		        	ImageList: a.map((item) => ({ImageUrl: item.url})),
		        	ReplyList: []
		        }

		        wx.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>
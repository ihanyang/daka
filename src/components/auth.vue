<style scoped>
.auth-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	z-index: 10;
	opacity: 0;
	transition: all .25s;
	background-color: rgba(0, 0, 0, .4);
}
.auth-wrapper.transition {
	opacity: 1;
}
.auth-wrapper.a {
	opacity: 0;
}
.blur {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	background: url(~@/images/home-bg.jpg) no-repeat;
	background-size: 100%;
}
.auth-content {
	width: 280px;
	height: 240px;
	padding: 54px 42px 47px;
	font-size: 17px;
	text-align: center;
	border-radius: 20px;
	box-sizing: border-box;
	box-shadow: 0 0 10px rgba(0, 0, 0, .2);
	background-color: #FFF;
	transition: all .25s;
	transform: scale(1.2);
}
.auth-content.transition {
	transform: scale(1);
}
h1 {
	color: #333;
}
button {
	margin-top: 70px;
	line-height: 45px;
	color: #FFF;
	font-size: 17px;
	border-radius: 23px;
	background-color: #02CECC;
}
</style>

<template>
	<div class="auth-wrapper" :class="{transition: status}" @touchmove.stop>
		<div class="auth-content" :class="{transition: status}">
			<h1>为了给您提供更好的体验</h1>
			<button open-type="getUserInfo" @getuserinfo="userInfoHandler" @click="aa">去授权</button>
		</div>
	</div>
</template>

<script>
	import {saveUserInfo} from '@/api'

	export default {
		data() {
			return {
				a: false,
				status: false
			}
		},

		onReady() {
			setTimeout(() => {
				this.status = true
			}, 66)
		},

		methods: {
			aa() {
				this.a = true
				//this.$emit('userInfoHandlerTap')
			},
			async userInfoHandler(e) {
				console.log(e)

				if (e.mp.detail.errMsg.indexOf('ok') === -1) {
					// if (this.$sqFlag) {
     //                    this.$sqFlag = false

     //                    wx.switchTab({
     //                        url: '/pages/discover/index'
     //                    })
     //                } else {
                        wx.showModal({
                            content: '为了保障您能正常使用，请您在接下来的微信授权中点击【允许】',
                            showCancel: false,
                            confirmText: '下一步',
                            success: (res) => {
                                //this.$sqFlag = true

                                wx.openSetting({
                                    success: (e) => {
                                    	if (e.authSetting['scope.userInfo']) {
                                    		wx.getUserInfo({
						                        withCredentials: true,
						                        success: async (res) => {
						                        	console.log(res)
						                        	this.success(res.iv, res.encryptedData, res.userInfo)
						                        }
						                    })
                                    		this.a = false
                                    		//this.success()
                                    	} else {
                                    		this.a = false
                                    		wx.switchTab({
					                            url: '/pages/discover/index'
					                        })
                                    	}
                                    }
                                })
                            }
                        })
                    //}

					return
				}

				const {iv, encryptedData, userInfo} = e.mp.detail

				this.success(iv, encryptedData, userInfo)
			},
			async success(iv, encryptedData, userInfo) {
				// 保存一个授权完成的标志 发现页面需要据此更新状态
				wx.setStorageSync('isAuthorization', true)

				await saveUserInfo({
	                iv,
	                encryptedData
	            })

				getApp().user = {
					avatar: userInfo.avatarUrl,
					nickname: userInfo.nickName
				}
				getApp().save = true

	            this.$emit('userInfoHandler')
			}
		}
	}
</script>
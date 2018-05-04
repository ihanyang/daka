<style scoped>
.setting-wrapper {
	min-height: 100vh;
	padding-top: 34px;
	box-sizing: border-box;
	background-color: #FAFAFA;
}
ul {
	margin: 0 18px 20px;
	border-radius: 5px;
	background-color: #FFF;
}
li {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 20px;
	color: #333;
	font-size: 16px;
	line-height: 55px;
}
.switch-wrapper {
	width: 45px;
	height: 20px;
	position: relative;
	border-radius: 5px;
	background-color: #F0F0F0;
	transition: all .25s;
}
.switch-wrapper.actived {
	background-color: #A9E5E4;

	& .switch-bar {
		transform: translateX(100%);
		background-color: #22CDCB;
	}
}
.switch-bar {
	width: 22px;
	height: 20px;
	position: absolute;
	top: 0;
	left: 0;
	border-radius: 5px;
	background-color: #CCC;
	transform: translateX(0);
	transition: all .25s;
}
.time-wrapper {
	height: 128px;
	padding-top: 20px;
	margin: 0 18px;
	box-sizing: border-box;
	color: #22CDCB;
	font-size: 13px;
	text-align: center;
	border-radius: 5px;
	background-color: #FFF;

	& strong {
		display: block;
		margin-top: 4px;
		font-size: 45px;
	}
}
</style>

<template>
	<div class="setting-wrapper">
		<ul>
			<li v-if="iszu" @click="go">
				编辑打卡详情
			</li>
			<li>
				微信打卡提醒
				<div class="switch-wrapper" :class="{actived: isOpen}" @click="setSwitch">
					<div class="switch-bar"></div>
				</div>
			</li>
		</ul>

		<picker mode="time" v-if="isOpen" :value="time" @change="changeTime">
			<div class="time-wrapper">
				<span>设置提醒时间</span>
				<strong v-text="time"></strong>
			</div>
		</picker>
	</div>
</template>

<script>
	import {fetch} from '@/api'

	export default {
		data() {
			return {
				iszu: false,
				isOpen: true,
				ok: false,
				isShowTimePicker: false,

				time: ''
			}
		},

		watch: {
			isOpen(value) {
				if (value) {
					this.time = wx.getStorageSync('remindTime')
				}

				this.ok && this.setRemind()
			}
		},

		async onLoad() {
			if (+ this.$root.$mp.query.type === 1) {
				this.iszu = true
			}

			this.getRemind()
		},

		onUnload() {
			this.time = ''
			this.iszu = false
		},

		methods: {
			go() {
				wx.navigateTo({
                    url: `/pages/edit/index?id=${this.$root.$mp.query.id}`
                })
			},
			setSwitch() {
				this.ok = true
				this.isOpen = ! this.isOpen
			},
			async getRemind() {
				const params = {
					clockPID: this.$root.$mp.query.id
				}

				const data = await fetch('/api/clock/getPlanRemind', params)

				if (data.flag !== 1) {
                    wx.showModal({
                        title: '提示',
                        content: data.msg,
                        showCancel: false
                    })

                    return
                }

                this.isOpen = data.data.IsRemind
                //this.time = `${data.data.RemindTime.split(':')[0]}:${data.data.RemindTime.split(':')[1]}`
                this.time = data.data.RemindTime.slice(0, 5)

                wx.setStorage({
                	key: 'remindTime',
                	data: this.time
                })
			},
			// change(e) {
			// 	this.isOpen = e.target.value

			// 	this.setRemind()
			// },
			changeTime(e) {
				this.time = e.target.value

				wx.setStorage({
                	key: 'remindTime',
                	data: this.time
                })

				this.setRemind()
			},
			async setRemind() {
				const params = {
					remindTime: this.time + ':00',
					isRemind: this.isOpen ? 1 : 0,
					clockPID: this.$root.$mp.query.id
				}

				const data = await fetch('/api/clock/setPlanRemind', params)

				if (data.flag !== 1) {
                    wx.showModal({
                        title: '提示',
                        content: data.msg,
                        showCancel: false
                    })

                    return
                }
			}
		}
	}
</script>
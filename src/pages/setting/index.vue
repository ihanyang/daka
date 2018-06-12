<style scoped>
.setting-wrapper {
	min-height: 100vh;
	padding-top: 34px;
	box-sizing: border-box;
	background-color: #FAFAFA;
}
.setting-ul {
	margin: 0 18px 20px;
	border-radius: 5px;
	background-color: #FFF;
}
.setting-li {
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
.delete-btn {
	padding: 0 15px;
	position: absolute;
	left: 50%;
	bottom: 150px;
	border-radius: 5px;
	line-height: 45px;
	font-size: 15px;
	background-color: #22CDCB;
	transform: translateX(-50%);
}
.select-box-wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	z-index: 11;
	background-color: rgba(0, 0, 0, .5);
}
.select-box {
	width: 280px;
	padding: 25px 0 27px;
	position: relative;
	box-sizing: border-box;
	border-radius: 20px;
	background-color: #FFF;

	& h3 {
		color: #333;
		text-align: center;
		font-size: 20px;
	}
}
.select-box-scroll {
	height: 260px;
	margin: 20px 0 30px;
	overflow: auto;

	& li {
		display: flex;
		align-items: center;
		padding: 0 34px 0 20px;
		margin-bottom: 15px;
		position: relative;
		color: #AAA;
		font-size: 13px;
		line-height: 40px;
	}

	& li.actived {
		background-color: #F2F2F2;

		& .dui {
			display: block;
		}
	}

	& .avatar {
		width: 30px;
		height: 30px;
		margin-right: 15px;
	}

	& .nickname {
		width: 70px;
		font-size: 14px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	& span:last-child {
		margin-left: auto;
	}

	& .dui {
		display: none;
		width: 18px;
		height: 9px;
		position: absolute;
		top: 50%;
		right: 10px;
		box-sizing: border-box;
		border: 1px solid #22CDCB;
		border-top-color: rgba(0, 0, 0, 0);
		border-right-color: rgba(0, 0, 0, 0);
		transform: translateY(-50%) rotate(-40deg);
	}
}
.ok-btn {
	width: 140px;
	padding: 0 15px;
	margin: 0 auto;
	border-radius: 5px;
	line-height: 40px;
	font-size: 15px;
	background-color: #22CDCB;
}
.close {
	width: 18px;
	height: 18px;
	position: absolute;
	top: 15px;
	right: 15px;

	&::before, &::after {
		content: "";
		width: 100%;
		height: 2px;
		position: absolute;
		top: 50%;
		left: 50%;
		background-color: #333;
		transform: translate(-50%, -50%) rotate(45deg);
	}

	&::after {
		transform: translate(-50%, -50%) rotate(-45deg);
	}
}
.day {
	flex-shrink: 0;
	margin-left: auto;
}
</style>

<template>
	<div class="setting-wrapper">
		<ul class="setting-ul">
			<li class="setting-li" v-if="iszu" @click="go">
				编辑打卡详情
			</li>
			<li class="setting-li">
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

		<div class="btn delete-btn" @click="deletePlan">删除并退出该小组</div>

		<div class="select-box-wrapper" v-if="selectZUModalStatus">
			<div class="select-box">
				<span class="close" @click="selectZUModalStatus = false"></span>
				<h3>选择新组长</h3>
				<div class="select-box-scroll">
					<ul>
						<li :class="{actived: item.actived}" :dataIndex="item.index" :dataId="item.MemberID" v-for="(item, index) of ccList" :key="item.MemberID" @click="select(item)">
							<img class="avatar" :src="item.Avatar || defaultAvatar" mode="aspectFill">
							<span class="nickname" v-text="item.Nickname"></span>
							<span class="day">已坚持打卡{{item.ClockDay}}天</span>
							<span class="dui"></span>
						</li>
					</ul>
				</div>
				<div class="btn ok-btn" @click.stop="setZU">设为新组长</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {getDefaultAvatar} from '@/utils'
	import {transPlan, getCCList, deletePlan, getDakaSetting, setDakaSetting} from '@/api'

	export default {
		data() {
			return {
				iszu: false,
				isOpen: true,
				ok: false,
				isShowTimePicker: false,

				time: '20:00',

				ccList: [],
				selectZUModalStatus: false,
			}
		},

		computed: {
			defaultAvatar() {
                return getDefaultAvatar()
            }
		},

		watch: {
			isOpen(value) {
				if (value) {
					this.time = this.$remindTime
				}

				this.ok && this.setRemind()
			}
		},

		async onLoad() {
			if (+ this.$root.$mp.query.type === 1) {
				this.iszu = true
			}

			Promise.all([this.getRemind(), this.getCCList()]).catch((e) => console.error(e))
		},

		onUnload() {
			this.time = this.$remindTime
			this.iszu = false

			this.$id = null

			this.ccList = []
			this.$remindTime = ''

			this.$memberID = null
		},

		methods: {
			select(item) {
				this.ccList.forEach((item) => item.actived = false)

				item.actived = true

				this.$memberID = item.MemberID
			},
			async getCCList() {
                const params = {
                    clockPID: this.$root.$mp.query.id,
                    includeSelf: 0,
                    page: 1,
                    pagesize: 9999
                }

                const data = await getCCList(params)

                if (! data) {
                    return
                }

                data.data.Rows.forEach((item) => {
                	item.actived = false
                })

                this.ccList.push(... data.data.Rows)
            },
			deletePlan() {
				if (this.iszu && this.ccList.length) {
					wx.showModal({
						title: '退出并转移组长权限',
						content: '您是小组长，退出后，打卡小组将会解散，是否要将组长权限转移给他人？',
						confirmText: '转移权限',
						cancelText: '再想想',
						success: async ({confirm, cancel}) => {
							if (confirm) {
								this.selectZUModalStatus = true
							}

							if (cancel) {
								console.log(11)
							}
						}
					})

					return
				}

				wx.showModal({
					title: '确定要退出吗？',
					content: '退出后，您将无法打卡及查看成员动态。',
					cancelText: '再想想',
					success: async ({confirm, cancel}) => {
						if (confirm) {
							await deletePlan({
								clockPID: this.$root.$mp.query.id
							})

							// getApp().isDeletePlan = true

							// wx.navigateBack({
							// 	delta: 1
							// })

							this.$store.commit('setDakaPlanNum', -- this.$store.state.dakaPlanNum)
                			this.$store.commit('setDakaList', this.$store.state.dakaList.filter((item) => item.ClockPID !== this.$root.$mp.query.id))

							wx.switchTab({
								url: '/pages/index/index'
							})

							getApp().$deleteID = this.$root.$mp.query.id
						}

						if (cancel) {
							console.log(11)
						}
					}
				})
			},
			async setZU() {
				if (! this.$memberID) {
					wx.showToast({
						title: '请选择组长',
						icon: 'none',
						duration: 2000
					})

					return
				}

				const params = {
					clockPID: this.$root.$mp.query.id,
					memberID: this.$memberID
				}
				const data = await transPlan(params)

				if (! data) {
					return
				}

				this.selectZUModalStatus = false

				//getApp().isDeletePlan = true

				this.$store.commit('setDakaPlanNum', -- this.$store.state.dakaPlanNum)
    			this.$store.commit('setDakaList', this.$store.state.dakaList.filter((item) => item.ClockPID !== this.$root.$mp.query.id))

				wx.switchTab({
					url: '/pages/index/index'
				})

				getApp().$deleteID = this.$root.$mp.query.id
			},
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

				const data = await getDakaSetting(params)

				if (! data) {
					return
				}

				this.isOpen = data.data.IsRemind
                this.time = data.data.RemindTime.slice(0, 5)

                this.$remindTime = this.time
			},
			changeTime(e) {
				this.time = e.target.value

				this.$remindTime = this.time

				this.setRemind()
			},
			async setRemind() {
				const params = {
					remindTime: this.time + ':00',
					isRemind: this.isOpen ? 1 : 0,
					clockPID: this.$root.$mp.query.id
				}

				await setDakaSetting(params)
			}
		}
	}
</script>
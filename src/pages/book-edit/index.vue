<style>
.book-edit-wrapper {
	min-height: 100vh;
	padding: 25px 0 95px;
	box-sizing: border-box;
	background-color: #FAFAFA;
}
.add-book-btn {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 18px 35px;
	color: #22CDCB;
	font-size: 15px;
	line-height: 50px;
	border-radius: 5px;
	background-color: #FFF;
}
.add-icon {
	width: 18px;
	height: 18px;
	margin-right: 10px;
	position: relative;
	border-radius: 50%;
	background-color: #22CDCB;

	&::before, &::after {
		content: "";
		position: absolute;
		top: 50%;
		left: 50%;
		background-color: #FFF;
		transform: translate(-50%, -50%);
	}

	&::before {
		width: 55%;
		height: 2px;
	}

	&::after {
		width: 2px;
		height: 55%;
	}
}
.book-edit-list {
	padding: 0 23px;

	& .free {
		display: none;
	}
}
.resume-generator-btn {
	width: 100%;
	position: fixed;
	bottom: 0;
	color: #22CDCB;
	font-size: 15px;
	line-height: 60px;
	box-shadow: 0 0 10px rgba(46, 217, 208, .2);
	background-color: #FFF;
}
.no-content {
	color: #AAA;
	font-size: 14px;
	text-align: center;
}
</style>

<template>
	<div class="book-edit-wrapper">
		<div class="btn add-book-btn" @click="go">
			<span class="add-icon"></span>
			继续添加内容
		</div>

		<ul class="book-edit-list">
            <content-item :item="item" :index="index" :key="item.id" v-for="(item, index) of list" @del="del"></content-item>
        </ul>

        <p class="no-content" v-if="! list.length">暂无内容，快去添加吧</p>

        <div class="btn resume-generator-btn" @click="save" v-if="type === 1">保存</div>
        <div class="btn resume-generator-btn" @click="gen" v-else>生成打卡计划</div>
	</div>
</template>

<script>
	import {fetch} from '@/api'

	import contentItem from '@/components/content-item'

	export default {
		data() {
			return {
				list: [],
				type: 0
			}
		},

		components: {
			contentItem
		},

		onLoad() {
			const app = getApp()

			this.list = app.contentList
		},

		onShow() {
			this.type = getApp().$genType
		},

		methods: {
			go() {
                wx.navigateBack({
					delta: 2
				})
            },
            del(index) {
            	this.list.splice(index, 1)

            	//getApp().contentList.splice(index, 1)
            },
            async save() {
            	if (! this.list.length) {
            		wx.showToast({
            			title: '请先添加内容',
            			icon: 'none'
            		})

            		return
            	}

            	const params = {
            		clockPID: getApp().$genID,
					CCLIDs: this.list.map((item) => item.CCLID)
				}

				wx.showLoading({
					title: '正在保存'
				})

				const data = await fetch('/api/clock/addContent', params)

				wx.hideLoading()

				if (data.flag !== 1) {
		            wx.showModal({
		                title: '提示',
		                content: data.msg,
		                showCancel: false
		            })

		            return
		        }

		        getApp().contentList = []
		        getApp().newContent = 1

		        wx.navigateBack({
					delta: 3
				})
		        // wx.redirectTo({
		        // 	url: `/pages/detail/index?id=${getApp().$genID}`
		        // })
            },
            async gen() {
            	if (! this.list.length) {
            		wx.showToast({
            			title: '请先添加内容',
            			icon: 'none'
            		})

            		return
            	}

            	const app = getApp()
				const params = {
					planName: app.newlyBuild.title,
					cover: app.newlyBuild.cover,
					description: app.newlyBuild.detail,
					private: app.newlyBuild.secretType,
					planType: 2,
					CCLIDs: this.list.map((item) => item.CCLID)
				}

				wx.showLoading({
					title: '正在生成'
				})

				const data = await fetch('/api/clock/addPlan', params)

				wx.hideLoading()

				if (data.flag !== 1) {
		            wx.showModal({
		                title: '提示',
		                content: data.msg,
		                showCancel: false
		            })

		            return
		        }

		        app.dakaPlanNum++
                app.dakaList.unshift({
                    HasFinish: 0,
                    HasClock: 0,
                    ClockNum: 0,
                    IsJoin: 1,
                    ClockPID: data.data.id,
                    PlanName: app.newlyBuild.title,
                    Cover: app.newlyBuild.cover,
                    Description: app.newlyBuild.detail,
                    AvatarList: [{Avatar: wx.getStorageSync('user').avatar}]
                })

		        wx.switchTab({
		        	url: '/pages/index/index'
		        })
            }
		}
	}
</script>
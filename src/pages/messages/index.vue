<template>
	<div class="messages-wrapper">
		<message-item :item="item" :key="item.CreateTime" v-for="item of list"></message-item>

		<div class="loading-scroll" v-if="loadingScroll"></div>
	</div>
</template>

<script>
	import messageItem from '@/components/message-item'

	import {fetch} from '@/api'

	export default {
		data() {
			return {
				loadingScroll: false,

				page: 1,
				list: []
			}
		},

		components: {
			messageItem
		},

		async onLoad() {
			wx.showLoading({
				title: '正在加载'
			})

			await this.getMessagesList()

			wx.hideLoading()
		},

		onReachBottom() {
            this.scroll()
        },

        onUnload() {
        	this.page = 1
        	this.list = []
        },

		methods: {
			async scroll() {
                this.loadingScroll = true

                ! this.isListLoaded && await this.getMessagesList()

                this.loadingScroll = false
            },
            async getMessagesList() {
            	const params = {
            		clockPID: this.$root.$mp.query.id,
                    page: this.page,
                    pagesize: 10
                }

                const data = await fetch('/api/clock/messageList', params)

                if (data.flag !== 1) {
                    wx.showModal({
                        title: '提示',
                        content: data.msg,
                        showCancel: false
                    })

                    return
                }

                this.page++
                this.list = [... this.list, ... data.data.Rows]
				this.isListLoaded =  this.list.length === data.data.Total
            }
		}
	}
</script>
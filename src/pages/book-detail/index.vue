<style src="@/css/book-detail"></style>

<template>
	<div class="book-detail-wrapper">
		<div class="book-detail">
			<img class="cover" :src="cover" mode="aspectFill">
			<h1 v-text="title"></h1>
			<span class="author" v-text="author"></span>
			<p>
				<img class="avatar" :src="item.Avatar" mode="aspectFill" :key="item" v-for="item of avatarList">
				<span>{{num}}人已添加此内容</span>
			</p>

			<div class="book-intro" :class="{'line-overflow': isShrink && isLongIntro}" v-text="intro"></div>
            <div class="spread-btn" @click="spread" v-if="isShrink && isLongIntro">展开</div>
            <div class="spread-btn" @click="shrink" v-if="spreaded">收起</div>
		</div>
		<div class="book-content">
			<h2>目录</h2>
			<p class="book-content-item" :key="item.Title" v-for="(item, index) of bookContent">{{index + 1}}、{{item.Title}}</p>

			<div class="book-desc">
				<h3>商品说明</h3>
				<p class="book-desc-item" :key="item" v-for="(item, index) of bookDesc">{{index + 1}}. {{item}}</p>
			</div>
		</div>

		<div class="btn add-book-btn" @click="add">添加</div>
	</div>
</template>

<script>
	import {fetch} from '@/api'

	export default {
		data() {
			return {
				isShrink: true,
				spreaded: false,
				//isAdd: true,

				cover: '',
				title: '',
				author: '',
				num: 0,
				avatarList: [],
				intro: '',

				bookContent: [],
				bookDesc: ['添加成功后，您的打卡计划中将会每日为您解锁1条内容，建议先阅读今日内容，再打卡', '添加成功的内容即可永久阅读。']
			}
		},

		computed: {
			isLongIntro() {
				return this.intro.length > 50
			}
		},

		async onLoad() {
			wx.showLoading({
				title: '正在加载'
			})

			await this.getDetail()

			wx.hideLoading()
		},

		onShow() {
			// 不用限制了
			return
			const app = getApp()

			this.isAdd = true

			app.contentList && app.contentList.forEach((item) => {
				if (+ item.CCLID === + this.$root.$mp.query.id) {
					this.isAdd = false
				}
			})
		},

		onUnload() {
			this.isShrink = true
			this.spreaded = false
		},

		methods: {
			async getDetail() {
				const params = {
					CCLID: this.$root.$mp.query.id
				}
				const data = await fetch('/api/clock/contentDetail', params)

				if (data.flag !== 1) {
                    wx.showModal({
                        title: '提示',
                        content: data.msg,
                        showCancel: false
                    })

                    return
                }

                this.cover = data.data.Cover
                this.author = data.data.Author
                this.intro = data.data.Abstract
                this.num = data.data.AddNum
                this.title = data.data.Title
                this.avatarList = data.data.AvatarList

                this.bookContent = data.data.ChapterList

                wx.setNavigationBarTitle({
                	title: this.title
                })
			},
			spread() {
				this.isShrink = false
				this.spreaded = true
			},
			shrink() {
				this.isShrink = true
				this.spreaded = false
			},
			add() {
				const app = getApp()

				if (! app.contentList) {
					app.contentList = []
				}

				app.contentList.push({
					CCLID: this.$root.$mp.query.id,
					Cover: this.cover,
					Title: this.title,
					Author: this.author,
					Abstract: this.intro
				})

				let flag = false

				getCurrentPages().forEach((item) => {
					if (item.route.indexOf('book-edit') !== -1) {
						flag = true
					}
				})

				if (flag) {
					wx.navigateBack({
						delta: 1
					})
				} else {
					wx.navigateTo({
						url: '/pages/book-edit/index'
					})
				}
			}
		}
	}
</script>
<style scoped>
.syllabus-item {
	margin: 35px 18px;
}
.syllabus-content {
	display: flex;
	margin-bottom: 25px;
	color: #AAA;
	font-size: 15px;

	& img {
		flex-shrink: 0;
		width: 90px;
		height: 120px;
		margin-right: 27px;
		border-radius: 5px;
	}

	& h2 {
		color: #333;
		font-size: 16px;
	}
}
.syllabus-info {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
}
.syllabus-chapter {
	margin-top: 15px;
	color: #333;
	font-size: 16px;
}
.syllabus-chapter.actived {
	color: #AAA;
	background: url(~@/images/lock.png) center right no-repeat;
	background-size: 12px;
}
</style>

<template>
	<div class="syllabus-list">
        <div class="syllabus-item" :key="item.Title" v-for="item of list">
            <div class="syllabus-content">
                <img :src="item.Cover" mode="aspectFill">
                <div class="syllabus-info">
                    <h2 v-text="item.Title"></h2>
                    <span v-text="item.Author"></span>
                    <p class="line-overflow" v-text="item.Abstract"></p>
                </div>
            </div>

            <div class="syllabus-chapter" :class="{actived: item.Unlock === 0}" :key="item.SECID" v-text="item.Title" @click="goChapterDetail(item.SECID, 1, item.Unlock)" v-for="(item, $ii) of item.ChapterList"></div>
        </div>
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
			this.list = getApp().syllabusList
		},

		methods: {
			goChapterDetail(id, isRead, lock) {
                if (lock === 0) {
                    return
                }

                getApp().isRead = !! isRead

                wx.navigateTo({
                    url: `/pages/read/index?id=${id}`
                })
            }
		}
	}
</script>
<style>
.add-content {
    min-height: 100vh;
    background-color: #FAFAFA;
}
.tag-list {
    padding: 25px 20px;
    margin-bottom: 10px;
    font-size: 0;

    & li {
        display: inline-block;
        width: 74px;
        margin-right: 12px;
        color: #333;
        font-size: 16px;
        text-align: center;
        line-height: 35px;
        border-radius: 3px;
        background-color: #FFF;
    }

    & li:last-child {
        margin-right: 0;
    }

    & li:nth-child(4n) {
        margin-right: 0;
    }

    & li:nth-child(n+5) {
        margin-top: 10px;
    }

    & .selected {
        color: #22CDCB;
    }
}
.add-content-list {
    margin: 0 25px 0 20px;

    & .del-icon {
        display: none;
    }
}
</style>

<template>
    <div class="add-content">
        <ul class="tag-list">
            <li :class="{selected: tagID === item.TagID}" v-text="item.TagName" :key="item.TagID" v-for="item of tagList" @click="tagID = item.TagID"></li>
        </ul>

        <p class="no-data" v-if="noList">暂无内容</p>

        <ul class="add-content-list" v-else>
            <content-item :item="item" :key="item.url" v-for="item of list"></content-item>
        </ul>

        <div class="loading-scroll" v-if="loadingScroll"></div>
    </div>
</template>

<script>
    import contentItem from '@/components/content-item'

    import api, {fetch} from '@/api'
    import {sendTime} from '@/utils'

    export default {
        data() {
            return {
                isLodaded: false,

                tagID: -1,
                tagList: [],
                list: [],

                page: 1,

                isListLoaded: false,
                loadingScroll: false
            }
        },

        components: {
            contentItem
        },

        computed: {
            noList() {
                return this.isLodaded && ! this.list.length
            }
        },

        watch: {
            async tagID(value) {
                this.page = 1
                this.isListLoaded = false

                this.isLodaded = false
                this.list = []

                await this.getContentList()

                this.isLodaded = true
            }
        },

        async onLoad() {
            wx.showLoading({
                title: '正在加载'
            })

            await this.getAddContentData()

            wx.hideLoading()
        },

        onShow() {
            return
            const app = getApp()

            if (wx.getStorageSync('isAuthorization') && ! wx.getStorageSync('isUpdate')) {
                wx.setStorage({
                    key: 'isUpdate',
                    data: true
                })

                this.page = 1
                this.dakaList = []

                this.getTagData()
            }

        },

        onReachBottom() {
            this.scroll()
        },

        methods: {
            async getAddContentData() {
                const tagData = await fetch('/api/tag/list', {
                    type: 2
                })

                this.tagList = tagData.data.Rows

                if (this.tagList.length) {
                    this.tagID = this.tagList[0].TagID
                }
            },
            async getContentList() {
                const params = {
                    tagID: this.tagID,
                    page: this.page,
                    pagesize: 10
                }

                const data = await fetch('/api/clock/contentList', params)

                if (data.flag !== 1) {
                    wx.showModal({
                        title: '提示',
                        content: data.msg,
                        showCancel: false
                    })

                    return
                }

                this.page++
                this.list.push(... data.data.Rows)
                this.isListLoaded =  this.list.length === data.data.Total
            },
            async scroll() {
                this.loadingScroll = true

                ! this.isListLoaded && await this.getContentList()

                this.loadingScroll = false
            }
        }
  }
</script>
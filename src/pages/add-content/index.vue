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
        width: 75px;
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

    & .selected {
        color: #22CDCB;
    }
}
.add-content-list {
    margin: 0 25px 0 20px;
}
</style>

<template>
    <div class="add-content">
        <ul class="tag-list">
            <li :class="{selected: tagID === item.TagID}" v-text="item.TagName" :key="item.TagID" v-for="item of tagList" @click="tagID = item.TagID"></li>
        </ul>

        <p class="no-data" v-if="noList">暂无计划</p>

        <ul class="add-content-list" v-else>
            <content-item :item="item" :key="item.url" v-for="item of dakaList"></content-item>
        </ul>

        <div class="loading-scroll" v-if="loadingScroll"></div>

        <loading v-if="isLoading"></loading>
    </div>
</template>

<script>
    import loading from '@/components/loading'
    import contentItem from '@/components/content-item'

    import api from '@/api'
    import {sendTime} from '@/utils'

    export default {
        data() {
            return {
                isLodaded: false,
                isLoading: false,

                tagID: 11,
                tagList: [
                    {
                        tagID: 11,
                        TagName: '读书'
                    },
                    {
                        tagID: 13,
                        TagName: '支持'
                    },
                    {
                        tagID: 15,
                        TagName: '稍等'
                    },
                    {
                        tagID: 15,
                        TagName: '发生'
                    }
                ],
                dakaList: [
                    {
                        src: 'http://t1.27270.com/uploads/tu/201804/49/87f7f6ca29.jpg',
                        title: '的飒飒大事',
                        author: '第三方',
                        intro: '时代发生的是否是对方的身份第三放到沙发上的范德萨发的是东方大厦'
                    },
                    {
                        src: 'http://t1.27270.com/uploads/tu/201804/51/38b277c569.jpg',
                        title: '的飒飒大事',
                        author: '第三方',
                        intro: '时代发生的是否是对方的身份第三放到沙发上的范德萨发的是东方大厦'
                    },
                    {
                        src: 'http://t1.27270.com/uploads/tu/201804/49/87f7f6ca29.jpg',
                        title: '的飒飒大事',
                        author: '第三方',
                        intro: '时代发生的是否是对方的身份第三放到沙发上的范德萨发的是东方大厦'
                    }
                ],

                page: 1,

                isListLoaded: false,
                loadingScroll: false
            }
        },

        components: {
            contentItem,
            loading
        },

        computed: {
            noList() {
                return this.isLodaded && ! this.dakaList.length
            }
        },

        watch: {
            tagID(value) {
                this.page = 1
                this.isListLoaded = false

                this.isLodaded = false
                this.dakaList = []

                this.getTagData()

                this.isLodaded = true
            }
        },

        onLoad() {
            //this.getDiscoverData()
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
            async getDiscoverData() {
                const apiList = [api.getDiscoverTagList(), this.getTagData()]
                const [tagData] = await Promise.all(apiList)

                let isShowErrowToast = false

                if (tagData.flag === 1) {
                    isShowErrowToast = true

                    //this.tagList = [... this.tagList, ... tagData.data.Rows]
                    this.tagList = tagData.data.Rows
                }

                ! isShowErrowToast && wx.showModal({
                    title: '提示',
                    content: tagData.msg,
                    showCancel: false
                })
            },
            async getTagData() {
                const params = {
                    tagID: this.tagID,
                    page: this.page,
                    pageSize: 10
                }

                this.isLoading = true

                const data = await api.getDiscoverDaKaList(params)

                this.isLoading = false

                if (data.flag === 1) {
                    this.dakaList = [... this.dakaList, ... data.data.Rows]

                    this.page++
                    this.isListLoaded =  this.dakaList.length === data.data.Total

                    return
                }

                wx.showModal({
                    title: '出错',
                    content: data.msg,
                    showCancel: false
                })
            },
            async scroll() {
                this.loadingScroll = true

                ! this.isListLoaded && await this.getTagData()

                this.loadingScroll = false
            }
        }
  }
</script>
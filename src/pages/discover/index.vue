<style src="@/css/discover"></style>

<template>
    <div class="discover-wrapper">
        <ul class="tag-list">
            <li :class="{selected: tagID === 0}" @click="tagID = 0">全部</li>
            <li :class="{selected: tagID === item.TagID}" v-text="item.TagName" :key="item.TagID" v-for="item of tagList" @click="tagID = item.TagID"></li>
        </ul>

        <p class="no-data" v-if="noList">暂无计划</p>

        <ul class="daka-list" v-else>
            <daka-item :item="item" :key="item.url" v-for="item of dakaList"></daka-item>
        </ul>

        <div class="loading-scroll" v-if="loadingScroll"></div>

        <loading v-if="isLoading"></loading>
    </div>
</template>

<script>
    import loading from '@/components/loading'
    import dakaItem from '@/components/daka-item'

    import api from '@/api'
    import {sendTime} from '@/utils'

    export default {
        data() {
            return {
                isLodaded: false,
                isLoading: false,

                tagID: 0,
                tagList: [],
                dakaList: [],

                page: 1,

                isListLoaded: false,
                loadingScroll: false
            }
        },

        components: {
            dakaItem,
            loading
        },

        computed: {
            noList() {
                return this.isLodaded && ! this.dakaList.length
            }
        },

        watch: {
            async tagID(value) {
                this.page = 1
                this.isListLoaded = false

                this.isLodaded = false
                this.isLoading = true
                this.dakaList = []

                await this.getTagData()

                this.isLoading = false
                this.isLodaded = true
            }
        },

        async onLoad() {
            this.isLoading = true

            await this.getDiscoverData()

            this.isLoading = false
        },

        onShow() {
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
                const data = await api.getDiscoverDaKaList(params)

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
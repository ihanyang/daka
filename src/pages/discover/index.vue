<style src="@/css/discover"></style>

<template>
    <div class="discover-wrapper">
        <ul class="tag-list">
            <li :class="{selected: tagID === item.TagID}" v-text="item.TagName" :key="item.TagID" v-for="item of tagList" @click="tagID = item.TagID"></li>
        </ul>

        <p class="no-data" v-if="noList">暂无计划</p>

        <ul class="daka-list" v-else>
            <daka-item :item="item" :key="item.url" v-for="item of dakaList"></daka-item>
        </ul>

        <loading v-if="isLoading"></loading>
    </div>
</template>

<script>
    import loading from '@/components/loading'
    import dakaItem from '@/components/daka-item'

    import api from '@/api'

    export default {
        data() {
            return {
                isLodaded: false,
                isLoading: false,

                tagID: 0,
                tagList: [
                    {
                        TagName: '全部',
                        TagID: 0
                    }
                ],
                dakaList: [],
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
            if (wx.getStorageSync('isAuthorization') && ! wx.getStorageSync('isUpdate')) {
                wx.setStorage({
                    key: 'isUpdate',
                    data: true
                })

                this.getTagData()
            }
        },

        methods: {
            async getDiscoverData() {
                const apiList = [api.getDiscoverTagList(), api.getDiscoverDaKaList({
                    tagID: 0
                })]
                const [tagData, listData] = await Promise.all(apiList).catch(() => {
                    wx.showModal({
                        title: '出错',
                        content: '接口错误'
                    })
                })

                let isShowErrowToast = false

                if (tagData.flag === 1) {
                    isShowErrowToast = true

                    this.tagList = [... this.tagList, ... tagData.data.Rows]
                }

                if (listData.flag === 1) {
                    isShowErrowToast = true

                    this.dakaList = listData.data.Rows
                }

                ! isShowErrowToast && wx.showModal({
                    title: '提示',
                    content: tagData.msg,
                    showCancel: false
                })
            },
            async getTagData() {
                const params = {
                    tagID: this.tagID
                }
                const data = await api.getDiscoverDaKaList(params)

                if (data.flag === 1) {
                    this.dakaList = data.data.Rows

                    return
                }

                wx.showModal({
                    title: '出错',
                    content: '接口错误',
                    showCancel: false
                })
            }
        }
  }
</script>
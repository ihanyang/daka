<style src="@/css/discover"></style>

<template>
    <div class="discover-wrapper">
        <ul class="tag-list">
            <li :class="{selected: tagID === 0}" @click="tagID = 0">全部</li>
            <li :class="{selected: tagID === item.TagID}" v-text="item.TagName" :key="item.TagID" v-for="item of tagList" @click="tagID = item.TagID"></li>
        </ul>

        <p class="no-data" v-if="noList">暂无计划</p>

        <div class="daka-list" v-else>
            <form @submit="submit" :data-id="item.ClockPID" :report-submit="true" :key="item.ClockPID" v-for="item of dakaList">
                <button form-type="submit" >
                    <daka-item :item="item" :type="1" :key="item.url" @navigate="navigate"></daka-item>
                </button>
            </form>
        </div>

        <div class="loading-scroll" v-if="loadingScroll"></div>
    </div>
</template>

<script>
    import dakaItem from '@/components/daka-item'

    import api, {fetch, getDiscoverTagList, getDiscoverDaKaList} from '@/api'
    import {sendTime} from '@/utils'

    export default {
        data() {
            return {
                isLodaded: false,

                tagID: 0,
                tagList: [],
                dakaList: [],

                page: 1,

                isListLoaded: false,
                loadingScroll: false
            }
        },

        components: {
            dakaItem
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
                this.dakaList = []

                await this.getList()

                this.isLodaded = true
            }
        },

        async onLoad() {
            Promise.all([this.getTagList(), this.getList()]).catch((e) => {
                console.error(e)
            })
        },

        onShow() {
            wx.setNavigationBarTitle({
                title: '发现'
            })

            if (getApp().$deleteID) {
                this.dakaList.forEach((item) => {
                    if (item.ClockPID === getApp().$deleteID) {
                        item.IsJoin = 0
                        item.HasClock = 0

                        if (getApp().user) {
                            let index = -1

                            item.AvatarList.forEach((item, i) => {
                                if (item.Avatar === getApp().user.avatar) {
                                    index = i
                                }
                            })

                            if (index !== -1) {
                                item.AvatarList.splice(index, 1)
                            }
                        }
                    }
                })

                getApp().$deleteID = null
            }

            return
            const app = getApp()

            if (wx.getStorageSync('isAuthorization') && ! wx.getStorageSync('isUpdate')) {
                wx.setStorage({
                    key: 'isUpdate',
                    data: true
                })

                this.page = 1
                this.dakaList = []

                this.getList()
            }

        },

        onReachBottom() {
            this.scroll()
        },

        methods: {
            submit(e) {
                getApp().save && this.sendFormId(e.target.formId)

                wx.navigateTo({
                    url: `/pages/detail/index?id=${e.target.dataset.id}`
                })
            },
            sendFormId(id) {
                const params = {
                    formId: id,
                    type: 1
                }

                fetch('/wxapplib/wxapp/addFormId', params)
            },
            async getTagList() {
                const data = await getDiscoverTagList()

                if (! data) {
                    return
                }

                this.tagList = data.data.Rows

                // 留个进入过发现页的标记
                wx.setStorage({
                    key: 'isDiscovered',
                    data: true
                })
            },
            async getList() {
                const params = {
                    tagID: this.tagID,
                    page: this.page,
                    pagesize: 10
                }

                const data = await getDiscoverDaKaList(params)

                if (! data) {
                    return
                }

                this.page++
                this.dakaList.push(... data.data.Rows)
                this.isListLoaded =  this.dakaList.length === data.data.Total
            },
            async scroll() {
                this.loadingScroll = true

                ! this.isListLoaded && await this.getList()

                this.loadingScroll = false
            }
        }
  }
</script>
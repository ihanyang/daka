<style scoped>
.li {
    display: flex;
    align-items: center;
    padding: 15px 20px;
    margin-bottom: 15px;
    border-radius: 5px;
    background-color: #FFF;
}

.figure {
    height: 55px;
    position: relative;

    & img {
        width: 55px;
        height: 100%;
        border-radius: 5px;
    }
}
.figure.message::after {
    content: "";
    width: 10px;
    height: 10px;
    position: absolute;
    top: -3px;
    right: -3px;
    border-radius: 50%;
    background-color: #FE3D5D;
}

.daka-info {
    flex: 1;
    align-self: stretch;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 5px;
    margin: 0 15px;
    color: #AAA;
    font-size: 13px;
    text-align: left;
}

h2 {
    color: #333;
    font-size: 16px;
    word-break: break-all;
}
h2.line-overflow {
    -webkit-line-clamp: 1;
}

.avatar {
    display: inline-block;
    width: 16px;
    height: 16px;
    vertical-align: middle;
}

span {
    margin-left: 5px;
    vertical-align: middle;
}

.daka-btn {
    align-self: center;
    width: 50px;
    font-size: 12px;
    line-height: 25px;
    border-radius: 5px;
    background-color: #22CDCB;
}
</style>

<template>
    <div class="li" @click="go(item.ClockPID)">
        <div class="figure" :class="{message: item.NewMessageNum}">
            <img mode="aspectFill" :src="item.Cover">
        </div>
        <div class="daka-info">
            <h2 class="line-overflow" v-text="item.PlanName"></h2>
            <p>
                <img class="avatar" :src="item.Avatar || defaultAvatar" :key="item" v-for="item of item.AvatarList">

                <template v-if="item.TodayClockNum !== undefined">
                    <span>今天已有{{item.TodayClockNum}}人打卡</span>
                </template>
                <template v-else>
                    <span>今天已有{{item.ClockNum}}人打卡</span>
                </template>
            </p>
        </div>

        <template v-if="item.IsJoin">
            <template v-if="item.HasFinish === 1">
                <div class="btn daka-btn disabled">已完成</div>
            </template>
            <template v-else>
                <div class="btn daka-btn disabled" v-if="item.HasClock">已打卡</div>
                <div class="btn daka-btn" v-else>去打卡</div>
            </template>
        </template>
        <template v-else>
            <div class="btn daka-btn">加入</div>
        </template>
    </div>
</template>

<script>
    import {getDefaultAvatar} from '@/utils'

    export default {
        props: ['item', 'index', 'type'],

        computed: {
            defaultAvatar() {
                return getDefaultAvatar()
            }
        },

        methods: {
            go(id) {
                const app = getApp()

                app.item = this.item

                if (this.type === 1) {
                    this.$emit('navigate', id)
                } else {
                    wx.navigateTo({
                        url: `/pages/detail/index?id=${id}`
                    })
                }
            }
        }
    }
</script>
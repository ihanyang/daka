<style scoped>
li {
    display: flex;
    padding: 15px 20px;
    margin-bottom: 15px;
    border-radius: 5px;
    background-color: #FFF;
}

.figure {
    width: 55px;
    height: 55px;
    border-radius: 5px;
}

.daka-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 5px;
    margin: 0 20px;
    color: #AAA;
    font-size: 13px;
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
    <li @click="go(item.ClockPID)">
        <img class="figure" mode="aspectFill" :src="item.Cover">
        <div class="daka-info">
            <h2 class="line-overflow" v-text="item.PlanName"></h2>
            <p>
                <img class="avatar" :src="item.Avatar" :key="item" v-for="item of item.AvatarList">
                <span>今天已有{{item.TodayClockNum || item.ClockNum}}人打卡</span>
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
    </li>
</template>

<script>
    export default {
        props: ['item', 'index'],

        methods: {
            go(id) {
                const app = getApp()

                app.item = this.item

                wx.navigateTo({
                    url: `/pages/detail/index?id=${id}`
                })
            }
        }
    }
</script>
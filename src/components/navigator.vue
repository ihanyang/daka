<style scoped>
.navigator {
    display: flex;
    width: 100%;
    position: fixed;
    bottom: 0;
    line-height: 60px;
    background-color: #FFF;
    box-shadow: 0 0 10px rgba(0, 0, 0, .1);

    & div, & a {
        flex: 1;
        color: #22CDCB;
        text-align: center;
        font-size: 16px;
        font-weight: bold;

        &::before {
            content: "";
            display: inline-block;
            margin-right: 9px;
            width: 21px;
            height: 22px;
            vertical-align: middle;
            background-repeat: no-repeat;
            background-size: 100%;
        }
    }
}
.daka-icon::before {
    background-image: url(~images/daka-icon.png);
}
.discover-icon::before {
    background-image: url(~images/discover-icon.png);
}
</style>

<template>
    <nav class="navigator">
        <!-- <div class="daka-icon" @click="gos">打卡</div>
        <div class="discover-icon" @click="gos">发现</div> -->
        <a class="daka-icon" href="/pages/index/index">打卡</a>
        <a class="discover-icon" href="/pages/discover/index">发现</a>
    </nav>
</template>

<script>
    export default {
        data() {
            return {

            }
        },

        methods: {
            gos() {
                console.log(111221)
                // wx.navigateTo({
                //     url: `/pages/index/index`
                // })
            }
        }
    }
</script>
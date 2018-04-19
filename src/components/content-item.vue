<style scoped>
.content-item {
	display: flex;
	margin-bottom: 35px;
}
.content-item:last-child {
	margin-bottom: 0;
}
.img-wrapper {
	width: 90px;
	height: 120px;
	margin-right: 27px;
	position: relative;

	& span {
		width: 40px;
		padding: 2px 0;
		position: absolute;
		top: 5px;
		left: 4px;
		color: #22CDCB;
		text-align: center;
		font-size: 8px;
		line-height: normal;
		border-radius: 3px;
		background-color: #FFF;
	}

	& img {
		width: 100%;
		height: 100%;
		border-radius: 5px;
	}
}
.info {
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	color: #AAA;
	font-size: 15px;

	& h2 {
		display: flex;
		color: #333;
		font-size: 16px;
	}

	& span {
		flex: 1;
		max-width: 200px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
}
.del-icon {
	width: 18px;
	height: 18px;
	margin-left: 10px;
	background: url(~@/images/delete-icon.png);
	background-size: 100%;
}
</style>

<template>
	<li class="content-item" @click="go">
		<div class="img-wrapper">
			<span class="free">限时免费</span>
			<img :src="item.Cover" mode="aspectFill">
		</div>
		<div class="info">
			<h2>
				<span v-text="item.Title"></span>
				<div class="del-icon" @click="del"></div>
			</h2>
			<p v-text="item.Author"></p>
			<p class="line-overflow" v-text="item.Abstract"></p>
		</div>
	</li>
</template>

<script>
	export default {
		props: ['item', 'index'],

		methods: {
			go() {
				// if (this.item.noClick) {
				// 	return
				// }

                wx.navigateTo({
					url: `/pages/book-detail/index?id=${this.item.CCLID}`
				})
            },
            del() {
            	this.$emit('del', this.index)
            }
		}
	}
</script>
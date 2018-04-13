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
		color: #333;
		font-size: 16px;
	}
}
</style>

<template>
	<li class="content-item">
		<div class="img-wrapper">
			<span>限时免费</span>
			<img :src="item.src" mode="aspectFill">
		</div>
		<div class="info">
			<h2 v-text="item.title"></h2>
			<p v-text="item.author"></p>
			<p class="line-overflow" v-text="item.intro"></p>
		</div>
	</li>
</template>

<script>
	export default {
		props: ['item']
	}
</script>
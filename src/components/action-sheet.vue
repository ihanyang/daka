<style scoped>
.modal {
	width: 100%;
	height: 100vh;
	position: fixed;
	top: 0;
	background-color: rgba(0, 0, 0, 0);
}
.modal-content {
	width: 100%;
	position: absolute;
	bottom: 0;
	box-shadow: 0 0 15px rgba(46, 217, 208, .2);
	background-color: #F5F5F5;
}
.modal-item {
	font-size: 16px;
	text-align: center;
	line-height: 50px;
	border-radius: 0;
	color: #22cdcb;
	border: none;
	background-color: #FFF;
}
.modal-item:last-child {
	margin-top: 5px;
}
button.modal-item {
	opacity: 0;
}
.modal-item.share {
	width: 100%;
	position: absolute;
	top: 0;
	pointer-events: none;
}
.a-enter-active {
  transition: all .3s ease;
}
.a-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.a-enter, .a-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>

<template>
	<div class="modal" @click="cancel">
		<div class="modal-content">
			<button class="modal-item" open-type="share">分享给朋友</button>
			<div class="modal-item share" @click="go">分享给朋友</div>
			<div class="modal-item" @click="go">生成卡片 保存分享</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['items'],

		methods: {
			cancel() {
				this.$emit('cancel')
			},
			go() {
				wx.navigateTo({
                    url: `/pages/invite/index?id=${this.$root.$mp.query}`
                })
			}
		}
	}
</script>
<style scoped>
.modal {
	width: 100%;
	height: 100vh;
	position: fixed;
	top: 0;
	z-index: 10;
	opacity: 0;
	background-color: rgba(0, 0, 0, .5);
	transition: all .25s;
}
.modal.transition {
	opacity: 1;
}
.modal-content {
	width: 100%;
	position: absolute;
	bottom: 0;
	box-shadow: 0 0 15px rgba(46, 217, 208, .2);
	background-color: #F5F5F5;
	transform: translateY(100%);
	transition: all .25s;
}
.modal-content.transition {
	transform: translateY(0);
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
	opacity: 1;
}
.modal-item.share {
	width: 100%;
	position: absolute;
	top: 0;
	pointer-events: none;
}
</style>

<template>
	<div class="modal" :class="{transition: isTransition}" @click="cancel" @touchmove.stop @transitionend="transitionend">
		<div class="modal-content" :class="{transition: isTransition}">
			<button class="modal-item" open-type="share">分享给朋友</button>
			<div class="modal-item share">分享给朋友</div>
			<div class="modal-item" @click="go">生成卡片 保存分享</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['items'],

		data() {
			return {
				isTransition: false
			}
		},

		onReady() {
			setTimeout(() => {
				this.isTransition = true
			}, 66)
		},

		methods: {
			transitionend() {
				if (! this.isTransition) {
					this.$emit('cancel')
				}
			},
			cancel() {
				this.isTransition = false
			},
			go() {
				wx.navigateTo({
                    url: `/pages/invite/index?id=${this.$root.$mp.query.id}`
                })
			}
		}
	}
</script>
<style scoped>
.musice-wrapper {
	display: flex;
	align-items: center;
	height: 60px;
	padding: 13px 40px 13px 20px;
	margin-top: 14px;
	margin-bottom: 20px;
	border-radius: 5px;
	background-color: #FFF;
}
.icon {
	width: 35px;
	height: 35px;
	margin-right: 20px;
	border-radius: 50%;
	background: #22CDCB url(~@/images/play-music.png) center no-repeat;
	background-size: 13px;
}
.music-info {
	flex: 1;
}
.music-time {
	color: #ABABAB;
	font-size: 13px;
}
.music-progress-wrapper {
	height: 2px;
	margin-top: 10px;
	position: relative;
	border-radius: 2px;
	background-color: #D8D8D8;
}
.music-progress {
	width: 80%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	border-radius: 2px;
	background-color: #22CDCB;

	&::after {
		content: "";
		width: 8px;
		height: 8px;
		position: absolute;
		top: 50%;
		right: 0;
		border: 2px solid #02CECC;
		border-radius: 50%;
		background-color: #96F4F3;
		transform: translateY(-50%);
	}
}
</style>

<template>
	<div class="musice-wrapper">
		<div class="icon" :class="{paused: paused}"></div>
		<div class="music-info">
			<div class="music-time">{{minute}}:{{second}}/{{duration}}</div>
			<div class="music-progress-wrapper">
				<div class="music-progress"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: ['url', 'duration'],

		data() {
			return {
				paused: false,

				time: 0,
			}
		},

		computed: {
			minute() {
				return `${~~ (this.time / 60)}`.replace(/\b(\w)\b/g, '0$1')
			},
			second() {
				return `${this.time - (this.minute * 60)}`.replace(/\b(\w)\b/g, '0$1')
			},
		}
	}
</script>
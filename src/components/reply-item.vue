<style scoped></style>

<template>
	<div class="detail-reply">
		<header>
			<img class="avatar" :src="item.Avatar" mode="aspectFill">
			<div class="info">
				<strong v-text="item.Nickname"></strong>
				<span v-text="time"></span>
			</div>
			<div class="reply-btn" @click="reply">回复</div>
		</header>
		<p v-text="item.ReplyContent" v-if="! item.ReplyMemberID"></p>
		<p v-else>
			<span>回复{{item.ReplyMemberNickname}}：</span>
			{{item.ReplyContent}}
		</p>
	</div>
</template>

<script>
	import {timeFormat} from '@/utils'

	export default {
		props: ['item'],

		computed: {
			time() {
				return timeFormat(+ new Date(this.item.CreateTime))
			}
		},

		methods: {
			reply() {
				this.$emit('reply', this.item.ReplyID, this.item.Nickname)
			}
		}
	}
</script>
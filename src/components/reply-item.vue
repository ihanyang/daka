<style scoped></style>

<template>
	<div class="detail-reply">
		<header>
			<img class="avatar" :src="item.Avatar || defaultAvatar" mode="aspectFill">
			<div class="info">
				<strong v-text="item.Nickname"></strong>
				<span v-text="time"></span>
			</div>
			<div class="reply-btn" @click="reply" v-if="isJoin">回复</div>
		</header>
		<p v-text="item.ReplyContent" v-if="! item.ReplyMemberID"></p>
		<p v-else>
			<span>回复{{item.ReplyMemberNickname}}：</span>
			{{item.ReplyContent}}
		</p>
	</div>
</template>

<script>
	import {timeFormat, getDefaultAvatar} from '@/utils'

	export default {
		props: ['item', 'isJoin'],

		computed: {
			time() {
				return timeFormat(this.item.CreateTimeStamp)
			},
			defaultAvatar() {
				return getDefaultAvatar()
			}
		},

		methods: {
			reply() {
				this.$emit('reply', this.item.ReplyID, this.item.Nickname)
			}
		}
	}
</script>
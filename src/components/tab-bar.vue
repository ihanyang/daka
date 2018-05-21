<style scoped>
.tab-bar-wrapper {
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 58px;
	padding: 7px 49px 7px;
	position: fixed;
	bottom: 0;
	box-sizing: border-box;
	color: #22CDCB;
	font-size: 13px;
	font-weight: bold;
	filter: drop-shadow(0 0 4px rgba(34, 205, 203, .4));
	background-color: #FFF;
}
.tab-bar-wrapper.d section {
	background-image: linear-gradient(149.4deg,rgba(227,239,239,1),rgba(195,225,225,1));
}
.tab-bar-wrapper.d .daka-icon {
	color: #C3E1E0;
}
.home-icon::before {
	width: 25px;
	height: 21px;
	background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzAyQ0VDQyIgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjQuNjQxIDguNzc2TDEzLjE0Ni4yMWExLjExNiAxLjExNiAwIDAgMC0xLjMwNSAwTC4zNDUgOC43NzZjLS40MTUuMzItLjQ2Mi44NzUtLjEwNiAxLjI0Ni4zNTYuMzcyLjk4NC40MjQgMS40MTEuMTE2bDEuNTc3LTEuMTc1djkuNzcxYzAgLjYwMS4yNyAxLjE3OC43NTMgMS42MDNBMi43NTMgMi43NTMgMCAwIDAgNS43OTYgMjFoMTMuMzk1Yy42ODEgMCAxLjMzNC0uMjM5IDEuODE2LS42NjQuNDgyLS40MjUuNzUyLTEuMDAxLjc1Mi0xLjYwMnYtOS43N2wxLjU3NyAxLjE3NGMuNDI3LjMxOCAxLjA2NS4yNyAxLjQyNS0uMTA2LjM2LS4zNzYuMzA3LS45MzktLjEyLTEuMjU3em0tNS40NSAxMC40NEg1Ljc5NmEuNTg1LjU4NSAwIDAgMS0uMzg2LS4xNDEuNDU1LjQ1NSAwIDAgMS0uMTYtLjM0VjcuNDU1bDcuMjQzLTUuMzk2IDcuMjQ0IDUuMzk2djExLjI3OGMwIC4xMjgtLjA1OC4yNS0uMTYuMzRhLjU4NS41ODUgMCAwIDEtLjM4Ni4xNDJ6Ii8+PHBhdGggZD0iTTkgMTQuOTgzYzAgLjQ5Ni40NDguNTY1IDEuMDI2LjU2NWw1LjI5Mi4wMThjLjI3OCAwIC42ODItLjQyNi42ODItLjY2NGwtLjAxNy00LjQ4MWMwLS40OTctLjA5NS0uODUtLjY3My0uODVoLTUuMjYzQzkuNDcgOS41NzIgOSA5Ljk3NSA5IDEwLjQ3djQuNTEzem00Ljk4My0xLjQxOGwtMi45ODQuMDEzdi0yLjAxbDIuOTk1LS4wMDUtLjAwMiAxLjE5Ny0uMDEuODA1eiIvPjwvZz48L3N2Zz4=);
}
.comment-icon::before {
	width: 22px;
	height: 21px;
	background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iMjMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iIzAyQ0VDQyIgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMTMuNjQ4IDIyLjI2Yy0uMjQgMC0uNDc1LS4wNDgtLjY5NS0uMTQzLS42MTUtLjI2My0uNzU0LS44MS0uNzczLTEuNDc2bC0uMTI1LTEuNjMtOC4wODktLjA0NUMxLjc3NyAxOC45NjQuMDAzIDE3LjIgMCAxNS4wMjJWMy41OThDLjAwMiAxLjQyIDEuNzggMCAzLjk3LS4wMDJoMTYuNDE0YzIuMTkuMDAzIDMuNjQ3IDEuNTUgMy42NDkgMy43MjlWMTUuMTVjLS4wMDMgMi4xNzgtMS40NjIgMy44MTQtMy42NTIgMy44MTZoLTEuMjU0Yy0uNjg4IDAtMS4zNTMuMjUtMS44NjkuNzAybC0yLjQ3MyAyLjE2NGExLjcyOSAxLjcyOSAwIDAgMS0xLjEzNy40Mjl6TTMuNTc1IDIuMDczYy0uODcuMDAxLTEuNTc0LjY4NC0xLjU3NSAxLjUyNnYxMS40MjRjLjAwMS44NDIuODE3IDEuOTggMS42ODcgMS45OGg4LjQ5NmMxLjEzMS0uMDA0IDEuODI1LjM1OSAxLjg1OCAxLjQ1NGwuMDEyIDEuNTI3IDEuNTE3LTIuMTMzYy45ODctLjgzOSAyLjI4NS0uNzk3IDMuNTk4LS43OThoMS4yODdjLjg3LS4wMDEgMS41NDQtMS4xODggMS41NDUtMi4wM1YzLjU5OGMtLjAwMS0uODQzLS43MDYtMS41MjUtMS41NzUtMS41MjdIMy41NzV6Ii8+PHBhdGggZD0iTTUuMjEgMTAuMDg3YTEuMzkzIDEuMzkzIDAgMSAwIDIuNzg2IDAgMS4zOTMgMS4zOTMgMCAwIDAtMi43ODUgMHpNMTAuNzgxIDEwLjA4N2ExLjM5MyAxLjM5MyAwIDEgMCAyLjc4NiAwIDEuMzkzIDEuMzkzIDAgMCAwLTIuNzg2IDB6TTE2LjM1MiAxMC4wODdhMS4zOTMgMS4zOTMgMCAxIDAgMi43ODUgMCAxLjM5MyAxLjM5MyAwIDAgMC0yLjc4NSAweiIvPjwvZz48L3N2Zz4=);
}
.daka-icon {
	width: 55px;
	height: 45px;
	padding-top: 0;
	position: absolute;
	left: 50%;
	bottom: 10%;
	text-align: center;
	overflow: visible;
	transform: translateX(-50%);

	& section {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 52px;
		height: 52px;
		position: absolute;
		top: -35%;
		left: 50%;
		border: 6px solid #FFF;
		/* box-sizing: border-box; */
		border-radius: 50%;
		background:linear-gradient(149.4deg,rgba(112,230,230,1),rgba(34,205,203,1));
		transform: translateX(-50%);

		&::after {
			content: "";
			width: 26px;
			height: 21px;
			background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjMiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJub256ZXJvIj48cGF0aCBkPSJNMjEuMDgxIDIzSDQuOTJDMi4yMDIgMjMgMCAyMC43NjkgMCAxOC4wMTdWNi45ODNDMCA0LjIzMSAyLjIwMiAyIDQuOTE5IDJIMjEuMDhDMjMuNzk4IDIgMjYgNC4yMzEgMjYgNi45ODN2MTEuMDM0QzI2IDIwLjc2OSAyMy43OTggMjMgMjEuMDgxIDIzek01LjMzMyA0QTMuMzMzIDMuMzMzIDAgMCAwIDIgNy4zMzN2MTAuMzM0QTMuMzMzIDMuMzMzIDAgMCAwIDUuMzMzIDIxaDE1LjMzNEEzLjMzMyAzLjMzMyAwIDAgMCAyNCAxNy42NjdWNy4zMzNBMy4zMzMgMy4zMzMgMCAwIDAgMjAuNjY3IDRINS4zMzN6Ii8+PHBhdGggZD0iTTcgNS41NjVjLS4yNjUgMC0uNTItLjA3My0uNzA3LS4yMDRDNi4xMDUgNS4yMzEgNiA1LjA1NCA2IDQuODdWLjY5NkM2IC4zMSA2LjQ0OCAwIDcgMHMxIC4zMTEgMSAuNjk2VjQuODdjMCAuMTg0LS4xMDUuMzYxLS4yOTMuNDkxLS4xODcuMTMtLjQ0Mi4yMDQtLjcwNy4yMDR6bTExIDBjLS41NTIgMC0xLS4zMTEtMS0uNjk1Vi42OTZDMTcgLjMxIDE3LjQ0OCAwIDE4IDBzMSAuMzExIDEgLjY5NlY0Ljg3YzAgLjE4NC0uMTA1LjM2MS0uMjkzLjQ5MS0uMTg3LjEzLS40NDIuMjA0LS43MDcuMjA0em0tNy4wOTIgMTAuMjNsLTMuMjUtMy4xM2EuNjc3LjY3NyAwIDAgMSAuMDM3LS45NDUuNzQzLjc0MyAwIDAgMSAuOTgtLjAzN2wyLjQ5NiAyLjQ1OCA1LjMzNC00LjcxOGEuNzQzLjc0MyAwIDAgMSAuOTguMDM2LjY3Ny42NzcgMCAwIDEgLjAzOC45NDRsLTUuNTk3IDUuMzkyYS43MzYuNzM2IDAgMCAxLTEuMDE4IDB6Ii8+PC9nPjwvc3ZnPg==) center no-repeat;
			background-size: 100%;
		}
	}
}
.icon {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-direction: column;
	text-align: center;
	box-sizing: border-box;

	&::before {
		content: "";
		background-size: 100%;
		background-repeat: no-repeat;
	}
}
button {
	height: 100%;
	color: #22CDCB;
	font-size: 13px;
	line-height: normal;
}
</style>

<template>
	<div class="tab-bar-wrapper" :class="{d: isDaKa}">
		<div class="icon home-icon" @click="go(0)">首页</div>



		<!-- <div class="icon daka-icon" @click="go(1)">
			<section></section>
			{{text}}
		</div> -->

		<form @submit="submitDaka" :report-submit="true">
            <button form-type="submit" id="daka-daka" class="icon daka-icon">
            	<section></section>
				{{text}}
            </button>
        </form>

		<form @submit="submit" :report-submit="true">
            <button form-type="submit" id="daka-post-comment" class="icon comment-icon">发表心得</button>
        </form>
		<!-- <div class="icon comment-icon" @click="go(2)">发表心得</div> -->


		<!-- <div class="icon" :class="item.cname" :key="item" v-for="(item, index) of tabs" @click="go(index)">
			<template v-if="index === 1">
				<section></section>
				{{isDaKa ? item.t : item.text}}
			</template>
			<template v-else>
				{{item.text}}
			</template>
		</div> -->
	</div>
</template>

<script>
	import {addFormId} from '@/api'

	export default {
		props: ['isDaKa'],

		data() {
			return {
				tabs: [
					{
						text: '首页',
						path: 'index',
						cname: 'home-icon'
					},
					{
						text: '打卡',
						t: '已打卡',
						path: 'detail',
						cname: 'daka-icon'
					},
					{
						text: '发表心得',
						path: 'post-comment',
						cname: 'comment-icon'
					}
				]
			}
		},

		computed: {
			text() {
				return this.isDaKa ? '已打卡' : '打卡'
			}
		},

		methods: {
			submitDaka(e) {
				this.$emit('daka', e)
			},
			submit(e) {
                this.sendFormId(e.target.formId)

                wx.navigateTo({
					url: `/pages/post/index?id=${getApp().detailID}`
				})
            },
            sendFormId(id) {
                const params = {
                    formId: id,
                    type: 1
                }

                addFormId(params)
            },
			go(index) {
				if (index === 0) {
					wx.switchTab({
						url: `/pages/index/index`
					})

					return
				}

				if (index === 1) {
					this.$emit('daka')

					return
				}

				if (index === 2) {
					wx.navigateTo({
						url: `/pages/post/index?id=${getApp().detailID}`
					})

					return
				}
			}
		}
	}
</script>
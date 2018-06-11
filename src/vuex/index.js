import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		dakaTotalNum: 0,
		dakaPlanNum: 0,
		dakaList: [],

		experienceList: [],

		bgm: null,
		bgmPaused: false,
		bgmEnd: false,

		// 0 播放中 1 暂停  2 播放完毕
		bgmStatus: -1,
		currentCover: '',
		musicEnded: null
	},
	mutations: {
		setDakaList(state, value) {
			state.dakaList = value
		},
		setDakaTotalNum(state, value) {
			state.dakaTotalNum = value
		},
		setDakaPlanNum(state, value) {
			state.dakaPlanNum = value
		},

		setExperienceList(state, value) {
			state.experienceList = value
		},

		setCurrentCover(state, value) {
			state.currentCover = value
		},
		setBGM(state, value) {
			state.bgm = value
		},
		setBGMStatus(state, value) {
			state.bgmStatus = value
		},
		setBGMPaused(state, value) {
			state.bgmPaused = value
		},
		setBGMEnd(state, value) {
			state.bgmEnd = value
		},
	},
	actions: {
		setDakaList({commit}) {

		}
	}
})
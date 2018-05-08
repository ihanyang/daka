import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		dakaTotalNum: 0,
		dakaPlanNum: 0,
		dakaList: [],

		experienceList: []
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
	},
	actions: {
		setDakaList({commit}) {

		}
	}
})
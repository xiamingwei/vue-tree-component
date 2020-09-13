import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        menus: []
    },
    getters: {
        menus: state => state.menus
    },
    mutations: {
        setMenus(state, data) {
            state.menus = data
        }
    },
    actions: {

    }
})
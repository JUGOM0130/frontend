import {
    createStore
} from 'vuex'

// 新しいストアインスタンスを作成します
export default createStore({
    //ここは直接触らない
    state() {
        return {
            id: 0,
            cd: ""
        }
    },
    //mutationを介してstateの変数を触るらしい
    mutations: {
        dataset(state, data) {
            state.id = data.id
            state.cd = data.cd
        }
    }
})

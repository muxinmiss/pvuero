import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 导入模块！
import menu from "./modules/menu"
import role from "./modules/role"
import user from "./modules/user"//控制台报vuex的错误，应该先检查此处是否把模块挂载进来

let store = new Vuex.Store({
    state:{
        iscollapse:false  // 是否折叠，默认不折叠！
    },
    mutations:{
        TOGGLE(state){
            state.iscollapse = !state.iscollapse
        }
    },
    modules:{
        menu, role,user
    }
})

export default store;
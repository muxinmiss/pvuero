// 状态层
// 菜单的列表数据要与别人共享
// 获取菜单列表
import { getMenu } from "@/request/menu"
export default {
    namespaced: true,
    /**当项目非常大时，如果所有的状态都集中放到一个对象中，store 对象就有可能变得相当臃肿。为了解决这个问题，Vuex允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割。namespaced表示当前模块是否使用命名空间，如果使用的话，那么设置了namespaced属性的模块将和其它模块独立开来，调用时得指定命名空间后才可以访问得到 */
    state: {
        menulist: []  //菜单列表
    },
    // 由getters获取的数据，都会存放在根里面
    getters: {
        // 得到state里面的menulis用于渲染vinfo弹窗里的菜单列表选项，
        menulist: state => state.menulist
    },
    mutations: {

        SET_LIST(state, data) {
            state.menulist = data
        }
    },
    /**
     * 页面进来之后会从store拿数据，当列表没有内容时会触发action，action会去请求层读取数据，读取到某个模块的某个请求方法，然后把请求的数据拿回来，再通过mutations把数据设置给state，state会把数据通过getters把数据流向列表。，这样就形成了一个环流。添加和修改是直接发送请求，直接调用请求层
     */
    actions: {
        // 请求菜单的列表数据
        // 解构commit，把res的数据赋给它
        async get_menu_list({ commit }) {
            let res = await getMenu();
            // console.log(res);
            commit('SET_LIST', res);
        }
    }
}